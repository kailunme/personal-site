import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { after, beforeEach, test } from 'node:test';
import ts from 'typescript';

const source = await readFile(new URL('../src/lib/backgroundVideo.ts', import.meta.url), 'utf8');
const { outputText } = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
});
const { saveBackgroundPreference, restoreBackgroundPlayback } = await import(
  `data:text/javascript;base64,${Buffer.from(outputText).toString('base64')}`
);

class Video {
  paused = false;
  playCalls = 0;
  pauseCalls = 0;
  blocked = false;

  pause() {
    this.pauseCalls++;
    this.paused = true;
  }

  async play() {
    this.playCalls++;
    if (this.blocked) throw new Error('Autoplay blocked');
    this.paused = false;
  }
}

const originals = Object.fromEntries(
  ['document', 'HTMLVideoElement', 'sessionStorage'].map(key => [key, Object.getOwnPropertyDescriptor(globalThis, key)]),
);
let video;

beforeEach(() => {
  video = new Video();
  const storage = new Map();
  Object.defineProperties(globalThis, {
    HTMLVideoElement: { configurable: true, value: Video },
    document: { configurable: true, value: { getElementById: () => video } },
    sessionStorage: {
      configurable: true,
      value: {
        setItem: (key, value) => storage.set(key, value),
        getItem: key => storage.get(key) ?? null,
      },
    },
  });
});

after(() => {
  for (const [key, descriptor] of Object.entries(originals)) {
    if (descriptor) Object.defineProperty(globalThis, key, descriptor);
    else delete globalThis[key];
  }
});

test('a first visit leaves autoplay to the browser', async () => {
  await restoreBackgroundPlayback();
  assert.equal(video.pauseCalls, 0);
  assert.equal(video.playCalls, 0);
});

test('a pause choice survives replacement of the video during navigation', async () => {
  saveBackgroundPreference(false);
  await restoreBackgroundPlayback();
  assert.equal(video.paused, true);
  video = new Video();
  await restoreBackgroundPlayback();
  assert.equal(video.paused, true);
});

test('a play choice resumes a new paused video without restarting a playing video', async () => {
  saveBackgroundPreference(true);
  video.paused = true;
  await restoreBackgroundPlayback();
  await restoreBackgroundPlayback();
  assert.equal(video.paused, false);
  assert.equal(video.playCalls, 1);
});

test('blocked playback stays paused and does not reject the navigation handler', async () => {
  saveBackgroundPreference(true);
  video.paused = true;
  video.blocked = true;
  await assert.doesNotReject(restoreBackgroundPlayback);
  assert.equal(video.paused, true);
});

test('unavailable storage does not break media controls', async () => {
  Object.defineProperty(globalThis, 'sessionStorage', {
    configurable: true,
    get() { throw new Error('Storage disabled'); },
  });
  assert.doesNotThrow(() => saveBackgroundPreference(false));
  await assert.doesNotReject(restoreBackgroundPlayback);
});

test('pages without a background video are safe', async () => {
  video = null;
  await assert.doesNotReject(restoreBackgroundPlayback);
});

const STORAGE_KEY = 'background-video-playing';

export function getBackgroundVideo(): HTMLVideoElement | null {
  const video = document.getElementById('bg-video');
  return video instanceof HTMLVideoElement ? video : null;
}

export function saveBackgroundPreference(playing: boolean): void {
  try {
    sessionStorage.setItem(STORAGE_KEY, String(playing));
  } catch {
    // Playback controls must still work when browser storage is unavailable.
  }
}

export async function restoreBackgroundPlayback(): Promise<void> {
  const video = getBackgroundVideo();
  if (!video) return;

  let preference: string | null;
  try {
    preference = sessionStorage.getItem(STORAGE_KEY);
  } catch {
    return;
  }

  if (preference === 'false') {
    video.pause();
  } else if (preference === 'true' && video.paused) {
    try {
      await video.play();
    } catch {
      // The browser may block playback; the control reflects the media state.
    }
  }
}

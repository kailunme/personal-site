import { useEffect, useRef, useState } from 'react';
import { navigate } from 'astro:transitions/client';
import { getBackgroundVideo, saveBackgroundPreference } from '../lib/backgroundVideo';
import { MixedText } from './MixedText';

interface Props { current: 'en' | 'zh' | 'ja'; }

const LANGS = [
  { code: 'en' as const, label: 'ENG', href: '/' },
  { code: 'ja' as const, label: 'あ', href: '/ja/' },
  { code: 'zh' as const, label: '中', href: '/zh/' },
];

export default function SynthPanel({ current }: Props) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [activeCode, setActiveCode] = useState(current);
  const navigationTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    let detachVideo = () => {};
    const bindVideo = () => {
      detachVideo();
      const video = getBackgroundVideo();
      if (!video) {
        setIsPlaying(false);
        return;
      }
      const syncPlayback = () => setIsPlaying(!video.paused && !video.ended && !video.error);
      const events = ['play', 'playing', 'pause', 'ended', 'error', 'emptied'] as const;
      events.forEach(event => video.addEventListener(event, syncPlayback));
      syncPlayback();
      detachVideo = () => events.forEach(event => video.removeEventListener(event, syncPlayback));
    };
    bindVideo();
    document.addEventListener('astro:page-load', bindVideo);
    return () => {
      detachVideo();
      document.removeEventListener('astro:page-load', bindVideo);
      if (navigationTimer.current !== null) clearTimeout(navigationTimer.current);
    };
  }, []);

  const handleBg = () => {
    const video = getBackgroundVideo();
    if (!video) return;
    if (!video.paused) {
      saveBackgroundPreference(false);
      video.pause();
    } else {
      saveBackgroundPreference(true);
      video.play().catch(() => setIsPlaying(false));
    }
  };

  const handleLang = (code: 'en' | 'zh' | 'ja', href: string) => {
    if (code === activeCode) return;
    setActiveCode(code);
    if (navigationTimer.current !== null) clearTimeout(navigationTimer.current);
    navigationTimer.current = setTimeout(() => {
      void navigate(href, { info: { preserveScroll: true } });
    }, 260);
  };

  return (
    <div>
      {/* top label strip */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 6,
      }}>
        <span className="synth-text" style={{
          fontSize: 9,
          letterSpacing: 2,
          color: '#bcc7d4',
          textTransform: 'uppercase',
        }}><MixedText text="CTRL" /></span>
        <div style={{ flex: 1, height: 1, background: 'rgba(160,185,215,0.35)', margin: '0 8px' }} />
        <span className="synth-text" style={{
          fontSize: 9,
          letterSpacing: 2,
          color: '#bcc7d4',
          textTransform: 'uppercase',
        }}><MixedText text="SYN-01" /></span>
      </div>

      {/* single combined row: lang switches + BG button */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        gap: 4,
      }}>
        {LANGS.map(l => {
          const active = l.code === activeCode;
          return (
            <div key={l.code} style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 6,
              width: 36,
            }}>
              <button
                onClick={() => handleLang(l.code, l.href)}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 6,
                  background: 'none',
                  border: 'none',
                  cursor: active ? 'default' : 'pointer',
                  padding: 0,
                  outline: 'none',
                  touchAction: 'manipulation',
                  width: '100%',
                }}
              >
                {/* LED indicator dot */}
                <div style={{
                  width: 5,
                  height: 5,
                  borderRadius: '50%',
                  background: active ? '#6aabf0' : 'transparent',
                  boxShadow: active ? '0 0 6px rgba(106,171,240,0.9)' : 'none',
                  transition: 'background 0.2s, box-shadow 0.2s',
                }} />
                {/* switch track */}
                <div style={{
                  width: 16,
                  height: 36,
                  borderRadius: 8,
                  background: 'linear-gradient(180deg, #ccd8e8 0%, #ddeaf8 100%)',
                  border: '1px solid #b0c4da',
                  boxShadow: 'inset 0 1px 4px rgba(100,140,190,0.25)',
                  position: 'relative',
                  padding: 2,
                }}>
                  <div style={{
                    position: 'absolute',
                    left: 2,
                    right: 2,
                    top: active ? 2 : 15,
                    height: 16,
                    borderRadius: 5,
                    background: active
                      ? 'linear-gradient(180deg, #a8d4ff 0%, #6aabf0 100%)'
                      : 'linear-gradient(180deg, #dce8f5 0%, #c8d8ec 100%)',
                    boxShadow: active
                      ? '0 0 6px rgba(106,171,240,0.7), inset 0 1px 2px rgba(255,255,255,0.6)'
                      : 'inset 0 1px 2px rgba(255,255,255,0.5), 0 1px 2px rgba(100,140,180,0.15)',
                    transition: 'top 0.22s cubic-bezier(0.4,0,0.2,1), background 0.2s, box-shadow 0.2s',
                  }} />
                </div>
              </button>
              {/* label */}
              <span className="synth-text" style={{
                fontSize: 12,
                letterSpacing: 0,
                color: active ? '#5a9fd8' : '#8b939c',
                transition: 'color 0.15s',
                whiteSpace: 'nowrap',
              }}><MixedText text={l.label} /></span>
            </div>
          );
        })}

        {/* vertical divider */}
        <div style={{
          width: 1,
          height: 36,
          background: 'rgba(160,185,215,0.4)',
          marginTop: 11,
          marginLeft: 6,
          marginRight: 14,
          alignSelf: 'flex-start',
        }} />

        {/* BG power button */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
          {/* spacer matching LED dot row */}
          <div style={{ width: 5, height: 5 }} />
          <button
            onClick={handleBg}
            onMouseDown={() => setPressed(true)}
            onMouseUp={() => setPressed(false)}
            onMouseLeave={() => setPressed(false)}
            style={{
              width: 36,
              height: 36,
              borderRadius: '50%',
              border: isPlaying ? '1px solid rgba(100,160,220,0.55)' : '1px solid #c4ceda',
              background: pressed
                ? 'linear-gradient(145deg, #c8dcf0, #b8d0e8)'
                : isPlaying
                  ? 'linear-gradient(145deg, #dce8f5, #c8dcf0)'
                  : 'linear-gradient(145deg, #edf1f7, #e4ecf5)',
              boxShadow: pressed
                ? 'inset 0 2px 5px rgba(100,150,210,0.4)'
                : isPlaying
                  ? '0 0 8px rgba(106,171,240,0.35), inset 0 1px 2px rgba(255,255,255,0.8)'
                  : 'inset 0 1px 2px rgba(255,255,255,0.6)',
              cursor: 'pointer',
              outline: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 15,
              color: isPlaying ? '#5a9fd8' : '#bcc7d4',
              transform: pressed ? 'translateY(1px)' : 'translateY(0)',
              transition: pressed ? 'none' : 'background 0.15s, box-shadow 0.15s, color 0.15s, transform 0.1s',
              userSelect: 'none',
              touchAction: 'manipulation',
            }}
          >
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <path d="M4.5 2.8A5.5 5.5 0 1 0 10.5 2.8"/>
              <line x1="7.5" y1="0.5" x2="7.5" y2="6"/>
            </svg>
          </button>
          <span className="synth-text" style={{
            fontSize: 12,
            letterSpacing: 0,
            color: isPlaying ? '#5a9fd8' : '#8b939c',
            transition: 'color 0.15s',
            display: 'block',
            textAlign: 'center',
          }}><MixedText text="BG" /></span>
        </div>
      </div>
    </div>
  );
}

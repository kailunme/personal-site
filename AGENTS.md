# unicodeangel — Personal Site

## What This Is
A personal website for @kailun.me with a retro cyberpunk/pixel-art aesthetic.
Built with Astro (Islands architecture) and deployed on Cloudflare Workers.

## Tech Stack
- **Framework:** Astro 7 + React 19 (React Islands for interactive components only)
- **Styling:** Tailwind CSS v4 with oklch design tokens
- **i18n:** Three locales — English (`/`), Chinese (`/zh/`), Japanese (`/ja/`)
- **Deployment:** Cloudflare Workers via Wrangler

## Commands
- `npm run dev` — Start dev server
- `npm run build` — Production build
- `npm run check` — astro check + tsc
- `npm test` — `node --test tests/*.test.mjs`; single file: `node --test tests/backgroundVideo.test.mjs`
- Deploy: `npm run build` then `npx wrangler deploy` (Wrangler serves `./dist` as static assets only — no Worker script, no SSR)
- Node version is pinned in `.nvmrc`

Tests have no TS loader: each test reads a `src/lib/*.ts` file, transpiles it with
`typescript.transpileModule`, imports it via a `data:` URL, and stubs browser globals
(`document`, `sessionStorage`, `HTMLVideoElement`). Keep testable logic in `src/lib/` free of
Astro/Vite-only imports so this keeps working.

## Code Style
- TypeScript strict mode, no `any`
- Named exports, PascalCase components, camelCase utils
- Tailwind utility classes plus scoped `<style>` blocks in `.astro` components; no `style=` attributes
- 2-space indentation
- Desktop-first layout (site is intentionally desktop-only)

## Project Structure
```
src/
  components/       # .astro (static) + .tsx (React islands)
  i18n/             # content.ts — all locale strings and content types (Locale, NavContent, ...)
  layouts/          # Layout.astro — base HTML shell
  lib/              # utils.ts (cn()), backgroundVideo.ts, pageTransitions.ts, mixedTypography.ts
  pages/            # index.astro, zh/index.astro, ja/index.astro, links.astro
  styles/           # globals.css + Tailwind tokens
tests/              # node:test suites for src/lib
public/
  audio/            # MP3s for iPod player
  fonts/            # Custom fonts (zpix, spaceage, BRAILLE1, etc.)
  images/           # Site images and GIFs
  videos/           # background.mp4 (looping background)
  seo/              # Favicons and touch icons
```

## Key Patterns
- **Static vs. interactive:** Most components are `.astro` files. Only components needing
  client-side interactivity are `.tsx` React Islands: `iPodPlayer`, `SynthPanel`.
  `MixedText.tsx` is rendered server-side (no `client:` directive) and is not an island.
- **i18n:** All user-facing strings live in `src/i18n/content.ts`. Each locale page imports
  and passes the relevant content to components via props — no runtime locale detection.
- **Locale pages:** The three `index.astro` files share the same component tree;
  only the content object (locale key) differs. Components default to English content when
  no `content` prop is passed, which is why `src/pages/index.astro` passes nothing.
- **Links page:** `/links` exists only in English; `linksData.zh` / `linksData.ja` are placeholders.
- **CJK typography:** `body[data-lang="zh"|"ja"]` switches `--font-body` to include Zpix. Latin
  letters/digits inside CJK text are wrapped in `.mixed-latin` spans — use `MixedText` for plain
  strings and `formatMixedTypographyHtml()` for trusted HTML rendered with `set:html`.

## Page Navigation & Persistence
- `Layout.astro` mounts Astro's `<ClientRouter />`, so every page change is a view transition, not a
  full reload. Client code that must re-run per page listens to `astro:page-load` / `astro:after-swap`,
  not `DOMContentLoaded`.
- Each page renders its own `<video id="bg-video">` inside `transition:persist="bg-video"`; the iPod
  island uses `transition:persist="ipod-player"`. New pages must copy the same bg-video block so
  playback survives navigation.
- Background-video play/pause state is stored in `sessionStorage` via `src/lib/backgroundVideo.ts`
  (written by `SynthPanel`, restored by the Layout script on every `astro:page-load`).
- Language switching in `SynthPanel` calls `navigate(href, { info: { preserveScroll: true } })`; the
  Layout script reads that flag to keep scroll position across the swap, and `applyLang()` resets
  `body[data-lang]` from the URL.
- The page fade is defined once in `src/lib/pageTransitions.ts` (keyframes `page-soft-in/out` live in
  `globals.css`) and applied via `transition:animate={pageTransition}` on `.site-grid`.

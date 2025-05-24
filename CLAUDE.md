# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development

No build tools, no bundlers. Serve locally with:

```
python3 -m http.server 8080
```

Then open `http://localhost:8080`. SVG icon sprites and fetch calls require HTTP (won't work via `file://`).

## Architecture

Vanilla HTML/CSS/JS personal website:

- **`index.html`** — Personal landing page (photo, name, bio, 3 recent posts)
- **`work.html`** — Professional page (experience timeline, projects, live Stack Overflow stats)
- **`writing/`** — Blog section with JSON-driven listing
- **`js/theme.js`** — Loaded in `<head>` to set theme from `localStorage` before paint (prevents FOUC)

### CSS (`css/`)
Six small files using CSS custom properties. No framework.
- `reset.css` — Minimal reset
- `variables.css` — Design tokens (colors, typography, spacing)
- `base.css` — Element defaults, skip link
- `layout.css` — Nav, footer, container, section spacing
- `components.css` — Tags, timeline, cards, SO stats, post previews, article styles, back-to-top
- `pages.css` — Page-specific styles (homepage hero, work page, writing page)

### JS (`js/`)
- `shared.js` — Injects nav + footer into `<div id="site-header">` / `<div id="site-footer">` placeholders. Auto-detects page depth for relative paths, sets `aria-current="page"`. Includes theme toggle (sun/moon) with `localStorage` persistence.
- `theme.js` — Tiny sync script for `<head>` — reads `localStorage('theme')` and sets `data-theme` before CSS renders.
- `stackoverflow.js` — Fetches live stats from Stack Exchange API (unauthenticated), renders into `<div id="so-stats">`. Shows fallback data immediately, replaces with live data.
- `writing.js` — Reads `writing/posts.json`, renders post listing into `<div id="posts-list">`.
- `main.js` — Back-to-top button visibility toggle.

### Icons (`assets/icons.svg`)
SVG sprite with `<symbol>` elements. Referenced via `<svg><use href="assets/icons.svg#icon-name"></use></svg>`. Available icons: `icon-linkedin`, `icon-github`, `icon-stackoverflow`, `icon-x`, `icon-email`, `icon-external`, `icon-arrow-up`, `icon-sun`, `icon-moon`. Favicon at `assets/favicon.svg`.

## Writing System

To add a new post:
1. Create `writing/posts/{slug}.html` (copy an existing post as template)
2. Add an entry to `writing/posts.json`: `{"title", "slug", "date", "summary", "tags"}`

The listing page picks it up automatically.

## Design

- Light/dark theme with manual toggle and `prefers-color-scheme` auto-detection
- Light: `#fafafa` bg, `#111111` text, `#1a56db` accent
- Dark: `#0f0f0f` bg, `#e4e4e4` text, `#5b9bf5` accent
- Inter font (Google Fonts), 400/500/600/700 weights
- Content max-width: 720px
- Mobile-first responsive (breakpoints at 640px, 768px, 1024px)
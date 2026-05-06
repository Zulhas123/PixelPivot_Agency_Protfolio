# PixelPivot Agency Portfolio (Lightweight Clean Architecture)

A lightweight, dependency-minimal portfolio site refactored for long-term maintainability using Clean Architecture + SOLID-inspired boundaries.
This repo intentionally avoids heavy frameworks and third-party JS libraries to keep performance fast and the structure easy to extend.

## Highlights

- **Clean Architecture boundaries**: Domain → Infrastructure → Presentation, with `src/main.js` as the composition root.
- **Zero runtime dependencies**: no npm install required; runs as static files.
- **Modern, minimal UI**: consistent styling tokens and reusable patterns.
- **Async-first behaviors**: controllers use async loops (typewriter/carousel autoplay) and can be stopped/aborted cleanly.
- **Maintainable UI rendering**: repeated sections are rendered from small, data-driven “views”.

## Architecture Overview

The codebase follows a pragmatic Clean Architecture layout:

1. **Domain** (`src/domain/`)
   - Pure business/UI-agnostic logic.
   - No DOM access, no timers, no global browser calls.
   - Examples:
     - `Typewriter` state machine (`src/domain/typewriter.js`)
     - carousel index/scroll calculations (`src/domain/carousel.js`)

2. **Infrastructure** (`src/infrastructure/`)
   - Small adapters to external systems (browser APIs, time, storage, network).
   - Currently: `sleep(ms)` timer adapter (`src/infrastructure/sleep.js`).

3. **Presentation** (`src/presentation/`)
   - DOM orchestration, event handling, and rendering.
   - Split into:
     - Controllers (`src/presentation/controllers/`) – behavior and event wiring
     - Views (`src/presentation/views/`) – data-driven DOM rendering
     - `bootstrapApp()` (`src/presentation/bootstrap.js`) – controller assembly
     - `renderStaticViews()` (`src/presentation/render.js`) – populates sections from data

4. **Composition Root** (`src/main.js`)
   - The only place that wires dependencies together (simple dependency injection).
   - Creates the app and starts it.

### Dependency Rule (kept strict)

- Domain depends on nothing else.
- Infrastructure depends on nothing else (but can import Domain helpers if needed).
- Presentation can depend on Domain + Infrastructure.
- `src/main.js` depends on everything and passes dependencies in.

## Folder Structure

```
.
├─ index.html
├─ style.css
├─ images/
└─ src/
   ├─ main.js
   ├─ domain/
   │  ├─ carousel.js
   │  ├─ math.js
   │  └─ typewriter.js
   ├─ infrastructure/
   │  └─ sleep.js
   └─ presentation/
      ├─ bootstrap.js
      ├─ render.js
      ├─ components/
      │  └─ dom.js
      ├─ controllers/
      │  ├─ carouselController.js
      │  ├─ navbarController.js
      │  ├─ scrollUpController.js
      │  └─ typewriterController.js
      └─ views/
         ├─ projectsView.js
         ├─ teamsView.js
         └─ testimonialsView.js
```

## Features

- Sticky navbar + mobile menu toggle
- Scroll-to-top button
- Typewriter animation (framework-free, abortable)
- Lightweight carousel behavior (framework-free)
- Data-driven rendering for:
  - Teams
  - Projects
  - Testimonials
- Accessibility improvements:
  - Skip link
  - Keyboard-operable controls for menu + scroll-to-top

## Setup (No Dependencies)

This project is pure static HTML/CSS/JS.

### Option A: Open directly

Open `index.html` in your browser.

Note: some browsers restrict ES module loading from `file://` URLs. If that happens, use Option B.

### Option B: Run a local static server (recommended)

Using PowerShell + Python:

```
python -m http.server 5173
```

Then open:

```
http://localhost:5173
```

## Run Process / Application Flow

1. Browser loads `index.html` and `style.css`.
2. `index.html` loads the ES module entrypoint `src/main.js`.
3. `src/main.js`:
   - calls `renderStaticViews({ document })` to populate `[data-view="..."]` sections
   - creates the app via `bootstrapApp({ window, document, sleep })`
   - starts controllers (`start()`)
4. Controllers:
   - attach DOM event listeners
   - run async behaviors (typewriter, carousel autoplay)
   - can be stopped (each controller returns `{ start, stop }`)

## Dependencies

### Runtime

- None (no npm packages).

### CDN assets

- Font Awesome CSS for icons (included via `<link>` in `index.html`).

## Refactoring Summary (Step-by-Step)

This repo was refactored progressively with a “minimal but complete” mindset:

1. **Analyze the current structure**
   - Identified duplicated logic, heavy client-side library usage, and repeated HTML blocks.
2. **Redesign the architecture**
   - Introduced `src/` and separated Domain / Infrastructure / Presentation responsibilities.
3. **Improve each layer incrementally**
   - Extracted pure logic into Domain (typewriter, carousel calculations).
   - Abstracted time/timers into Infrastructure (`sleep`).
   - Split UI behaviors into small controllers and consolidated rendering into simple views.
4. **Reduce dependencies and duplication**
   - Removed unused/duplicate JS patterns and replaced third-party behaviors with small native implementations.
5. **Polish for production readiness**
   - Added accessibility improvements and consistent design tokens.
   - Ensured the app stays static-host friendly and lightweight.

## Extending the Project

Common next steps that preserve the architecture:

- Add an **Infrastructure** adapter (e.g., `analyticsClient`, `contactApiClient`, `storage`) and inject it from `src/main.js`.
- Add a **Domain** module for validation or formatting rules.
- Add a new **View** to render a section from data, then bind it in `src/presentation/render.js`.
- Keep controllers focused: one responsibility each, return `{ start, stop }`.

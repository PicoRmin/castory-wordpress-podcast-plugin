# Castory — Roadmap توسعه (قدم‌به‌قدم)

> برنامه توسعه کامل پروژه `castory-wordpress-podcast-plugin`  
> از وضعیت فعلی (UI Prototype) تا محصول WordPress آماده production  
> آخرین به‌روزرسانی: ۶ ژوئن ۲۰۲۶

---

## نحوه استفاده

- هر `- [ ]` یک کار قابل تیک‌زدن است
- فازها **ترتیبی** هستند؛ فاز بعدی بعد از تکمیل بحرانی‌های فاز قبل شروع شود
- برچسب‌ها: `🔴 بحرانی` | `🟡 مهم` | `🟢 اختیاری`
- **پس از هر فاز:** گزارش کامل در [`docs/phases/PHASE-N.md`](phases/README.md) (فایل‌ها، load order، user flow، API، preview، وضعیت صفحات)

---

## فاز ۰ — آماده‌سازی و تصمیمات پایه ✅

**هدف:** یکپارچه‌سازی ساختار پروژه قبل از توسعه صفحات جدید  
**مدت تخمینی:** ۱–۲ روز  
**پیش‌نیاز:** ندارد  
**وضعیت:** ✅ تکمیل — ۶ ژوئن ۲۰۲۶

### ۰.۱ تصمیمات محصول

- [x] **🔴** تعیین نام نهایی برند: **`Castory`** — see `docs/DECISIONS.md` ADR-001
- [x] **🔴** تعیین scope نسخه ۱.۰: Home + Trending Video/Audio + New Episodes — ADR-002
- [x] **🟡** تعیین زبان UI پیش‌فرض (EN) — RTL/FA در v2 — ADR-003
- [x] **🟡** تعیین استراتژی asset — ADR-004

### ۰.۲ ساختار پوشه‌ها

- [x] **🔴** ایجاد ساختار استاندارد:

```
castory-wordpress-podcast-plugin/
├── docs/
│   ├── review.md
│   └── roadmap.md
├── mockups/                    ← rename از MockUps
├── prompts/                    ← انتقال *.txt
├── prototypes/                 ← rename از HomePage
│   ├── shared/
│   │   ├── css/
│   │   │   ├── tokens.css
│   │   │   ├── reset.css
│   │   │   ├── layout.css
│   │   │   └── components/
│   │   ├── js/
│   │   │   ├── utils.js
│   │   │   └── mock-data.js
│   │   └── assets/
│   ├── home/
│   ├── new-episodes/
│   ├── trending-audio/
│   ├── trending-video/
│   ├── explore/
│   ├── library/
│   ├── profile/
│   └── episode-detail/
└── plugin/                     ← فاز ۸ (WordPress)
    └── castory/
```

- [x] **🔴** rename `new-episoes` → `new-episodes`
- [x] **🟡** ایجاد `mockups/` + `MANIFEST.md` — ⚠️ PNGها باید از backup بازگردانده شوند
- [x] **🟡** انتقال ۷ فایل `.txt` به `prompts/`

### ۰.۳ ابزارها و مستندات

- [x] **🟡** ایجاد `README.md` با: معرفی، ساختار، نحوه اجرای local (Live Server)
- [x] **🟡** initialize Git repository
- [x] **🟡** ایجاد `.gitignore` (node_modules، .DS_Store، …)
- [x] **🟢** اضافه کردن `LICENSE`

### ۰.۴ Information Architecture (IA)

- [x] **🔴** تعریف منوی sidebar واحد — see `docs/IA.md`

| # | Label | Route | Active در |
|---|-------|-------|-----------|
| 1 | Home | `/` | Home |
| 2 | Explore | `/explore` | Explore |
| 3 | Podcasts | `/podcasts` | — (v2) |
| 4 | Trending | `/trending` | Trending subpages |
| 5 | Library | `/library` | Library |
| 6 | Watch Later | `/watch-later` | — (v2) |
| 7 | Creators | `/creators` | — (v2) |
| 8 | Profile | `/profile` | Profile |

- [x] **🟡** تعریف breadcrumb pattern: `Home › Section › Page`
- [x] **🟡** تعریف bottom nav موبایل (۵ آیتم): Home، Trending، Library، Notifications، Profile

**خروجی فاز ۰:** ✅ ساختار پوشه، `docs/DECISIONS.md`, `docs/IA.md`, README, Git, `prototypes/index.html` hub  
**گزارش فاز:** [`docs/phases/PHASE-0.md`](phases/PHASE-0.md)

**اقدام باقی‌مانده:** بازگردانی ۱۵ فایل PNG به `mockups/` (از backup/Figma)

---

## فاز ۱ — Design System مشترک ✅

**هدف:** حذف تکرار CSS/JS و یکسان‌سازی UI  
**مدت تخمینی:** ۲–۳ روز  
**پیش‌نیاز:** فاز ۰ (تصمیم برند + IA)  
**وضعیت:** ✅ تکمیل — ۶ ژوئن ۲۰۲۶

### ۱.۱ Design Tokens (`shared/css/tokens.css`)

- [x] **🔴** تعریف CSS variables (colors, spacing, layout, typography, effects)
- [x] **🔴** ایجاد `reset.css` (box-sizing، margin reset، scrollbar)
- [x] **🟡** ایجاد utility classes: `.glass`, `.sr-only`, `.text-muted` → `utilities.css`

### ۱.۲ Layout Components

- [x] **🔴** `layout.css`: `.app-layout` (grid/flex سه‌ستونه)
- [x] **🔴** `.sidebar` — sticky، full height، responsive collapse + drawer
- [x] **🔴** `.main-content` — padding، max-width 1600px
- [x] **🔴** `.right-panel` — 320px، stack below on tablet
- [x] **🔴** `.mobile-header` + `.bottom-nav` — show/hide breakpoints

### ۱.۳ UI Components (`shared/css/components/`)

- [x] **🔴** `buttons.css` — primary، secondary، ghost، icon-btn، pill
- [x] **🔴** `cards.css` — glass-card، episode-card، feed-card
- [x] **🔴** `forms.css` — search-box، input، radio، select
- [x] **🔴** `navigation.css` — nav-item، breadcrumb، bottom-nav
- [x] **🟡** `badges.css` — duration، video، audio، premium، verified
- [x] **🟡** `player.css` — mini-player، progress bar، controls
- [x] **🟡** `pagination.css`
- [x] **🟡** `tables.css` — episode table (Trending Audio)
- [x] **🟢** `charts.css` — bar chart، progress (Library/Profile)
- [x] **🔴** `castory.css` — bundle import

### ۱.۴ Breakpoints واحد

- [x] **🔴** media queries در `layout.css` (768 / 1024 / 1439 / 1440)

### ۱.۵ Shared JavaScript

- [x] **🔴** `mock-data.js` — 20 episodes، creators، nav، hero، top podcasts
- [x] **🔴** `utils.js` — formatRelativeDate، debounce، qs/qsa، filter/sort/paginate
- [x] **🟡** `components/sidebar.js` — mobile drawer toggle
- [x] **🟡** `components/pagination.js` — reusable paginator
- [x] **🟡** `components/filters.js` — pill + radio filter logic
- [x] **🟡** `castory.js` — init bootstrap
- [x] **🟡** `shared/preview.html` + `docs/DESIGN-SYSTEM.md`

**خروجی فاز ۱:** ✅ Design System قابل import — `prototypes/shared/css/castory.css`  
**گزارش فاز:** [`docs/phases/PHASE-1.md`](phases/PHASE-1.md)

**فاز بعدی:** migrate صفحات MVP به shared system (فاز ۲)

---

## فاز ۲ — رفع باگ و تکمیل صفحات موجود

**هدف:** صفحات فعلی production-ready شوند  
**مدت تخمینی:** ۳–۵ روز  
**پیش‌نیاز:** فاز ۱ (حداقل tokens + shared JS)  
**وضعیت:** ✅ تکمیل — جزئیات [PHASE-2.md](./phases/PHASE-2.md)

### ۲.۱ Home Page (`prototypes/home/`)

**مرجع:** `prompts/HomePage-Prompt.txt` + `mockups/Castory-homePage-*`

- [x] **🔴** migrate به shared Design System
- [x] **🔴** Hero carousel:
  - [x] کلیک روی dots برای jump به slide
  - [x] pause on hover
  - [x] sync category label با slide
- [x] **🔴** Search: فیلتر روی video + audio + new episodes
- [x] **🟡** Category chips: toggle active + filter simulation
- [x] **🟡** لینک «View All» Trending Video → `trending-video/`
- [x] **🟡** لینک «View All» Trending Audio → `trending-audio/`
- [x] **🟡** لینک «View All» New Episodes → `new-episodes/`
- [x] **🟡** Watch Later button simulation
- [x] **🟡** Create dropdown menu
- [x] **🟡** Nav links با `href` واقعی بین صفحات
- [x] **🟡** Audio cards: اضافه کردن thumbnail + duration (طبق Prompt)
- [ ] **🟡** Breakpoint 1440px جداگانه
- [ ] **🟢** `prefers-reduced-motion` برای carousel
- [ ] **✅ QA:** مقایسه side-by-side با MockUp Desktop + Mobile *(PNGها بازیابی نشده)*

### ۲.۲ New Episodes (`prototypes/new-episodes/`)

**مرجع:** `prompts/NewEpisodesPage-Prompt.txt` + MockUp

- [x] **🔴** ساخت `assets/` (avatars، episode thumbs، mic illustration) یا Unsplash URLs
- [x] **🔴** migrate به shared Design System
- [x] **🔴** تکمیل CSS: nav-menu، profile-card، pagination، gradient-card، mini-player
- [x] **🔴** لود فونت Inter
- [x] **🔴** Episode list: حداقل **۱۲–۱۵ کارت** از mock-data.js
- [x] **🔴** Pagination JS (active page switching)
- [x] **🟡** Filter pills: فیلتر All/Video/Audio/Category
- [x] **🟡** Right sidebar radio filters (type، duration، published)
- [x] **🟡** Mobile hamburger drawer
- [x] **🟡** Mobile bottom navigation
- [x] **🟡** Search input + focus effect
- [x] **🟡** Sort dropdown
- [x] **🟡** Create menu dropdown
- [x] **🟡** Notification badge dropdown
- [x] **🟡** Bookmark toggle styling (`.bookmarked`)
- [x] **🟡** Play button toggle styling (`.playing`)
- [ ] **✅ QA:** row height ~110px، thumbnail 120×72، responsive mobile

### ۲.۳ Trending Audio (`prototypes/trending-audio/`)

**مرجع:** `prompts/TrendingAudioEpisodes-prompt.txt` + MockUp

- [x] **🔴** FIX: `<script src="app.js">` → `script.js` (یا rename فایل)
- [x] **🔴** migrate به shared Design System
- [x] **🟡** اضافه کردن ۲ episode row (Daily Habits، Space) طبق Prompt
- [x] **🟡** Filter pills: فیلتر واقعی روی mock data
- [x] **🟡** Duration/Published radio filters با JS
- [x] **🟡** Pagination clickable
- [x] **🟡** Sort dropdown logic
- [x] **🟡** Bookmark toggle
- [x] **🟡** Search filter روی table rows
- [ ] **🟡** alt text برای همه images
- [ ] **🟡** aria-label برای action buttons
- [ ] **✅ QA:** table → card transform در mobile ≤768px

### ۲.۴ Trending Video — ادغام نسخه‌ها

**مرجع:** `prompts/TrendingVideoEpisodes-ViewAll-Prompt.txt` + MockUp

- [x] **🔴** انتخاب `Mobile/01` به‌عنوان **نسخه canonical**
- [x] **🔴** migrate به shared Design System
- [ ] **🔴** حذف یا archive `Desktop/01` و `Desktop/02`
- [x] **🔴** FIX sort bug:

```javascript
// mock-data: publishedAt: 1717654321000 (timestamp)
// display: formatRelativeDate(publishedAt) → "6 hrs ago"
filtered.sort((a,b) => b.publishedAt - a.publishedAt);
```

- [x] **🟡** پیاده‌سازی Search (filter title/creator)
- [x] **🟡** Bottom nav: routing بین صفحات prototype
- [ ] **🟡** Filter button → modal/panel (mobile)
- [ ] **🟡** aria-labels برای play، menu، nav buttons
- [x] **🟡** Desktop grid 4 col / tablet 2 / mobile list 110px
- [x] **🟡** Episode count: «128 Episodes» یا dynamic
- [ ] **🟢** Keyboard navigation برای pagination
- [ ] **✅ QA:** مقایسه با MockUp Desktop + Mobile

**خروجی فاز ۲:** ✅ ۴ صفحه migrate شده، linked، بدون باگ بحرانی — [PHASE-2.md](./phases/PHASE-2.md)

---

## فاز ۳ — Explore Page (جدید)

**هدف:** پیاده‌سازی Explore Dashboard  
**مدت تخمینی:** ۴–۶ روز  
**پیش‌نیاز:** فاز ۱ + ۲  
**مرجع:** `prompts/ExplorePage-Prompt.txt` + `mockups/Castory-explorePage-*`  
**وضعیت:** ✅ تکمیل — جزئیات [PHASE-3.md](./phases/PHASE-3.md)

### ۳.۱ Setup

- [x] **🔴** ایجاد `prototypes/explore/index.html`, `page.css`, `script.js`
- [x] **🔴** import shared Design System
- [x] **🔴** Sidebar با nav مخصوص Explore (Explore active)

### ۳.۲ Layout & Header

- [x] **🔴** Three-column layout (260 + flex + 320)
- [x] **🔴** Top header: search + Advanced Search + Create + Notification
- [x] **🔴** Category filter bar (Technology active default)

### ۳.۳ Main Sections

- [x] **🔴** Hero «Discover New Voices»:
  - [x] Featured label + headline + description
  - [x] Creator avatars stack
  - [x] Explore Now CTA
  - [x] Podcaster image (right)
  - [x] Slider indicators
- [x] **🔴** Trending Topics — 8 cards، grid 4-col:
  - [x] AI، Startups، Creator Economy، Productivity، Finance، Wellness، Marketing، Leadership
  - [x] هر card: title، episode count، illustration/icon
- [x] **🔴** Popular Creators — horizontal scroll:
  - [x] Avatar، name، followers، category tag، Follow button
- [x] **🔴** Popular Video Episodes — card grid
- [x] **🔴** Explore Audio Episodes:
  - [x] Play button + animated waveform CSS
- [x] **🔴** Recommended For You — mixed audio/video + type badges

### ۳.۴ Right Sidebar

- [x] **🟡** Top Creators ranking widget
- [x] **🟡** Trending Topics tag cloud
- [x] **🟡** Discovery Stats cards
- [x] **🟡** Most Followed Topics progress bars

### ۳.۵ Interactions & Responsive

- [x] **🔴** Category pill filter
- [x] **🟡** Hero slider
- [x] **🟡** Follow button toggle
- [x] **🟡** Topic card click highlight
- [x] **🔴** Tablet: right sidebar below content
- [x] **🔴** Mobile: bottom nav، horizontal scroll sections
- [ ] **✅ QA:** side-by-side MockUp Desktop + Mobile *(PNGها بازیابی نشده)*

**خروجی فاز ۳:** ✅ Explore page کامل — [PHASE-3.md](./phases/PHASE-3.md)

---

## فاز ۴ — Library Page (جدید)

**هدف:** Library Dashboard  
**مدت تخمینی:** ۵–۷ روز  
**پیش‌نیاز:** فاز ۱  
**مرجع:** `prompts/LibraryPage-Prompt.txt` + MockUp  
**وضعیت:** ✅ تکمیل — جزئیات [PHASE-4.md](./phases/PHASE-4.md)

### ۴.۱ Setup

- [x] **🔴** ایجاد `prototypes/library/`
- [x] **🔴** Sidebar 240px — My Library active
- [x] **🔴** Profile card با stats: Following، Followers، Episodes

### ۴.۲ Header

- [x] **🔴** Search input
- [x] **🟡** Create Playlist button
- [x] **🟡** Import Podcasts button
- [x] **🟡** Manage Downloads button
- [x] **🟡** Notification bell

### ۴.۳ Main Content (۶ Section)

- [x] **🔴** Stats Overview — ۶ analytics cards (icon، value، label، trend)
- [x] **🔴** Continue Listening — horizontal cards + waveform + progress
- [x] **🔴** Continue Watching — video cards + watch progress
- [x] **🔴** My Playlists — grid با collage cover
- [x] **🟡** Downloaded Content — audio/video + file size
- [x] **🟡** Saved For Later — media type tags

### ۴.۴ Right Sidebar (۴ Widget)

- [x] **🟡** Recent Activity timeline
- [x] **🟡** Storage Usage — progress bar + breakdown
- [x] **🟡** Watchlist Summary + CTA
- [x] **🟡** Listening Insights — weekly bar chart (CSS/SVG) + top categories + leaderboard

### ۴.۵ Interactions & Responsive

- [x] **🟡** Play button on Continue Listening
- [x] **🟡** Playlist more options menu
- [x] **🟡** Settings / Notifications / Logout در sidebar
- [x] **🔴** Responsive: sidebar hide mobile، sections stack
- [ ] **✅ QA:** MockUp comparison *(PNGها بازیابی نشده)*

**خروجی فاز ۴:** ✅ Library page کامل — [PHASE-4.md](./phases/PHASE-4.md)

---

## فاز ۵ — Profile Page (جدید)

**هدف:** Profile Dashboard  
**مدت تخمینی:** ۵–۷ روز  
**پیش‌نیاز:** فاز ۱  
**مرجع:** `prompts/ProfilePage-Prompt.txt` + MockUp  
**وضعیت:** ✅ تکمیل — جزئیات [PHASE-5.md](./phases/PHASE-5.md)

### ۵.۱ Setup

- [x] **🔴** ایجاد `prototypes/profile/`
- [x] **🔴** Sidebar 280px — Profile active
- [x] **🔴** Nav extended: Analytics، Monetization، Studio، Messages، Community

### ۵.۲ Hero Profile

- [x] **🔴** Cover banner (full width)
- [x] **🔴** Avatar با glowing gradient ring
- [x] **🔴** Name + verification badge + @username
- [x] **🔴** Bio، Location، Website، Join date
- [x] **🔴** Buttons: Edit Profile، Share Profile، Settings

### ۵.۳ Statistics & Achievements

- [x] **🔴** Stats row: Followers، Following، Saved Episodes، Playlists، Listening Hours
- [x] **🟡** Achievements cards (Green، Purple، Gold، Blue gradients)

### ۵.۴ Main Content

- [x] **🔴** Listening Activity timeline
- [x] **🔴** Favorite Creators — horizontal carousel
- [x] **🟡** My Playlists cards
- [x] **🟡** Saved Episodes horizontal list
- [x] **🟡** Watch History + progress bars
- [x] **🟡** Top Categories cards
- [x] **🟡** Recently Completed episodes

### ۵.۵ Right Panel

- [x] **🟡** Profile Insights + mini line charts (CSS/SVG)
- [x] **🟡** Following Summary
- [x] **🟡** Account Status card
- [x] **🟡** Storage usage progress
- [x] **🔴** Listening Activity heatmap (GitHub-style CSS grid)
- [x] **🟡** Top Interests progress bars

### ۵.۶ Interactions & Responsive

- [x] **🟡** Edit/Share/Settings button handlers (modal placeholder)
- [x] **🟡** Carousel scroll + arrow buttons
- [x] **🔴** Mobile responsive stack
- [ ] **✅ QA:** MockUp comparison *(PNGها بازیابی نشده)*

**خروجی فاز ۵:** ✅ Profile page کامل — [PHASE-5.md](./phases/PHASE-5.md)

---

## فاز ۶ — Episode Detail Pages (بدون Prompt TXT)

**هدف:** صفحات جزئیات اپیزود  
**مدت تخمینی:** ۴–۵ روز  
**پیش‌نیاز:** فاز ۲  
**مرجع:** MockUpهای `Castory-*EpisodeDetai*`  
**وضعیت:** ✅ تکمیل — جزئیات [PHASE-6.md](./phases/PHASE-6.md)

### ۶.۱ نوشتن Prompt / Spec

- [x] **🔴** ایجاد `prompts/AudioEpisodeDetail-Prompt.txt`
- [x] **🔴** ایجاد `prompts/VideoEpisodeDetail-Prompt.txt`
- [x] **🟡** ایجاد `prompts/EpisodeDetail-Mobile-Prompt.txt`

### ۶.۲ Audio Episode Detail (Desktop)

- [x] **🔴** `prototypes/episode-detail/audio/`
- [x] **🔴** Player UI: cover art، waveform/progress، controls (play/pause/skip/speed)
- [x] **🔴** Episode info: title، podcast name، description، date، duration
- [x] **🟡** Creator card + Follow
- [x] **🟡** Related episodes list
- [x] **🟡** Comments section (static mock)
- [x] **🟡** Share + Bookmark + Download buttons

### ۶.۳ Video Episode Detail (Desktop)

- [x] **🔴** `prototypes/episode-detail/video/`
- [x] **🔴** Video player area (16:9 placeholder)
- [x] **🔴** Episode metadata + creator row
- [x] **🟡** Chapters list
- [x] **🟡** Related videos grid
- [x] **🟡** Transcript section (collapsible)

### ۶.۴ Episode Detail (Mobile)

- [x] **🔴** `prototypes/episode-detail/mobile/`
- [x] **🔴** Sticky mini player bar
- [x] **🔴** Full-screen player mode
- [x] **🟡** Swipe-friendly related content

### ۶.۵ Linking

- [x] **🔴** لینک از episode cards در Home/Trending/New → Detail pages
- [x] **🟡** Back navigation + breadcrumb

**خروجی فاز ۶:** ✅ ۳ صفحه Episode Detail — [PHASE-6.md](./phases/PHASE-6.md)

---

## فاز ۷ — یکپارچه‌سازی Prototype (SPA-lite)

**هدف:** navigation روان بین صفحات  
**مدت تخمینی:** ۲–۳ روز  
**پیش‌نیاز:** فاز ۲–۶

### ۷.۱ Routing

- [x] **🟡** ایجاد `prototypes/index.html` — landing/router ساده
- [x] **🟡** Shared sidebar component (HTML include یا JS inject)
- [x] **🟡** Active state sync بر اساس `window.location.pathname`
- [x] **🟡** Bottom nav active state

### ۷.۲ Cross-page Features

- [x] **🟡** Global mini-player (persist across pages)
- [x] **🟡** Global search (redirect to Explore with query)
- [x] **🟡** Notification panel shared
- [x] **🟢** LocalStorage: watch later، bookmarks، theme

### ۷.۳ Quality

- [ ] **🔴** Accessibility audit (axe / Lighthouse)
- [x] **🔴** Performance: lazy load images، minimize CSS
- [ ] **🟡** Cross-browser test (Chrome، Firefox، Safari، Edge)
- [ ] **🟡** Mobile device test (iOS Safari، Android Chrome)
- [ ] **🟡** SEO: meta tags، Open Graph per page

**خروجی فاز ۷:** ✅ Prototype یکپارچه قابل demo — [PHASE-7.md](./phases/PHASE-7.md)

---

## فاز ۸ — WordPress Plugin Core

**هدف:** تبدیل UI به پلاگین WordPress واقعی  
**مدت تخمینی:** ۱۰–۱۵ روز  
**پیش‌نیاز:** فاز ۷

### ۸.۱ Plugin Scaffold

- [ ] **🔴** ایجاد `plugin/castory/castory.php`:

```php
/**
 * Plugin Name: Castory Podcast
 * Description: Premium podcast streaming platform
 * Version: 1.0.0
 * Requires at least: 6.0
 * Requires PHP: 8.0
 * Text Domain: castory
 */
```

- [ ] **🔴** Plugin folder structure:

```
plugin/castory/
├── castory.php
├── uninstall.php
├── includes/
│   ├── class-castory.php
│   ├── class-activator.php
│   ├── class-loader.php
│   └── class-i18n.php
├── admin/
│   ├── class-admin.php
│   └── views/
├── public/
│   ├── class-public.php
│   ├── css/
│   └── js/
├── templates/
│   ├── home.php
│   ├── explore.php
│   ├── library.php
│   ├── profile.php
│   ├── trending-audio.php
│   ├── trending-video.php
│   ├── new-episodes.php
│   └── episode-detail.php
├── blocks/               ← Gutenberg blocks
└── languages/
```

- [ ] **🔴** Activation hook: flush rewrite rules
- [ ] **🔴** Deactivation / uninstall cleanup
- [ ] **🟡** Settings page در WP Admin

### ۸.۲ Custom Post Types & Taxonomies

- [ ] **🔴** CPT: `castory_episode`
  - [ ] meta: duration، views، media_type (audio/video)، media_url
- [ ] **🔴** CPT: `castory_podcast` (show/channel)
- [ ] **🔴** Taxonomy: `castory_category`
- [ ] **🔴** Taxonomy: `castory_topic`
- [ ] **🟡** CPT: `castory_creator`
- [ ] **🟡** User meta: premium status، listening stats

### ۸.۳ Asset Pipeline

- [ ] **🔴** Enqueue shared CSS/JS via `wp_enqueue_style/script`
- [ ] **🔴** Conditional loading per page/template
- [ ] **🟡** Minify CSS/JS for production
- [ ] **🟡** RTL stylesheet support

### ۸.۴ Templates & Shortcodes

- [ ] **🔴** Page template registration
- [ ] **🔴** Shortcodes:
  - [ ] `[castory_home]`
  - [ ] `[castory_trending type="video|audio"]`
  - [ ] `[castory_new_episodes]`
  - [ ] `[castory_explore]`
  - [ ] `[castory_library]`
  - [ ] `[castory_profile]`
  - [ ] `[castory_episode id="123"]`
- [ ] **🟡** Gutenberg blocks (wrapper around shortcodes)

### ۸.۵ REST API

- [ ] **🔴** `GET /wp-json/castory/v1/episodes` — list + filter + pagination
- [ ] **🔴** `GET /wp-json/castory/v1/episodes/{id}`
- [ ] **🟡** `GET /wp-json/castory/v1/trending`
- [ ] **🟡** `GET /wp-json/castory/v1/creators`
- [ ] **🟡** User endpoints: library، watch-later، progress (auth required)

### ۸.۶ Admin UI

- [ ] **🔴** Episode editor: media upload، duration، type
- [ ] **🟡** Podcast editor: cover، creator link
- [ ] **🟡** Dashboard widget: stats overview
- [ ] **🟡** Import tool (RSS feed → episodes)

**خروجی فاز ۸:** Plugin قابل نصب در WordPress

---

## فاز ۹ — Backend Logic & User Features

**هدف:** قابلیت‌های real-user  
**مدت تخمینی:** ۱۰–۱۴ روز  
**پیش‌نیاز:** فاز ۸

### ۹.۱ Authentication & User

- [ ] **🔴** Integrate با WP user system
- [ ] **🟡** Premium membership check (WooCommerce Memberships یا custom)
- [ ] **🟡** User profile page → WP user meta

### ۹.۲ Player

- [ ] **🔴** Audio player: HTML5 `<audio>` + custom UI skin
- [ ] **🔴** Video player: HTML5 `<video>` یا embed support
- [ ] **🔴** Progress tracking → save to user meta (REST)
- [ ] **🟡** Mini-player persistent (AJAX/JS + localStorage fallback)

### ۹.۳ Library Features

- [ ] **🟡** Watch Later — custom table or user meta
- [ ] **🟡** Bookmarks
- [ ] **🟡** Playlists CRUD
- [ ] **🟡** Download tracking (file URL + permission)
- [ ] **🟢** Continue Listening/Watching (resume position)

### ۹.۴ Discovery

- [ ] **🟡** Search: WP_Query + REST search endpoint
- [ ] **🟡** Trending algorithm (views + recency)
- [ ] **🟡** Recommended For You (category affinity)
- [ ] **🟢** Full-text search (Elasticsearch optional)

### ۹.۵ Notifications

- [ ] **🟢** New episode notifications
- [ ] **🟢** Creator upload alerts
- [ ] **🟢** WP Admin email integration

**خروجی فاز ۹:** Feature-complete product

---

## فاز ۱۰ — Testing, Security & Launch

**هدف:** production deployment  
**مدت تخمینی:** ۵–۷ روز  
**پیش‌نیاز:** فاز ۹

### ۱۰.۱ Testing

- [ ] **🔴** PHPUnit: CPT registration، REST endpoints
- [ ] **🔴** JS unit tests (optional: Vitest) برای utils/filter/sort
- [ ] **🔴** E2E smoke tests (Playwright):
  - [ ] Home loads
  - [ ] Episode list pagination
  - [ ] Player play/pause
  - [ ] Login + library
- [ ] **🟡** WP compatibility: 6.0، 6.4، 6.5+
- [ ] **🟡** PHP 8.0–8.3
- [ ] **🟡** Popular themes conflict test (Astra، GeneratePress، …)

### ۱۰.۲ Security

- [ ] **🔴** Nonce verification برای AJAX/REST mutations
- [ ] **🔴** Capability checks (`manage_options`, `read`, custom caps)
- [ ] **🔴** Sanitize/escape all outputs (`esc_html`, `esc_url`, `wp_kses`)
- [ ] **🔴** Prepared statements / `$wpdb->prepare`
- [ ] **🟡** Rate limiting on REST search

### ۱۰.۳ Performance

- [ ] **🔴** Transient cache برای trending lists
- [ ] **🟡** Object cache support (Redis)
- [ ] **🟡** Lazy load episode thumbnails
- [ ] **🟡** CDN-friendly asset versioning

### ۱۰.۴ Documentation & Release

- [ ] **🔴** `README.md` — installation، shortcodes، requirements
- [ ] **🔴** `CHANGELOG.md`
- [ ] **🟡** Admin user guide (FA/EN)
- [ ] **🟡** WordPress.org submission prep (if public)
- [ ] **🟡** Version tag `v1.0.0`

**خروجی فاز ۱۰:** Castory v1.0.0 production release

---

## Timeline خلاصه

```
فاز ۰  آماده‌سازی              ████░░░░░░  1–2 روز
فاز ۱  Design System            ██████░░░░  2–3 روز
فاز ۲  تکمیل صفحات موجود        █████████░  3–5 روز
فاز ۳  Explore                   ██████████  4–6 روز
فاز ۴  Library                   ██████████  5–7 روز
فاز ۵  Profile                   ██████████  5–7 روز
فاز ۶  Episode Detail            ████████░░  4–5 روز
فاز ۷  یکپارچه‌سازی Prototype    ██████░░░░  2–3 روز
فاز ۸  WordPress Plugin          ██████████  10–15 روز
فاز ۹  Backend & Features        ██████████  10–14 روز
فاز ۱۰ Testing & Launch          ████████░░  5–7 روز
─────────────────────────────────────────────────────
کل (تقریبی):                    52–74 روز کاری
```

---

## MVP پیشنهادی (سریع‌ترین مسیر به demo)

اگر زمان محدود است، این subset را اول انجام دهید:

- [ ] فاز ۰ (فقط برند + ساختار)
- [ ] فاز ۱ (tokens + layout)
- [ ] فاز ۲ (رفع باگ‌ها + Home + Trending Video canonical)
- [ ] فاز ۷ (linking بین ۴ صفحه)
- [ ] فاز ۸.۱–۸.۴ (plugin scaffold + ۲ shortcode: home + trending)

**MVP = Home + Trending Video/Audio + New Episodes + Plugin shell**  
Explore، Library، Profile → v1.1

---

## Checklist وضعیت فعلی (Snapshot)

```
[██████████] فاز ۰ — 100% (mockup PNGs need restore from backup)
[██████████] فاز ۱ — 100%
[█████░░░░░] فاز ۲ — 50% (pages not yet migrated to shared CSS)
[░░░░░░░░░░] فاز ۳ —  0%
[░░░░░░░░░░] فاز ۴ —  0%
[░░░░░░░░░░] فاز ۵ —  0%
[░░░░░░░░░░] فاز ۶ —  0%
[░░░░░░░░░░] فاز ۷ —  0%
[░░░░░░░░░░] فاز ۸ —  0%
[░░░░░░░░░░] فاز ۹ —  0%
[░░░░░░░░░░] فاز ۱۰ — 0%
```

---

*این roadmap با `review.md` هماهنگ است. هر فاز را می‌توان به Issues/Task board (GitHub Projects، Linear، …) تبدیل کرد.*

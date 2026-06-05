# Castory — Roadmap توسعه (قدم‌به‌قدم)

> برنامه توسعه کامل پروژه `castory-wordpress-podcast-plugin`  
> از وضعیت فعلی (UI Prototype) تا محصول WordPress آماده production  
> آخرین به‌روزرسانی: ۶ ژوئن ۲۰۲۶

---

## نحوه استفاده

- هر `- [ ]` یک کار قابل تیک‌زدن است
- فازها **ترتیبی** هستند؛ فاز بعدی بعد از تکمیل بحرانی‌های فاز قبل شروع شود
- برچسب‌ها: `🔴 بحرانی` | `🟡 مهم` | `🟢 اختیاری`

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

**اقدام باقی‌مانده:** بازگردانی ۱۵ فایل PNG به `mockups/` (از backup/Figma)

---

## فاز ۱ — Design System مشترک

**هدف:** حذف تکرار CSS/JS و یکسان‌سازی UI  
**مدت تخمینی:** ۲–۳ روز  
**پیش‌نیاز:** فاز ۰ (تصمیم برند + IA)

### ۱.۱ Design Tokens (`shared/css/tokens.css`)

- [ ] **🔴** تعریف CSS variables:

```css
/* Colors */
--color-bg-primary: #050816;
--color-bg-secondary: #0B1020;
--color-bg-sidebar: #070B18;
--color-surface: #101828;
--color-card: #111827;
--color-primary: #7C3AED;
--color-primary-hover: #8B5CF6;
--color-secondary: #A855F7;
--color-success: #22C55E;
--color-info: #3B82F6;
--color-text: #FFFFFF;
--color-text-secondary: #A1A1AA;
--color-text-muted: #71717A;
--color-border: rgba(255,255,255,0.08);
--color-border-hover: rgba(124,58,237,0.35);

/* Spacing (8px scale) */
--space-1: 4px;  --space-2: 8px;  --space-3: 12px;
--space-4: 16px; --space-5: 20px; --space-6: 24px;
--space-8: 32px; --space-10: 40px; --space-12: 48px;
--space-16: 64px;

/* Layout */
--sidebar-width: 260px;
--sidebar-width-collapsed: 90px;
--right-panel-width: 320px;

/* Radius */
--radius-sm: 12px; --radius-md: 16px;
--radius-lg: 20px; --radius-xl: 24px; --radius-full: 999px;

/* Typography */
--font-family: 'Inter', system-ui, sans-serif;
--text-page-title: 48px;
--text-section-title: 28px;
--text-card-title: 20px;
--text-body: 14px;
--text-meta: 12px;

/* Effects */
--shadow-card: 0 10px 40px rgba(0,0,0,0.4);
--shadow-hover: 0 20px 60px rgba(124,58,237,0.2);
--transition: 0.25s ease;
```

- [ ] **🔴** ایجاد `reset.css` (box-sizing، margin reset، scrollbar)
- [ ] **🟡** ایجاد utility classes: `.glass`, `.sr-only`, `.text-muted`

### ۱.۲ Layout Components

- [ ] **🔴** `layout.css`: `.app-layout` (grid/flex سه‌ستونه)
- [ ] **🔴** `.sidebar` — sticky، full height، responsive collapse
- [ ] **🔴** `.main-content` — padding، max-width 1600px
- [ ] **🔴** `.right-panel` — 320px، stack below on tablet
- [ ] **🔴** `.mobile-header` + `.bottom-nav` — show/hide breakpoints

### ۱.۳ UI Components (`shared/css/components/`)

- [ ] **🔴** `buttons.css` — primary، secondary، ghost، icon-btn، pill
- [ ] **🔴** `cards.css` — glass-card، episode-card، feed-card
- [ ] **🔴** `forms.css` — search-box، input، radio، select
- [ ] **🔴** `navigation.css` — nav-item، breadcrumb، bottom-nav
- [ ] **🟡** `badges.css` — duration، video، audio، premium، verified
- [ ] **🟡** `player.css` — mini-player، progress bar، controls
- [ ] **🟡** `pagination.css`
- [ ] **🟡** `tables.css` — episode table (Trending Audio)
- [ ] **🟢** `charts.css` — bar chart، progress (Library/Profile)

### ۱.۴ Breakpoints واحد

- [ ] **🔴** تعریف media queries در یک فایل:

| Breakpoint | عرض | رفتار |
|------------|-----|--------|
| Desktop XL | ≥1440px | 4-col grid، sidebar 260px |
| Desktop | 1200–1439px | 3-col grid |
| Tablet | 769–1024px | sidebar collapsed، 2-col grid |
| Mobile | ≤768px | single column، bottom nav |

### ۱.۵ Shared JavaScript

- [ ] **🔴** `mock-data.js` — episodes، creators، categories (single source)
- [ ] **🔴** `utils.js`:
  - `formatRelativeDate(timestamp)` — جایگزین `"6 hrs ago"` برای sort
  - `debounce(fn, ms)` — search
  - `qs()` / `qsa()` helpers
- [ ] **🟡** `components/sidebar.js` — mobile drawer toggle
- [ ] **🟡** `components/pagination.js` — reusable paginator
- [ ] **🟡** `components/filters.js` — pill + radio filter logic

**خروجی فاز ۱:** Design System قابل import در همه صفحات

---

## فاز ۲ — رفع باگ و تکمیل صفحات موجود

**هدف:** صفحات فعلی production-ready شوند  
**مدت تخمینی:** ۳–۵ روز  
**پیش‌نیاز:** فاز ۱ (حداقل tokens + shared JS)

### ۲.۱ Home Page (`prototypes/home/`)

**مرجع:** `prompts/HomePage-Prompt.txt` + `mockups/Castory-homePage-*`

- [ ] **🔴** migrate به shared Design System
- [ ] **🔴** Hero carousel:
  - [ ] کلیک روی dots برای jump به slide
  - [ ] pause on hover
  - [ ] sync category label با slide
- [ ] **🔴** Search: فیلتر روی video + audio + new episodes
- [ ] **🟡** Category chips: toggle active + filter simulation
- [ ] **🟡** لینک «View All» Trending Video → `trending-video/`
- [ ] **🟡** لینک «View All» Trending Audio → `trending-audio/`
- [ ] **🟡** لینک «View All» New Episodes → `new-episodes/`
- [ ] **🟡** Watch Later button simulation
- [ ] **🟡** Create dropdown menu
- [ ] **🟡** Nav links با `href` واقعی بین صفحات
- [ ] **🟡** Audio cards: اضافه کردن thumbnail + duration (طبق Prompt)
- [ ] **🟡** Breakpoint 1440px جداگانه
- [ ] **🟢** `prefers-reduced-motion` برای carousel
- [ ] **✅ QA:** مقایسه side-by-side با MockUp Desktop + Mobile

### ۲.۲ New Episodes (`prototypes/new-episodes/`)

**مرجع:** `prompts/NewEpisodesPage-Prompt.txt` + MockUp

- [ ] **🔴** ساخت `assets/` (avatars، episode thumbs، mic illustration) یا Unsplash URLs
- [ ] **🔴** migrate به shared Design System
- [ ] **🔴** تکمیل CSS: nav-menu، profile-card، pagination، gradient-card، mini-player
- [ ] **🔴** لود فونت Inter
- [ ] **🔴** Episode list: حداقل **۱۲–۱۵ کارت** از mock-data.js
- [ ] **🔴** Pagination JS (active page switching)
- [ ] **🟡** Filter pills: فیلتر All/Video/Audio/Category
- [ ] **🟡** Right sidebar radio filters (type، duration، published)
- [ ] **🟡** Mobile hamburger drawer
- [ ] **🟡** Mobile bottom navigation
- [ ] **🟡** Search input + focus effect
- [ ] **🟡** Sort dropdown
- [ ] **🟡** Create menu dropdown
- [ ] **🟡** Notification badge dropdown
- [ ] **🟡** Bookmark toggle styling (`.bookmarked`)
- [ ] **🟡** Play button toggle styling (`.playing`)
- [ ] **✅ QA:** row height ~110px، thumbnail 120×72، responsive mobile

### ۲.۳ Trending Audio (`prototypes/trending-audio/`)

**مرجع:** `prompts/TrendingAudioEpisodes-prompt.txt` + MockUp

- [ ] **🔴** FIX: `<script src="app.js">` → `script.js` (یا rename فایل)
- [ ] **🔴** migrate به shared Design System
- [ ] **🟡** اضافه کردن ۲ episode row (Daily Habits، Space) طبق Prompt
- [ ] **🟡** Filter pills: فیلتر واقعی روی mock data
- [ ] **🟡** Duration/Published radio filters با JS
- [ ] **🟡** Pagination clickable
- [ ] **🟡** Sort dropdown logic
- [ ] **🟡** Bookmark toggle
- [ ] **🟡** Search filter روی table rows
- [ ] **🟡** alt text برای همه images
- [ ] **🟡** aria-label برای action buttons
- [ ] **✅ QA:** table → card transform در mobile ≤768px

### ۲.۴ Trending Video — ادغام نسخه‌ها

**مرجع:** `prompts/TrendingVideoEpisodes-ViewAll-Prompt.txt` + MockUp

- [ ] **🔴** انتخاب `Mobile/01` به‌عنوان **نسخه canonical**
- [ ] **🔴** migrate به shared Design System
- [ ] **🔴** حذف یا archive `Desktop/01` و `Desktop/02`
- [ ] **🔴** FIX sort bug:

```javascript
// mock-data: publishedAt: 1717654321000 (timestamp)
// display: formatRelativeDate(publishedAt) → "6 hrs ago"
filtered.sort((a,b) => b.publishedAt - a.publishedAt);
```

- [ ] **🟡** پیاده‌سازی Search (filter title/creator)
- [ ] **🟡** Bottom nav: routing بین صفحات prototype
- [ ] **🟡** Filter button → modal/panel (mobile)
- [ ] **🟡** aria-labels برای play، menu، nav buttons
- [ ] **🟡** Desktop grid 4 col / tablet 2 / mobile list 110px
- [ ] **🟡** Episode count: «128 Episodes» یا dynamic
- [ ] **🟢** Keyboard navigation برای pagination
- [ ] **✅ QA:** مقایسه با MockUp Desktop + Mobile

**خروجی فاز ۲:** ۴ صفحه کامل، بدون باگ بحرانی، linked به هم

---

## فاز ۳ — Explore Page (جدید)

**هدف:** پیاده‌سازی Explore Dashboard  
**مدت تخمینی:** ۴–۶ روز  
**پیش‌نیاز:** فاز ۱ + ۲  
**مرجع:** `prompts/ExplorePage-Prompt.txt` + `mockups/Castory-explorePage-*`

### ۳.۱ Setup

- [ ] **🔴** ایجاد `prototypes/explore/index.html`, `style.css`, `script.js`
- [ ] **🔴** import shared Design System
- [ ] **🔴** Sidebar با nav مخصوص Explore (Explore active)

### ۳.۲ Layout & Header

- [ ] **🔴** Three-column layout (260 + flex + 320)
- [ ] **🔴** Top header: search + Advanced Search + Create + Notification
- [ ] **🔴** Category filter bar (Technology active default)

### ۳.۳ Main Sections

- [ ] **🔴** Hero «Discover New Voices»:
  - [ ] Featured label + headline + description
  - [ ] Creator avatars stack
  - [ ] Explore Now CTA
  - [ ] Podcaster image (right)
  - [ ] Slider indicators
- [ ] **🔴** Trending Topics — 8 cards، grid 4-col:
  - [ ] AI، Startups، Creator Economy، Productivity، Finance، Wellness، Marketing، Leadership
  - [ ] هر card: title، episode count، illustration/icon
- [ ] **🔴** Popular Creators — horizontal scroll:
  - [ ] Avatar، name، followers، category tag، Follow button
- [ ] **🔴** Popular Video Episodes — card grid
- [ ] **🔴** Explore Audio Episodes:
  - [ ] Play button + animated waveform CSS
- [ ] **🔴** Recommended For You — mixed audio/video + type badges

### ۳.۴ Right Sidebar

- [ ] **🟡** Top Creators ranking widget
- [ ] **🟡** Trending Topics tag cloud
- [ ] **🟡** Discovery Stats cards
- [ ] **🟡** Most Followed Topics progress bars

### ۳.۵ Interactions & Responsive

- [ ] **🔴** Category pill filter
- [ ] **🟡** Hero slider
- [ ] **🟡** Follow button toggle
- [ ] **🟡** Topic card click highlight
- [ ] **🔴** Tablet: right sidebar below content
- [ ] **🔴** Mobile: bottom nav، horizontal scroll sections
- [ ] **✅ QA:** side-by-side MockUp Desktop + Mobile

**خروجی فاز ۳:** Explore page کامل

---

## فاز ۴ — Library Page (جدید)

**هدف:** Library Dashboard  
**مدت تخمینی:** ۵–۷ روز  
**پیش‌نیاز:** فاز ۱  
**مرجع:** `prompts/LibraryPage-Prompt.txt` + MockUp

### ۴.۱ Setup

- [ ] **🔴** ایجاد `prototypes/library/`
- [ ] **🔴** Sidebar 240px — My Library active
- [ ] **🔴** Profile card با stats: Following، Followers، Episodes

### ۴.۲ Header

- [ ] **🔴** Search input
- [ ] **🟡** Create Playlist button
- [ ] **🟡** Import Podcasts button
- [ ] **🟡** Manage Downloads button
- [ ] **🟡** Notification bell

### ۴.۳ Main Content (۶ Section)

- [ ] **🔴** Stats Overview — ۶ analytics cards (icon، value، label، trend)
- [ ] **🔴** Continue Listening — horizontal cards + waveform + progress
- [ ] **🔴** Continue Watching — video cards + watch progress
- [ ] **🔴** My Playlists — grid با collage cover
- [ ] **🟡** Downloaded Content — audio/video + file size
- [ ] **🟡** Saved For Later — media type tags

### ۴.۴ Right Sidebar (۴ Widget)

- [ ] **🟡** Recent Activity timeline
- [ ] **🟡** Storage Usage — progress bar + breakdown
- [ ] **🟡** Watchlist Summary + CTA
- [ ] **🟡** Listening Insights — weekly bar chart (CSS/SVG) + top categories + leaderboard

### ۴.۵ Interactions & Responsive

- [ ] **🟡** Play button on Continue Listening
- [ ] **🟡** Playlist more options menu
- [ ] **🟡** Settings / Notifications / Logout در sidebar
- [ ] **🔴** Responsive: sidebar hide mobile، sections stack
- [ ] **✅ QA:** MockUp comparison

**خروجی فاز ۴:** Library page کامل

---

## فاز ۵ — Profile Page (جدید)

**هدف:** Profile Dashboard  
**مدت تخمینی:** ۵–۷ روز  
**پیش‌نیاز:** فاز ۱  
**مرجع:** `prompts/ProfilePage-Prompt.txt` + MockUp

### ۵.۱ Setup

- [ ] **🔴** ایجاد `prototypes/profile/`
- [ ] **🔴** Sidebar 280px — Profile active
- [ ] **🔴** Nav extended: Analytics، Monetization، Studio، Messages، Community

### ۵.۲ Hero Profile

- [ ] **🔴** Cover banner (full width)
- [ ] **🔴** Avatar با glowing gradient ring
- [ ] **🔴** Name + verification badge + @username
- [ ] **🔴** Bio، Location، Website، Join date
- [ ] **🔴** Buttons: Edit Profile، Share Profile، Settings

### ۵.۳ Statistics & Achievements

- [ ] **🔴** Stats row: Followers، Following، Saved Episodes، Playlists، Listening Hours
- [ ] **🟡** Achievements cards (Green، Purple، Gold، Blue gradients)

### ۵.۴ Main Content

- [ ] **🔴** Listening Activity timeline
- [ ] **🔴** Favorite Creators — horizontal carousel
- [ ] **🟡** My Playlists cards
- [ ] **🟡** Saved Episodes horizontal list
- [ ] **🟡** Watch History + progress bars
- [ ] **🟡** Top Categories cards
- [ ] **🟡** Recently Completed episodes

### ۵.۵ Right Panel

- [ ] **🟡** Profile Insights + mini line charts (CSS/SVG)
- [ ] **🟡** Following Summary
- [ ] **🟡** Account Status card
- [ ] **🟡** Storage usage progress
- [ ] **🔴** Listening Activity heatmap (GitHub-style CSS grid)
- [ ] **🟡** Top Interests progress bars

### ۵.۶ Interactions & Responsive

- [ ] **🟡** Edit/Share/Settings button handlers (modal placeholder)
- [ ] **🟡** Carousel scroll + arrow buttons
- [ ] **🔴** Mobile responsive stack
- [ ] **✅ QA:** MockUp comparison

**خروجی فاز ۵:** Profile page کامل

---

## فاز ۶ — Episode Detail Pages (بدون Prompt TXT)

**هدف:** صفحات جزئیات اپیزود  
**مدت تخمینی:** ۴–۵ روز  
**پیش‌نیاز:** فاز ۲  
**مرجع:** MockUpهای `Castory-*EpisodeDetai*`

### ۶.۱ نوشتن Prompt / Spec

- [ ] **🔴** ایجاد `prompts/AudioEpisodeDetail-Prompt.txt`
- [ ] **🔴** ایجاد `prompts/VideoEpisodeDetail-Prompt.txt`
- [ ] **🟡** ایجاد `prompts/EpisodeDetail-Mobile-Prompt.txt`

### ۶.۲ Audio Episode Detail (Desktop)

- [ ] **🔴** `prototypes/episode-detail/audio/`
- [ ] **🔴** Player UI: cover art، waveform/progress، controls (play/pause/skip/speed)
- [ ] **🔴** Episode info: title، podcast name، description، date، duration
- [ ] **🟡** Creator card + Follow
- [ ] **🟡** Related episodes list
- [ ] **🟡** Comments section (static mock)
- [ ] **🟡** Share + Bookmark + Download buttons

### ۶.۳ Video Episode Detail (Desktop)

- [ ] **🔴** `prototypes/episode-detail/video/`
- [ ] **🔴** Video player area (16:9 placeholder)
- [ ] **🔴** Episode metadata + creator row
- [ ] **🟡** Chapters list
- [ ] **🟡** Related videos grid
- [ ] **🟡** Transcript section (collapsible)

### ۶.۴ Episode Detail (Mobile)

- [ ] **🔴** `prototypes/episode-detail/mobile/`
- [ ] **🔴** Sticky mini player bar
- [ ] **🔴** Full-screen player mode
- [ ] **🟡** Swipe-friendly related content

### ۶.۵ Linking

- [ ] **🔴** لینک از episode cards در Home/Trending/New → Detail pages
- [ ] **🟡** Back navigation + breadcrumb

**خروجی فاز ۶:** ۳ صفحه Episode Detail

---

## فاز ۷ — یکپارچه‌سازی Prototype (SPA-lite)

**هدف:** navigation روان بین صفحات  
**مدت تخمینی:** ۲–۳ روز  
**پیش‌نیاز:** فاز ۲–۶

### ۷.۱ Routing

- [ ] **🟡** ایجاد `prototypes/index.html` — landing/router ساده
- [ ] **🟡** Shared sidebar component (HTML include یا JS inject)
- [ ] **🟡** Active state sync بر اساس `window.location.pathname`
- [ ] **🟡** Bottom nav active state

### ۷.۲ Cross-page Features

- [ ] **🟡** Global mini-player (persist across pages)
- [ ] **🟡** Global search (redirect to Explore with query)
- [ ] **🟡** Notification panel shared
- [ ] **🟢** LocalStorage: watch later، bookmarks، theme

### ۷.۳ Quality

- [ ] **🔴** Accessibility audit (axe / Lighthouse)
- [ ] **🔴** Performance: lazy load images، minimize CSS
- [ ] **🟡** Cross-browser test (Chrome، Firefox، Safari، Edge)
- [ ] **🟡** Mobile device test (iOS Safari، Android Chrome)
- [ ] **🟡** SEO: meta tags، Open Graph per page

**خروجی فاز ۷:** Prototype یکپارچه قابل demo

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
[██░░░░░░░░] فاز ۱ — 20% (tokens implicit در CSS، نه shared)
[█████░░░░░] فاز ۲ — 50% (Home/Audio/Video partial)
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

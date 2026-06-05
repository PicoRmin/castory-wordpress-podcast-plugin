# Castory / PodStream — گزارش بررسی فایل‌های Prompt

> تاریخ بررسی: ۶ ژوئن ۲۰۲۶  
> **به‌روزرسانی Phase 0:** ساختار جدید — Promptها در `prompts/`، prototypeها در `prototypes/`، docs در `docs/`  
> منبع: ۷ فایل `.txt` + مقایسه با کد موجود در `prototypes/`

---

## خلاصه اجرایی

پروژه مجموعه‌ای از **Promptهای طراحی UI** برای پلتفرم پادکست/استریمینگ است. همه Promptها تکنولوژی یکسان می‌خواهند: **HTML5 + CSS3 + Vanilla JS** بدون فریم‌ورک.

| موضوع | وضعیت |
|-------|--------|
| نام برند در Promptها | عمدتاً **PodStream**؛ یک Prompt از **Castory** نام می‌برد |
| نام پوشه پروژه | `castory-wordpress-podcast-plugin` |
| کد WordPress | **وجود ندارد** |
| MockUp (PNG) | ۱۳ تصویر در `MockUps/` |
| Promptهای پیاده‌سازی‌شده (جزئی/کامل) | Home، New Episodes، Trending Audio، Trending Video |
| Promptهای بدون پیاده‌سازی | Explore، Library، Profile، Episode Detail |

---

## فهرست فایل‌های TXT

| # | فایل | صفحه هدف | MockUp مرتبط |
|---|------|----------|--------------|
| 1 | `HomePage-Prompt.txt` | صفحه اصلی | `Castory-homePage-Desktop/Mobile.png` |
| 2 | `NewEpisodesPage-Prompt.txt` | New Episodes (View All) | `Castory-NewEpisodes-viewAll.png` |
| 3 | `TrendingAudioEpisodes-prompt.txt` | Trending Audio (View All) | `Castory-TrendingAudioEpisodes-viewAll.png` |
| 4 | `TrendingVideoEpisodes-ViewAll-Prompt.txt` | Trending Video (View All) | `Castory-TrendingVideoEpisodes-viewAll.png` |
| 5 | `ExplorePage-Prompt.txt` | Explore / Discovery | `Castory-explorePage-Desktop/Mobile.png` |
| 6 | `LibraryPage-Prompt.txt` | Library Dashboard | `Castory-libraryPage-Desktop/Mobile.png` |
| 7 | `ProfilePage-Prompt.txt` | Profile Dashboard | `Castory-profilePage-Desktop/Mobile.png` |

---

## بررسی تفصیلی هر Prompt

---

### 1. `HomePage-Prompt.txt`

**هدف:** صفحه اصلی premium با Desktop و Mobile، دقت ~۹۵٪ نسبت به Figma.

**Design System تعریف‌شده:**
- پس‌زمینه `#050B18`، کارت `#111827`، Primary `#7C3AED`، Secondary `#8B5CF6`، Success `#22C55E`
- Glassmorphism، Neon purple، انیمیشن نرم
- الهام: Spotify + YouTube Podcasts + MasterClass

**Layout Desktop:**
- Sidebar چپ ۲۶۰px + محتوای اصلی + Sidebar راست ۳۰۰px

**کامپوننت‌های الزامی:**
- Logo، Navigation، Profile Card، Search، Notification، Create
- Hero Carousel (Featured badge، Category، Title، Description، CTA، Indicators)
- Trending Video Episodes (horizontal/grid)
- Trending Audio Episodes
- New Episodes Grid
- Top Creators + Trending Topics (right panel)
- Premium Upgrade Card

**Layout Mobile:**
- Single column، Category Chips، Horizontal sliders، Bottom Nav، Floating Create

**Interactions الزامی:**
- Hero slider، Follow toggle، Notification، Search، Topic filter، Watch Later، Dropdown menus

**Breakpoints:**
- Desktop ≥1440px، Laptop 1200–1439، Tablet 768–1199، Mobile <768

**Deliverables:** `index.html`, `style.css`, `script.js` + Font Awesome + Unsplash

#### وضعیت پیاده‌سازی (`HomePage/`)

| مورد | Prompt | پیاده‌سازی | وضعیت |
|------|--------|------------|--------|
| Layout سه‌ستونه | ✓ | ✓ | ✅ |
| Hero Carousel | ✓ | ✓ (auto 5s) | ⚠️ Dots بدون کلیک |
| Trending Video | ✓ | ✓ (۳ کارت) | ⚠️ View All لینک ندارد |
| Trending Audio | ✓ | ✓ (۳ کارت ساده) | ⚠️ بدون thumbnail/duration |
| New Episodes | ✓ | ✓ (۳ feed card) | ⚠️ View All ندارد |
| Top Creators / Topics | ✓ | ✓ | ✅ |
| Mobile Bottom Nav + FAB | ✓ | ✓ | ✅ |
| Category Chips | ✓ | ✓ | ⚠️ بدون تعامل JS |
| Search | ✓ | ✓ | ⚠️ فقط video cards |
| Watch Later / Dropdown | ✓ | ✗ | ❌ |
| Font Awesome | ✓ | ✓ | ✅ |
| Breakpoint 1440px | ✓ | تا 1199/768 | ⚠️ ناقص |

**امتیاز تطابق تقریبی:** ~۷۵٪

---

### 2. `NewEpisodesPage-Prompt.txt`

**هدف:** صفحه «New Episodes» SaaS-grade، mobile-first، production-ready.

**Layout:**
- Sidebar چپ ۲۶۰px (nav، profile، upgrade، mini player)
- Main: Hero + filter pills + episode list + pagination
- Sidebar راست ۲۸۰px (filter widget، top creators، newsletter)

**جزئیات بصری:**
- Background `#050816` + radial glow + noise + vignette
- Episode row ~110px، thumbnail 120×72
- Badge audio (سبز) / video (بنفش)
- Glass blur 24px، hover lift

**Interactions JS:**
- Search focus، dropdowns، filter pills، radio filters، bookmark، pagination، mobile drawer، notification dropdown، play toggle، newsletter validation

**Responsive:**
- Tablet ≤1200: right sidebar پایین
- Mobile ≤768: hamburger، bottom nav، layout عمودی

**Deliverables:** HTML + CSS + JS + **پوشه assets**

#### وضعیت پیاده‌سازی (`HomePage/new-episoes/`)

| مورد | Prompt | پیاده‌سازی | وضعیت |
|------|--------|------------|--------|
| Layout سه‌ستونه | ✓ | ✓ | ⚠️ CSS ناقص |
| Hero + microphone illustration | ✓ | ✓ (img) | ❌ asset گم‌شده |
| Filter pills | ✓ | ✓ | ✅ |
| Episode list | ✓ | ۱ کارت | ❌ |
| Pagination | ✓ | HTML static | ⚠️ بدون JS |
| Right sidebar widgets | ✓ | ✓ | ⚠️ CSS ناقص |
| Newsletter validation | ✓ | ✓ | ✅ |
| Mobile drawer / bottom nav | ✓ | ✗ | ❌ |
| Search / dropdowns | ✓ | ✗ | ❌ |
| Assets folder | ✓ | ✗ | ❌ |
| نام پوشه | episodes | `new-episoes` | ❌ typo |

**امتیاز تطابق تقریبی:** ~۴۰٪

---

### 3. `TrendingAudioEpisodes-prompt.txt`

**هدف:** صفحه Trending Audio با کیفیت production؛ الهام Spotify، Apple Podcasts، Linear، Arc، YouTube Music، Netflix.

**Layout:**
- Sidebar 260px (logo، nav، profile، upgrade، mini player، playback controls)
- Main (search، breadcrumb، hero، filters، table، pagination)
- Right sidebar 320px (filters، top podcasts ranking، premium CTA)

**Hero:**
- عنوان بزرگ + headphones illustration + animated sound waves

**Episodes Table:**
- ستون‌ها: Episode | Podcast | Duration | Published | Actions
- حداقل ۸ اپیزود نمونه در Prompt

**Filters:**
- Pills: All، Technology، Business، Health، Mindset، Marketing، Crypto، Design، Stories
- Duration radio + Published radio

**Deliverables:** `index.html`, `styles.css`, **`app.js`**

#### وضعیت پیاده‌سازی (`HomePage/trending-audio-episodes/01/`)

| مورد | Prompt | پیاده‌سازی | وضعیت |
|------|--------|------------|--------|
| Layout سه‌ستونه | ✓ | ✓ | ✅ |
| Sidebar کامل | ✓ | ✓ | ✅ |
| Hero + headphones + waves | ✓ | ✓ | ✅ |
| Table layout | ✓ | ✓ (۶ ردیف) | ⚠️ ۲ ردیف کمتر از Prompt |
| Right sidebar filters | ✓ | ✓ | ⚠️ radio بدون JS |
| Top 5 podcasts ranking | ✓ | ✓ | ✅ |
| Premium CTA + particles | ✓ | ✓ | ✅ |
| Pagination | ✓ | ✓ static | ⚠️ بدون JS |
| Mobile hamburger | ✓ | ✓ CSS+JS | ❌ **باگ: `app.js` vs `script.js`** |
| Filter pills JS | ✓ | ✓ در script.js | ❌ لود نمی‌شود |
| Accessibility / SEO | ✓ | meta description ✓ | ⚠️ alt خالی |

**باگ بحرانی:** HTML به `app.js` اشاره می‌کند؛ فایل واقعی `script.js` است.

**امتیاز تطابق تقریبی:** ~۸۰٪ (با رفع باگ JS → ~۸۵٪)

---

### 4. `TrendingVideoEpisodes-ViewAll-Prompt.txt`

**ویژگی خاص:** این فایل **ترکیبی از چند منبع** است:
1. مقدمه Chat (محدودیت طول پاسخ AI)
2. کد کامل Part 1/2/3 (HTML، CSS، JS) — همان محتوای `Mobile/01/`
3. Prompt تکمیلی بزرگ با Design System دقیق (۸px spacing scale، typography scale، breakpoints)

**نام برند:** عنوان «Castory Trending Video Episodes»؛ بدنه «PodStream».

**Design System (Prompt تکمیلی):**
- Spacing: 4–64px (scale 8px)
- Typography: Page 48px، Section 28px، Card 20px، Body 14px، Meta 12px
- Grid Desktop: 4 col، Tablet: 2، Mobile: 1 (list 110px)
- Sidebar collapsed 769–1024px
- JS: category filter، sort، pagination، search، mobile nav، 20+ episodes

**Deliverables:** `index.html`, `styles.css`, `app.js`

#### وضعیت پیاده‌سازی (۳ نسخه موازی)

| مسیر | وضعیت | توضیح |
|------|--------|--------|
| `Desktop/01/` | نیمه‌کاره | ۱ کارت HTML + ۱۲ کارت JS؛ grid 4 col |
| `Desktop/02/` | self-contained | CSS/JS inline در HTML؛ فایل‌های جدا **۰ بایت** |
| `Mobile/01/` | **کامل‌ترین** | مطابق Part 1/2/3 Prompt؛ ۲۰ episode، filter، pagination |

**مقایسه Mobile/01 با Prompt:**

| مورد | Prompt | Mobile/01 | وضعیت |
|------|--------|-----------|--------|
| Design tokens | ✓ کامل | ✓ | ✅ |
| 20 episodes mock data | ✓ | ✓ | ✅ |
| Category filter | ✓ | ✓ | ✅ |
| Sort Newest/Oldest | ✓ | ✓ | ❌ باگ: `new Date("6 hrs ago")` |
| Search functionality | ✓ در Prompt | ✗ | ❌ |
| Mobile bottom nav active | ✓ | ✓ static | ⚠️ بدون routing |
| Keyboard / ARIA | ✓ | focus-visible ✓ | ⚠️ aria-labels ناقص |
| Episode count mobile | ✓ «128 Episodes» | dynamic count | ⚠️ |
| 3 duplicate implementations | ✗ | ۳ نسخه | ❌ tech debt |

**امتیاز تطابق (Mobile/01):** ~۸۵٪  
**امتیاز کل بخش Video:** ~۶۵٪ (به‌خاطر تکرار و نسخه‌های ناقص)

---

### 5. `ExplorePage-Prompt.txt`

**هدف:** Explore Dashboard — کشف پادکست و creator.

**Layout:**
- Sidebar 260px (nav متفاوت: Explore active، Video، Audio، Podcasters، Categories، Playlists، Community، Subscriptions، Library، History، Watch Later، Downloads)
- Main content
- Right analytics sidebar 320px

**Sections:**
- Top Header (search، advanced search، create، notification)
- Category Filter Bar (Technology active)
- Hero «Discover New Voices» + podcaster image + slider
- Trending Topics (8 cards، 4-col grid)
- Popular Creators (horizontal)
- Popular Video Episodes
- Explore Audio Episodes (waveform animated)
- Recommended For You (mixed)
- Right: Top Creators ranking، tag cloud، Discovery Stats، progress chart

**Colors:** purple + **blue** `#3B82F6` (تنها Prompt با accent آبی)

**Deliverables:** `index.html`, `style.css`, `script.js`

#### وضعیت پیاده‌سازی

**❌ پیاده‌سازی نشده** — MockUp موجود: `Castory-explorePage-Desktop.png`, `Castory-explorePage-Mobile.png`

**پیچیدگی:** بالا — بیشترین تعداد section در بین Promptهای باقی‌مانده.

---

### 6. `LibraryPage-Prompt.txt`

**هدف:** Library & Video Dashboard — مدیریت محتوای شخصی کاربر.

**Layout:**
- Sidebar 240px (My Library active)
- Main + Right analytics 320px

**Sections Main:**
1. Stats Overview (۶ analytics card)
2. Continue Listening (waveform + progress)
3. Continue Watching
4. My Playlists (grid)
5. Downloaded Content
6. Saved For Later

**Sections Right:**
1. Recent Activity timeline
2. Storage Usage
3. Watchlist Summary
4. Listening Insights (bar chart + leaderboard)

**Colors:** Primary `#7B4DFF`، Success `#00E08A` (متفاوت از بقیه)

**Header actions:** Create Playlist، Import Podcasts، Manage Downloads

#### وضعیت پیاده‌سازی

**❌ پیاده‌سازی نشده** — MockUp: `Castory-libraryPage-Desktop/Mobile.png`

**پیچیدگی:** بسیار بالا — dashboard analytics + charts.

---

### 7. `ProfilePage-Prompt.txt`

**هدف:** Profile Dashboard — پروفایل کاربر/creator.

**Layout:**
- Sidebar 280px (Profile active + Analytics، Monetization، Studio، Messages، Community)
- Main + Right panel 320px

**Sections:**
- Hero: cover banner، avatar با gradient ring، bio، location، website، join date، action buttons
- Statistics: Followers، Following، Saved، Playlists، Listening Hours
- Achievements (colorful cards)
- Main: Listening Activity، Favorite Creators carousel، Playlists، Saved Episodes، Watch History، Top Categories، Recently Completed
- Right: Profile Insights، mini charts، Following Summary، Account Status، Storage، **GitHub-style heatmap**، Top Interests

**Background:** `#030712` (تیره‌تر از بقیه)

#### وضعیت پیاده‌سازی

**❌ پیاده‌سازی نشده** — MockUp: `Castory-profilePage-Desktop/Mobile.png`

**پیچیدگی:** بسیار بالا — heatmap و charts.

---

## MockUpهای بدون Prompt TXT

| MockUp | توضیح |
|--------|--------|
| `Castory-AudioEpisodeDetile-Desktop.png` | جزئیات اپیزود صوتی |
| `Castory-EpisodeDetail-Mobile.png` | جزئیات اپیزود (موبایل) |
| `Castory-VideoEpisodeDetai-Desktopl.png` | جزئیات اپیزود ویدیو (typo در نام فایل) |
| `Casory-TrendingEpisodes-ViewAll-Mobile.png` | typo «Casory» |

---

## تحلیل مشترک بین Promptها

### Design System (همپوشانی)

| Token | Home | New Ep | Audio | Video | Explore | Library | Profile |
|-------|------|--------|-------|-------|---------|---------|---------|
| BG `#050816`/`#050B18` | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | `#030712` |
| Primary `#7C3AED` | ✓ | ✓ | `#7C4DFF` | ✓ | ✓ | `#7B4DFF` | ✓ |
| Success Green | `#22C55E` | ✓ | — | ✓ | — | `#00E08A` | — |
| Sidebar width | 260 | 260 | 260 | 260 | 260 | **240** | **280** |
| Glassmorphism | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Inter font | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |

**نتیجه:** Design tokens تقریباً یکسان‌اند اما **اعداد دقیق sidebar و accent کمی متفاوت** — نیاز به یک Design System واحد.

### Navigation Menu (ناهماهنگی)

| آیتم | Home | New Ep | Audio/Video | Explore | Library | Profile |
|------|------|--------|-------------|---------|---------|---------|
| Home | ✓ | ✓ | ✓ | ✓ | — | ✓ |
| Podcasts | ✓ | ✓ | ✓ | — | — | — |
| Trending | ✓ | ✓ | ✓ | — | — | — |
| Library | ✓ | ✓ | ✓ | My Library | ✓ | ✓ |
| Explore | — | — | — | ✓ active | — | ✓ |
| Creators/Community | ✓ | ✓ | ✓ | Community | — | ✓ |
| Analytics/Studio | — | — | — | — | — | ✓ |

**نتیجه:** هر Prompt منوی sidebar متفاوتی دارد — قبل از WordPress باید **Information Architecture** یکپارچه شود.

### Tech Stack (یکسان)

- HTML5 + CSS3 + Vanilla JS
- بدون React/Vue/Bootstrap/Tailwind
- Google Fonts (Inter) — همه به‌جز Home که Font Awesome هم دارد
- Mock/static data
- Unsplash placeholders

---

## مشکلات ساختاری پروژه (فراتر از Prompt)

| # | مشکل | شدت |
|---|------|-----|
| 1 | نام پروژه WordPress plugin اما بدون PHP | 🔴 |
| 2 | برند PodStream vs Castory | 🟡 |
| 3 | ۳ نسخه Trending Video | 🟡 |
| 4 | CSS/JS تکراری بدون shared assets | 🟡 |
| 5 | `trending-audio` → `app.js` broken | 🔴 |
| 6 | `new-episoes` assets missing | 🔴 |
| 7 | بدون README / Git / package manager | 🟡 |
| 8 | Episode Detail بدون Prompt TXT | 🟡 |

---

## ماتریس پیاده‌سازی کلی

```
صفحه                    Prompt TXT    MockUp    HTML/CSS/JS    تطابق
─────────────────────────────────────────────────────────────────────
Home                    ✅            ✅        ✅ (~75%)      ⚠️
New Episodes            ✅            ✅        ⚠️ (~40%)      ❌
Trending Audio          ✅            ✅        ✅ (~80%)      ⚠️
Trending Video          ✅            ✅        ⚠️ (~65%)      ⚠️
Explore                 ✅            ✅        ❌             ❌
Library                 ✅            ✅        ❌             ❌
Profile                 ✅            ✅        ❌             ❌
Episode Detail          ❌            ✅        ❌             ❌
```

---

## اولویت‌های اصلاحی (بر اساس Prompt + کد)

### فوری
1. رفع `app.js` → `script.js` در Trending Audio
2. ساخت/جایگزینی assets در New Episodes
3. تصمیم نهایی برند: **Castory** یا **PodStream**
4. حذف/ادغام نسخه‌های تکراری Trending Video

### کوتاه‌مدت
5. تکمیل Home طبق Prompt (Watch Later، dropdown، search همه sections)
6. تکمیل New Episodes (episode list، mobile drawer، pagination JS)
7. رفع sort bug در Video (فیلد `publishedAt` timestamp)

### میان‌مدت
8. پیاده‌سازی Explore، Library، Profile طبق Prompt
9. Prompt TXT برای Episode Detail
10. Design System مشترک (`shared/css/tokens.css`)

### بلندمدت
11. تبدیل به WordPress Plugin (shortcodes/blocks)
12. اتصال به API/backend واقعی

---

## جمع‌بندی

Promptها **مشخصات UI غنی و حرفه‌ای** برای یک SaaS پادکست هستند. Home و Trending Audio نزدیک‌ترین پیاده‌سازی‌ها به MockUpند. Trending Video در `Mobile/01` کامل است اما سه نسخه موازی tech debt ایجاد کرده. Explore، Library و Profile **فقط Prompt + MockUp** دارند و کد ندارند.

پروژه در فاز **UI Prototype** است، نه WordPress Plugin. مسیر بعدی: یکپارچه‌سازی → تکمیل صفحات → Episode Detail → WordPress integration.

---

*برای برنامه قدم‌به‌قدم توسعه، فایل `roadmap.md` را ببینید.*

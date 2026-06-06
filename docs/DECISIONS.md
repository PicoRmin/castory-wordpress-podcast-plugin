# Castory — Product Decisions (Phase 0)

> تصمیمات رسمی پروژه. هر تغییر باید در این فایل ثبت شود.  
> تاریخ: ۶ ژوئن ۲۰۲۶

---

## ADR-001: Brand Name

**تصمیم:** نام محصول **`Castory`** است.

| منبع | نام قبلی |
|------|----------|
| پوشه پروژه | `castory-wordpress-podcast-plugin` |
| MockUpها | Castory |
| Promptهای AI | PodStream |

**اقدام بعدی (فاز ۲):** ✅ انجام شد — «PodStream» در prototypeهای canonical با «Castory» جایگزین شد (`_archive/` مستثنی).

**Plugin slug:** `castory`  
**Text domain:** `castory`

---

## ADR-002: MVP Scope (v1.0)

صفحات **داخل MVP:**

| # | Page | Prototype Path | WordPress |
|---|------|----------------|-----------|
| 1 | Home | `prototypes/home/` | `[castory_home]` |
| 2 | Trending Video (View All) | `prototypes/trending-video/` | `[castory_trending type="video"]` |
| 3 | Trending Audio (View All) | `prototypes/trending-audio/` | `[castory_trending type="audio"]` |
| 4 | New Episodes (View All) | `prototypes/new-episodes/` | `[castory_new_episodes]` |

صفحات **v1.1** (بعد از MVP):

- Explore → `prototypes/explore/`
- Library → `prototypes/library/`
- Profile → `prototypes/profile/`
- Episode Detail → `prototypes/episode-detail/`

**خارج از scope فعلی:** Podcasts listing، Watch Later، Creators directory (placeholder در nav).

---

## ADR-003: UI Language & i18n

**تصمیم:**

- زبان پیش‌فرض UI: **English (EN)**
- جهت: **LTR**
- فارسی/RTL: **v2** — ساختار HTML/CSS از الان RTL-ready (logical properties در فاز ۱)

**WordPress:** فایل‌های `languages/castory-fa_IR.po` در فاز ۸.

---

## ADR-004: Asset Strategy

| محیط | استرategy |
|------|-----------|
| **Prototypes (فعلی)** | Unsplash / Picsum CDN برای placeholder |
| **Production plugin** | WordPress Media Library + featured images |
| **Shared icons** | Font Awesome 6 (CDN) در prototype؛ SVG local در plugin |
| **MockUps** | PNG محلی در `mockups/` — مرجع طراحی |

**قانون:** هیچ asset باینری commit سنگین بدون بهینه‌سازی. Thumbnail هدف: ≤200KB.

---

## ADR-005: Tech Stack

| Layer | Choice |
|-------|--------|
| Prototypes | HTML5 + CSS3 + Vanilla JS |
| Plugin | PHP 8.0+ / WordPress 6.0+ |
| CSS | Custom Design System (no Tailwind/Bootstrap) |
| JS (frontend) | Vanilla ES6+ |
| Build tools | None در فاز ۰–۷؛ optional minify در فاز ۸ |

---

## ADR-006: Canonical Implementations

| Page | Canonical | Archive |
|------|-----------|---------|
| Trending Video | `prototypes/trending-video/` | `_archive/trending-video/desktop-01`, `desktop-02` |

نسخه‌های archive فقط برای مرجع تاریخی — **استفاده نشوند**.

---

## ADR-007: Repository Structure

ساختار رسمی در `README.md` تعریف شده. مسیرهای قدیمی (`HomePage/`, `MockUps/`, `new-episoes/`) **منسوخ** هستند.

---

## Open Questions (برای تصمیم بعدی)

- [ ] WooCommerce برای Premium membership یا custom meta؟
- [ ] Video hosting: self-hosted vs YouTube/Vimeo embed؟
- [ ] Multi-site WordPress support در v1.0؟

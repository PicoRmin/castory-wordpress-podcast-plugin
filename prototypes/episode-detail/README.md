# Episode Detail Pages

**Status:** ✅ Built (Phase 6)  
**MockUps:** `Castory-AudioEpisodeDetile-Desktop.png`, `Castory-VideoEpisodeDetai-Desktopl.png`, `Castory-EpisodeDetail-Mobile.png`

| Variant | Path | Default `?id=` |
|---------|------|----------------|
| Audio Desktop | `audio/index.html` | 14 |
| Video Desktop | `video/index.html` | 2 |
| Mobile (unified) | `mobile/index.html` | 14 or 2 |

**Prompts:** `prompts/AudioEpisodeDetail-Prompt.txt`, `VideoEpisodeDetail-Prompt.txt`, `EpisodeDetail-Mobile-Prompt.txt`

**Shared JS:** `prototypes/shared/js/episode-detail.js`

Episode cards on Home, Trending, New Episodes, and Explore link via `CASTORY_MOCK.getEpisodeUrl(ep, '../')`.

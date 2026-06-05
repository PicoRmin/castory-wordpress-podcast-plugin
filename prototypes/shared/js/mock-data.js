/**
 * Castory mock data — single source of truth (Phase 1)
 * @see docs/DECISIONS.md ADR-004
 */
const CASTORY_MOCK = {
  brand: 'Castory',
  categories: ['All', 'Technology', 'Business', 'AI', 'Marketing', 'Startups', 'Design', 'Crypto'],
  episodes: []
};

if (typeof module !== 'undefined') module.exports = CASTORY_MOCK;

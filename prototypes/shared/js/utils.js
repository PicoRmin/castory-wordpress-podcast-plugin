/**
 * Castory shared utilities
 */
(function (global) {
  const Castory = global.Castory || {};

  Castory.qs = function (selector, root) {
    return (root || document).querySelector(selector);
  };

  Castory.qsa = function (selector, root) {
    return Array.from((root || document).querySelectorAll(selector));
  };

  Castory.debounce = function (fn, ms) {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(function () {
        fn.apply(this, args);
      }, ms);
    };
  };

  Castory.formatRelativeDate = function (timestamp) {
    const diff = Date.now() - timestamp;
    if (diff < 60000) return 'Just now';
    const minutes = Math.floor(diff / 60000);
    if (minutes < 60) return minutes + ' min ago';
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return hours + ' hr' + (hours > 1 ? 's' : '') + ' ago';
    const days = Math.floor(hours / 24);
    if (days < 7) return days + ' day' + (days > 1 ? 's' : '') + ' ago';
    const weeks = Math.floor(days / 7);
    if (weeks < 5) return weeks + ' week' + (weeks > 1 ? 's' : '') + ' ago';
    return new Date(timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  Castory.formatViews = function (count) {
    if (count >= 1000000) return (count / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
    if (count >= 1000) return Math.round(count / 1000) + 'K';
    return String(count);
  };

  Castory.filterEpisodes = function (episodes, options) {
    const opts = options || {};
    let result = episodes.slice();

    if (opts.category && opts.category !== 'All') {
      result = result.filter(function (ep) {
        return ep.category === opts.category;
      });
    }

    if (opts.mediaType && opts.mediaType !== 'all') {
      result = result.filter(function (ep) {
        return ep.mediaType === opts.mediaType;
      });
    }

    if (opts.search) {
      const q = opts.search.toLowerCase().trim();
      if (q) {
        result = result.filter(function (ep) {
          return (
            ep.title.toLowerCase().includes(q) ||
            ep.creator.toLowerCase().includes(q) ||
            (ep.podcast && ep.podcast.toLowerCase().includes(q))
          );
        });
      }
    }

    return result;
  };

  Castory.sortEpisodes = function (episodes, sortBy) {
    const sorted = episodes.slice();
    switch (sortBy) {
      case 'Newest':
        return sorted.sort(function (a, b) {
          return b.publishedAt - a.publishedAt;
        });
      case 'Oldest':
        return sorted.sort(function (a, b) {
          return a.publishedAt - b.publishedAt;
        });
      case 'Most Popular':
      default:
        return sorted.sort(function (a, b) {
          return b.viewsCount - a.viewsCount;
        });
    }
  };

  Castory.paginate = function (items, page, pageSize) {
    const start = (page - 1) * pageSize;
    return items.slice(start, start + pageSize);
  };

  Castory.getTotalPages = function (totalItems, pageSize) {
    return Math.max(1, Math.ceil(totalItems / pageSize));
  };

  Castory.loadScript = function (src) {
    return new Promise(function (resolve, reject) {
      const script = document.createElement('script');
      script.src = src;
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  };

  Castory.lazyLoadImages = function () {
    Castory.qsa('img:not([loading])').forEach(function (img) {
      if (img.closest('.global-player, .notification-panel')) return;
      img.setAttribute('loading', 'lazy');
      img.addEventListener('load', function () { img.classList.add('is-loaded'); });
      if (img.complete) img.classList.add('is-loaded');
    });
  };

  /**
   * Wait for WordPress REST hydration (castory-wp-data.js) before running page logic.
   */
  Castory.whenReady = function (fn) {
    var ready = global.castoryDataReady;
    if (ready && typeof ready.then === 'function') {
      ready.then(function () { fn(); }).catch(function () { fn(); });
      return;
    }
    fn();
  };

  global.Castory = Castory;
})(typeof window !== 'undefined' ? window : globalThis);

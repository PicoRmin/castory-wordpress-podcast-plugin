/**
 * Reusable pagination renderer
 */
(function (global) {
  const Castory = global.Castory || {};

  Castory.Pagination = {
    render: function (container, options) {
      if (!container) return;
      const opts = Object.assign(
        {
          currentPage: 1,
          totalPages: 1,
          maxVisible: 7,
          prevLabel: '‹',
          nextLabel: '›',
          onChange: null,
        },
        options
      );

      container.innerHTML = '';
      if (opts.totalPages <= 1) return;

      function addButton(label, page, disabled, active) {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'page-btn' + (active ? ' active' : '');
        btn.textContent = label;
        btn.disabled = !!disabled;
        if (!disabled && page !== opts.currentPage) {
          btn.addEventListener('click', function () {
            if (typeof opts.onChange === 'function') opts.onChange(page);
          });
        }
        container.appendChild(btn);
      }

      addButton(opts.prevLabel, opts.currentPage - 1, opts.currentPage === 1, false);

      const pages = this._buildPageList(opts.currentPage, opts.totalPages, opts.maxVisible);
      pages.forEach(function (item) {
        if (item === '...') {
          const span = document.createElement('span');
          span.className = 'text-muted';
          span.textContent = '…';
          span.style.padding = '0 8px';
          container.appendChild(span);
        } else {
          addButton(String(item), item, false, item === opts.currentPage);
        }
      });

      addButton(opts.nextLabel, opts.currentPage + 1, opts.currentPage === opts.totalPages, false);
    },

    _buildPageList: function (current, total, maxVisible) {
      if (total <= maxVisible) {
        return Array.from({ length: total }, function (_, i) {
          return i + 1;
        });
      }

      const pages = [1];
      const start = Math.max(2, current - 1);
      const end = Math.min(total - 1, current + 1);

      if (start > 2) pages.push('...');
      for (let i = start; i <= end; i++) pages.push(i);
      if (end < total - 1) pages.push('...');
      pages.push(total);
      return pages;
    },
  };

  global.Castory = Castory;
})(typeof window !== 'undefined' ? window : globalThis);

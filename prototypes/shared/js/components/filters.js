/**
 * Filter pills & radio groups
 */
(function (global) {
  const Castory = global.Castory || {};

  Castory.Filters = {
    initPills: function (selector, options) {
      const opts = options || {};
      const pills = Castory.qsa(selector);
      if (!pills.length) return;

      pills.forEach(function (pill) {
        pill.addEventListener('click', function () {
          const group = pill.closest(opts.group || '.filter-pills, .category-pills, .filters, .chips, .section-top');
          const scope = group || pill.parentElement;
          Castory.qsa('.pill, .chip, .category-pill', scope).forEach(function (p) {
            p.classList.remove('active');
          });
          pill.classList.add('active');
          if (typeof opts.onChange === 'function') {
            opts.onChange(pill.textContent.trim(), pill);
          }
        });
      });
    },

    initRadios: function (name, options) {
      const opts = options || {};
      const radios = Castory.qsa('input[type="radio"][name="' + name + '"]');
      if (!radios.length) return;

      radios.forEach(function (radio) {
        radio.addEventListener('change', function () {
          if (typeof opts.onChange === 'function') {
            const label = radio.closest('label');
            opts.onChange(radio.value || (label ? label.textContent.trim() : ''), radio);
          }
        });
      });
    },

    getActivePill: function (container) {
      const root = container ? Castory.qs(container) : document;
      const active = root && Castory.qs('.pill.active, .chip.active, .category-pill.active', root);
      return active ? active.textContent.trim() : 'All';
    },
  };

  global.Castory = Castory;
})(typeof window !== 'undefined' ? window : globalThis);

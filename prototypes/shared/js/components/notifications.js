/**
 * Shared notification panel (Phase 7)
 */
(function (global) {
  var Castory = global.Castory || {};

  Castory.Notifications = {
    panel: null,

    init: function () {
      var self = this;
      var panel = document.createElement('div');
      panel.className = 'notification-panel glass';
      panel.id = 'notificationPanel';
      panel.setAttribute('aria-hidden', 'true');
      panel.innerHTML = '<div class="notification-panel__header"><h3>Notifications</h3>' +
        '<button type="button" class="notification-panel__close" aria-label="Close">×</button></div>' +
        '<div class="notification-panel__list" id="notificationList"></div>';
      document.body.appendChild(panel);
      this.panel = panel;

      panel.querySelector('.notification-panel__close').addEventListener('click', function () {
        self.close();
      });

      document.addEventListener('click', function (e) {
        var btn = e.target.closest('.icon-btn, [data-notifications-toggle]');
        if (!btn) return;
        var isBell = btn.querySelector('.fa-bell') || btn.textContent.indexOf('🔔') !== -1;
        if (isBell) {
          e.preventDefault();
          e.stopPropagation();
          self.toggle();
        }
      });

      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') self.close();
      });

      this.render();
    },

    render: function () {
      var list = document.getElementById('notificationList');
      if (!list || !global.CASTORY_MOCK) return;
      var items = CASTORY_MOCK.notifications || [];
      list.innerHTML = items.map(function (n) {
        return '<article class="notification-item' + (n.read ? '' : ' unread') + '">' +
          '<p><strong>' + n.title + '</strong></p>' +
          '<span class="text-muted">' + n.timeAgo + '</span></article>';
      }).join('') || '<p class="text-muted">No notifications</p>';
    },

    toggle: function () {
      if (!this.panel) return;
      var open = this.panel.classList.toggle('is-open');
      this.panel.setAttribute('aria-hidden', open ? 'false' : 'true');
    },

    close: function () {
      if (!this.panel) return;
      this.panel.classList.remove('is-open');
      this.panel.setAttribute('aria-hidden', 'true');
    },
  };

  global.Castory = Castory;
})(typeof window !== 'undefined' ? window : globalThis);

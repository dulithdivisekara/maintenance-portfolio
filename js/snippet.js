/*!
 * coming-soon-page-03 - Colorlib. No jQuery, no framework.
 * Behaviours: own-script
 */
/* The page's own script, unchanged: it never needed jQuery. */
(() => {
  'use strict';

  const root = document.querySelector('.cl-soon03');
  if (!root) return;

  
  const resolveTarget = (el) => {
    const fixed = Date.parse(el.dataset.launch || '');
    if (!Number.isNaN(fixed) && fixed > Date.now()) return fixed;
    const d = new Date();
    d.setDate(d.getDate() + (parseInt(el.dataset.days, 10) || 21));
    d.setHours(parseInt(el.dataset.hour, 10) || 9, 0, 0, 0);
    return d.getTime();
  };

  const plural = (n, word) => `${n} ${word}${n === 1 ? '' : 's'}`;

  
  const initCountdown = () => {
    const box = root.querySelector('[data-countdown]');
    if (!box) return;
    const target = resolveTarget(box);
    const out = {};
    box.querySelectorAll('[data-unit]').forEach((el) => { out[el.dataset.unit] = el; });
    const dateEl = root.querySelector('[data-launch-date]');
    if (dateEl) {
      dateEl.textContent = new Intl.DateTimeFormat(undefined, { weekday: 'long', day: 'numeric', month: 'long' }).format(target);
      dateEl.setAttribute('datetime', new Date(target).toISOString());
    }
    const pad = (n) => String(n).padStart(2, '0');
    let lastMinute = -1;
    let timer = 0;

    const render = () => {
      const s = Math.max(0, Math.floor((target - Date.now()) / 1000));
      const d = Math.floor(s / 86400);
      const h = Math.floor((s % 86400) / 3600);
      const m = Math.floor((s % 3600) / 60);
      out.days.textContent = String(d);
      out.hours.textContent = pad(h);
      out.minutes.textContent = pad(m);
      out.seconds.textContent = pad(s % 60);
      const minute = Math.floor(s / 60);
      if (minute !== lastMinute) {
        lastMinute = minute;
        box.setAttribute('aria-label', s ? `${plural(d, 'day')}, ${plural(h, 'hour')} and ${plural(m, 'minute')} until relaunch` : 'Portfolio is live');
      }
      if (s) timer = window.setTimeout(render, 1000 - (Date.now() % 1000) + 5);
    };
    render();
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden) { window.clearTimeout(timer); render(); }
    });
  };

  
  const initSignup = () => {
    const form = root.querySelector('[data-form]');
    const input = form && form.querySelector('input[type="email"]');
    const error = root.querySelector('[data-error]');
    const done = root.querySelector('[data-done]');
    const submit = root.querySelector('[data-submit]');
    if (!form || !input || !error || !done) return;

    const messageFor = () => {
      if (input.validity.valueMissing) return 'Please enter your email address.';
      if (input.validity.typeMismatch) return 'That email looks incomplete, for example name@example.com.';
      return '';
    };
    const validate = () => {
      input.value = input.value.trim();
      const msg = messageFor();
      error.textContent = msg;
      error.hidden = !msg;
      if (msg) input.setAttribute('aria-invalid', 'true');
      else input.removeAttribute('aria-invalid');
      return !msg;
    };

    input.addEventListener('input', () => { if (input.hasAttribute('aria-invalid')) validate(); });
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!validate()) { input.focus(); return; }
      submit.disabled = true;
      submit.setAttribute('aria-busy', 'true');
      try {
        const list = JSON.parse(localStorage.getItem('dulith_notif_subscribers') || '[]');
        if (!list.includes(input.value)) {
          list.push({ email: input.value, timestamp: new Date().toISOString() });
          localStorage.setItem('dulith_notif_subscribers', JSON.stringify(list));
        }
      } catch (err) {}
      window.setTimeout(() => {
        root.querySelector('[data-echo]').textContent = input.value;
        form.hidden = true;
        done.hidden = false;
        done.focus();
      }, 400);
    });
  };

  initCountdown();
  initSignup();
})();


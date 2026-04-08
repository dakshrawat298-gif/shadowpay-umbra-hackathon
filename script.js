/* ─────────────────────────────────────────────────
   ShadowPay — View Router & Interaction Logic
   Pure Vanilla JavaScript, zero dependencies
───────────────────────────────────────────────── */

// All top-level view section IDs
const VIEWS = ['view-landing', 'view-dashboard', 'view-pay'];

// ── View Navigation ────────────────────────────
function showView(targetId) {
  VIEWS.forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;

    if (id === targetId) {
      el.classList.remove('hidden');
      el.classList.add('animate-fade');
      // Force a reflow so the animation triggers fresh each time
      void el.offsetHeight;
      // Remove the animation class after it plays (so it can re-trigger)
      el.addEventListener('animationend', () => {
        el.classList.remove('animate-fade');
      }, { once: true });
      // Scroll to top on view change
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      el.classList.remove('animate-fade');
      el.classList.add('hidden');
    }
  });
}

// ── Wallet Connect Toggle ──────────────────────
let walletConnected = false;

function toggleWallet() {
  walletConnected = !walletConnected;
  const btn = document.getElementById('connectWalletBtn');
  const label = document.getElementById('walletLabel');
  const toastMsg = document.getElementById('toast-wallet-msg');
  const toast = document.getElementById('toast-wallet');

  if (walletConnected) {
    label.textContent = '0x3f4a...c91d';
    btn.classList.add('connected');
    toastMsg.textContent = 'Wallet connected!';
  } else {
    label.textContent = 'Connect Wallet';
    btn.classList.remove('connected');
    toastMsg.textContent = 'Wallet disconnected.';
  }

  showToast(toast);
}

// ── Pay Button Interaction ─────────────────────
function triggerPay() {
  const btn = document.getElementById('payBtn');
  const toast = document.getElementById('toast-success');

  // Loading state
  btn.classList.add('loading');
  btn.innerHTML = `
    <svg class="animate-spin text-zinc-950" style="width:20px;height:20px;" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
    </svg>
    Processing…
  `;

  // Simulate async tx (1.8 seconds)
  setTimeout(() => {
    btn.classList.remove('loading');
    btn.innerHTML = `
      <i class="ph-bold ph-check-circle text-xl"></i>
      Payment Sent!
    `;
    btn.style.background = 'linear-gradient(135deg, #14F195 0%, #0dcf7e 100%)';

    showToast(toast, 4000);

    // Reset button after a moment
    setTimeout(() => {
      btn.innerHTML = `
        <i class="ph-bold ph-eye-slash text-xl"></i>
        Pay Confidentially via Umbra
      `;
      btn.style.background = '';
    }, 4200);
  }, 1800);
}

// ── Toast Helper ───────────────────────────────
function showToast(toastEl, duration = 3000) {
  if (!toastEl) return;
  toastEl.classList.remove('toast-hidden');
  toastEl.classList.add('toast-visible');
  setTimeout(() => {
    toastEl.classList.remove('toast-visible');
    toastEl.classList.add('toast-hidden');
  }, duration);
}

// ── Nav Tabs (visual active state only) ────────
document.querySelectorAll('.nav-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active-tab'));
    tab.classList.add('active-tab');
  });
});

// ── Input focus ring enhancement ───────────────
document.querySelectorAll('.input-field input, .input-field textarea').forEach(input => {
  input.addEventListener('focus', () => {
    input.closest('.input-field')?.classList.add('focus-within');
  });
  input.addEventListener('blur', () => {
    input.closest('.input-field')?.classList.remove('focus-within');
  });
});

// ── Keyboard shortcut: Escape → Landing ────────
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    const dashboard = document.getElementById('view-dashboard');
    const pay = document.getElementById('view-pay');
    if (!dashboard.classList.contains('hidden') || !pay.classList.contains('hidden')) {
      showView('view-landing');
    }
  }
});

// ── On DOM Ready ───────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  // Ensure landing is shown by default
  showView('view-landing');
});

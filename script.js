let currentView = 'view-landing';
let walletConnected = true; // Set true by default for screenshots

// Smooth Slide Views
function showView(targetId) {
  if (targetId === currentView) return;

  const targetEl = document.getElementById(targetId);
  const currentEl = document.getElementById(currentView);

  if (currentEl) {
    currentEl.classList.add('animate-slide-out');
    currentEl.addEventListener('animationend', function handleOut() {
      currentEl.classList.add('hidden');
      currentEl.classList.remove('animate-slide-out');
      currentEl.removeEventListener('animationend', handleOut);
    });
  }

  if (targetEl) {
    targetEl.classList.remove('hidden');
    targetEl.classList.add('animate-slide-in');
    targetEl.addEventListener('animationend', function handleIn() {
      targetEl.classList.remove('animate-slide-in');
      targetEl.removeEventListener('animationend', handleIn);
    });
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  currentView = targetId;
}

// Toast Notification
function showToast(msg) {
  const toast = document.getElementById('toast');
  document.getElementById('toast-msg').innerText = msg;
  toast.classList.add('toast-visible');
  setTimeout(() => toast.classList.remove('toast-visible'), 2500);
}

// Wallet Toggle
function toggleWallet() {
  walletConnected = !walletConnected;
  const navLabel = document.getElementById('navWalletLabel');

  if (walletConnected) { 
    navLabel.textContent = '0x3f...c91d'; 
    showToast('Wallet Connected!');
  } else { 
    navLabel.textContent = 'Connect Wallet'; 
    showToast('Wallet Disconnected');
  }
}

// Relaxed Validation (Just checking if fields aren't totally empty for demo)
function validateForm() {
  const recipient = document.getElementById('recipientInput').value.trim();
  const amount = document.getElementById('amountInput').value.trim();
  const btn = document.getElementById('generateBtn');

  // FIXED: Ab tu "Daksh" likhega tab bhi button highlight ho jayega!
  if (recipient.length > 2 && amount.length > 0) {
    btn.className = "w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-bold text-base bg-[#14F195] text-black active:scale-95 transition-all mt-4 shadow-[0_5px_20px_rgba(20,241,149,0.3)]";
  } else {
    btn.className = "w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-bold text-base bg-zinc-800 text-zinc-400 transition-all mt-4 active:scale-95";
  }
}

// Pay Button Animation
function triggerPay() {
  const btn = document.getElementById('payBtn');
  btn.style.pointerEvents = 'none'; 
  btn.innerHTML = `<svg class="animate-spin text-black" style="width:24px;height:24px;" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path></svg> Processing…`;

  setTimeout(() => {
    btn.innerHTML = `<i class="ph-bold ph-check-circle text-2xl"></i> Payment Sent!`;
    btn.style.background = '#14F195';

    setTimeout(() => { 
      btn.innerHTML = `<i class="ph-bold ph-eye-slash text-2xl"></i> Pay Confidentially`; 
      btn.style.background = ''; 
      btn.style.pointerEvents = 'auto';
    }, 3000);
  }, 1500);
}

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('view-landing').classList.remove('hidden');
});

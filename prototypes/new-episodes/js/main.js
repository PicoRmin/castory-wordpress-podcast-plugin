// Toggle active pill
document.querySelectorAll('.pill').forEach(pill => {
  pill.addEventListener('click', () => {
    document.querySelectorAll('.pill').forEach(p=>p.classList.remove('active'));
    pill.classList.add('active');
  });
});

// Bookmark toggle
document.querySelectorAll('.bookmark').forEach(btn=>{
  btn.addEventListener('click', ()=> btn.classList.toggle('bookmarked'));
});

// Play button toggle
document.querySelectorAll('.play-btn').forEach(btn=>{
  btn.addEventListener('click', ()=> btn.classList.toggle('playing'));
});

// Newsletter email validation
const subscribeBtn = document.getElementById('subscribe-btn');
subscribeBtn.addEventListener('click', ()=>{
  const email = document.getElementById('newsletter-email').value;
  const msg = document.getElementById('newsletter-msg');
  const emailRegex = /^\S+@\S+\.\S+$/;
  if(emailRegex.test(email)){ msg.textContent = 'Subscribed! 🎉'; msg.style.color='#22C55E'; }
  else{ msg.textContent='Invalid email'; msg.style.color='#F87171'; }
});

// Mobile menu
const menuBtn = document.getElementById('menuBtn');
const nav = document.getElementById('nav');
if (menuBtn && nav){
  menuBtn.addEventListener('click', ()=>{
    const open = nav.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
}

// Theme toggle with prefers-color-scheme memory
const themeToggle = document.getElementById('themeToggle');
const setTheme = (t)=>document.documentElement.setAttribute('data-theme', t);
const saved = localStorage.getItem('theme');
if (saved) setTheme(saved);
themeToggle && themeToggle.addEventListener('click', ()=>{
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'light' ? null : 'light';
  if (next){ setTheme(next); localStorage.setItem('theme', 'light'); }
  else { document.documentElement.removeAttribute('data-theme'); localStorage.removeItem('theme'); }
});

// Simple client-side filter/search for cards
function setupFilters(){
  const grid = document.getElementById('grid');
  if (!grid) return;
  const items = Array.from(grid.querySelectorAll('.item'));
  const chips = Array.from(document.querySelectorAll('.chip[data-filter]'));
  const input = document.getElementById('searchInput');
  let tagsActive = new Set();

  function apply(){
    const q = (input?.value || '').toLowerCase().trim();
    items.forEach(it=>{
      const txt = it.textContent.toLowerCase();
      const tags = (it.getAttribute('data-tags') || '').split(/\s+/);
      const tagOk = tagsActive.size===0 || tags.some(t=>tagsActive.has(t));
      const qOk = !q || txt.includes(q);
      it.style.display = (tagOk && qOk) ? '' : 'none';
    });
  }

  chips.forEach(ch=>{
    ch.addEventListener('click', ()=>{
      const val = ch.getAttribute('data-filter');
      chips.forEach(c=>c.classList.remove('active'));
      ch.classList.add('active');
      tagsActive.clear();
      if (val && val !== 'all') tagsActive.add(val);
      apply();
    });
  });

  input && input.addEventListener('input', apply);
  apply();
}
document.addEventListener('DOMContentLoaded', setupFilters);

const root = document.documentElement;
const themeButton = document.querySelector('.theme');
const menuButton = document.querySelector('.menu');
const navigation = document.querySelector('#navigation');
const links = [...navigation.querySelectorAll('a')];
const sections = links.map(link => document.querySelector(link.hash));
const narrow = matchMedia('(max-width: 650px)');
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');

themeButton.setAttribute('aria-pressed', String(root.dataset.theme === 'light'));
themeButton.addEventListener('click', () => {
  const light = root.dataset.theme !== 'light';
  root.dataset.theme = light ? 'light' : 'dark';
  themeButton.setAttribute('aria-pressed', String(light));
  try { localStorage.setItem('portfolio-theme', root.dataset.theme); } catch {}
});

function toggleMenu(open) {
  navigation.classList.toggle('open', open);
  navigation.inert = narrow.matches && !open;
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
}

toggleMenu(false);
narrow.addEventListener('change', () => toggleMenu(false));
menuButton.addEventListener('click', () => toggleMenu(!navigation.classList.contains('open')));
navigation.addEventListener('click', event => {
  const link = event.target.closest('a');
  if (!narrow.matches || !link) return;
  const section = document.querySelector(link.hash);
  section.tabIndex = -1;
  section.focus({ preventScroll: true });
  toggleMenu(false);
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && navigation.classList.contains('open')) {
    toggleMenu(false);
    menuButton.focus();
  }
});
document.addEventListener('pointerdown', event => {
  if (navigation.classList.contains('open') && !event.target.closest('.header')) toggleMenu(false);
});

let scrollFrame = 0;
let requestedSection = sections.find(section => '#' + section.id === location.hash);
function updateNavigation() {
  scrollFrame = 0;
  const marker = Math.max(100, innerHeight * .28);
  const atBottom = Math.ceil(scrollY + innerHeight) >= root.scrollHeight;
  const active = atBottom ? requestedSection || sections.at(-1) : sections.findLast(section => section.getBoundingClientRect().top <= marker);
  for (const [index, link] of links.entries()) {
    if (sections[index] === (active || sections[0])) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  }
}
function scheduleNavigation() {
  if (!scrollFrame) scrollFrame = requestAnimationFrame(updateNavigation);
}
addEventListener('scroll', scheduleNavigation, { passive: true });
addEventListener('resize', scheduleNavigation);
addEventListener('hashchange', () => {
  requestedSection = sections.find(section => '#' + section.id === location.hash);
  scheduleNavigation();
});
function clearRequestedSection() {
  requestedSection = undefined;
  scheduleNavigation();
}
addEventListener('wheel', clearRequestedSection, { passive: true });
addEventListener('touchstart', clearRequestedSection, { passive: true });
addEventListener('keydown', event => {
  if (['ArrowDown', 'ArrowUp', 'PageDown', 'PageUp', 'Home', 'End', ' '].includes(event.key)) clearRequestedSection();
});
scheduleNavigation();

if ('IntersectionObserver' in window && !reducedMotion.matches) {
  const observer = new IntersectionObserver(entries => {
    for (const { isIntersecting, target } of entries) {
      if (!isIntersecting) continue;
      target.classList.replace('pending', 'entering');
      observer.unobserve(target);
    }
  }, { threshold: .1 });
  for (const element of document.querySelectorAll('[data-reveal]')) {
    if (element.getBoundingClientRect().top < innerHeight) continue;
    element.classList.add('pending');
    observer.observe(element);
    element.addEventListener('focusin', () => {
      element.classList.remove('pending');
      observer.unobserve(element);
    }, { once: true });
  }
  reducedMotion.addEventListener('change', event => {
    if (!event.matches) return;
    observer.disconnect();
    document.querySelectorAll('.pending, .entering').forEach(element => element.classList.remove('pending', 'entering'));
  });
}

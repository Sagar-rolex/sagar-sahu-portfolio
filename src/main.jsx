import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { About, Achievements, Certifications, Contact, Footer, Hero, Projects, Skills } from './Sections.jsx';
import './styles.css';

const menuQuery = '(max-width: 900px)'; // Keep in sync with the compact header in styles.css.
const navigation = [
  ['home', 'Home'],
  ['about', 'About'],
  ['skills', 'Skills'],
  ['projects', 'Projects'],
  ['contact', 'Contact'],
];

function useActiveSection() {
  const [active, setActive] = useState('home');

  useEffect(() => {
    const sections = navigation.map(([id]) => document.getElementById(id));
    const getRequestedSection = () => sections.find(section => '#' + section.id === window.location.hash);
    let requestedSection = getRequestedSection();
    let frame = 0;

    function scheduleUpdate() {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const marker = Math.max(100, window.innerHeight * .28);
        const atBottom = Math.ceil(window.scrollY + window.innerHeight) >= document.documentElement.scrollHeight;
        const section = atBottom
          ? requestedSection || sections.at(-1)
          : sections.findLast(item => item.getBoundingClientRect().top <= marker);
        setActive(section?.id ?? 'home');
      });
    }

    function updateHash() {
      requestedSection = getRequestedSection();
      scheduleUpdate();
    }
    function clearRequest() {
      requestedSection = undefined;
      scheduleUpdate();
    }
    function handleScrollKey(event) {
      if (['ArrowDown', 'ArrowUp', 'PageDown', 'PageUp', 'Home', 'End', ' '].includes(event.key)) clearRequest();
    }

    const listeners = new AbortController();
    const options = { signal: listeners.signal, passive: true };
    window.addEventListener('scroll', scheduleUpdate, options);
    window.addEventListener('resize', scheduleUpdate, options);
    window.addEventListener('hashchange', updateHash, options);
    window.addEventListener('wheel', clearRequest, options);
    window.addEventListener('touchstart', clearRequest, options);
    window.addEventListener('keydown', handleScrollKey, options);
    scheduleUpdate();

    return () => {
      listeners.abort();
      cancelAnimationFrame(frame);
    };
  }, []);

  return active;
}

function Header() {
  const active = useActiveSection();
  const [theme, setTheme] = useState(() => document.documentElement.dataset.theme);
  const [narrow, setNarrow] = useState(() => matchMedia(menuQuery).matches);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButton = useRef(null);
  const header = useRef(null);

  useEffect(() => {
    const media = matchMedia(menuQuery);
    const handleResize = event => {
      setNarrow(event.matches);
      setMenuOpen(false);
    };
    media.addEventListener('change', handleResize);
    return () => media.removeEventListener('change', handleResize);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const listeners = new AbortController();
    document.addEventListener('keydown', event => {
      if (event.key !== 'Escape') return;
      setMenuOpen(false);
      menuButton.current.focus();
    }, { signal: listeners.signal });
    document.addEventListener('pointerdown', event => {
      if (!header.current.contains(event.target)) setMenuOpen(false);
    }, { signal: listeners.signal });
    return () => listeners.abort();
  }, [menuOpen]);

  function toggleTheme() {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    document.documentElement.dataset.theme = nextTheme;
    setTheme(nextTheme);
    try { localStorage.setItem('portfolio-theme', nextTheme); } catch {}
  }
  function followLink(id) {
    if (!narrow) return;
    document.getElementById(id).focus({ preventScroll: true });
    setMenuOpen(false);
  }

  return (
    <header className="header" ref={header}>
      <div className="wrap nav-row">
        <a className="brand" href="#home"><span aria-hidden="true">S</span> Sagar Sahu</a>
        <nav id="navigation" aria-label="Main navigation" inert={narrow && !menuOpen} className={menuOpen ? 'open' : undefined}>
          {navigation.map(([id, label]) => (
            <a key={id} href={'#' + id} onClick={() => followLink(id)} aria-current={active === id ? 'location' : undefined}>{label}</a>
          ))}
        </nav>
        <div className="nav-controls">
          <button className="theme" type="button" aria-label="Light mode" aria-pressed={theme === 'light'} onClick={toggleTheme}>
            <span aria-hidden="true">☼</span><span aria-hidden="true">☾</span>
          </button>
          <button className="menu" type="button" aria-controls="navigation" aria-expanded={menuOpen} aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} onClick={() => setMenuOpen(!menuOpen)} ref={menuButton}>
            <span></span><span></span>
          </button>
        </div>
      </div>
    </header>
  );
}

function useScrollReveals() {
  useLayoutEffect(() => {
    // On a direct hash visit, targets first exist after React mounts.
    document.getElementById(window.location.hash.slice(1))?.scrollIntoView({ behavior: 'instant' });

    const motion = matchMedia('(prefers-reduced-motion: reduce)');
    if (!('IntersectionObserver' in window) || motion.matches) return;

    const elements = [...document.querySelectorAll('[data-reveal]')];
    const listeners = new AbortController();
    const observer = new IntersectionObserver(entries => {
      for (const { isIntersecting, target } of entries) {
        if (!isIntersecting) continue;
        target.classList.replace('pending', 'entering');
        observer.unobserve(target);
      }
    }, { threshold: .1 });

    for (const element of elements) {
      if (element.getBoundingClientRect().top < window.innerHeight) continue;
      element.classList.add('pending');
      observer.observe(element);
      element.addEventListener('focusin', () => {
        element.classList.remove('pending');
        observer.unobserve(element);
      }, { signal: listeners.signal, once: true });
    }

    function clearReveals() {
      observer.disconnect();
      elements.forEach(element => element.classList.remove('pending', 'entering'));
    }
    motion.addEventListener('change', event => {
      if (event.matches) clearReveals();
    }, { signal: listeners.signal });

    return () => {
      listeners.abort();
      clearReveals();
    };
  }, []);
}

function App() {
  useScrollReveals();

  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <Header />
      <main id="main" tabIndex={-1}>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Certifications />
        <Achievements />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

createRoot(document.getElementById('root')).render(<App />);

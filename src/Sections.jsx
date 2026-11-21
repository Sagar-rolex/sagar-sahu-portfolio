const contactEmail = '24sahusagar@gmail.com';
const contactLink = `mailto:${contactEmail}`;

function openMessageDraft(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const fields = new FormData(form);
  const name = fields.get('name').trim();
  const email = fields.get('email').trim();
  const message = fields.get('message').trim();
  const subject = encodeURIComponent('Portfolio message from ' + name);
  const body = encodeURIComponent('Name: ' + name + '\r\nEmail: ' + email + '\r\n\r\n' + message);
  window.location.href = form.action + '?subject=' + subject + '&body=' + body;
}

export function Hero() {
  return (
    <section id="home" tabIndex={-1} className="hero" aria-labelledby="hero-title">
      <div className="floor" aria-hidden="true"></div>
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <span className="eyebrow intro" style={{ "--step": "0" }}>Developer Portfolio</span>
          <h1 id="hero-title" className="intro" style={{ "--step": "1" }}>Code. Build.<br />Deploy. <em>Repeat.</em></h1>
          <p className="intro" style={{ "--step": "2" }}>I’m Sagar Sahu, an MCA candidate building full-stack applications with a focus on usability and reliable software.</p>
          <div className="flex flex-wrap items-center actions intro" style={{ "--step": "3" }}>
            <a className="button primary" href={contactLink}>Email me</a>
            <a className="button resume-download gap-2" href="Sagar_Sahu_Resume.pdf" download="Sagar_Sahu_Resume.pdf">
              <svg className="size-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 3v12m-4-4 4 4 4-4M5 16v4h14v-4" />
              </svg>
              Download Resume
            </a>
          </div>
        </div>
        <div className="code-entry intro" style={{ "--step": "2" }}>
          <div className="terminal">
            <div className="terminal-bar"><span></span><span></span><span></span><small>developer.js</small></div>
            <pre><code>{""}<b>{"const"}</b>{" developer = {\n  name: "}<i>{"\"Sagar Sahu\""}</i>{",\n  role: "}<i>{"\"Software Developer\""}</i>{",\n  interests: ["}<i>{"\"Web Dev\""}</i>{", "}<i>{"\"AI\""}</i>{"],\n  location: "}<i>{"\"Mumbai, India\""}</i>{"\n};\n\ndeveloper."}<strong>{"build"}</strong>{"();"}</code></pre>
          </div>
        </div>
      </div>
    </section>
  );
}

export function About() {
  return (
    <section id="about" tabIndex={-1} className="wrap section" aria-labelledby="about-title">
      <h2 id="about-title" data-reveal>About</h2>
      <div className="grid gap-4 about-grid">
        <article className="card" data-reveal>
          <div className="profile">
            <span className="avatar" aria-hidden="true">SS</span>
            <div><h3>Sagar Sahu</h3><p>MCA candidate · Mumbai, India</p></div>
          </div>
          <p>I’m an aspiring software developer and BSc IT graduate. I enjoy taking a feature from the interface through the API to the database, and I’ve put that into practice in projects spanning fraud detection, résumé creation, and food ordering.</p>
        </article>
        <article className="card" data-reveal style={{ "--delay": "80ms" }}>
          <h3>Education</h3>
          <ol className="timeline">
            <li data-reveal><span>2025 – Present</span><strong>Master of Computer Applications</strong><p>SIES College of Management Studies</p></li>
            <li data-reveal style={{ "--delay": "90ms" }}><span>2022 – 2025</span><strong>BSc Information Technology</strong><p>Tilak College</p></li>
          </ol>
        </article>
      </div>
    </section>
  );
}

export function Skills() {
  return (
    <section id="skills" tabIndex={-1} className="wrap section" aria-labelledby="skills-title">
      <h2 id="skills-title" data-reveal>Technical Skills</h2>
      <div className="grid gap-4 skills-grid">
        <article className="card" data-reveal>
          <span className="icon" aria-hidden="true">
            <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Zm0 0v6h6M10 11l-3 3 3 3m4-6 3 3-3 3" />
            </svg>
          </span>
          <h3>Programming Languages</h3>
          <ul className="tags"><li>Java</li><li>JavaScript</li><li>SQL</li></ul>
        </article>
        <article className="card" data-reveal style={{ "--delay": "60ms" }}><span className="icon" aria-hidden="true">&lt;/&gt;</span><h3>Frontend</h3><ul className="tags"><li>React</li><li>Angular</li><li>HTML5</li><li>CSS3</li><li>Tailwind CSS</li></ul></article>
        <article className="card" data-reveal style={{ "--delay": "120ms" }}><span className="icon" aria-hidden="true">$_</span><h3>Backend</h3><ul className="tags"><li>Node.js</li><li>Express.js</li><li>Spring Boot</li><li>FastAPI</li></ul></article>
        <article className="card" data-reveal><span className="icon" aria-hidden="true">▤</span><h3>Databases</h3><ul className="tags"><li>MySQL</li><li>MongoDB</li><li>PostgreSQL</li><li>Supabase</li></ul></article>
        <article className="card" data-reveal style={{ "--delay": "60ms" }}><span className="icon" aria-hidden="true">⌘</span><h3>Tools</h3><ul className="tags"><li>Git</li><li>GitHub</li><li>Docker</li><li>Postman</li><li>REST APIs</li></ul></article>
      </div>
    </section>
  );
}

export function Projects() {
  return (
    <section id="projects" tabIndex={-1} className="wrap section" aria-labelledby="projects-title">
      <h2 id="projects-title" data-reveal>Selected Projects</h2>
      <div className="grid gap-4 project-grid">
        <article className="card project" data-reveal>
          <div className="project-visual shield" aria-hidden="true"><div className="art"><span>⌾</span><b>InternShield</b><i></i><i></i><i></i></div></div>
          <div className="project-content"><div className="project-copy"><h3>InternShield AI</h3><p>Flags potentially fraudulent jobs and internships with weighted risk scoring, company verification, and scam reporting.</p></div>
          <ul className="tags"><li>React</li><li>Python</li><li>FastAPI</li><li>Gemini API</li><li>PostgreSQL</li></ul>
          <div className="flex flex-wrap items-center actions"><a className="button" href="https://internshield-pmio.vercel.app/" target="_blank" rel="noopener" aria-label="InternShield AI live demo (opens in a new tab)">Live Demo</a><a className="button" href="https://github.com/Sagar-rolex/internshield" target="_blank" rel="noopener" aria-label="InternShield AI on GitHub (opens in a new tab)">GitHub</a></div></div>
        </article>
        <article className="card project" data-reveal style={{ "--delay": "80ms" }}>
          <div className="project-visual foodie" aria-hidden="true"><div className="art"><b>Foodie Express</b><span className="food-grid"><i></i><i></i><i></i></span><i></i></div></div>
          <div className="project-content"><div className="project-copy"><h3>Foodie Express</h3><p>A full-stack food ordering app with menu management, cart, checkout, order history, and Razorpay test payments.</p></div>
          <ul className="tags"><li>React</li><li>TypeScript</li><li>Java</li><li>Spring Boot</li><li>MySQL</li></ul>
          <div className="flex flex-wrap items-center actions"><a className="button" href="https://sagar-rolex-foodie-express.vercel.app/" target="_blank" rel="noopener" aria-label="Foodie Express live demo (opens in a new tab)">Live Demo</a><a className="button" href="https://github.com/Sagar-rolex/Sagar-rolex-Foodie-Express" target="_blank" rel="noopener" aria-label="Foodie Express on GitHub (opens in a new tab)">GitHub</a></div></div>
        </article>
        <article className="card project" data-reveal style={{ "--delay": "160ms" }}>
          <div className="project-visual resume" aria-hidden="true"><div className="art"><div className="sheet"><b>Résumé</b><i></i><i></i><i></i><i></i></div><span>✦</span></div></div>
          <div className="project-content"><div className="project-copy"><h3>AI Resume Builder</h3><p>An AI-assisted résumé editor with customizable templates, real-time preview, saved drafts, and PDF export.</p></div>
          <ul className="tags"><li>MongoDB</li><li>Express.js</li><li>React</li><li>Node.js</li></ul>
          <div className="flex flex-wrap items-center actions"><a className="button" href="https://resume-builder-seven-jet.vercel.app/" target="_blank" rel="noopener" aria-label="AI Resume Builder live demo (opens in a new tab)">Live Demo</a><a className="button" href="https://github.com/Sagar-rolex/ResumeBuilder" target="_blank" rel="noopener" aria-label="AI Resume Builder on GitHub (opens in a new tab)">GitHub</a></div></div>
        </article>
      </div>
    </section>
  );
}

export function Certifications() {
  return (
    <section id="certifications" className="wrap section" aria-labelledby="certifications-title">
      <h2 id="certifications-title" data-reveal>Certifications</h2>
      <div className="grid gap-4 project-grid credentials-grid">
        <article className="card credential" data-reveal>
          <span className="credential-meta">EduBridge</span>
          <h3>Java Full Stack Development</h3>
          <p>Hands-on training in Java, frontend and backend development, and database management.</p>
          <a className="button" href="EduBridge_Java_Full_Stack_Certificate.pdf" aria-label="View EduBridge Java Full Stack Development certificate (PDF)">View certificate</a>
        </article>
        <article className="card credential" data-reveal style={{ "--delay": "80ms" }}>
          <span className="credential-meta">NPTEL</span>
          <h3>Programming in Java</h3>
          <p>Object-oriented programming, the Java Collections Framework, multithreading, and exception handling.</p>
          <a className="button" href="https://nptel.ac.in/noc/E_Certificate/NPTEL26CS55S96230043904281846" aria-label="View Programming in Java certificate">View certificate</a>
        </article>
        <article className="card credential" data-reveal style={{ "--delay": "160ms" }}>
          <span className="credential-meta">NPTEL</span>
          <h3>Cloud Computing</h3>
          <p>Cloud architecture, virtualization, infrastructure fundamentals, and service models including IaaS, PaaS, and SaaS.</p>
          <a className="button" href="https://nptel.ac.in/noc/E_Certificate/NPTEL26CS36S76230035504281846" aria-label="View Cloud Computing certificate">View certificate</a>
        </article>
      </div>
    </section>
  );
}

export function Achievements() {
  return (
    <section id="achievements" className="wrap section" aria-labelledby="achievements-title">
      <h2 id="achievements-title" data-reveal>Achievements</h2>
      <div className="grid gap-4 about-grid">
        <article className="card credential" data-reveal>
          <span className="credential-meta">International Student Research Conference</span>
          <h3>Research Paper Presentation</h3>
          <p>Presented “Impact of AI on Skill Requirement &amp; Employability” and received a certificate of participation.</p>
        </article>
        <article className="card credential" data-reveal style={{ "--delay": "80ms" }}>
          <span className="credential-meta">SIES GST</span>
          <h3>BYTECAMP ’26 Hackathon</h3>
          <p>Participated in the hackathon and received a certificate of participation.</p>
        </article>
      </div>
    </section>
  );
}

export function Contact() {
  return (
    <section id="contact" tabIndex={-1} className="wrap section" aria-labelledby="contact-title">
      <div className="card contact" data-reveal>
        <div><h2 id="contact-title">Get in touch</h2><a className="email" href={contactLink}>{contactEmail}</a></div>
        <div className="flex flex-wrap items-center actions">
          <a className="button" href="https://github.com/Sagar-rolex">GitHub</a>
          <a className="button" href="https://www.linkedin.com/in/sagar-sahu-24112925b/">LinkedIn</a>
        </div>
      </div>
      <form onSubmit={openMessageDraft} className="card message-form" id="message" action={contactLink} method="post" encType="text/plain" aria-labelledby="message-title">
        <h2 id="message-title">Send a message</h2>
        <div className="message-fields grid gap-4">
          <label>Name<input name="name" autoComplete="name" maxLength="100" required /></label>
          <label>Email<input type="email" name="email" autoComplete="email" maxLength="254" required /></label>
        </div>
        <label>Message<textarea name="message" rows="4" maxLength="1200" required></textarea></label>
        <div className="message-actions flex flex-wrap items-center">
          <button type="submit" className="button primary">Open email draft</button>
          <p>Opens your email app to send the message.</p>
        </div>
      </form>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="wrap footer">
      <div className="footer-row flex flex-wrap items-center justify-between">
        <div className="brand footer-brand"><span aria-hidden="true">S</span> © 2026 Sagar Sahu</div>
        <ul className="footer-social flex list-none" aria-label="Social profiles">
          <li><a href="https://www.instagram.com/sagar._.24_/" aria-label="Instagram" title="Instagram">
            <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8">
              <rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.7" r="1" fill="currentColor" stroke="none"/>
            </svg>
          </a></li>
          <li><a href="https://github.com/Sagar-rolex" aria-label="GitHub" title="GitHub">
            <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
              <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48l-.01-1.86c-2.78.6-3.37-1.18-3.37-1.18-.45-1.15-1.11-1.45-1.11-1.45-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.99 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.58 9.58 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.69 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.94.36.31.68.92.68 1.85v2.73c0 .27.18.58.69.48A10 10 0 0 0 12 2Z"/>
            </svg>
          </a></li>
          <li><a href="https://www.linkedin.com/in/sagar-sahu-24112925b/" aria-label="LinkedIn" title="LinkedIn">
            <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
              <path d="M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Zm2.6 7v8H10v-8H7.6Zm1.2-4a1.4 1.4 0 1 0 0 2.8 1.4 1.4 0 0 0 0-2.8Zm2.7 4v8h2.4v-4c0-1.1.4-1.8 1.4-1.8 1 0 1.3.7 1.3 1.8v4H19v-4.6c0-2.4-1.2-3.6-3-3.6-1.1 0-1.8.5-2.2 1.1V10h-2.3Z"/>
            </svg>
          </a></li>
        <li><a href="https://wa.me/918591189235" aria-label="Message Sagar on WhatsApp" title="WhatsApp">
          <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.5 11.6a8.5 8.5 0 0 1-12.7 7.4L3 20.5l1.5-4.7A8.5 8.5 0 1 1 20.5 11.6Z"/>
            <path fill="currentColor" stroke="none" d="M8.1 7.2c.3-.1.6 0 .7.3l.9 2c.1.2.1.4-.1.6l-.6.7a6.5 6.5 0 0 0 2.9 2.7l.7-.9c.2-.2.4-.2.6-.1l2 .9c.3.1.4.3.3.6-.2 1.2-1 1.9-2.1 1.8-2.9-.3-6.7-3.7-6.7-6.5 0-1 .5-1.8 1.4-2.1Z"/>
          </svg>
        </a></li>
      </ul>
      <a href="#home">Back to top</a>
      </div>
    </footer>
  );
}

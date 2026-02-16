/* ═══════════════════════════════════════════════════════
   SIRCLE SOLUTIONS — Animations & Interactions
   ═══════════════════════════════════════════════════════ */

// ── Cursor Glow ─────────────────────────────────────────
const cursorGlow = document.getElementById('cursorGlow');
if (cursorGlow && window.innerWidth > 768) {
  let mouseX = 0, mouseY = 0, glowX = 0, glowY = 0;
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });
  function animateGlow() {
    glowX += (mouseX - glowX) * 0.08;
    glowY += (mouseY - glowY) * 0.08;
    cursorGlow.style.left = glowX + 'px';
    cursorGlow.style.top = glowY + 'px';
    requestAnimationFrame(animateGlow);
  }
  animateGlow();
} else if (cursorGlow) {
  cursorGlow.style.display = 'none';
}

// ── Nav Scroll Effect ───────────────────────────────────
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 50);
});

// ── Mobile Nav ──────────────────────────────────────────
const burger = document.getElementById('navBurger');
const navLinks = document.getElementById('navLinks');
if (burger) {
  burger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => navLinks.classList.remove('open'));
  });
}

// ── Smooth Scroll ───────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// ── Terminal Typing Effect ──────────────────────────────
const terminalText = document.getElementById('terminalText');
const terminalOutput = document.getElementById('terminalOutput');
const commands = [
  {
    cmd: 'sircle init --project "jouw-idee"',
    output: `<span class="highlight">✓</span> Project initialized\n<span class="highlight">✓</span> Database configured\n<span class="highlight">✓</span> API endpoints ready\n<span class="highlight">→</span> Ready to build something amazing`
  },
  {
    cmd: 'sircle deploy --production',
    output: `<span class="highlight">✓</span> Build complete (2.3s)\n<span class="highlight">✓</span> SSL configured\n<span class="highlight">✓</span> DNS propagated\n<span class="highlight">→</span> Live at <span class="highlight">your-app.sircle.tech</span>`
  },
  {
    cmd: 'sircle status',
    output: `<span class="highlight">●</span> Status: Online\n<span class="highlight">●</span> Uptime: 99.97%\n<span class="highlight">●</span> Response: 42ms\n<span class="highlight">●</span> Users today: 1,247`
  }
];

let currentCmd = 0;
async function typeCommand() {
  if (!terminalText) return;
  const { cmd, output } = commands[currentCmd % commands.length];
  terminalText.textContent = '';
  terminalOutput.innerHTML = '';

  // Type command
  for (let i = 0; i < cmd.length; i++) {
    terminalText.textContent += cmd[i];
    await sleep(30 + Math.random() * 40);
  }
  await sleep(500);

  // Show output
  terminalOutput.innerHTML = output;
  await sleep(3000);

  // Clear and next
  currentCmd++;
  typeCommand();
}
function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }
typeCommand();

// ── Floating Particles ──────────────────────────────────
const particlesContainer = document.getElementById('particles');
if (particlesContainer && window.innerWidth > 768) {
  for (let i = 0; i < 30; i++) {
    const p = document.createElement('div');
    const size = 2 + Math.random() * 3;
    p.style.cssText = `
      position: absolute;
      width: ${size}px; height: ${size}px;
      background: rgba(59,130,246,${0.1 + Math.random() * 0.2});
      border-radius: 50%;
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      animation: float-particle ${8 + Math.random() * 12}s ease-in-out infinite;
      animation-delay: ${Math.random() * -10}s;
    `;
    particlesContainer.appendChild(p);
  }

  // Add particle animation
  const style = document.createElement('style');
  style.textContent = `
    @keyframes float-particle {
      0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.3; }
      25% { transform: translate(${30 + Math.random() * 40}px, ${-20 - Math.random() * 30}px) scale(1.3); opacity: 0.6; }
      50% { transform: translate(${-20 - Math.random() * 30}px, ${-40 - Math.random() * 40}px) scale(0.8); opacity: 0.4; }
      75% { transform: translate(${20 + Math.random() * 30}px, ${-10 - Math.random() * 20}px) scale(1.1); opacity: 0.5; }
    }
  `;
  document.head.appendChild(style);
}

// ── GSAP Animations ─────────────────────────────────────
if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);

  // Animate elements with data-animate
  const animateElements = document.querySelectorAll('[data-animate]');
  animateElements.forEach(el => {
    const delay = parseFloat(el.dataset.delay) || 0;
    gsap.fromTo(el,
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0,
        duration: 0.8,
        delay: delay,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          once: true
        }
      }
    );
  });

  // Process line animation
  const processLine = document.getElementById('processLine');
  if (processLine) {
    gsap.fromTo(processLine,
      { scaleY: 0, transformOrigin: 'top' },
      {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: '.process-timeline',
          start: 'top 70%',
          end: 'bottom 60%',
          scrub: 1
        }
      }
    );
  }

  // Service cards stagger
  gsap.fromTo('.service-card', 
    { opacity: 0, y: 50, scale: 0.95 },
    {
      opacity: 1, y: 0, scale: 1,
      duration: 0.6,
      stagger: 0.08,
      ease: 'power3.out',
      scrollTrigger: { trigger: '.services-grid', start: 'top 80%', once: true }
    }
  );

  // Case grid cards stagger animation
  gsap.fromTo('.case-grid__card',
    { opacity: 0, y: 60, scale: 0.95 },
    {
      opacity: 1, y: 0, scale: 1,
      duration: 0.7,
      stagger: 0.12,
      ease: 'power3.out',
      scrollTrigger: { trigger: '.case-grid', start: 'top 80%', once: true }
    }
  );

  // Animate mockup elements inside each case card
  document.querySelectorAll('.case-grid__card').forEach((card, idx) => {
    const mockElements = card.querySelectorAll('.case-mock__card, .case-mock__bento-stat, .case-mock__bento-card, .case-mock__wizard-field, .case-mock__wizard-textarea, .case-mock__shop-product');
    if (mockElements.length) {
      gsap.fromTo(mockElements,
        { opacity: 0, x: -8 },
        {
          opacity: 1, x: 0,
          duration: 0.35,
          stagger: 0.04,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 75%',
            once: true
          }
        }
      );
    }
  });

  // Tech logos float
  gsap.fromTo('.tech-logo',
    { opacity: 0, y: 20 },
    {
      opacity: 1, y: 0,
      duration: 0.4,
      stagger: 0.03,
      ease: 'power2.out',
      scrollTrigger: { trigger: '.tech-grid', start: 'top 80%', once: true }
    }
  );

  // Group cards
  gsap.fromTo('.group-card',
    { opacity: 0, y: 40, rotateX: 5 },
    {
      opacity: 1, y: 0, rotateX: 0,
      duration: 0.7,
      stagger: 0.12,
      ease: 'power3.out',
      scrollTrigger: { trigger: '.group-grid', start: 'top 80%', once: true }
    }
  );

  // Parallax on hero elements
  gsap.to('.hero__grid-bg', {
    yPercent: 30,
    ease: 'none',
    scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1 }
  });

  // CTA section glow pulse
  gsap.fromTo('.section--cta',
    { backgroundSize: '100% 100%' },
    {
      backgroundSize: '120% 120%',
      duration: 3,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1
    }
  );

} else {
  // Fallback: use IntersectionObserver
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = parseFloat(entry.target.dataset.delay) || 0;
        setTimeout(() => entry.target.classList.add('visible'), delay * 1000);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('[data-animate]').forEach(el => observer.observe(el));
}

// ── Service card glow follow mouse ─────────────────────
document.querySelectorAll('.service-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const glow = card.querySelector('.service-card__glow');
    if (glow) {
      glow.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(59,130,246,0.06) 0%, transparent 50%)`;
      glow.style.opacity = '1';
    }
  });
  card.addEventListener('mouseleave', () => {
    const glow = card.querySelector('.service-card__glow');
    if (glow) glow.style.opacity = '0';
  });
});

// ── Log ─────────────────────────────────────────────────
console.log('%c<S/> Sircle Solutions', 'font-size:20px;font-weight:bold;background:linear-gradient(135deg,#3b82f6,#06b6d4);-webkit-background-clip:text;-webkit-text-fill-color:transparent;');
console.log('%cBuilt with ♥ in Den Haag', 'color:#64748b;font-size:12px;');

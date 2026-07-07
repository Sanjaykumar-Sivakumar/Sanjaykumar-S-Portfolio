/* =====================================================
   SANJAYKUMAR S — PORTFOLIO
   Vanilla JS: nav, video, particles, parallax, scroll reveal.
   No frameworks, no libraries.
   ===================================================== */

(() => {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------------------------------------------------
     Hero page-load reveal trigger
  --------------------------------------------------- */
  document.documentElement.classList.add('js-ready');

  /* ---------------------------------------------------
     NAVIGATION: scrolled state, mobile toggle, active link
  --------------------------------------------------- */
  const topnav = document.getElementById('topnav');
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  const navAnchors = document.querySelectorAll('[data-nav]');

  function updateNavScrollState() {
    if (window.scrollY > 24) {
      topnav.classList.add('is-scrolled');
    } else {
      topnav.classList.remove('is-scrolled');
    }
  }
  updateNavScrollState();
  window.addEventListener('scroll', updateNavScrollState, { passive: true });

  function closeMobileNav() {
    navLinks.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', 'Open navigation menu');
  }

  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
    navToggle.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
  });

  navAnchors.forEach((a) => a.addEventListener('click', closeMobileNav));

  // Highlight the nav link for the section currently in view
  const sections = Array.from(document.querySelectorAll('main section[id], header#top'));
  if ('IntersectionObserver' in window && sections.length) {
    const navObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = entry.target.getAttribute('id');
        navAnchors.forEach((a) => {
          const match = a.getAttribute('href') === `#${id}`;
          a.classList.toggle('is-active', match);
        });
      });
    }, { rootMargin: '-45% 0px -45% 0px', threshold: 0 });

    sections.forEach((s) => navObserver.observe(s));
  }

  /* ---------------------------------------------------
     Video: fade in without black flash, controls, mute
  --------------------------------------------------- */
  const mainVideo = document.getElementById('mainVideo');
  const bloomVideo = document.getElementById('bloomVideo');
  const playPauseBtn = document.getElementById('playPauseBtn');
  const muteBtn = document.getElementById('muteBtn');
  const soundBadge = document.getElementById('soundBadge');
  const stageFrame = document.getElementById('stageFrame');

  function revealVideo() {
    mainVideo.classList.add('is-visible');
  }

  if (mainVideo) {
    if (mainVideo.readyState >= 3) {
      revealVideo();
    } else {
      mainVideo.addEventListener('canplay', revealVideo, { once: true });
    }

    // Keep the ambient bloom duplicate in sync with the foreground video
    mainVideo.addEventListener('play', () => { bloomVideo.play().catch(() => {}); });
    mainVideo.addEventListener('pause', () => bloomVideo.pause());

    // Play / Pause toggle
    const iconPause = playPauseBtn.querySelector('.icon-pause');
    const iconPlay = playPauseBtn.querySelector('.icon-play');

    playPauseBtn.addEventListener('click', () => {
      if (mainVideo.paused) {
        mainVideo.play();
        bloomVideo.play().catch(() => {});
        iconPause.style.display = '';
        iconPlay.style.display = 'none';
        playPauseBtn.setAttribute('aria-label', 'Pause video');
        playPauseBtn.setAttribute('aria-pressed', 'false');
      } else {
        mainVideo.pause();
        bloomVideo.pause();
        iconPause.style.display = 'none';
        iconPlay.style.display = '';
        playPauseBtn.setAttribute('aria-label', 'Play video');
        playPauseBtn.setAttribute('aria-pressed', 'true');
      }
    });

    // Mute / Unmute toggle
    const iconMute = muteBtn.querySelector('.icon-mute');
    const iconSound = muteBtn.querySelector('.icon-sound');

    function dismissSoundBadge() {
      soundBadge.classList.add('is-hidden');
    }

    muteBtn.addEventListener('click', () => {
      mainVideo.muted = !mainVideo.muted;
      if (mainVideo.muted) {
        iconMute.style.display = '';
        iconSound.style.display = 'none';
        muteBtn.setAttribute('aria-label', 'Unmute video');
        muteBtn.setAttribute('aria-pressed', 'true');
      } else {
        iconMute.style.display = 'none';
        iconSound.style.display = '';
        muteBtn.setAttribute('aria-label', 'Mute video');
        muteBtn.setAttribute('aria-pressed', 'false');
      }
      dismissSoundBadge();
    });

    // Auto-dismiss "tap for sound" badge after 4 seconds
    window.setTimeout(dismissSoundBadge, 4000);
  }

  /* ---------------------------------------------------
     Smooth scroll for scroll cue and in-page anchors
  --------------------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId.length <= 1) return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'start' });
      }
    });
  });

  /* ---------------------------------------------------
     Subtle mouse parallax / tilt on the video stage
  --------------------------------------------------- */
  if (!prefersReducedMotion && stageFrame) {
    const hero = document.querySelector('.hero');
    let targetX = 0, targetY = 0, currentX = 0, currentY = 0;

    hero.addEventListener('pointermove', (e) => {
      const rect = hero.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width - 0.5;
      const ny = (e.clientY - rect.top) / rect.height - 0.5;
      targetX = nx;
      targetY = ny;
    });

    hero.addEventListener('pointerleave', () => {
      targetX = 0;
      targetY = 0;
    });

    function tiltLoop() {
      currentX += (targetX - currentX) * 0.06;
      currentY += (targetY - currentY) * 0.06;
      const rotY = currentX * 8;   // deg
      const rotX = -currentY * 8;  // deg
      stageFrame.style.transform =
        `translate3d(0,0,0) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
      requestAnimationFrame(tiltLoop);
    }
    requestAnimationFrame(tiltLoop);
  }

  /* ---------------------------------------------------
     Scroll-triggered reveal for every section / card
  --------------------------------------------------- */
  const animatedEls = document.querySelectorAll('[data-animate]');

  // Give grid children a staggered custom property before observing
  document.querySelectorAll('.projects__grid, .cert__grid, .achieve__grid, .whatido__grid, .timeline').forEach((grid) => {
    Array.from(grid.children).forEach((child, i) => {
      child.style.setProperty('--i', i);
    });
  });

  if ('IntersectionObserver' in window && animatedEls.length) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.14, rootMargin: '0px 0px -8% 0px' });

    animatedEls.forEach((el) => revealObserver.observe(el));
  } else {
    // No IntersectionObserver support (or reduced motion) — just show everything
    animatedEls.forEach((el) => el.classList.add('is-visible'));
  }

  /* ---------------------------------------------------
     Ambient particle field (canvas, cinematic dust)
  --------------------------------------------------- */
  const canvas = document.getElementById('particle-canvas');

  if (canvas && !prefersReducedMotion) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let mouseX = 0, mouseY = 0, parallaxX = 0, parallaxY = 0;
    let vh = window.innerHeight;
    let docHeight = document.documentElement.scrollHeight;

    const PARTICLE_COUNT = window.innerWidth < 640 ? 40 : 70;

    function resizeCanvas() {
      vh = window.innerHeight;
      docHeight = document.documentElement.scrollHeight;
      canvas.width = window.innerWidth * dpr;
      canvas.height = vh * dpr;
      canvas.style.width = window.innerWidth + 'px';
      canvas.style.height = vh + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function rand(min, max) { return Math.random() * (max - min) + min; }

    function makeParticle() {
      const depth = rand(0.2, 1); // 0 = far, 1 = close
      return {
        x: rand(0, window.innerWidth),
        y: rand(0, vh),
        r: rand(0.6, 2.4) * depth + 0.4,
        depth,
        speedY: rand(-6, -14) * depth * 0.01,
        speedX: rand(-4, 4) * depth * 0.01,
        opacity: rand(0.15, 0.55) * depth,
        hue: Math.random() > 0.55 ? 'blue' : 'white',
        phase: rand(0, Math.PI * 2)
      };
    }

    function initParticles() {
      particles = Array.from({ length: PARTICLE_COUNT }, makeParticle);
    }

    function drawParticles(time) {
      ctx.clearRect(0, 0, window.innerWidth, vh);

      for (const p of particles) {
        p.y += p.speedY;
        p.x += p.speedX + Math.sin(time * 0.0002 + p.phase) * 0.08;

        if (p.y < -10) p.y = vh + 10;
        if (p.x < -10) p.x = window.innerWidth + 10;
        if (p.x > window.innerWidth + 10) p.x = -10;

        const px = p.x + parallaxX * p.depth * 18;
        const py = p.y + parallaxY * p.depth * 18;

        const flicker = 0.75 + 0.25 * Math.sin(time * 0.0015 + p.phase);
        const alpha = p.opacity * flicker;

        const color = p.hue === 'blue'
          ? `rgba(124, 200, 255, ${alpha})`
          : `rgba(255, 255, 255, ${alpha})`;

        ctx.beginPath();
        ctx.arc(px, py, p.r, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.shadowColor = p.hue === 'blue' ? 'rgba(94,169,255,0.9)' : 'rgba(255,255,255,0.6)';
        ctx.shadowBlur = p.r * 3;
        ctx.fill();
      }
    }

    let rafId = null;
    let isInHeroView = true;

    function animate(time) {
      parallaxX += (mouseX - parallaxX) * 0.03;
      parallaxY += (mouseY - parallaxY) * 0.03;
      drawParticles(time);
      rafId = requestAnimationFrame(animate);
    }

    // Only run the particle loop while the hero is on screen — saves GPU/CPU
    // once the person has scrolled well past it.
    const heroEl = document.getElementById('top');
    if ('IntersectionObserver' in window && heroEl) {
      const perfObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          isInHeroView = entry.isIntersecting;
          if (isInHeroView && rafId === null) {
            rafId = requestAnimationFrame(animate);
          } else if (!isInHeroView && rafId !== null) {
            cancelAnimationFrame(rafId);
            rafId = null;
          }
        });
      }, { threshold: 0 });
      perfObserver.observe(heroEl);
    } else {
      rafId = requestAnimationFrame(animate);
    }

    window.addEventListener('pointermove', (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / vh - 0.5) * 2;
    });

    window.addEventListener('resize', () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      resizeCanvas();
    });

    resizeCanvas();
    initParticles();
  }

})();

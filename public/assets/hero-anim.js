/* =============================================================
   hero-anim.js — Pilotage des animations Le Campus Paris
   Vanilla JS, sans dépendance. Reproduit en natif les effets
   qu'on ferait avec Framer Motion (useScroll/useTransform,
   whileInView) sur la stack HTML statique du site.

   Respecte prefers-reduced-motion : si l'utilisateur réduit les
   animations, on ne fait rien (le CSS garde tout visible).
   ============================================================= */
(function () {
  'use strict';

  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* -----------------------------------------------------------
     EFFET 1 — NAV -> PILULE
     Ajoute/retire la classe .nav-pill sur le <header> au scroll.
     Le CSS gère la transition (radius/width/background/shadow).
     ----------------------------------------------------------- */
  function initNavPill() {
    var header = document.querySelector('header');
    if (!header) return;

    var threshold = 60; // px de scroll avant de passer en pilule
    var ticking = false;

    function update() {
      ticking = false;
      header.classList.toggle('nav-pill', window.scrollY > threshold);
    }
    function onScroll() {
      if (!ticking) { window.requestAnimationFrame(update); ticking = true; }
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    update();
  }

  /* -----------------------------------------------------------
     EFFET 3 — TITRE LETTRE PAR LETTRE
     Découpe le texte d'un élément [data-letters] en spans .letter,
     en préservant les mots (pas de coupure au milieu d'un mot) et
     les <br>. Chaque lettre reçoit --i pour le délai staggered.
     ----------------------------------------------------------- */
  function splitLetters(root) {
    if (prefersReduced) return; // on laisse le texte tel quel
    var index = 0;

    // On traite chaque nœud enfant : texte -> spans, <br> conservé tel quel
    var nodes = Array.prototype.slice.call(root.childNodes);
    root.innerHTML = '';
    root.classList.add('letters-anim');

    nodes.forEach(function (node) {
      if (node.nodeType === Node.ELEMENT_NODE && node.tagName === 'BR') {
        root.appendChild(node.cloneNode());
        return;
      }
      var text = node.textContent;
      // Découpe en mots pour garder chaque mot insécable
      var words = text.split(/(\s+)/); // garde les espaces comme tokens
      words.forEach(function (word) {
        if (word.trim() === '') { root.appendChild(document.createTextNode(word)); return; }
        var wordSpan = document.createElement('span');
        wordSpan.className = 'word';
        word.split('').forEach(function (ch) {
          var s = document.createElement('span');
          s.className = 'letter';
          s.style.setProperty('--i', index++);
          s.textContent = ch;
          wordSpan.appendChild(s);
        });
        root.appendChild(wordSpan);
      });
    });
  }

  function initLetterTitles() {
    document.querySelectorAll('[data-letters]').forEach(splitLetters);
  }

  /* -----------------------------------------------------------
     EFFET 5 — REVEAL AU SCROLL (IntersectionObserver)
     Tout élément portant .reveal-up / .reveal-left / .reveal-right
     / .reveal-fade reçoit .is-revealed quand il entre dans le viewport.
     ----------------------------------------------------------- */
  function initReveals() {
    /* STAGGER AUTO : tout conteneur [data-stagger] voit ses enfants directs
       transformés en éléments reveal, avec un délai croissant (--d) =>
       cascade fluide à l'entrée dans le viewport. L'attribut peut valoir
       "up" (défaut), "left" ou "right" pour choisir la direction. */
    Array.prototype.forEach.call(document.querySelectorAll('[data-stagger]'), function (container) {
      var dir = container.getAttribute('data-stagger') || 'up';
      var cls = dir === 'left' ? 'reveal-left' : dir === 'right' ? 'reveal-right' : 'reveal-up';
      Array.prototype.forEach.call(container.children, function (child, i) {
        child.classList.add(cls);
        child.style.setProperty('--d', i);   // délai staggered, cf. hero-anim.css
      });
    });

    var targets = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right, .reveal-fade');
    var wipeTargets = document.querySelectorAll('.reveal-wipe');

    if (prefersReduced || !('IntersectionObserver' in window)) {
      // Fallback : on affiche tout sans animer (les .reveal-wipe sont déjà
      // visibles par défaut, rien à faire pour elles).
      targets.forEach(function (el) { el.classList.add('is-revealed'); });
      return;
    }

    if (targets.length) {
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          var el = entry.target;
          if (entry.isIntersecting) {
            // Révélation déclenchée une seule fois : évite le clignotement
            // gênant quand on remonte/redescend la page.
            el.classList.add('is-revealed');
            observer.unobserve(el);
          }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

      targets.forEach(function (el) { observer.observe(el); });
    }

    /* .reveal-wipe : effet "rideau" en amélioration progressive uniquement.
       L'image reste visible par défaut (CSS). On n'arme l'animation que
       lorsque l'image interne est bien chargée, pour ne jamais risquer de
       cacher un visuel (cf. bug où les images disparaissaient). */
    if (wipeTargets.length) {
      var wipeObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          var el = entry.target;
          if (entry.isIntersecting) {
            el.classList.add('is-revealed');
            wipeObserver.unobserve(el);
          }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

      wipeTargets.forEach(function (el) {
        var img = el.querySelector('img');
        function arm() {
          el.classList.add('wipe-armed');
          wipeObserver.observe(el);
        }
        if (!img || img.complete) {
          arm();
        } else {
          img.addEventListener('load', arm, { once: true });
          // Garde-fou : si le chargement échoue ou traîne, on n'arme jamais
          // le clip-path (l'image reste simplement visible, sans effet).
        }
      });
    }
  }

  /* -----------------------------------------------------------
     EFFET 6 — BARRE DE PROGRESSION DE SCROLL
     Remplit .scroll-progress-bar selon l'avancement dans la page.
     ----------------------------------------------------------- */
  function initScrollProgress() {
    var bar = document.querySelector('.scroll-progress-bar');
    if (!bar) return;
    var ticking = false;

    function update() {
      ticking = false;
      var doc = document.documentElement;
      var max = doc.scrollHeight - doc.clientHeight;
      var progress = max > 0 ? (window.scrollY / max) * 100 : 0;
      bar.style.width = progress.toFixed(2) + '%';
    }
    function onScroll() {
      if (!ticking) { window.requestAnimationFrame(update); ticking = true; }
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    update();
  }

  /* -----------------------------------------------------------
     EFFET 7 — SCROLL-SPY (points de navigation)
     Les liens [data-scroll-dot] pointent vers des sections [id].
     Le point dont la section est la plus visible reçoit .is-active.
     ----------------------------------------------------------- */
  function initScrollSpy() {
    var dots = document.querySelectorAll('[data-scroll-dot]');
    if (!dots.length) return;

    var sections = [];
    dots.forEach(function (dot) {
      var id = dot.getAttribute('data-scroll-dot');
      var section = document.getElementById(id);
      if (section) sections.push({ dot: dot, section: section });
    });
    if (!sections.length) return;

    function setActive(id) {
      dots.forEach(function (dot) {
        dot.classList.toggle('is-active', dot.getAttribute('data-scroll-dot') === id);
      });
    }

    if (!('IntersectionObserver' in window)) {
      setActive(sections[0].section.id);
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) setActive(entry.target.id);
      });
    }, { rootMargin: '-45% 0px -45% 0px', threshold: 0 });

    sections.forEach(function (s) { observer.observe(s.section); });
    setActive(sections[0].section.id);
  }

  /* -----------------------------------------------------------
     EFFET 8 — BOUTONS MAGNÉTIQUES
     Les éléments .magnetic suivent légèrement le curseur quand il
     passe à proximité, puis reviennent au repos. Désactivé sur
     tactile et prefers-reduced-motion.
     ----------------------------------------------------------- */
  function initMagnetic() {
    // Effet « bouton magnétique » désactivé : les boutons ne suivent plus
    // le curseur. La classe .magnetic peut rester sur les éléments sans
    // aucun effet de déplacement.
  }

  /* -----------------------------------------------------------
     MODALE DE CONTACT
     Tout élément [data-open-contact-modal] ouvre l'overlay
     [data-contact-modal-overlay]. Fermeture via le bouton croix,
     clic sur le fond, ou touche Échap. À la soumission, on affiche
     un message de confirmation (pas de backend sur ce site statique).
     ----------------------------------------------------------- */
  function initContactModal() {
    var triggers = document.querySelectorAll('[data-open-contact-modal]');
    var overlay = document.querySelector('[data-contact-modal-overlay]');
    if (!triggers.length || !overlay) return;

    var form = overlay.querySelector('form');
    var successEl = overlay.querySelector('[data-contact-success]');
    var closeBtns = overlay.querySelectorAll('[data-close-contact-modal]');
    var lastFocused = null;

    function open(e) {
      if (e) e.preventDefault();
      lastFocused = document.activeElement;
      overlay.classList.add('is-open');
      overlay.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      var firstInput = overlay.querySelector('input');
      if (firstInput) firstInput.focus();
    }

    function close() {
      overlay.classList.remove('is-open');
      overlay.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      if (lastFocused && typeof lastFocused.focus === 'function') lastFocused.focus();
      // Réinitialise le formulaire pour la prochaine ouverture
      if (form) { form.reset(); form.hidden = false; }
      if (successEl) successEl.hidden = true;
    }

    triggers.forEach(function (el) { el.addEventListener('click', open); });
    closeBtns.forEach(function (el) { el.addEventListener('click', close); });

    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) close();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && overlay.classList.contains('is-open')) close();
    });

    if (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        form.hidden = true;
        if (successEl) successEl.hidden = false;
      });
    }
  }

  /* -----------------------------------------------------------
     EFFET 9 — COMPTEURS ANIMÉS
     [data-counter] anime de 0 à la valeur de l'attribut, déclenché
     une seule fois à l'entrée dans le viewport. Le format (espaces,
     décimales) est repris depuis le texte initial de l'élément.
     ----------------------------------------------------------- */
  function animateCounter(el) {
    var target = parseFloat(el.getAttribute('data-counter'));
    var suffix = el.getAttribute('data-counter-suffix') || '';
    if (isNaN(target)) return;
    var duration = 1400;
    var start = null;

    function format(value) {
      return Math.round(value).toLocaleString('fr-FR') + suffix;
    }
    function step(timestamp) {
      if (start === null) start = timestamp;
      var progress = Math.min((timestamp - start) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      el.textContent = format(target * eased);
      if (progress < 1) window.requestAnimationFrame(step);
    }
    window.requestAnimationFrame(step);
  }

  function initCounters() {
    var counters = document.querySelectorAll('[data-counter]');
    if (!counters.length) return;

    if (prefersReduced || !('IntersectionObserver' in window)) {
      counters.forEach(function (el) {
        var target = parseFloat(el.getAttribute('data-counter'));
        var suffix = el.getAttribute('data-counter-suffix') || '';
        if (!isNaN(target)) el.textContent = Math.round(target).toLocaleString('fr-FR') + suffix;
      });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });

    counters.forEach(function (el) { observer.observe(el); });
  }

  /* -----------------------------------------------------------
     SLIDER / CARROUSEL
     Flèches préc/suiv qui défilent d'une "page" de cartes via
     scroll-snap. Désactive les boutons aux extrémités.
     ----------------------------------------------------------- */
  function initSliders() {
    Array.prototype.forEach.call(document.querySelectorAll('[data-slider]'), function (slider) {
      var track = slider.querySelector('[data-slider-track]');
      var prev = slider.querySelector('[data-slider-prev]');
      var next = slider.querySelector('[data-slider-next]');
      if (!track) return;

      var slides = track.querySelectorAll('.slider-slide');
      var count = slides.length;

      function step() {
        var slide = track.querySelector('.slider-slide');
        // largeur d'une tuile + gap (24px) => défilement d'une tuile
        return slide ? slide.getBoundingClientRect().width + 24 : track.clientWidth;
      }
      // Index courant déduit de la position de scroll
      function currentIndex() {
        return Math.round(track.scrollLeft / step());
      }
      // Va à un index donné ; boucle (wrap) en début/fin
      function goTo(i) {
        var idx = (i + count) % count;             // bouclage circulaire
        track.scrollTo({ left: idx * step(), behavior: 'smooth' });
      }

      if (prev) prev.addEventListener('click', function () { goTo(currentIndex() - 1); pause(); });
      if (next) next.addEventListener('click', function () { goTo(currentIndex() + 1); pause(); });

      /* --- Défilement automatique --- */
      var DELAY = 3200;       // 3,2 s par tuile : laisse le temps de lire
      var timer = null;
      function play() {
        if (prefersReduced || count < 2) return;   // pas d'autoplay si motion réduit
        stop();
        timer = window.setInterval(function () { goTo(currentIndex() + 1); }, DELAY);
      }
      function stop() { if (timer) { window.clearInterval(timer); timer = null; } }
      // Pause temporaire après interaction manuelle, puis reprise
      function pause() { stop(); window.setTimeout(play, DELAY * 1.5); }

      // Pause au survol / focus, reprise à la sortie
      slider.addEventListener('mouseenter', stop);
      slider.addEventListener('mouseleave', play);
      slider.addEventListener('focusin', stop);
      slider.addEventListener('focusout', play);

      window.addEventListener('resize', function () { goTo(currentIndex()); }, { passive: true });
      play();
    });
  }

  /* -----------------------------------------------------------
     Bootstrap
     ----------------------------------------------------------- */
  function init() {
    initLetterTitles(); // découpe avant l'affichage pour éviter le flash
    // Le parallax du hero est désormais géré par Framer Motion
    // (components/HeroParallax.tsx), plus par initHeroShrink().
    initNavPill();
    initReveals();
    initSliders();
    initScrollProgress();
    initScrollSpy();
    initMagnetic();
    initCounters();
    initContactModal();
  }

  /* -----------------------------------------------------------
     Adaptation Next.js (App Router) :
     - __initAll() : tout l'init, appelé une seule fois (mount du layout racine).
     - __initPageEffects() : uniquement les effets dépendant du contenu de
       page (lettres du titre, reveals, slider, compteurs), réappelés à
       chaque navigation client-side puisque le <header>/scroll listeners
       restent montés dans le layout et n'ont pas besoin d'être réinitialisés.
     ----------------------------------------------------------- */
  function initPageEffects() {
    initLetterTitles();
    initReveals();
    initSliders();
    initCounters();
  }

  window.__leCampusAnim = {
    initAll: init,
    initPageEffects: initPageEffects
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

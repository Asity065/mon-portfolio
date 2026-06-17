/* ════════════════════════════════════════════════════════════
   PORTFOLIO — Alex Martin
   main.js
   ════════════════════════════════════════════════════════════ */

/* ══════════════════════════════════════════════════
   1. EFFET DE FRAPPE (Terminal Hero)
   ══════════════════════════════════════════════════ */

const phrases = [
  'Développeur Junior',
  'Passionné par le JavaScript',
  'Passionné par le Réseau et la Cybersécurité',
  'Curieux et motivé',
  'Disponible pour un stage',
];

let phraseIndex = 0;
let charIndex   = 0;
let isDeleting  = false;

const typedEl = document.getElementById('typed-text');

/**
 * Anime l'effet de frappe lettre par lettre.
 * - Tape la phrase courante caractère par caractère
 * - Attend 1,8 s puis efface
 * - Passe à la phrase suivante en boucle
 */
function typeEffect() {
  const current = phrases[phraseIndex];

  if (!isDeleting) {
    // Frappe
    typedEl.textContent = current.slice(0, charIndex + 1);
    charIndex++;

    if (charIndex === current.length) {
      // Fin de frappe → pause avant d'effacer
      isDeleting = true;
      setTimeout(typeEffect, 1800);
      return;
    }
  } else {
    // Effacement
    typedEl.textContent = current.slice(0, charIndex - 1);
    charIndex--;

    if (charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
    }
  }

  const speed = isDeleting ? 50 : 90;
  setTimeout(typeEffect, speed);
}

// Démarrage différé pour laisser la page se charger
setTimeout(typeEffect, 800);


/* ══════════════════════════════════════════════════
   2. MENU BURGER (Navigation mobile)
   ══════════════════════════════════════════════════ */

const burgerBtn  = document.getElementById('burger');
const mobileMenu = document.getElementById('mobileMenu');

burgerBtn.addEventListener('click', () => {
  burgerBtn.classList.toggle('open');
  mobileMenu.classList.toggle('open');
});

/**
 * Ferme le menu mobile.
 * Appelée depuis les liens du menu (onclick="closeMobile()").
 */
function closeMobile() {
  burgerBtn.classList.remove('open');
  mobileMenu.classList.remove('open');
}

// Fermer le menu si on clique en dehors
document.addEventListener('click', (e) => {
  if (
    mobileMenu.classList.contains('open') &&
    !mobileMenu.contains(e.target) &&
    !burgerBtn.contains(e.target)
  ) {
    closeMobile();
  }
});


/* ══════════════════════════════════════════════════
   3. SCROLL REVEAL (Apparition au défilement)
   ══════════════════════════════════════════════════ */

const revealEls = document.querySelectorAll('.reveal');

/**
 * Observe chaque élément .reveal.
 * Quand il entre dans le viewport, ajoute la classe .visible
 * avec un léger délai échelonné pour un effet en cascade.
 */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, i * 80);
      }
    });
  },
  { threshold: 0.1 }
);

revealEls.forEach((el) => revealObserver.observe(el));


/* ══════════════════════════════════════════════════
   4. BARRES DE COMPÉTENCES (Animation au scroll)
   ══════════════════════════════════════════════════ */

/**
 * Observe les listes de compétences.
 * Quand elles entrent dans le viewport, anime chaque
 * barre jusqu'à la valeur définie en data-width.
 */
const skillObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.skill-fill').forEach((bar) => {
          bar.style.width = bar.dataset.width + '%';
        });
        // Désactiver l'observer après la première animation
        skillObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.3 }
);

document.querySelectorAll('.skills-list').forEach((el) => {
  skillObserver.observe(el);
});


/* ══════════════════════════════════════════════════
   5. FORMULAIRE DE CONTACT (Validation)
   ══════════════════════════════════════════════════ */

/**
 * Vérifie le format d'un email.
 * @param {string} email
 * @returns {boolean}
 */
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/**
 * Affiche un message de statut dans le formulaire.
 * @param {string} message  - Texte à afficher
 * @param {'success'|'error'} type - Type du message
 */
function showFormStatus(message, type) {
  const statusEl = document.getElementById('formStatus');
  statusEl.className = 'form-status ' + type;
  statusEl.textContent = message;
}

/**
 * Récupère la valeur d'un champ par son id.
 * @param {string} id
 * @returns {string}
 */
function getField(id) {
  return document.getElementById(id).value.trim();
}

/**
 * Vide tous les champs du formulaire.
 */
function clearForm() {
  ['fname', 'lname', 'email', 'subject', 'message'].forEach((id) => {
    document.getElementById(id).value = '';
  });
}

/**
 * Gère la soumission du formulaire de contact :
 * - Validation des champs obligatoires (prénom, email, message)
 * - Validation du format de l'email
 * - Simulation d'envoi (à remplacer par un vrai backend ou EmailJS)
 */
function handleSubmit() {
  const fname   = getField('fname');
  const email   = getField('email');
  const message = getField('message');

  // Réinitialiser le statut
  const statusEl = document.getElementById('formStatus');
  statusEl.className = 'form-status';

  // Validation
  if (!fname || !email || !message) {
    showFormStatus(
      '⚠️ Merci de remplir les champs obligatoires : prénom, email et message.',
      'error'
    );
    return;
  }

  if (!isValidEmail(email)) {
    showFormStatus(
      '⚠️ L\'adresse email semble incorrecte. Veuillez vérifier.',
      'error'
    );
    return;
  }

  // Simulation d'envoi (remplacer par fetch vers votre API ou EmailJS)
  showFormStatus(
    '✅ Message envoyé ! Je vous répondrai dans les plus brefs délais.',
    'success'
  );

  clearForm();
}


/* ══════════════════════════════════════════════════
   6. NAV ACTIVE AU SCROLL (Lien actif selon section)
   ══════════════════════════════════════════════════ */

const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a');

/**
 * Met à jour le lien de navigation actif
 * selon la section visible à l'écran.
 */
function updateActiveNav() {
  let current = '';

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 100;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  navItems.forEach((link) => {
    link.style.color = '';
    if (link.getAttribute('href') === '#' + current) {
      link.style.color = 'var(--text)';
    }
  });
}

window.addEventListener('scroll', updateActiveNav, { passive: true });

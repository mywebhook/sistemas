/* =========================================================
   TARJETA DIGITAL · INGENIERO DE SISTEMAS
   script.js
   ---------------------------------------------------------
   Todo el contenido personal se edita en el objeto CONFIG.
   Reglas:
   - Un campo vacío ("") = PENDIENTE. El botón asociado no se
     rompe: muestra un aviso indicando qué campo completar.
   - Los textos marcados como "[EJEMPLO]" o con `example: true`
     son de muestra y deben reemplazarse por datos reales.
   ========================================================= */

'use strict';

/* =========================================================
   1. CONFIGURACIÓN — edita SOLO este objeto
   ========================================================= */
const CONFIG = {
  /* ---- Identidad ---- */
  name: 'Nombre Apellido',                        // [EJEMPLO] nombre completo
  title: 'Ingeniero de Sistemas',
  specialty: 'Desarrollo de software · Cloud · Ciberseguridad', // [EJEMPLO]
  bio: 'Diseño y construyo soluciones tecnológicas seguras y escalables que ayudan a empresas a digitalizar y automatizar sus procesos.', // [EJEMPLO]
  company: '',                                    // empresa u organización (opcional)

  availability: {
    available: true,                              // false = "Agenda completa"
    label: 'Disponible para nuevos proyectos',
    busyLabel: 'Agenda completa · consultas abiertas'
  },

  /* ---- Imágenes (rutas relativas o URL) ---- */
  photo: 'assets/img/profile-placeholder.svg',    // reemplaza por tu foto: assets/img/perfil.jpg
  cover: 'assets/img/cover-circuit.svg',

  /* ---- Contacto ---- */
  phone: '',          // ej. '+591 70000000'  (formato internacional)
  whatsapp: '',       // solo dígitos con código de país, ej. '59170000000'
  whatsappMessage: 'Hola, vi tu tarjeta digital y me gustaría conversar sobre un proyecto.',
  email: '',          // ej. 'tucorreo@dominio.com'

  /* ---- Enlaces profesionales (URL completas con https://) ---- */
  linkedin: '',       // ej. 'https://www.linkedin.com/in/tu-usuario'
  github: '',         // ej. 'https://github.com/tu-usuario'
  website: '',
  blog: '',
  portfolio: '',
  projects: '',       // si queda vacío se usa el enlace de GitHub
  certificationsUrl: '', // perfil de credenciales (Credly, etc.), opcional
  meetingUrl: '',     // página de reservas (Calendly, Google Calendar…). Vacío = formulario de solicitud

  /* ---- Ubicación ---- */
  location: {
    label: '',        // texto visible, ej. 'Ciudad, País'
    mapsQuery: ''     // dirección o lugar para Google Maps. Vacío = se usa label
  },

  /* ---- Documentos ---- */
  cv: '',             // ej. 'assets/docs/cv.pdf'
  catalog: '',        // ej. 'assets/docs/catalogo-servicios.pdf'. Vacío = se genera uno imprimible

  /* ---- URL pública de la tarjeta (para QR y compartir). Vacío = URL actual ---- */
  cardUrl: '',

  /* ---- Moneda para los rangos de presupuesto ---- */
  budgets: [
    'Menos de $500 USD',
    '$500 – $1,500 USD',
    '$1,500 – $5,000 USD',
    'Más de $5,000 USD',
    'Aún no lo tengo definido'
  ],

  /* ---- Servicios (icono = nombre de Lucide Icons: https://lucide.dev/icons) ---- */
  services: [
    { icon: 'code-xml',           name: 'Desarrollo de software',     description: 'Sistemas a medida, robustos y mantenibles, desde el análisis de requisitos hasta la puesta en producción.' },
    { icon: 'monitor-smartphone', name: 'Aplicaciones web',           description: 'Plataformas web modernas, rápidas y adaptables a cualquier dispositivo, con paneles de administración.' },
    { icon: 'layout-template',    name: 'Diseño de páginas web',      description: 'Sitios corporativos y landing pages con diseño profesional, optimizados para SEO y conversión.' },
    { icon: 'database',           name: 'Bases de datos',             description: 'Modelado, optimización, migración y respaldo de bases de datos relacionales y NoSQL.' },
    { icon: 'server',             name: 'Redes y servidores',         description: 'Diseño, instalación y administración de redes, servidores y servicios de infraestructura.' },
    { icon: 'shield-check',       name: 'Seguridad informática',      description: 'Evaluación de vulnerabilidades, hardening y buenas prácticas para proteger tu información.' },
    { icon: 'life-buoy',          name: 'Soporte técnico',            description: 'Mantenimiento preventivo y correctivo de equipos, software y sistemas empresariales.' },
    { icon: 'lightbulb',          name: 'Consultoría tecnológica',    description: 'Asesoría para elegir la tecnología adecuada y planificar la transformación digital.' },
    { icon: 'cloud',              name: 'Servicios cloud',            description: 'Despliegue, migración y optimización de costos en la nube con arquitecturas escalables.' },
    { icon: 'workflow',           name: 'Automatización de procesos', description: 'Integraciones, scripts y flujos automáticos que eliminan tareas repetitivas.' }
  ],

  /* ---- Experiencia profesional ([EJEMPLO]: reemplazar y quitar `example`) ---- */
  experience: [
    { role: 'Cargo / Puesto', company: 'Empresa u organización', period: 'Año – Año', description: 'Describe aquí tus logros y responsabilidades principales.', example: true },
    { role: 'Cargo / Puesto', company: 'Empresa u organización', period: 'Año – Año', description: 'Agrega tantas entradas como necesites, de la más reciente a la más antigua.', example: true }
  ],

  /* ---- Tecnologías que dominas ([EJEMPLO]: ajusta a tu stack real) ---- */
  technologies: [
    { group: 'Frontend',            items: ['HTML5', 'CSS3', 'JavaScript'], example: true },
    { group: 'Backend',             items: ['Lenguaje 1', 'Framework 1'],   example: true },
    { group: 'Bases de datos',      items: ['Motor SQL', 'Motor NoSQL'],    example: true },
    { group: 'Infraestructura',     items: ['Sistema operativo', 'Proveedor cloud'], example: true }
  ],

  /* ---- Certificaciones ([EJEMPLO]) ---- */
  certifications: [
    { name: 'Nombre de la certificación', issuer: 'Entidad emisora', year: 'Año', url: '', example: true }
  ]
};

/* =========================================================
   2. ACCESOS DE "EXPLORA MI PERFIL"
   type 'link'   → abre CONFIG[key]
   type 'action' → ejecuta una acción interna
   ========================================================= */
const EXPLORE_ITEMS = [
  { key: 'portfolio',      type: 'link',   icon: 'briefcase',     title: 'Mi portafolio',   desc: 'Trabajos y casos de éxito seleccionados', featured: true },
  { key: 'projects',       type: 'link',   icon: 'folder-git-2',  title: 'Mis proyectos',   desc: 'Repositorios y desarrollos' },
  { key: 'cv',             type: 'action', icon: 'file-down',     title: 'Descargar CV',    desc: 'Currículum en PDF' },
  { key: 'certifications', type: 'action', icon: 'award',         title: 'Certificaciones', desc: 'Formación acreditada' },
  { key: 'experience',     type: 'action', icon: 'history',       title: 'Experiencia',     desc: 'Mi trayectoria profesional' },
  { key: 'technologies',   type: 'action', icon: 'cpu',           title: 'Tecnologías',     desc: 'El stack que domino' },
  { key: 'website',        type: 'link',   icon: 'globe',         title: 'Mi sitio web',    desc: 'Página oficial' },
  { key: 'blog',           type: 'link',   icon: 'newspaper',     title: 'Blog tecnológico', desc: 'Artículos y guías' }
];

/* Nombre legible de cada campo para los avisos de "pendiente" */
const FIELD_LABELS = {
  whatsapp: 'El número de WhatsApp',
  email: 'El correo electrónico',
  call: 'El teléfono',
  linkedin: 'El perfil de LinkedIn',
  github: 'El perfil de GitHub',
  portfolio: 'El portafolio',
  projects: 'El enlace de proyectos',
  website: 'El sitio web',
  blog: 'El blog',
  maps: 'La ubicación',
  cv: 'El currículum',
  meeting: 'La agenda de reuniones'
};

/* Campo de CONFIG que corresponde a cada enlace */
const FIELD_KEYS = { call: 'phone', maps: 'location.label', meeting: 'meetingUrl' };

/* Icono de WhatsApp (Lucide no incluye logotipos de esta marca) */
const WA_SVG = '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.39-1.47-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.91-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.21 3.07.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.7.63.71.22 1.36.19 1.87.12.57-.09 1.76-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35m-5.42 7.4h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.44-9.88 9.89-9.88 2.64 0 5.12 1.03 6.99 2.9a9.83 9.83 0 0 1 2.89 6.99c0 5.45-4.44 9.88-9.88 9.88m8.41-18.3A11.82 11.82 0 0 0 12.05 0C5.5 0 .16 5.34.16 11.89c0 2.1.55 4.14 1.59 5.95L.06 24l6.3-1.65a11.88 11.88 0 0 0 5.68 1.45h.01c6.55 0 11.89-5.34 11.89-11.89a11.82 11.82 0 0 0-3.48-8.41Z"/></svg>';

/* =========================================================
   3. UTILIDADES
   ========================================================= */
const $  = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

/** true si el valor tiene contenido real */
const isSet = (v) => typeof v === 'string' ? v.trim() !== '' : Boolean(v);

/** Escapa texto para insertarlo en HTML */
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

/** Lectura/escritura segura de localStorage */
const store = {
  get(key) { try { return localStorage.getItem(key); } catch { return null; } },
  set(key, val) { try { localStorage.setItem(key, val); } catch { /* sin almacenamiento */ } }
};

/** Iniciales a partir del nombre */
const initials = (name) => name.trim().split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0].toUpperCase()).join('') || 'IS';

/** Dibuja los iconos Lucide pendientes dentro de un nodo */
function refreshIcons() {
  if (window.lucide && typeof window.lucide.createIcons === 'function') {
    window.lucide.createIcons({ attrs: { 'aria-hidden': 'true', focusable: 'false' } });
  }
}

/** Inyecta el icono de WhatsApp en los contenedores marcados */
function paintWhatsAppIcons(root = document) {
  $$('[data-wa-icon]', root).forEach((el) => { if (!el.firstChild) el.innerHTML = WA_SVG; });
}

/** URL pública de la tarjeta */
const cardUrl = () => (isSet(CONFIG.cardUrl) ? CONFIG.cardUrl : window.location.href.split('#')[0]);

const isLocal = () => ['file:', ''].includes(location.protocol) || ['localhost', '127.0.0.1', ''].includes(location.hostname);

/** Abre una URL externa en una pestaña nueva */
function openExternal(url) {
  const w = window.open(url, '_blank', 'noopener');
  if (!w) window.location.href = url; // si el navegador bloquea la ventana
}

/** Descarga un Blob con un nombre de archivo */
function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 4000);
}

/** Copia texto al portapapeles con alternativa para navegadores antiguos */
async function copyText(text) {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch { /* se intenta el método alternativo */ }
  const ta = document.createElement('textarea');
  ta.value = text;
  ta.setAttribute('readonly', '');
  ta.style.cssText = 'position:fixed;top:-1000px;opacity:0';
  document.body.appendChild(ta);
  ta.select();
  let ok = false;
  try { ok = document.execCommand('copy'); } catch { ok = false; }
  ta.remove();
  return ok;
}

/* =========================================================
   4. AVISOS (toasts)
   ========================================================= */
function toast(message, type = 'info') {
  const region = $('#toastRegion');
  // Si hay un modal abierto, el aviso debe vivir dentro de él (capa superior)
  const openDialog = $('dialog[open]');
  const host = openDialog || document.body;
  if (region.parentElement !== host) host.appendChild(region);

  const icon = { info: 'info', warn: 'triangle-alert', ok: 'circle-check' }[type] || 'info';
  const el = document.createElement('div');
  el.className = `toast is-${type}`;
  el.innerHTML = `<i data-lucide="${icon}"></i><span>${esc(message)}</span>`;
  region.appendChild(el);
  refreshIcons();

  while (region.children.length > 3) region.firstElementChild.remove();

  setTimeout(() => {
    el.classList.add('is-leaving');
    el.addEventListener('animationend', () => el.remove(), { once: true });
    setTimeout(() => el.remove(), 600);
  }, 3600);
}

/** Aviso estándar para un dato que falta en CONFIG */
function pendingToast(key) {
  const label = FIELD_LABELS[key] || 'Este enlace';
  const field = FIELD_KEYS[key] || key;
  toast(`${label} aún no está configurado. Complétalo en CONFIG.${field} (script.js).`, 'warn');
}

/* =========================================================
   5. ENLACES (WhatsApp, correo, llamada, redes, mapas…)
   ========================================================= */
function whatsappUrl(message = CONFIG.whatsappMessage) {
  const number = String(CONFIG.whatsapp || '').replace(/\D/g, '');
  if (!number) return '';
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

function emailUrl(subject = 'Contacto desde tu tarjeta digital', body = '') {
  if (!isSet(CONFIG.email)) return '';
  const params = new URLSearchParams();
  params.set('subject', subject);
  if (body) params.set('body', body);
  // URLSearchParams usa "+" para espacios; mailto necesita %20
  return `mailto:${CONFIG.email}?${params.toString().replace(/\+/g, '%20')}`;
}

function mapsUrl() {
  const q = isSet(CONFIG.location.mapsQuery) ? CONFIG.location.mapsQuery : CONFIG.location.label;
  return isSet(q) ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}` : '';
}

/** Devuelve la URL real de cada tipo de enlace o '' si falta el dato */
function resolveLink(key) {
  switch (key) {
    case 'whatsapp': return whatsappUrl();
    case 'email':    return emailUrl();
    case 'call':     return isSet(CONFIG.phone) ? `tel:${CONFIG.phone.replace(/[^\d+]/g, '')}` : '';
    case 'maps':     return mapsUrl();
    case 'projects': return CONFIG.projects || CONFIG.github || '';
    default:         return CONFIG[key] || '';
  }
}

/** Asigna href a todos los [data-link]; si falta el dato, marca como pendiente */
function bindLinks(root = document) {
  $$('[data-link]', root).forEach((el) => {
    const key = el.dataset.link;
    const url = resolveLink(key);
    if (url) {
      el.href = url;
      el.removeAttribute('data-pending');
      el.removeAttribute('aria-disabled');
    } else {
      el.href = '#';
      el.dataset.pending = key;
      el.setAttribute('aria-disabled', 'true');
      el.title = `${FIELD_LABELS[key] || 'Enlace'}: pendiente de configurar`;
    }
  });
}

/* =========================================================
   6. RENDER DEL PERFIL Y SECCIONES
   ========================================================= */
function renderProfile() {
  const { name, title, specialty, bio, availability } = CONFIG;

  document.title = `${name} · ${title}`;
  $('#name').textContent = name;
  $('#role').textContent = title;
  $('#specialty').textContent = specialty;
  $('#bio').textContent = bio;
  $('#brandInitials').textContent = initials(name);
  $('#footerName').textContent = name;
  $('#footerRole').textContent = title;
  $('#year').textContent = new Date().getFullYear();

  // Disponibilidad
  const status = $('#status');
  status.classList.toggle('is-busy', !availability.available);
  $('#statusText').textContent = availability.available ? availability.label : availability.busyLabel;

  // Ubicación
  if (isSet(CONFIG.location.label)) {
    $('#locationText').textContent = CONFIG.location.label;
    $('#locationLine').hidden = false;
  }

  // Portada
  const cover = $('#coverImg');
  if (isSet(CONFIG.cover)) {
    cover.src = CONFIG.cover;
    cover.onerror = () => { cover.hidden = true; };
  } else {
    cover.hidden = true;
  }

  // Foto de perfil (si falla, se muestran las iniciales)
  const avatar = $('#avatarImg');
  const showInitials = () => {
    const div = document.createElement('div');
    div.className = 'avatar-fallback';
    div.setAttribute('role', 'img');
    div.setAttribute('aria-label', `Iniciales de ${name}`);
    div.textContent = initials(name);
    avatar.replaceWith(div);
  };
  if (isSet(CONFIG.photo)) {
    avatar.src = CONFIG.photo;
    avatar.alt = `Fotografía de ${name}`;
    avatar.onerror = showInitials;
  } else {
    showInitials();
  }
}

function renderExplore() {
  const grid = $('#exploreGrid');
  grid.innerHTML = EXPLORE_ITEMS.map((item) => {
    const cls = `tile glow-card${item.featured ? ' tile--featured' : ''}`;
    const inner = `
      <span class="tile-icon"><i data-lucide="${item.icon}"></i></span>
      <span class="tile-text">
        <span class="tile-title">${esc(item.title)}</span><br>
        <span class="tile-desc">${esc(item.desc)}</span>
      </span>
      <span class="tile-arrow"><i data-lucide="${item.type === 'link' ? 'arrow-up-right' : 'chevron-right'}"></i></span>`;
    return item.type === 'link'
      ? `<a class="${cls}" data-link="${item.key}" href="#" target="_blank" rel="noopener">${inner}</a>`
      : `<button class="${cls}" type="button" data-action="${item.key}">${inner}</button>`;
  }).join('');
}

function renderServices() {
  const grid = $('#servicesGrid');
  grid.innerHTML = CONFIG.services.map((s, i) => `
    <article class="service glow-card">
      <span class="service-icon"><i data-lucide="${esc(s.icon)}"></i></span>
      <h3 class="service-name">${esc(s.name)}</h3>
      <p class="service-desc">${esc(s.description)}</p>
      <button class="service-cta" type="button" data-action="service-info" data-index="${i}">
        Solicitar información <i data-lucide="arrow-right"></i>
      </button>
    </article>`).join('');

  const toggle = $('#servicesToggle');
  const VISIBLE = 4;
  if (CONFIG.services.length <= VISIBLE) { toggle.hidden = true; return; }

  const label = $('.btn-label', toggle);
  label.textContent = `Ver todos los servicios (${CONFIG.services.length})`;

  toggle.addEventListener('click', () => {
    const expanded = grid.classList.toggle('is-expanded');
    toggle.setAttribute('aria-expanded', String(expanded));
    label.textContent = expanded ? 'Ver menos servicios' : `Ver todos los servicios (${CONFIG.services.length})`;
    if (expanded) {
      $$('.service', grid).slice(VISIBLE).forEach((el) => el.classList.add('is-new'));
    } else {
      $('#servicios').scrollIntoView({ behavior: prefersReducedMotion.matches ? 'auto' : 'smooth' });
    }
  });
}

/** Rellena los selects del formulario */
function renderFormOptions() {
  $('#f-service').innerHTML =
    '<option value="">Selecciona un servicio</option>' +
    CONFIG.services.map((s) => `<option value="${esc(s.name)}">${esc(s.name)}</option>`).join('') +
    '<option value="Otro">Otro / no estoy seguro</option>';

  $('#f-budget').innerHTML =
    '<option value="">Selecciona un rango</option>' +
    CONFIG.budgets.map((b) => `<option value="${esc(b)}">${esc(b)}</option>`).join('');
}

/* =========================================================
   7. MODALES
   ========================================================= */
let lastFocus = null;

function openModal(dialog) {
  if (!dialog) return;
  lastFocus = document.activeElement;
  if (typeof dialog.showModal === 'function') dialog.showModal();
  else dialog.setAttribute('open', '');
  document.body.classList.add('modal-open');
}

function closeModal(dialog) {
  if (!dialog) return;
  if (typeof dialog.close === 'function') dialog.close();
  else dialog.removeAttribute('open');
}

function initModals() {
  $$('dialog.modal').forEach((dialog) => {
    // Cerrar con el botón X
    dialog.addEventListener('click', (e) => {
      if (e.target.closest('[data-close]')) closeModal(dialog);
      // Clic en el fondo (fuera de la caja)
      if (e.target === dialog) closeModal(dialog);
    });
    dialog.addEventListener('close', () => {
      document.body.classList.remove('modal-open');
      // Devolver los avisos al body
      const region = $('#toastRegion');
      if (region && region.parentElement === dialog) document.body.appendChild(region);
      if (lastFocus && typeof lastFocus.focus === 'function') lastFocus.focus();
    });
  });
}

/* ---------- Panel de información ---------- */
const exampleBadge = (item) => (item.example ? ' <span class="badge-example">Ejemplo</span>' : '');

function openInfo(kind) {
  const title = $('#infoTitle');
  const eyebrow = $('#infoEyebrow');
  const body = $('#infoBody');
  const empty = (txt) => `<p class="empty-state">${txt}</p>`;

  if (kind === 'experience') {
    eyebrow.textContent = 'Trayectoria';
    title.textContent = 'Experiencia profesional';
    body.innerHTML = CONFIG.experience.length
      ? `<ol class="timeline">${CONFIG.experience.map((x) => `
          <li>
            <h3>${esc(x.role)}${exampleBadge(x)}</h3>
            <p class="meta">${esc(x.company)} · ${esc(x.period)}</p>
            <p>${esc(x.description)}</p>
          </li>`).join('')}</ol>`
      : empty('Experiencia pendiente de configurar en CONFIG.experience.');
  }

  if (kind === 'technologies') {
    eyebrow.textContent = 'Stack';
    title.textContent = 'Tecnologías que domino';
    body.innerHTML = CONFIG.technologies.length
      ? CONFIG.technologies.map((g) => `
          <div class="tech-group">
            <h3>${esc(g.group)}${exampleBadge(g)}</h3>
            <div class="chips">${g.items.map((t) => `<span class="chip">${esc(t)}</span>`).join('')}</div>
          </div>`).join('')
      : empty('Tecnologías pendientes de configurar en CONFIG.technologies.');
  }

  if (kind === 'certifications') {
    eyebrow.textContent = 'Formación';
    title.textContent = 'Certificaciones';
    const list = CONFIG.certifications.length
      ? `<ul class="cert-list">${CONFIG.certifications.map((c) => `
          <li>
            <i data-lucide="badge-check"></i>
            <div><strong>${esc(c.name)}${exampleBadge(c)}</strong><span>${esc(c.issuer)} · ${esc(c.year)}</span></div>
            ${isSet(c.url) ? `<a href="${esc(c.url)}" target="_blank" rel="noopener">Verificar</a>` : ''}
          </li>`).join('')}</ul>`
      : empty('Certificaciones pendientes de configurar en CONFIG.certifications.');
    const profile = isSet(CONFIG.certificationsUrl)
      ? `<a class="btn btn-ghost" href="${esc(CONFIG.certificationsUrl)}" target="_blank" rel="noopener">
           <span class="btn-icon"><i data-lucide="external-link"></i></span><span class="btn-label">Ver todas mis credenciales</span></a>`
      : '';
    body.innerHTML = list + profile;
  }

  refreshIcons();
  openModal($('#infoModal'));
}

/* =========================================================
   8. FORMULARIO (cotización · contratación · reunión)
   ========================================================= */
const FORM_MODES = {
  quote: {
    eyebrow: 'Cotización', title: 'Solicitar cotización',
    intro: 'Completa los datos y recibirás una propuesta con alcance, tiempos y costo estimado.',
    descLabel: 'Descripción del proyecto', budgetRequired: true,
    heading: 'SOLICITUD DE COTIZACIÓN'
  },
  hire: {
    eyebrow: 'Contratación', title: 'Contratar un servicio',
    intro: 'Indica el servicio que necesitas y los detalles para coordinar el inicio del trabajo.',
    descLabel: 'Detalles del servicio requerido', budgetRequired: false,
    heading: 'SOLICITUD DE CONTRATACIÓN'
  },
  meeting: {
    eyebrow: 'Reunión', title: 'Agendar una reunión',
    intro: 'Propón fecha y hora. Confirmaré la disponibilidad por el mismo medio que elijas.',
    descLabel: 'Tema de la reunión', budgetRequired: false,
    heading: 'SOLICITUD DE REUNIÓN'
  }
};

let formMode = 'quote';

function openForm(mode = 'quote', presetService = '') {
  formMode = mode;
  const m = FORM_MODES[mode];
  const form = $('#requestForm');

  $('#formEyebrow').textContent = m.eyebrow;
  $('#formTitle').textContent = m.title;
  $('#formIntro').textContent = m.intro;
  $('#descLabel').textContent = m.descLabel;

  $$('[data-mode-only]', form).forEach((el) => { el.hidden = el.dataset.modeOnly !== mode; });
  $$('[data-mode-hide]', form).forEach((el) => { el.hidden = el.dataset.modeHide === mode; });

  // Fecha mínima: hoy
  const today = new Date();
  const local = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
  $('#f-date').min = local;

  if (presetService) $('#f-service').value = presetService;

  clearErrors();
  openModal($('#formModal'));
  setTimeout(() => $('#f-name').focus({ preventScroll: true }), 60);
}

/* Reglas de validación: devuelven '' si el campo es válido */
const VALIDATORS = {
  name: (v) => (v.trim().length < 3 ? 'Ingresa tu nombre (mínimo 3 caracteres).' : ''),
  email: (v) => (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) ? 'Ingresa un correo electrónico válido.' : ''),
  phone: (v) => {
    const digits = v.replace(/\D/g, '');
    if (!/^[+\d\s().-]+$/.test(v.trim())) return 'Usa solo números, espacios y el signo +.';
    return digits.length < 7 || digits.length > 15 ? 'Ingresa un número válido con código de país (7 a 15 dígitos).' : '';
  },
  service: (v) => (!v ? 'Selecciona el tipo de servicio.' : ''),
  description: (v) => (v.trim().length < 20 ? `Describe tu necesidad con al menos 20 caracteres (llevas ${v.trim().length}).` : ''),
  budget: (v) => (FORM_MODES[formMode].budgetRequired && !v ? 'Selecciona un presupuesto aproximado.' : ''),
  date: (v) => {
    if (formMode !== 'meeting') return '';
    if (!v) return 'Selecciona una fecha.';
    return v < $('#f-date').min ? 'La fecha no puede ser anterior a hoy.' : '';
  },
  time: (v) => (formMode === 'meeting' && !v ? 'Selecciona una hora.' : '')
};

const ERROR_IDS = { name: 'e-name', email: 'e-email', phone: 'e-phone', service: 'e-service', description: 'e-desc', budget: 'e-budget', date: 'e-date', time: 'e-time' };

function validateField(input) {
  const rule = VALIDATORS[input.name];
  if (!rule) return true;
  const msg = rule(input.value);
  const errEl = $('#' + ERROR_IDS[input.name]);
  input.setAttribute('aria-invalid', msg ? 'true' : 'false');
  if (errEl) {
    errEl.textContent = msg;
    input.setAttribute('aria-describedby', ERROR_IDS[input.name]);
  }
  return !msg;
}

function clearErrors() {
  $$('#requestForm [aria-invalid]').forEach((el) => el.removeAttribute('aria-invalid'));
  $$('#requestForm .field-error').forEach((el) => { el.textContent = ''; });
}

function buildMessage(data) {
  const m = FORM_MODES[formMode];
  const lines = [
    `*${m.heading}*`,
    '',
    `Nombre: ${data.name}`,
    `Correo: ${data.email}`,
    `WhatsApp: ${data.phone}`,
    `Servicio: ${data.service}`
  ];
  if (formMode === 'meeting') {
    lines.push(`Fecha preferida: ${data.date}`, `Hora preferida: ${data.time}`, `Modalidad: ${data.modality}`);
  } else if (data.budget) {
    lines.push(`Presupuesto: ${data.budget}`);
  }
  lines.push('', `${m.descLabel}:`, data.description);
  return lines.join('\n');
}

function initForm() {
  const form = $('#requestForm');
  let channel = 'whatsapp';

  // Validación al salir del campo y corrección en vivo
  form.addEventListener('focusout', (e) => { if (e.target.name && e.target.value) validateField(e.target); });
  form.addEventListener('input', (e) => {
    if (e.target.getAttribute('aria-invalid') === 'true') validateField(e.target);
    if (e.target.id === 'f-desc') $('#descCount').textContent = e.target.value.length;
  });
  form.addEventListener('change', (e) => { if (e.target.tagName === 'SELECT') validateField(e.target); });

  // Recordar qué botón de envío se pulsó (compatibilidad con navegadores sin e.submitter)
  $$('button[type="submit"]', form).forEach((btn) => btn.addEventListener('click', () => { channel = btn.value; }));

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (e.submitter && e.submitter.value) channel = e.submitter.value;

    const fields = $$('input[name], select[name], textarea[name]', form).filter((el) => !el.closest('[hidden]'));
    const results = fields.map(validateField);
    if (results.includes(false)) {
      const firstInvalid = fields.find((el) => el.getAttribute('aria-invalid') === 'true');
      if (firstInvalid) firstInvalid.focus();
      toast('Revisa los campos marcados antes de enviar.', 'warn');
      return;
    }

    const data = Object.fromEntries(new FormData(form).entries());
    Object.keys(data).forEach((k) => { data[k] = String(data[k]).trim(); });
    const message = buildMessage(data);

    let url = '';
    if (channel === 'whatsapp') {
      url = whatsappUrl(message);
      if (!url) return pendingToast('whatsapp');
    } else {
      url = emailUrl(`${FORM_MODES[formMode].title} · ${data.name}`, message.replace(/\*/g, ''));
      if (!url) return pendingToast('email');
    }

    if (channel === 'whatsapp') openExternal(url);
    else window.location.href = url;

    toast(channel === 'whatsapp'
      ? 'Abriendo WhatsApp con tu solicitud. Solo pulsa "Enviar".'
      : 'Abriendo tu aplicación de correo con la solicitud lista.', 'ok');

    form.reset();
    $('#descCount').textContent = '0';
    clearErrors();
    closeModal($('#formModal'));
  });
}

/* =========================================================
   9. FUNCIONES PREMIUM
   ========================================================= */

/* ---------- Contacto VCF (vCard 3.0: Android + iPhone) ---------- */
function vEscape(s) {
  return String(s).replace(/\\/g, '\\\\').replace(/\n/g, '\\n').replace(/,/g, '\\,').replace(/;/g, '\\;');
}

function downloadVCard() {
  const parts = CONFIG.name.trim().split(/\s+/);
  const first = parts.shift() || '';
  const last = parts.join(' ');

  const lines = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `N:${vEscape(last)};${vEscape(first)};;;`,
    `FN:${vEscape(CONFIG.name)}`,
    `TITLE:${vEscape(CONFIG.title)}`
  ];
  if (isSet(CONFIG.company)) lines.push(`ORG:${vEscape(CONFIG.company)}`);
  if (isSet(CONFIG.phone)) lines.push(`TEL;TYPE=CELL,VOICE:${CONFIG.phone.replace(/[^\d+]/g, '')}`);
  if (isSet(CONFIG.whatsapp) && CONFIG.whatsapp.replace(/\D/g, '') !== String(CONFIG.phone).replace(/\D/g, '')) {
    lines.push(`TEL;TYPE=CELL:+${CONFIG.whatsapp.replace(/\D/g, '')}`);
  }
  if (isSet(CONFIG.email)) lines.push(`EMAIL;TYPE=INTERNET,WORK:${CONFIG.email}`);
  if (isSet(CONFIG.website)) lines.push(`URL:${CONFIG.website}`);
  if (isSet(CONFIG.linkedin)) lines.push(`X-SOCIALPROFILE;TYPE=linkedin:${CONFIG.linkedin}`, `URL;TYPE=LinkedIn:${CONFIG.linkedin}`);
  if (isSet(CONFIG.github)) lines.push(`URL;TYPE=GitHub:${CONFIG.github}`);
  if (isSet(CONFIG.location.label)) lines.push(`ADR;TYPE=WORK:;;;${vEscape(CONFIG.location.label)};;;`);
  lines.push(`NOTE:${vEscape(`${CONFIG.title} · ${CONFIG.specialty}`)}`);
  lines.push('END:VCARD');

  const blob = new Blob([lines.join('\r\n') + '\r\n'], { type: 'text/vcard;charset=utf-8' });
  const filename = `${CONFIG.name.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^\w]+/g, '-').replace(/^-|-$/g, '') || 'contacto'}.vcf`;
  downloadBlob(blob, filename);

  if (!isSet(CONFIG.phone) && !isSet(CONFIG.email)) {
    toast('Contacto descargado, pero aún no tiene teléfono ni correo. Complétalos en CONFIG.', 'warn');
  } else {
    toast('Contacto descargado. Ábrelo para guardarlo en tu agenda.', 'ok');
  }
}

/* ---------- Descargar un documento (CV, catálogo PDF) ---------- */
async function downloadDocument(path, filename, pendingKey) {
  if (!isSet(path)) return pendingKey ? pendingToast(pendingKey) : false;

  // En un servidor, comprobamos que el archivo exista antes de descargar
  if (location.protocol.startsWith('http')) {
    try {
      const res = await fetch(path, { method: 'HEAD', cache: 'no-store' });
      if (!res.ok) {
        toast(`No se encontró el archivo "${path}". Verifica la ruta en CONFIG.`, 'warn');
        return true;
      }
    } catch { /* si falla la comprobación (CORS), se intenta igual */ }
  }

  const a = document.createElement('a');
  a.href = path;
  a.download = filename;
  a.target = '_blank';
  a.rel = 'noopener';
  document.body.appendChild(a);
  a.click();
  a.remove();
  toast('Descarga iniciada.', 'ok');
  return true;
}

/* ---------- Catálogo de servicios (PDF propio o generado e imprimible) ---------- */
function openCatalog() {
  if (isSet(CONFIG.catalog)) return downloadDocument(CONFIG.catalog, 'catalogo-servicios.pdf');

  const w = window.open('', '_blank');
  if (!w) return toast('Permite las ventanas emergentes para generar el catálogo.', 'warn');

  const contact = [
    isSet(CONFIG.phone) && `Teléfono: ${esc(CONFIG.phone)}`,
    isSet(CONFIG.whatsapp) && `WhatsApp: +${esc(CONFIG.whatsapp.replace(/\D/g, ''))}`,
    isSet(CONFIG.email) && `Correo: ${esc(CONFIG.email)}`,
    isSet(CONFIG.website) && `Web: ${esc(CONFIG.website)}`,
    isSet(CONFIG.location.label) && `Ubicación: ${esc(CONFIG.location.label)}`
  ].filter(Boolean).join(' &nbsp;·&nbsp; ');

  w.document.write(`<!doctype html><html lang="es"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Catálogo de servicios · ${esc(CONFIG.name)}</title>
<style>
  *{box-sizing:border-box} body{margin:0;font-family:Inter,system-ui,sans-serif;color:#0B1730;background:#fff}
  .page{max-width:820px;margin:0 auto;padding:40px 32px}
  header{border-bottom:3px solid #0A66E8;padding-bottom:18px;margin-bottom:26px}
  .kicker{font:600 11px/1 ui-monospace,Consolas,monospace;letter-spacing:.18em;text-transform:uppercase;color:#0891B2}
  h1{margin:8px 0 4px;font-size:30px} .sub{color:#4F6180;margin:0}
  .grid{display:grid;grid-template-columns:1fr 1fr;gap:14px}
  .item{border:1px solid #D8E2F0;border-radius:12px;padding:16px;break-inside:avoid}
  .item h2{margin:0 0 6px;font-size:16px;color:#0A66E8} .item p{margin:0;font-size:13.5px;color:#334;line-height:1.5}
  footer{margin-top:28px;padding-top:16px;border-top:1px solid #D8E2F0;font-size:13px;color:#4F6180}
  .actions{position:sticky;top:0;background:#0B1730;padding:10px;text-align:center}
  .actions button{font:600 14px Inter,sans-serif;padding:10px 18px;border-radius:10px;border:0;background:#2F8CFF;color:#fff;cursor:pointer}
  @media (max-width:600px){.grid{grid-template-columns:1fr}.page{padding:24px 18px}}
  @media print{.actions{display:none}.page{padding:0}}
</style></head><body>
<div class="actions"><button onclick="window.print()">Imprimir / Guardar como PDF</button></div>
<div class="page">
  <header>
    <div class="kicker">Catálogo de servicios</div>
    <h1>${esc(CONFIG.name)}</h1>
    <p class="sub">${esc(CONFIG.title)} · ${esc(CONFIG.specialty)}</p>
  </header>
  <div class="grid">
    ${CONFIG.services.map((s) => `<div class="item"><h2>${esc(s.name)}</h2><p>${esc(s.description)}</p></div>`).join('')}
  </div>
  <footer>${contact || 'Datos de contacto pendientes de configurar.'}<br>Tarjeta digital: ${esc(cardUrl())}</footer>
</div>
<script>window.addEventListener('load',function(){setTimeout(function(){window.print()},400)});<\/script>
</body></html>`);
  w.document.close();
}

/* ---------- Compartir (Web Share API) ---------- */
async function shareCard() {
  const data = { title: `${CONFIG.name} · ${CONFIG.title}`, text: `${CONFIG.name} — ${CONFIG.title}. ${CONFIG.specialty}`, url: cardUrl() };
  if (navigator.share) {
    try {
      await navigator.share(data);
      return;
    } catch (err) {
      if (err && err.name === 'AbortError') return; // el usuario canceló
    }
  }
  // Alternativa: copiar el enlace
  const ok = await copyText(data.url);
  toast(ok ? 'Tu navegador no permite compartir directamente: enlace copiado.' : 'No se pudo compartir ni copiar el enlace.', ok ? 'ok' : 'warn');
}

async function copyLink() {
  const ok = await copyText(cardUrl());
  toast(ok ? 'Enlace de la tarjeta copiado.' : 'No se pudo copiar el enlace.', ok ? 'ok' : 'warn');
}

/* ---------- Código QR ---------- */
function openQR() {
  const box = $('#qrBox');
  const url = cardUrl();
  box.innerHTML = '';
  $('#qrUrl').textContent = url;

  const warn = $('#qrWarning');
  if (!isSet(CONFIG.cardUrl) && isLocal()) {
    warn.textContent = 'Estás viendo la tarjeta en local: este QR solo funcionará en este equipo. Publícala y define CONFIG.cardUrl.';
    warn.hidden = false;
  } else {
    warn.hidden = true;
  }

  if (typeof window.QRCode !== 'function') {
    box.innerHTML = '<p class="empty-state" style="color:#334">No se pudo cargar el generador de QR. Revisa tu conexión.</p>';
  } else {
    new window.QRCode(box, {
      text: url,
      width: 440,
      height: 440,
      colorDark: '#080E1C',
      colorLight: '#FFFFFF',
      correctLevel: window.QRCode.CorrectLevel.M
    });
    // qrcodejs añade un atributo title con la URL; lo quitamos para no duplicar
    box.removeAttribute('title');
  }
  openModal($('#qrModal'));
}

function downloadQR() {
  const canvas = $('#qrBox canvas');
  const img = $('#qrBox img');
  const src = canvas ? canvas.toDataURL('image/png') : img && img.src;
  if (!src) return toast('El código QR aún no está disponible.', 'warn');

  // Se añade un margen blanco para que sea fácil de escanear impreso
  const image = new Image();
  image.onload = () => {
    const pad = 40;
    const c = document.createElement('canvas');
    c.width = image.width + pad * 2;
    c.height = image.height + pad * 2;
    const ctx = c.getContext('2d');
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, c.width, c.height);
    ctx.drawImage(image, pad, pad);
    c.toBlob((blob) => {
      if (blob) downloadBlob(blob, 'tarjeta-digital-qr.png');
      toast('Código QR descargado.', 'ok');
    }, 'image/png');
  };
  image.src = src;
}

/* =========================================================
   10. TEMA Y PARTÍCULAS
   ========================================================= */
function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  const meta = $('meta[name="theme-color"]');
  if (meta) meta.content = theme === 'light' ? '#EEF3FA' : '#080E1C';
  $('#themeToggle').setAttribute('aria-label', theme === 'light' ? 'Cambiar a modo oscuro' : 'Cambiar a modo claro');
}

function toggleTheme() {
  const next = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
  applyTheme(next);
  store.set('card.theme', next);
  particles.recolor();
}

/** Fondo de partículas conectadas, ligero y pausable */
const particles = (() => {
  const canvas = $('#particles');
  const ctx = canvas.getContext('2d');
  let points = [];
  let raf = 0;
  let running = false;
  let color = '120, 190, 255';
  const dpr = Math.min(window.devicePixelRatio || 1, 2);

  function recolor() {
    color = document.documentElement.getAttribute('data-theme') === 'light' ? '10, 102, 232' : '120, 190, 255';
  }

  function resize() {
    canvas.width = innerWidth * dpr;
    canvas.height = innerHeight * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const count = Math.min(60, Math.round((innerWidth * innerHeight) / 22000));
    points = Array.from({ length: count }, () => ({
      x: Math.random() * innerWidth,
      y: Math.random() * innerHeight,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      r: Math.random() * 1.4 + 0.5
    }));
  }

  function frame() {
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    const max = 120;
    for (let i = 0; i < points.length; i++) {
      const p = points[i];
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > innerWidth) p.vx *= -1;
      if (p.y < 0 || p.y > innerHeight) p.vy *= -1;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${color}, .55)`;
      ctx.fill();

      for (let j = i + 1; j < points.length; j++) {
        const q = points[j];
        const d = Math.hypot(p.x - q.x, p.y - q.y);
        if (d < max) {
          ctx.strokeStyle = `rgba(${color}, ${0.14 * (1 - d / max)})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          ctx.stroke();
        }
      }
    }
    raf = requestAnimationFrame(frame);
  }

  function start() {
    if (running || prefersReducedMotion.matches) return;
    running = true;
    recolor();
    resize();
    canvas.classList.remove('is-off');
    raf = requestAnimationFrame(frame);
  }

  function stop() {
    running = false;
    cancelAnimationFrame(raf);
    canvas.classList.add('is-off');
  }

  let resizeTimer = 0;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => { if (running) resize(); }, 200);
  });

  // Pausar cuando la pestaña no está visible (ahorro de batería)
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) cancelAnimationFrame(raf);
    else if (running) raf = requestAnimationFrame(frame);
  });

  return { start, stop, recolor, get running() { return running; } };
})();

function setParticles(on) {
  const btn = $('#particlesToggle');
  if (on) particles.start(); else particles.stop();
  btn.setAttribute('aria-pressed', String(particles.running));
  store.set('card.particles', on ? 'on' : 'off');
}

/* =========================================================
   11. INTERACCIONES GENERALES
   ========================================================= */
const ACTIONS = {
  vcard: downloadVCard,
  cv: () => downloadDocument(CONFIG.cv, 'CV.pdf', 'cv'),
  catalog: openCatalog,
  share: shareCard,
  copy: copyLink,
  qr: openQR,
  'qr-download': downloadQR,
  theme: toggleTheme,
  particles: () => {
    if (prefersReducedMotion.matches) return toast('Las partículas están desactivadas porque tu sistema prefiere reducir el movimiento.');
    setParticles(!particles.running);
  },
  quote: () => openForm('quote'),
  hire: () => openForm('hire'),
  meeting: () => (isSet(CONFIG.meetingUrl) ? openExternal(CONFIG.meetingUrl) : openForm('meeting')),
  experience: () => openInfo('experience'),
  technologies: () => openInfo('technologies'),
  certifications: () => openInfo('certifications'),
  'service-info': (el) => {
    const s = CONFIG.services[Number(el.dataset.index)];
    if (!s) return;
    const url = whatsappUrl(`Hola, me gustaría recibir información sobre el servicio de *${s.name}*.`);
    if (url) openExternal(url);
    else openForm('hire', s.name); // sin WhatsApp: formulario con el servicio preseleccionado
  },
  top: () => window.scrollTo({ top: 0, behavior: prefersReducedMotion.matches ? 'auto' : 'smooth' })
};

function initDelegation() {
  document.addEventListener('click', (e) => {
    // Enlaces sin configurar
    const pending = e.target.closest('[data-pending]');
    if (pending) {
      e.preventDefault();
      pendingToast(pending.dataset.pending);
      return;
    }
    // Acciones internas
    const actionEl = e.target.closest('[data-action]');
    if (actionEl && ACTIONS[actionEl.dataset.action]) {
      e.preventDefault();
      ACTIONS[actionEl.dataset.action](actionEl);
    }
  });
}

/** Iluminación que sigue al cursor sobre tarjetas y botones */
function initPointerGlow() {
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  document.addEventListener('pointermove', (e) => {
    const el = e.target.closest('.glow-card');
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - r.left}px`);
    el.style.setProperty('--my', `${e.clientY - r.top}px`);
  }, { passive: true });
}

/** Aparición de secciones al hacer scroll */
function initReveal() {
  const items = $$('.reveal');
  if (!('IntersectionObserver' in window) || prefersReducedMotion.matches) {
    items.forEach((el) => el.classList.add('is-visible'));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
  items.forEach((el) => io.observe(el));
}

/** Botones flotantes: aparecen tras desplazarse */
function initFloating() {
  const top = $('.fab-top');
  const wa = $('.fab-wa');
  const update = () => {
    const y = window.scrollY;
    top.classList.toggle('is-hidden', y < 600);
    wa.classList.toggle('is-hidden', y < 280);
  };
  update();
  window.addEventListener('scroll', update, { passive: true });
}

/** Aviso de campos pendientes (solo al ver la tarjeta en local) */
function reportPending() {
  const pending = ['phone', 'whatsapp', 'email', 'linkedin', 'github', 'portfolio', 'website', 'cv', 'cardUrl']
    .filter((k) => !isSet(CONFIG[k]));
  if (!isSet(CONFIG.location.label)) pending.push('location.label');
  const examples = CONFIG.name === 'Nombre Apellido';
  if (!pending.length && !examples) return;

  console.info('[Tarjeta digital] Campos pendientes en CONFIG:', pending.join(', ') || '—');
  if (!isLocal() || store.get('card.hideBanner') === '1') return;

  const banner = document.createElement('div');
  banner.className = 'config-banner';
  banner.innerHTML = `<div>
      <i data-lucide="wrench"></i>
      <span>Modo configuración: ${examples ? 'hay datos de ejemplo y ' : ''}${pending.length} campo(s) pendiente(s) en
      <code>CONFIG</code> (script.js): <code>${pending.map(esc).join(', ')}</code>. Este aviso solo se ve en local.</span>
      <button type="button" aria-label="Ocultar aviso"><i data-lucide="x"></i></button>
    </div>`;
  $('.topbar').after(banner);
  $('button', banner).addEventListener('click', () => { banner.remove(); store.set('card.hideBanner', '1'); });
}

/* =========================================================
   12. INICIO
   ========================================================= */
function init() {
  renderProfile();
  renderExplore();
  renderServices();
  renderFormOptions();
  bindLinks();
  paintWhatsAppIcons();
  reportPending();
  refreshIcons();

  applyTheme(document.documentElement.getAttribute('data-theme') || 'dark');
  initModals();
  initForm();
  initDelegation();
  initPointerGlow();
  initReveal();
  initFloating();

  // Partículas: activas por defecto salvo preferencia guardada o movimiento reducido
  // (no se guarda nada aquí: solo se respeta la preferencia existente)
  const wantsParticles = store.get('card.particles') !== 'off';
  if (wantsParticles && !prefersReducedMotion.matches) particles.start();
  else particles.stop();
  $('#particlesToggle').setAttribute('aria-pressed', String(particles.running));
  prefersReducedMotion.addEventListener?.('change', (e) => {
    if (e.matches) particles.stop();
    $('#particlesToggle').setAttribute('aria-pressed', String(particles.running));
  });
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
else init();

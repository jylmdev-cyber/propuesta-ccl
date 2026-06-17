// Variables globales compartidas
let currentLanguage = localStorage.getItem("ccl_lang") || "es";
let currentTheme = localStorage.getItem("ccl_theme") || "light";

// Lucide Icon SVGs
const ICONS = {
  cart: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>`,
  trash: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>`,
  edit: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>`,
  eye: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 0 0 .696 10.75 10.75 0 0 1-19.876 0z"/><circle cx="12" cy="12" r="3"/></svg>`,
  plus: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>`,
  home: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
  box: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.29 7 12 12 20.71 7"/><line x1="12" x2="12" y1="22" y2="12"/></svg>`,
  fileText: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/></svg>`,
  settings: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.5 1z"/></svg>`,
  logOut: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>`,
  externalLink: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" x2="21" y1="14" y2="3"/></svg>`,
  user: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
  phone: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>`,
  mail: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>`,
  mapPin: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>`,
  clock: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
  search: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" x2="16.65" y1="21" y2="16.65"/></svg>`
};

// Traducciones ES/EN
const TRANSLATIONS = {
  es: {
    nav_home: "Inicio",
    nav_products: "Productos",
    nav_contact: "Contacto",
    btn_request_quote: "Solicitar Cotización",
    btn_admin: "Panel Admin",
    hero_tagline: "Industria Metalmecánica",
    hero_title: "Soluciones de cribado diseñadas para <span>operaciones exigentes</span>",
    hero_desc: "Fabricamos mallas de acero, paneles de poliuretano y componentes para procesos de trituración, clasificación y selección de materiales.",
    btn_explore_prod: "Explorar Productos",
    btn_download_cat: "Descargar Catálogo",
    ind_custom: "Fabricación personalizada",
    ind_custom_desc: "Planos y medidas exactas",
    ind_tech: "Atención técnica",
    ind_tech_desc: "Soporte en planta",
    ind_mining: "Industria minera",
    ind_mining_desc: "Soportamos alto impacto",
    ind_shipping: "Envíos nacionales",
    ind_shipping_desc: "Despacho a todo el Perú",
    title_products: "Nuestros Productos",
    subtitle_products: "Fabricamos soluciones de alta resistencia y durabilidad para zarandas mineras e industriales.",
    title_solutions: "Soluciones por Industria",
    subtitle_solutions: "Adaptamos nuestras cribas para optimizar los procesos de clasificación en distintos sectores.",
    title_advantages: "Ventajas Competitivas",
    subtitle_advantages: "Por qué las principales empresas de minería y agregados eligen a CCL Mallas.",
    title_process: "Nuestro Proceso de Atención",
    subtitle_process: "Garantizamos un servicio técnico ágil, desde el diseño en plano hasta la entrega en obra.",
    title_calc: "Calculadora de Área Abierta",
    subtitle_calc: "Evalúa el rendimiento de tus mallas calculando el porcentaje de área de paso efectiva.",
    title_cases: "Casos de Éxito y Proyectos",
    subtitle_cases: "Explora proyectos reales donde nuestras mallas optimizaron la clasificación de materiales.",
    title_hseq: "Seguridad, Calidad y Medio Ambiente",
    subtitle_hseq: "Operamos bajo altos estándares internacionales para el beneficio de nuestros clientes y trabajadores.",
    calc_opening_type: "Tipo de Abertura",
    calc_square: "Abertura Cuadrada",
    calc_rect: "Abertura Rectangular (Slot)",
    calc_opening_width: "Ancho de Abertura (A) *",
    calc_wire_diameter: "Diámetro de Alambre (D) *",
    calc_units: "Unidad de Medida",
    calc_result: "Resultado del Análisis",
    calc_open_area_percent: "Área Abierta Estimada",
    calc_production: "Nivel de Producción Esperado",
    calc_resistance: "Nivel de Resistencia Estructural",
    calc_recommended: "Producto CCL Recomendado",
    calc_btn: "Calcular Área Abierta",
    step1_title: "1. Envío del Requerimiento",
    step1_desc: "El cliente indica equipo, medidas y condiciones.",
    step2_title: "2. Evaluación Técnica",
    step2_desc: "El equipo analiza abertura y diámetro de alambre.",
    step3_title: "3. Propuesta y Cotización",
    step3_desc: "Se genera la cotización con ficha técnica.",
    step4_title: "4. Fabricación",
    step4_desc: "Producción bajo control de calidad OHSAS 18001.",
    step5_title: "5. Entrega y Seguimiento",
    step5_desc: "Despacho nacional y soporte post-venta.",
    cta_title: "¿Necesita una malla diseñada para sus condiciones de operación?",
    cta_desc: "Nuestro equipo técnico está listo para cotizar y asesorarle sin compromiso.",
    btn_quote_now: "Cotizar ahora",
    btn_talk_expert: "Hablar con un especialista",
    btn_send_blueprint: "Enviar plano técnico"
  },
  en: {
    nav_home: "Home",
    nav_products: "Products",
    nav_contact: "Contact Us",
    btn_request_quote: "Request Quote",
    btn_admin: "Admin CMS",
    hero_tagline: "Metalworking Industry",
    hero_title: "Screening solutions designed for <span>demanding operations</span>",
    hero_desc: "We manufacture steel wire meshes, polyurethane panels, and components for material crushing, classification, and screening.",
    btn_explore_prod: "Explore Products",
    btn_download_cat: "Download Catalog",
    ind_custom: "Custom Manufacturing",
    ind_custom_desc: "Exact blueprints and sizes",
    ind_tech: "Technical Attention",
    ind_tech_desc: "On-site plant support",
    ind_mining: "Mining Industry",
    ind_mining_desc: "Built for high impact",
    ind_shipping: "National Shipping",
    ind_shipping_desc: "Delivery all over Peru",
    title_products: "Our Products",
    subtitle_products: "We manufacture high-strength and long-lasting screening solutions for mining and industrial decks.",
    title_solutions: "Solutions by Industry",
    subtitle_solutions: "We adapt our screens to optimize sizing processes in various industrial sectors.",
    title_advantages: "Competitive Advantages",
    subtitle_advantages: "Why leading mining and aggregate companies choose CCL Wire Meshes.",
    title_process: "Our Service Process",
    subtitle_process: "We guarantee an agile technical service, from blueprint design to delivery on site.",
    title_calc: "Open Area Calculator",
    subtitle_calc: "Evaluate your screen performance by calculating the percentage of effective open passage area.",
    title_cases: "Success Cases & Projects",
    subtitle_cases: "Explore real projects where our screens optimized material classification.",
    title_hseq: "Quality, Safety, and Environment",
    subtitle_hseq: "We operate under high international standards for the benefit of our clients and workers.",
    calc_opening_type: "Opening Type",
    calc_square: "Square Opening",
    calc_rect: "Rectangular Opening (Slot)",
    calc_opening_width: "Opening Width (A) *",
    calc_wire_diameter: "Wire Diameter (D) *",
    calc_units: "Unit of Measurement",
    calc_result: "Analysis Results",
    calc_open_area_percent: "Estimated Open Area",
    calc_production: "Expected Production Level",
    calc_resistance: "Structural Resistance Level",
    calc_recommended: "Recommended CCL Product",
    calc_btn: "Calculate Open Area",
    step1_title: "1. Requirement Submission",
    step1_desc: "Client specifies screen model, dimensions, and conditions.",
    step2_title: "2. Technical Evaluation",
    step2_desc: "Our engineering team analyzes apertures and wire diameter.",
    step3_title: "3. Quote Proposal",
    step3_desc: "We generate a detailed economic quote and technical datasheet.",
    step4_title: "4. Manufacturing",
    step4_desc: "Production under OHSAS 18001 quality controls.",
    step5_title: "5. Delivery & Follow-up",
    step5_desc: "Nationwide dispatch with permanent technical support.",
    cta_title: "Need a screen mesh designed for your exact operating conditions?",
    cta_desc: "Our technical team is ready to analyze and quote your project without obligation.",
    btn_quote_now: "Quote now",
    btn_talk_expert: "Talk with an expert",
    btn_send_blueprint: "Send blueprint file"
  }
};

// Inicialización de Tema Claro/Oscuro
function initTheme() {
  const toggleBtn = document.getElementById("toggle-theme");
  if (currentTheme === "dark") {
    document.body.classList.add("dark-theme");
    if (toggleBtn) toggleBtn.innerText = "☀ Claro";
  } else {
    document.body.classList.remove("dark-theme");
    if (toggleBtn) toggleBtn.innerText = "🌙 Oscuro";
  }
}

function toggleTheme() {
  currentTheme = currentTheme === "light" ? "dark" : "light";
  localStorage.setItem("ccl_theme", currentTheme);
  initTheme();
}

// Inicialización de Idioma
function initLanguage() {
  const toggleBtn = document.getElementById("toggle-language");
  if (toggleBtn) {
    toggleBtn.innerText = currentLanguage === "es" ? "🌐 EN" : "🌐 ES";
  }

  // Traducir todos los nodos data-translate
  document.querySelectorAll("[data-translate]").forEach(el => {
    const key = el.getAttribute("data-translate");
    if (TRANSLATIONS[currentLanguage][key]) {
      if (TRANSLATIONS[currentLanguage][key].includes("<span")) {
        el.innerHTML = TRANSLATIONS[currentLanguage][key];
      } else {
        el.innerText = TRANSLATIONS[currentLanguage][key];
      }
    }
  });

  // Traducir placeholders
  document.querySelectorAll("[data-translate-placeholder]").forEach(input => {
    const key = input.getAttribute("data-translate-placeholder");
    if (TRANSLATIONS[currentLanguage][key]) {
      input.placeholder = TRANSLATIONS[currentLanguage][key];
    }
  });
}

function switchLanguage(lang) {
  currentLanguage = lang;
  localStorage.setItem("ccl_lang", lang);
  location.reload(); // Recarga para aplicar traducciones en cascada en las páginas
}

// Actualizar datos de contacto en el Footer de cualquier página
function updateContactDOM() {
  const info = getContactInfo();
  
  // Footer
  const footerAddress = document.getElementById("footer-address");
  const footerPhone = document.getElementById("footer-phone");
  const footerEmail = document.getElementById("footer-email");
  const footerHours = document.getElementById("footer-hours");

  if (footerAddress) footerAddress.innerText = info.address;
  if (footerPhone) footerPhone.innerText = `${info.phone} / ${info.landline}`;
  if (footerEmail) footerEmail.innerText = info.email;
  if (footerHours) footerHours.innerText = currentLanguage === "es" ? info.hours : info.hoursEn || info.hours;

  // Contact Page (si existe)
  const contactAddress = document.getElementById("contact-address");
  const contactPhone = document.getElementById("contact-phone");
  const contactLandline = document.getElementById("contact-landline");
  const contactEmail = document.getElementById("contact-email");
  const contactHours = document.getElementById("contact-hours");

  if (contactAddress) contactAddress.innerText = info.address;
  if (contactPhone) contactPhone.innerText = info.phone;
  if (contactLandline) contactLandline.innerText = info.landline;
  if (contactEmail) contactEmail.innerText = info.email;
  if (contactHours) contactHours.innerText = currentLanguage === "es" ? info.hours : info.hoursEn || info.hours;
}

// Inicialización de Iconos SVG
function initializeIcons() {
  document.querySelectorAll("[data-icon]").forEach(el => {
    const iconName = el.getAttribute("data-icon");
    if (ICONS[iconName]) {
      el.innerHTML = ICONS[iconName];
    }
  });
}

// Toast Notifications
function showToast(message, type = "success") {
  let toast = document.getElementById("toast-notification");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "toast-notification";
    toast.className = "toast";
    document.body.appendChild(toast);
  }
  toast.innerHTML = `<span>${message}</span>`;
  toast.className = `toast show ${type}`;
  setTimeout(() => {
    toast.classList.remove("show");
  }, 4000);
}

// Al cargar cualquier HTML
document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initLanguage();
  updateContactDOM();
  initializeIcons();

  // Scroll Header
  window.addEventListener("scroll", () => {
    const header = document.querySelector("header");
    if (header) {
      if (window.scrollY > 50) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    }
  });

  // Toggles Event Listeners
  const btnLang = document.getElementById("toggle-language");
  if (btnLang) {
    btnLang.addEventListener("click", () => {
      const nextLang = currentLanguage === "es" ? "en" : "es";
      switchLanguage(nextLang);
    });
  }

  const btnTheme = document.getElementById("toggle-theme");
  if (btnTheme) {
    btnTheme.addEventListener("click", () => {
      toggleTheme();
    });
  }
});

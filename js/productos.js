// Lógica específica para productos.html (Catálogo y Calculadora)

function renderPublicProducts() {
  const products = getProducts();
  const searchInput = document.getElementById("search-products");
  const query = searchInput ? searchInput.value.toLowerCase().trim() : "";

  const activeTab = document.querySelector(".filter-tab.active");
  const filterCat = activeTab ? activeTab.getAttribute("data-filter") : "all";

  const container = document.getElementById("products-catalog-grid");
  if (!container) return;

  container.innerHTML = "";

  const filtered = products.filter(p => {
    const matchesCategory = filterCat === "all" || p.category === filterCat;
    const nameStr = currentLanguage === "es" ? p.name : p.nameEn || p.name;
    const descStr = currentLanguage === "es" ? p.description : p.descriptionEn || p.description;
    
    const matchesSearch = nameStr.toLowerCase().includes(query) || 
                          descStr.toLowerCase().includes(query) || 
                          p.material.toLowerCase().includes(query);
    
    return matchesCategory && matchesSearch;
  });

  if (filtered.length === 0) {
    container.innerHTML = `<div style="grid-column: 1/-1; text-align: center; color: var(--text-muted); padding: 3rem;">No se encontraron productos.</div>`;
    return;
  }

  filtered.forEach(p => {
    const card = document.createElement("div");
    card.className = "product-card";
    
    const name = currentLanguage === "es" ? p.name : p.nameEn || p.name;
    const desc = currentLanguage === "es" ? p.description : p.descriptionEn || p.description;
    const mat = currentLanguage === "es" ? p.material : p.materialEn || p.material;
    const ap = currentLanguage === "es" ? p.aperture : p.apertureEn || p.aperture;
    const dia = currentLanguage === "es" ? p.wireDiameter : p.wireDiameterEn || p.wireDiameter;

    card.innerHTML = `
      <div class="product-card-image">
        <img src="${p.image}" alt="${name}">
        <span class="product-card-category">${p.categoryName}</span>
      </div>
      <div class="product-card-info">
        <h3 class="product-card-title">${name}</h3>
        <p class="product-card-desc">${desc}</p>
        <div class="product-card-specs">
          <div class="spec-item"><span class="spec-label">Material:</span><span class="spec-value">${mat}</span></div>
          <div class="spec-item"><span class="spec-label">Abertura:</span><span class="spec-value">${ap}</span></div>
          ${dia !== "N/A" ? `<div class="spec-item"><span class="spec-label">Espesor/Alambre:</span><span class="spec-value">${dia}</span></div>` : ""}
        </div>
        <div class="product-card-actions">
          <button class="btn btn-outline btn-ficha-descarga" style="padding:0.5rem;">Ficha Técnica</button>
          <a href="cotizar.html?cat=${p.category}" class="btn btn-secondary" style="padding:0.5rem; text-align:center;">Cotizar</a>
        </div>
      </div>
    `;

    // Bind Ficha Técnica button to open modal
    card.querySelector(".btn-ficha-descarga").addEventListener("click", () => {
      openTechnicalSheetModal(p);
    });

    container.appendChild(card);
  });
}

function incrementLibraryDownload() {
  const analytics = getAnalytics();
  analytics.pdfDownloads += 1;
  saveAnalytics(analytics);
}

// Modal datasheet operations
function openTechnicalSheetModal(p) {
  const modal = document.getElementById("modal-technical-sheet");
  if (!modal) return;

  const isEs = currentLanguage === "es";
  const name = isEs ? p.name : p.nameEn || p.name;
  const desc = isEs ? p.description : p.descriptionEn || p.description;
  const mat = isEs ? p.material : p.materialEn || p.material;
  const ap = isEs ? p.aperture : p.apertureEn || p.aperture;
  const dia = isEs ? p.wireDiameter : p.wireDiameterEn || p.wireDiameter;
  const apps = isEs ? p.applications : p.applicationsEn || p.applications;
  const sizes = isEs ? p.sizes : p.sizesEn || p.sizes;

  document.getElementById("modal-techsheet-title").innerText = name;
  document.getElementById("modal-techsheet-category").innerText = p.categoryName;
  document.getElementById("modal-techsheet-material").innerText = mat;
  document.getElementById("modal-techsheet-aperture").innerText = ap;
  document.getElementById("modal-techsheet-diameter").innerText = dia;
  document.getElementById("modal-techsheet-sizes").innerText = sizes;
  document.getElementById("modal-techsheet-desc").innerText = desc;
  document.getElementById("modal-techsheet-applications").innerText = apps;
  
  const blueprintImg = document.getElementById("modal-techsheet-blueprint");
  if (blueprintImg) {
    blueprintImg.src = p.image;
    blueprintImg.alt = name;
  }

  // Setup click for PDF download
  const downloadBtn = document.getElementById("btn-download-pdf-techsheet");
  if (downloadBtn) {
    downloadBtn.onclick = () => {
      showToast(isEs ? `Generando y descargando ficha técnica PDF de "${name}"...` : `Generating and downloading PDF datasheet for "${name}"...`, "success");
      incrementLibraryDownload();
    };
  }

  modal.classList.add("open");
}

function closeTechnicalSheetModal() {
  const modal = document.getElementById("modal-technical-sheet");
  if (modal) {
    modal.classList.remove("open");
  }
}

// Technical Info Tabs Switcher
function switchTechnicalTab(tabId) {
  const textContainer = document.getElementById("tech-detail-text");
  const diagramContainer = document.getElementById("tech-detail-diagram");

  if (!textContainer || !diagramContainer) return;

  let title = "", desc = "", list = [], diagramHtml = "";

  if (tabId === "ondulado") {
    title = "Tipos de Ondulado de Mallas";
    desc = "El tipo de ondulado determina la rigidez transversal y la precisión de la abertura en la clasificación de áridos.";
    list = [
      "<strong>Doble Ondulado:</strong> Alambre ondulado en cada intersección. Máxima estabilidad.",
      "<strong>Cara Plana (Flat Top):</strong> Ondulado inferior que genera una superficie superior lisa. Minimiza la fricción.",
      "<strong>Ondulado Intermedio:</strong> Alambre adicional ondulado entre cruces. Mantiene aberturas anchas estables.",
      "<strong>Ondulado Cerrojo (Lock Crimp):</strong> Curvado con presión en encastres que bloquea el alambre en su posición."
    ];
    diagramHtml = `
      <svg width="240" height="120" viewBox="0 0 240 120" style="font-family: var(--font-body); overflow: visible;">
        <!-- Background Grid -->
        <g stroke="rgba(0, 115, 198, 0.05)" stroke-width="1">
          <line x1="0" y1="20" x2="240" y2="20" />
          <line x1="0" y1="40" x2="240" y2="40" />
          <line x1="0" y1="60" x2="240" y2="60" />
          <line x1="0" y1="80" x2="240" y2="80" />
          <line x1="0" y1="100" x2="240" y2="100" />
          <line x1="40" y1="0" x2="40" y2="120" />
          <line x1="80" y1="0" x2="80" y2="120" />
          <line x1="120" y1="0" x2="120" y2="120" />
          <line x1="160" y1="0" x2="160" y2="120" />
          <line x1="200" y1="0" x2="200" y2="120" />
        </g>
        
        <!-- Double Crimped Wire Wave -->
        <path d="M 10 50 C 25 20, 35 20, 50 50 C 65 80, 75 80, 90 50 C 105 20, 115 20, 130 50 C 145 80, 155 80, 170 50 C 185 20, 195 20, 210 50" 
              fill="none" stroke="var(--primary-blue)" stroke-width="6" stroke-linecap="round" />
              
        <!-- Woven Intersecting Wires (Cross Sections) -->
        <circle cx="50" cy="50" r="7" fill="var(--primary-red)" stroke="#fff" stroke-width="1.5" />
        <circle cx="130" cy="50" r="7" fill="var(--primary-red)" stroke="#fff" stroke-width="1.5" />
        <circle cx="90" cy="50" r="7" fill="rgba(227,6,19,0.3)" stroke="var(--primary-red)" stroke-width="1.5" stroke-dasharray="2,2" />
        <circle cx="170" cy="50" r="7" fill="rgba(227,6,19,0.3)" stroke="var(--primary-red)" stroke-width="1.5" stroke-dasharray="2,2" />
        
        <!-- Annotations -->
        <text x="50" y="32" font-size="8" font-weight="700" fill="var(--primary-red)" text-anchor="middle">Cruces</text>
        <text x="130" y="110" font-size="9" font-weight="600" fill="var(--text-dark)" text-anchor="middle">Ondulación Doble (Precisión)</text>
      </svg>
    `;
  } else if (tabId === "acabados") {
    title = "Acabados Laterales (Ganchos)";
    desc = "Los acabados de tensión lateral o longitudinal garantizan la sujeción uniforme evitando la fatiga de mallas.";
    list = [
      "<strong>Gancho Simple de 45°:</strong> Para tensiones estándar en zarandas pequeñas.",
      "<strong>Gancho Reforzado con Plancha:</strong> Plancha metálica soldada que abraza el gancho de tracción lateral.",
      "<strong>Gancho con Borde de Goma:</strong> Protege la malla frente a roces de vibración lateral.",
      "<strong>Acabado con pestaña soldada:</strong> Para fijación con pernos J directos en vigas."
    ];
    diagramHtml = `
      <svg width="240" height="120" viewBox="0 0 240 120" style="font-family: var(--font-body); overflow: visible;">
        <defs>
          <marker id="arrow-blue-hook" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--primary-blue)" />
          </marker>
        </defs>

        <!-- Screen Plate Edge -->
        <line x1="20" y1="80" x2="150" y2="80" stroke="var(--text-muted)" stroke-width="5" />
        
        <!-- Hook Bend Contour (Reinforced Hook) -->
        <path d="M 150 80 Q 185 80, 185 50 Q 185 25, 160 25 L 140 38" 
              fill="none" stroke="var(--text-dark)" stroke-width="7" stroke-linecap="round" stroke-linejoin="round" />
              
        <!-- Reinforcing Metal Plate Wrapping the Hook -->
        <path d="M 145 80 Q 189 80, 189 50 Q 189 21, 158 21" 
              fill="none" stroke="var(--primary-red)" stroke-width="2" stroke-linejoin="round" />
              
        <!-- Labeling Hook parts -->
        <text x="80" y="98" font-size="9" font-weight="600" fill="var(--text-muted)">Cuerpo de la malla</text>
        <text x="175" y="15" font-size="9" font-weight="700" fill="var(--primary-red)" text-anchor="middle">Plancha de Refuerzo</text>
        <text x="185" y="48" font-size="8" font-weight="600" fill="var(--text-dark)" dx="12">Gancho 45°</text>
        
        <!-- Tension Force Vector -->
        <line x1="170" y1="31" x2="120" y2="5" stroke="var(--primary-blue)" stroke-width="2" marker-end="url(#arrow-blue-hook)" />
        <text x="140" y="-2" font-size="8" font-weight="700" fill="var(--primary-blue)" transform="rotate(-27, 140, -2)">Fuerza de Tensión</text>
      </svg>
    `;
  } else if (tabId === "materiales") {
    title = "Aceros y Aleaciones de Alta Durabilidad";
    desc = "Utilizamos metales de alta pureza diseñados para soportar desgaste abrasivo por rozamiento dinámico y choques por impacto.";
    list = [
      "<strong>Acero SAE 1045:</strong> Acero de medio carbono, excelente ductilidad y tenacidad.",
      "<strong>Acero SAE 1070 Templado:</strong> Acero de alto carbono, alta dureza y máxima resistencia al desgaste.",
      "<strong>Poliuretano Shore A:</strong> Elastómero moldeado de gran elasticidad y efecto autolimpiante.",
      "<strong>Acero Inoxidable AISI 304/316:</strong> Para zarandas que operan en ambientes ácidos o corrosivos."
    ];
    diagramHtml = `
      <svg width="240" height="120" viewBox="0 0 240 120" style="font-family: var(--font-body); overflow: visible; font-size: 8px;">
        <!-- Hardness Chart Title -->
        <text x="10" y="12" font-size="9" font-weight="700" fill="var(--text-dark)">Resistencia al Desgaste Abrasivo</text>
        
        <!-- Bar 1: SAE 1045 -->
        <text x="10" y="32" font-weight="600" fill="var(--text-muted)">SAE 1045</text>
        <rect x="75" y="24" width="70" height="10" rx="2" fill="var(--text-muted)" opacity="0.6" />
        <text x="150" y="31" font-weight="600" fill="var(--text-muted)">350 HB</text>
        
        <!-- Bar 2: SAE 1070 Templado -->
        <text x="10" y="52" font-weight="600" fill="var(--text-dark)">SAE 1070 T</text>
        <rect x="75" y="44" width="115" height="10" rx="2" fill="var(--primary-blue)" />
        <text x="195" y="51" font-weight="700" fill="var(--primary-blue)">500 HB</text>
        
        <!-- Bar 3: Inox AISI 304 -->
        <text x="10" y="72" font-weight="600" fill="var(--text-muted)">AISI 304</text>
        <rect x="75" y="64" width="60" height="10" rx="2" fill="var(--text-muted)" opacity="0.5" />
        <text x="140" y="71" font-weight="600" fill="var(--text-muted)">200 HB</text>
        
        <!-- Bar 4: Poliuretano (Vida útil relativa) -->
        <text x="10" y="92" font-weight="600" fill="var(--primary-red)">Poliuretano</text>
        <rect x="75" y="84" width="145" height="10" rx="2" fill="var(--primary-red)" />
        <text x="225" y="91" font-weight="700" fill="var(--primary-red)">4x Vida</text>
        
        <!-- X Axis -->
        <line x1="75" y1="100" x2="230" y2="100" stroke="var(--border-light)" stroke-width="1" />
        <text x="75" y="109" fill="var(--text-muted)" text-anchor="middle">Baja</text>
        <text x="152" y="109" fill="var(--text-muted)" text-anchor="middle">Media</text>
        <text x="230" y="109" fill="var(--text-muted)" text-anchor="middle">Máxima</text>
      </svg>
    `;
  }

  let listHtml = `<ul style="list-style:none; display:flex; flex-direction:column; gap:0.6rem; margin-top:1rem; font-size:0.9rem;">`;
  list.forEach(li => listHtml += `<li>${li}</li>`);
  listHtml += `</ul>`;

  textContainer.innerHTML = `
    <h3 style="color: var(--text-dark); font-weight:700;">${title}</h3>
    <p style="color: var(--text-muted); font-size: 0.95rem; margin-top: 0.5rem;">${desc}</p>
    ${listHtml}
  `;
  
  diagramContainer.innerHTML = diagramHtml;
}

// Live mesh generator
function drawLiveMeshSVG(valA, valD, type) {
  const svg = document.getElementById("calc-mesh-svg");
  if (!svg) return;

  if (isNaN(valA) || isNaN(valD) || valA <= 0 || valD <= 0) {
    svg.innerHTML = "";
    return;
  }

  const pitchX = valA + valD;
  const slotMultiplier = type === "rect" ? 3 : 1;
  const valAY = valA * slotMultiplier;
  const pitchY = valAY + valD;

  // Scale factor: we want to fit ~2.4 cycles of the horizontal pitch
  const scale = 130 / (pitchX * 2.4);

  const D_scaled = valD * scale;
  const A_scaled = valA * scale;
  const AY_scaled = valAY * scale;
  const pitchX_scaled = pitchX * scale;
  const pitchY_scaled = pitchY * scale;

  const isDark = document.body.classList.contains("dark-theme");
  const wireColor = isDark ? "#4B5563" : "#94A3B8"; // grey steel
  const wireOutline = isDark ? "#1F2937" : "#64748B"; // darker outline

  let html = "";

  // Add SVG definitions (arrow markers)
  html += `
    <defs>
      <marker id="arrow-red" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
        <path d="M 0 0 L 10 5 L 0 10 z" fill="#E30613" />
      </marker>
      <marker id="arrow-blue" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
        <path d="M 0 0 L 10 5 L 0 10 z" fill="#0073C6" />
      </marker>
    </defs>
  `;

  // Draw Highlighted central aperture box
  const rectX = 65 - A_scaled / 2;
  const rectY = 65 - AY_scaled / 2;
  html += `
    <rect x="${rectX}" y="${rectY}" width="${A_scaled}" height="${AY_scaled}" 
          fill="rgba(0, 115, 198, 0.08)" stroke="#0073C6" stroke-width="1.5" stroke-dasharray="3,2" />
  `;

  // Draw vertical wires (vertical lines)
  // Let i range from -3 to 4 to cover all visible parts
  for (let i = -3; i <= 4; i++) {
    const cx_v = 65 + (i - 0.5) * pitchX_scaled;
    if (cx_v >= -30 && cx_v <= 160) {
      // Draw wire body
      html += `
        <line x1="${cx_v}" y1="-10" x2="${cx_v}" y2="140" 
              stroke="${wireColor}" stroke-width="${D_scaled}" stroke-linecap="square" />
      `;
      // Draw wire highlights/borders for 3D look
      if (D_scaled > 3) {
        html += `
          <line x1="${cx_v - D_scaled/2}" y1="-10" x2="${cx_v - D_scaled/2}" y2="140" stroke="${wireOutline}" stroke-width="1" />
          <line x1="${cx_v + D_scaled/2}" y1="-10" x2="${cx_v + D_scaled/2}" y2="140" stroke="${wireOutline}" stroke-width="1" />
          <line x1="${cx_v - D_scaled/4}" y1="-10" x2="${cx_v - D_scaled/4}" y2="140" stroke="rgba(255,255,255,0.25)" stroke-width="1.2" opacity="0.6" />
        `;
      }
    }
  }

  // Draw horizontal wires (horizontal lines)
  for (let j = -3; j <= 4; j++) {
    const cy_h = 65 + (j - 0.5) * pitchY_scaled;
    if (cy_h >= -30 && cy_h <= 160) {
      html += `
        <line x1="-10" y1="${cy_h}" x2="140" y2="${cy_h}" 
              stroke="${wireColor}" stroke-width="${D_scaled}" stroke-linecap="square" />
      `;
      if (D_scaled > 3) {
        html += `
          <line x1="-10" y1="${cy_h - D_scaled/2}" x2="140" y2="${cy_h - D_scaled/2}" stroke="${wireOutline}" stroke-width="1" />
          <line x1="-10" y1="${cy_h + D_scaled/2}" x2="140" y2="${cy_h + D_scaled/2}" stroke="${wireOutline}" stroke-width="1" />
          <line x1="-10" y1="${cy_h - D_scaled/4}" x2="140" y2="${cy_h - D_scaled/4}" stroke="rgba(255,255,255,0.25)" stroke-width="1.2" opacity="0.6" />
        `;
      }
    }
  }

  // Draw measurements
  // Aperture A measurement (horizontal inside central opening)
  if (A_scaled > 15) {
    const arrowY = 65;
    html += `
      <line x1="${rectX + 3}" y1="${arrowY}" x2="${rectX + A_scaled - 3}" y2="${arrowY}" 
            stroke="#E30613" stroke-width="1.5" marker-start="url(#arrow-red)" marker-end="url(#arrow-red)" />
      <rect x="53" y="${arrowY - 8}" width="24" height="13" fill="var(--bg-light)" rx="2" opacity="0.85" />
      <text x="65" y="${arrowY + 2}" font-size="8" font-weight="700" fill="#E30613" text-anchor="middle">A</text>
    `;
  }

  // Wire Diameter D measurement (on the right vertical wire, from its left edge to its right edge)
  const rightWireCenter = 65 + 0.5 * pitchX_scaled;
  const wireLeftEdge = rightWireCenter - D_scaled / 2;
  const wireRightEdge = rightWireCenter + D_scaled / 2;
  
  if (D_scaled > 4) {
    const arrowY_D = rectY - 12;
    html += `
      <line x1="${wireLeftEdge}" y1="${arrowY_D}" x2="${wireRightEdge}" y2="${arrowY_D}" 
            stroke="#0073C6" stroke-width="1.2" marker-start="url(#arrow-blue)" marker-end="url(#arrow-blue)" />
      <text x="${rightWireCenter}" y="${arrowY_D - 4}" font-size="8" font-weight="700" fill="#0073C6" text-anchor="middle">D</text>
    `;
  }

  svg.innerHTML = html;
}

// Calculadora
function runOpenAreaCalculator() {
  const type = document.getElementById("c-type").value;
  const valA = parseFloat(document.getElementById("c-width").value);
  const valD = parseFloat(document.getElementById("c-diameter").value);

  const resText = document.getElementById("calc-res-value");
  const resProd = document.getElementById("calc-res-prod");
  const resRes = document.getElementById("calc-res-res");
  const resProdBar = document.getElementById("calc-res-prod-bar");
  const resRec = document.getElementById("calc-res-rec");

  // Always render the mesh preview (will clear if invalid)
  drawLiveMeshSVG(valA, valD, type);

  if (isNaN(valA) || isNaN(valD) || valA <= 0 || valD <= 0) {
    if (resText) resText.innerText = "0.0%";
    if (resProd) resProd.innerText = "-";
    if (resRes) resRes.innerText = "-";
    if (resProdBar) resProdBar.style.width = "0%";
    if (resRec) resRec.innerText = "-";
    return;
  }

  let areaPercent = 0;
  if (type === "square") {
    areaPercent = (Math.pow(valA, 2) / Math.pow((valA + valD), 2)) * 100;
  } else {
    const slotL = valA * 3;
    areaPercent = ((valA * slotL) / ((valA + valD) * (slotL + valD))) * 100;
  }

  const roundedArea = areaPercent.toFixed(1);
  if (resText) resText.innerText = `${roundedArea}%`;
  if (resProdBar) resProdBar.style.width = `${areaPercent}%`;

  let prodLevel = "", resLevel = "", recommendedProduct = "";
  if (areaPercent > 60) {
    prodLevel = "Extremadamente Alta (Excellent)";
  } else if (areaPercent > 45) {
    prodLevel = "Alta / Estándar (High)";
  } else {
    prodLevel = "Moderada / Cribado Pesado (Medium)";
  }

  const ratio = valD / valA;
  if (ratio > 0.4) {
    resLevel = "Máxima Dureza frente a Impactos (Extreme)";
  } else if (ratio > 0.2) {
    resLevel = "Media / Alta Resistencia (High)";
  } else {
    resLevel = "Baja Resistencia (Optimizado para Finos)";
  }

  if (valA < 2.0) {
    recommendedProduct = "Mallas Autolimpiantes CCL-Flex (Finos Húmedos)";
  } else if (valA >= 2.0 && valA <= 12.0 && type === "square") {
    recommendedProduct = "Paneles Modulares de Poliuretano";
  } else if (type === "rect") {
    recommendedProduct = "Mallas Metálicas Rectangulares";
  } else {
    recommendedProduct = "Mallas Metálicas Cuadradas (Acero SAE 1070)";
  }

  if (resProd) resProd.innerText = prodLevel;
  if (resRes) resRes.innerText = resLevel;
  if (resRec) resRec.innerText = recommendedProduct;
}

// Bind listeners on DOM load
document.addEventListener("DOMContentLoaded", () => {
  renderPublicProducts();
  switchTechnicalTab("ondulado");

  // Search input keyup
  const searchInput = document.getElementById("search-products");
  if (searchInput) {
    searchInput.addEventListener("input", () => renderPublicProducts());
  }

  // Category filter tabs
  document.querySelectorAll(".filter-tab").forEach(tab => {
    tab.addEventListener("click", () => {
      document.querySelectorAll(".filter-tab").forEach(el => el.classList.remove("active"));
      tab.classList.add("active");
      renderPublicProducts();
    });
  });

  // Technical Tabs
  document.querySelectorAll(".tech-tab-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".tech-tab-btn").forEach(el => el.classList.remove("active"));
      btn.classList.add("active");
      switchTechnicalTab(btn.getAttribute("data-tech"));
    });
  });

  // Open Area Calculator
  const calcForm = document.getElementById("form-calculator");
  if (calcForm) {
    calcForm.addEventListener("submit", (e) => {
      e.preventDefault();
      runOpenAreaCalculator();
    });
    calcForm.querySelectorAll("input, select").forEach(input => {
      input.addEventListener("input", () => runOpenAreaCalculator());
    });
  }

  // Modal close listeners (support header close button, footer close button, and clicking outside)
  const closeTriggers = document.querySelectorAll('#modal-technical-sheet .btn-modal-close, #modal-technical-sheet .btn-dark, [id="btn-close-techsheet-modal"]');
  closeTriggers.forEach(btn => {
    btn.addEventListener("click", closeTechnicalSheetModal);
  });

  // Close modal when clicking on the backdrop
  const modal = document.getElementById("modal-technical-sheet");
  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        closeTechnicalSheetModal();
      }
    });
  }
});

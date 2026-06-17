// Sieve Particle Simulation logic for index.html (Home)
let sieveAnimationId = null;

function startSieveAnimation() {
  const canvas = document.getElementById("canvas-sieve-animation");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  
  const resizeCanvas = () => {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  };
  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  const meshLines = [
    { y: canvas.height * 0.45, apertureSize: 18 },
    { y: canvas.height * 0.65, apertureSize: 8 }
  ];

  let particles = [];
  const particleColors = ["#f8fafc", "#e2e8f0", "#cbd5e1", "#94a3b8", "#f97316", "#fbbf24"];

  const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    meshLines[0].y = canvas.height * 0.5;
    meshLines[1].y = canvas.height * 0.72;

    // Draw grid lines
    ctx.lineWidth = 4;
    ctx.strokeStyle = "rgba(0, 115, 198, 0.25)";
    
    ctx.beginPath();
    ctx.setLineDash([25, meshLines[0].apertureSize]);
    ctx.moveTo(canvas.width * 0.45, meshLines[0].y);
    ctx.lineTo(canvas.width * 0.95, meshLines[0].y + 20);
    ctx.stroke();
    
    ctx.lineWidth = 3;
    ctx.strokeStyle = "rgba(227, 6, 19, 0.2)";
    ctx.beginPath();
    ctx.setLineDash([15, meshLines[1].apertureSize]);
    ctx.moveTo(canvas.width * 0.45, meshLines[1].y);
    ctx.lineTo(canvas.width * 0.95, meshLines[1].y + 15);
    ctx.stroke();
    
    ctx.setLineDash([]);

    if (Math.random() < 0.22 && particles.length < 110) {
      particles.push({
        x: canvas.width * (0.48 + Math.random() * 0.25),
        y: -10,
        radius: 3 + Math.random() * 15,
        vy: 1.5 + Math.random() * 2,
        vx: -0.5 + Math.random() * 1,
        color: particleColors[Math.floor(Math.random() * particleColors.length)],
        levelPassed: 0
      });
    }

    particles.forEach((p, index) => {
      p.y += p.vy;
      p.x += p.vx;

      const slope1Factor = (p.x - canvas.width * 0.45) * 0.04;
      const line1Y = meshLines[0].y + slope1Factor;
      
      if (p.levelPassed === 0 && p.y >= line1Y - p.radius && p.y <= line1Y + 10) {
        if (p.radius * 2 < meshLines[0].apertureSize) {
          p.levelPassed = 1;
          p.vy *= 0.85;
        } else {
          p.levelPassed = 3;
          p.vy = 1.0;
          p.vx = 2.4;
        }
      }

      const slope2Factor = (p.x - canvas.width * 0.45) * 0.03;
      const line2Y = meshLines[1].y + slope2Factor;
      if (p.levelPassed === 1 && p.y >= line2Y - p.radius && p.y <= line2Y + 8) {
        if (p.radius * 2 < meshLines[1].apertureSize) {
          p.levelPassed = 2;
        } else {
          p.levelPassed = 3;
          p.vy = 0.9;
          p.vx = 1.8;
        }
      }

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.fill();

      if (p.y > canvas.height + 20 || p.x > canvas.width + 20) {
        particles.splice(index, 1);
      }
    });

    sieveAnimationId = requestAnimationFrame(animate);
  };
  
  animate();
}

function renderSolutionsGrid() {
  const container = document.getElementById("solutions-grid-container");
  if (!container) return;

  const solutions = [
    { title: "Minería", titleEn: "Mining", image: "assets/solutions_mining.png", desc: "Zarandas pesadas para clasificación de mineral grueso y húmedo.", descEn: "Heavy screen decks for coarse and wet mineral classification." },
    { title: "Canteras", titleEn: "Quarries", image: "assets/solutions_quarry.png", desc: "Clasificación de áridos, trituración y selección de gravas.", descEn: "Aggregate classification, crushing, and gravel selection." },
    { title: "Construcción", titleEn: "Construction", image: "assets/solutions_construction.png", desc: "Procesamiento de arenas silíceas y agregados para concreto.", descEn: "Processing of silica sand and aggregate mixtures for concrete." },
    { title: "Agregados", titleEn: "Aggregates", image: "assets/solutions_quarry.png", desc: "Cribado de alta frecuencia en arena y piedra chancada.", descEn: "High-frequency screening of sands and crushed gravels." }
  ];

  container.innerHTML = "";
  solutions.forEach(s => {
    const card = document.createElement("div");
    card.className = "solution-card";
    card.style.background = `linear-gradient(180deg, rgba(15, 19, 32, 0.65) 0%, rgba(7, 9, 14, 0.95) 100%), url('${s.image}') no-repeat center center`;
    card.style.backgroundSize = "cover";
    card.style.minHeight = "240px";
    card.style.justifyContent = "flex-end";
    card.style.alignItems = "flex-start";
    card.style.textAlign = "left";
    card.style.padding = "1.5rem";
    card.style.border = "1px solid var(--border-light)";
    card.style.borderRadius = "var(--radius-md)";
    
    const title = currentLanguage === "es" ? s.title : s.titleEn;
    const desc = currentLanguage === "es" ? s.desc : s.descEn;
    
    card.innerHTML = `
      <div style="width:100%; display:flex; flex-direction:column; gap:8px;">
        <h4 class="solution-title" style="color:#fff; font-size:1.2rem; font-weight:700; text-shadow: 0 2px 4px rgba(0,0,0,0.5);">${title}</h4>
        <p style="font-size:0.75rem; color:var(--text-dark-muted); line-height:1.4;">${desc}</p>
      </div>
    `;
    container.appendChild(card);
  });
}

function renderAdvantagesGrid() {
  const container = document.getElementById("advantages-grid-container");
  if (!container) return;

  const advantages = [
    { title: "Fabricación según requerimiento", titleEn: "Custom-made manufacturing", desc: "Adaptamos aberturas, diámetros de alambre y sistemas de tensión.", descEn: "We adapt apertures, wire diameters, and tensioning systems." },
    { title: "Resistencia a la abrasión e impacto", titleEn: "Abrasion & impact resistance", desc: "Aceros templados SAE 1045/1070 y poliuretanos de alta densidad.", descEn: "SAE 1045/1070 tempered steels and high-density polyurethanes." },
    { title: "Soporte técnico especializado", titleEn: "Specialized technical support", desc: "Ingenieros de aplicaciones con visitas y evaluaciones en planta.", descEn: "Application engineers providing visits and on-site assessments." },
    { title: "Optimización del área abierta", titleEn: "Open area optimization", desc: "Estudiamos la criba para lograr mayor paso y evitar colmataciones.", descEn: "We study screens to maximize passage and avoid blinding." },
    { title: "Sistemas modulares rápidos", titleEn: "Fast modular systems", desc: "Paneles de poliuretano autolimpiantes pin/manga fáciles de instalar.", descEn: "Self-cleaning pin/sleeve polyurethane panels easy to install." },
    { title: "Atención y envíos nacionales", titleEn: "Nationwide service & shipping", desc: "Despachos rápidos directos de planta a proyectos mineros de todo el Perú.", descEn: "Fast shipments direct from plant to mining projects across Peru." }
  ];

  container.innerHTML = "";
  advantages.forEach(a => {
    const title = currentLanguage === "es" ? a.title : a.titleEn;
    const desc = currentLanguage === "es" ? a.desc : a.descEn;
    const item = document.createElement("div");
    item.className = "about-feature-item";
    item.style.display = "flex";
    item.style.gap = "15px";
    item.style.alignItems = "flex-start";
    
    item.innerHTML = `
      <div class="about-feature-icon" style="width:28px; height:28px; border-radius:50%; background:rgba(0,115,198,0.1); color:var(--primary-blue); display:flex; align-items:center; justify-content:center; font-weight:bold; flex-shrink:0; font-size:0.9rem;">✓</div>
      <div>
        <h4 class="about-feature-title" style="color: var(--text-dark); font-weight:700; font-size:1.05rem; margin-bottom:0.25rem;">${title}</h4>
        <p class="about-feature-desc" style="color: var(--text-muted); font-size:0.85rem; line-height:1.4;">${desc}</p>
      </div>
    `;
    container.appendChild(item);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  startSieveAnimation();
  renderSolutionsGrid();
  renderAdvantagesGrid();
});

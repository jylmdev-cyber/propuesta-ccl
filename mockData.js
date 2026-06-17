// Datos Semilla de Productos Ampliados (6 Familias)
const INITIAL_PRODUCTS = [
  {
    id: "prod-1",
    name: "Mallas Metálicas Cuadradas",
    nameEn: "Square Metal Wire Meshes",
    category: "mallas-cuadradas",
    categoryName: "Mallas Cuadradas",
    description: "Mallas de alambre tejidas a doble ondulación en aceros de alto carbono. Diseñadas para cribado primario de mineral grueso, carbón y agregados.",
    descriptionEn: "Double-crimped wire meshes woven in high-carbon steel. Designed for primary screening of coarse ore, coal, and aggregates.",
    material: "Acero de alto carbono (SAE 1045 a SAE 1070)",
    materialEn: "High-carbon steel (SAE 1045 to SAE 1070)",
    aperture: "Desde 4.0 mm hasta 100.0 mm (5/32\" a 4\")",
    apertureEn: "From 4.0 mm to 100.0 mm (5/32\" to 4\")",
    wireDiameter: "Desde 2.0 mm hasta 12.7 mm (1/2\")",
    wireDiameterEn: "From 2.0 mm to 12.7 mm (1/2\")",
    applications: "Clasificación primaria, zarandas de alta frecuencia, cribado de agregados.",
    applicationsEn: "Primary classification, high-frequency screens, aggregate screening.",
    sizes: "Planchas de 1.2m x 2.4m, 1.5m x 2.0m, y dimensiones especiales.",
    sizesEn: "Sheets of 1.2m x 2.4m, 1.5m x 2.0m, and special dimensions.",
    image: "assets/steel_wire_mesh.png",
    featured: true
  },
  {
    id: "prod-2",
    name: "Mallas Metálicas Rectangulares",
    nameEn: "Rectangular Metal Wire Meshes",
    category: "mallas-rectangulares",
    categoryName: "Mallas Rectangulares",
    description: "Mallas tejidas con aberturas rectangulares (estilo slot largo). Maximizan el área abierta de paso y reducen la colmatación de materiales elongados o húmedos.",
    descriptionEn: "Woven meshes with rectangular openings (long-slot style). They maximize open passage area and reduce clogging of elongated or wet materials.",
    material: "Acero SAE 1045 y Acero Inoxidable AISI 304",
    materialEn: "SAE 1045 Steel and AISI 304 Stainless Steel",
    aperture: "Desde 2.0 mm hasta 50.0 mm",
    apertureEn: "From 2.0 mm to 50.0 mm",
    wireDiameter: "Desde 1.6 mm hasta 8.0 mm",
    wireDiameterEn: "From 1.6 mm to 8.0 mm",
    applications: "Cribado intermedio, control de finos, procesamiento de arenas silíceas húmedas.",
    applicationsEn: "Intermediate screening, fines control, processing of wet silica sands.",
    sizes: "Dimensiones de panel según especificación técnica del cliente.",
    sizesEn: "Panel dimensions according to customer technical specifications.",
    image: "assets/steel_wire_mesh.png", // re-use wire mesh for rect
    featured: true
  },
  {
    id: "prod-3",
    name: "Mallas Metálicas en Rollos",
    nameEn: "Metal Wire Meshes in Rolls",
    category: "mallas-rollos",
    categoryName: "Mallas en Rollos",
    description: "Mallas de menor calibre provistas en rollos continuos. Ideales para tamices de laboratorio, cerramientos industriales y filtros medianos.",
    descriptionEn: "Lighter-gauge meshes supplied in continuous rolls. Ideal for laboratory sieves, industrial enclosures, and medium filters.",
    material: "Acero galvanizado, acero negro de bajo carbono e inoxidable",
    materialEn: "Galvanized steel, low-carbon black steel, and stainless steel",
    aperture: "Desde 0.5 mm hasta 10.0 mm",
    apertureEn: "From 0.5 mm to 10.0 mm",
    wireDiameter: "Desde 0.5 mm hasta 2.0 mm",
    wireDiameterEn: "From 0.5 mm to 2.0 mm",
    applications: "Filtros industriales, protección, dosificación y tamizado fino.",
    applicationsEn: "Industrial filters, shielding, sizing, and fine sieving.",
    sizes: "Rollos de 1.0m x 30m, 1.2m x 30m, 1.5m x 30m.",
    sizesEn: "Rolls of 1.0m x 30m, 1.2m x 30m, 1.5m x 30m.",
    image: "assets/steel_wire_mesh.png",
    featured: false
  },
  {
    id: "prod-4",
    name: "Mallas Autolimpiantes CCL-Flex",
    nameEn: "CCL-Flex Self-Cleaning Meshes",
    category: "ccl-flex",
    categoryName: "Sistemas CCL-Flex",
    description: "Tecnología autolimpiante con alambres individuales tensados que vibran independientemente. Elimina el cegado por humedad y arcilla fina.",
    descriptionEn: "Self-cleaning technology with individual tensioned wires vibrating independently. Eliminates blinding from moisture and fine clay.",
    material: "Alambres de acero de alta resistencia y ligas de poliuretano",
    materialEn: "High-tensile steel wires and polyurethane binders",
    aperture: "Desde 1.2 mm hasta 25.0 mm",
    apertureEn: "From 1.2 mm to 25.0 mm",
    wireDiameter: "Desde 1.0 mm hasta 4.0 mm",
    wireDiameterEn: "From 1.0 mm to 4.0 mm",
    applications: "Zarandeo de finos en climas húmedos, clasificación de caliza y mineral pegajoso.",
    applicationsEn: "Fine screening in wet climates, classification of limestone and sticky ore.",
    sizes: "Fabricación a medida con ganchos de tensión lateral o longitudinal.",
    sizesEn: "Custom fabrication with side or longitudinal tension hooks.",
    image: "assets/ccl_flex_screen.png",
    featured: true
  },
  {
    id: "prod-5",
    name: "Paneles Modulares de Poliuretano",
    nameEn: "Polyurethane Modular Panels",
    category: "paneles-poliuretano",
    categoryName: "Paneles de Poliuretano",
    description: "Módulos de poliuretano de alta resistencia al impacto y abrasión. Ofrecen bajo ruido, fácil montaje y excelente rendimiento en cribado húmedo.",
    descriptionEn: "Polyurethane modules with high resistance to impact and abrasion. Offer low noise, easy assembly, and excellent performance in wet screening.",
    material: "Poliuretano elastómero formulado (85 a 95 Shore A)",
    materialEn: "Formulated polyurethane elastomer (85 to 95 Shore A)",
    aperture: "Desde 0.5 mm hasta 120.0 mm",
    apertureEn: "From 0.5 mm to 120.0 mm",
    wireDiameter: "N/A (Espesores de 30mm a 60mm)",
    wireDiameterEn: "N/A (Thicknesses from 30mm to 60mm)",
    applications: "Lavado de mineral, desaguado, cribado secundario y terciario húmedo.",
    applicationsEn: "Ore washing, dewatering, wet secondary and tertiary screening.",
    sizes: "Módulos estándar de 1'x1', 1'x2', sistemas pin y manga, encastre o clip.",
    sizesEn: "Standard 1'x1', 1'x2' modules, pin and sleeve, snap-on, or clip systems.",
    image: "assets/polyurethane_panel.png",
    featured: true
  },
  {
    id: "prod-6",
    name: "Accesorios y Componentes de Fijación",
    nameEn: "Accessories and Fastening Components",
    category: "accesorios",
    categoryName: "Accesorios",
    description: "Kit de repuestos esenciales para la instalación y tensión correcta de las mallas en la zaranda. Prolongan la vida útil de las cribas.",
    descriptionEn: "Essential spare parts kit for proper installation and tensioning of screen meshes. They extend screen wear life.",
    material: "Acero SAE 1020, Goma EPDM, Madera estructurada de alta densidad",
    materialEn: "SAE 1020 Steel, EPDM Rubber, Structurally dense hardwood",
    aperture: "N/A",
    apertureEn: "N/A",
    wireDiameter: "N/A",
    wireDiameterEn: "N/A",
    applications: "Protección de vigas de zarandas, sujeción y tensión lateral de planchas.",
    applicationsEn: "Protection of screen deck beams, clamping and side tensioning of plates.",
    sizes: "Pernos J, pernos T, cuñas de madera de 1m, perfiles protectores omega.",
    sizesEn: "J-bolts, T-bolts, 1m wooden wedges, omega protective profiles.",
    image: "assets/mounting_accessories.png",
    featured: false
  }
];

// Contact configurations
const INITIAL_CONTACT_INFO = {
  phone: "+51 946 198 250",
  landline: "(+51) 548 4544 / 5566022",
  email: "ventas@cclmallas.com",
  address: "Calle 2 N° 228, Lotización Los Naranjitos, Puente Piedra, Lima, Perú",
  hours: "Lunes a Viernes: 8:00 AM - 6:00 PM | Sábados: 8:00 AM - 1:00 PM",
  hoursEn: "Monday to Friday: 8:00 AM - 6:00 PM | Saturdays: 8:00 AM - 1:00 PM",
  facebook: "https://www.facebook.com/p/CCL-Industrias-Mec%C3%A1nicas-SAC-100084659930380/",
  linkedin: "https://www.linkedin.com/company/ccl-mallas",
  whatsapp: "+51946198250",
  googleMaps: "https://maps.google.com/?q=Calle+2+N+228+Puente+Piedra+Lima",
  primaryColor: "#0073C6",
  secondaryColor: "#E30613"
};

// Seed Quotes (6 months history to build charts: Jan to Jun 2026)
const INITIAL_QUOTES = [
  {
    id: "COT-WEB-2026-000124",
    clientName: "Ing. Carlos Mendoza",
    company: "Minera Las Bambas",
    ruc: "20543678912",
    email: "carlos.mendoza@lasbambas.pe",
    phone: "987654321",
    department: "Apurímac",
    productType: "paneles-poliuretano",
    productTypeName: "Paneles de Poliuretano",
    quantity: 45,
    message: "Solicitamos paneles modulares de 1'x1' con encastre tipo pin/manga y aberturas cuadradas de 16mm para desaguado de cobre.",
    specs: {
      length: "304.8 mm (1')",
      width: "304.8 mm (1')",
      aperture: "16 mm",
      wireDiameter: "N/A",
      crimping: "N/A",
      sideHook: "N/A"
    },
    conditions: {
      material: "Mineral de Cobre Húmedo",
      tph: "450 TPH",
      operation: "Húmeda",
      abrasion: "Extrema"
    },
    attachedFiles: [
      { name: "plano_zaranda_bambas_c3.pdf", size: "1.4 MB" }
    ],
    status: "Nueva",
    date: "2026-06-16T14:30:00Z",
    notes: "Nueva solicitud ingresada desde el cotizador web. Requiere revisión técnica inmediata.",
    commercialResponsible: "Ing. Héctor Vargas"
  },
  {
    id: "COT-WEB-2026-000118",
    clientName: "Sonia Rivas",
    company: "Constructora Graña y Montero",
    ruc: "20100456123",
    email: "srivas@gyma.com",
    phone: "951753852",
    department: "Lima",
    productType: "mallas-cuadradas",
    productTypeName: "Mallas Cuadradas",
    quantity: 15,
    message: "Requerimos mallas cuadradas de acero SAE 1045 tejidas para clasificación de piedra en cantera.",
    specs: {
      length: "2.40 m",
      width: "1.50 m",
      aperture: "12.7 mm (1/2\")",
      wireDiameter: "4.76 mm (3/16\")",
      crimping: "Doble Ondulado",
      sideHook: "Gancho simple 45°"
    },
    conditions: {
      material: "Piedra de río / Grava",
      tph: "180 TPH",
      operation: "Seca",
      abrasion: "Alta"
    },
    attachedFiles: [],
    status: "En revisión",
    date: "2026-06-12T09:15:00Z",
    notes: "Se está evaluando stock de alambre de 3/16 pulgada. Cliente solicita entrega en obra (Puente Piedra).",
    commercialResponsible: "Lic. Ana Obregón"
  },
  {
    id: "COT-WEB-2026-000095",
    clientName: "Juan Falconi",
    company: "Cantera Los Andes S.A.",
    ruc: "20456789123",
    email: "jfalconi@andescorp.pe",
    phone: "963258741",
    department: "Arequipa",
    productType: "ccl-flex",
    productTypeName: "Sistemas CCL-Flex",
    quantity: 8,
    message: "Cotizar mallas autolimpiantes anti-colmatantes para arena húmeda.",
    specs: {
      length: "2.0 m",
      width: "1.20 m",
      aperture: "3.2 mm",
      wireDiameter: "1.6 mm",
      crimping: "FLEX Ondas",
      sideHook: "Gancho reforzado"
    },
    conditions: {
      material: "Arena Silícea Húmeda",
      tph: "120 TPH",
      operation: "Húmeda",
      abrasion: "Media"
    },
    attachedFiles: [
      { name: "especificaciones_zaranda.xlsx", size: "340 KB" }
    ],
    status: "Cotizada",
    date: "2026-05-18T16:22:00Z",
    notes: "Cotización COT-2026-05-884 enviada por $2,450.00 + IGV. Validez hasta 30 días.",
    commercialResponsible: "Ing. Héctor Vargas"
  },
  {
    id: "COT-WEB-2026-000084",
    clientName: "Ing. Luis Alva",
    company: "Minera Yanacocha",
    ruc: "20123456789",
    email: "lalva@yanacocha.com",
    phone: "912345678",
    department: "Cajamarca",
    productType: "paneles-poliuretano",
    productTypeName: "Paneles de Poliuretano",
    quantity: 60,
    message: "Sustitución de paneles modulares desgastados en zaranda de desaguado.",
    specs: {
      length: "609.6 mm (2')",
      width: "304.8 mm (1')",
      aperture: "8.0 mm",
      wireDiameter: "N/A",
      crimping: "N/A",
      sideHook: "N/A"
    },
    conditions: {
      material: "Relaves cianurados finos",
      tph: "300 TPH",
      operation: "Húmeda",
      abrasion: "Alta"
    },
    attachedFiles: [],
    status: "En negociación",
    date: "2026-05-02T11:05:00Z",
    notes: "Cliente solicita descuento del 5% por volumen. Se derivó a gerencia comercial.",
    commercialResponsible: "Lic. Ana Obregón"
  },
  {
    id: "COT-WEB-2026-000063",
    clientName: "Daniel Kuan",
    company: "Agregados Lima Norte S.A.",
    ruc: "20345678912",
    email: "dkuan@alnsa.pe",
    phone: "987123456",
    department: "Lima",
    productType: "mallas-rectangulares",
    productTypeName: "Mallas Rectangulares",
    quantity: 24,
    message: "Cotización de mallas rectangulares de acero inoxidable AISI 304.",
    specs: {
      length: "1.80 m",
      width: "1.20 m",
      aperture: "5mm x 20mm (Slot)",
      wireDiameter: "2.5 mm",
      crimping: "Doble ondulado plano",
      sideHook: "Gancho soldado"
    },
    conditions: {
      material: "Grava lavada",
      tph: "150 TPH",
      operation: "Húmeda",
      abrasion: "Media"
    },
    attachedFiles: [],
    status: "Aprobada",
    date: "2026-04-14T15:45:00Z",
    notes: "O.C. #4562 recibida. Despacho programado para el 28/04.",
    commercialResponsible: "Ing. Héctor Vargas"
  },
  {
    id: "COT-WEB-2026-000042",
    clientName: "Roberto Arce",
    company: "Cemex Perú S.A.",
    ruc: "20234567891",
    email: "rarce@cemex.com",
    phone: "945612378",
    department: "Lima",
    productType: "accesorios",
    productTypeName: "Accesorios",
    quantity: 100,
    message: "Cuñas de madera y perfiles omega de goma EPDM para fijación de mallas.",
    specs: {
      length: "1.0 m (cuñas)",
      width: "N/A",
      aperture: "N/A",
      wireDiameter: "N/A",
      crimping: "N/A",
      sideHook: "N/A"
    },
    conditions: {
      material: "Caliza gruesa",
      tph: "800 TPH",
      operation: "Seca",
      abrasion: "Extrema"
    },
    attachedFiles: [],
    status: "Cerrada",
    date: "2026-03-20T10:10:00Z",
    notes: "Factura cancelada y materiales despachados a planta Atocongo.",
    commercialResponsible: "Lic. Ana Obregón"
  },
  {
    id: "COT-WEB-2026-000021",
    clientName: "Mariano Ortiz",
    company: "Minera Antamina",
    ruc: "20448855662",
    email: "mortiz@antamina.com",
    phone: "998877665",
    department: "Áncash",
    productType: "mallas-cuadradas",
    productTypeName: "Mallas Cuadradas",
    quantity: 12,
    message: "Mallas especiales tejidas en acero SAE 1070 templado de alta resistencia.",
    specs: {
      length: "2.0 m",
      width: "2.0 m",
      aperture: "75.0 mm (3\")",
      wireDiameter: "12.7 mm (1/2\")",
      crimping: "Cerrojo (Lock-Crimp)",
      sideHook: "Gancho reforzado con plancha"
    },
    conditions: {
      material: "Mineral de Cobre / Zinc pesado",
      tph: "1200 TPH",
      operation: "Seca",
      abrasion: "Extrema"
    },
    attachedFiles: [],
    status: "Rechazada",
    date: "2026-02-10T12:00:00Z",
    notes: "Rechazada debido a plazo de entrega (requerían entrega en 3 días, fábrica requería 12 días).",
    commercialResponsible: "Ing. Héctor Vargas"
  },
  {
    id: "COT-WEB-2026-000010",
    clientName: "Jorge Díaz",
    company: "Constructora Norberto Odebrecht",
    ruc: "20159487623",
    email: "jdiaz@odebrecht.com.pe",
    phone: "915623487",
    department: "Loreto",
    productType: "mallas-rollos",
    productTypeName: "Mallas en Rollos",
    quantity: 10,
    message: "Rollos de malla de acero galvanizado calibre fino para filtro de arena gruesa.",
    specs: {
      length: "30.0 m",
      width: "1.20 m",
      aperture: "2.0 mm",
      wireDiameter: "0.8 mm",
      crimping: "Simple ondulado",
      sideHook: "N/A"
    },
    conditions: {
      material: "Arena de río",
      tph: "50 TPH",
      operation: "Húmeda",
      abrasion: "Baja"
    },
    attachedFiles: [],
    status: "Cerrada",
    date: "2026-01-25T14:00:00Z",
    notes: "Completada. Despacho vía barcaza a obra Iquitos.",
    commercialResponsible: "Lic. Ana Obregón"
  }
];

// Historical statistics for CMS analytics (Jan to Jun 2026)
const INITIAL_ANALYTICS = {
  monthlyQuotes: {
    labels: ["Ene", "Feb", "Mar", "Abr", "May", "Jun"],
    values: [5, 8, 12, 18, 22, 28] // trend of inquiries
  },
  conversionFunnel: {
    labels: ["Visitas", "Búsquedas", "Cotizador", "Enviados", "Aprobados"],
    values: [2500, 1800, 450, 95, 34]
  },
  topProducts: [
    { name: "Paneles Modulares de Poliuretano", count: 124, percentage: 38 },
    { name: "Mallas Metálicas Cuadradas", count: 98, percentage: 30 },
    { name: "Mallas Autolimpiantes CCL-Flex", count: 65, percentage: 20 },
    { name: "Accesorios y Componentes", count: 39, percentage: 12 }
  ],
  whatsappClicks: 142,
  pdfDownloads: 88
};

// Seed Cases of Success / Projects
const INITIAL_PROJECTS = [
  {
    id: "proj-1",
    client: "Minera Las Bambas",
    sector: "Minería",
    location: "Apurímac, Perú",
    need: "Desgaste abrasivo severo en zaranda de clasificación secundaria, requiriendo recambios metálicos cada 15 días.",
    solution: "Sustitución de mallas de acero por Paneles Modulares de Poliuretano CCL de 85 Shore A con sistema de encastre clip.",
    productUsed: "Panel Modular de Poliuretano",
    category: "paneles-poliuretano",
    results: "Incremento de la vida útil de 15 días a 6 meses de operación ininterrumpida. Reducción de ruido ambiental en 12 dB.",
    testimonial: "\"Los paneles modulares de CCL redujeron nuestras paradas de planta no programadas por cambio de cribas.\"",
    author: "Ing. David Torres (Mantenimiento Planta)",
    image: "assets/polyurethane_panel.png"
  },
  {
    id: "proj-2",
    client: "Cantera Huachipa",
    sector: "Canteras",
    location: "Lima, Perú",
    need: "Colmatación extrema (cegado) de arcillas plásticas en zarandas de finos durante la temporada de lluvias.",
    solution: "Instalación de Mallas Autolimpiantes CCL-Flex de 4.0mm con alambres individuales tensados lateralmente.",
    productUsed: "Malla Autolimpiante CCL-Flex",
    category: "ccl-flex",
    results: "Eliminación total del cegado. Aumento del área abierta activa de cribado en un 25%, elevando la producción en 30 TPH.",
    testimonial: "\"La malla CCL-Flex resolvió el atoro de arena en invierno. Un producto de ingeniería excelente.\"",
    author: "Ing. Mario Ortiz (Jefe de Cantera)",
    image: "assets/ccl_flex_screen.png"
  },
  {
    id: "proj-3",
    client: "Agregados del Sur",
    sector: "Agregados",
    location: "Arequipa, Perú",
    need: "Cribado de piedra chancada de alta dureza (basalto) desgastando prematuramente mallas comerciales comunes.",
    solution: "Suministro de Mallas Metálicas Cuadradas tejidas en Acero de alto carbono SAE 1070 templado especial.",
    productUsed: "Mallas Metálicas Cuadradas",
    category: "mallas-cuadradas",
    results: "Duración 40% superior en comparación con mallas genéricas importadas. Consistencia en la granulometría entregada.",
    testimonial: "\"La calidad del acero de CCL se nota en el tonelaje total procesado sin roturas de alambre.\"",
    author: "Ing. Jorge Alva (Superintendente)",
    image: "assets/steel_wire_mesh.png"
  }
];

// Seed Technical Library documents
const INITIAL_LIBRARY = [
  {
    id: "doc-1",
    title: "Catálogo General CCL Mallas Metálicas y Poliuretano 2026",
    titleEn: "General Catalog CCL Wire Meshes and Polyurethane 2026",
    category: "Catálogos",
    version: "v4.2",
    downloads: 345,
    date: "2026-01-10",
    fileSize: "8.4 MB",
    fileName: "catalogo_general_ccl_2026.pdf"
  },
  {
    id: "doc-2",
    title: "Ficha Técnica: Paneles Modulares de Poliuretano para Cribado",
    titleEn: "Technical Sheet: Polyurethane Modular Panels for Screening",
    category: "Fichas Técnicas",
    version: "v2.1",
    downloads: 189,
    date: "2026-02-15",
    fileSize: "1.8 MB",
    fileName: "ficha_tecnica_paneles_ccl.pdf"
  },
  {
    id: "doc-3",
    title: "Manual de Instalación y Tensión de Mallas en Zarandas Vibratorias",
    titleEn: "Installation and Tensioning Manual for Wire Meshes on Vibrating Screens",
    category: "Manuales",
    version: "v1.5",
    downloads: 278,
    date: "2026-03-05",
    fileSize: "3.2 MB",
    fileName: "manual_tension_mallas_ccl.pdf"
  },
  {
    id: "doc-4",
    title: "Tabla de Selección de Acero y Cálculo de Porcentaje de Área Abierta",
    titleEn: "Steel Selection Chart and Open Area Percentage Calculation",
    category: "Tablas Técnicas",
    version: "v3.0",
    downloads: 412,
    date: "2026-04-18",
    fileSize: "1.1 MB",
    fileName: "tabla_calculo_area_abierta_ccl.pdf"
  }
];

// Seed Blog Articles
const INITIAL_BLOG = [
  {
    id: "art-1",
    title: "Cómo Optimizar la Vida Útil de las Mallas en Zarandas de Cantera",
    titleEn: "How to Optimize Wire Mesh Service Life in Quarry Screens",
    category: "Mantenimiento",
    date: "2026-05-12",
    readTime: "5 min",
    summary: "El desgaste prematuro se debe usualmente a una mala tensión lateral. Explicamos cómo ajustar las cuñas de madera y perfiles de goma correctamente para evitar la vibración armónica destructiva.",
    author: "Ing. Héctor Vargas (Ingeniería de Aplicaciones)"
  },
  {
    id: "art-2",
    title: "Poliuretano vs Acero: ¿Cuál elegir en procesos de clasificación?",
    titleEn: "Polyurethane vs Steel: Which one to choose in screening processes?",
    category: "Innovación",
    date: "2026-04-25",
    readTime: "7 min",
    summary: "Comparamos costo-beneficio, niveles de ruido y durabilidad en cribado húmedo. Analizamos cuándo conviene hacer la transición a paneles modulares de poliuretano en la minería de oro y cobre.",
    author: "Ing. David Torres (Calidad e Innovación)"
  }
];

// Seed User Roles
const INITIAL_USERS = [
  { id: "usr-1", username: "admin", role: "Superadministrador", name: "Administrador General" },
  { id: "usr-2", username: "ventas_ccl", role: "Ventas", name: "Ana Obregón" },
  { id: "usr-3", username: "ingenieria_ccl", role: "Ingeniería", name: "Héctor Vargas" }
];

// Seed Contact Messages
const INITIAL_CONTACT_MESSAGES = [
  {
    id: "msg-1",
    name: "Ing. Roberto Lujan",
    email: "rlujan@mineraantamina.pe",
    phone: "983456712",
    company: "Minera Antamina",
    subject: "Consulta sobre mallas autolimpiantes para finos húmedos",
    message: "Buen día, estamos teniendo problemas de colmatación por arcillas finas húmedas en la zaranda 3 de la planta concentradora. ¿Su sistema CCL-Flex puede fabricarse para abertura de 2.5mm con ganchos de tensión lateral?",
    date: "2026-06-15T09:12:00Z",
    status: "Pendiente"
  },
  {
    id: "msg-2",
    name: "Ing. Laura Castro",
    email: "lcastro@canteraperu.com",
    phone: "951234762",
    company: "Canteras del Perú",
    subject: "Cotización de cuñas de madera y pernos J",
    message: "Estimados, requerimos cotizar 50 cuñas de madera dura de 1m y 100 pernos J para sujeción de mallas de zarandas. Por favor indicar tiempos de entrega y disponibilidad en stock.",
    date: "2026-06-14T15:45:00Z",
    status: "Leído"
  },
  {
    id: "msg-3",
    name: "Juan Carlos Baca",
    email: "jbaca@constructoresperu.org",
    phone: "967213890",
    company: "Constructores del Sur S.A.",
    subject: "Paneles modulares de poliuretano Shore A",
    message: "Hola, desearíamos saber si fabrican paneles de poliuretano con sistema de encastre clip-on para zarandas vibratorias estándar Haver. Necesitamos aberturas cuadradas de 10mm.",
    date: "2026-06-12T11:20:00Z",
    status: "Pendiente"
  }
];

// Initialize localStorage DB
function initDatabase() {
  if (!localStorage.getItem("ccl_db_initialized_v2")) {
    localStorage.setItem("ccl_products", JSON.stringify(INITIAL_PRODUCTS));
    localStorage.setItem("ccl_contact_info", JSON.stringify(INITIAL_CONTACT_INFO));
    localStorage.setItem("ccl_quotes", JSON.stringify(INITIAL_QUOTES));
    localStorage.setItem("ccl_analytics", JSON.stringify(INITIAL_ANALYTICS));
    localStorage.setItem("ccl_projects", JSON.stringify(INITIAL_PROJECTS));
    localStorage.setItem("ccl_library", JSON.stringify(INITIAL_LIBRARY));
    localStorage.setItem("ccl_blog", JSON.stringify(INITIAL_BLOG));
    localStorage.setItem("ccl_users", JSON.stringify(INITIAL_USERS));
    
    // Flag database initialized
    localStorage.setItem("ccl_db_initialized_v2", "true");
    console.log("Base de datos técnica y comercial CCL inicializada correctamente.");
  }

  // Ensure contact messages seed exists independently
  if (!localStorage.getItem("ccl_contact_messages")) {
    localStorage.setItem("ccl_contact_messages", JSON.stringify(INITIAL_CONTACT_MESSAGES));
  }
}

// Fetch lists
const getProducts = () => JSON.parse(localStorage.getItem("ccl_products")) || [];
const getContactInfo = () => JSON.parse(localStorage.getItem("ccl_contact_info")) || INITIAL_CONTACT_INFO;
const getQuotes = () => JSON.parse(localStorage.getItem("ccl_quotes")) || [];
const getAnalytics = () => JSON.parse(localStorage.getItem("ccl_analytics")) || INITIAL_ANALYTICS;
const getProjects = () => JSON.parse(localStorage.getItem("ccl_projects")) || [];
const getLibrary = () => JSON.parse(localStorage.getItem("ccl_library")) || [];
const getBlog = () => JSON.parse(localStorage.getItem("ccl_blog")) || [];
const getUsers = () => JSON.parse(localStorage.getItem("ccl_users")) || [];
const getContactMessages = () => JSON.parse(localStorage.getItem("ccl_contact_messages")) || [];

// Save lists
const saveProducts = (p) => localStorage.setItem("ccl_products", JSON.stringify(p));
const saveContactInfo = (i) => localStorage.setItem("ccl_contact_info", JSON.stringify(i));
const saveQuotes = (q) => localStorage.setItem("ccl_quotes", JSON.stringify(q));
const saveAnalytics = (a) => localStorage.setItem("ccl_analytics", JSON.stringify(a));
const saveProjects = (p) => localStorage.setItem("ccl_projects", JSON.stringify(p));
const saveLibrary = (l) => localStorage.setItem("ccl_library", JSON.stringify(l));
const saveBlog = (b) => localStorage.setItem("ccl_blog", JSON.stringify(b));
const saveContactMessages = (m) => localStorage.setItem("ccl_contact_messages", JSON.stringify(m));

// Run init
initDatabase();

// Lógica específica para admin.html (CMS Administrativo)
let currentAdminTab = "dashboard";
let activeViewingQuoteId = null;
let activeViewingMessageId = null;
let editingProductId = null;
let selectedImagePreset = "assets/steel_wire_mesh.png";

function checkAdminAuth() {
  if (sessionStorage.getItem("ccl_admin_logged")) {
    document.getElementById("admin-login-overlay").style.display = "none";
    loadDashboardMetrics();
  } else {
    document.getElementById("admin-login-overlay").style.display = "flex";
  }
}

function switchAdminTab(tabId) {
  currentAdminTab = tabId;

  document.querySelectorAll(".admin-sidebar-link").forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("data-admin-tab") === tabId) {
      link.classList.add("active");
    }
  });

  document.querySelectorAll(".admin-view-panel").forEach(panel => {
    panel.classList.remove("active");
    if (panel.id === `panel-${tabId}`) {
      panel.classList.add("active");
    }
  });

  if (tabId === "dashboard") {
    loadDashboardMetrics();
  } else if (tabId === "products") {
    loadAdminProductsTable();
  } else if (tabId === "quotes") {
    loadAdminQuotesTable();
  } else if (tabId === "messages") {
    loadAdminMessagesTable();
  } else if (tabId === "settings") {
    updateContactDOM();
  }
}

function loadDashboardMetrics() {
  const quotes = getQuotes();
  const products = getProducts();
  const messages = getContactMessages();
  const analytics = getAnalytics();

  const total = document.getElementById("stat-total-quotes");
  const pending = document.getElementById("stat-pending-quotes");
  const prods = document.getElementById("stat-total-products");
  const msgs = document.getElementById("stat-pending-messages");
  const downloads = document.getElementById("stat-pdf-downloads");
  
  if (total) total.innerText = quotes.length;
  if (prods) prods.innerText = products.length;
  
  const countPending = quotes.filter(q => q.status === "Nueva" || q.status === "En revisión").length;
  if (pending) pending.innerText = countPending;

  const countPendingMsgs = messages.filter(m => m.status === "Pendiente").length;
  if (msgs) msgs.innerText = countPendingMsgs;

  if (downloads) downloads.innerText = analytics.pdfDownloads || 0;

  const alertBanner = document.getElementById("unattended-alerts-banner");
  if (alertBanner) {
    const newQuotesCount = quotes.filter(q => q.status === "Nueva").length;
    if (newQuotesCount > 0) {
      alertBanner.style.display = "flex";
      document.getElementById("alert-count-msg").innerHTML = `⚠️ Tienes <strong>${newQuotesCount} cotizaciones nuevas</strong> sin atender en bandeja.`;
    } else {
      alertBanner.style.display = "none";
    }
  }

  // Categories Chart
  const catWeights = {
    "mallas-cuadradas": 0,
    "mallas-rectangulares": 0,
    "mallas-rollos": 0,
    "ccl-flex": 0,
    "paneles-poliuretano": 0,
    "accesorios": 0
  };

  quotes.forEach(q => {
    if (catWeights[q.productType] !== undefined) {
      catWeights[q.productType] += q.quantity;
    }
  });

  const values = Object.values(catWeights);
  const maxVal = Math.max(...values, 1);

  setBarHeight("bar-mallas-cuad", catWeights["mallas-cuadradas"], maxVal);
  setBarHeight("bar-mallas-rect", catWeights["mallas-rectangulares"], maxVal);
  setBarHeight("bar-mallas-roll", catWeights["mallas-rollos"], maxVal);
  setBarHeight("bar-flex", catWeights["ccl-flex"], maxVal);
  setBarHeight("bar-poly", catWeights["paneles-poliuretano"], maxVal);
  setBarHeight("bar-access", catWeights["accesorios"], maxVal);

  // Funnel chart
  const totalEnviados = quotes.length;
  const totalAprobados = quotes.filter(q => q.status === "Aprobada" || q.status === "Cerrada").length;

  const setFunnelRow = (rowId, countVal, percentageWidth) => {
    const bar = document.getElementById(rowId);
    if (bar) {
      bar.style.width = `${percentageWidth}%`;
      bar.innerText = `${countVal} (${percentageWidth}%)`;
    }
  };

  setFunnelRow("funnel-visitas", 2500, 100);
  setFunnelRow("funnel-busquedas", 1800, 72);
  setFunnelRow("funnel-cotizador", 450, 18);
  
  const sentPercent = Math.min(Math.round((totalEnviados / 450) * 100), 100);
  setFunnelRow("funnel-enviados", totalEnviados, sentPercent);
  
  const approvedPercent = totalEnviados > 0 ? Math.min(Math.round((totalAprobados / totalEnviados) * 100), 100) : 0;
  setFunnelRow("funnel-aprobados", totalAprobados, approvedPercent);

  // Technical PDF library downloads tracking list
  const downloadsContainer = document.getElementById("dashboard-downloads-list");
  if (downloadsContainer) {
    downloadsContainer.innerHTML = "";
    const library = getLibrary();
    library.forEach(libItem => {
      const maxVal = 500;
      const pct = Math.min(100, Math.round((libItem.downloads / maxVal) * 100));
      
      const div = document.createElement("div");
      div.innerHTML = `
        <div style="display:flex; justify-content:space-between; font-size:0.8rem; margin-bottom:6px; font-weight:600; color:var(--text-dark);">
          <span style="overflow:hidden; text-overflow:ellipsis; white-space:nowrap; max-width:180px;" title="${libItem.title}">${libItem.title}</span>
          <span style="color:var(--primary-blue);">${libItem.downloads}</span>
        </div>
        <div style="background:var(--border-light); border-radius:4px; height:6px; overflow:hidden;">
          <div style="width:${pct}%; background:linear-gradient(90deg, var(--primary-blue), #009dfc); height:100%;"></div>
        </div>
        <div style="display:flex; justify-content:space-between; font-size:0.68rem; color:var(--text-muted); margin-top:6px;">
          <span>${libItem.category}</span>
          <span>${libItem.fileSize}</span>
        </div>
      `;
      downloadsContainer.appendChild(div);
    });
  }

  // Recent Quotes
  const tbody = document.getElementById("dashboard-recent-quotes");
  if (tbody) {
    tbody.innerHTML = "";
    const recent = quotes.slice(0, 4);
    if (recent.length === 0) {
      tbody.innerHTML = `<tr><td colspan="5" style="text-align:center; color:var(--text-muted); padding:2rem;">No hay registros.</td></tr>`;
    } else {
      recent.forEach(q => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td style="font-weight:700; color:var(--text-dark);">${q.clientName}</td>
          <td>${q.company}</td>
          <td>${new Date(q.date).toLocaleDateString()}</td>
          <td><span class="badge-stage ${getStageClass(q.status)}">${q.status}</span></td>
          <td>
            <button class="btn-table-action btn-dashboard-view-quote" data-id="${q.id}">
              <i class="fa-solid fa-eye"></i>
            </button>
          </td>
        `;
        tr.querySelector(".btn-dashboard-view-quote").addEventListener("click", () => openQuoteDetailModal(q.id));
        tbody.appendChild(tr);
      });
    }
  }
}

function setBarHeight(barId, val, maxVal) {
  const bar = document.getElementById(barId);
  const valLabel = document.getElementById(`${barId}-val`);
  if (bar && valLabel) {
    const heightPercent = val === 0 ? 0 : Math.max(10, (val / maxVal) * 80 + 10);
    bar.style.height = `${val === 0 ? 0 : heightPercent}%`;
    valLabel.innerText = val;
  }
}

function getStageClass(status) {
  const map = {
    "Nueva": "nueva",
    "En revisión": "revision",
    "Información incompleta": "incompleta",
    "Cotizada": "cotizada",
    "En negociación": "negociacion",
    "Aprobada": "aprobada",
    "Rechazada": "rechazada",
    "Cerrada": "cerrada"
  };
  return map[status] || "nueva";
}

function loadAdminProductsTable() {
  const products = getProducts();
  const tbody = document.getElementById("admin-products-tbody");
  if (!tbody) return;

  tbody.innerHTML = "";

  if (products.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6" style="text-align:center; color:var(--text-muted); padding:3rem;">No hay productos.</td></tr>`;
    return;
  }

  products.forEach(p => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td><img src="${p.image}" alt="" class="table-img"></td>
      <td style="font-weight:700; color:var(--text-dark);">${p.name}</td>
      <td>${p.categoryName}</td>
      <td>${p.material}</td>
      <td>${p.aperture}</td>
      <td>
        <div class="action-btns">
          <button class="btn-table-action edit-product-btn" data-id="${p.id}"><i class="fa-solid fa-edit"></i></button>
          <button class="btn-table-action delete delete-product-btn" data-id="${p.id}"><i class="fa-solid fa-trash"></i></button>
        </div>
      </td>
    `;
    
    tr.querySelector(".edit-product-btn").addEventListener("click", () => openProductModal(p.id));
    tr.querySelector(".delete-product-btn").addEventListener("click", () => deleteProduct(p.id));
    
    tbody.appendChild(tr);
  });
}

function openProductModal(productId = null) {
  editingProductId = productId;
  const modal = document.getElementById("modal-product");
  const title = document.getElementById("modal-product-title");
  const form = document.getElementById("form-product");
  
  if (!modal || !form) return;
  form.reset();

  document.querySelectorAll(".image-preset-option").forEach(el => el.classList.remove("selected"));
  const defaultOpt = document.querySelector(".image-preset-option[data-preset='assets/steel_wire_mesh.png']");
  if (defaultOpt) defaultOpt.classList.add("selected");
  selectedImagePreset = "assets/steel_wire_mesh.png";

  if (productId) {
    title.innerText = "Editar Producto";
    const p = getProducts().find(prod => prod.id === productId);
    if (p) {
      document.getElementById("p-name").value = p.name;
      document.getElementById("p-category").value = p.category;
      document.getElementById("p-material").value = p.material;
      document.getElementById("p-aperture").value = p.aperture;
      document.getElementById("p-diameter").value = p.wireDiameter || "";
      document.getElementById("p-desc").value = p.description;
      
      document.querySelectorAll(".image-preset-option").forEach(el => {
        if (el.getAttribute("data-preset") === p.image) {
          el.classList.add("selected");
          selectedImagePreset = p.image;
        } else {
          el.classList.remove("selected");
        }
      });
    }
  } else {
    title.innerText = "Agregar Nuevo Producto";
  }

  modal.classList.add("open");
}

function saveProductForm() {
  const name = document.getElementById("p-name").value.trim();
  const category = document.getElementById("p-category").value;
  const material = document.getElementById("p-material").value.trim();
  const aperture = document.getElementById("p-aperture").value.trim();
  const diameter = document.getElementById("p-diameter").value.trim();
  const desc = document.getElementById("p-desc").value.trim();

  if (!name || !category || !material || !aperture || !desc) {
    showToast("Por favor completa todos los campos obligatorios.", "error");
    return;
  }

  const categoryNameMap = {
    "mallas-cuadradas": "Mallas Cuadradas",
    "mallas-rectangulares": "Mallas Rectangulares",
    "mallas-rollos": "Mallas en Rollos",
    "ccl-flex": "Sistemas CCL-Flex",
    "paneles-poliuretano": "Paneles de Poliuretano",
    "accesorios": "Accesorios"
  };

  const products = getProducts();

  if (editingProductId) {
    const idx = products.findIndex(p => p.id === editingProductId);
    if (idx !== -1) {
      products[idx] = {
        ...products[idx],
        name,
        category,
        categoryName: categoryNameMap[category],
        material,
        aperture,
        wireDiameter: diameter || "N/A",
        description: desc,
        image: selectedImagePreset
      };
      saveProducts(products);
      showToast("Producto actualizado con éxito.", "success");
    }
  } else {
    const newProduct = {
      id: "prod-" + Date.now(),
      name,
      category,
      categoryName: categoryNameMap[category],
      material,
      aperture,
      wireDiameter: diameter || "N/A",
      description: desc,
      image: selectedImagePreset,
      featured: false
    };
    products.push(newProduct);
    saveProducts(products);
    showToast("Producto creado en el catálogo.", "success");
  }

  document.getElementById("modal-product").classList.remove("open");
  loadAdminProductsTable();
}

function deleteProduct(productId) {
  if (confirm("¿Seguro que deseas eliminar este producto?")) {
    let products = getProducts();
    const p = products.find(prod => prod.id === productId);
    products = products.filter(prod => prod.id !== productId);
    saveProducts(products);
    showToast(`Producto "${p.name}" eliminado.`, "success");
    loadAdminProductsTable();
  }
}

function loadAdminQuotesTable() {
  const quotes = getQuotes();
  const searchInput = document.getElementById("search-quotes");
  const query = searchInput ? searchInput.value.toLowerCase().trim() : "";

  const filterSelect = document.getElementById("filter-quote-status");
  const statusFilter = filterSelect ? filterSelect.value : "all";

  const tbody = document.getElementById("admin-quotes-tbody");
  if (!tbody) return;

  tbody.innerHTML = "";

  const filtered = quotes.filter(q => {
    const matchesStatus = statusFilter === "all" || q.status === statusFilter;
    
    const clientStr = q.clientName.toLowerCase();
    const companyStr = q.company.toLowerCase();
    const rucStr = (q.ruc || "").toLowerCase();
    const idStr = q.id.toLowerCase();
    
    const matchesSearch = clientStr.includes(query) || 
                          companyStr.includes(query) || 
                          rucStr.includes(query) ||
                          idStr.includes(query);
                          
    return matchesStatus && matchesSearch;
  });

  if (filtered.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6" style="text-align:center; color:var(--text-muted); padding:3rem;">No se encontraron cotizaciones con los filtros actuales.</td></tr>`;
    return;
  }

  filtered.forEach(q => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td style="font-weight:700; color:var(--text-dark);">${q.id}</td>
      <td><strong>${q.clientName}</strong><br><span style="font-size:0.78rem; color:var(--text-muted);">${q.company}</span></td>
      <td>${q.email}<br><span style="font-size:0.78rem; color:var(--text-muted);">${q.phone}</span></td>
      <td>${new Date(q.date).toLocaleDateString()}</td>
      <td><span class="badge-stage ${getStageClass(q.status)}">${q.status}</span></td>
      <td>
        <button class="btn-table-action btn-view-quote" data-id="${q.id}">
          <i class="fa-solid fa-eye"></i>
        </button>
      </td>
    `;
    tr.querySelector(".btn-view-quote").addEventListener("click", () => openQuoteDetailModal(q.id));
    tbody.appendChild(tr);
  });
}

function openQuoteDetailModal(quoteId) {
  activeViewingQuoteId = quoteId;
  const q = getQuotes().find(quote => quote.id === quoteId);
  if (!q) return;

  const modal = document.getElementById("modal-quote-detail");
  if (!modal) return;

  document.getElementById("mq-client").innerText = q.clientName;
  document.getElementById("mq-company").innerText = q.company;
  document.getElementById("mq-ruc").innerText = q.ruc || "N/A";
  document.getElementById("mq-email").innerText = q.email;
  document.getElementById("mq-phone").innerText = q.phone;
  document.getElementById("mq-dept").innerText = q.department || "N/A";
  document.getElementById("mq-date").innerText = new Date(q.date).toLocaleString();
  document.getElementById("mq-message").innerText = q.message;

  document.getElementById("mq-status").value = q.status;
  document.getElementById("mq-notes").value = q.notes || "";
  document.getElementById("mq-com").value = q.commercialResponsible || "";

  const specTbody = document.getElementById("modal-quote-specs-tbody");
  specTbody.innerHTML = `
    <tr><td><strong>Categoría Solicitada</strong></td><td>${q.productTypeName}</td></tr>
    <tr><td><strong>Cantidad Requerida</strong></td><td><strong>${q.quantity} unidades</strong></td></tr>
    <tr><td><strong>Dimensiones (Largo x Ancho)</strong></td><td>${q.specs.length} x ${q.specs.width}</td></tr>
    <tr><td><strong>Abertura de Cribado</strong></td><td>${q.specs.aperture}</td></tr>
    ${q.specs.wireDiameter !== "N/A" ? `<tr><td><strong>Espesor / Alambre</strong></td><td>${q.specs.wireDiameter}</td></tr>` : ""}
    ${q.specs.crimping !== "N/A" ? `<tr><td><strong>Tipo Ondulado</strong></td><td>${q.specs.crimping}</td></tr>` : ""}
    ${q.specs.sideHook !== "N/A" ? `<tr><td><strong>Gancho de Tensión</strong></td><td>${q.specs.sideHook}</td></tr>` : ""}
    <tr style="border-top:2px solid var(--border-light);"><td colspan="2" style="font-weight:700; color:var(--primary-blue);">Condiciones Operacionales</td></tr>
    <tr><td><strong>Mineral / Material</strong></td><td>${q.conditions.material}</td></tr>
    <tr><td><strong>Flujo Operación</strong></td><td>${q.conditions.tph}</td></tr>
    <tr><td><strong>Proceso Húmedo/Seco</strong></td><td>${q.conditions.operation}</td></tr>
    <tr><td><strong>Nivel de Abrasión</strong></td><td>${q.conditions.abrasion}</td></tr>
  `;

  const filesList = document.getElementById("modal-quote-files-list");
  filesList.innerHTML = "";
  if (q.attachedFiles && q.attachedFiles.length > 0) {
    q.attachedFiles.forEach(file => {
      filesList.innerHTML += `
        <div class="attached-file-item" style="border-color:var(--border-light); padding:0.4rem 0.8rem; width:fit-content; background:var(--bg-light);">
          <span>📄 ${file.name} (${file.size})</span>
          <button class="btn btn-outline" style="padding:0.2rem 0.5rem; font-size:0.7rem; margin-left:15px;" type="button" onclick="showToast('Descargando archivo adjunto...', 'success')">Ver Plano</button>
        </div>
      `;
    });
  } else {
    filesList.innerHTML = `<span style="font-size:0.82rem; color:var(--text-muted);">Ningún plano o archivo adjunto en esta solicitud.</span>`;
  }

  modal.classList.add("open");
}

function saveQuoteStatus() {
  if (!activeViewingQuoteId) return;

  const quotes = getQuotes();
  const idx = quotes.findIndex(q => q.id === activeViewingQuoteId);

  if (idx !== -1) {
    const status = document.getElementById("mq-status").value;
    const notes = document.getElementById("mq-notes").value.trim();
    const com = document.getElementById("mq-com").value.trim();

    quotes[idx].status = status;
    quotes[idx].notes = notes;
    quotes[idx].commercialResponsible = com;

    saveQuotes(quotes);
    showToast(`Cotización ${activeViewingQuoteId} actualizada con éxito.`, "success");
  }

  document.getElementById("modal-quote-detail").classList.remove("open");
  
  if (currentAdminTab === "dashboard") {
    loadDashboardMetrics();
  } else if (currentAdminTab === "quotes") {
    loadAdminQuotesTable();
  }
}

// Contact Messages CRUD Trays
function loadAdminMessagesTable() {
  const messages = getContactMessages();
  const tbody = document.getElementById("admin-messages-tbody");
  if (!tbody) return;

  tbody.innerHTML = "";

  if (messages.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6" style="text-align:center; color:var(--text-muted); padding:3rem;">No hay mensajes de contacto registrados.</td></tr>`;
    return;
  }

  messages.forEach(m => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td style="font-weight:700; color:var(--text-dark);">${m.name}</td>
      <td><strong>${m.company}</strong><br><span style="font-size:0.78rem; color:var(--text-muted);">${m.phone}</span></td>
      <td style="max-width:220px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;" title="${m.subject}">${m.subject}</td>
      <td>${new Date(m.date).toLocaleDateString()}</td>
      <td><span class="badge-stage ${m.status === 'Leído' ? 'aprobada' : 'revision'}">${m.status}</span></td>
      <td>
        <div class="action-btns">
          <button class="btn-table-action btn-view-message" data-id="${m.id}"><i class="fa-solid fa-eye"></i></button>
          <button class="btn-table-action delete delete-message-btn" data-id="${m.id}"><i class="fa-solid fa-trash"></i></button>
        </div>
      </td>
    `;

    tr.querySelector(".btn-view-message").addEventListener("click", () => openMessageDetailModal(m.id));
    tr.querySelector(".delete-message-btn").addEventListener("click", () => deleteMessage(m.id));

    tbody.appendChild(tr);
  });
}

function openMessageDetailModal(msgId) {
  activeViewingMessageId = msgId;
  const messages = getContactMessages();
  const m = messages.find(msg => msg.id === msgId);
  if (!m) return;

  const modal = document.getElementById("modal-message-detail");
  if (!modal) return;

  document.getElementById("mmsg-name").innerText = m.name;
  document.getElementById("mmsg-company").innerText = m.company || "N/A";
  document.getElementById("mmsg-email").innerText = m.email;
  document.getElementById("mmsg-phone").innerText = m.phone;
  document.getElementById("mmsg-date").innerText = new Date(m.date).toLocaleString();
  document.getElementById("mmsg-subject").innerText = m.subject;
  document.getElementById("mmsg-body").innerText = m.message;

  const markReadBtn = document.getElementById("btn-mark-read-message");
  if (markReadBtn) {
    if (m.status === "Leído") {
      markReadBtn.style.display = "none";
    } else {
      markReadBtn.style.display = "inline-block";
      markReadBtn.onclick = () => {
        markMessageAsRead(m.id);
      };
    }
  }

  modal.classList.add("open");
}

function markMessageAsRead(msgId) {
  const messages = getContactMessages();
  const idx = messages.findIndex(msg => msg.id === msgId);
  if (idx !== -1) {
    messages[idx].status = "Leído";
    saveContactMessages(messages);
    showToast("Mensaje marcado como leído.", "success");
  }
  document.getElementById("modal-message-detail").classList.remove("open");
  
  if (currentAdminTab === "dashboard") {
    loadDashboardMetrics();
  } else if (currentAdminTab === "messages") {
    loadAdminMessagesTable();
  }
}

function deleteMessage(msgId) {
  if (confirm("¿Seguro que deseas eliminar este mensaje?")) {
    let messages = getContactMessages();
    const m = messages.find(msg => msg.id === msgId);
    messages = messages.filter(msg => msg.id !== msgId);
    saveContactMessages(messages);
    showToast("Mensaje eliminado con éxito.", "success");
    loadAdminMessagesTable();
    loadDashboardMetrics();
  }
}

function saveConfigForm() {
  const phone = document.getElementById("cfg-phone").value.trim();
  const landline = document.getElementById("cfg-landline").value.trim();
  const email = document.getElementById("cfg-email").value.trim();
  const address = document.getElementById("cfg-address").value.trim();
  const hours = document.getElementById("cfg-hours").value.trim();

  if (!phone || !email || !address) {
    showToast("Por favor completa los campos obligatorios.", "error");
    return;
  }

  const config = getContactInfo();
  config.phone = phone;
  config.landline = landline;
  config.email = email;
  config.address = address;
  config.hours = hours;

  saveContactInfo(config);
  updateContactDOM();
  showToast("Datos de contacto actualizados.", "success");
}

document.addEventListener("DOMContentLoaded", () => {
  checkAdminAuth();

  // Sidebar responsive drawer toggling
  const sidebar = document.getElementById("admin-sidebar");
  const overlay = document.getElementById("sidebar-overlay");
  const btnToggleSidebar = document.getElementById("btn-toggle-sidebar");
  const btnCloseSidebar = document.getElementById("btn-close-sidebar");

  const openSidebar = () => {
    if (sidebar) sidebar.classList.add("open");
    if (overlay) overlay.classList.add("show");
  };

  const closeSidebar = () => {
    if (sidebar) sidebar.classList.remove("open");
    if (overlay) overlay.classList.remove("show");
  };

  if (btnToggleSidebar) btnToggleSidebar.addEventListener("click", openSidebar);
  if (btnCloseSidebar) btnCloseSidebar.addEventListener("click", closeSidebar);
  if (overlay) overlay.addEventListener("click", closeSidebar);

  // Close sidebar drawer when switching tabs on mobile
  document.querySelectorAll(".admin-sidebar-link").forEach(link => {
    link.addEventListener("click", closeSidebar);
  });

  // Logout button functionality
  const btnLogout = document.getElementById("btn-logout");
  if (btnLogout) {
    btnLogout.addEventListener("click", () => {
      sessionStorage.removeItem("ccl_admin_logged");
      showToast("Sesión cerrada. Redirigiendo...", "success");
      setTimeout(() => {
        location.href = "index.html";
      }, 1000);
    });
  }

  // Login Form Submission
  const formLogin = document.getElementById("form-admin-login");
  if (formLogin) {
    formLogin.addEventListener("submit", (e) => {
      e.preventDefault();
      const u = document.getElementById("login-username").value;
      const p = document.getElementById("login-password").value;

      if (u === "admin" && p === "admin123") {
        sessionStorage.setItem("ccl_admin_logged", "true");
        checkAdminAuth();
      } else {
        document.getElementById("login-error-msg").style.display = "block";
      }
    });
  }

  // Admin Sidebar switching
  document.querySelectorAll(".admin-sidebar-link[data-admin-tab]").forEach(link => {
    link.addEventListener("click", () => {
      switchAdminTab(link.getAttribute("data-admin-tab"));
    });
  });

  // Product CRUD forms and buttons
  const btnAddProduct = document.getElementById("btn-add-product");
  const formProduct = document.getElementById("form-product");
  const modalProduct = document.getElementById("modal-product");
  const btnCloseProdModal = document.getElementById("btn-close-product-modal");
  const btnCancelProdModal = document.getElementById("btn-cancel-product-modal");

  if (btnAddProduct && modalProduct) {
    btnAddProduct.addEventListener("click", () => openProductModal());
    btnCloseProdModal.addEventListener("click", () => modalProduct.classList.remove("open"));
    btnCancelProdModal.addEventListener("click", () => modalProduct.classList.remove("open"));
    formProduct.addEventListener("submit", (e) => {
      e.preventDefault();
      saveProductForm();
    });
  }

  // Image presets
  document.querySelectorAll(".image-preset-option").forEach(option => {
    option.addEventListener("click", () => {
      document.querySelectorAll(".image-preset-option").forEach(el => el.classList.remove("selected"));
      option.classList.add("selected");
      selectedImagePreset = option.getAttribute("data-preset");
    });
  });

  // Quote detail modal
  const formQuoteEdit = document.getElementById("form-quote-edit");
  const modalQuoteDetail = document.getElementById("modal-quote-detail");
  const btnCloseQuoteModal = document.getElementById("btn-close-quote-modal");
  const btnCancelQuoteModal = document.getElementById("btn-cancel-quote-modal");

  if (formQuoteEdit && modalQuoteDetail) {
    btnCloseQuoteModal.addEventListener("click", () => modalQuoteDetail.classList.remove("open"));
    btnCancelQuoteModal.addEventListener("click", () => modalQuoteDetail.classList.remove("open"));
    formQuoteEdit.addEventListener("submit", (e) => {
      e.preventDefault();
      saveQuoteStatus();
    });
  }

  // Contact messages details modal
  const modalMessageDetail = document.getElementById("modal-message-detail");
  const btnCloseMsgModal = document.getElementById("btn-close-message-modal");
  const btnCancelMsgModal = document.getElementById("btn-cancel-message-modal");

  if (modalMessageDetail) {
    btnCloseMsgModal.addEventListener("click", () => modalMessageDetail.classList.remove("open"));
    btnCancelMsgModal.addEventListener("click", () => modalMessageDetail.classList.remove("open"));
  }

  // Filters inside Quotes tab
  const searchQuotesInput = document.getElementById("search-quotes");
  if (searchQuotesInput) {
    searchQuotesInput.addEventListener("input", () => loadAdminQuotesTable());
  }

  const filterQuotesStatus = document.getElementById("filter-quote-status");
  if (filterQuotesStatus) {
    filterQuotesStatus.addEventListener("change", () => loadAdminQuotesTable());
  }

  // Config Form Submission
  const formConfig = document.getElementById("form-config");
  if (formConfig) {
    formConfig.addEventListener("submit", (e) => {
      e.preventDefault();
      saveConfigForm();
    });
  }
});

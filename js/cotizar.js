// Lógica para cotizar.html (Wizard Asistente de 5 Pasos)
let currentWizardStep = 1;
let wizardProductType = "";
let wizardAttachedFiles = [];

function resetWizardForm() {
  currentWizardStep = 1;
  wizardProductType = "";
  wizardAttachedFiles = [];
  
  document.querySelectorAll(".wizard-selector-card").forEach(el => el.classList.remove("selected"));
  document.getElementById("form-wizard").reset();
  
  const list = document.getElementById("wizard-files-list");
  if (list) list.innerHTML = "";

  updateWizardStepDOM();
}

function updateWizardStepDOM() {
  document.querySelectorAll(".wizard-step-node").forEach(node => {
    const stepNum = parseInt(node.getAttribute("data-step"));
    node.classList.remove("active", "completed");
    if (stepNum === currentWizardStep) {
      node.classList.add("active");
    } else if (stepNum < currentWizardStep) {
      node.classList.add("completed");
    }
  });

  const progressLine = document.getElementById("wizard-tracker-progress");
  if (progressLine) {
    const percent = ((currentWizardStep - 1) / 4) * 100;
    progressLine.style.width = `${percent}%`;
  }

  document.querySelectorAll(".wizard-step-panel").forEach(panel => {
    panel.classList.remove("active");
    if (parseInt(panel.getAttribute("data-step")) === currentWizardStep) {
      panel.classList.add("active");
    }
  });

  const btnPrev = document.getElementById("wizard-prev");
  const btnNext = document.getElementById("wizard-next");

  if (btnPrev) btnPrev.style.display = currentWizardStep === 1 ? "none" : "inline-flex";
  
  if (btnNext) {
    if (currentWizardStep === 5) {
      btnNext.innerText = currentLanguage === "es" ? "Enviar Solicitud" : "Submit Request";
      btnNext.style.backgroundColor = "var(--status-completed)";
    } else {
      btnNext.innerText = currentLanguage === "es" ? "Siguiente" : "Next";
      btnNext.style.backgroundColor = "var(--primary-blue)";
    }
  }
}

function navigateWizard(direction) {
  if (direction === 1) {
    if (!validateWizardStep(currentWizardStep)) {
      return;
    }
    
    if (currentWizardStep === 5) {
      submitWizardQuote();
    } else {
      currentWizardStep += 1;
      updateWizardStepDOM();
    }
  } else {
    currentWizardStep -= 1;
    updateWizardStepDOM();
  }
}

function validateWizardStep(step) {
  if (step === 1) {
    if (!wizardProductType) {
      showToast(currentLanguage === "es" ? "Por favor selecciona un tipo de producto." : "Please select a product type.", "error");
      return false;
    }
  } else if (step === 2) {
    const length = document.getElementById("w-length").value.trim();
    const width = document.getElementById("w-width").value.trim();
    const aperture = document.getElementById("w-aperture").value.trim();
    const qty = document.getElementById("w-qty").value.trim();
    
    if (!length || !width || !aperture || !qty || parseInt(qty) <= 0) {
      showToast(currentLanguage === "es" ? "Por favor completa los campos de especificaciones técnicas obligatorios." : "Please complete all required technical specification fields.", "error");
      return false;
    }
  } else if (step === 5) {
    const company = document.getElementById("w-company").value.trim();
    const name = document.getElementById("w-contact").value.trim();
    const email = document.getElementById("w-email").value.trim();
    const phone = document.getElementById("w-phone").value.trim();
    
    if (!company || !name || !email || !phone) {
      showToast(currentLanguage === "es" ? "Por favor completa tus datos de contacto obligatorios." : "Please complete your mandatory contact details.", "error");
      return false;
    }
  }
  return true;
}

function handleDroppedFiles(files) {
  const list = document.getElementById("wizard-files-list");
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const sizeStr = file.size > 1024 * 1024 
      ? (file.size / (1024 * 1024)).toFixed(1) + " MB" 
      : (file.size / 1024).toFixed(0) + " KB";
      
    const fileMock = { name: file.name, size: sizeStr };
    wizardAttachedFiles.push(fileMock);

    const item = document.createElement("div");
    item.className = "attached-file-item";
    item.innerHTML = `
      <span>📄 ${fileMock.name} (${fileMock.size})</span>
      <button class="btn-remove-file" type="button">&times;</button>
    `;

    item.querySelector(".btn-remove-file").addEventListener("click", () => {
      wizardAttachedFiles = wizardAttachedFiles.filter(f => f.name !== fileMock.name);
      item.remove();
    });

    list.appendChild(item);
  }
}

function submitWizardQuote() {
  const quotes = getQuotes();
  let nextSerial = 125;
  if (quotes.length > 0) {
    const lastQuote = quotes[0];
    const parts = lastQuote.id.split("-");
    const lastNum = parseInt(parts[parts.length - 1]);
    if (!isNaN(lastNum)) {
      nextSerial = lastNum + 1;
    }
  }
  
  const formattedSerial = `COT-WEB-2026-${String(nextSerial).padStart(6, '0')}`;

  const productTypeMap = {
    "mallas-cuadradas": "Mallas Cuadradas",
    "mallas-rectangulares": "Mallas Rectangulares",
    "mallas-rollos": "Mallas en Rollos",
    "ccl-flex": "Sistemas CCL-Flex",
    "paneles-poliuretano": "Paneles de Poliuretano",
    "accesorios": "Accesorios"
  };

  const qty = parseInt(document.getElementById("w-qty").value);

  const newQuote = {
    id: formattedSerial,
    clientName: document.getElementById("w-contact").value.trim(),
    company: document.getElementById("w-company").value.trim(),
    ruc: document.getElementById("w-ruc").value.trim() || "N/A",
    email: document.getElementById("w-email").value.trim(),
    phone: document.getElementById("w-phone").value.trim(),
    department: document.getElementById("w-dept").value || "N/A",
    productType: wizardProductType,
    productTypeName: productTypeMap[wizardProductType] || "Personalizado",
    quantity: qty,
    message: document.getElementById("w-message-notes").value.trim() || "Sin notas adicionales.",
    specs: {
      length: document.getElementById("w-length").value.trim(),
      width: document.getElementById("w-width").value.trim(),
      aperture: document.getElementById("w-aperture").value.trim(),
      wireDiameter: document.getElementById("w-diameter").value.trim() || "N/A",
      crimping: document.getElementById("w-crimping").value || "N/A",
      sideHook: document.getElementById("w-hook").value || "N/A"
    },
    conditions: {
      material: document.getElementById("w-material").value || "N/A",
      tph: document.getElementById("w-tph").value || "N/A",
      operation: document.getElementById("w-operation").value || "N/A",
      abrasion: document.getElementById("w-abrasion").value || "N/A"
    },
    attachedFiles: wizardAttachedFiles,
    status: "Nueva",
    date: new Date().toISOString(),
    notes: "Solicitud técnica y comercial enviada por el cotizador paso a paso web.",
    commercialResponsible: ""
  };

  quotes.unshift(newQuote);
  saveQuotes(quotes);

  // Close success
  resetWizardForm();
  showFolioSuccessModal(formattedSerial);
}

function showFolioSuccessModal(folioCode) {
  let modalSuccess = document.getElementById("modal-folio-success");
  if (!modalSuccess) {
    modalSuccess = document.createElement("div");
    modalSuccess.id = "modal-folio-success";
    modalSuccess.className = "admin-modal";
    modalSuccess.innerHTML = `
      <div class="admin-modal-card" style="max-width: 440px; text-align:center;">
        <div class="admin-modal-header" style="border-bottom:none; justify-content:center; padding-top:2rem;">
          <div style="width:60px; height:60px; border-radius:50%; background:rgba(16, 185, 129, 0.1); color:var(--status-completed); display:flex; align-items:center; justify-content:center; font-size:2rem;">✓</div>
        </div>
        <div class="admin-modal-body" style="padding:1rem 2rem 2rem;">
          <h3 style="color:var(--text-dark); font-size:1.5rem; margin-bottom:0.5rem;">¡Solicitud Registrada!</h3>
          <p style="color:var(--text-muted); font-size:0.9rem; margin-bottom:1.5rem;">Tu cotización técnica ha sido enviada con éxito al departamento de ingeniería comercial.</p>
          <div style="background:var(--bg-light); border:1px solid var(--border-light); border-radius:var(--radius-sm); padding:0.8rem; font-family:monospace; font-size:1.15rem; color:var(--text-dark); font-weight:bold; letter-spacing:0.5px; margin-bottom:1.5rem;" id="folio-code-value">
            ${folioCode}
          </div>
          <button class="btn btn-primary" id="btn-close-success-modal" style="width:100%;">Aceptar y Volver</button>
        </div>
      </div>
    `;
    document.body.appendChild(modalSuccess);
    
    document.getElementById("btn-close-success-modal").addEventListener("click", () => {
      modalSuccess.classList.remove("open");
      location.href = "productos.html"; // Redirigir a productos al terminar
    });
  } else {
    document.getElementById("folio-code-value").innerText = folioCode;
  }
  modalSuccess.classList.add("open");
}

document.addEventListener("DOMContentLoaded", () => {
  resetWizardForm();

  // URL parameters select check
  const urlParams = new URLSearchParams(window.location.search);
  const catParam = urlParams.get('cat');
  if (catParam) {
    const card = document.querySelector(`.wizard-selector-card[data-value='${catParam}']`);
    if (card) {
      card.click();
      // Auto advance to step 2 if category is preselected to save time
      currentWizardStep = 2;
      updateWizardStepDOM();
    }
  }

  // Stepper events
  const btnPrev = document.getElementById("wizard-prev");
  const btnNext = document.getElementById("wizard-next");
  if (btnPrev) btnPrev.addEventListener("click", () => navigateWizard(-1));
  if (btnNext) btnNext.addEventListener("click", () => navigateWizard(1));

  // Product cards selector
  document.querySelectorAll(".wizard-selector-card").forEach(card => {
    card.addEventListener("click", () => {
      document.querySelectorAll(".wizard-selector-card").forEach(el => el.classList.remove("selected"));
      card.classList.add("selected");
      wizardProductType = card.getAttribute("data-value");
      
      const specTitle = document.getElementById("wizard-spec-title");
      if (specTitle) {
        specTitle.innerText = `Especificaciones Técnicas: ${card.querySelector(".wizard-selector-title").innerText}`;
      }
      
      const wireInputs = document.getElementById("wizard-wire-only-inputs");
      if (wireInputs) {
        if (wizardProductType.includes("mallas") || wizardProductType === "ccl-flex") {
          wireInputs.style.display = "grid";
        } else {
          wireInputs.style.display = "none";
        }
      }
    });
  });

  // Drag and Drop
  const dragDropZone = document.getElementById("drag-drop-zone");
  const fileInput = document.getElementById("w-file-input");
  
  if (dragDropZone && fileInput) {
    dragDropZone.addEventListener("click", () => fileInput.click());
    
    dragDropZone.addEventListener("dragover", (e) => {
      e.preventDefault();
      dragDropZone.classList.add("dragover");
    });

    dragDropZone.addEventListener("dragleave", () => {
      dragDropZone.classList.remove("dragover");
    });

    dragDropZone.addEventListener("drop", (e) => {
      e.preventDefault();
      dragDropZone.classList.remove("dragover");
      if (e.dataTransfer.files.length > 0) {
        handleDroppedFiles(e.dataTransfer.files);
      }
    });

    fileInput.addEventListener("change", () => {
      if (fileInput.files.length > 0) {
        handleDroppedFiles(fileInput.files);
      }
    });
  }
});

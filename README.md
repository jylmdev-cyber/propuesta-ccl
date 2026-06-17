# Demo de Propuesta Web y CMS - CCL Industrias Mecánicas

Este proyecto es una propuesta interactiva de alta fidelidad para la nueva página web y panel de administración (CMS) de **CCL Industrias Mecánicas S.A.C. (CCL Mallas)**.

El demo está desarrollado como una aplicación de una sola página (SPA) responsiva y moderna utilizando HTML5, CSS3 (Vanilla) y JavaScript puro.

---

## Características Principales

1. **Portal Público Corporativo:**
   - **Página de Inicio:** Con banner industrial de gran impacto visual y tarjetas de estadísticas de trayectoria.
   - **Sección Nosotros:** Destaca la especialización técnica de la empresa, su certificación OHSAS 18001 y el uso de aceros de alta resistencia (SAE 1045 a 1070).
   - **Catálogo de Productos:** Filtros en tiempo real por categoría (Mallas Metálicas, Paneles de Poliuretano, Sistemas CCL-Flex y Accesorios) y motor de búsqueda interactivo.
   - **Cotizador en Línea (Carrito):** Los clientes pueden añadir productos del catálogo, ingresar sus datos y enviar solicitudes de cotización.
   - **Sección Contacto:** Muestra la dirección real de la planta en Puente Piedra, Lima, teléfonos y un mapa interactivo simulado.

2. **Panel Administrativo (CMS):**
   - **Inicio de Sesión:** Acceso seguro con credenciales de prueba.
   - **Dashboard Administrativo:** Muestra métricas en tiempo real (Total de solicitudes, Cotizaciones pendientes, Productos registrados) y un gráfico de barras interactivo con la distribución de solicitudes por categoría de producto.
   - **Administración de Catálogo (CRUD):** Permite crear nuevos productos (usando imágenes de demostración integradas), editar la información de los existentes o eliminarlos. *Los cambios se reflejan al instante en la web pública.*
   - **Seguimiento de Cotizaciones:** Lista de solicitudes de cotización recibidas. Los administradores pueden abrir los detalles, ver los productos y cantidades solicitados, cambiar el estado del trámite y añadir notas de seguimiento interno.
   - **Configuración General:** Permite actualizar teléfonos, correos y dirección física de la planta, actualizándose instantáneamente en toda la web pública.

3. **Base de Datos Simulada (`localStorage`):**
   - Toda la información (productos, cotizaciones registradas, configuraciones de contacto) se almacena y persiste localmente en la memoria del navegador. Esto significa que si agregas un producto o registras una cotización, los datos no se perderán si recargas la página, permitiendo probar el flujo completo de forma 100% real.

---

## Cómo Ejecutar el Demo

Al estar construido sin dependencias ni compiladores externos, ejecutarlo es sumamente sencillo:

1. **Opción Directa (Recomendada para pruebas rápidas):**
   - Haz doble clic en el archivo **[index.html](file:///c:/Users/User/Downloads/propuesta-ccl/index.html)** en tu navegador web (Chrome, Edge, Firefox, etc.). ¡El demo se ejecutará inmediatamente con toda su interactividad!

2. **Opción Servidor Local (Para simular un entorno web real):**
   - Si tienes Node.js instalado, puedes levantar un servidor local en esta carpeta ejecutando en tu terminal:
     ```bash
     npx http-server ./
     ```
   - Abre la dirección que te indique la terminal (usualmente `http://localhost:8080`) en tu navegador.

---

## Credenciales de Acceso al CMS

Para acceder al Panel Administrativo desde el botón **"Panel Admin"** en la cabecera o el pie de página, utiliza las siguientes credenciales por defecto:

- **Usuario:** `admin`
- **Contraseña:** `admin123`

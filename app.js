document.addEventListener('DOMContentLoaded', initializeApp);

/**
 * Inicializa la aplicación: carga datos, configura listeners e inicia la UI.
 */
async function initializeApp() {
    // 1. Cargar datos desde data.json
    let webData = {};
    try {
        // Usamos fetch para cargar el archivo JSON
        const response = await fetch('data.json');
        if (!response.ok) {
            throw new Error(`Error HTTP! estado: ${response.status}. Asegúrate que data.json exista.`);
        }
        webData = await response.json();
    } catch (error) {
        console.error("Error al cargar data.json:", error);
        // Mostrar un mensaje de error si los datos no se cargan
        document.getElementById('content-display').innerHTML = '<div class="text-center py-5"><h2 class="text-danger">Error de Carga</h2><p class="text-white-50">No se pudieron cargar los datos de los productos (data.json).</p></div>';
        return; // Detener la inicialización si hay un error
    }

    // 2. Elementos del DOM
    const navLinks = document.querySelectorAll('.nav-link-custom');

    // 3. Establecer el año actual en el footer
    document.getElementById('current-year').textContent = new Date().getFullYear();

    // 4. Configurar Event Listeners
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const sectionId = this.getAttribute('data-section');
            
            if (webData[sectionId]) {
                renderContent(sectionId, webData);
            } else {
                console.warn(`Datos no encontrados para la sección: ${sectionId}`);
            }

            // Manejar la clase 'active-section' para el efecto visual
            navLinks.forEach(nav => nav.classList.remove('active-section'));
            this.classList.add('active-section');
        });
    });

    // 5. Cargar la sección de inicio al cargar la página
    const initialSectionId = 'quienes-somos';
    if (webData[initialSectionId]) {
        renderContent(initialSectionId, webData);
        const initialLink = document.querySelector(`[data-section="${initialSectionId}"]`);
        if (initialLink) {
            initialLink.classList.add('active-section');
        }
    }
}


/**
 * Renderiza el contenido en el DOM basándose en el ID de la sección y los datos.
 * @param {string} sectionId - El ID de la sección a renderizar (ej: 'poleras').
 * @param {Object} dataStore - El objeto de datos cargado (webData).
 */
function renderContent(sectionId, dataStore) {
    const data = dataStore[sectionId];
    const contentDisplay = document.getElementById('content-display');
    
    // Crear el contenido HTML dinámicamente
    const contentHTML = `
        <!-- Panel Izquierdo (Imagen) -->
        <div class="col-lg-5 mb-4 mb-lg-0 left-panel">
            <img src="${data.image}" class="img-fluid shadow-lg" alt="${data.title}">
        </div>

        <!-- Panel Derecho (Info y Técnicas) -->
        <div class="col-lg-7 right-panel">
            <div class="p-3">
                <h1 class="display-5 fw-bold text-light">${data.title}</h1>
                <p class="lead text-white-50">${data.description}</p>
                ${data.price ? `<p class="fs-4 text-warning">Precio desde: <strong class="text-white">${data.price}</strong></p>` : ''}
            </div>
            <h3 class="fw-bold text-light"> Nuestras Técnicas Utilizadas</h3>

            <!-- Divs de Footer de Técnicas (Sublimación, DTF, UV) -->
            <div class="technique-footer row g-3 mt-4">
                <div class="col-md-4">
                <svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" fill="#FFFF55"><path d="M437-438v-86h85v86h-85Zm-86 86v-86h86v86h-86Zm171 0v-86h86v86h-86Zm86-86v-86h86v86h-86Zm-342 0v-86h85v86h-85Zm-86 318q-24.75 0-42.37-17.63Q120-155.25 120-180v-600q0-24.75 17.63-42.38Q155.25-840 180-840h600q24.75 0 42.38 17.62Q840-804.75 840-780v600q0 24.75-17.62 42.37Q804.75-120 780-120H180Zm86-60h85v-86h-85v86Zm171 0h85v-86h-85v86Zm343 0v-86 86Zm-600-86h86v-86h85.33v86h85.34v-86H522v86h86v-86h86v86h86v-86h-86v-86h86v-342H180v342h86v86h-86v86Zm0 86v-600 600Zm600-258v86-86ZM608-266v86h86v-86h-86Z"/></svg>
                    <div class="technique-box shadow-lg">
                         <div class="technique-text">
                            <strong>SUBLIMACIÓN</strong>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                <svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" fill="#8C1AF6"><path d="M220-120q-24 0-42-18t-18-42v-210h60v210h520v-210h60v210q0 24-18 42t-42 18H220ZM80-450v-60h80v-270q0-24 18-42t42-18h520q24 0 42 18t18 42v270h80v60H80Zm660 270H220h520Z"/></svg>
                    <div class="technique-box shadow-lg">
                        <div class="technique-text">
                            <strong>IMPRESIÓN DTF</strong>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                <svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" fill="#75FB4C"><path d="M360-80q-46 0-78-32t-32-78q0-46 32-78t78-32q46 0 78 32t32 78q0 46-32 78t-78 32Zm169-132q-6-46-33.5-81.5T427-346l132-134H226q-29 0-47.5-23T160-556q0-18 9-33t24-24l498-300q14-9 30.5-4.5T746-899q8 14 4.5 30.5T733-844L314-590h420q27 0 46.5 19.5T800-524q0 17-4 32.5T781-465L529-212Z"/></svg>   
                    <div class="technique-box shadow-lg">
                         <div class="technique-text">
                            <strong>IMPRESIÓN UV</strong>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Aplicar transición de opacidad (fade out/in)
    const container = contentDisplay.closest('.content-container');
    container.style.opacity = 0;

    setTimeout(() => {
        contentDisplay.innerHTML = contentHTML;
        container.style.opacity = 1;
    }, 250); 
}

// Función para inyectar skeleton loader mientras se descarga el contenido
function mostrarSkeleton(id) {
    const contenedor = document.getElementById(id);
    if (!contenedor) return;

    if (id === "perfil") {
        contenedor.innerHTML = `
            <div class="sidebar-block" style="text-align: center;">
                <div class="skeleton skeleton-avatar"></div>
                <div class="skeleton skeleton-title" style="width: 80%; margin: 0 auto 10px;"></div>
                <div class="skeleton skeleton-text" style="width: 50%; margin: 0 auto;"></div>
            </div>
        `;
    } else if (id === "contacto") {
        contenedor.innerHTML = `
            <div class="sidebar-block">
                <div class="skeleton skeleton-title" style="width: 40%; margin-bottom: 20px;"></div>
                <div class="skeleton skeleton-text" style="margin-bottom: 12px;"></div>
                <div class="skeleton skeleton-text" style="margin-bottom: 12px;"></div>
                <div class="skeleton skeleton-text" style="margin-bottom: 12px;"></div>
            </div>
        `;
    } else {
        contenedor.innerHTML = `
            <div class="section-card">
                <div class="skeleton skeleton-title"></div>
                <div class="skeleton skeleton-text"></div>
                <div class="skeleton skeleton-text"></div>
                <div class="skeleton skeleton-text" style="width: 70%;"></div>
            </div>
        `;
    }
}

// Función principal para cargar vistas de manera asíncrona
function cargarVista(id, archivo) {
    mostrarSkeleton(id);

    // Pequeño retardo artificial opcional de 200ms para apreciar la transición de carga shimmer
    setTimeout(() => {
        fetch(archivo)
            .then(res => {
                if (!res.ok) {
                    throw new Error("No se pudo cargar: " + archivo);
                }
                return res.text();
            })
            .then(html => {
                const contenedor = document.getElementById(id);
                if (contenedor) {
                    contenedor.innerHTML = html;
                }
            })
            .catch(err => {
                console.error(err.message);
                const contenedor = document.getElementById(id);
                if (contenedor) {
                    contenedor.innerHTML = `
                        
                    `;
                }
            });
    }, 150);
}

// Inicialización de la carga de vistas dinámicas
document.addEventListener("DOMContentLoaded", () => {
    cargarVista("perfil", "vistas/perfil.html");
    cargarVista("contacto", "vistas/contacto.html");
    cargarVista("experiencia", "vistas/experiencia.html");
    cargarVista("trayectoria", "vistas/trayectoria.html");
    cargarVista("educacion", "vistas/educacion.html");
    cargarVista("habilidades", "vistas/habilidades.html");
    cargarVista("gustos", "vistas/gustos.html");
    cargarVista("referencias", "vistas/referencias.html");

    // Lógica del switch de Modo Claro / Oscuro
    const themeToggleBtn = document.getElementById("theme-toggle");
    if (themeToggleBtn) {
        const themeIcon = themeToggleBtn.querySelector("i");

        // Detectar si el usuario ya tenía preferencia guardada o el sistema prefiere modo oscuro
        const savedTheme = localStorage.getItem("theme");
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

        if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
            document.body.classList.add("dark-mode");
            document.body.classList.remove("light-mode");
            themeIcon.classList.replace("fa-moon", "fa-sun");
        } else {
            document.body.classList.add("light-mode");
            document.body.classList.remove("dark-mode");
            themeIcon.classList.replace("fa-sun", "fa-moon");
        }

        // Evento de clic en el botón de tema
        themeToggleBtn.addEventListener("click", () => {
            if (document.body.classList.contains("dark-mode")) {
                document.body.classList.replace("dark-mode", "light-mode");
                localStorage.setItem("theme", "light");
                themeIcon.classList.replace("fa-sun", "fa-moon");
            } else {
                document.body.classList.replace("light-mode", "dark-mode");
                localStorage.setItem("theme", "dark");
                themeIcon.classList.replace("fa-moon", "fa-sun");
            }
        });
    }
});

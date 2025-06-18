const API_URL = "https://lamangacheria-6iwm.onrender.com/comentarios/";

document.getElementById("comentarioForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const autor = document.getElementById("autor").value.trim();
    const contenido = document.getElementById("contenido").value.trim();

    if (!autor || !contenido) return;

    try {
        const res = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ autor, contenido })
        });

        if (res.ok) {
            document.getElementById("comentarioForm").reset();
            cargarComentarios();
        } else {
            alert("Error al enviar el comentario.");
        }
    } catch (error) {
        console.error("Error al enviar:", error);
    }
});

function formatearFecha(fechaISO) {
    const fecha = new Date(fechaISO);
    return fecha.toLocaleString("es-PE", {
        dateStyle: "medium",
        timeStyle: "short"
    });
}

async function cargarComentarios() {
    try {
        const res = await fetch(API_URL);
        console.log("Status:", res.status);
        const datos = await res.json();
        console.log("Datos recibidos:", datos); // <== AÑADE ESTO

        const contenedor = document.getElementById("comentariosLista");
        contenedor.innerHTML = "";

        datos.reverse().forEach(item => {
            console.log("Agregando:", item); // <== AÑADE ESTO
            const div = document.createElement("div");
            div.classList.add("comentario-item", "mb-4", "p-3", "rounded");
            div.innerHTML = `
                <div class="d-flex justify-content-between align-items-center mb-2">
                    <h6 class="fw-bold mb-0">${item.autor}</h6>
                    <small class="text-muted">${formatearFecha(item.creado_en)}</small>
                </div>
                <p class="mb-0">${item.contenido}</p>
            `;
            contenedor.appendChild(div);
        });
    } catch (error) {
        console.error("Error al cargar comentarios:", error);
    }
}

window.addEventListener("DOMContentLoaded", cargarComentarios);
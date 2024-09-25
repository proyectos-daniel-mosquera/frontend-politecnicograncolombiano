var url_backend = '../backend/';
var testimonioActual = 0;
var testimonios = [];

// Función para obtener testimonios
async function obtenerTestimonios() {
    try {
        const response = await fetch(url_backend + 'testimonios.json'); // Asegúrate de que esta ruta sea correcta
        if (!response.ok) {
            throw new Error('Error en la red');
        }
        const data = await response.json();
        testimonios = data.testimonios;
        mostrarTestimonios(data.testimonios);
    } catch (error) {
        console.error('Error al obtener los testimonios:', error);
    }
}

function mostrarTestimonios(testimonios) {
    const contenedor = document.getElementById('testimonios-contenedor');
    contenedor.innerHTML = '';

    // Obtener el testimonio actual
    const testimonio = testimonios[testimonioActual];
    const div = document.createElement('div');
    const estrellas = rellenarEstrellas(testimonio.puntuacion);
    const circulos = generarCirculos();
    div.classList.add('testimonio');

    div.innerHTML = `
        <h3>${testimonio.nombre}</h3>
        <p>${testimonio.comentario}</p>
        <p>Puntuación: <span id="estrellas"> ${estrellas}</span></p>
        <p>Fecha: ${testimonio.fecha}</p>
        <div id="circulos">${circulos}</div>
    `;
    contenedor.appendChild(div);
}

function rellenarEstrellas(puntaje) {
    let estrellas = "";
    for (let i = 1; i <= 5; i++) {
        if (i <= puntaje) {
            estrellas += '<i class="fa-solid fa-star estrella-completa"></i>';
        } else {
            estrellas += '<i class="fa-regular fa-star"></i>';
        }
    }
    return estrellas;
}

function generarCirculos() {
    var circulos = "";
    for (let i = 0; i < testimonios.length; i++) {
        clase = i == testimonioActual ? 'solid' : 'regular';
        circulos += '<i class="fa-' + clase + ' fa-circle circulo-testimonio" data-index="' + i + '"></i>';
    }
    return circulos;
}


document.getElementById('testimonios-contenedor').addEventListener('click', (event) => {
    if (event.target.classList.contains('circulo-testimonio')) {
        const circulo = event.target;
        const index = circulo.getAttribute('data-index');
        testimonioActual = index;
        mostrarTestimonios(testimonios);
    }
});


// Llamar a la función para obtener los testimonios al cargar la página
document.addEventListener('DOMContentLoaded', obtenerTestimonios);

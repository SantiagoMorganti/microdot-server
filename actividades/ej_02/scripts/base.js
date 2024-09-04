// Función para alternar el estado de un LED al hacer clic en el botón correspondiente
function toggleLED(ledNumber) {
    fetch(`/toggle/${ledNumber}`) // Envía una solicitud al servidor para alternar el LED
        .then(response => response.text())
        .then(data => console.log(data)) // Muestra la respuesta en la consola
        .catch(error => console.error('Error:', error)); // Maneja errores en la solicitud
}

// Función para establecer el color de la tira LED WS2818B al cambiar el color en el selector
function setLEDColor() {
    const color = document.getElementById('ledColor').value; // Obtiene el color seleccionado
    fetch(`/set_color?color=${encodeURIComponent(color)}`) // Envía el color seleccionado al servidor
    .then(response => response.text())
        .then(response => response.text())
        .then(data => console.log(data)) // Muestra la respuesta en la consola
        .catch(error => console.error('Error:', error)); // Maneja errores en la solicitud
}

// Función para mostrar la fecha actual en el pie de página
window.onload = function() {
    const fecha = new Date();
    document.getElementById('fecha').textContent = fecha.toLocaleDateString(); // Muestra la fecha en formato local
}


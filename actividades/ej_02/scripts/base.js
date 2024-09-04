function toggleLED(ledNumber) {
    fetch(`/toggle/${ledNumber}`)
        .then(response => response.text())
        .then(data => console.log(data))
        .catch(error => console.error('Error:', error));
}

function setLEDColor() {
    const color = document.getElementById('ledColor').value;
    fetch(`/set_color?color=${encodeURIComponent(color)}`)
        .then(response => response.text())
        .then(data => console.log(data))
        .catch(error => console.error('Error:', error));
}

window.onload = function() {
    const fecha = new Date();
    document.getElementById('fecha').textContent = fecha.toLocaleDateString();
}


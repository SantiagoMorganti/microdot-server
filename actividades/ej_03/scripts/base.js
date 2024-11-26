document.addEventListener('DOMContentLoaded', () => {
    const fechaElemento = document.getElementById('fecha');
    const fechaActual = new Date(document.lastModified);
    const opcionesFecha = { year: 'numeric', month: 'long', day: 'numeric' };
    fechaElemento.textContent = fechaActual.toLocaleDateString('es-ES', opcionesFecha);

    const slider = document.getElementById('setpoint-slider');
    const setpointValue = document.getElementById('setpoint-value');
    const sensorTemperature = document.getElementById('sensor-temperature');
    const buzzerStatus = document.getElementById('buzzer-status');

    const updateTemperature = () => {
        fetch('/temperature')
            .then(response => response.json())
            .then(data => {
                sensorTemperature.textContent = `${data.temperature}`;
            });
    };

    const updateBuzzerStatus = () => {
        fetch('/buzzer')
            .then(response => response.json())
            .then(data => {
                buzzerStatus.textContent = data.buzzer_status ? 'Activado' : 'Desactivado';
            });
    };

    slider.addEventListener('input', () => {
        setpointValue.textContent = `${slider.value}°C`;
    });

    slider.addEventListener('change', () => {
        fetch('/setpoint', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ setpoint: slider.value })
        });
    });

    setInterval(updateTemperature, 2000); // Actualiza cada 2 segundos
    setInterval(updateBuzzerStatus, 2000); // Actualiza cada 2 segundos
});

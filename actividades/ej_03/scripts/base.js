document.addEventListener('DOMContentLoaded', () => {
    const fechaElemento = document.getElementById('fecha');
    const fechaActual = new Date(document.lastModified);
    const opcionesFecha = { year: 'numeric', month: 'long', day: 'numeric' };
    fechaElemento.textContent = fechaActual.toLocaleDateString('es-ES', opcionesFecha);

    const setpointSlider = document.getElementById('setpoint-slider');
    const setpointValue = document.getElementById('setpoint-value');
    const sensorTemperature = document.getElementById('sensor-temperature');
    const buzzerStatus = document.getElementById('buzzer-status');

    // Actualizar el valor visual del slider
    setpointSlider.addEventListener('input', () => {
        setpointValue.textContent = `${setpointSlider.value}°C`;
    });

    // Enviar el valor del setpoint al servidor al soltar el slider
    setpointSlider.addEventListener('change', () => {
        fetch(`/setpoint/set/${setpointSlider.value}`)
            .then(response => {
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                return response.json();
            })
            .then(data => {
                console.log('Setpoint actualizado:', data);
            })
            .catch(error => {
                console.error('Error al actualizar el setpoint:', error);
            });
    });

    // Función para actualizar los datos periódicamente
    function actualizarDatos() {
        // Actualizar la temperatura del sensor
        fetch('/sensors/ds18b20/read')
            .then(response => {
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                return response.json();
            })
            .then(data => {
                sensorTemperature.textContent = `${data.temperature}°C`;
            })
            .catch(error => {
                console.error('Error al obtener la temperatura:', error);
            });

        // Actualizar el estado del buzzer
        fetch('/buzzer/status')
            .then(response => {
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                return response.json();
            })
            .then(data => {
                buzzerStatus.textContent = data.buzzer;
            })
            .catch(error => {
                console.error('Error al obtener el estado del buzzer:', error);
            });
    }

    // Llamar a actualizarDatos cada 2 segundos
    setInterval(actualizarDatos, 2000);
});

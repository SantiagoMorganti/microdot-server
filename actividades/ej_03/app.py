from microdot import Microdot, send_file
from machine import Pin
import ds18x20
import onewire
import time

# Configuración del hardware
buzzer_pin = Pin(14, Pin.OUT)
ds_pin = Pin(19)
ds_sensor = ds18x20.DS18X20(onewire.OneWire(ds_pin))
temperatureCelsius = 24  # Valor inicial simulado
setpoint_temperature = 15  # Setpoint inicial

# Inicialización del servidor
app = Microdot()

@app.route('/')
async def index(request):
    """Devuelve la página principal."""
    return send_file('index.html')

@app.route('/scripts/<path:file>')
async def serve_scripts(request, file):
    """Sirve archivos JavaScript desde el directorio scripts."""
    return send_file(f'scripts/{file}')

@app.route('/styles/<path:file>')
async def serve_styles(request, file):
    """Sirve archivos CSS desde el directorio styles."""
    return send_file(f'styles/{file}')

@app.route('/sensors/ds18b20/read')
async def temperature_measuring(request):
    """Lee la temperatura del sensor DS18B20."""
    global ds_sensor, temperatureCelsius
    ds_sensor.convert_temp()
    time.sleep_ms(750)  # Tiempo necesario para que el sensor procese la temperatura
    roms = ds_sensor.scan()
    if roms:
        temperatureCelsius = ds_sensor.read_temp(roms[0])
    return {'temperature': round(temperatureCelsius, 1)}

@app.route('/setpoint/set/<int:value>')
async def setpoint_calculation(request, value):
    """Configura el setpoint y actualiza el estado del buzzer."""
    global setpoint_temperature, temperatureCelsius
    setpoint_temperature = value

    # Actualiza el estado del buzzer según la comparación con el setpoint
    if temperatureCelsius > setpoint_temperature:
        buzzer_pin.on()
        return {'buzzer': 'Encendido'}
    else:
        buzzer_pin.off()
        return {'buzzer': 'Apagado'}

@app.route('/buzzer/status')
async def buzzer_status(request):
    """Devuelve el estado actual del buzzer."""
    return {'buzzer': 'Encendido' if buzzer_pin.value() else 'Apagado'}

# Manejo de rutas no encontradas
@app.errorhandler(404)
def not_found(request):
    """Devuelve un JSON válido para rutas no encontradas."""
    return {'error': 'Ruta no encontrada'}, 404

# Arranque del servidor en el puerto 80
app.run(port=80)

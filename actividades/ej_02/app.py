from microdot import Microdot, send_file
from machine import Pin
import esp

# Configuración de pines para los LEDs
led1 = Pin(32, Pin.OUT)
led2 = Pin(33, Pin.OUT)
led3 = Pin(25, Pin.OUT)

app = Microdot() # Inicialización de la aplicación web

@app.route('/')
async def index(request):
    return send_file('index.html') # Enviar la página HTML principal al cliente


@app.route('/toggle/<int:led_number>')
async def toggle_led(request, led_number):
     # Alterna el estado del LED correspondiente
    if led_number == 1:
        led1.value(not led1.value())
    elif led_number == 2:
        led2.value(not led2.value())
    elif led_number == 3:
        led3.value(not led3.value())
    return f'LED {led_number} toggled' # Respuesta al cliente confirmando la acción

@app.route('/set_color')
async def set_color(request):
    # Obtiene el color elegido por el usuario para la tira LED WS2818B
    color = request.args.get('color', '#ffffff')
    # Aquí se podría agregar la lógica para cambiar el color de la tira LED
    return f'Color set to {color}' # Respuesta al cliente confirmando el color

@app.route('/<dir>/<file>')
async def serve_file(request, dir, file):
    return send_file(f"/{dir}/{file}")

app.run(port=80)


var canvas = document.getElementById("micanvas");
var ctx = canvas.getContext("2d");

// Varibles canvas:
var xCanvas = 0;
var yCanvas = 0;
// Variables pelota:
var radio = 25;
var angInicio = 0;
var angFinal = Math.PI*2;
var xPelota = xCanvas + canvas.width/2;
var yPelota = yCanvas + canvas.height-30;
var dxPelota = 2;
var dyPelota = -2;
var velocidad = 5;
// Variables raqueta:
var alturaRaqueta = 100;
var anchuraRaqueta = 20;
var xRaqueta = xCanvas;
var yRaqueta = yCanvas + canvas.height/2 - alturaRaqueta/2;
var estadoRaqueta = 0;  // 0: parada; 1: arriba; -1: abajo.
// Variables marcador:
var puntuacion = 0;
var xMarcador = xCanvas + 8
var yMarcador = yCanvas + 20;
// Variables vidas:
var vidas = 3;
var xVidas = xCanvas + 120;
var yVidas = yCanvas + 20;


//init(canvas);

if (canvas && canvas.getContext) {  // Se comprueba que el navegador es compatible.
    // Dos "escuchadores de eventos" (event listeners) para "escuchar" las pulsaciones de las teclas:
    document.addEventListener("keydown", keyDownHandler, 0);
    document.addEventListener("keyup", keyUpHandler, 0);
    var juego = setInterval(pintar, velocidad);   // Se repite cada 'velocidad' ms.
} else {
     alert("Error. Navegador no compatible!");
}
    
/*function init(canvas) {
    xCanvas = 0;
    yCanvas = 0;
}*/

function keyDownHandler(e) {
    if(e.keyCode == 65) {   // 65 es el código de la letra 'a'.
        estadoRaqueta = 1;
    }
    else if(e.keyCode == 90) {  // 90 es el código de la letra 'z'.
        estadoRaqueta = -1;
    }
}

function keyUpHandler(e) {
    if(e.keyCode == 65) {
        estadoRaqueta = 0;
    }
    else if(e.keyCode == 90) {
        estadoRaqueta = 0;
    }
}

function pintarPelota() {
    ctx.beginPath();
    ctx.arc(xPelota, yPelota, radio, angInicio, angFinal);
    ctx.fillStyle = "#FF0188";
    ctx.fill();
    ctx.closePath();
}

function pintarRaqueta(x, y) {
    ctx.beginPath();
    ctx.fillStyle = "#F8F32B";
    ctx.fillRect(x, y, anchuraRaqueta, alturaRaqueta);
    ctx.fill();
    ctx.closePath();
}

function pintarMarcador() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#FFFFFF";
    ctx.fillText("Marcador: " + puntuacion, xMarcador, yMarcador);
}

function pintarVidas() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#00D5B8";
    ctx.fillText("Vidas: " + vidas, xVidas, yVidas);
}

function pintar() {
    ctx.clearRect(xCanvas, yCanvas, canvas.width, canvas.height);
    pintarPelota();
    pintarRaqueta(xRaqueta, yRaqueta);
    pintarMarcador();
    pintarVidas();
    //botonJugar();
    // Se comprueba antes de sumar el desplazamiento si la nueva posición quedaría fuera de los límites del canvas (quitamos el radio para que no "absorba" parte de la pelota al rebotar:
    if (yPelota + dyPelota > canvas.height - radio || yPelota + dyPelota < radio) {    // Bordes superior e inferior.
        dyPelota = -dyPelota;
    } 
    if (xPelota + dxPelota > canvas.width - radio) { // Borde derecho.
        dxPelota = -dxPelota; 
    } else if (xPelota + dxPelota < radio) {    // Borde izquierdo.
        if (yPelota > yRaqueta && yPelota < yRaqueta + alturaRaqueta) { // Si toca raqueta, concretamente si el centro de la bola está entre los límites de ésta.
            dxPelota = -dxPelota;
            puntuacion++;
        } else {    // Si no toca raqueta.
            vidas--;
            if (vidas == 0) {
                alert("GAME OVER");
                document.location.reload();
            } else {
                // Pelota y raqueta a la velocidad inincial:
                xPelota = xCanvas + canvas.width/2;
                yPelota = yCanvas + canvas.height-30;
                dxPelota = 2;
                dyPelota = -2;
                xRaqueta = xCanvas;
                yRaqueta = yCanvas + canvas.height/2 - alturaRaqueta/2;
            }
        }
    }
    xPelota += dxPelota;
    yPelota += dyPelota;
    
    // Se comprueba si se están pulsando las flechas y si la raqueta está en los límites del canvas:
    if (estadoRaqueta == 1 && yRaqueta > 0) {
        yRaqueta -= 7;
    } else if (estadoRaqueta == -1 && yRaqueta < canvas.height - alturaRaqueta) {
        yRaqueta += 7;
    }
}

function botonJugar() {
    var juego = setInterval(pintar, velocidad);   // Se repite cada 'velocidad' ms.
}

function botonFin() {
    document.location.reload();
    alert("Fin del juego");
}
    
function finJuego() {
  clearInterval(juego);
}



// *********************************************************************

/*
var elemCanvas = document.getElementById('micanvas');   // Se recupera el objeto que representa el canvas (mediante DOM, por su id).
var contexto = elemCanvas.getContext('2d'); // Se recupera el “contexto 2D” de este canvas (necesario para poder pintar).

// Varibles canvas:
var colorCanvas = 'green';
var anchuraCanvas = 400;
var alturaCanvas = 400;
// Posición donde comienza el canvas:
var xCanvas = 0;
var yCanvas = 0;

// Variables pelota:
var radio = 30;
var angInicio = 0;  // Donde se empieza a dibujar la pelota.
var angfinal = Math.PI*2;   // Donde se termina de dibujar la pelota.
var sentido = false;    // Sentido horario.
// Se define la posicón de salida de la pelota a través del tamaño del canvas:
var xPelota = elemCanvas.width/2;
var yPelota = elemCanvas.height-30;
// Se definen los valores del desplazamiento de la pelota:
var dxPelota = 2;
var dyPelota = -2;

init();

    
function init() {
    
    if (elemCanvas && elemCanvas.getContext) {  // Se comprueba que el navegador es compatible.
    
        // Se inicializa el canvas:
        contexto.fillStyle = colorCanvas;
        contexto.fillRect(xCanvas, yCanvas, anchuraCanvas, alturaCanvas); // Se pinta un canvas rectangular.
        
        setInterval(pintar, 10);    // Se llama a la función pintar cada 10ms.

    } else {
    
        alert("Error. Navegador no compatible!");
    
    }
    
}

function pintar() {
    
    // Se rellena la bola en 3D:
    var radgrad = contexto.createRadialGradient(xPelota-7,yPelota-7,radio-20,xPelota,yPelota,radio);
    radgrad.addColorStop(0, '#FF5F98');
    radgrad.addColorStop(0.75, '#FF0188');
    radgrad.addColorStop(1, 'rgba(255,1,136,0)');
    contexto.fillStyle = radgrad;
    // Se borra el canvas antes de pintar la pelota:
    //borrarCanvas();
    // Se pinta la bola en sí:
    contexto.beginPath();
    contexto.arc(xPelota, yPelota, radio, angInicio, angFinal, sentido);
    //contexto.fillStyle = "FF0188";    // Color de la bola cuando la pintamos sin 3D.
    contexto.fill();
    contexto.closePath();
    // Se añaden estas líneas para provocar el movimiento:
    xPelota += dxPelota;
    yPelota += dyPelota;

}

function borrarCanvas() {

    contexto.clearRect(xCanvas, yCanvas, elemCanvas.width, elemCanvas.height);   // Se borra el canvas.
    //contexto.save();    // Se guarda el estado del canvas. Sólo si se cambia de estilo o se hacen transformaciones.

}
*/
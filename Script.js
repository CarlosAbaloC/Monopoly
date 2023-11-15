var dinero1 = 3000;
var dinero2 = 3000;
let totalCajas = document.getElementsByClassName("casilla").length;
let mensaje = document.getElementById("mensajeMovimiento");


function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    var targetElement = ev.target;

    if (targetElement.tagName.toLowerCase() === 'img') {
        return;
    }

    if ((targetElement.id === 'jugador1' || targetElement.parentElement.id === 'jugador1') && dinero1 >=500) {
        document.getElementById('jugador1').appendChild(document.getElementById(data));
        mensaje.textContent = "Ficha colocada en el Jugador 1";
        dinero1 = dinero1 - 500;
    } else if (targetElement.id === 'jugador2' || targetElement.parentElement.id === 'jugador2' && dinero2 >= 500) {
        document.getElementById('jugador2').appendChild(document.getElementById(data));
        mensaje.textContent = "Ficha colocada en el Jugador 2";
        dinero2 = dinero2 - 500;
    }

    
}
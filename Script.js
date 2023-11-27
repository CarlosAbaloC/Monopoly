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

    // Encuentra el contenedor de jugador (j1 o j2) desde el targetElement
    while (targetElement && !targetElement.id.startsWith('j')) {
        targetElement = targetElement.parentElement;
    }

    if (!targetElement) {
        // No se encontró el contenedor del jugador
        return;
    }

    var jugadorId = targetElement.id;

    if (jugadorId === 'jugador1') {
        targetElement.appendChild(document.getElementById(data));
        dinero1 = dinero1 - 500;
    } else if (jugadorId === 'jugador2') {
        targetElement.appendChild(document.getElementById(data));
        dinero2 = dinero2 - 500;
    }

    
}



function dragable(casilla)  {
    //alert("Esta es la posicion de la casilla " + casilla);

    var elementoPrincipal = document.getElementById(casilla);

    for (var propiedad in elementoPrincipal) {
        if (elementoPrincipal.hasOwnProperty(propiedad)) {
            console.log(propiedad + ": " + elementoPrincipal[propiedad]);
        }
    }

    var img = elementoPrincipal.querySelector(".fila2 img");

    img.setAttribute("draggable", "true");
}

function nodragable(casilla)  {
    //alert("Sales de la casilla " + casilla);

    var elementoPrincipal = document.getElementById(casilla);

    for (var propiedad in elementoPrincipal) {
        if (elementoPrincipal.hasOwnProperty(propiedad)) {
            console.log(propiedad + ": " + elementoPrincipal[propiedad]);
        }
    }

    var img = elementoPrincipal.querySelector(".fila2 img");

    img.setAttribute("draggable", "false");
}


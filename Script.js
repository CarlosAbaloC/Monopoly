var dinero1;
var dinero2;
//Hay que hacerlo dos veces porque let y const son variables de "bloque"
let totalCasillas = document.getElementsByClassName("casilla").length;

let mensaje = document.getElementById("mensajeMovimiento");
var dineroComunidad = 0;
let fondo;
let puntuacion;
let cartaJSON;
var dinero;

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev, padre) {
    //Text y parent son las claves para luego encontrarlo en el drop
    ev.dataTransfer.setData("text", ev.target.id);
    ev.dataTransfer.setData("padre", padre );
}

function drop(ev) {
    ev.preventDefault();
    //Obtiene los datos de la carta copiada
    var data = ev.dataTransfer.getData("text");
    var datoPadre = ev.dataTransfer.getData("padre");
    console.log("Soltando en:", ev.target.id);
    console.log("ID del elemento arrastrado:", ev.dataTransfer.getData("text"));
    console.log("ID del padre:", ev.dataTransfer.getData("padre"));

    var targetElement = ev.target;
    var casilla = ev.target.id;
    //Copia el objeto arrastrado
    //debugger;
    var copiaImg = document.getElementById(datoPadre).cloneNode(true);
    copiaImg.id = "copia" + data; //Tiene el mismo id pero con copia delante
    copiaImg.draggable = false; //Para quitar el drag
    var idCambio = "copia" + data;
    document.getElementById("carta3").setAttribute("id", idCambio);
    document.getElementById(idCambio).setAttribute("draggable", false);

    //Donde la guarda
    document.getElementById(casilla).appendChild(copiaImg);

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
        
    } else if (jugadorId === 'jugador2') {
        targetElement.appendChild(document.getElementById(data));
        
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

function arrayCartas(funcion, boton) {
    document.getElementById(boton);
    let listaCartas = [
        { id:2, calle:{nombre:"Avenida de america", cFondo:"red", sCasa:18, cUno:90, cDos:250, cTres:700, cCuatro:875, hotel:1050, pCasa:150, pHotel:150, pCasilla:1}},
        { id:4, calle:{nombre:"Calle Maria de Molina", cFondo: "red", sCasa:18, cUno:90, cDos:250, cTres:700, cCuatro:875, hotel:1050, pCasa:150, pHotel:150, pCasilla:1}},
        { id:5, calle:{nombre:"Calle Bailén", cFondo: "yellow", sCasa:22, cUno:110, cDos:330, cTres:800, cCuatro:975, hotel:1150, pCasa:150, pHotel:150, pCasilla:1}},
        { id:7, calle:{nombre:"Plaza de España", cFondo: "yellow", sCasa:24, cUno:120, cDos:360, cTres:850, cCuatro:1025, hotel:1200, pCasa:150, pHotel:150, pCasilla:1}},
        { id:28, calle:{nombre:"Calle Serrano", cFondo: "orange", sCasa:14, cUno:70, cDos:200, cTres:550, cCuatro:750, hotel:950, pCasa:100, pHotel:100, pCasilla:1}},
        { id:9, calle:{nombre:"Puerta del Sol", cFondo: "green", sCasa:26, cUno:130, cDos:390, cTres:900, cCuatro:16100, hotel:1275, pCasa:200, pHotel:200, pCasilla:1}},
        { id:26, calle:{nombre:"Calle Velázquez", cFondo: "orange", sCasa:16, cUno:80, cDos:220, cTres:600, cCuatro:800, hotel:1000, pCasa:100, pHotel:100, pCasilla:1}},
        { id:11, calle:{nombre:"Calle Alcalá", cFondo: "green", sCasa:26, cUno:130, cDos:390, cTres:900, cCuatro:1100, hotel:1275, pCasa:200, pHotel:200, pCasilla:1}},
        { id:25, calle:{nombre:"Calle Alberto Aguilera", cFondo: "purple", sCasa:10, cUno:50, cDos:150, cTres:450, cCuatro:625, hotel:750, pCasa:100, pHotel:100, pCasilla:1}},
        { id:23, calle:{nombre:"Glorieta de bilbao", cFondo: "purple", sCasa:10, cUno:50, cDos:150, cTres:450, cCuatro:625, hotel:750, pCasa:100, pHotel:100, pCasilla:1}},
        { id:14, calle:{nombre:"Paseo del prado", cFondo: "darkblue", sCasa:50, cUno:200, cDos:600, cTres:1400, cCuatro:1700, hotel:2000, pCasa200:200, pHotel:200, pCasilla:1}},
        { id:21, calle:{nombre:"Avenida reina Victoria", cFondo: "lightblue", sCasa:6, cUno:30, cDos:90, cTres:270, cCuatro:400, hotel:550, pCasa:50, pHotel:50, pCasilla:1}},
        { id:19, calle:{nombre:"Glorieta cuatro caminos", cFondo: "lightblue", sCasa:6, cUno:30, cDos:90, cTres:270, cCuatro:400, hotel:550, pCasa:50, pHotel:50, pCasilla:1}},
        { id:18, calle:{nombre:"Plaza Lavapies", cFondo: "darkbrown", sCasa:4, cUno:20, cDos:60, cTres:180, cCuatro:320, hotel:450, pCasa:50, pHotel:50, pCasilla:1}},
        { id:16, calle:{nombre:"Ronda de Valencia", cFondo: "darkbrown", sCasa:2, cUno:10, cDos:30, cTres:90, cCuatro:160, hotel:250, pCasa:50, pHotel:50, pCasilla:1}}
    ];

    switch(funcion) {
        case "1":   var carta = listaCartas.find(item => item.id.toString() === boton).calle;
                    cartaJSON = JSON.stringify(carta);
                    alert(JSON.stringify(carta));
                    ventanaCarta(boton, cartaJSON);
                    break;
        case "2":   
                    break;
        case "3":   var carta = listaCartas.find(item => item.id.toString() === boton).calle;
                    cartaJSON = JSON.stringify(carta);
                    alert(JSON.stringify(carta));
                    break;
    }
    



  

    alert("Has pulsado en el elemento: " + boton);
}
function ventanaCarta(boton, carta) {
    //Medir el tamaño de la pantalla
    const anchoPantalla = window.screen.width;
    const altoPantalla = window.screen.height;

    //Centrar las ventanas   
    const posicionX = (anchoPantalla - 400) / 2; //Para coger el ancho y alto
    const posicionY = (altoPantalla - 400) / 2;

    //El encode es para evitar caracteres especiales y codificar datos sensibles
    window.open(`carta.html?id=${boton}&carta=${encodeURIComponent(carta)}`, '_blank', `width=300,height=400,left=${posicionX},top=${posicionY}`);

  
    /*
    window.open(`carta.html?id=${boton}&sCasa=${carta.sCasa}&cUno=${carta.cUno}
    &cDos=${carta.cDos}&cTres=${carta.cTres}&cCuatro=${carta.cCuatro}
    &hotel=${carta.hotel}&pCasa=${carta.pCasa}&pHotel=${carta.pHotel}
    &pCasilla=${carta.pCasilla}`, '_blank', `width=300,height=400,left=${posicionX},top=${posicionY}`);
    */

}


function arraySuerte(idFicha) {
    var idAleatorio = (Math.floor(Math.random() * 22) + 1);
    var posicion = "nada";
    console.log(idAleatorio);

    let cartasSuerte = [
        { id: 1, suerte: { accion: "mover", descripcion: "Avanza hasta la salida", avanzar: "salida" }},
        { id: 2, suerte: { accion: "mover", descripcion: "Avanza hasta la casilla de impuesto sobre el lujo", avanzar: "lujo" }},
        { id: 3, suerte: { accion: "cobrar", descripcion: "Has sido elegido presidente del comité de propiedades", cantidad: 50 }},
        { id: 4, suerte: { accion: "pagar", descripcion: "Recibes una multa por no recoger los desechos de tu perro", pagas: 15 }},
        { id: 5, suerte: { accion: "cobrar", descripcion: "Venta de acciones, recibes dividendos", cantidad: 25 }},
        { id: 6, suerte: { accion: "pagar", descripcion: "Compra de regalos de cumpleaños", pagas: 30 }},
        { id: 7, suerte: { accion: "cobrar", descripcion: "Ganas un concurso de cocina", cantidad: 20 }},
        { id: 8, suerte: { accion: "pagar", descripcion: "Reparación de tu vehículo", pagas: 30 }},
        { id: 9, suerte: { accion: "cobrar", descripcion: "Te devuelven dinero de impuestos", cantidad: 30 }},
        { id: 10, suerte: { accion: "pagar", descripcion: "Compra de libros para la universidad", pagas: 40 }},
        { id: 11, suerte: { accion: "cobrar", descripcion: "Compra de regalos de cumpleaños", cantidad: 30 }},
        { id: 12, suerte: { accion: "pagar", descripcion: "Arreglos en tu jardín", pagas: 45 }},
        { id: 13, suerte: { accion: "cobrar", descripcion: "Te devuelven dinero de una compra", cantidad: 15 }},
        { id: 14, suerte: { accion: "pagar", descripcion: "Compra de entradas para un espectáculo", pagas: 35 }},
        { id: 15, suerte: { accion: "cobrar", descripcion: "Reembolso de una garantía", cantidad: 30 }},
        { id: 16, suerte: { accion: "pagar", descripcion: "Gastos de reparación en casa", pagas: 50 }},
        { id: 17, suerte: { accion: "mover", descripcion: "Avanza hasta la casilla de impuesto sobre el lujo", avanzar: "lujo" }},
        { id: 18, suerte: { accion: "cobrar", descripcion: "Has sido elegido presidente del comité de propiedades", cantidad: 50 }},
        { id: 19, suerte: { accion: "pagar", descripcion: "Recibes una multa por no recoger los desechos de tu perro", pagas: 15 }},
        { id: 20, suerte: { accion: "cobrar", descripcion: "Venta de acciones, recibes dividendos", cantidad: 25 }},
        { id: 21, suerte: { accion: "pagar", descripcion: "Compra de regalos de cumpleaños", pagas: 30 }},
        { id: 22, suerte: { accion: "cobrar", descripcion: "Ganas un concurso de cocina", cantidad: 20 }}
    ];

    var suerte = cartasSuerte.find(item => item.id === idAleatorio).suerte;

    alert("ESTA ES LA DESCRIPTCIOM" + suerte.descripcion);
    if(idFicha === "ficha1") {
        if(suerte.accion === "pagar") {
            dineroJ1 -= parseInt(suerte.pagas);
            alert("Tienes que pagar: " + suerte.pagas);
            divDinero1.textContent = (Number(divDinero1.textContent) - suerte.pagas) + "";

        }
        else if(suerte.accion ==="mover") {
            posicion = suerte.avanzar;
            //casillaInicio = document.getElementsByClassName(carta.accion);
            //espFichas = casillaInicio.getElementsByClassName('fila3')[0];
            //espFichas.appendChild(ficha);
            alert("Te vas ha mover hasta: " + suerte.avanzar);
            //debugger;

            if(suerte.avanzar === "lujo") {
                var posicionFinal = 13;
            } else {
                var posicionFinal = 15;
            }

            alert("El id del padre es " + posicionFinal)
            movimientoFijo(idFicha, posicionFinal)
        }else {
            dineroJ1 += suerte.cantidad;
            alert("Tienes que cobrar: " + suerte.cantidad);
            divDinero1.textContent = (Number(divDinero1.textContent) + suerte.cantidad) + "";

        }
    } else {
        if(suerte.accion === "pagar") {
            dineroJ2 -= suerte.pagas;
            alert("Tienes que pagar: " + suerte.pagas);
            divDinero1.textContent = (Number(divDinero1.textContent) - suerte.pagas) + "";

        }
        else if(suerte.accion ==="mover") {
            posicion = suerte.avanzar;
            //casillaInicio = document.getElementsByClassName(carta.accion);
            //espFichas = casillaInicio.getElementsByClassName('fila3')[0];
            //espFichas.appendChild(ficha);

            if(suerte.avanzar === "lujo") {
                var posicionFinal = 13;
            } else {
                var posicionFinal = 15;
            }

            alert("Tienes que avanzar hasta: " + suerte.avanzar);
            movimientoFijo(idFicha, posicionFinal)

        }else {
            dineroJ2 += suerte.cantidad;
            divDinero1.textContent = (Number(divDinero1.textContent) + suerte.cantidad) + "";
            alert("Tienes que cobrar: " + suerte.cantidad);

        }
    }
  
    

}

function arrayComunidad(idFicha) {
    alert("Comunidad");
    var casas = 4;
    var hoteles = 5;
    var total = 0;
    console.log(idFicha + " ------ " + dineroJ1 + " ------ " + dineroJ2);
    
    var idAleatorio = (Math.floor(Math.random() * 14) + 1);

    let cartasComunidad = [
        { id: 1, comunidad: { accion: "pagar", descripcion: "Haz reparaciones en todos tus edificios", costoCasa: 25, costoHotel: 50 } },
        { id: 2, comunidad: { accion: "cobrar", descripcion: "Recibes una compensación por servicios prestados", cantidad: 100 } },
        { id: 3, comunidad: { accion: "cobrar", descripcion: "Has ganado el segundo premio de un concurso de belleza", cantidad: 10 } },
        { id: 4, comunidad: { accion: "pagar", descripcion: "Recibes una multa por exceso de velocidad", pagas: 20 } },
        { id: 5, comunidad: { accion: "cobrar", descripcion: "Te devuelven dinero de impuestos", cantidad: 30 } },
        { id: 6, comunidad: { accion: "pagar", descripcion: "Inscripción en la escuela de arte", pagas: 50 } },
        { id: 7, comunidad: { accion: "cobrar", descripcion: "Ganas una apuesta en el casino", cantidad: 40 } },
        { id: 8, comunidad: { accion: "pagar", descripcion: "Reparación de tu vehículo", pagas: 30 } },
        { id: 9, comunidad: { accion: "cobrar", descripcion: "Has vendido tus obras de arte", cantidad: 75 } },
        { id: 10, comunidad: { accion: "pagar", descripcion: "Compra de boletos para el concierto", pagas: 35 } },
        { id: 11, comunidad: { accion: "cobrar", descripcion: "Premio por ganar un torneo local", cantidad: 60 } },
        { id: 12, comunidad: { accion: "pagar", descripcion: "Gastos médicos inesperados", pagas: 45 } },
        { id: 13, comunidad: { accion: "cobrar", descripcion: "Te devuelven dinero de una garantía", cantidad: 25 } },
        { id: 14, comunidad: { accion: "pagar", descripcion: "Compra de equipo deportivo", pagas: 55 } }
    ];
    var carta = cartasComunidad.find(item => item.id === idAleatorio).comunidad;

    if(ficha === "ficha1") {
        if(carta.accion === "pagar") {
            if(carta.descripcion.includes("edificios")) {
                total += carta.costoCasa * casas;
                total += carta.costoHotel * hoteles;
                dineroComunidad += total;
                divDinero1.textContent = (Number(divDinero1.textContent) - total) + "";
            }
            else {
                dineroComunidad +=  carta.pagas;
                dineroJ1 -= carta.pagas;
                divDinero1.textContent = (Number(divDinero1.textContent) - carta.pagas) + "";

            }
        }
        else {
            dineroJ1 += carta.cantidad;
            divDinero1.textContent = (Number(divDinero1.textContent) + carta.cantidad) + "";

        }    
    } else {
        if(carta.accion === "pagar") {
            if(carta.descripcion.includes("edificios")) {
                total += carta.costoCasa * casas;
                total += carta.costoHotel * hoteles;
                dineroComunidad += total;
                dineroJ2 -= total;
            }
            else {
                dineroComunidad +=  carta.pagas;
                dineroJ2 -= carta.pagas;
            }
        }
        else {
            dineroJ2 += carta.cantidad;
        }    
    }
    
}


function listaFunciones(idCasilla, idFicha) {

    var busClase = document.getElementById(idCasilla);
    console.log("La ficha es " + idFicha);
    //classList crea un DOMTokenList, from para crearse 
    var clase = Array.from(busClase.classList);
    console.log("La clase de la casilla es " + clase);

    

    if(clase.includes("suerte")) {
        //debugger;
        alert("Ha entrado en suerte");
        arraySuerte(idFicha);
    } else if(clase.includes("comunidad")) {
        alert("Ha entrado en comunidad");
        arrayComunidad(idFicha);
    } else if(clase.includes("color")) {

        alert("Ha entrado en los colores");

        if(clase.includes("rojo")) {

        } else if(clase.includes("verde")) {

        }else if(clase.includes("amarillo")) {
            
        }else if(clase.includes("naranja")) {
            
        }else if(clase.includes("azul")) {
            
        }else if(clase.includes("celeste")) {
            
        }else if(clase.includes("marron")) {
            
        }
    } else if(clase.includes("policia")) {
        movimientoFijo(idFicha, "22")
        sonidos("policia");
    } else if(clase.includes("parking")) {
        divDinero1.textContent = (Number(divDinero1.textContent) + dineroComunidad) + "";
        dineroComunidad = 0;
        sonidos("parking");

    } else if(clase.includes("inicio")) {
        divDinero1.textContent = (Number(divDinero1.textContent) - suerte.pagas) + "";
        sonidos("inicio");

    }

}


function sonidos(informacion) {
    if(informacion === "policia") {
        let sound = new Audio("./sonidos/musicaPolicia.mp3");
        sound.play();
    } else if(informacion === "parking") {
        let sound = new Audio("./sonidos/musicaParking.mp3");
        sound.play();
    }
    //CARCEL Sound Effect from <a href="https://pixabay.com/?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=100823">Pixabay</a>
    //DINERO https://pixabay.com/es/sound-effects/cashier-quotka-chingquot-sound-effect-129698/
    //Musica relajante Music by <a href="https://pixabay.com/es/users/fassounds-3433550/?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=160166">FASSounds</a> from <a href="https://pixabay.com/music//?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=160166">Pixabay</a>
    //Sound Effect from <a href="https://pixabay.com/?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=64657">Pixabay</a>
}
function sonidoFondo() {

    fondo = new Audio("./sonidos/musicaFondo.mp3");
    fondo.play();
    fondo.addEventListener('ended', reiniciar);

}

function reiniciar() {
    console.log("Reiniciar");
    //Reinicia el audio
    fondo.currentTime = 0; 
    //Vuelve a ponerlo
    fondo.play();
}

function sonidoFinal() {
    console.log("sonidoFinal");
    fondo.pause();
    final = new Audio("./sonidos/musicaFinal.mp3");
    final.play();
}

function listaGanadores() {
    var ganador = localStorage.getItem("jug1");
    dinero1 = Number(divDinero1.textContent);
    console.log("EL GANADOR ES")
    console.log("ANTES");
    for(var calles in listaCasillas1) {
        console.log(listaCasillas1[calles]);
        var idCalle = listaCasillas1[calles].id;
        var color = listaCasillas1[calles].classList;
        arrayCartas()
        alert("idCalle: " + idCalle);
        alert("idCalle: " + color);


    }

    dinero2 = Number(divDinero2.textContent);
    console.log("HE ENTRADO");

// Obtén todas las claves almacenadas en localStorage
var keys = Object.keys(localStorage);

// Itera sobre las claves y obtén los valores
keys.forEach(function(key) {
  // Obtén el valor almacenado en localStorage
  var storedValue = localStorage.getItem(key);

  // Puedes imprimir o procesar el valor según tus necesidades
  console.log(`${key}: ${storedValue}`);
});

    
    alert("El ganador es " + ganador);
    puntuacion = 0;
    resultado = ganador + ": " + puntuacion + " puntos";

    //Con el self te obliga a volver a escribir a los jugadores, asi crearias una nueva partida
    //window.open('ganadores.html', '_self');

}

function queEs(listaCasillas) {
    listaCasillas.forEach((casilla, index) => {
        console.log(`Elemento ${index}:`, casilla.id);
        var idCasilla = casilla.id;
        console.log("Aqui esta el id de la casilla: " + idCasilla);
        arrayCartas("3", idCasilla);

        var carta = JSON.parse(cartaJSON)
        console.log("PRUEBA ACTUAL SOBRE EL JSON CARTA" + carta.pCasilla);
      });
}



function movimientoFijo(idFicha, final) {
    ficha = document.getElementById(idFicha);
    console.log("Ficha: " + ficha);

    estilos = getComputedStyle(ficha);

    if (victoria === false) {
        ficha.style.zIndex = 1;

        ficha_left = estilos.getPropertyValue("left");; console.log("left: " + ficha_left)
        ficha_bottom = estilos.getPropertyValue("bottom"); console.log("bottom: " + ficha_bottom)

        posActual = numCasillaFicha(ficha);
        console.log("Posicion actual ficha " + ficha.id + ": " + posActual);
        

        posFinal = final;
        console.log("Posicion final ficha " + ficha.id + ": " + posFinal);

        listaFunciones(posFinal, ficha.id);
        

        const rectIni = getCasillaEnPos(posActual).getBoundingClientRect();
        const coordenadaXIni = rectIni.left + window.scrollX;
        const coordenadaYIni = rectIni.top + window.scrollY;
        console.log("coordenadaXInicio: " + coordenadaXIni + ", coordenadaYInicio: " + coordenadaYIni)

        const rectFinal = getCasillaEnPos(posFinal).getBoundingClientRect();
        const coordenadaXFin = rectFinal.left + window.scrollX;
        const coordenadaYFin = rectFinal.top + window.scrollY;
        console.log("coordenadaXFinal: " + coordenadaXFin + ", coordenadaYFinal: " + coordenadaYFin)

        // Crea una nueva animación solo para la ficha
        const animation = ficha.animate(
            [
                { transform: 'translate(0, 0) rotate(0deg)' }, // Estado inicial: sin traslación y rotación
                { transform: `translate(${coordenadaXFin - coordenadaXIni}px, ${coordenadaYFin - coordenadaYIni}px) rotate(720deg)` } // Estado final: traslación y rotación
            ],
            {
                duration: 2000,
                easing: "ease"
            }
        );


        animation.onfinish = () => {
            //ficha.style.left = ficha_left+ "px";
            //ficha.style.bottom = ficha_bottom+"px"
            // tablero.children[posActual].removeChild(ficha);
            // tablero.children[posFinal].appendChild(ficha);
            casillaIni = document.getElementById(posActual + "")
            casillaFin = document.getElementById(posFinal + "")

            casillaIni.getElementsByClassName("fila3")[0].removeChild(ficha)
            casillaFin.getElementsByClassName("fila3")[0].appendChild(ficha)

            if (victoria === true) {
                alert("VICTORIA")
            } else {
                analizarCasilla(ficha, casillaFin);
            }
        };
    }

}
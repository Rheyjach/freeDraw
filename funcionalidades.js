/* Variables */
let horaActual = document.getElementById("hora")
let pizarra = document.getElementById("miCanvas")
let dimension = pizarra.getContext("2d")
let dibujar = document.getElementById("dibujar")
let borradoGoma = document.getElementById("borradoGoma")
let borrado = document.getElementById("borrado")
let color = document.getElementById("color")
let descargar = document.getElementById("descargar")
let drawing = false
let grosor=document.getElementById("grosor")
let valorGrosor=document.getElementById("valorGrosor")

/*Funciones basicas de interacción*/
function inicializar() {
    fondoPizarron()
    setInterval(reloj, 1000)
}

/*Funcionalidad del reloj*/
function reloj() {
    let fecha = new Date()
    let hora = String(fecha.getHours()).padStart(2, "0")
    let minutos = String(fecha.getMinutes()).padStart(2, "0")
    let segundos = String(fecha.getSeconds()).padStart(2, "0")
    horaActual.textContent = `${hora}:${minutos}:${segundos}`
}

/* Fondo del Pizarron*/
function fondoPizarron() {
    dimension.fillStyle = "whitesmoke"
    dimension.fillRect(0, 0, pizarra.width, pizarra.height)
}


/*Dimensiones del Canvas(Pizarron)*/
pizarra.width = pizarra.offsetWidth;
pizarra.height = pizarra.offsetHeight
pizarra.style.pointerEvents = "none";

/*Habilitar dibujo*/
dibujar.addEventListener("click", function () {
    pizarra.style.pointerEvents = "auto"
    pizarra.style.cursor = "crosshair"
})

/* Iniciar Dibujo*/
pizarra.addEventListener("mousedown", function () {
    drawing = true
    dimension.beginPath()
})
pizarra.addEventListener("mouseup", function () { drawing = false })
pizarra.addEventListener("mousemove", function (event) {
    if (drawing == false) {
        return
    }

    const rect = pizarra.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top

    dimension.lineTo(x, y)
    dimension.stroke()
})

/*Borrado con goma*/
borradoGoma.addEventListener("click", function () {
    pizarra.style.cursor = "url('recursos/borrador.png'), auto"
    dimension.strokeStyle = "whitesmoke"
})

/*Borrado total del pizarron*/
borrado.addEventListener("click", function () {
    dimension.clearRect(0, 0, pizarra.width, pizarra.height)
    dimension.fillRect(0, 0, pizarra.width, pizarra.height)
})

/*Color del lapíz*/
color.addEventListener("click", function () {
    const seleccionarColor = document.createElement("input")
    seleccionarColor.type = "color"
    seleccionarColor.click()
    seleccionarColor.addEventListener("input", function () {
        pizarra.style.cursor = "crosshair"
        dimension.strokeStyle = seleccionarColor.value;
    })
})

/*Descargar Imagen*/
descargar.addEventListener("click", function () {
    const enlace = document.createElement("a");
    enlace.download = "dibujo.png";
    enlace.href = pizarra.toDataURL("image/png");
    enlace.click()
})
/*Grosor*/
grosor.addEventListener("input",function(){
    dimension.lineWidth=grosor.value
    valorGrosor.textContent=grosor.value
})

/* Consideraciones para moviles*/
pizarra.addEventListener("touchstart", function (event) {
    event.preventDefault()
    drawing = true
    dimension.beginPath()
},{ passive: false })
pizarra.addEventListener("touchend", function () { 
    drawing = false 
})
pizarra.addEventListener("touchmove", function (event) {
    if (drawing == false) {
        return
    }
    event.preventDefault()
    const rect = pizarra.getBoundingClientRect()
    const touch= event.changedTouches[0]
    const x = touch.clientX - rect.left
    const y = touch.clientY - rect.top

    dimension.lineTo(x, y)
    dimension.stroke()
},{ passive: false })

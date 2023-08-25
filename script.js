//variables
const carrito = document.getElementById("carrito"),
    listaProductos = document.getElementById("lista-de-productos"),
    contenedorCarrito = document.querySelector('.content-shopping-cart .lista-de-productos');
    vaciarCarritoBtn = document.querySelector('vaciar-carrito');
let articulosCarrito = [];

registrarEventsListeners()

function registrarEventsListeners() {
    //cuando yo le de click a "agregar al carrito de compras"
    listaProductos.addEventListener('click', agregarProducto);

    //Eliminar curso del carrito
    carrito.addEventListener('click', eliminarProducto);

    //Vaciar el carrito
    vaciarCarritoBtn.addEventListener('click', e =>{
        articulosCarrito = [];
        limpiarHTML()
    })
}

function agregarProducto(e) {
    if (e.target.classList.contains("add-cart")){
        const productoSeleccionado = e.target.parentElement.parentElement;
        leerInfo(productoSeleccionado)
    }
}
//Elimina un libro del carrito
function eliminarProducto(e) {
    if(e.target.classList.contains("borrar-producto")){
        const productoId = e.target.getAttribute('data-id');
        //Eliminar del arreglo del articulosCarrito por el data-id
        articulosCarrito = articulosCarrito.filter(producto => producto.id !== productoId)
    }
    carritoHTML()
}
//Leer el contenido de nuestro HTML al que le dimos click y extraer la info del libro
function leerInfo(producto) {
    //Crear un objeto con el contenido del libro
    const infoProducto = {
        imagen: producto.querySelector('img').src,
        titulo: producto.querySelector('h3').textContent,
        precio: producto.querySelector('.price').textContent,
        id: producto.querySelector('button').getAttribute('data-id'),
        cantidad: 1
    }

//Revisa si un elemento ya existe en el carrito
const existe = articulosCarrito.some(producto => producto.id == infoProducto.id)

if (existe){
    //Actualizar la cantidad
    const productos = articulosCarrito.map(producto => {
            if (producto.id === infoProducto.id) {
            producto.cantidad++;
            return producto
            } else {
            return producto;
            }
        });
        [...articulosCarrito,infoProducto]
    } else {
      //Agregamos elementos al carrito de compras
      articulosCarrito = [...articulosCarrito,infoProducto]
    }
    carritoHTML()
}

//Muestra el carrito en el HTML

function carritoHTML() {
    limpiarHTML()
    //Recorre el carrito de compras y genera el HTML
    articulosCarrito.forEach(producto => {
        const fila = document.createElement('div');
        fila.innerHTML = `
        <img src = "${producto.imagen}"></img>
        <p>${producto.titulo}</p>
        <p>${producto.precio}</p>
        <p>${producto.cantidad}</p>
        <p><span class= "borrar-producto" data-id="${producto.id}" >X</span></p>
        `;
        contenedorCarrito.appendChild(fila)
    });
}

//Elimiinar los productos de la lista-de-productos

function limpiarHTML() {
    console.log(contenedorCarrito.firstChild)
    while (contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
}
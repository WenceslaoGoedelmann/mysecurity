const productos = document.querySelector('.productos-container');
const btnVerMas = document.querySelector('.btn-VerMas');

const categorias = document.querySelector('.categorias');
const listaCategoria= document.querySelectorAll('.categoria');

const navbarBtn = document.querySelector('.navbar-label');
const navbarList = document.querySelector('.navbar-list');

const overlay = document.querySelector('.overlay');

const carritoBubble = document.querySelector('.carrito-bubble');

const successModal = document.querySelector('.add-modal');




let carrito = JSON.parse(localStorage.getItem('carrito')) || [] ;
const saveLocalStorage = listaCarrito => {
  localStorage.setItem('carrito', JSON.stringify(listaCarrito ));
};

const renderProducto = producto => {
    const { id, name, price, cardImg } = producto;
    return ` 
    <div class="producto">
        <div class="card-producto-top">
            <h3>${name}</h3>
        </div>
         <img src= ${cardImg} />
        <div class="producto-info">
                <div class="card-producto-mid">
                    <p>Precio:</p>
                    <span>$${price}</span>
                </div>
                <div class="card-producto-bot">
                    <button class="btn-agregar"
                        data-id='${id}'
                        data-name='${name}'
                        data-price='${price}'
                        data-img='${cardImg}'>Agregar al Carrito</button>
                </div>
        </div>
    </div>`;
  };

  const renderProductosDivididos = (index = 0) => {
    productos.innerHTML += controlProductos.productosDivididos[index].map(renderProducto).join('');
  };

  const renderProductosFiltrados = (categoria) => {
    const listaProductos = datosProductos.filter(e => e.category === categoria);
    productos.innerHTML = listaProductos.map(renderProducto).join(''); 
    };

   const renderProductos = (index = 0, categoria = undefined) => {
        if (!categoria) {
            renderProductosDivididos(index);
          return;
        }
        renderProductosFiltrados(categoria);
      };  
      
    const cambioEstadoBtnActivo = (categoriaSeleccionada) => {
        const categorias = [...listaCategoria];
        categorias.forEach(categoriaBtn => {
          if (categoriaBtn.dataset.categoria !== categoriaSeleccionada) {
            categoriaBtn.classList.remove('activa');
            return;
          }
          categoriaBtn.classList.add('activa');
        });
      };

    const cambioEstadoBtnVerMAs = (categoria) => {
        if (!categoria) {
        btnVerMas.classList.remove('hidden');
        return;
        }
        btnVerMas.classList.add('hidden');
    };  



    const cambioEstadoFiltro = (e) =>{
        const categoriaSeleccionada = e.target.dataset.categoria;
        cambioEstadoBtnActivo(categoriaSeleccionada);
        cambioEstadoBtnVerMAs(categoriaSeleccionada);
    };




    const aplicarFiltro = (e) => {
        if (!e.target.classList.contains('categoria')) return;
        cambioEstadoFiltro(e);
        if (!e.target.dataset.categoria) {
          productos.innerHTML = '';
          renderProductos();
        } else {
          renderProductos(0, e.target.dataset.categoria);
          controlProductos.siguientesProductosIndex = 1;
        }
      };
      
      const ultimoIndex = () =>
      controlProductos.siguientesProductosIndex === controlProductos.limiteProductos;
     
      const mostrarMasProductos = () => {
        renderProductos(controlProductos.siguientesProductosIndex);
        controlProductos.siguientesProductosIndex++;
        if (ultimoIndex()) {
            btnVerMas.classList.add('hidden');
        }
      };


      const toggleNavbar = () => {
        navbarList.classList.toggle('open-navbar');
        overlay.classList.toggle('show-overlay');
    };
    
    const cerrarNavbarScroll = () => {
        if (
          !navbarList.classList.contains('open-navbar') 
        )
          return;
      
        navbarList.classList.remove('open-navbar');
        overlay.classList.remove('show-overlay');
      };
      
      const cerrarNavbarClick = () => {
        navbarList.classList.remove('open-navbar');
        overlay.classList.remove('show-overlay');
      };



    const renderBubble = () => {
        carritoBubble.textContent = carrito.reduce((acc, cur) => acc + cur.quantity, 0);
      };
    
    
    const checkEstadoCarrito = () => {
        saveLocalStorage(carrito);
        renderBubble(carrito);
      };


    const agregarProducto = e => {
        if (!e.target.classList.contains('btn-agregar')) return;
      
        const { id, name, price, img} = e.target.dataset;
      
        const producto = datosProducto (id, name, price, img);
      
        if (existeProdutoEnCarrito(producto)) {
          agregarUnidad(producto);
          mostrarModal('Se agregó una unidad del producto al carrito');
        } else {
          crearProductoEnCarrito(producto);
          mostrarModal('El producto se ha agregado al carrito');
        }
      
        checkEstadoCarrito();
      };

    const mostrarModal = msg => {
      successModal.classList.add('active-modal');
      successModal.textContent = msg;
      setTimeout(() => {
        successModal.classList.remove('active-modal');
      }, 1500);
    };
    
    const crearProductoEnCarrito = producto => {
      carrito = [...carrito, { ...producto, quantity: 1 }];
    };

    const agregarUnidad = producto => {
      carrito = carrito.map(productoCarrito =>
        productoCarrito.id === producto.id
          ? { ...productoCarrito, quantity: productoCarrito.quantity + 1 }
          : productoCarrito
      );
    };

    const existeProdutoEnCarrito = producto => {
      return carrito.find(item => item.id === producto.id);
    };

    const datosProducto = (id, name, price, img) =>{
       return { id, name, price, img};
    };



  const init = () => {
    renderProductos();  
    categorias.addEventListener('click', aplicarFiltro);
    btnVerMas.addEventListener('click', mostrarMasProductos);
    navbarBtn.addEventListener('click', toggleNavbar);
    window.addEventListener('scroll', cerrarNavbarScroll);
    overlay.addEventListener('click', cerrarNavbarClick);
    renderBubble(carrito);
    productos.addEventListener('click', agregarProducto);
  };
  
  init();
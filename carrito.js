
const navbarBtn = document.querySelector('.navbar-label');
const navbarList = document.querySelector('.navbar-list');

const overlay = document.querySelector('.overlay');

const carritoBtn = document.querySelector('.carrito-label');
const carritoBubble = document.querySelector('.carrito-bubble');
const carritoMenu = document.querySelector('.carrito');
const productosCarrito = document.querySelector('.carrito-container');
const comprarBtn = document.querySelector('.btn-comprar');
const vaciarBtn = document.querySelector('.btn-vaciar-carrito');
const total = document.querySelector('.total');

const successModal = document.querySelector('.add-modal');

let carrito = JSON.parse(localStorage.getItem('carrito')) || [] ;
const saveLocalStorage = listaCarrito => {
  localStorage.setItem('carrito', JSON.stringify(listaCarrito ));
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

const renderProductoCarrito = productoCarrito => {
    const { id, name, price, img, quantity } = productoCarrito;
    return `
    <div class="carrito-item">
    <img src= ${img}   />
    <div class="item-info">
      <h3 class="item-titulo"> ${name} </h3>
      <div class="precio">
      <p class="item-precio">Precio: </p>
      <span class="item-precio-numero"> $${price} </span>
      </div>
    </div>
    <div class="item-handler">
      <span class="quantity-handler down" data-id=${id}>-</span>
      <span class="item-cant">${quantity} </span>
      <span class="quantity-handler up" data-id=${id}>+</span>
    </div>
  </div>

    `;
  };

const renderCarrito = () => {
  if (!carrito.length) {
      productosCarrito.innerHTML = `<p class="empty-msg">No hay productos en el carrito.</p>`;
    return;
  }
  productosCarrito.innerHTML = carrito.map(renderProductoCarrito).join('');
};

const preciotTotal = () => carrito.reduce((acc, cur) => acc + Number(cur.price) * cur.quantity, 0);
    
    
    const mostrarTotal = () => {
      total.innerHTML = `$ ${preciotTotal()}`;
    };


    const renderBubble = () => {
        carritoBubble.textContent = carrito.reduce((acc, cur) => acc + cur.quantity, 0);
      };
    
      const disableBtn = (btn) => {
      if (!carrito.length) {
        btn.classList.add('disabled');
      } else {
        btn.classList.remove('disabled');
      }
    };

    
    const checkEstadoCarrito = () => {
        saveLocalStorage(carrito);
        renderCarrito(carrito);
        mostrarTotal(carrito);
        disableBtn(comprarBtn);
        disableBtn(vaciarBtn);
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

    const handleMinusBtnEvent = id => {
      const existingCartProduct = carrito.find(item => item.id === id);
    
      if (existingCartProduct.quantity === 1) {
        if (window.confirm('¿Desea Eliminar el producto del carrito?')) {
          removeProductFromCart(existingCartProduct);
        }
        return;
      }
      substractProductUnit(existingCartProduct);
    };

    const substractProductUnit = existingCartProduct => {
      carrito = carrito.map(producto => {
        return producto.id === existingCartProduct.id
          ? { ...producto, quantity: Number(producto.quantity) - 1 }
          : producto;
      });
    };

    const removeProductFromCart = existingCartProduct => {
      carrito = carrito.filter(producto => producto.id !== existingCartProduct.id);
      checkEstadoCarrito();
    };

    const handlePlusBtnEvent = id => {
      const existingCartProduct = carrito.find(item => item.id === id);
      agregarUnidad(existingCartProduct);
    };

    const handleQuantity = e => {
      if (e.target.classList.contains('down')) {
        handleMinusBtnEvent(e.target.dataset.id);
      } else if (e.target.classList.contains('up')) {
        handlePlusBtnEvent(e.target.dataset.id);
      }
      checkEstadoCarrito();
    };

    const resetCartItems = () => {
      carrito = [];
      checkEstadoCarrito();
    };

    const completeCartAction = (confirmMsg, successMsg) => {
      if (!carrito.length) return;
      if (window.confirm(confirmMsg)) {
        resetCartItems();
        alert(successMsg);
      }
    };
    const completeBuy = () => {
      completeCartAction('¿Desea completar su compra?', '¡Gracias por tu compra!');
    };
    
    const deleteCart = () => {
      completeCartAction('¿Desea borrar todo?', 'No hay productos en el carrito');
    };
    


  const init = () => {
    navbarBtn.addEventListener('click', toggleNavbar);
    window.addEventListener('scroll', cerrarNavbarScroll);
    overlay.addEventListener('click', cerrarNavbarClick);
    document.addEventListener('DOMContentLoaded', renderCarrito);
    document.addEventListener('DOMContentLoaded', mostrarTotal);
    renderBubble(carrito);
    disableBtn(comprarBtn);
    disableBtn(vaciarBtn);
    productosCarrito.addEventListener('click', handleQuantity);
    comprarBtn.addEventListener('click', completeBuy);
    vaciarBtn.addEventListener('click', deleteCart);
  };
  
  init();


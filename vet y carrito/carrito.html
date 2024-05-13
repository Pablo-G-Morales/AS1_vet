<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Carrito</title>
    <link rel="stylesheet" href="sosaStyle.css" />
    <script src="sosaJS.js" defer></script>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
</head>
<body>

    <div class = "wrap">
        <div class="header1">
            <div class="empleados-container">
              <p>Acceso a empleados 👤</p> 
              <div class="empleados">
                
              </div>
            </div>
          </div>
        
        <div class="header">
            <div class="logo">
                <img src="logo.png" alt="Logo">
            </div>

            <div class="nav-links">
                <a href="#">Tienda</a>
                <a href="#">Farmacia</a>
                <a href="#">Grooming</a>
                <a href="#">Quiénes Somos</a>
                <a href="#">Contacto</a>
                <a href="#" class="shopping-cart"><img class="product-image" src="carrito.png" alt="Shopping Cart"></a>
            </div>
        </div>

        <div class="side side-left">
            <h2>Productos</h2>

            <div class="producto">
                <span class="cantidad"><input type="number" id="cantidad1" min="1" max="5" value="1"></span>
                <span class="nombre">Pimobendan 5mg</span>
                <span class="precio">650</span>
                <img src="prod1.jpg" alt="Product 1" class="product-image">
                <div class="product-remove"><span class="icon-x"></span></div>
              </div>
              
              <div class="producto">
                <span class="cantidad"><input type="number" id="cantidad2" min="1" max="5" value="1"></span>
                <span class="nombre">Hill's Lata L/d</span>
                <span class="precio">80</span>
                <img src="prod2.jpeg" alt="Product 2" class="product-image">
                <div class="product-remove"><span class="icon-x"></span></div>
              </div>
              
              <div class="precios">
                <p class="subto">Subtotal: <span class="subtotal">0</span></p>
                <p class="envio">Precio de envio: <span class="envio">30</span></p>
                <p class="total-label">Total a pagar: <span class="total">0</span></p>
              </div>
              
        </div>
        <div class="side side-right">
            <h2>Envio</h2>
            <form method="POST" id="carrito-form" action="index.php">
              <label for="correo">Tu correo:</label><br>
                <input type="email" id="correo" class="correo" placeholder="ejemplo@example.com"><br>
                
                <input type="submit" value="Continuar" class="boton" id="submit-btn">
                <!-- <a href="pago1.html" class="boton">Continuar</a>> -->
                </form>

                <div class="info">
                    <p>Pasos Siguientes 👟 </p>
                    <p>Opciones de envío 🏠</p>
                    <p> Selecciona cómo deseas recibir tu pedido</p>
                    <p>Método de Pago 💳</p>
                    <p>Elije un método de pago e ingresa tus datos de pago.</p>
                    <p>Confirmación del pedido ✅</p>
                    <p>Haz tu pedido y recibe un correo electrónico de confirmación.</p>
                </div>
        </div>
        <footer class="footer">
            <p>2024. Super Pet. Todos los Derechos Reservados</p>
        </footer>
        </div>
    </div>
</body>
</html>
<script>
//pasar datos
  document.getElementById('submit-btn').addEventListener('click', function(event) {
    event.preventDefault();

    var formData = new FormData(document.getElementById('carrito-form'));

    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'index.php', true);

    xhr.onload = function() {
      if (xhr.status === 200) {
        // Redirect to pago1.html if the request is successful
        window.location.href = 'pago1.html';
      } else {
        console.log('Request failed.  Returned status of ' + xhr.status);
      }
    };

    xhr.send(formData);
  });

    // Función para eliminar productos
    const productRemoveButtons = document.querySelectorAll('.product-remove');
  
    productRemoveButtons.forEach((button) => {
      button.addEventListener('click', () => {
        const productDiv = button.closest('.producto');
        productDiv.remove();
        updateTotals();
      });
    });
  
    const cantidadInputs = document.querySelectorAll('.cantidad input');
    const subtotalSpan = document.querySelector('.subtotal');
    const totalSpan = document.querySelector('.total');
  
    function updateTotals() {
      let subtotal = 0;
      let total = 0;
  
      const productos = document.querySelectorAll('.producto');
      for (let i = 0; i < productos.length; i++) {
        const cantidad = parseInt(productos[i].querySelector('.cantidad input').value);
        const precio = parseInt(productos[i].querySelector('.precio').innerText);
        subtotal += cantidad * precio;
      }
  
      total = subtotal + 30;
  
      subtotalSpan.innerText = subtotal;
      totalSpan.innerText = total;
  
      if (productos.length === 0) {
        subtotalSpan.innerText = 0;
        totalSpan.innerText = 0;
      }
    }
  
    cantidadInputs.forEach((input) => {
      input.addEventListener('input', updateTotals);
    });
  
    // Initial subtotal and total
    updateTotals();
  
    // Función para agregar productos
    const addProductButton = document.querySelector('#add-product-button');
    const productForm = document.querySelector('#product-form');
  
    addProductButton.addEventListener('click', () => {
      productForm.style.display = 'block';
    });
  
    productForm.addEventListener('submit', (event) => {
      event.preventDefault();
  
      const nombre = productForm.nombre.value;
      const precio = parseInt(productForm.precio.value);
      const cantidad = parseInt(productForm.cantidad.value);
  
      const newProduct = `
        <div class="producto">
          <span class="cantidad"><input type="number" id="cantidad1" min="1" max="5" value="${cantidad}"></span>
          <span class="nombre">${nombre}</span>
          <span class="precio">${precio}</span>
          <div class="product-remove"><span class="icon-x"></span></div>
        </div>
      `;
  
      const productContainer = document.querySelector('.product-container');
      productContainer.insertAdjacentHTML('beforeend', newProduct);
  
      const newProductRemoveButton = productContainer.lastElementChild.querySelector('.product-remove');
      newProductRemoveButton.addEventListener('click', () => {
        newProductRemoveButton.closest('.producto').remove();
        updateTotals();
      });
  
      const newCantidadInput = productContainer.lastElementChild.querySelector('.cantidad input');
      newCantidadInput.addEventListener('input', updateTotals);
  
      productForm.reset();
      productForm.style.display = 'none';
  
      updateTotals();
    });
  </script>
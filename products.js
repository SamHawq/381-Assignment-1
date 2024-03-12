var cart = [];

var addToCartButtons = document.querySelectorAll('.product-container button');

function addToCartHandler(event) {
    var productContainer = event.target.closest('.product-container');
    var productName = productContainer.querySelector('h2').innerText;
    var productPriceText = productContainer.querySelector('p').innerText;
    var productPrice = parseFloat(productPriceText.replace('Price: $', ''));
    
    var existingProduct = cart.find(item => item.name == productName);

    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        cart.push({
            name: productName,
            price: parseFloat(productPrice),
            quantity: 1
        });
    }

    alert(productName + ' has been added to the cart.');
    updateCartDisplay();
}

function removeFromCart(item) {
    var itemIndex = cart.indexOf(item);

    if (itemIndex !== -1) {
        if (cart[itemIndex].quantity > 1){
            cart[itemIndex].quantity--;
            updateCartDisplay();
        } else {
            cart.splice(itemIndex, 1);
            updateCartDisplay();
        }
    }
    
}

function updateCartDisplay() {
    var cartDisplayContainer = document.getElementById('cart-display');
    var ALLproductContainer = document.getElementsByClassName('ALL-products-container')[0]; //***
    if (!cartDisplayContainer) {
        cartDisplayContainer = document.createElement('div');
        cartDisplayContainer.id = 'cart-display';
        ALLproductContainer.appendChild(cartDisplayContainer);
    }

    cartDisplayContainer.innerHTML = ''; //effective refresh of DOM for new info

    cart.forEach(function(item) {
        var cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');

        var itemName = document.createElement('span');
        itemName.innerText = item.name;

        var itemPrice = document.createElement('span');
        itemPrice.innerText = ' - $' + item.price.toFixed(2);

        var itemQuantity = document.createElement('span');
        itemQuantity.innerText = ' - ' + item.quantity;

        var removeButton = document.createElement('button');
        removeButton.innerText = 'Remove';
        removeButton.classList.add('cart-remove-button');
        removeButton.addEventListener('click', function() {
            removeFromCart(item);
        });

        cartItem.appendChild(itemName);
        cartItem.appendChild(itemPrice);
        cartItem.appendChild(itemQuantity);
        cartItem.appendChild(removeButton);

        // Append the cart item to the cart display container
        cartDisplayContainer.appendChild(cartItem);
    });
}

addToCartButtons.forEach(function(button) {
    button.addEventListener('click', addToCartHandler);
});
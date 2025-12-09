let cart = [];

function addToCart(productName, productPrice) {
    const existingProduct = cart.find(product => product.name === productName);
    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({ name: productName, price: productPrice, quantity: 1 });
    }
    updateCart();
}

function updateCart() {
    const cartTableBody = document.querySelector('#cart-items tbody');
    cartTableBody.innerHTML = '';

    let total = 0;

    cart.forEach(product => {
        const productTotal = product.price * product.quantity;
        total += productTotal;

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${product.name}</td>
            <td>₱${product.price.toFixed(2)}</td>
            <td>${product.quantity}</td>
            <td>₱${productTotal.toFixed(2)}</td>
        `;
        cartTableBody.appendChild(row);
    });

    document.getElementById('cart-total').textContent = `Total: ₱${total.toFixed(2)}`;
}

function checkout() {
    alert('Thank you for your purchase!');
    cart = [];
    updateCart();
}

// Load cart from local storage on page load
document.addEventListener('DOMContentLoaded', () => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCart();
    }
});

// Save cart to local storage before page unload
window.addEventListener('beforeunload', () => {
    localStorage.setItem('cart', JSON.stringify(cart));
});
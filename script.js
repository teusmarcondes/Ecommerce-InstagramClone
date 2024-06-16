let currentPostIndex = 0;
const posts = document.querySelectorAll('.post');
const totalPosts = posts.length;
let cart = [];
let products = [
    { id: 1, name: 'Vestido Azul', price: 50.00 },
    { id: 2, name: 'Camiseta Listrada', price: 50.00 }
];

// Inicializar: Exibir apenas o primeiro post
posts.forEach((post, index) => {
    post.style.display = index === 0 ? 'block' : 'none';
});

function navigate(direction) {
    posts[currentPostIndex].style.display = 'none';
    currentPostIndex = (currentPostIndex + direction + totalPosts) % totalPosts;
    posts[currentPostIndex].style.display = 'block';
}

function addToCart(productId) {
    let product = products.find(p => p.id === productId);
    let cartItem = cart.find(item => item.id === productId);

    if (cartItem) {
        cartItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCart();
}

function updateCart() {
    let cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';

    let total = 0;

    cart.forEach(item => {
        let li = document.createElement('li');
        li.innerHTML = `${item.name} - R$ ${item.price} x ${item.quantity}
            <button onclick="removeFromCart(${item.id})">Remover</button>`;
        cartItems.appendChild(li);

        total += item.price * item.quantity;
    });

    document.getElementById('total').innerText = total.toFixed(2);
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}

function checkout() {
    alert('Compra finalizada!');
    cart = [];
    updateCart();
}

document.getElementById('whatsapp-button').addEventListener('click', function() {
    sendWhatsAppMessage();
});

function sendWhatsAppMessage() {
    let message = "Resumo do Carrinho:\n";
    cart.forEach(item => {
        message += `${item.name} - R$ ${item.price} x ${item.quantity}\n`;
    });
    let total = document.getElementById('total').innerText;
    message += `Total: R$ ${total}`;

    let phoneNumber = "5541988240799"; // Insira o número de telefone no formato internacional, sem sinais de "+" ou "00"
    let url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    window.open(url, '_blank');
}
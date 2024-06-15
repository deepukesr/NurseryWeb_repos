let menu = document.querySelector('#menu-bar');
let navbar = document.querySelector('.navbar');
let header = document.querySelector('.header-3');
let scrollTop = document.querySelector('.scroll-top');

menu.addEventListener('click',() =>{
    menu.classList.toggle('fa-times');
    navbar.classList.toggle('active');
});
window.onscroll = () =>{
    menu.classList.remove('fa-times');
    navbar.classList.remove('active');

    if(window.scrollY>250){
        header.classList.add('active');
    }else{
        header.classList.remove('active');
    }

    if (window.scrollY > 250) {
        scrollTop.style.display = 'initial';
    } else {
        scrollTop.style.display = 'none';
    }
    
 
}


const carouselButtonLeft = document.querySelector('.carousel-button.left');
const carouselButtonRight = document.querySelector('.carousel-button.right');
const productScroll = document.querySelector('.box-container');
const productCarousel = document.querySelector('.product');

carouselButtonLeft.addEventListener('click', () => {
    productScroll.scrollBy({
        left: -productCarousel.clientWidth, // Move to the left
        behavior: 'smooth'
    });
});

carouselButtonRight.addEventListener('click', () => {
    productScroll.scrollBy({
        left: productCarousel.clientWidth, // Move to the right
        behavior: 'smooth'
    });
});





const addToCartButtons = document.querySelectorAll('.btn');
const cartIcon = document.getElementById('cart-icon');
const cartNotification = document.getElementById('cart-notification');

// Initialize cart items in localStorage if not already present
let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

addToCartButtons.forEach(button => {
    button.addEventListener('click', event => {
        event.preventDefault();
        const productBox = button.closest('.box');
        const productName = productBox.querySelector('h3').textContent;
        const productQuantity = parseInt(productBox.querySelector('.quantity input').value);

        // Check if the product is already in the cart
        let existingProduct = cartItems.find(item => item.name === productName);

        if (existingProduct) {
            // Increase the quantity if the product already exists in the cart
            existingProduct.quantity += productQuantity;
        } else {
            // Add new item to cart
            const productImage = productBox.querySelector('img').src;
            const productPrice = parseInt(productBox.querySelector('.price').textContent.replace('Rs. ', ''));
            cartItems.push({
                image: productImage,
                name: productName,
                price: productPrice,
                quantity: productQuantity
            });
        }

        // Save updated cart items to localStorage
        localStorage.setItem('cartItems', JSON.stringify(cartItems));

        // Show notification on cart icon
        showCartNotification();

        // Optionally, you can show a confirmation message to the user
        // alert('Item added to cart successfully!');
    });
});

// Function to show cart notification
function showCartNotification() {
    // Update the notification count
    cartNotification.textContent = cartItems.length;
}

// Event listener for cart icon click to navigate to cart page
cartIcon.addEventListener('click', () => {
    // Redirect to cart page
    window.location.href = 'addToCart.html';
});

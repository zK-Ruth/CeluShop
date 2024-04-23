function toggleDetails(button) {
    const details = button.nextElementSibling;
    if (details.style.display === "none") {
      details.style.display = "block";
      button.innerText = "Hide Details";
      button.classList.add("expanded");
    } else {
      details.style.display = "none";
      button.innerText = "More Details";
      button.classList.remove("expanded");
    }
  }
 
  document.addEventListener("DOMContentLoaded", function() {
    // Initially, hide all slides except the first one
    const slides = document.getElementsByClassName("slide");
    for (let i = 1; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
  });
  
  let slideIndex = 1;
showSlide(slideIndex);

function changeSlide(n) {
  showSlide(slideIndex += n);
}

function showSlide(n) {
  const slides = document.getElementsByClassName("slide");

  // Loop back to the first slide if reached the end
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }

  // Hide all slides
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }

  // Show the current slide
  slides[slideIndex - 1].style.display = "block";
}


// JavaScript for cart
// Function to add a product to the cart
function addToCart(productName, price) {

  // Get the cart items from Local Storage or an empty array if it's not set
  var cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

  // Add the new product to the cart
  var newProduct = { name: productName, price: price };
  cartItems.push(newProduct);

  // Store the updated cart items back to Local Storage
  localStorage.setItem('cartItems', JSON.stringify(cartItems));

  // Optional: Display a message to the user indicating that the product has been added to the cart
  alert('Product added to cart!');

  // Redirect to the cart.html page
  window.location.href = 'cart.html';

  updateMainHeight();
}

// Function to display cart items on the cart.html page
function displayCartItems() {
  // Get the cart items from Local Storage
  var cartItems = JSON.parse(localStorage.getItem('cartItems'));

  // Get the cart items div
  var cartItemsDiv = document.getElementById('cart-items');

  // Clear any existing content in the cart items div
  cartItemsDiv.innerHTML = '';

  // Check if there are items in the cart
  if (cartItems && cartItems.length > 0) {
    // Loop through the cart items and create a div for each product
    for (var i = 0; i < cartItems.length; i++) {
      var productDiv = document.createElement('div');
      productDiv.className = 'cart-product';

      var productNameParagraph = document.createElement('p');
      productNameParagraph.textContent = cartItems[i].name;
      productNameParagraph.classList.add('cart-details');

      var productPriceParagraph = document.createElement('p');
      productPriceParagraph.textContent = '$' + cartItems[i].price;
      productPriceParagraph.classList.add('cart-details');

      var removeButton = document.createElement('button');
      removeButton.textContent = 'Remove';
      removeButton.onclick = createRemoveHandler(i); 
      removeButton.classList.add('cart-remove');

      productDiv.appendChild(productNameParagraph);
      productDiv.appendChild(productPriceParagraph);
      productDiv.appendChild(removeButton); 

      cartItemsDiv.appendChild(productDiv);
    }
  } else {
    // If the cart is empty, display a message
    var emptyCartMessage = document.createElement('p');
    emptyCartMessage.textContent = 'Your cart is empty.';
    emptyCartMessage.classList.add('cart-details');
    cartItemsDiv.appendChild(emptyCartMessage);
  }
}

// Function to create the remove button handler for each item
function createRemoveHandler(index) {
  return function () {
    removeFromCart(index); 
    displayCartItems();
  };
}

// Function to remove an item from the cart by index
function removeFromCart(index) {
  var cartItems = JSON.parse(localStorage.getItem('cartItems'));
  if (cartItems && cartItems.length > index) {
    cartItems.splice(index, 1);
    localStorage.setItem('cartItems', JSON.stringify(cartItems)); 
  }
  
  updateMainHeight();

  // Call the function to display cart items immediately after removing
  displayCartItems();
}

// Function to execute when the cart.html page finishes loading
function onPageLoad() {
  displayCartItems();
}

// Attach the onPageLoad function to the 'DOMContentLoaded' event of the document
document.addEventListener('DOMContentLoaded', onPageLoad);

// Function to update the height of the cart-main div based on the number of items in the cart
function updateMainHeight() {
  var cartItems = JSON.parse(localStorage.getItem('cartItems'));

  // Calculate the desired height based on the number of items in the cart
  var cartItemCount = cartItems ? cartItems.length : 0;
  var desiredHeight = cartItemCount * 270; 

  // the height is not below 245 pixels
  desiredHeight = Math.max(desiredHeight, 245);

  // Set the height of the cart-main div
  var cartMainDiv = document.querySelector('.cart-main');
  cartMainDiv.style.height = desiredHeight + 'px';
}


// Get the popup and the "Sign Up" link
var popup = document.getElementById("popup");
var signupLink = document.getElementById("signup-link");

// Function to show the popup
function showPopup() {
    popup.style.display = "block";
}

// Function to hide the popup
function hidePopup() {
    popup.style.display = "none";
}

// Attach click event listener to the "Sign Up" link
signupLink.addEventListener("click", function(event) {
    event.preventDefault(); 
    showPopup(); 
});

// Function to close the popup when the close button is clicked
function closePopup() {
    hidePopup();
}

// Attach click event listener to the close button
var closeButton = document.querySelector(".close-button");
closeButton.addEventListener("click", closePopup);

// Get the form element
var form = document.querySelector("form");

// Prevent form submission and close the popup when the form is submitted
form.addEventListener("submit", function(event) {
    event.preventDefault();
    hidePopup();
});
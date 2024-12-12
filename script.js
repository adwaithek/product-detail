
const mainImage = document.getElementById("main-image");
const thumbnailsContainer = document.getElementById("thumbnails");
const prevArrow = document.getElementById("prev-arrow");
const nextArrow = document.getElementById("next-arrow");
const quantityInput = document.getElementById("quantity-selector");
const decreaseBtn = document.getElementById("decrease-btn");
const increaseBtn = document.getElementById("increase-btn");
const addToCartBtn = document.getElementById("add-to-cart-btn");
const popup = document.getElementById("popup");

let images = [];
let currentIndex = 0;

// Fetch images from the API
async function fetchImages() {
  try {
    const response = await fetch("https://picsum.photos/v2/list?page=1&limit=5");
    const data = await response.json();
    images = data.map((image) => ({
      url: `${image.download_url}?w=600&h=400`,
      author: image.author,
    }));
    renderCarousel();
  } catch (error) {
    console.error("Error fetching images:", error);
  }
}

// Render the carousel
function renderCarousel() {
  if (images.length === 0) return;

  mainImage.src = images[currentIndex].url;
  mainImage.alt = `Image by ${images[currentIndex].author}`;

  thumbnailsContainer.innerHTML = "";
  images.forEach((image, index) => {
    const thumbnail = document.createElement("img");
    thumbnail.src = image.url;
    thumbnail.alt = `Thumbnail by ${image.author}`;
    thumbnail.className = "thumbnail";
    if (index === currentIndex) thumbnail.classList.add("active");
    thumbnail.addEventListener("click", () => {
      currentIndex = index;
      renderCarousel();
    });
    thumbnailsContainer.appendChild(thumbnail);
  });
}

// Navigation handlers
prevArrow.addEventListener("click", () => {
  currentIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
  renderCarousel();
});

nextArrow.addEventListener("click", () => {
  currentIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
  renderCarousel();
});

// Quantity handlers
decreaseBtn.addEventListener("click", () => {
  quantityInput.value = Math.max(1, parseInt(quantityInput.value) - 1);
});

increaseBtn.addEventListener("click", () => {
  quantityInput.value = parseInt(quantityInput.value) + 1;
});

// Add to cart handler
addToCartBtn.addEventListener("click", () => {
  popup.classList.remove("hidden");
  setTimeout(() => popup.classList.add("hidden"), 3000);
});

// Initialize carousel
fetchImages();


// Add to cart handler
addToCartBtn.addEventListener("click", () => {
  const selectedVariant = document.getElementById("variant-selector").value;
  const quantity = quantityInput.value;

  // Update the confirmation message
  const confirmationMessage = document.getElementById("confirmation-message");
  confirmationMessage.innerHTML = `${quantity} item(s) of size "${selectedVariant}" added to your cart!`;

  // Show the confirmation message
  confirmationMessage.classList.remove("hidden");
  confirmationMessage.style.display = "block";

  // Hide the message after 3 seconds
  setTimeout(() => {
    confirmationMessage.classList.add("hidden");
    confirmationMessage.style.display = "none";
  }, 3000);
});


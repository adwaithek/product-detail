// Ensure the DOM is fully loaded before running the script
document.addEventListener("DOMContentLoaded", () => {
  const mainImage = document.getElementById("main-image");
  const thumbnailsContainer = document.getElementById("thumbnails");
  const prevArrow = document.getElementById("prev-arrow");
  const nextArrow = document.getElementById("next-arrow");
  const quantityInput = document.getElementById("quantity-selector");
  const decreaseBtn = document.getElementById("decrease-btn");
  const increaseBtn = document.getElementById("increase-btn");
  const addToCartBtn = document.getElementById("add-to-cart-btn");
  const modal = document.getElementById("modal");
  const modalMessage = document.getElementById("modal-message");
  const closeModal = document.getElementById("close-modal");

  let images = [];
  let currentIndex = 0;
  let selectedVariant = null;


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


  prevArrow.addEventListener("click", () => {
    currentIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
    renderCarousel();
  });

  nextArrow.addEventListener("click", () => {
    currentIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
    renderCarousel();
  });


  decreaseBtn.addEventListener("click", () => {
    quantityInput.value = Math.max(1, parseInt(quantityInput.value) - 1);
  });

  increaseBtn.addEventListener("click", () => {
    quantityInput.value = parseInt(quantityInput.value) + 1;
  });


  const variantButtons = document.querySelectorAll(".variant-option");

  variantButtons.forEach((button) => {
    button.addEventListener("click", () => {

      variantButtons.forEach((btn) => btn.classList.remove("active"));


      button.classList.add("active");
      selectedVariant = button.getAttribute("data-value");
    });
  });


  addToCartBtn.addEventListener("click", () => {
    const quantity = quantityInput.value;


    if (!selectedVariant) {
      selectedVariant = document.querySelector(".variant-option").getAttribute("data-value");
    }


    modalMessage.textContent = `${quantity} item(s) of size "${selectedVariant}" added to your cart!`;


    modal.classList.remove("hidden");
    modal.style.display = "flex";
  });


  closeModal.addEventListener("click", () => {
    modal.classList.add("hidden");
    modal.style.display = "none";
  });

  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.classList.add("hidden");
      modal.style.display = "none";
    }
  });


  fetchImages();
});

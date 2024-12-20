// nursahtuncel-OC-29-ımplement the you might also like section start
let List = [];
const getProduct = () => {
  fetch("https://fakestoreapi.com/products")
    .then((res) => res.json())
    .then((list) => {
      List = list;
      ProductDetails();
      getContainer();
    });
};
setRating = (rating) => {
  let starsHTML = "";
  for (let i = 1; i <= 5; i++) {
    if (i <= Math.floor(rating)) {
      starsHTML += '<div class="star full"></div>';
    } else if (i <= Math.ceil(rating)) {
      starsHTML += '<div class="star half"></div>';
    } else {
      starsHTML += '<div class="star empty"></div>';
    }
  }
  return starsHTML;
};

const getContainer = () => {
  const container = document.querySelector(".nt-images-container");
  container.innerHTML = " ";

  List.slice(0, 4).forEach((eleman) => {
    const itemHTML = `
      <div class="nt-images-container-half-box">
        <div class="nt-image-div">
          <img class="nt-product-image" src="${eleman.image}" alt="${
      eleman.title
    }" />
        </div>
        <p class="nt-prgrp-bttm">${eleman.title}</p>
        <div class="nt-stars-and-puan">
          <div class="stars">
            ${setRating(eleman.rating.rate)}
          </div>
          <div id="stars">${eleman.rating.rate}</div>
        </div>
        <div class="nt-new-price-old-price">
          <p class="nt-new-price-old-price-1">$${eleman.price}</p>
        </div>
      </div>
    `;
    container.innerHTML += itemHTML;
  });
};

getProduct();

// nursahtuncel-OC-29-ımplement the you might also like section end
//emre-OC-25-Product detail hero section start
const urlParams = new URLSearchParams(window.location.search);
let id = urlParams.get("id");
if (!id) {
  id = 1;
}
if (id > 20) {
  id = 20;
}

function ProductDetails() {
  const product = List.find((item) => item.id === parseInt(id));
  document.querySelector(".category").textContent = product.category;
  document.querySelector(".pd-hs-main-image").src = product.image;
  document.getElementById("small-image1").src = product.image;
  document.getElementById("small-image2").src = product.image;
  document.getElementById("small-image3").src = product.image;
  document.querySelector(".pd-hs-product-details h1").textContent =
    product.title;
  document.querySelector(".pd-hs-description").textContent =
    product.description;

  document.querySelector(".pd-hs-rating-stars").innerHTML = setRating(
    product.rating.rate
  );
  document.querySelector(".pd-hs-rating-number").textContent =
    product.rating.rate + "/5";
  const discountPrice = product.price * 0.6;
  document.querySelector(
    ".pd-hs-current-price"
  ).textContent = `$${discountPrice.toFixed(2)}`;
  document.querySelector(".pd-hs-original-price").textContent =
    "$" + `${product.price}`;
}

const buttons = document.querySelectorAll(".pd-hs-size-button");
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    buttons.forEach((btn) => btn.classList.remove("pd-hs-selected"));
    button.classList.add("pd-hs-selected");
  });
});

const buttonColorBrown = document.querySelector(".red");
const buttonColorGreen = document.querySelector(".green");
const buttonColorBlue = document.querySelector(".blue");
const buttonColorOriginal = document.querySelector(".originalColor");

const mainImage = document.querySelector(".pd-hs-main-image-container");
const smallImages = document.querySelectorAll(".pd-hs-small-image-container");

buttonColorBrown.addEventListener("click", () => {
  mainImage.style.backgroundColor = "red";

  smallImages.forEach((image) => {
    image.style.backgroundColor = "red";
  });
});

buttonColorGreen.addEventListener("click", () => {
  mainImage.style.backgroundColor = "green";

  smallImages.forEach((image) => {
    image.style.backgroundColor = "green";
  });
});

buttonColorBlue.addEventListener("click", () => {
  mainImage.style.backgroundColor = "blue";

  smallImages.forEach((image) => {
    image.style.backgroundColor = "blue";
  });
});

buttonColorOriginal.addEventListener("click", () => {
  mainImage.style.backgroundColor = "#f0eeed";

  smallImages.forEach((image) => {
    image.style.backgroundColor = "#f0eeed";
  });
});

const minusButton = document.getElementById("pd-hs-minus-btn");
const plusButton = document.getElementById("pd-hs-plus-btn");
const quantitySpan = document.querySelector(".quantity-number");
let quantity = parseInt(quantitySpan.textContent);
minusButton.addEventListener("click", () => {
  if (quantity > 1) {
    quantity--;
    quantitySpan.textContent = quantity;
  }
});
plusButton.addEventListener("click", () => {
  quantity++;
  quantitySpan.textContent = quantity;
});
const smallImagesSrc = document.querySelectorAll(".pd-hs-small-image");
const mainImageSrc = document.querySelector(".pd-hs-main-image");
smallImagesSrc.forEach((image) => {
  image.addEventListener("click", () => {
    mainImageSrc.src = image.src;
    smallImagesSrc.forEach((img) => {
      img.parentElement.classList.remove("pd-hs-selected-image-active");
    });
    image.parentElement.classList.add("pd-hs-selected-image-active");
  });
});

const colorbuttons = document.querySelectorAll(".pd-hs-color");
colorbuttons.forEach((button) => {
  button.addEventListener("click", () => {
    colorbuttons.forEach((btn) => btn.classList.remove("pd-hs-color-active"));
    button.classList.add("pd-hs-color-active");
  });
});

const addButton = document.getElementById("pd-hs-add-cart");

addButton.addEventListener("click", () => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  const product = List.find((item) => item.id === parseInt(id));

  let selectedColor = document.querySelector(".pd-hs-color.pd-hs-color-active");
  selectedColor = selectedColor ? selectedColor.id : "gray";

  let selectedSize = document.querySelector(
    ".pd-hs-size-button.pd-hs-selected"
  );
  selectedSize = selectedSize ? selectedSize.textContent : "Small";
  const amount = parseInt(quantitySpan.textContent);

  const cartItem = {
    amount: amount,
    size: selectedSize,
    color: selectedColor,
    product: product,
  };
  cart.push(cartItem);
  localStorage.setItem("cart", JSON.stringify(cart));
});
//emre-OC-25-Product detail hero section end
// nt-header-start...........................

function toggleMenu() {
  const navMenu = document.querySelector(".nt-hamburger-menu-2");
  navMenu.classList.toggle("active");
}
function toggleSearch() {
  const searchBox = document.querySelector(".nt-secret-search-box");
  searchBox.classList.toggle("active");
}
// nt-header-end............................

// esra-OC-6-implement-promo-banner-start

document
  .querySelector(".ip-banner-close-icon")
  .addEventListener("click", function () {
    document.querySelector(".implement-promo-banner").style.display = "none";
  });

// esra-OC-6-implement-promo-banner-end
// emre-OC-34-dropdown start
function toggleDropdown(event) {
  event.preventDefault();
  const parentLi = event.target.closest("li"); 
  parentLi.classList.toggle("show");
}

document.addEventListener("click", function (event) {
  const dropdowns = document.querySelectorAll("li.show");
  dropdowns.forEach((dropdown) => {
    if (!dropdown.contains(event.target)) {
      dropdown.classList.remove("show");
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const dropdownToggle = document.getElementById("dropdownToggle");
  const dropdownMenu = document.getElementById("dropdownMenu");

  dropdownToggle.addEventListener("click", (event) => {
    event.preventDefault();
    if (dropdownMenu.style.display === "block") {
      dropdownMenu.style.display = "none";
    } else {
      dropdownMenu.style.display = "block";
    }
  });

  document.addEventListener("click", (event) => {
    if (!dropdownToggle.contains(event.target) && !dropdownMenu.contains(event.target)) {
      dropdownMenu.style.display = "none";
    }
  });
});

const bsktBasketIcon = document.getElementById("basketIcon");
const bsktCartDropdownMenu = document.getElementById("bsktCartDropdownMenu");
const bsktCartItemsContainer = document.getElementById("bsktCartItemsContainer"); 

bsktBasketIcon.addEventListener("click", (e) => {
  e.preventDefault();
  bsktCartDropdownMenu.classList.toggle("bskt-active"); 
  bsktRenderCartItems();
});

document.addEventListener("click", (e) => {
  if (
    !bsktCartDropdownMenu.contains(e.target) && 
    e.target !== bsktBasketIcon && 
    !e.target.classList.contains("bskt-cart-remove-btn") 
  ) {
    bsktCartDropdownMenu.classList.remove("bskt-active");
  }
  
  if (e.target === bsktBasketIcon) {
    bsktCartDropdownMenu.classList.add("bskt-active"); 
  }
});


function bsktRenderCartItems() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  bsktCartItemsContainer.innerHTML = "";

  if (cart.length === 0) {
    bsktCartItemsContainer.innerHTML = `<p class="bskt-empty-message">Your Cart is empty!</p>`;
    return;
  }

  cart.forEach((item, index) => {
    const bsktCartItem = document.createElement("div");
    bsktCartItem.classList.add("bskt-cart-item");
    const title = item.product.title.length > 30 ? item.product.title.slice(0, 30) + "..." : item.product.title;

    bsktCartItem.innerHTML = `
      <span><a href="./cart.html">${title} - (${item.amount})</a></span>
      <button class="bskt-cart-remove-btn" data-index="${index}">X</button>
    `;

    bsktCartItemsContainer.appendChild(bsktCartItem);
  });

  document.querySelectorAll(".bskt-cart-remove-btn").forEach((button) => {
    button.addEventListener("click", (e) => {
      const index = e.target.getAttribute("data-index");
      bsktRemoveCartItem(index); 
    });
  });
}

function bsktRemoveCartItem(index) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index, 1); 
  localStorage.setItem("cart", JSON.stringify(cart)); 
  bsktRenderCartItems(); 
}
// emre-OC-34-dropdown end
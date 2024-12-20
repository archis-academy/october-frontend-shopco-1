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
    const title = item.product.title.length > 30 ? item.product.title.slice(0, 25) + "..." : item.product.title;

    bsktCartItem.innerHTML = `
      <span>${title} - (${item.amount})</span>
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

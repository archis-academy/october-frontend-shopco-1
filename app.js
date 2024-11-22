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
// esra/OC-12-the-new-arrivals-section-start

const apiUrl = "https://fakestoreapi.com/products";

const productContainer = document.querySelector(".new-arrivals-product");
const viewAllButton = document.getElementById("viewAllBtn");
const productsToShowInitially = 4;
let products = [];

async function fetchProducts() {
  try {
    const response = await fetch(apiUrl);
    products = await response.json();
    displayProducts(products.slice(0, productsToShowInitially));
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}

function displayProducts(productsToDisplay) {
  productContainer.innerHTML = "";
  productsToDisplay.forEach((product) => {
    const productElement = document.createElement("div");
    productElement.classList.add("product");
    productElement.innerHTML = `
            <img src="${product.image}" alt="${
      product.title
    }" class="product-image">
            <div class="product-info">
                <h3 class="product-name">${product.title}</h3>
                <div class="product-rating">
                    <span class="stars">${"★".repeat(
                      Math.floor(product.rating.rate)
                    )}</span>
                    <span class="rating-count">(${
                      product.rating.count
                    } reviews)</span>
                </div>
                <div class="product-price">
                    <span class="current-price">$${product.price.toFixed(
                      2
                    )}</span>
                    <span class="old-price">$${(product.price * 1.2).toFixed(
                      2
                    )}</span> <!-- Eski fiyatı %20 fazla alıyoruz -->
                    <span class="discount">-20%</span>
                </div>
            </div>
        `;
    productContainer.appendChild(productElement);
  });
}

viewAllButton.addEventListener("click", () => {
  if (viewAllButton.textContent === "View All") {
    displayProducts(products);
    viewAllButton.textContent = "View Less";
  } else {
    displayProducts(products.slice(0, productsToShowInitially));
    viewAllButton.textContent = "View All";
  }
});

document.addEventListener("DOMContentLoaded", fetchProducts);

// esra/OC-12-the-new-arrivals-section-end

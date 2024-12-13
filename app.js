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

// Create-the-Top-Selling-section start

let List = [];
const getProduct = () => {
  fetch("https://fakestoreapi.com/products")
    .then((res) => res.json())
    .then((list) => {
      List = list;
      getContainer();
    })
    .catch((err) => {
      console.error(err);
      container.innerHTML = "<p>Error loading products.</p>";
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

const navigateDetail = (id) => {
  window.location.href = `product-detail.html?id=${id}`;
};
const getContainer = () => {
  const container = document.querySelector(".products");
  container.innerHTML = "";

  List.slice(0, 20).forEach((eleman) => {
    const discountPrice = eleman.price * 0.6;
    const itemHTML = `
<div class="product">
<div onclick="navigateDetail(${eleman.id})" class="image-container">
              <img onclick="navigateDetail(${
                eleman.id
              })" class="top-selling-image"
                src="${eleman.image}"
                alt="${eleman.title}"
              />
              </div> 
              <h2>${eleman.title}</h2>
              <div class="nt-stars-and-puan">
          <div class="stars">
            ${setRating(eleman.rating.rate)} 
              </div>  
            <div id="point-stars">${eleman.rating.rate}/5</div>
         </div>
        
        <div class="price">
        <p class="current-price">$${discountPrice.toFixed(2)}</p>
              <p class="original-price">$${eleman.price}</p>
              <button class= "discount">40%</button>
        </div>
            </div>
    `;
    container.innerHTML += itemHTML;
  });
};
getProduct();

let container = document.querySelector(".products");
let viewAllButton = document.querySelector(".view-all");
let isExpanded = false;

const toggleProductsView = () => {

if (isExpanded) {
  container.classList.remove("expanded");
  viewAllButton.textContent = "View All";
} else {
  container.classList.add("expanded");
  viewAllButton.textContent = "Hide All";
}
isExpanded = !isExpanded;
};

viewAllButton.addEventListener("click", toggleProductsView);

const products = document.querySelector(".products")
const firstCardWidth = products.querySelector(".product").offsetWidth

let isDragging = false
let startX = 0
let startScrollLeft = 0

const dragStart = (e) => {
  e.preventDefault();
  isDragging = true
  startX = e.pageX || e.touches[0].pageX;
  startScrollLeft = products.scrollLeft
  products.classList.add("dragging")
}

const dragStop = () => {
  isDragging = false
  products.classList.remove("dragging")
}

const dragging = (e) => {
  if (!isDragging) return
  products.scrollLeft = startScrollLeft - (e.pageX - startX) * 1.5;
}

products.addEventListener("mouseover", dragging)
products.addEventListener("mousedown", dragStart)
document.addEventListener("mouseup", dragStop)

products.addEventListener("touchstart", dragStart);
products.addEventListener("touchmove", dragging);
document.addEventListener("touchend", dragStop);

// Create-the-Top-Selling-section end

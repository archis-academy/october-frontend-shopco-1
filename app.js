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
  window.location.href = `product-detail.html?ProductId=${id}`;
};
const getContainer = () => {
  const container = document.querySelector(".products");
  container.innerHTML = "";

  List.slice(0, 20).forEach((eleman) => {
    const discountPrice = eleman.price * 0.6;

    const itemHTML = `
<div   class="product">
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
  container.classList.toggle("expanded");
  viewAllButton.textContent = isExpanded ? "View All" : "Hide All";
  isExpanded = !isExpanded;
};

viewAllButton.addEventListener("click", toggleProductsView);

// Create-the-Top-Selling-section end

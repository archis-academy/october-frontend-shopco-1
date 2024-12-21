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

// melikeaksoy/OC-36-Category-Products-Section start

let List = []
let currentPage = 1
const itemsPerPage = 9

let sayfalama = [1, 2, 3]

let toplamSayfaSayisi = []

const getProduct = (category = '', minPrice = 0, maxPrice = 1000) => {
  fetch("./db.json")
    .then((res) => res.json())
    .then((list) => {
      List = list
      let filteredList = list;

      if (category) {
        filteredList = filteredList.filter(product => product.category === category);
      }

      filteredList = filteredList.filter(product => product.price >= minPrice && product.price <= maxPrice);

      List = filteredList
      toplamSayfaSayisi = Math.floor(List.length / itemsPerPage) + 1
      console.log(toplamSayfaSayisi)

      renderProducts()
    })
    .catch((error) => console.error("Error fetching products:", error))
}

const setRating = (rating) => {
  let starsHTML = ""
  for (let i = 1; i <= 5; i++) {
    if (i <= Math.floor(rating)) {
      starsHTML += '<div class="star full"></div>'
    } else if (i <= Math.ceil(rating)) {
      starsHTML += '<div class="star half"></div>'
    } else {
      starsHTML += '<div class="star empty"></div>'
    }
  }
  return starsHTML
}

const renderSayfalama = () => {
  const pageNumbersContainer = document.querySelector(".page-numbers")
  pageNumbersContainer.innerHTML = ""

  sayfalama.forEach((pageNumber, index) => {

    const pageButton = document.createElement("button")

    pageButton.textContent = `${pageNumber}`

    if (pageNumber === currentPage) {

      pageButton.classList.add("current")
    }

    pageButton.onclick = () => {
      currentPage = pageNumber

      switch (index) {

        case 0:
          if (sayfalama[index] !== 1) {
            sayfalama = sayfalama.map((number) => number - 1)
          }
          break

        case 1:
          if (sayfalama[index] === 2) {

          }
          break

        case 2:
          if (sayfalama[index] < 10) {
            sayfalama = sayfalama.map((number) => number + 1)
          }
          break

        default:
          break
      }
      renderSayfalama()
      renderProducts()
    }

    pageNumbersContainer.appendChild(pageButton)
  })

  nextButton.disabled = currentPage >= toplamSayfaSayisi
  prevButton.disabled = currentPage === 1
}

const renderProducts = async () => {
  const container = document.querySelector(".products")
  container.innerHTML = ""

  renderSayfalama()

  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage

  const productsToShow = List.slice(startIndex, endIndex)

  productsToShow.forEach((eleman) => {
    const discountRate = 40;
    const discountPrice = eleman.price * (1 - discountRate / 100);
    const itemHTML = `
<div class="product">
<div class="image-container">
              <img class="category-page-image"
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
          <p class="original-price">$${eleman.price.toFixed(2)}</p>
          <button class="discount">${discountRate}%</button>
        </div>
        
          </div>
    `
    container.innerHTML += itemHTML
  })
}

const prevButton = document.querySelector(".previous")
prevButton.onclick = () => sayfayi("dusur")
const nextButton = document.querySelector(".next")
nextButton.onclick = () => sayfayi("artir")

const sayfayi = (direction) => {

  if (direction === "artir" && currentPage < toplamSayfaSayisi) {
    currentPage += 1

    if (

      sayfalama[sayfalama.length - 1] < toplamSayfaSayisi &&
      currentPage >= 3
    ) {
      sayfalama = sayfalama.map((number) => number + 1)
    }
  }


  else if (direction === "dusur" && currentPage > 1) {
    currentPage -= 1
    if (

      sayfalama[0] > 1 &&
      currentPage <= toplamSayfaSayisi - 2
    ) {
      console.log("Previous:", currentPage)

      sayfalama = sayfalama.map((number) => number - 1)
    }
  }

  renderSayfalama()
  renderProducts()
}

getProduct()

// melikeaksoy/OC-36-Category-Products-Section start

//----------------------Category Filter Section Start--------------------------------------------

//Open-Close functions
function toggleFilter() {
  const filterDown = document.querySelector(".cf-drop-down-filter");
  const categoryFilter = document.querySelector(".category-filter"); //Responsivess size controle
  filterDown.classList.toggle("active");
  categoryFilter.classList.toggle("active");
}

function togglePrice() {
  const filterDown = document.querySelector(".cf-price");
  filterDown.classList.toggle("active");

  const priceImg = document.querySelector(".cf-price-img");
  priceImg.classList.toggle("rotate")
}

function toggleColors() {
  const filterDown = document.querySelector(".cf-colors");
  filterDown.classList.toggle("active");

  const colorsImg = document.querySelector(".cf-colors-img");
  colorsImg.classList.toggle("rotate")
}

function toggleSize() {
  const filterDown = document.querySelector(".cf-sizes");
  filterDown.classList.toggle("active");

  const sizesImg = document.querySelector(".cf-sizes-img");
  sizesImg.classList.toggle("rotate")
}

//Price-input
window.onload = function () {
  slideMin();
  slideMax();
}

const minValue = document.querySelector("#minValue");
const maxValue = document.querySelector("#maxValue");
const minPrice = document.querySelector("#minPrice");
const maxPrice = document.querySelector("#maxPrice");
const minGap = 0;
const inputTrack = document.querySelector(".cf-input-track");
const sliderMinVal = parseInt(minValue.min);
const sliderMaxVal = parseInt(maxValue.max);


function slideMin() {
  let gap = parseInt(maxValue.value) - parseInt(minValue.value);
  if (gap <= minGap) {
    minValue.value = parseInt(maxValue.value) - minGap;
  }
  minPrice.innerHTML = "$" + minValue.value;
  setArea();
}

function slideMax() {
  let gap = parseInt(maxValue.value) - parseInt(minValue.value);
  if (gap <= minGap) {
    maxValue.value = parseInt(minValue.value) + minGap;
  }
  maxPrice.innerHTML = "$" + maxValue.value;
  setArea();
}

function setArea() {
  inputTrack.style.left = (minValue.value / sliderMaxVal) * 100 + "%";
  minPrice.style.left = (minValue.value / sliderMaxVal) * 100 + "%";
  inputTrack.style.right = 100 - (maxValue.value / sliderMaxVal) * 100 + "%";
  maxPrice.style.right = 100 - (maxValue.value / sliderMaxVal) * 100 + "%";
}

//Filter 

document.querySelector(".filter-btn").addEventListener("click", function () {
  applyFilters();
});

const applyFilters = () => {
  const selectedCategoryElement = document.querySelector(".cf-product-container ul li.selected");
  const category = selectedCategoryElement ? selectedCategoryElement.getAttribute('data-category') : '';
  const minPrice = parseInt(document.getElementById("minValue").value, 10);
  const maxPrice = parseInt(document.getElementById("maxValue").value, 10);

  getProduct(category, minPrice, maxPrice);

}

document.querySelectorAll(".cf-product-container ul li").forEach(li => {
  li.addEventListener("click", function () {
    const category = this.getAttribute('data-category');
    console.log('Category selected:', category);
    
    li.classList.toggle('selected');
});
   });

// Fiyat aralığı 
document.getElementById("minValue").addEventListener("input", function () {
  const selectedCategoryElement = document.querySelector(".cf-product-container ul li.selected");
  const category = selectedCategoryElement ? selectedCategoryElement.getAttribute('data-category') : '';

  console.log('Min Price selected:', this.value);

  const minPrice = parseInt(this.value, 10);
  const maxPrice = parseInt(document.getElementById("maxValue").value, 10);

  getProduct(category, minPrice, maxPrice);
});

document.getElementById("maxValue").addEventListener("input", function () {
  const selectedCategoryElement = document.querySelector(".cf-product-container ul li.selected");
  const category = selectedCategoryElement ? selectedCategoryElement.getAttribute('data-category') : '';

  console.log('Max Price selected:', this.value);

  const minPrice = parseInt(document.getElementById("minValue").value, 10);
  const maxPrice = parseInt(this.value, 10);
  getProduct(category, minPrice, maxPrice);
});

window.onload = () => getProduct();




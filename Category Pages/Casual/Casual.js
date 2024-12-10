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

//Category Filter Section Start

//Open-Close functions
function toggleFilter() {
  const filterDown = document.querySelector(".cf-drop-down-filter");
  const categoryFilter = document.querySelector(".category-filter"); //Responsivess size controle
  filterDown.classList.toggle("active");
  categoryFilter.classList.toggle("active");
}

function togglePrice() {
  const filterDown = document.querySelector(".cf-price-input-values");
  filterDown.classList.toggle("active");
}

function toggleColors() {
  const filterDown = document.querySelector(".cf-colors");
  filterDown.classList.toggle("active");
}

function toggleSize() {
  const filterDown = document.querySelector(".cf-sizes");
  filterDown.classList.toggle("active");
}

 // Price Filter İnput
 const minValue = document.getElementById ("minValue");
 const maxValue = document.getElementById ("maxValue");
 const sliderWay = document.querySelector(".input-way");

//Category Filter Section End
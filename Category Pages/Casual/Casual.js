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







//----------------------Category Filter Section End--------------------------------------------

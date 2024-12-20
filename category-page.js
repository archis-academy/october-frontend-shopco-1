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
         <p class="original-price">$${eleman.price}</p>
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




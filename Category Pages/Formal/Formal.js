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


  // Price Filter İnput
 const minValue = document.getElementById ("minValue");
 const maxValue = document.getElementById ("maxValue");
 const minPrice = document.getElementById("minPrice");
 const maxPrice = document.getElementById("maxPrice");
 // cont productCards = document.getElementById(""); Ürünlerin cardlarını tanımla
 let allProducts = [];
 

 //ürünün fiyatı minumum değerden büyük maximum değerden küçük ise render et
 const filterProducts = (products, min, max) =>{
  const filtered = products.filter(product => product.price >= min && product.price <= max);
  renderProducts(filtered);
 };

 minValue.addEventListener("input", function(){
  const minPrice = parseInt(minValue.price);
  const maxPrice = parseInt(maxValue.price);

  if(minPrice > maxPrice) {
    minValue.price = maxPrice;
  } else {
    minPrice.textContent = minPrice;
    filterProducts(data, minPrice, maxPrice);
  }

 });

 maxValue.addEventListener("input", function(){
  const minPrice = parseInt(minValue.price);
  const maxPrice = parseInt(maxValue.price);

  if(maxPrice < minPrice) {
    maxValue.price = minPrice;
  } else {
    minPrice.textContent = minPrice;
    filterProducts(data, minPrice, maxPrice);
  }

 });

 
//Category Filter Section End

document.querySelectorAll('.cf-product-container ul li').forEach(item => {
  item.addEventListener('click', () => {
    item.classList.toggle('selected');
  });
});

document.querySelectorAll('.cf-colors-btn').forEach(button => {
  button.addEventListener('click', () => {
    button.classList.toggle('selected');
  });
});

document.querySelectorAll('.cf-sizes button').forEach(button => {
  button.addEventListener('click', () => {
    button.classList.toggle('selected');
  });
});

document.querySelectorAll('.cf-product-container ul li').forEach(item => {
  item.addEventListener('click', () => {
    item.classList.toggle('selected');
  });
});

document.addEventListener('DOMContentLoaded', function () {
  const filterApply = document.querySelector('.filter-btn');
  const productSection = document.querySelector('.'); //Product sınıfı eklenecek

  filterApply.addEventListener('click', applyFilters);

  function applyFilters() {
    const selectedCategory = getSelectedCategory();
    const selectedPriceRange = getselectedPriceRange();
    const selectedColors = getselectedColors();
    const selectedSizes = getselectedSizes();


    fetchProducts().then(products => {
      let filteredProducts = products;

      //Category
      if (selectedCategory) {
        filteredProducts = filteredProducts.filter(product => product.category === selectedCategory);
      }

      //Price
      filteredProducts = filteredProducts.gilter(product => product.price >= selectedPriceRange.min && roduct.price <= selectedPriceRange.max);

      //Colors
      if (selectedColors.legth > 0) {
        filteredProducts = filteredProducts.filter(product => selectedColors.includes(product.color));
      }

      //Sizes
      /* if (selectedSizes.length > 0){
        filteredProducts = filteredProducts.filter(product => selectedSizes.includes(product.size));
      } */

      displayProducts(filteredProducts);
    });

  }

})
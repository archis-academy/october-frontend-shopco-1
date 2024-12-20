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
 const productCards = document.getElementsByClassName(".product"); 
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

 

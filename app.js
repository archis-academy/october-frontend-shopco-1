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
    });
};
setRating = (rating) => {
  // 3.5
  let starsHTML;
  for (let i = 1; i <= 5; i++) {
    //5 yıldızım olduğu için 5'e kadar
    if (i <= Math.floor(rating)) {
      //3
      starsHTML += '<div class="star full"></div>'; //*
    } else if (i <= Math.ceil(rating)) {
      //4
      starsHTML += '<div class="star half"></div>';
    } else {
      starsHTML += '<div class="star empty"></div>'; //boş yıldız
    }
  }
  return starsHTML;
};

const getContainer = () => {
  const container = document.querySelector(".products");
  container.innerHTML = "";

  List.slice(0, 20).forEach((eleman) => {
    const discountPrice = eleman.price * 0.6;

    const itemHTML = `
<div class="product">
<div class="image-container">
              <img class="top-selling-image"
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

// Create-the-Top-Selling-section end

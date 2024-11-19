// nursahtuncel-OC-29-ımplement the you might also like section start
let List = [];
const getProduct = () => {
  fetch("https://fakestoreapi.com/products")
    .then((res) => res.json())
    .then((list) => {
      List = list;
      ProductDetails();
      getContainer();
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

const getContainer = () => {
  const container = document.querySelector(".nt-images-container");
  container.innerHTML = " ";

  List.slice(0, 4).forEach((eleman) => {
    const itemHTML = `
      <div class="nt-images-container-half-box">
        <div class="nt-image-div">
          <img class="nt-product-image" src="${eleman.image}" alt="${
      eleman.title
    }" />
        </div>
        <p class="nt-prgrp-bttm">${eleman.title}</p>
        <div class="nt-stars-and-puan">
          <div class="stars">
            ${setRating(eleman.rating.rate)}
          </div>
          <div id="stars">${eleman.rating.rate}</div>
        </div>
        <div class="nt-new-price-old-price">
          <p class="nt-new-price-old-price-1">$${eleman.price}</p>
        </div>
      </div>
    `;
    container.innerHTML += itemHTML;
  });
};

getProduct();

// nursahtuncel-OC-29-ımplement the you might also like section end
//emre-OC-25-Product detail hero section start 
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("productId");

function ProductDetails() {

  const product = List.find((item) => item.id === parseInt(productId));

  document.querySelector(".pd-hs-main-image").src = product.image;
  document.getElementById("small-image1").src = product.image;
  document.getElementById("small-image2").src = product.image;
  document.getElementById("small-image3").src = product.image;
  // document.querySelector(".pd-hs-main-image").style.opacity=1;
  document.querySelector(".pd-hs-product-details h1").textContent = product.title;
  document.querySelector(".pd-hs-description").textContent = product.description;

  const discountPrice = product.price * 0.60;
  document.querySelector(".pd-hs-rating-stars").innerHTML=setRating(product.rating.rate);
  document.querySelector(".pd-hs-rating-number").textContent=product.rating.rate+"/5";
  document.querySelector(".pd-hs-current-price").textContent =`$${discountPrice.toFixed(0)}` ;
  document.querySelector(".pd-hs-original-price").textContent = "$"+`${product.price}`;
}

const buttons = document.querySelectorAll(".pd-hs-size-button");
buttons.forEach(button => {
    button.addEventListener("click", () => {
        buttons.forEach(btn => btn.classList.remove("pd-hs-selected"));
        button.classList.add("pd-hs-selected");
    });
});



//emre-OC-25-Product detail hero section end
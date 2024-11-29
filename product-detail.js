// nursahtuncel-OC-29-ımplement the you might also like section start
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
  const container = document.querySelector(".nt-images-container");
  container.innerHTML = "";

  List.slice(0, 20).forEach((eleman) => {
    const discount = eleman.price * 0.6;
    const itemHTML = `
      <div class="nt-images-container-half-box">
        <div onclick="navigateDetail(${eleman.id})" class="nt-image-div">
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
          <p class="nt-new-price-old-price-1">$${discount.toFixed(2)}</p>
             <p class="nt-new-price-old-price-2">$${eleman.price}</p>
          <p class="nt-new-price-old-price-3">-40%</p>
        </div>
      </div>
    `;
    container.innerHTML += itemHTML;
  });
};

getProduct();

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
function yildizlar(rating) {
  let yildizHTML = ``;

  yildizSayisi = rating - (rating % 1);
  yarimyildiz = rating % 1;

  for (let i = 0; i < yildizSayisi; i++) {
    yildizHTML += `<img src="images/Star 2.svg" alt="" />`;
  }
  if (yarimyildiz >= 0.5) {
    yildizHTML += `<img src="images/Star 5.png" alt="" />`;
  }
  return yildizHTML;
}

const getContainer = () => {
  const container = document.querySelector(".nt-images-container");
  container.innerHTML;

  List.slice(0, 20).forEach((eleman) => {
    const itemHTML = `
  
  <div class="nt-images-container-half-box">
  
  <div class="nt-image-div">
  <img class="nt-product-image" src="${eleman.image}" alt="${eleman.title}" />
  </div>
  <p class="nt-prgrp-bttm">${eleman.title}</p>
  <div class="nt-stars-and-puan">
  <div>
  ${yildizlar(eleman.rating.rate)}
  </div>
  <div id="stars">${eleman.rating.rate}}
  </div>
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

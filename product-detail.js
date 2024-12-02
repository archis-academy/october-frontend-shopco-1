// nursahtuncel-OC-28-review section start

const tabItems = document.querySelectorAll(".tab-item");
const tabPanes = document.querySelectorAll(".tab-pane");

tabItems.forEach((tab, index) => {
  tab.addEventListener("click", () => {
    tabItems.forEach((item) => item.classList.remove("active"));
    tabPanes.forEach((pane) => pane.classList.remove("active"));

    tab.classList.add("active");
    tabPanes[index].classList.add("active");
  });
});
// **************************Dropdown menü aç/kapat**********************
const dropdownToggle = document.querySelector(".dropdown-toggle");
const dropdownMenu = document.querySelector(".dropdown-menu");

dropdownToggle.addEventListener("click", () => {
  dropdownMenu.style.display =
    dropdownMenu.style.display === "block" ? "none" : "block";
});

// ****************Dropdown menüdeki bir seçenek seçildiğinde***********
dropdownMenu.addEventListener("click", (e) => {
  if (e.target.tagName === "LI") {
    dropdownToggle.textContent = e.target.textContent;
    dropdownMenu.style.display = "none";
  }
});

// *********************"Write a Review" butonu***************
document.querySelector(".write-review-btn").addEventListener("click", () => {
  alert("bu kısmı daha sonra ekleyeceğim");
});

// **************************review******************
fetch("content.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Veri alınamadı: " + response.statusText);
    }
    return response.json();
  })
  .then((data) => {
    const reviewContainer = document.querySelector(".review-container");
    reviewContainer.innerHTML = `
 <div class="reviews-nt">
    <div class="author-commert-date-container">
 <div class="rating-review-container">
   <div>
   <img src="images/review-section/rating.svg" alt="">
   </div>
      <div> <img src="images/review-section/ücnokta.svg" alt=""></div>
 </div>
  
      <div class="author-review-container">
 <p> ${data.ad}</p>
      </div>
      <div class="comment-review-container">
 <p>
 ${data.yorum}
 </p>
      </div>
    </div>
      <div class="date-review-nt">
 <p>Posted on ${data.tarih}</p>     </div>
    </div>














      <p>İsim: ${data.name}</p>
      <p>Yaş: ${data.age}</p>
      <p>Şehir: ${data.city}</p>
    `;
  })
  .catch((error) => {
    console.error("Bir hata oluştu:", error);
  });

// nursahtuncel-OC-28-review section end
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

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
//*************
const dropdownToggle = document.querySelector(".dropdown-toggle");
const dropdownMenu = document.querySelector(".dropdown-menu");

dropdownToggle.addEventListener("click", () => {
  dropdownMenu.style.display =
    dropdownMenu.style.display === "block" ? "none" : "block";
});
//***********
dropdownMenu.addEventListener("click", (e) => {
  if (e.target.tagName === "LI") {
    dropdownToggle.textContent = e.target.textContent;
    dropdownMenu.style.display = "none";
  }
});
//************
document.querySelector(".write-review-btn").addEventListener("click", () => {
  alert("bu kısmı daha sonra ekleyeceğim");
});

// ***********

let reviewsArray = [];

const getReviews = () => {
  fetch(".vscode/content.json")
    .then((response) => response.json())
    .then((reviews) => {
      reviewsArray = reviews;
      getAllReviews();
    });
};

const getAllReviews = () => {
  const reviewContainer = document.querySelector(".review-container");
  reviewContainer.innerHTML = "";

  reviewsArray.slice(0, 6).forEach((data) => {
    const dataHTML = `
 <div class="reviews-nt">
  <div class="author-commert-date-container">
  <div class="rating-review-container">

  <div>
      ${setRating(data.puan)}
  </div>
   <div class ="ellipsis-nt">
    <img src="images/review-section/ücnokta.svg" alt="">
  </div>
</div>
<div class="author-review-container">
  <p>${data.ad} ${data.soyad}</p>
</div>
<div class="comment-review-container">
  <p>${data.yorum}</p>
</div>
   </div>
   <div class="date-review-nt">
<p>Posted on ${data.tarih}</p>
   </div>
 </div>`;
    reviewContainer.innerHTML += dataHTML;
  });
};

getReviews();
//Load more reviews button ******************
const loadAllReviews = () => {
  const reviewContainer = document.querySelector(".review-container");
  reviewContainer.innerHTML = ""; // Önce container'ı temizle

  reviewsArray.forEach((data) => {
    const dataHTML = `
 <div class="reviews-nt">
  <div class="author-commert-date-container">
  <div class="rating-review-container">

  <div>
      ${setRating(data.puan)}
  </div>
   <div class ="ellipsis-nt">
    <img src="images/review-section/ücnokta.svg" alt="">
  </div>
</div>
<div class="author-review-container">
  <p>${data.ad} ${data.soyad}</p>
</div>
<div class="comment-review-container">
  <p>${data.yorum}</p>
</div>
   </div>
   <div class="date-review-nt">
<p>Posted on ${data.tarih}</p>
   </div>
 </div>`;
    reviewContainer.innerHTML += dataHTML;
  });
};

let isAllReviewsVisible = false;
const loadMoreBtn = document.querySelector(".Load-more-reviews-btn");
loadMoreBtn.addEventListener("click", () => {
  if (isAllReviewsVisible) {
    getAllReviews();
  } else {
    loadAllReviews();
  }
  isAllReviewsVisible = !isAllReviewsVisible;
});

getAllReviews();

// ***********
const faqsQuestions = document.querySelectorAll(".faqs-question");

faqsQuestions.forEach((question) => {
  question.addEventListener("click", () => {
    const activeAnswer = document.querySelector(".faqs-answer.active");
    if (activeAnswer && activeAnswer !== question.nextElementSibling) {
      activeAnswer.classList.remove("active");
      activeAnswer.previousElementSibling.classList.remove("active");
    }

    question.classList.toggle("active");
    question.nextElementSibling.classList.toggle("active");
  });
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
          <img class="nt-product-image" draggable="false" src="${
            eleman.image
          }" alt="${eleman.title}" />
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

// mouse ile scroll özelliği..
const carousel = document.querySelector(".nt-images-container");
let isDragging = false;
let startX;
let scrollStart;

const dragStart = (e) => {
  isDragging = true;
  carousel.classList.add("dragging");
  startX = e.pageX;
  scrollStart = carousel.scrollLeft;
};

const dragging = (e) => {
  if (!isDragging) return;
  carousel.scrollLeft = scrollStart - (e.pageX - startX);
};

const dragStop = () => {
  isDragging = false;
  carousel.classList.remove("dragging");
};

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);

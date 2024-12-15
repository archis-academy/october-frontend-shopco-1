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
// ***********
const addReviewBtn = document.querySelector(".write-review-btn");
const reviewFormContainer = document.querySelector(".review-form-container");

addReviewBtn.addEventListener("click", () => {
  reviewFormContainer.style.display =
    reviewFormContainer.style.display === "block" ? "none" : "block";
});

const reviewForm = document.getElementById("review-form");

reviewForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const rating = document.getElementById("review-rating").value;
  const name = document.getElementById("review-name").value;
  const comment = document.getElementById("review-comment").value;

  reviewForm.reset();

  alert("Your review has been submitted!");

  reviewFormContainer.style.display = "none";
});

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
document
  .getElementsByClassName("write-review-btn")[0]
  .addEventListener("click", function () {
    document
      .querySelector(".review-form-container")
      .scrollIntoView({ behavior: "smooth", block: "center" });
  });

async function getData() {
  const tdData = await fetch("https://fakestoreapi.com/products");
  const response = await tdData.json();

  const productDetailContainer = document.querySelector(".tbody");
  response.forEach((product) => {
    const itemHTML = `
            <tr>
                <td>${product.id}</td>
                <td>${product.title}</td>
                <td>${product.description}</td>
                <td>$${product.price}</td>
                <td>${product.category}</td>
                <td>${product.rating.rate}</td>
                <td><img src="${product.image}" alt="${product.title}"></td>
            </tr>
        `;
    productDetailContainer.innerHTML += itemHTML;
  });
}

window.onload = getData;

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
  window.location.href = `product-detail.html?id=${id}`;
};
const getContainer = () => {
  const container = document.querySelector(".nt-images-container");
  container.innerHTML = "";
  List.slice(0, 20).forEach((item) => {
    const discount = item.price * 0.6;
    const itemHTML = `
      <div class="nt-images-container-half-box">
        <div onclick="navigateDetail(${item.id})" class="nt-image-div">
          <img class="nt-product-image"  src="${item.image}" alt="${
      item.title
    }" />
        </div>
 
        <p class="nt-prgrp-bttm">${item.title}</p>
        <div class="nt-stars-and-puan">
          <div class="stars">
            ${setRating(item.rating.rate)}
          </div>
          <div id="stars">${item.rating.rate}</div>
        </div>
        <div class="nt-new-price-old-price">
          <p class="nt-new-price-old-price-1">$${discount.toFixed(2)}</p>
          <p class="nt-new-price-old-price-2">$${item.price}</p>
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
const firstCardWidth = carousel.querySelector(
  ".nt-images-container-half-box"
).offsetWidth;
let isDragging = false;
let startX;
let startScrollLeft = 0;

const dragStart = (e) => {
  e.preventDefault(); //sayfanın kaymasını engelliyoor
  isDragging = true;
  startX = e.pageX || e.touches[0].pageX;
  startScrollLeft = carousel.scrollLeft;
  carousel.classList.add("dragging");
};
const dragStop = () => {
  isDragging = false;
  carousel.classList.remove("dragging");
};
const dragging = (e) => {
  if (!isDragging) return;
  carousel.scrollLeft = startScrollLeft - (e.pageX - startX) * 1.5;
};

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
carousel.addEventListener("touchstart", dragStart);
carousel.addEventListener("touchmove", dragging);
document.addEventListener("touchend", dragStop);

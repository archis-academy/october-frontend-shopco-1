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
let id = urlParams.get("id");
if (!id) {
  id = 1;
}
if (id > 20) {
  id = 20;
}

function ProductDetails() {
  const product = List.find((item) => item.id === parseInt(id));
  document.querySelector(".category").textContent = product.category;
  document.querySelector(".pd-hs-main-image").src = product.image;
  document.getElementById("small-image1").src = product.image;
  document.getElementById("small-image2").src = product.image;
  document.getElementById("small-image3").src = product.image;
  document.querySelector(".pd-hs-product-details h1").textContent =
    product.title;
  document.querySelector(".pd-hs-description").textContent =
    product.description;

  document.querySelector(".pd-hs-rating-stars").innerHTML = setRating(
    product.rating.rate
  );
  document.querySelector(".pd-hs-rating-number").textContent =
    product.rating.rate + "/5";
  const discountPrice = product.price * 0.6;
  document.querySelector(
    ".pd-hs-current-price"
  ).textContent = `$${discountPrice.toFixed(2)}`;
  document.querySelector(".pd-hs-original-price").textContent =
    "$" + `${product.price}`;
}

const buttons = document.querySelectorAll(".pd-hs-size-button");
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    buttons.forEach((btn) => btn.classList.remove("pd-hs-selected"));
    button.classList.add("pd-hs-selected");
  });
});

const buttonColorBrown = document.querySelector(".red");
const buttonColorGreen = document.querySelector(".green");
const buttonColorBlue = document.querySelector(".blue");
const buttonColorOriginal = document.querySelector(".originalColor");

const mainImage = document.querySelector(".pd-hs-main-image-container");
const smallImages = document.querySelectorAll(".pd-hs-small-image-container");

buttonColorBrown.addEventListener("click", () => {
  mainImage.style.backgroundColor = "red";

  smallImages.forEach((image) => {
    image.style.backgroundColor = "red";
  });
});

buttonColorGreen.addEventListener("click", () => {
  mainImage.style.backgroundColor = "green";

  smallImages.forEach((image) => {
    image.style.backgroundColor = "green";
  });
});

buttonColorBlue.addEventListener("click", () => {
  mainImage.style.backgroundColor = "blue";

  smallImages.forEach((image) => {
    image.style.backgroundColor = "blue";
  });
});

buttonColorOriginal.addEventListener("click", () => {
  mainImage.style.backgroundColor = "#f0eeed";

  smallImages.forEach((image) => {
    image.style.backgroundColor = "#f0eeed";
  });
});

const minusButton = document.getElementById("pd-hs-minus-btn");
const plusButton = document.getElementById("pd-hs-plus-btn");
const quantitySpan = document.querySelector(".quantity-number");
let quantity = parseInt(quantitySpan.textContent);
minusButton.addEventListener("click", () => {
  if (quantity > 1) {
    quantity--;
    quantitySpan.textContent = quantity;
  }
});
plusButton.addEventListener("click", () => {
  quantity++;
  quantitySpan.textContent = quantity;
});
const smallImagesSrc = document.querySelectorAll(".pd-hs-small-image");
const mainImageSrc = document.querySelector(".pd-hs-main-image");
smallImagesSrc.forEach((image) => {
  image.addEventListener("click", () => {
    mainImageSrc.src = image.src;
    smallImagesSrc.forEach((img) => {
      img.parentElement.classList.remove("pd-hs-selected-image-active");
    });
    image.parentElement.classList.add("pd-hs-selected-image-active");
  });
});

const colorbuttons = document.querySelectorAll(".pd-hs-color");
colorbuttons.forEach((button) => {
  button.addEventListener("click", () => {
    colorbuttons.forEach((btn) => btn.classList.remove("pd-hs-color-active"));
    button.classList.add("pd-hs-color-active");
  });
});

const addButton = document.getElementById("pd-hs-add-cart");

addButton.addEventListener("click", () => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  const product = List.find((item) => item.id === parseInt(id));

  let selectedColor = document.querySelector(".pd-hs-color.pd-hs-color-active");
  selectedColor = selectedColor ? selectedColor.id : "gray";

  let selectedSize = document.querySelector(
    ".pd-hs-size-button.pd-hs-selected"
  );
  selectedSize = selectedSize ? selectedSize.textContent : "Small";
  const amount = parseInt(quantitySpan.textContent);

  const cartItem = {
    amount: amount,
    size: selectedSize,
    color: selectedColor,
    product: product,
  };
  cart.push(cartItem);
  localStorage.setItem("cart", JSON.stringify(cart));
});
//emre-OC-25-Product detail hero section end
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
  fetch("content.json")
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
//product detail sekmesi
async function getData(productId) {
  const Data = await fetch(`https://fakestoreapi.com/products/${productId}`);
  const response = await Data.json();

  function ProductDetailTab(product) {
    document.getElementById("th-id").textContent = product.id;
    document.getElementById("th-title").textContent = product.title;
    document.getElementById("th-description").textContent = product.description;
    document.getElementById("th-category").textContent = product.category;
  }

  ProductDetailTab(response);
}
window.onload = function () {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("id");

  getData(productId);
};

// nursahtuncel-OC-28-review section end

// nursahtuncel-OC-29-ımplement the you might also like section start
let Listem = [];
const getAllProduct = () => {
  fetch("https://fakestoreapi.com/products")
    .then((res) => res.json())
    .then((list) => {
      Listem = list;
      getAllContainer();
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
const getAllContainer = () => {
  const container = document.querySelector(".nt-images-container28");
  container.innerHTML = "";
  Listem.slice(0, 20).forEach((item) => {
    const discount = item.price * 0.6;
    const itemHTML = `
      <div class="nt-images-container-half-box28">
        <div onclick="navigateDetail(${item.id})" class="nt-image-div28">
          <img class="nt-product-image28" src="${item.image}" alt="${
      item.title
    }" />
        </div>
        <p class="nt-prgrp-bttm28">${item.title}</p>
        <div class="nt-stars-and-puan28">
          <div class="stars">
            ${setRating(item.rating.rate)}
          </div>
          <div id="stars">${item.rating.rate}</div>
        </div>
        <div class="nt-new-price-old-price28">
          <p class="nt-new-price-old-price-128">$${discount.toFixed(2)}</p>
          <p class="nt-new-price-old-price-228">$${item.price}</p>
          <p class="nt-new-price-old-price-328">-40%</p>
        </div>
      </div>
   `;
    container.innerHTML += itemHTML;
  });

  // Mouse drag feature
  let isDragging = false;
  let startX;
  let startScrollLeft;

  const dragStart = (e) => {
    e.preventDefault();
    isDragging = true;
    startX = e.pageX || e.touches[0].pageX;
    startScrollLeft = container.scrollLeft;
    container.classList.add("dragging");
  };

  const dragging = (e) => {
    if (!isDragging) return;
    container.scrollLeft = startScrollLeft - (e.pageX - startX) * 1.5;
  };

  const dragStop = () => {
    isDragging = false;
    container.classList.remove("dragging");
  };

  container.addEventListener("mousedown", dragStart);
  container.addEventListener("mousemove", dragging);
  document.addEventListener("mouseup", dragStop);

  container.addEventListener("touchstart", dragStart);
  container.addEventListener("touchmove", dragging);
  document.addEventListener("touchend", dragStop);
};

getAllProduct();

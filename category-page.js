let List = [];
let currentPage = 1;
const itemsPerPage = 9;

const getProduct = () => {
  fetch("http://localhost:3000/products")
    .then((res) => res.json())
    .then((list) => {
      List = list;
      renderPageNumbers();
      renderProducts();
    })
    .catch((error) => console.error("Error fetching products:", error));
};

const setRating = (rating) => {
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

const renderProducts = () => {
  const container = document.querySelector(".products");
  container.innerHTML = "";

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const productsToShow = List.slice(startIndex, endIndex);

  productsToShow.forEach((eleman) => {
    const itemHTML = `
<div class="product">
<div class="image-container">
              <img class="category-page-image"
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
         <p class="original-price">$${eleman.price}</p>
         </div> 
          </div>
    `;
    container.innerHTML += itemHTML;
  });
};

const renderPageNumbers = () => {
  const pageNumbersContainer = document.querySelector(".page-numbers");
  pageNumbersContainer.innerHTML = "";

  const totalPages = Math.ceil(List.length / itemsPerPage);
  const maxVisiblePages = 5; // Ortada maksimum kaç sayfa numarası görünecek

  let startPage = Math.max(currentPage - Math.floor(maxVisiblePages / 2), 1);
  let endPage = Math.min(startPage + maxVisiblePages - 1, totalPages);

  if (endPage - startPage + 1 < maxVisiblePages && startPage > 1) {
    startPage = Math.max(endPage - maxVisiblePages + 1, 1);
  }

  // "Previous" Butonunu Ekleyin
  const previousButton = document.querySelector(".previous");
  previousButton.disabled = currentPage === 1;
  previousButton.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      renderProducts();
      renderPageNumbers();
    }
  });

  // "Next" Butonunu Ekleyin
  const nextButton = document.querySelector(".next");
  nextButton.disabled = currentPage === totalPages;
  nextButton.addEventListener("click", () => {
    if (currentPage < totalPages) {
      currentPage++;
      renderProducts();
      renderPageNumbers();
    }
  });

  // Sayfa düğmelerini oluşturmak için
  const addPageButton = (page) => {
    const pageButton = document.createElement("button");
    pageButton.textContent = page;
    pageButton.classList.add("page-number");
    if (page === currentPage) {
      pageButton.classList.add("active");
    }
    pageButton.addEventListener("click", () => {
      currentPage = page;
      renderProducts();
      renderPageNumbers();
    });
    pageNumbersContainer.appendChild(pageButton);
  };

  // Sayfa numaralarını dinamik olarak oluştur
  if (totalPages <= maxVisiblePages + 2) {
    // Tüm sayfa numaralarını göster
    for (let i = 1; i <= totalPages; i++) {
      addPageButton(i);
    }
  } else {
    // İlk sayfa numarası
    addPageButton(1);

    // "..." ve ortadaki sayfa numaraları
    if (currentPage > maxVisiblePages) {
      const dots = document.createElement("span");
      dots.textContent = "...";
      pageNumbersContainer.appendChild(dots);
    }

    const startPage = Math.max(2, currentPage - 1);
    const endPage = Math.min(currentPage + 1, totalPages - 1);
    for (let i = startPage; i <= endPage; i++) {
      addPageButton(i);
    }

    // "..." ve son sayfa numarası
    if (currentPage < totalPages - 2) {
      const dots = document.createElement("span");
      dots.textContent = "...";
      pageNumbersContainer.appendChild(dots);
    }

    addPageButton(totalPages);
  }
};

getProduct();


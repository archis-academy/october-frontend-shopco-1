let List = []
let currentPage = 1
const itemsPerPage = 9

let sayfalama = [1, 2, 3]

let toplamSayfaSayisi = []

const getProduct = () => {
  fetch("./db.json")
    .then((res) => res.json())
    .then((list) => {
      List = list
      toplamSayfaSayisi = Math.floor(List.length / itemsPerPage) + 1
      console.log(toplamSayfaSayisi)

      renderProducts()
    })
    .catch((error) => console.error("Error fetching products:", error))
}

const setRating = (rating) => {
  let starsHTML = ""
  for (let i = 1; i <= 5; i++) {
    if (i <= Math.floor(rating)) {
      starsHTML += '<div class="star full"></div>'
    } else if (i <= Math.ceil(rating)) {
      starsHTML += '<div class="star half"></div>'
    } else {
      starsHTML += '<div class="star empty"></div>'
    }
  }
  return starsHTML
}

const renderSayfalama = () => {
  const pageNumbersContainer = document.querySelector(".page-numbers")
  pageNumbersContainer.innerHTML = ""

  sayfalama.forEach((pageNumber, index) => {
 
    const pageButton = document.createElement("button")
 
    pageButton.textContent = `${pageNumber}`

    if (pageNumber === currentPage) {
      
      pageButton.classList.add("current")
    }

    pageButton.onclick = () => {
      currentPage = pageNumber

      switch (index) {
   
        case 0:
          if (sayfalama[index] !== 1) {
            sayfalama = sayfalama.map((number) => number - 1)
          }
          break

        case 1:
          if (sayfalama[index] === 2) {
 
          }
          break

        case 2:
          if (sayfalama[index] < 10) {
            sayfalama = sayfalama.map((number) => number + 1)
          }
          break

        default:
          break
      }
      renderSayfalama()
      renderProducts()
    }

    pageNumbersContainer.appendChild(pageButton)
  })

  nextButton.disabled = currentPage >= toplamSayfaSayisi
  prevButton.disabled = currentPage === 1
}

const renderProducts = async () => {
  const container = document.querySelector(".products")
  container.innerHTML = ""

  renderSayfalama()

  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage

  const productsToShow = List.slice(startIndex, endIndex)

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
    `
    container.innerHTML += itemHTML
  })
}

const prevButton = document.querySelector(".previous")
prevButton.onclick = () => sayfayi("dusur")
const nextButton = document.querySelector(".next")
nextButton.onclick = () => sayfayi("artir")

const sayfayi = (direction) => {

  if (direction === "artir" && currentPage < toplamSayfaSayisi) {
    currentPage += 1

    if (
   
      sayfalama[sayfalama.length - 1] < toplamSayfaSayisi &&
      currentPage >= 3
    ) {
      sayfalama = sayfalama.map((number) => number + 1)
    }
  }


  else if (direction === "dusur" && currentPage > 1) {
    currentPage -= 1
    if (
      
      sayfalama[0] > 1 &&
      currentPage <= toplamSayfaSayisi - 2
    ) {
      console.log("Previous:", currentPage)

      sayfalama = sayfalama.map((number) => number - 1)
    }
  }

  renderSayfalama()
  renderProducts()
}

getProduct()

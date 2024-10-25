const fetchProducts = async () => {
  try {
    const response = await fetch("https://fakestoreapi.com/products")
    if (!response.ok) {
      throw new Error("Veri alınırken bir sorun oluştu.")
    }
    const products = await response.json()
    console.log("Ürünler:", products)
    renderProducts(products)
  } catch (error) {
    console.error("Hata:", error)
  }
}

// Urunler Baslangicv/////

const urunlerContainer = document.querySelector(".test-section")

const renderProducts = (kedi) => {
  // Ürünleri urunlerContainer içerisine ekleme
  urunlerContainer.innerHTML = kedi
    .map(
      (product) => `
        <div class="urun-kart">
          <div>
            <img src="${product.image}" alt="${product.title}">
          </div>
          <h3>${product.title}</h3>
          <p>${product.price} USD</p>
        </div>
      `
    )
    .join("")
}

// Fonksiyonu çağırarak ürünleri al
fetchProducts()

// Urunler Son

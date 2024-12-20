document.addEventListener("DOMContentLoaded", function () {
    const cartContainer = document.querySelector(".product-container");
    const subtotalElement = document.querySelector(".summary-item.subtotal p:last-child");
    const totalElement = document.querySelector(".summary-item.total p:last-child");
    const discountElement = document.querySelector(".summary-item:nth-child(2) p:last-child");
    const deliveryFeeElement = document.querySelector(".summary-item:nth-child(3) p:last-child");
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const updateCartDisplay = () => {
        cartContainer.innerHTML = "";  

        let subtotal = 0; 

        
        cart.forEach((item, index) => {
            const product = item.product;
            const amount = item.amount;
            const size = item.size ;
            const color = item.color ;
            const price = product.price;
            const totalPrice = price * amount;

            subtotal += totalPrice;  

            const productHTML = `
                <div class="product" data-index="${index}">
                    <div class="product-header">
                        <img src="${product.image}" alt="${product.title}" class="product-image">
                        <div class="product-details">
                            <h3>${product.title}</h3>
                            <p>Size: ${size}</p>
                            <p>Color: ${color}</p>
                            <p class="price">$${price}</p>
                        </div>
                        <div class="product-actions">
                            <button class="remove-item"><img src="images/cart/delete.png" alt="Delete"></button>
                            <div class="quantity-controls">
                                <button class="decrease">-</button>
                                <span class="quantity">${amount}</span>
                                <button class="increase">+</button>
                            </div>
                        </div>
                    </div>
                    <hr>
                </div>
            `;
            cartContainer.innerHTML += productHTML;
        });

      
        updateOrderSummary(subtotal);
    };

    
    const updateOrderSummary = (subtotal) => {
        
        const discount = 0.20;
        const deliveryFee = 15; 

        const discountAmount = subtotal * discount;
        const total = subtotal - discountAmount + deliveryFee;

        
        if (subtotalElement) {
            subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
        }
        if (discountElement) {
            discountElement.textContent = `-$${discountAmount.toFixed(2)}`;
        }
        if (deliveryFeeElement) {
            deliveryFeeElement.textContent = `$${deliveryFee.toFixed(2)}`;
        }
        if (totalElement) {
            totalElement.textContent = `$${total.toFixed(2)}`;
        }
    };

    cartContainer.addEventListener("click", (e) => {
        if (e.target && e.target.closest(".remove-item")) {
            const index = e.target.closest(".product").dataset.index; // Silinecek ürünün indeksini al
            cart.splice(index, 1); 
            localStorage.setItem("cart", JSON.stringify(cart)); 
            updateCartDisplay(); 
        }

    
        if (e.target && e.target.classList.contains("increase")) {
            const index = e.target.closest(".product").dataset.index;
            cart[index].amount += 1;
            localStorage.setItem("cart", JSON.stringify(cart)); // Güncelle
            updateCartDisplay();
        }

        
        if (e.target && e.target.classList.contains("decrease")) {
            const index = e.target.closest(".product").dataset.index;
            if (cart[index].amount > 1) {
                cart[index].amount -= 1;
                localStorage.setItem("cart", JSON.stringify(cart)); // Güncelle
                updateCartDisplay();
            }
        }
    });

    
    updateCartDisplay();
});

// nt-header-start...........................

function toggleMenu() {
    const navMenu = document.querySelector(".nt-hamburger-menu-2");
    navMenu.classList.toggle("active");
  }
  function toggleSearch() {
    const searchBox = document.querySelector(".nt-secret-search-box");
    searchBox.classList.toggle("active");
  }
  // nt-header-end............................
  
  // esra-OC-6-implement-promo-banner-start
  
  document
    .querySelector(".ip-banner-close-icon")
    .addEventListener("click", function () {
      document.querySelector(".implement-promo-banner").style.display = "none";
    });
  
  // esra-OC-6-implement-promo-banner-end
  // emre-OC-34-dropdown start
  function toggleDropdown(event) {
    event.preventDefault();
    const parentLi = event.target.closest("li"); 
    parentLi.classList.toggle("show");
  }
  
  document.addEventListener("click", function (event) {
    const dropdowns = document.querySelectorAll("li.show");
    dropdowns.forEach((dropdown) => {
      if (!dropdown.contains(event.target)) {
        dropdown.classList.remove("show");
      }
    });
  });
  
  document.addEventListener("DOMContentLoaded", () => {
    const dropdownToggle = document.getElementById("dropdownToggle");
    const dropdownMenu = document.getElementById("dropdownMenu");
  
    dropdownToggle.addEventListener("click", (event) => {
      event.preventDefault();
      if (dropdownMenu.style.display === "block") {
        dropdownMenu.style.display = "none";
      } else {
        dropdownMenu.style.display = "block";
      }
    });
  
    document.addEventListener("click", (event) => {
      if (!dropdownToggle.contains(event.target) && !dropdownMenu.contains(event.target)) {
        dropdownMenu.style.display = "none";
      }
    });
  });
  
  const bsktBasketIcon = document.getElementById("basketIcon");
  const bsktCartDropdownMenu = document.getElementById("bsktCartDropdownMenu");
  const bsktCartItemsContainer = document.getElementById("bsktCartItemsContainer"); 
  
  bsktBasketIcon.addEventListener("click", (e) => {
    e.preventDefault();
    bsktCartDropdownMenu.classList.toggle("bskt-active"); 
    bsktRenderCartItems();
  });
  
  document.addEventListener("click", (e) => {
    if (
      !bsktCartDropdownMenu.contains(e.target) && 
      e.target !== bsktBasketIcon && 
      !e.target.classList.contains("bskt-cart-remove-btn") 
    ) {
      bsktCartDropdownMenu.classList.remove("bskt-active");
    }
    
    if (e.target === bsktBasketIcon) {
      bsktCartDropdownMenu.classList.add("bskt-active"); 
    }
  });
  
  
  function bsktRenderCartItems() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    bsktCartItemsContainer.innerHTML = "";
  
    if (cart.length === 0) {
      bsktCartItemsContainer.innerHTML = `<p class="bskt-empty-message">Your Cart is empty!</p>`;
      return;
    }
  
    cart.forEach((item, index) => {
      const bsktCartItem = document.createElement("div");
      bsktCartItem.classList.add("bskt-cart-item");
      const title = item.product.title.length > 30 ? item.product.title.slice(0, 30) + "..." : item.product.title;
  
      bsktCartItem.innerHTML = `
        <span><a href="./cart.html">${title} - (${item.amount})</a></span>
        <button class="bskt-cart-remove-btn" data-index="${index}">X</button>
      `;
  
      bsktCartItemsContainer.appendChild(bsktCartItem);
    });
  
    document.querySelectorAll(".bskt-cart-remove-btn").forEach((button) => {
      button.addEventListener("click", (e) => {
        const index = e.target.getAttribute("data-index");
        bsktRemoveCartItem(index); 
      });
    });
  }
  
  function bsktRemoveCartItem(index) {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1); 
    localStorage.setItem("cart", JSON.stringify(cart)); 
    bsktRenderCartItems(); 
  }
  // emre-OC-34-dropdown end
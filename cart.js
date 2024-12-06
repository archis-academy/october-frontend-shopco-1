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

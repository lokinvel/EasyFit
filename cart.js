var sidenav = document.querySelector(".side-navbar");
var overlay = document.querySelector(".popup-overlay");

function shownavbar() {
  sidenav.style.left = "0";
  overlay.style.display = "block";
  document.body.style.overflow = "hidden";
}

function closenavbar() {
  sidenav.style.left = "-60%";
  overlay.style.display = "none";
  document.body.style.overflow = "auto  ";
}



function updateCartCount() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartCountEl = document.getElementById("cart-count");

  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);

  if (totalQuantity > 0) {
    cartCountEl.textContent = totalQuantity;
    cartCountEl.style.display = 'inline';
  } else {
    cartCountEl.style.display = 'none'; 
   }
}


document.addEventListener("DOMContentLoaded", updateCartCount);


let cart = JSON.parse(localStorage.getItem("cart")) || [];
const cartItemsContainer = document.getElementById("cart-items");
const totalPriceEl = document.getElementById("total-price");
const cartCountEl = document.getElementById("cart-count");
const clearBtn = document.getElementById("clear-btn");
const orderBtn = document.getElementById("order-btn");




function renderCart() {
  cartItemsContainer.innerHTML = "";
  let total = 0;
  const cartHeading = document.getElementById("cart-heading");

  if (cart.length === 0) {
    if (cartHeading) cartHeading.style.display = "none";
    cartItemsContainer.innerHTML = `
      <div style="text-align:center; padding:20px;">
      
        <p>Your cart is empty 🛍️</p>
        <button class="explore-btn" onclick="window.location.href='shirts.html'">
          Explore Collection
        </button>
      </div>
    `;

    totalPriceEl.textContent = "";
    cartCountEl.style.display = "none";
    if (clearBtn) clearBtn.style.display = "none";
    if (orderBtn) orderBtn.style.display = "none";
   

    return;
  }

  cart.forEach((item, index) => {
    total += item.price * item.quantity;
    const div = document.createElement("div");
    div.classList.add("cart-item");
    
    div.innerHTML = `
  <div>
    <strong>${item.name}</strong><br>
    ₹${item.price} × ${item.quantity} = ₹${item.price * item.quantity}
  </div>
  <div>
    <button class="qty-btn decrement" onclick="changeQuantity(${index}, -1)">−</button>
    <button class="qty-btn increment" onclick="changeQuantity(${index}, 1)">+</button>
    <button class="remove-btn" onclick="removeItem(${index})">Remove</button>
  </div>
`;

    cartItemsContainer.appendChild(div);
  });

  totalPriceEl.textContent = "Total: ₹" + total;

  cartCountEl.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);

  if (clearBtn) clearBtn.style.display = "inline-block";
  if (orderBtn) orderBtn.style.display = "inline-block";
}

function changeQuantity(index, change) {
  cart[index].quantity += change;
  if (cart[index].quantity <= 0) {
    cart.splice(index, 1);
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

function removeItem(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

function clearCart() {
  localStorage.removeItem("cart");
  cart = [];
  renderCart();
}

function placeOrder() {
  if (cart.length === 0) {
    alert("Your cart is empty! Please add products first.");
    return;
  }

  alert("✅ Thank you for your order! Your total is ₹" + cart.reduce((sum, item) => sum + item.price * item.quantity, 0));
  clearCart();
}


document.addEventListener("DOMContentLoaded", renderCart); 
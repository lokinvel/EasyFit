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


function subscribeNewsletter() {
  const emailInput = document.getElementById("newsletter-email").value.trim();

  if (emailInput === "") {
    alert("⚠️ Please enter your email.");
    return;
  }

  if (!emailInput.includes("@") || !emailInput.includes(".")) {
    alert("❌ Please enter a valid email address.");
    return;
  }

  
  localStorage.setItem("newsletterEmail", emailInput);
  alert("✅ Thank you! You've subscribed with: " + emailInput);

  document.getElementById("newsletter-email").value = "";
}



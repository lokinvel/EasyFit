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

var search = document.getElementById("search")
var productcontainer = document.querySelector(".products")
var productlist = productcontainer.querySelectorAll("div")
var clearBtn = document.getElementById("clearBtn");
var searchIcon = document.getElementById("searchIcon");


search.addEventListener("keyup", function (event) {
    var entertext = event.target.value.toUpperCase();

    if (entertext.length > 0) {
        clearBtn.style.display = "block";
         searchIcon.style.display = "none"; 
    } else {
        clearBtn.style.display = "none";
         searchIcon.style.display = "block"; 
    }
  
    for (count = 0; count < productlist.length; count = count + 1) {

        var productname = productlist[count].querySelector("p").textContent
        if (productname.toUpperCase().indexOf(entertext) < 0) {
            productlist[count].style.display = "none"
        }
        else {
            productlist[count].style.display = "block"
        }
    }


})
clearBtn.addEventListener("click", function () {
    search.value = "";
    clearBtn.style.display = "none";
    

    for (let count = 0; count < productlist.length; count++) {
        productlist[count].style.display = "block";
    }
    search.focus();
});




function addToCart(productName, price) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

 
  let existingItem = cart.find(item => item.name === productName);

  if (existingItem) {
    alert(`${productName} is already in the cart!`);
    return; 
  } else {
    cart.push({ name: productName, price: price, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`${productName} added to cart!`);
  updateCartCount();
}


let selectedSize = null;
let currentProduct = null;

function openModal(productName, price) {
  currentProduct = { name: productName, price: price };
  selectedSize = null;

  document.getElementById("modalProductName").textContent = productName;

  
  document.querySelectorAll(".size-btn").forEach(btn => btn.classList.remove("active"));

  document.getElementById("productModal").style.display = "flex";
}


function closeModal() {
  document.getElementById("productModal").style.display = "none";
}

function selectSize(size) {
  selectedSize = size;
  document.querySelectorAll(".size-btn").forEach(btn => btn.classList.remove("active"));
 event.target.classList.add("active");
}


document.getElementById("modalAddToCartBtn").addEventListener("click", function () {
  if (!selectedSize) {
    alert("Please select a size!");
    return;
  }
   addToCart(`${currentProduct.name} (${selectedSize})`, currentProduct.price);

  closeModal();
});

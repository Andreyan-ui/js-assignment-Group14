console.log("js is working");
const products = [
  { id: 1, name: "Laptop", price: 800, category: "Electronics", Image: "images/laptop.jpeg" },
  { id: 2, name: "Phone", price: 500, category: "Electronics", Image: "images/phone.jpeg" },
  { id: 3, name: "Shoes", price: 70, category: "Fashion", Image: "images/shoes.jpeg" },
  { id: 4, name: "T-shirt", price: 30, category: "Fashion", Image: "images/t-shirt.jpeg" },
  { id: 5, name: "Book", price: 20, category: "Books", Image: "images/book.jpeg" },
  { id: 6, name: "Headphones", price: 60, category: "Electronics", Image: "images/headphones.jpeg" }
];
//adding the cart variable
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function displayProducts(productList) {
  const container = document.getElementById("products");

  // SAFETY CHECK (VERY IMPORTANT)
  if (!container) return;

  container.innerHTML = "";

  productList.forEach(product => {
    const card = document.createElement("div");

    card.innerHTML = `
      <img src="${product.Image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>Price: $${product.price}</p>
      <button onClick="addToCart(${product.id})">Add to Cart</button>
    `;

    container.appendChild(card);
  });

  
}

document.addEventListener("DOMContentLoaded",() => {
    displayProducts(products);
    updateCartCount();
});

function addToCart(id) {
  const product = products.find(p => p.id === id);

  const existing = cart.find(item => item.id === id);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  updateCartCount();
}

function updateCartCount() {
  const count = cart.reduce((total, item) => total + item.quantity, 0);

  const cartElement = document.getElementById("cart-count");

  if (cartElement) {
    cartElement.innerText = count;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  displayProducts(products);
  updateCartCount();
});

function displayCart() {
  const container = document.getElementById("cart-items");

  // Prevent errors on other pages
  if (!container) return;

  container.innerHTML = "";

  let total = 0;

  cart.forEach(item => {
    total += item.price * item.quantity;

    const div = document.createElement("div");

    div.innerHTML = `
      <h3>${item.name}</h3>
      <p>Price: $${item.price}</p>
      <p>
        <button onclick="changeQty(${item.id}, -1)">-</button>
        ${item.quantity}
        <button onclick="changeQty(${item.id}, 1)">+</button>
      </p>
      <button onclick="removeItem(${item.id})">Remove</button>
      <hr>
    `;

    container.appendChild(div);
  });

  // Update total
  const totalElement = document.getElementById("total");
  if (totalElement) {
    totalElement.innerText = total;
  }
}

function changeQty(id, change) {
  const item = cart.find(i => i.id === id);

  try {
    if (!item) throw "Item not found";

    item.quantity += change;

    if (item.quantity <= 0) {
      cart = cart.filter(i => i.id !== id);
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    displayCart();
    updateCartCount();

  } catch (error) {
    alert(error);
  }
}

function removeItem(id) {
  cart = cart.filter(item => item.id !== id);

  localStorage.setItem("cart", JSON.stringify(cart));

  displayCart();
  updateCartCount();
}

document.addEventListener("DOMContentLoaded", () => {
  displayProducts(products);
  displayCart();
  updateCartCount();
});

function searchProduct() {
  const input = document.getElementById("search");

  // Safety check
  if (!input) return;

  const value = input.value.toLowerCase();

  const filtered = products.filter(product =>
    product.name.toLowerCase().includes(value)
  );

  displayProducts(filtered);
}

function filterCategory(category) {
  if (category === "All") {
    displayProducts(products);
  } else {
    const filtered = products.filter(product =>
      product.category === category
    );

    displayProducts(filtered);
  }
}

// validation function

function validateForm() {
  try {
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const address = document.getElementById("address").value.trim();

    // Check empty fields
    if (!name || !email || !phone || !address) {
      throw "Please fill in all fields!";
    }

    // Email validation (simple but correct)
    if (!email.includes("@") || !email.includes(".")) {
      throw "Invalid email format!";
    }

    // Phone validation (basic)
    if (isNaN(phone) || phone.length < 10) {
      throw "Invalid phone number!";
    }

    // Check if cart is empty
    if (cart.length === 0) {
      throw "Your cart is empty!";
    }

    // If everything is OK
    alert("Order placed successfully!");

    // Clear cart after checkout
    cart = [];
    localStorage.removeItem("cart");

  } catch (error) {
    alert(error);
  }
}






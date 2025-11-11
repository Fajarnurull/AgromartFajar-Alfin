let cart = [];

function addToCart(name, price) {
  cart.push({ name, price });
  updateCart();
}

function removeFromCart(index) {
  cart.splice(index, 1);
  updateCart();
}

function updateCart() {
  const cartItems = document.getElementById('cart-items');
  const cartTotal = document.getElementById('cart-total');
  const cartCount = document.getElementById('cart-count');
  cartItems.innerHTML = '';
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price;
    let li = document.createElement('li');
    li.className = "list-group-item d-flex justify-content-between align-items-center";
    li.innerHTML = `${item.name} <span>Rp ${item.price.toLocaleString()}</span>
      <button class="btn btn-sm btn-danger ms-2" onclick="removeFromCart(${index})">x</button>`;
    cartItems.appendChild(li);
  });

  cartTotal.innerText = total.toLocaleString();
  cartCount.innerText = cart.length;
}

function toggleCart() {
  document.getElementById('cart').classList.toggle('active');
}

function checkout() {
  if (cart.length === 0) return alert("Keranjang kosong!");
  const metode = document.getElementById('payment-method').value;
  alert(`Pesanan Anda akan diproses dengan metode pembayaran: ${metode}.`);

  // Simulasi pelacakan lokasi pengiriman
  let status = ["Pesanan Diproses", "Dikirim dari Gudang", "Sedang Dalam Perjalanan", "Tiba di Tujuan"];
  let i = 0;
  let tracking = setInterval(() => {
    if (i < status.length) {
      console.log(`📦 ${status[i]}`);
      i++;
    } else {
      clearInterval(tracking);
      alert("Pesanan Anda telah sampai! 🌾");
    }
  }, 3000);
}

document.getElementById("contact-form").addEventListener("submit", function(e){
  e.preventDefault();
  alert("Pesan Anda berhasil dikirim!");
  this.reset();
});

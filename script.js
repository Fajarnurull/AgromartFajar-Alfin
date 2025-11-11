// === AgroMart Script Offline === //

const DEFAULT_PRODUCTS = [
  {id:1, name:"Pupuk NPK Mutiara 16-16-16", price:120000, category:"Pupuk", brand:"Petro", rating:4.8, desc:"Pupuk lengkap dengan unsur hara makro dan mikro untuk segala jenis tanaman.", img:"img/NPK.jpg"},
  {id:2, name:"Pupuk Organik Cair AgroBio", price:80000, category:"Pupuk", brand:"AgroBio", rating:4.6, desc:"Meningkatkan kesuburan tanah dan hasil panen.", img:"img/pupukcair.jpeg"},
  {id:3, name:"Bibit Cabai Rawit Super", price:35000, category:"Bibit", brand:"AgriSeed", rating:4.9, desc:"Bibit unggul tahan hama dan cepat berbuah.", img:"img/cabai.jpeg"},
  {id:4, name:"Bibit Tomat Unggul", price:30000, category:"Bibit", brand:"GreenGrow", rating:4.7, desc:"Tomat besar, manis, dan produktif.", img:"img/tomat.jpg"},
  {id:5, name:"Bibit Kobis", price:25000, category:"Bibit", brand:"GreenGrow", rating:4.5, desc:"Kobis yang besar,segar dan Produktif.", img:"img/kobis.jpeg"},
  {id:6, name:"Bibit Kangkung", price:25000, category:"Bibit", brand:"GreenGrow", rating:4.4, desc:"Kangkung yang segar dan hijau.", img:"img/kakngkung.jpeg"},
  {id:7, name:"Bibit Bayam", price:25000, category:"Bibit", brand:"GreenGrow", rating:4.7, desc:"Bayam manis,Segar,hijau,dan enak.", img:"img/bayam.jpg"},
  {id:8, name:"Bibit Kentang", price:25000, category:"Bibit", brand:"GreenGrow", rating:4.8, desc:"Kentang yang berkualitas besar dan super .", img:"img/kentan.jpeg"},
  {id:9, name:"Bibit Pakcoy", price:20000, category:"Bibit", brand:"GreenGrow", rating:4.9, desc:"Pakcoy yang berkualitas besar dan super enak .", img:"img/pakcoy.jpeg"},
  {id:10, name:"Bibit Padi", price:30000, category:"Bibit", brand:"GreenGrow", rating:4.5, desc:"Padi yang berkualitas besar ,Putih  dan super .", img:"img/Pdi.jpeg"},
  {id:11, name:"Bibit Sledri", price:25000, category:"Bibit", brand:"GreenGrow", rating:4.9, desc:"Sledry yang berkualitas besar dan super .", img:"img/sledri.jpeg"},
  {id:12, name:"Bibit Wortel", price:25000, category:"Bibit", brand:"GreenGrow", rating:4.4, desc:"Wortel yang berkualitas besar dan super .", img:"img/wortel.png"},
  {id:13, name:"Bibit Slada", price:25000, category:"Bibit", brand:"GreenGrow", rating:4.4, desc:"Slada yang berkualitas besar,Manis dan super .", img:"img/sld.jpeg"},
  {id:14, name:"Cangkul Baja Anti Karat", price:95000, category:"Perkakas", brand:"TaniPro", rating:4.5, desc:"Kuat dan tahan lama untuk lahan keras.", img:"img/cangkul.jpeg"},
  {id:15, name:"Gembor Penyiram Tanaman 2L", price:40000, category:"Perkakas", brand:"GrowBest", rating:4.3, desc:"Penyiram tanaman plastik tebal kapasitas 2 liter.", img:"img/penyiram.jpeg"},
  {id:16, name:"Pestisida Hayati BioProtect", price:110000, category:"Pestisida", brand:"AgroGuard", rating:4.6, desc:"Efektif melawan hama tanpa bahan kimia keras.", img:"img/peptis.jpg"},
  {id:17, name:"Pot Tanaman Plastik 30cm", price:25000, category:"Peralatan", brand:"FloraPot", rating:4.4, desc:"Pot kuat untuk segala jenis tanaman hias.", img:"img/pot.jpeg"},
  {id:18, name:"Sprayer Elektrik 16L", price:380000, category:"Perkakas", brand:"TaniMax", rating:4.9, desc:"Mudah digunakan, baterai tahan lama.", img:"img/elektrikk.jpg"}
];

let products = JSON.parse(localStorage.getItem("products")) || DEFAULT_PRODUCTS;
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let orders = JSON.parse(localStorage.getItem("orders")) || [];

function saveData(){
  localStorage.setItem("products", JSON.stringify(products));
  localStorage.setItem("cart", JSON.stringify(cart));
  localStorage.setItem("orders", JSON.stringify(orders));
}

// === RENDER PRODUK ===
function renderProducts(list=products){
  const grid = document.getElementById("productGrid");
  grid.innerHTML = list.map(p=>`
    <div class="col-md-4 mb-3">
      <div class="card product-card" onclick="openProduct(${p.id})">
        <img src="${p.img}" class="card-img-top" alt="${p.name}">
        <div class="card-body">
          <h6 class="card-title">${p.name}</h6>
          <p class="text-success fw-bold mb-1">Rp ${p.price.toLocaleString()}</p>
          <small>${p.category} • ⭐ ${p.rating}</small>
        </div>
      </div>
    </div>
  `).join("");
}

// === FILTER KATEGORI OTOMATIS ===
function renderCategories(){
  const cats = [...new Set(products.map(p=>p.category))];
  document.getElementById("categories").innerHTML =
    cats.map(c=>`<button class="category-badge" onclick="filterCategory('${c}')">${c}</button>`).join("") +
    `<button class="category-badge" onclick="renderProducts()">Semua</button>`;
}

function filterCategory(cat){
  renderProducts(products.filter(p=>p.category===cat));
}

// === DETAIL PRODUK ===
function openProduct(id){
  const p = products.find(x=>x.id===id);
  if(!p) return;
  document.getElementById("productModalImg").src = p.img;
  document.getElementById("productModalName").textContent = p.name;
  document.getElementById("productModalDesc").textContent = p.desc;
  document.getElementById("productModalPrice").textContent = p.price.toLocaleString();
  document.getElementById("addToCartBtn").onclick = ()=>addToCart(p.id);
  new bootstrap.Modal(document.getElementById("productModal")).show();
}

// === KERANJANG ===
function toggleCart(){
  document.getElementById("cart").classList.toggle("active");
  renderCart();
}

function addToCart(id){
  const p = products.find(x=>x.id===id);
  const qty = parseInt(document.getElementById("productQty").value) || 1;
  const item = cart.find(x=>x.id===id);
  if(item) item.qty += qty; else cart.push({...p, qty});
  saveData(); renderCart(); updateCartCount();
  bootstrap.Modal.getInstance(document.getElementById("productModal")).hide();
}

function renderCart(){
  const items = document.getElementById("cart-items");
  if(cart.length===0){ items.innerHTML="<li class='list-group-item text-center'>Keranjang kosong</li>"; return;}
  items.innerHTML = cart.map(i=>`
    <li class="list-group-item d-flex justify-content-between align-items-center">
      ${i.name} x${i.qty}
      <span>Rp ${(i.price*i.qty).toLocaleString()}</span>
    </li>`).join("");
  document.getElementById("cart-total").textContent = cart.reduce((t,i)=>t+i.price*i.qty,0).toLocaleString();
}

function updateCartCount(){ document.getElementById("cart-count").textContent = cart.length; }

function clearCart(){ cart=[]; saveData(); renderCart(); updateCartCount(); }

// === CHECKOUT ===
function checkout(){
  if(cart.length===0){ alert("Keranjang kosong!"); return; }
  const addr = document.getElementById("shippingAddress").value;
  if(!addr){ alert("Isi alamat pengiriman terlebih dahulu."); return; }
  const payment = document.getElementById("paymentMethod").value;
  const orderId = "ORD"+Date.now();
  orders.push({id:orderId, items:[...cart], address:addr, payment, status:"Diproses"});
  cart=[]; saveData(); renderOrders(); renderCart(); updateCartCount();
  alert("Pesanan berhasil dibuat!");
}

// === PESANAN ===
function renderOrders(){
  const area = document.getElementById("orders-list");
  if(orders.length===0){ area.innerHTML="<p>Belum ada pesanan.</p>"; return;}
  area.innerHTML = orders.map(o=>`
    <div class="order-card mb-2">
      <div><strong>${o.id}</strong> (${o.status})</div>
      <ul>${o.items.map(i=>`<li>${i.name} x${i.qty}</li>`).join("")}</ul>
      <button class="btn btn-sm btn-outline-success" onclick="trackOrder('${o.id}')">Lacak</button>
    </div>
  `).join("");
}

// === TRACKING PESANAN ===
function trackOrder(id){
  document.getElementById("trackingOrderId").textContent = id;
  document.getElementById("trackingProgress").style.width = "20%";
  document.getElementById("trackingText").textContent = "Pesanan sedang diproses...";
  new bootstrap.Modal(document.getElementById("trackingModal")).show();
}

function simulateProgress(){
  const bar = document.getElementById("trackingProgress");
  let width = parseInt(bar.style.width);
  if(width<100){ width+=20; bar.style.width=width+"%"; bar.textContent=width+"%"; }
  document.getElementById("trackingText").textContent =
    width>=100 ? "Pesanan telah tiba di lokasi Anda." :
    width>=60 ? "Pesanan sedang dalam perjalanan." :
    "Pesanan sedang diproses...";
}

// === SEARCH ===
function doSearch(){
  const q = document.getElementById("searchBox").value.toLowerCase();
  const result = products.filter(p=>p.name.toLowerCase().includes(q));
  renderProducts(result);
}

/* ========================
   FITUR LOGIN / DAFTAR
======================== */

// Simpan data user di localStorage
function saveUsers(users) {
  localStorage.setItem('users', JSON.stringify(users));
}

// Ambil data user dari localStorage
function getUsers() {
  return JSON.parse(localStorage.getItem('users') || '[]');
}

// Simpan user yang sedang login
function setLoggedUser(user) {
  localStorage.setItem('loggedUser', JSON.stringify(user));
}

// Ambil user yang sedang login
function getLoggedUser() {
  return JSON.parse(localStorage.getItem('loggedUser') || 'null');
}

// Hapus user yang sedang login (logout)
function logout() {
  localStorage.removeItem('loggedUser');
  renderUserArea();
  toast('Berhasil logout!');
}

// Render tampilan user di navbar
function renderUserArea() {
  const user = getLoggedUser();
  const el = document.getElementById('user-area');
  if (!el) return;

  if (user) {
    el.innerHTML = `
      <div class="dropdown">
        <button class="btn btn-outline-light btn-sm dropdown-toggle" data-bs-toggle="dropdown">
          <i class="bi bi-person-circle"></i> ${user.name}
        </button>
        <ul class="dropdown-menu dropdown-menu-end">
          <li><a class="dropdown-item" href="#orders">Pesanan Saya</a></li>
          <li><a class="dropdown-item" href="#" onclick="logout()">Logout</a></li>
        </ul>
      </div>
    `;
  } else {
    el.innerHTML = `<button class="btn btn-outline-light btn-sm" onclick="showLoginModal()">Masuk</button>`;
  }
}

/* ----- Modal Handling ----- */

// Buka modal login
function showLoginModal() {
  showLogin();
  const modal = new bootstrap.Modal(document.getElementById('authModal'));
  modal.show();
}

// Tampilkan form login
function showLogin() {
  document.getElementById('loginForm').style.display = 'block';
  document.getElementById('registerForm').style.display = 'none';
  document.getElementById('authTitle').innerText = 'Login';
}

// Tampilkan form daftar
function showRegister() {
  document.getElementById('loginForm').style.display = 'none';
  document.getElementById('registerForm').style.display = 'block';
  document.getElementById('authTitle').innerText = 'Daftar';
}

/* ----- LOGIN FUNCTION ----- */
function login() {
  const email = document.getElementById('loginEmail').value.trim();
  const pass = document.getElementById('loginPass').value.trim();
  const users = getUsers();
  const user = users.find(u => u.email === email && u.pass === pass);

  if (!user) {
    alert('Email atau password salah!');
    return;
  }

  setLoggedUser(user);
  renderUserArea();
  bootstrap.Modal.getInstance(document.getElementById('authModal')).hide();
  toast(`Selamat datang, ${user.name}!`);
}

/* ----- REGISTER FUNCTION ----- */
function register() {
  const name = document.getElementById('regName').value.trim();
  const email = document.getElementById('regEmail').value.trim();
  const pass = document.getElementById('regPass').value.trim();

  if (!name || !email || !pass) {
    alert('Lengkapi semua kolom!');
    return;
  }

  const users = getUsers();
  if (users.find(u => u.email === email)) {
    alert('Email sudah terdaftar!');
    return;
  }

  users.push({ name, email, pass });
  saveUsers(users);
  alert('Pendaftaran berhasil! Silakan login.');
  showLogin();
}

/* ----- NOTIFIKASI SEDERHANA ----- */
function toast(msg) {
  const el = document.createElement('div');
  el.className = 'toast align-items-center text-bg-success border-0 position-fixed bottom-0 end-0 m-3 show';
  el.innerHTML = `
    <div class="d-flex">
      <div class="toast-body">${msg}</div>
      <button type="button" class="btn-close btn-close-white me-2 m-auto" onclick="this.parentElement.parentElement.remove()"></button>
    </div>`;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 4000);
}

/* ----- INIT ----- */
document.addEventListener('DOMContentLoaded', renderUserArea);



// === INIT ===
function init(){
  renderProducts();
  renderCategories();
  renderCart();
  renderOrders();
  updateCartCount();
}
window.onload = init;

let allProducts = [];
let currentIndex = 0;
const productsPerPage = 5;

const productContainer = document.getElementById('products');
const loadMoreBtn = document.getElementById('loadMore');
const searchInput = document.getElementById('search');

fetch('https://fakestoreapi.com/products')
  .then(res => res.json())
  .then(data => {
    allProducts = data;
    console.log("Products Loaded:", allProducts);
    renderProducts();
  })
  .catch(err => console.error("Failed to fetch products", err));

function renderProducts() {
  const endIndex = Math.min(currentIndex + productsPerPage, allProducts.length);
  const toShow = allProducts.slice(currentIndex, endIndex);

  toShow.forEach(product => {
    const productCard = document.createElement('div');
    productCard.className = 'product';
    productCard.innerHTML = `
      <img src="${product.image}" alt="${product.title}" />
      <h3>${product.title}</h3>
      <p>$${product.price}</p>
    `;
    productCard.addEventListener('click', () => {
      window.location.href = `product.html?id=${product.id}`;
    });
    productContainer.appendChild(productCard);
  });

  currentIndex = endIndex;

  if (currentIndex >= allProducts.length) {
    loadMoreBtn.style.display = 'none';
  }
}

loadMoreBtn.addEventListener('click', renderProducts);

searchInput.addEventListener('input', () => {
  const term = searchInput.value.toLowerCase();
  const loadedProducts = allProducts.slice(0, currentIndex);
  const filtered = loadedProducts.filter(p => p.title.toLowerCase().includes(term));

  productContainer.innerHTML = '';

  if (filtered.length === 0) {
    productContainer.innerHTML = '<p>No products found.</p>';
  } else {
    filtered.forEach(product => {
      const productCard = document.createElement('div');
      productCard.className = 'product';
      productCard.innerHTML = `
        <img src="${product.image}" alt="${product.title}" />
        <h3>${product.title}</h3>
        <p>$${product.price}</p>
      `;
      productCard.addEventListener('click', () => {
        window.location.href = `product.html?id=${product.id}`;
      });
      productContainer.appendChild(productCard);
    });
  }
});

const filterSelect = document.getElementById('filter');

filterSelect.addEventListener('change', () => {
  const selectedCategory = filterSelect.value;
  const loadedProducts = allProducts.slice(0, currentIndex);

  const filtered = selectedCategory === 'all'
    ? loadedProducts
    : loadedProducts.filter(p => p.category === selectedCategory);

  renderFilteredProducts(filtered);
});

function renderFilteredProducts(filteredProducts) {
  productContainer.innerHTML = '';

  if (filteredProducts.length === 0) {
    productContainer.innerHTML = '<p>No products found.</p>';
    return;
  }

  filteredProducts.forEach(product => {
    const productCard = document.createElement('div');
    productCard.className = 'product';
    productCard.innerHTML = `
      <div class="image-wrapper">
        <img src="${product.image}" alt="${product.title}" />
      </div>
      <h3>${product.title}</h3>
      <p>$${product.price}</p>
    `;
    productCard.addEventListener('click', () => {
      window.location.href = `product.html?id=${product.id}`;
    });
    productContainer.appendChild(productCard);
  });
}

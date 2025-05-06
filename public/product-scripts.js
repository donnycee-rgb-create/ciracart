document.addEventListener('DOMContentLoaded', () => {
    const productContainer = document.getElementById('product-container');
    const products = window.products || [];

    const productsCountSpan = document.querySelector('.products-count span');
    const pageSizeSelect = document.querySelector('.page-size-select');
    if (pageSizeSelect) {
        pageSizeSelect.style.display = 'none';
    }

    function createProductCard(product) {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.dataset.category = product.category;
        card.dataset.price = product.price;
        card.dataset.name = product.name;

        let badgeHTML = '';
        if (product.badge) {
            badgeHTML = `<div class="product-badge${product.badge.toLowerCase() === 'sale' ? ' sale' : ''}${product.badge.toLowerCase() === 'bestseller' ? ' bestseller' : ''}">${product.badge}</div>`;
        }

        const fullStars = Math.floor(product.rating);
        const halfStar = product.rating % 1 >= 0.5;
        const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
        let starsHTML = '';
        for (let i = 0; i < fullStars; i++) {
            starsHTML += '<i class="fas fa-star"></i>';
        }
        if (halfStar) {
            starsHTML += '<i class="fas fa-star-half-alt"></i>';
        }
        for (let i = 0; i < emptyStars; i++) {
            starsHTML += '<i class="far fa-star"></i>';
        }

        let originalPriceHTML = '';
        if (product.originalPrice && product.originalPrice > product.price) {
            originalPriceHTML = `<span class="original-price">$${product.originalPrice.toFixed(2)}</span>`;
        }

        card.innerHTML = `
            ${badgeHTML}
            <div class="product-image">
                <img src="${product.image}" alt="${product.alt}" onerror="this.src='images/placeholder.jpg'">
                <div class="product-actions">
                    <button class="action-btn" aria-label="Add to wishlist"><i class="far fa-heart"></i></button>
                    <button class="action-btn" aria-label="Quick view"><i class="far fa-eye"></i></button>
                    <button class="action-btn" aria-label="Compare"><i class="fas fa-sync-alt"></i></button>
                </div>
            </div>
            <div class="product-info">
                <h3 class="product-title"><a href="product.html">${product.name}</a></h3>
                <div class="product-rating">${starsHTML} <span>(${product.ratingCount})</span></div>
                <div class="product-price">
                    <span class="current-price">$${product.price.toFixed(2)}</span>
                    ${originalPriceHTML}
                </div>
                <p class="product-description">${product.description}</p>
                <button class="add-to-cart-btn" aria-label="Add ${product.name} to cart">
                    <i class="fas fa-shopping-cart"></i> Add to Cart
                </button>
            </div>
        `;
        return card;
    }

    function renderProducts() {
        productContainer.innerHTML = '';
        products.forEach(product => {
            const productCard = createProductCard(product);
            productContainer.appendChild(productCard);
        });
        updateProductsCount(products.length);
    }

    function updateProductsCount(count) {
        if (productsCountSpan) {
            productsCountSpan.textContent = `Showing all ${count} products`;
        }
    }

    renderProducts();
});

document.addEventListener('DOMContentLoaded', () => {
    const productContainer = document.getElementById('product-container');
    const products = window.products || [];

    const productsCountSpan = document.querySelector('.products-count span');
    const pageSizeSelect = document.querySelector('.page-size-select');
    if (pageSizeSelect) {
        pageSizeSelect.style.display = 'none';
    }

    function createProductCard(product) {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.dataset.category = product.category;
        card.dataset.price = product.price;
        card.dataset.name = product.name;

        let badgeHTML = '';
        if (product.badge) {
            badgeHTML = `<div class="product-badge${product.badge.toLowerCase() === 'sale' ? ' sale' : ''}${product.badge.toLowerCase() === 'bestseller' ? ' bestseller' : ''}">${product.badge}</div>`;
        }

        const fullStars = Math.floor(product.rating);
        const halfStar = product.rating % 1 >= 0.5;
        const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
        let starsHTML = '';
        for (let i = 0; i < fullStars; i++) {
            starsHTML += '<i class="fas fa-star"></i>';
        }
        if (halfStar) {
            starsHTML += '<i class="fas fa-star-half-alt"></i>';
        }
        for (let i = 0; i < emptyStars; i++) {
            starsHTML += '<i class="far fa-star"></i>';
        }

        let originalPriceHTML = '';
        if (product.originalPrice && product.originalPrice > product.price) {
            originalPriceHTML = `<span class="original-price">$${product.originalPrice.toFixed(2)}</span>`;
        }

        card.innerHTML = `
            ${badgeHTML}
            <div class="product-image">
                <img src="${product.image}" alt="${product.alt}" onerror="this.src='images/placeholder.jpg'">
                <div class="product-actions">
                    <button class="action-btn" aria-label="Add to wishlist"><i class="far fa-heart"></i></button>
                    <button class="action-btn" aria-label="Quick view"><i class="far fa-eye"></i></button>
                    <button class="action-btn" aria-label="Compare"><i class="fas fa-sync-alt"></i></button>
                </div>
            </div>
            <div class="product-info">
                <h3 class="product-title"><a href="product.html">${product.name}</a></h3>
                <div class="product-rating">${starsHTML} <span>(${product.ratingCount})</span></div>
                <div class="product-price">
                    <span class="current-price">$${product.price.toFixed(2)}</span>
                    ${originalPriceHTML}
                </div>
                <p class="product-description">${product.description}</p>
                <button class="add-to-cart-btn" aria-label="Add ${product.name} to cart">
                    <i class="fas fa-shopping-cart"></i> Add to Cart
                </button>
            </div>
        `;
        return card;
    }

    function renderProducts() {
        productContainer.innerHTML = '';
        products.forEach(product => {
            const productCard = createProductCard(product);
            productContainer.appendChild(productCard);
        });
        updateProductsCount(products.length);
    }

    function updateProductsCount(count) {
        if (productsCountSpan) {
            productsCountSpan.textContent = `Showing all ${count} products`;
        }
    }

    renderProducts();

    // Add to Cart Animation and functionality
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');

    addToCartButtons.forEach(button => {
        button.addEventListener('click', function (e) {
            e.preventDefault();

            // Add 'added' class for animation
            this.classList.add('added');

            // Store original text
            const originalText = this.textContent;

            // Change button text
            this.textContent = 'Added!';

            // Update cart count
            const cartCount = document.querySelector('.cart-count');
            if (cartCount) {
                cartCount.textContent = parseInt(cartCount.textContent) + 1;

                // Add bounce animation to cart icon
                const cartIcon = document.querySelector('.cart-icon');
                cartIcon.style.animation = 'bounce 0.5s ease';

                setTimeout(() => {
                    cartIcon.style.animation = '';
                }, 500);
            }

            // Reset button after delay
            setTimeout(() => {
                this.classList.remove('added');
                this.textContent = originalText;
            }, 1500);
        });
    });
});
   
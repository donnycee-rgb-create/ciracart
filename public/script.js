// CiraCart - E-Commerce Website JavaScript

document.addEventListener('DOMContentLoaded', function () {
    // Declare navLinks and sections for smooth scrolling
    const navLinks = document.querySelectorAll('nav a');
    const sections = document.querySelectorAll('section');

    // Mobile Menu Toggle
    const menuToggle = document.getElementById('mobile-menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');

    if (menuToggle && mobileMenu) {
        menuToggle.innerHTML = '<span></span><span></span><span></span><span></span>';

        menuToggle.addEventListener('click', function () {
            mobileMenu.classList.toggle('active');
            menuToggle.classList.toggle('open');
        });
    }

    // Dashboard Menu Toggle
    const dashboardMenuToggle = document.getElementById('dashboard-menu-toggle');
    const dashboardMenuList = document.getElementById('dashboard-menu-list');

    if (dashboardMenuToggle && dashboardMenuList) {
        dashboardMenuToggle.addEventListener('click', function () {
            const isActive = dashboardMenuList.classList.toggle('active');
            dashboardMenuToggle.setAttribute('aria-expanded', isActive);
        });
    }
    
    
    

    // Sticky Header Effect
    const header = document.querySelector('header');

    window.addEventListener('scroll', function () {
        header.classList.toggle('scrolled', window.scrollY > 50);
    });

    // Add to Cart Animation
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

    // Testimonial Slider
    const testimonialSlider = document.querySelector('.testimonial-slider');

    if (testimonialSlider && testimonialSlider.children.length > 1) {
        let isDown = false;
        let startX, scrollLeft;

        testimonialSlider.addEventListener('mousedown', (e) => {
            isDown = true;
            testimonialSlider.classList.add('active');
            startX = e.pageX - testimonialSlider.offsetLeft;
            scrollLeft = testimonialSlider.scrollLeft;
        });

        testimonialSlider.addEventListener('mouseleave', () => {
            isDown = false;
            testimonialSlider.classList.remove('active');
        });

        testimonialSlider.addEventListener('mouseup', () => {
            isDown = false;
            testimonialSlider.classList.remove('active');
        });

        testimonialSlider.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - testimonialSlider.offsetLeft;
            const walk = (x - startX) * 2; // Scroll-fast
            testimonialSlider.scrollLeft = scrollLeft - walk;
        });

        // Auto scroll for testimonials
        let scrollAmount = 0;
        const scrollSpeed = 2;
        const scrollDelay = 30;
        let autoScroll;

        function startAutoScroll() {
            autoScroll = setInterval(() => {
                testimonialSlider.scrollLeft += scrollSpeed;
                scrollAmount += scrollSpeed;

                if (scrollAmount >= testimonialSlider.scrollWidth / 2) {
                    testimonialSlider.scrollLeft = 0;
                    scrollAmount = 0;
                }
            }, scrollDelay);
        }

        // Start auto scroll after 3 seconds
        setTimeout(startAutoScroll, 3000);

        // Stop auto scroll on hover
        testimonialSlider.addEventListener('mouseenter', () => {
            clearInterval(autoScroll);
        });

        // Resume auto scroll when not hovering
        testimonialSlider.addEventListener('mouseleave', () => {
            startAutoScroll();
        });
    }

    // Newsletter Form Submission
    const newsletterForm = document.querySelector('.newsletter-form');

    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const emailInput = this.querySelector('input[type="email"]');
            const submitButton = this.querySelector('button');
            const originalButtonText = submitButton.textContent;

            if (emailInput.value) {
                // Show success message
                submitButton.textContent = 'Subscribed!';
                submitButton.style.backgroundColor = 'var(--success-color)';

                // Create a success message element
                const successMessage = document.createElement('div');
                successMessage.className = 'newsletter-success';
                successMessage.innerHTML = `
                    <p>Thank you for subscribing to our newsletter!</p>
                    <p>We'll keep you updated with the latest products and offers.</p>
                `;

                // Add success styles
                successMessage.style.color = 'var(--success-color)';
                successMessage.style.marginTop = '15px';
                successMessage.style.padding = '10px';
                successMessage.style.borderRadius = 'var(--border-radius-md)';
                successMessage.style.backgroundColor = 'rgba(0, 200, 83, 0.1)';
                successMessage.style.animation = 'fadeIn 0.5s ease';

                // Add the success message to the form
                this.appendChild(successMessage);

                // Reset the form after 3 seconds
                setTimeout(() => {
                    this.reset();
                    submitButton.textContent = originalButtonText;
                    submitButton.style.backgroundColor = '';

                    // Remove success message with fade out effect
                    successMessage.style.animation = 'fadeOut 0.5s ease';
                    setTimeout(() => {
                        this.removeChild(successMessage);
                    }, 500);
                }, 3000);
            }
        });
    }

    // Product Image Gallery
    const productThumbnails = document.querySelectorAll('.product-thumbnail');
    const mainProductImage = document.querySelector('.main-product-image img');

    if (productThumbnails.length && mainProductImage) {
        productThumbnails.forEach(thumbnail => {
            thumbnail.addEventListener('click', function () {
                // Remove active class from all thumbnails
                productThumbnails.forEach(item => item.classList.remove('active'));

                // Add active class to clicked thumbnail
                this.classList.add('active');

                // Update main image source with fade effect
                const newImageSrc = this.querySelector('img').getAttribute('src');
                mainProductImage.style.opacity = '0';

                setTimeout(() => {
                    mainProductImage.setAttribute('src', newImageSrc);
                    mainProductImage.style.opacity = '1';
                }, 300);
            });
        });
    }

    // Product Quantity Selector
    const quantitySelectors = document.querySelectorAll('.quantity-selector');

    quantitySelectors.forEach(selector => {
        const decreaseBtn = selector.querySelector('.decrease');
        const increaseBtn = selector.querySelector('.increase');
        const quantityInput = selector.querySelector('input');

        if (decreaseBtn && increaseBtn && quantityInput) {
            decreaseBtn.addEventListener('click', () => {
                let currentValue = parseInt(quantityInput.value);
                if (currentValue > 1) {
                    quantityInput.value = currentValue - 1;
                }
            });

            increaseBtn.addEventListener('click', () => {
                let currentValue = parseInt(quantityInput.value);
                quantityInput.value = currentValue + 1;
            });

            // Prevent manual input of invalid values
            quantityInput.addEventListener('change', () => {
                if (quantityInput.value < 1 || isNaN(quantityInput.value)) {
                    quantityInput.value = 1;
                }
            });
        }
    });

    // Product Filter and Sort
    const filterToggle = document.querySelector('.filter-toggle');
    const filterPanel = document.querySelector('.filter-panel');
    const sortSelect = document.querySelector('.sort-select');
    const productGrid = document.querySelector('.product-grid');

    if (filterToggle && filterPanel) {
        filterToggle.addEventListener('click', () => {
            filterPanel.classList.toggle('open');
            filterToggle.classList.toggle('active');
        });

        // Close filter panel when clicking outside
        document.addEventListener('click', (e) => {
            if (!filterPanel.contains(e.target) && !filterToggle.contains(e.target)) {
                filterPanel.classList.remove('open');
                filterToggle.classList.remove('active');
            }
        });
    }

    // Product Category Filters
    const categoryFilters = document.querySelectorAll('.category-filter input');

    if (categoryFilters.length && productGrid) {
        categoryFilters.forEach(filter => {
            filter.addEventListener('change', applyFilters);
        });
    }

    // Price Range Filter
    const priceRange = document.querySelector('.price-range input');
    const priceDisplay = document.querySelector('.price-display');

    if (priceRange && priceDisplay) {
        priceRange.addEventListener('input', () => {
            priceDisplay.textContent = `$${priceRange.value}`;
            applyFilters();
        });
    }

    // Apply all active filters
    function applyFilters() {
        if (!productGrid) return;

        const products = productGrid.querySelectorAll('.product-card');
        const activeCategories = Array.from(categoryFilters)
            .filter(input => input.checked)
            .map(input => input.value);

        const maxPrice = priceRange ? parseInt(priceRange.value) : Infinity;

        products.forEach(product => {
            const productCategory = product.dataset.category;
            const productPrice = parseInt(product.dataset.price);

            const categoryMatch = activeCategories.length === 0 || activeCategories.includes(productCategory);
            const priceMatch = !maxPrice || productPrice <= maxPrice;

            product.style.display = (categoryMatch && priceMatch) ? '' : 'none';
        });
    }

    // Product Sorting
    if (sortSelect && productGrid) {
        sortSelect.addEventListener('change', () => {
            const products = Array.from(productGrid.querySelectorAll('.product-card'));
            const sortMethod = sortSelect.value;

            products.sort((a, b) => {
                const priceA = parseInt(a.dataset.price);
                const priceB = parseInt(b.dataset.price);
                const nameA = a.dataset.name;
                const nameB = b.dataset.name;

                switch (sortMethod) {
                    case 'price-low-high':
                        return priceA - priceB;
                    case 'price-high-low':
                        return priceB - priceA;
                    case 'name-a-z':
                        return nameA.localeCompare(nameB);
                    case 'name-z-a':
                        return nameB.localeCompare(nameA);
                    default:
                        return 0;
                }
            });

            // Reappend sorted items
            products.forEach(product => {
                productGrid.appendChild(product);
            });
        });
    }

    // Initialize animation for elements when they come into view
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    if (animatedElements.length) {
        // Create IntersectionObserver
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    // Stop observing after animation
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        // Observe each element
        animatedElements.forEach(element => {
            observer.observe(element);
        });
    }
});
  window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
  // Function to handle smooth scrolling
function smoothScroll(target, duration = 800) {
    const targetPosition = target.getBoundingClientRect().top;
    let startPosition = window.pageYOffset;
    let startTime = null;
  
    function animation(currentTime) {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const run = ease(timeElapsed, startPosition, targetPosition, duration);
      window.scrollTo(0, run);
      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      }
    }
  
    function ease(t, b, c, d) {
      t /= d / 2;
      if (t < 1) return (c / 2) * t * t + b;
      t--;
      return (-c / 2) * (t * (t - 2) - 1) + b;
    }
  
    requestAnimationFrame(animation);
  }
  
  // Add click event listener to the navigation links
  navLinks.forEach((link, index) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      smoothScroll(sections[index], 800);
    });
  });
  // Pagination functionality
document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const productContainer = document.getElementById('product-container');
    const paginationNumbers = document.querySelectorAll('.pagination-number');
    const paginationArrows = document.querySelectorAll('.pagination-arrow');
    const pageSizeSelect = document.getElementById('page-size');
    
    // Variables
    let currentPage = 1;
    let productsPerPage = 12;
    let totalProducts = 36; // Total number of products (hard-coded for now)
    
    // Initialize pagination
    function initPagination() {
        // Set up event listeners for pagination numbers
        paginationNumbers.forEach(button => {
            button.addEventListener('click', function() {
                const pageNum = parseInt(this.textContent);
                goToPage(pageNum);
            });
        });
        
        // Set up event listeners for arrows
        paginationArrows[0].addEventListener('click', function() { // Previous
            if (!this.hasAttribute('disabled')) {
                goToPage(currentPage - 1);
            }
        });
        
        paginationArrows[1].addEventListener('click', function() { // Next
            if (!this.hasAttribute('disabled')) {
                goToPage(currentPage + 1);
            }
        });
        
        // Set up event listener for page size change
        pageSizeSelect.addEventListener('change', function() {
            productsPerPage = parseInt(this.value);
            goToPage(1); // Reset to first page when changing items per page
            updateProductsCount();
        });
    }
    
    // Go to specific page
    function goToPage(pageNum) {
        // Update current page
        currentPage = pageNum;
        
        // Update active state for pagination buttons
        paginationNumbers.forEach(button => {
            const buttonPage = parseInt(button.textContent);
            if (buttonPage === currentPage) {
                button.classList.add('active');
                button.setAttribute('aria-current', 'page');
            } else {
                button.classList.remove('active');
                button.removeAttribute('aria-current');
            }
        });
        
        // Update disabled state for arrows
        paginationArrows[0].disabled = currentPage === 1;
        const totalPages = Math.ceil(totalProducts / productsPerPage);
        paginationArrows[1].disabled = currentPage === totalPages;
        
        // In a real implementation, this would load the appropriate products
        // For now, we'll just simulate pagination by scrolling to top
        window.scrollTo({
            top: document.querySelector('.products-header').offsetTop - 100,
            behavior: 'smooth'
        });
        
        // Update product count display
        updateProductsCount();
        
        // Here you would typically load products for the current page
        // loadProductsForPage(currentPage, productsPerPage);
    }
    
    // Update the products count text
    function updateProductsCount() {
        const productsCount = document.querySelector('.products-count span');
        const startItem = (currentPage - 1) * productsPerPage + 1;
        const endItem = Math.min(currentPage * productsPerPage, totalProducts);
        
        productsCount.textContent = `Showing ${startItem}-${endItem} of ${totalProducts} products`;
    }
    
    // In a real application, this function would fetch products from a backend
    function loadProductsForPage(page, itemsPerPage) {
        // This would be replaced with actual API call or data fetching logic
        console.log(`Loading page ${page} with ${itemsPerPage} items per page`);
        
        // Example of how you might fetch data from an API
        /*
        fetch(`/api/products?page=${page}&limit=${itemsPerPage}`)
            .then(response => response.json())
            .then(data => {
                // Clear current products
                productContainer.innerHTML = '';
                
                // Add new products
                data.products.forEach(product => {
                    const productCard = createProductCard(product);
                    productContainer.appendChild(productCard);
                });
                
                // Update product count
                updateProductsCount();
            })
            .catch(error => console.error('Error loading products:', error));
        */
    }
    
    // Function to dynamically create a product card (would be used with real data)
    function createProductCard(product) {
        // This is a placeholder for how you would create product cards dynamically
        const card = document.createElement('div');
        card.className = 'product-card';
        card.dataset.category = product.category;
        card.dataset.price = product.price;
        card.dataset.name = product.name;
        
        // Build the card structure using product data
        // ...
        
        return card;
    }
    
    // Initialize pagination system
    initPagination();
    updateProductsCount();
});
document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-question');
    
    faqItems.forEach(item => {
        item.addEventListener('click', function() {
            console.log('FAQ question clicked:', this);
            // Get the parent faq-item
            const parent = this.parentElement;
            console.log('Parent faq-item before toggle:', parent.className);
            // Toggle active class on parent (this is what controls visibility in your CSS)
            parent.classList.toggle('active');
            console.log('Parent faq-item after toggle:', parent.className);
            // Toggle icon rotation
            const icon = this.querySelector('i');
            if (icon) {
                if (parent.classList.contains('active')) {
                    icon.classList.remove('fa-chevron-down');
                    icon.classList.add('fa-chevron-up');
                    // Add rotation for visual effect
                    icon.style.transform = 'rotate(180deg)';
                } else {
                    icon.classList.remove('fa-chevron-up');
                    icon.classList.add('fa-chevron-down');
                    // Reset rotation
                    icon.style.transform = 'rotate(0)';
                }
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const mapBtn = document.getElementById('load-map-btn');
    const mapContainer = document.getElementById('map-container');
    const mapPlaceholder = document.getElementById('map-placeholder');
    
    if (mapBtn) {
        mapBtn.addEventListener('click', function() {
            // Create Google Maps iframe
            const mapIframe = document.createElement('iframe');
            mapIframe.src = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.0307676233243!2d36.9351945!3d-1.1029364!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f4e841be5cd4d%3A0xaead828509892474!2sJuja%2C%20Kenya!5e0!3m2!1sen!2sus!4v1682520000000!5m2!1sen!2sus";
            mapIframe.width = "100%";
            mapIframe.height = "400";
            mapIframe.style.border = "0";
            mapIframe.allowFullscreen = true;
            mapIframe.loading = "lazy";
            mapIframe.referrerPolicy = "no-referrer-when-downgrade";
            
            // Replace placeholder with iframe
            mapContainer.removeChild(mapPlaceholder);
            mapContainer.appendChild(mapIframe);
        });
    }
});


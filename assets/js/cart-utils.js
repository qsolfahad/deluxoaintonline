// ============================================
// Global Cart Utility Functions — Enhanced
// Toast notifications + new product link format
// ============================================
(function() {
    'use strict';
    
    // Update cart count globally
    function updateCartCount() {
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        const cartTotal = cart.reduce((sum, item) => sum + item.quantity, 0);
        const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
        
        // Update all cart count badges
        document.querySelectorAll('#cart-count, .badge-custom').forEach(badge => {
            const link = badge.closest('a');
            if (link && (link.href.includes('cart') || link.getAttribute('href')?.includes('cart'))) {
                badge.textContent = cartTotal;
            }
        });
        
        // Update wishlist count badges
        document.querySelectorAll('#wishlist-count').forEach(badge => {
            badge.textContent = wishlist.length;
        });
        
        // Dispatch event for other scripts
        window.dispatchEvent(new CustomEvent('cartUpdated', { 
            detail: { 
                count: cartTotal,
                items: cart 
            } 
        }));
    }
    
    // Add to cart function
    function addToCart(productSlug, productName, productLink, productImage, unit = 'gallon') {
        let cart = JSON.parse(localStorage.getItem('cart') || '[]');
        
        // Check if product already in cart with same unit
        const existingItem = cart.find(item => (item.slug || item.id) === productSlug && (item.unit || 'gallon') === unit);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            // Ensure link uses new product.html format
            if (productLink && !productLink.includes('product.html?slug=')) {
                productLink = 'product.html?slug=' + productSlug;
            }
            
            cart.push({
                slug: productSlug,
                name: productName,
                link: productLink || 'product.html?slug=' + productSlug,
                image: productImage,
                quantity: 1,
                unit: unit
            });
        }
        
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        
        return true;
    }
    
    // Update all listing prices on the page dynamically
    function updateListingPrices() {
        if (!window.ProductPricing) return;
        
        document.querySelectorAll('.product-card, .card').forEach(card => {
            const btn = card.querySelector('[data-product]');
            if (!btn) return;
            
            const productSlug = btn.getAttribute('data-product') || btn.getAttribute('data-product-slug');
            if (!productSlug) return;
            
            const priceEl = card.querySelector('.product-price');
            if (priceEl) {
                const priceGallon = window.ProductPricing.getProductPrice(productSlug, 'gallon');
                const priceQuarter = window.ProductPricing.getProductPrice(productSlug, 'quarter');
                
                let priceDisplay = '';
                if (priceGallon > 0 && priceQuarter > 0) {
                    priceDisplay = `
                        <div style="font-size: 13px; color: var(--text-secondary); line-height: 1.4; margin-bottom: 8px;">
                            <div>Gallon: <strong style="color: var(--accent);">PKR ${priceGallon.toLocaleString()}</strong></div>
                            <div>Quarter: <strong style="color: var(--accent);">PKR ${priceQuarter.toLocaleString()}</strong></div>
                        </div>`;
                } else if (priceGallon > 0) {
                    priceDisplay = `
                        <div style="font-size: 13px; color: var(--text-secondary); line-height: 1.4; margin-bottom: 8px;">
                            <div>Gallon: <strong style="color: var(--accent);">PKR ${priceGallon.toLocaleString()}</strong></div>
                        </div>`;
                } else if (priceQuarter > 0) {
                    priceDisplay = `
                        <div style="font-size: 13px; color: var(--text-secondary); line-height: 1.4; margin-bottom: 8px;">
                            <div>Quarter: <strong style="color: var(--accent);">PKR ${priceQuarter.toLocaleString()}</strong></div>
                        </div>`;
                } else {
                    priceDisplay = '<span style="color: var(--primary-light); font-size: 13px; display: block; margin-bottom: 8px;">Contact for Price</span>';
                }
                priceEl.innerHTML = priceDisplay;
            }
        });
    }

    // Inject newly added database products into category pages dynamically
    function syncDynamicCategoryProducts() {
        const container = document.getElementById('products-container') || document.getElementById('featured-products');
        if (!container) return;

        // Try to get category or brand name from page header
        const titleEl = document.querySelector('.section-title h2') || document.querySelector('h1.page-title') || document.querySelector('.section-title h1');
        if (!titleEl) return;
        const categoryName = titleEl.textContent.trim();

        // Get path prefix for product.html (handling nested files)
        let rootPrefix = '';
        if (window.location.protocol === 'file:') {
            const pathParts = window.location.pathname.replace(/\\/g, '/').split('/pages/');
            if (pathParts[1]) {
                const depth = pathParts[1].split('/').filter(Boolean).length;
                rootPrefix = '../'.repeat(depth);
            } else {
                rootPrefix = './';
            }
        } else {
            rootPrefix = '/';
        }

        if (!window.ProductCatalog) return;
        const allProducts = window.ProductCatalog.products || [];

        // Find existing product slugs currently on the page
        const existingSlugs = new Set();
        container.querySelectorAll('[data-product], a[href*="slug="]').forEach(el => {
            const slugAttr = el.getAttribute('data-product');
            if (slugAttr) {
                existingSlugs.add(slugAttr);
            } else {
                const href = el.getAttribute('href') || '';
                const match = href.match(/slug=([^&]+)/);
                if (match) existingSlugs.add(match[1]);
            }
        });

        // Filter products matching this category or brand
        const searchCat = categoryName.toLowerCase();
        const matchingProducts = allProducts.filter(p => {
            const cat = (p.category || '').toLowerCase();
            const brand = (p.brand || '').toLowerCase();
            
            // Check if product belongs to this page category
            // e.g. Paints, Waterproofing, Rollers & Trays, Dry Colors, or Berger, Kansai
            return cat.includes(searchCat) || brand.includes(searchCat) || searchCat.includes(cat) || searchCat.includes(brand);
        });

        // Inject missing products
        matchingProducts.forEach(product => {
            if (existingSlugs.has(product.slug)) return;

            // Generate card element matching standard theme structure
            const col = document.createElement('div');
            col.className = 'col-lg-3 col-md-4 col-sm-6 dynamic-product';
            
            const productLink = `${rootPrefix}product.html?slug=${product.slug}`;
            const imageSrc = product.image || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQibsRwO1naOYLYziKEVQO5zjCLQ8HCBYerRs6J9cC9we9zRYWOtoReieQ&s=10';
            
            col.innerHTML = `
                <div class="product-card card h-100 shadow-sm" style="transition: transform 0.3s ease;">
                    <a href="${productLink}" class="text-decoration-none">
                        <img src="${imageSrc}"
                            class="card-img-top" alt="${product.name}"
                            style="height: 250px; object-fit: contain; padding: 20px; background: rgba(255,255,255,0.02);">
                    </a>
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title">
                            <a href="${productLink}" class="text-decoration-none" style="color: var(--text-primary);">${product.name}</a>
                        </h5>
                        <p class="product-price mb-3">Loading price...</p>
                        <div class="mt-auto">
                            <a href="${productLink}" class="btn btn-primary w-100 mb-2 btn-product">
                                <i class="bi bi-eye me-2"></i>View Details
                            </a>
                            <button class="btn btn-outline-primary w-100 add-to-cart-btn btn-product"
                                data-product="${product.slug}"
                                data-product-link="${productLink}">
                                <i class="bi bi-cart-plus me-2"></i>Add to Cart
                            </button>
                        </div>
                    </div>
                </div>
            `;
            
            container.appendChild(col);
            existingSlugs.add(product.slug);
        });
    }

    // Initialize cart and prices on page load
    function init() {
        updateCartCount();
        syncDynamicCategoryProducts();
        updateListingPrices();
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
    // Listen for database server data loading updates
    window.addEventListener('productsLoaded', function() {
        syncDynamicCategoryProducts();
        updateListingPrices();
    });

    window.addEventListener('pricingLoaded', function() {
        updateListingPrices();
    });

    // Expose functions globally
    window.CartUtils = {
        updateCartCount: updateCartCount,
        addToCart: addToCart,
        updateListingPrices: updateListingPrices
    };
    
    // Auto-initialize add to cart buttons
    document.addEventListener('click', function(e) {
        if (e.target.closest('.add-to-cart-btn')) {
            const btn = e.target.closest('.add-to-cart-btn');
            const productSlug = btn.getAttribute('data-product') || btn.getAttribute('data-product-slug');
            const productLink = btn.getAttribute('data-product-link') || 'product.html?slug=' + productSlug;
            const productUnit = btn.getAttribute('data-unit') || 'gallon';
            
            if (!productSlug) return;
            
            // Get product details from the card
            const card = btn.closest('.product-card, .card');
            const productName = card?.querySelector('.card-title a')?.textContent?.trim() || 
                              card?.querySelector('.card-title')?.textContent?.trim() || 
                              'Product';
            const productImage = card?.querySelector('img')?.src || '';
            
            // Add to cart
            const added = addToCart(productSlug, productName, productLink, productImage, productUnit);
            
            if (added) {
                // Show toast notification
                if (window.KPAnimations) {
                    window.KPAnimations.showToast(productName + ' added to cart!', 'bi-cart-check');
                }

                // Visual feedback on button
                const originalHTML = btn.innerHTML;
                btn.innerHTML = '<i class="bi bi-check me-2"></i>Added!';
                btn.classList.remove('btn-outline-primary');
                btn.classList.add('btn-success');
                
                setTimeout(() => {
                    btn.innerHTML = originalHTML;
                    btn.classList.remove('btn-success');
                    btn.classList.add('btn-outline-primary');
                }, 2000);
            }
        }
    });
})();

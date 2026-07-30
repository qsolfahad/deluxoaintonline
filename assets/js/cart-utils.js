// ============================================
// Global Cart Utility Functions — Enhanced
// Toast notifications + new product link format
// ============================================
(function() {
    'use strict';
    
    // In-memory cart variable (backed by browser state variable)
    let _cartArray = JSON.parse(localStorage.getItem('cart') || '[]');

    function getCart() {
        return _cartArray;
    }

    function saveCart(cart) {
        _cartArray = cart;
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount(cart);
        window.dispatchEvent(new CustomEvent('cartUpdated', {
            detail: {
                count: cart.reduce((sum, item) => sum + (item.quantity || 1), 0),
                items: cart
            }
        }));
    }

    function clearCart() {
        _cartArray = [];
        localStorage.removeItem('cart');
        updateCartCount(_cartArray);
    }

    // Update cart count globally
    function updateCartCount(customCart) {
        const cart = customCart || _cartArray;
        const cartTotal = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
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
    
    // Add to cart function using in-memory cart variables
    function addToCart(productSlug, productName, productLink, productImage, unit = 'gallon') {
        let cart = getCart();
        const normUnit = (unit || 'gallon').toLowerCase();

        let unitPrice = 0;
        let basePrice = 0;
        if (window.ProductPricing) {
            basePrice = window.ProductPricing.getProductBasePrice(productSlug, normUnit);
            unitPrice = window.ProductPricing.getProductPrice(productSlug, normUnit);
        }

        // Check if product already in cart with same unit
        const existingItem = cart.find(item =>
            (item.slug || item.id) === productSlug &&
            (item.unit || 'gallon').toLowerCase() === normUnit
        );

        if (existingItem) {
            existingItem.quantity += 1;
            if (unitPrice > 0) existingItem.unitPrice = unitPrice;
            if (basePrice > 0) existingItem.basePrice = basePrice;
        } else {
            if (productLink && !productLink.includes('product.html?slug=')) {
                productLink = 'product.html?slug=' + productSlug;
            }

            cart.push({
                slug: productSlug,
                name: productName,
                link: productLink || 'product.html?slug=' + productSlug,
                image: productImage,
                quantity: 1,
                unit: normUnit,
                unitPrice: unitPrice,
                basePrice: basePrice
            });
        }

        saveCart(cart);

        return true;
    }
    
    // Update all listing prices on the page dynamically
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
                priceEl.innerHTML = window.ProductPricing.getPriceDisplay(productSlug);
            }
        });
    }

    // Inject newly added database products into category pages dynamically
    function syncDynamicCategoryProducts() {
        const container = document.getElementById('products-container') || document.getElementById('featured-products');
        if (!container) return;

        // Try to get category or brand name from page header
        const titleEl = document.querySelector('.section-title h2') || document.querySelector('h1.page-title') || document.querySelector('.section-title h1');
        const categoryName = titleEl ? titleEl.textContent.trim() : '';

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

        // Remove any hardcoded/static product cards that are NOT in Firebase catalog
        const firebaseSlugs = new Set(allProducts.map(p => p.slug));
        container.querySelectorAll('.product-card, .card').forEach(card => {
            const btn = card.querySelector('[data-product]');
            const slugAttr = btn ? (btn.getAttribute('data-product') || btn.getAttribute('data-product-slug')) : null;
            if (slugAttr && !firebaseSlugs.has(slugAttr)) {
                const col = card.closest('[class*="col-"]');
                if (col) col.remove();
                else card.remove();
            }
        });

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

        // Filter products matching this category or brand (or all if categoryName is empty/Featured)
        const searchCat = categoryName.toLowerCase();
        const isFeatured = !searchCat || searchCat.includes('featured') || searchCat.includes('home') || searchCat.includes('all');

        const matchingProducts = isFeatured ? allProducts : allProducts.filter(p => {
            const cat = (p.category || '').toLowerCase();
            const brand = (p.brand || '').toLowerCase();
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
            const discountPct = Number(product.discountPercent) || 0;
            const discountBadge = discountPct > 0 ? `<span class="badge bg-danger position-absolute" style="top:10px;right:10px;z-index:2;font-size:0.75rem;padding:4px 8px;border-radius:20px;">${discountPct}% OFF</span>` : '';

            col.innerHTML = `
                <div class="product-card card h-100 shadow-sm position-relative" style="transition: transform 0.3s ease;">
                    ${discountBadge}
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

    // Unit Selector Modal for card clicks
    function openUnitSelectorModal(productSlug, productName, productLink, productImage) {
        let modalEl = document.getElementById('unitSelectorModal');
        if (!modalEl) {
            modalEl = document.createElement('div');
            modalEl.id = 'unitSelectorModal';
            modalEl.className = 'modal fade';
            modalEl.setAttribute('tabindex', '-1');
            modalEl.innerHTML = `
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content" style="background: var(--bg-card, #121826); color: var(--text-primary, #fff); border: 1px solid var(--border-default, #2a3447); border-radius: var(--radius-lg, 16px);">
                        <div class="modal-header" style="border-bottom: 1px solid var(--border-subtle, rgba(255,255,255,0.1));">
                            <h5 class="modal-title d-flex align-items-center gap-2" style="font-size:1.1rem;">
                                <i class="bi bi-cart-plus text-primary"></i> Select Unit & Size
                            </h5>
                            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body p-4">
                            <div class="d-flex align-items-center gap-3 mb-3 pb-3" style="border-bottom: 1px solid var(--border-subtle, rgba(255,255,255,0.1));">
                                <img id="unit-modal-img" src="" alt="" style="width: 70px; height: 70px; object-fit: contain; background: rgba(255,255,255,0.03); border-radius: 8px; padding: 4px;">
                                <div>
                                    <h6 id="unit-modal-title" class="mb-1 fw-bold" style="color:var(--text-primary, #fff);">Product Title</h6>
                                    <span class="badge bg-primary" id="unit-modal-brand">Delux</span>
                                </div>
                            </div>
                            <div class="mb-3">
                                <label class="form-label fw-semibold text-secondary" style="font-size: 0.82rem; letter-spacing:0.5px;">CHOOSE PACKAGING UNIT:</label>
                                <div id="unit-options-container" class="d-flex flex-column gap-2">
                                    <!-- Dynamic options injected here -->
                                </div>
                            </div>
                            <div class="d-flex align-items-center justify-content-between mt-3 pt-3" style="border-top: 1px solid var(--border-subtle, rgba(255,255,255,0.1));">
                                <div class="d-flex align-items-center gap-2">
                                    <label class="form-label mb-0 small text-muted">Quantity:</label>
                                    <input type="number" id="unit-modal-qty" class="form-control form-control-sm text-center" value="1" min="1" max="99" style="width: 70px;">
                                </div>
                                <div class="text-end">
                                    <small class="text-muted d-block" style="font-size:11px;">Total Price</small>
                                    <strong id="unit-modal-total-price" style="color: var(--accent, #00f2fe); font-size: 1.2rem;">PKR 0</strong>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer" style="border-top: 1px solid var(--border-subtle, rgba(255,255,255,0.1));">
                            <button type="button" class="btn btn-secondary btn-sm" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" id="unit-modal-confirm-btn" class="btn btn-primary btn-sm px-4">
                                <i class="bi bi-cart-check me-1"></i> Add to Cart
                            </button>
                        </div>
                    </div>
                </div>`;
            document.body.appendChild(modalEl);
        }

        // Get pricing for this product
        const pricingInfo = (window.ProductPricing && window.ProductPricing.pricing[productSlug]) || {};
        const productObj = (window.ProductCatalog && window.ProductCatalog.getProductBySlug(productSlug)) || {};
        const discountPct = Number(productObj.discountPercent) || 0;

        document.getElementById('unit-modal-img').src = productImage || productObj.image || '';
        document.getElementById('unit-modal-title').textContent = productName || productObj.name || 'Product';
        document.getElementById('unit-modal-brand').textContent = productObj.brand || productObj.category || 'Delux';
        document.getElementById('unit-modal-qty').value = 1;

        const optionsContainer = document.getElementById('unit-options-container');
        const units = [];
        if (pricingInfo.drum) units.push('drum');
        if (pricingInfo.gallon || (!pricingInfo.quarter && !pricingInfo.drum)) units.push('gallon');
        if (pricingInfo.quarter) units.push('quarter');

        let selectedUnit = units[0] || 'gallon';

        function renderUnitOptions() {
            optionsContainer.innerHTML = units.map(u => {
                const baseP = window.ProductPricing ? window.ProductPricing.getProductBasePrice(productSlug, u) : 0;
                const finalP = window.ProductPricing ? window.ProductPricing.getProductPrice(productSlug, u) : 0;
                const uCap = u.charAt(0).toUpperCase() + u.slice(1);
                const isSelected = u === selectedUnit;

                const priceText = discountPct > 0 ?
                    `<span class="text-decoration-line-through text-muted me-2" style="font-size:0.8em;">PKR ${baseP.toLocaleString()}</span><strong style="color:var(--accent, #00f2fe);">PKR ${finalP.toLocaleString()}</strong>` :
                    `<strong style="color:var(--accent, #00f2fe);">PKR ${baseP.toLocaleString()}</strong>`;

                return `
                    <label class="unit-option-card d-flex align-items-center justify-content-between p-2 px-3 border rounded ${isSelected ? 'border-primary bg-primary-subtle' : ''}" style="cursor:pointer; transition: all 0.2s; background: rgba(255,255,255,0.02);">
                        <div class="d-flex align-items-center gap-2">
                            <input type="radio" name="modal-unit" value="${u}" ${isSelected ? 'checked' : ''} style="cursor:pointer;">
                            <span class="fw-semibold" style="font-size:0.95rem;">${uCap}</span>
                        </div>
                        <div>${priceText}</div>
                    </label>`;
            }).join('');

            optionsContainer.querySelectorAll('input[name="modal-unit"]').forEach(radio => {
                radio.addEventListener('change', function() {
                    selectedUnit = this.value;
                    renderUnitOptions();
                    updateModalTotal();
                });
            });
        }

        function updateModalTotal() {
            const qty = Math.max(1, parseInt(document.getElementById('unit-modal-qty').value) || 1);
            const unitPrice = window.ProductPricing ? window.ProductPricing.getProductPrice(productSlug, selectedUnit) : 0;
            const total = unitPrice * qty;
            document.getElementById('unit-modal-total-price').textContent = 'PKR ' + total.toLocaleString();
        }

        renderUnitOptions();
        updateModalTotal();

        document.getElementById('unit-modal-qty').oninput = updateModalTotal;

        const confirmBtn = document.getElementById('unit-modal-confirm-btn');
        confirmBtn.onclick = function() {
            const qty = Math.max(1, parseInt(document.getElementById('unit-modal-qty').value) || 1);
            for (let i = 0; i < qty; i++) {
                addToCart(productSlug, productName, productLink, productImage, selectedUnit);
            }
            if (window.KPAnimations) {
                window.KPAnimations.showToast(`${productName} (${selectedUnit}) added to cart!`, 'bi-cart-check');
            }
            const modalInstance = bootstrap.Modal.getInstance(modalEl) || new bootstrap.Modal(modalEl);
            modalInstance.hide();
        };

        const modalInstance = new bootstrap.Modal(modalEl);
        modalInstance.show();
    }

    // Expose functions globally
    window.CartUtils = {
        getCart: getCart,
        saveCart: saveCart,
        clearCart: clearCart,
        updateCartCount: updateCartCount,
        addToCart: addToCart,
        updateListingPrices: updateListingPrices,
        openUnitSelectorModal: openUnitSelectorModal
    };
    
    // Auto-initialize add to cart buttons
    document.addEventListener('click', function(e) {
        if (e.target.closest('.add-to-cart-btn')) {
            const btn = e.target.closest('.add-to-cart-btn');
            const productSlug = btn.getAttribute('data-product') || btn.getAttribute('data-product-slug');
            const productLink = btn.getAttribute('data-product-link') || 'product.html?slug=' + productSlug;
            
            if (!productSlug) return;

            // Don't intercept if inside detail page #btn-add-cart
            if (btn.id === 'btn-add-cart') return;
            
            // Get product details from the card
            const card = btn.closest('.product-card, .card');
            const productName = card?.querySelector('.card-title a')?.textContent?.trim() || 
                              card?.querySelector('.card-title')?.textContent?.trim() || 
                              'Product';
            const productImage = card?.querySelector('img')?.src || '';
            
            // Open Unit Selector Modal for user to pick Gallon / Quarter / Drum
            openUnitSelectorModal(productSlug, productName, productLink, productImage);
        }
    });
})();

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
    function addToCart(productSlug, productName, productLink, productImage) {
        let cart = JSON.parse(localStorage.getItem('cart') || '[]');
        
        // Check if product already in cart
        const existingItem = cart.find(item => (item.slug || item.id) === productSlug);
        
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
                quantity: 1
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
                const price = window.ProductPricing.getProductPrice(productSlug, 'gallon');
                if (price > 0) {
                    priceEl.innerHTML = `PKR ${price.toLocaleString('en-US', {minimumFractionDigits: 0, maximumFractionDigits: 0})}`;
                } else {
                    priceEl.innerHTML = '<span style="color: var(--primary-light);">Contact for Price</span>';
                }
            }
        });
    }

    // Initialize cart and prices on page load
    function init() {
        updateCartCount();
        updateListingPrices();
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    

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
            
            if (!productSlug) return;
            
            // Get product details from the card
            const card = btn.closest('.product-card, .card');
            const productName = card?.querySelector('.card-title a')?.textContent?.trim() || 
                              card?.querySelector('.card-title')?.textContent?.trim() || 
                              'Product';
            const productImage = card?.querySelector('img')?.src || '';
            
            // Add to cart
            const added = addToCart(productSlug, productName, productLink, productImage);
            
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

// Global Cart Utility Functions
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
            cart.push({
                slug: productSlug,
                name: productName,
                link: productLink,
                image: productImage,
                quantity: 1
            });
        }
        
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        
        return true;
    }
    
    // Initialize cart count on page load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', updateCartCount);
    } else {
        updateCartCount();
    }
    
    // Listen for cart updates
    window.addEventListener('cartUpdated', function() {
        updateCartCount();
    });
    
    // Expose functions globally
    window.CartUtils = {
        updateCartCount: updateCartCount,
        addToCart: addToCart
    };
    
    // Auto-initialize add to cart buttons
    document.addEventListener('click', function(e) {
        if (e.target.closest('.add-to-cart-btn')) {
            const btn = e.target.closest('.add-to-cart-btn');
            const productSlug = btn.getAttribute('data-product') || btn.getAttribute('data-product-slug');
            const productLink = btn.getAttribute('data-product-link');
            
            if (!productSlug) return;
            
            // Get product details from the card
            const card = btn.closest('.product-card, .card');
            const productName = card?.querySelector('.card-title a')?.textContent?.trim() || 
                              card?.querySelector('.card-title')?.textContent?.trim() || 
                              'Product';
            const productImage = card?.querySelector('img')?.src || 
                               'https://via.placeholder.com/300x300?text=Product';
            
            // Add to cart
            const added = addToCart(productSlug, productName, productLink, productImage);
            
            if (added) {
                // Visual feedback
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

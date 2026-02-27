/**
 * Karachi Paints - Theme Enhancements
 * Modern UI improvements and interactions
 */

(function() {
    'use strict';

    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    function init() {
        // Add fade-in animation to content
        addFadeInAnimation();
        
        // Enhance product cards
        enhanceProductCards();
        
        // Smooth scroll for anchor links
        smoothScroll();
        
        // Add loading states
        addLoadingStates();
        
        // Enhance mobile menu
        enhanceMobileMenu();
    }

    /**
     * Add fade-in animation to elements
     */
    function addFadeInAnimation() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });

        // Observe product cards and sections
        document.querySelectorAll('.product, .vc_row, .woocommerce ul.products li').forEach(el => {
            observer.observe(el);
        });
    }

    /**
     * Enhance product cards with hover effects
     */
    function enhanceProductCards() {
        const productCards = document.querySelectorAll('.woocommerce ul.products li.product');
        
        productCards.forEach(card => {
            // Add hover effect
            card.addEventListener('mouseenter', function() {
                this.style.transition = 'all 0.3s ease';
            });
        });
    }

    /**
     * Smooth scroll for anchor links
     */
    function smoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href !== '#' && href.length > 1) {
                    const target = document.querySelector(href);
                    if (target) {
                        e.preventDefault();
                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                }
            });
        });
    }

    /**
     * Add loading states to buttons
     */
    function addLoadingStates() {
        document.querySelectorAll('button, .button, a.button').forEach(button => {
            button.addEventListener('click', function() {
                if (!this.classList.contains('no-loading')) {
                    this.classList.add('loading');
                    setTimeout(() => {
                        this.classList.remove('loading');
                    }, 1000);
                }
            });
        });
    }

    /**
     * Enhance mobile menu
     */
    function enhanceMobileMenu() {
        const mobileNavIcon = document.querySelector('.mobile-nav-icon');
        const mainNav = document.querySelector('.main-nav');
        
        if (mobileNavIcon && mainNav) {
            mobileNavIcon.addEventListener('click', function() {
                mainNav.classList.toggle('mobile-menu-open');
                this.classList.toggle('active');
            });
        }
    }

    /**
     * Sticky header on scroll
     */
    let lastScroll = 0;
    const header = document.querySelector('.main-header');
    
    if (header) {
        window.addEventListener('scroll', function() {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll > 100) {
                header.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
            } else {
                header.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
            }
            
            lastScroll = currentScroll;
        });
    }

    /**
     * Lazy load images
     */
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        imageObserver.unobserve(img);
                    }
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }

})();

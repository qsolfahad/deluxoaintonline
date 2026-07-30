// ============================================================
//  Delux Paint Online — Product Catalog API
//  Products are loaded dynamically from Firebase Firestore.
//  This module exposes window.ProductCatalog helper methods.
// ============================================================

(function () {
    'use strict';

    // Internal fallback array
    const products = [];

    // Helper: ALWAYS get active products list from window.ProductCatalog.products
    function _getProductsList() {
        if (typeof window !== 'undefined' && window.ProductCatalog && Array.isArray(window.ProductCatalog.products)) {
            return window.ProductCatalog.products;
        }
        return products;
    }

    function getProductBySlug(slug) {
        if (!slug) return null;
        const target = String(slug).trim().toLowerCase();
        const list = _getProductsList();
        return list.find(p =>
            p.slug === slug ||
            (p.slug || '').toLowerCase() === target ||
            p.id === slug ||
            (p.id || '').toLowerCase() === target
        ) || null;
    }

    function getAllProducts() {
        return _getProductsList();
    }

    function getProductsByCategory(category) {
        if (!category) return [];
        const cat = category.toLowerCase();
        return _getProductsList().filter(p =>
            (p.category || '').toLowerCase() === cat
        );
    }

    function getProductsByBrand(brand) {
        if (!brand) return [];
        const b = brand.toLowerCase();
        return _getProductsList().filter(p =>
            (p.brand || '').toLowerCase() === b
        );
    }

    function searchProducts(query) {
        const q = (query || '').toLowerCase();
        if (!q) return _getProductsList();
        return _getProductsList().filter(p =>
            (p.name || '').toLowerCase().includes(q) ||
            (p.brand || '').toLowerCase().includes(q) ||
            (p.category || '').toLowerCase().includes(q) ||
            (p.description || '').toLowerCase().includes(q) ||
            (p.slug || '').toLowerCase().includes(q)
        );
    }

    function getRelatedProducts(slug, limit) {
        const product = getProductBySlug(slug);
        const list = _getProductsList();
        if (!product) return list.slice(0, limit || 4);
        return list
            .filter(p => p.slug !== slug && (p.category || '').toLowerCase() === (product.category || '').toLowerCase())
            .slice(0, limit || 4);
    }

    function getCategories() {
        return [...new Set(_getProductsList().map(p => p.category).filter(Boolean))];
    }

    function getBrands() {
        return [...new Set(_getProductsList().map(p => p.brand).filter(Boolean))];
    }

    // ── Expose API globally ────────────────────────────────────
    window.ProductCatalog = {
        getProductBySlug,
        getAllProducts,
        getProductsByCategory,
        getProductsByBrand,
        searchProducts,
        getRelatedProducts,
        getCategories,
        getBrands,
        products
    };

    // Dispatch initial event
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            window.dispatchEvent(new CustomEvent('productsLoaded', { detail: _getProductsList() }));
        });
    } else {
        window.dispatchEvent(new CustomEvent('productsLoaded', { detail: _getProductsList() }));
    }

})();

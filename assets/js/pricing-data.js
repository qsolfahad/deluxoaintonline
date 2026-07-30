// ============================================================
//  Delux Paint Online — Pricing Data Stub
//  Pricing is now loaded exclusively from Firebase Firestore.
//  This file only exposes the ProductPricing API shell;
//  firebase-service.js populates it via loadCatalogFromFirebase().
// ============================================================

// Start empty — Firebase will fill this in
const productPricing = {};

// ── Helper functions ─────────────────────────────────────────

/**
 * Get base (undiscounted) price for a product & unit.
 */
function getProductBasePrice(slugOrId, unit) {
    const id = slugOrId;
    const unitKey = (unit || 'gallon').toLowerCase();

    if (productPricing[id] && productPricing[id][unitKey] !== undefined) {
        return Number(productPricing[id][unitKey]) || 0;
    }
    return 0;
}

/**
 * Get discount percentage for a product (0 to 100).
 */
function getProductDiscountPercent(slugOrId) {
    // 1. Check ProductCatalog if loaded
    if (typeof window !== 'undefined' && window.ProductCatalog) {
        const prod = window.ProductCatalog.getProductBySlug(slugOrId);
        if (prod && Number(prod.discountPercent) > 0) {
            return Number(prod.discountPercent);
        }
    }
    // 2. Check pricing object
    if (productPricing[slugOrId] && Number(productPricing[slugOrId].discountPercent) > 0) {
        return Number(productPricing[slugOrId].discountPercent);
    }
    return 0;
}

/**
 * Get final (discounted) price for a product & unit.
 */
function getProductPrice(slugOrId, unit) {
    const basePrice = getProductBasePrice(slugOrId, unit);
    if (basePrice <= 0) return 0;

    const discountPct = getProductDiscountPercent(slugOrId);
    if (discountPct > 0) {
        return Math.round(basePrice * (1 - discountPct / 100));
    }
    return basePrice;
}

function formatPrice(price) {
    if (!price || price === 0) return 'Contact for Price';
    return 'PKR ' + Number(price).toLocaleString('en-PK');
}

/**
 * Returns formatted HTML price display with original price struck through if discounted.
 */
function getPriceDisplay(slug) {
    const discountPct = getProductDiscountPercent(slug);
    const units = ['gallon', 'quarter', 'drum'];
    const parts = [];

    units.forEach(unit => {
        const base = getProductBasePrice(slug, unit);
        if (base > 0) {
            const finalPrice = getProductPrice(slug, unit);
            const unitLabel = unit.charAt(0).toUpperCase() + unit.slice(1);
            if (discountPct > 0) {
                parts.push(`<div>${unitLabel}: <del style="opacity:0.6;font-size:0.85em;margin-right:4px;">PKR ${base.toLocaleString('en-PK')}</del> <strong style="color:var(--accent,#a78bfa);">PKR ${finalPrice.toLocaleString('en-PK')}</strong> <span class="badge bg-danger" style="font-size:0.7em;">-${discountPct}%</span></div>`);
            } else {
                parts.push(`<div>${unitLabel}: <strong style="color:var(--accent,#a78bfa);">PKR ${base.toLocaleString('en-PK')}</strong></div>`);
            }
        }
    });

    if (parts.length === 0) return '<span style="color:var(--text-muted,#94a3b8);font-size:13px;">Contact for Price</span>';
    return parts.join('');
}

// ── Expose API globally ──────────────────────────────────────
if (typeof window !== 'undefined') {
    window.ProductPricing = {
        getProductBasePrice,
        getProductDiscountPercent,
        getProductPrice,
        formatPrice,
        getPriceDisplay,
        pricing: productPricing
    };

    // Dispatch initial event
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            window.dispatchEvent(new CustomEvent('pricingLoaded', { detail: productPricing }));
        });
    } else {
        window.dispatchEvent(new CustomEvent('pricingLoaded', { detail: productPricing }));
    }
}

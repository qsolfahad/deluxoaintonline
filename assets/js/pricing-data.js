// Product Pricing Data
// Prices are in PKR (Pakistani Rupees)
// Based on ORION PAINTS Price List (w.e.f. 1st December 2025)

const productPricing = {
    // Emulsion Products
    'emulsion': {
        'drum': 2800,
        'gallon': 775,
        'quarter': 325
    },
    'special-shade': {
        'gallon': 1350,
        'quarter': 400,
        'note': 'Shade #.9009 to 9011 Gallons will be Special Shade'
    },
    'waterbase-primer': {
        'drum': 3700,
        'gallon': 950
    },
    'acrylic-putty': {
        'drum': 2500,
        'gallon': 700,
        'quarter': 300
    },
    'oil-primer': {
        'drum': 7500,
        'gallon': 1900
    },
    'red-oxide-primer': {
        'drum': 6000,
        'gallon': 1563,
        'quarter': 413
    },
    'undercoat': {
        'gallon': 1563,
        'quarter': 413
    },
    'weather-shield': {
        'drum': 8500,
        'note': 'As per order required'
    },
    'water-based-matt-finish': {
        'drum': 8500,
        'note': 'As per order required'
    },
    
    // Product-specific pricing (by slug)
    '413-plastic-emulsion': {
        'drum': 2800,
        'gallon': 775,
        'quarter': 325,
        'basePrice': 775
    },
    'aqueous-matt-finish': {
        'drum': 8500,
        'gallon': 2200,
        'basePrice': 2200
    },
    'all-rounder-matt-enamel': {
        'drum': 3200,
        'gallon': 850,
        'basePrice': 850
    },
    'dulux-prime-on': {
        'drum': 3700,
        'gallon': 950,
        'basePrice': 950
    },
    'cold-galvanizing-paint-silver': {
        'drum': 7500,
        'gallon': 1900,
        'basePrice': 1900
    },
    'berger': {
        'drum': 2800,
        'gallon': 775,
        'basePrice': 775
    },
    'plastic-emulsion': {
        'drum': 2800,
        'gallon': 775,
        'quarter': 325,
        'basePrice': 775
    },
    'synthetic-enamel': {
        'drum': 3200,
        'gallon': 850,
        'basePrice': 850
    },
    'matt-enamel': {
        'drum': 3200,
        'gallon': 850,
        'basePrice': 850
    },
    'gloss-enamel': {
        'drum': 3500,
        'gallon': 950,
        'basePrice': 950
    },
    'silk-emulsion': {
        'drum': 3000,
        'gallon': 825,
        'basePrice': 825
    },
    'super-emulsion': {
        'drum': 2800,
        'gallon': 775,
        'basePrice': 775
    },
    'nu-emulsion': {
        'drum': 2800,
        'gallon': 775,
        'basePrice': 775
    },
    'perfect-emulsion': {
        'drum': 2800,
        'gallon': 775,
        'basePrice': 775
    },
    'semi-plastic-emulsion': {
        'drum': 2800,
        'gallon': 775,
        'basePrice': 775
    },
    'water-base-matt-finish': {
        'drum': 8500,
        'gallon': 2200,
        'basePrice': 2200
    },
    'hydrous-matt-finish': {
        'drum': 8500,
        'gallon': 2200,
        'basePrice': 2200
    },
    'premium-exterior-emulsion': {
        'drum': 3200,
        'gallon': 850,
        'basePrice': 850
    },
    'premium-matt-enamel': {
        'drum': 3200,
        'gallon': 850,
        'basePrice': 850
    },
    'premium-synthetic-enamel-plus': {
        'drum': 3500,
        'gallon': 950,
        'basePrice': 950
    },
    'royal-matt-emulsion': {
        'drum': 3000,
        'gallon': 825,
        'basePrice': 825
    },
    'silk-sheen-emulsion': {
        'drum': 3000,
        'gallon': 825,
        'basePrice': 825
    },
    'soft-sheen-emulsion': {
        'drum': 3000,
        'gallon': 825,
        'basePrice': 825
    },
    'spd-smooth-emulsion': {
        'drum': 2800,
        'gallon': 775,
        'basePrice': 775
    },
    'special-matt-enamel': {
        'drum': 3200,
        'gallon': 850,
        'basePrice': 850
    },
    'stain-guard-water-based-matt-emulsion': {
        'drum': 8500,
        'gallon': 2200,
        'basePrice': 2200
    },
    'stainless-water-based-matt': {
        'drum': 8500,
        'gallon': 2200,
        'basePrice': 2200
    },
    'subrang-aqueous-matt': {
        'drum': 8500,
        'gallon': 2200,
        'basePrice': 2200
    },
    'subrang-matt-enamel': {
        'drum': 3200,
        'gallon': 850,
        'basePrice': 850
    },
    'subrang-synthetic-enamel': {
        'drum': 3500,
        'gallon': 950,
        'basePrice': 950
    },
    'super-gloss-enamel': {
        'drum': 3500,
        'gallon': 950,
        'basePrice': 950
    },
    'nu-enamel': {
        'drum': 3200,
        'gallon': 850,
        'basePrice': 850
    },
    'q-lac-enamel': {
        'drum': 3200,
        'gallon': 850,
        'basePrice': 850
    },
    'satin-glo-matt-enamel': {
        'drum': 3200,
        'gallon': 850,
        'basePrice': 850
    },
    'brilliance-matt-enamel': {
        'drum': 3200,
        'gallon': 850,
        'basePrice': 850
    },
    'platone-high-gloss': {
        'drum': 3500,
        'gallon': 950,
        'basePrice': 950
    },
    'luxury-silk-sheen-emulsion': {
        'drum': 3000,
        'gallon': 825,
        'basePrice': 825
    },
    'overall-super-semi-plastic-emulsion': {
        'drum': 2800,
        'gallon': 775,
        'basePrice': 775
    },
    'plastic-bound-distemper': {
        'drum': 2500,
        'gallon': 700,
        'basePrice': 700
    },
    'dulux-aqua-primer': {
        'drum': 3700,
        'gallon': 950,
        'basePrice': 950
    },
    'dulux-wall-smoothening-putty-20-kg': {
        'drum': 2500,
        'gallon': 700,
        'basePrice': 700
    },
    'dulux-weathershield-wall-putty-20-kg': {
        'drum': 2500,
        'gallon': 700,
        'basePrice': 700
    },
    'paintex-putty': {
        'drum': 2500,
        'gallon': 700,
        'basePrice': 700
    },
    'industrial-synthetic-enamel': {
        'drum': 3500,
        'gallon': 950,
        'basePrice': 950
    },
    'master-thermoshield': {
        'drum': 8500,
        'gallon': 2200,
        'basePrice': 2200
    },
    'weather-defender': {
        'drum': 8500,
        'gallon': 2200,
        'basePrice': 2200
    },
    'weather-hardshield': {
        'drum': 8500,
        'gallon': 2200,
        'basePrice': 2200
    },
    'weather-proof': {
        'drum': 8500,
        'gallon': 2200,
        'basePrice': 2200
    },
    'weather-protector': {
        'drum': 8500,
        'gallon': 2200,
        'basePrice': 2200
    },
    'weather-resistant': {
        'drum': 8500,
        'gallon': 2200,
        'basePrice': 2200
    },
    'weather-sheath': {
        'drum': 8500,
        'gallon': 2200,
        'basePrice': 2200
    },
    'weather-shield': {
        'drum': 8500,
        'gallon': 2200,
        'basePrice': 2200
    },
    'weather-shield-powerflex': {
        'drum': 8500,
        'gallon': 2200,
        'basePrice': 2200
    },
    'weatherbond': {
        'drum': 8500,
        'gallon': 2200,
        'basePrice': 2200
    },
    'wheather-safe': {
        'drum': 8500,
        'gallon': 2200,
        'basePrice': 2200
    },
    'crystal-weather-sheat': {
        'drum': 8500,
        'gallon': 2200,
        'basePrice': 2200
    },
    'buxly-weather-fighter': {
        'drum': 8500,
        'gallon': 2200,
        'basePrice': 2200
    },
    'all-weather-shelter': {
        'drum': 8500,
        'gallon': 2200,
        'basePrice': 2200
    }
};

// Function to get product price
function getProductPrice(productSlug, unit = 'gallon') {
    const product = productPricing[productSlug];
    if (!product) {
        // Try to find by partial match
        for (const key in productPricing) {
            if (productSlug.includes(key) || key.includes(productSlug)) {
                const matched = productPricing[key];
                return matched[unit] || matched.basePrice || matched.gallon || 0;
            }
        }
        return 0; // Return 0 if not found (Contact for Price)
    }
    return product[unit] || product.basePrice || product.gallon || 0;
}

// Function to format price
function formatPrice(price) {
    if (!price || price === 0) {
        return '<span class="text-primary fw-bold">Contact for Price</span>';
    }
    return `<span class="text-primary fw-bold">PKR ${price.toLocaleString()}</span>`;
}

// Function to get price display with unit
function getPriceDisplay(productSlug, unit = 'gallon') {
    const price = getProductPrice(productSlug, unit);
    if (price === 0) {
        return formatPrice(0);
    }
    const unitLabel = unit === 'drum' ? 'Drum' : unit === 'gallon' ? 'Gallon' : unit === 'quarter' ? 'Quarter' : '';
    return `<div class="price-with-unit">
        <span class="text-primary fw-bold fs-4">PKR ${price.toLocaleString()}</span>
        <small class="text-muted d-block">per ${unitLabel}</small>
    </div>`;
}

// Export for use in other scripts
if (typeof window !== 'undefined') {
    window.ProductPricing = {
        getProductPrice: getProductPrice,
        formatPrice: formatPrice,
        getPriceDisplay: getPriceDisplay,
        pricing: productPricing
    };
}

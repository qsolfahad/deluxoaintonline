// ============================================
// Delux Paint Online — Centralized Product Catalog
// All products in one data store
// ============================================

(function () {
    'use strict';

    const products = [
        // ===== FINAL TOUCH =====
        {
            slug: '413-plastic-emulsion',
            name: '413 Plastic Emulsion',
            brand: 'Final Touch',
            category: 'Decorative Paints',
            image: 'https://i0.wp.com/karachipaints.pk/wp-content/uploads/2022/03/18095743_119013915324223_1461485780651212800_n.jpg?fit=480%2C480&ssl=1',
            description: 'Premium quality 413 Plastic Emulsion paint for interior walls. Provides smooth, washable finish with excellent coverage.',
            features: ['Smooth matte finish', 'Washable', 'Low VOC', 'Interior use'],
            specs: { coverage: '120 sq ft/liter', finish: 'Matte', base: 'Water-based' }
        },
        {
            slug: 'aqueous-matt-finish',
            name: 'Aqueous Matt Finish',
            brand: 'Final Touch',
            category: 'Decorative Paints',
            image: 'https://i0.wp.com/karachipaints.pk/wp-content/uploads/2022/03/Aq-matt.png?fit=612%2C705&ssl=1',
            description: 'High-quality water-based matt finish paint. Ideal for interior walls and ceilings with excellent hiding power.',
            features: ['Premium matt finish', 'High coverage', 'Anti-fungal', 'Eco-friendly'],
            specs: { coverage: '130 sq ft/liter', finish: 'Matt', base: 'Water-based' }
        },
        {
            slug: 'all-rounder-matt-enamel',
            name: 'All Rounder Matt Enamel',
            brand: 'Final Touch',
            category: 'Decorative Paints',
            image: 'https://i0.wp.com/karachipaints.pk/wp-content/uploads/2022/03/allrounder-matt.jpg?fit=300%2C321&ssl=1',
            description: 'Versatile matt enamel suitable for both interior and exterior surfaces. Excellent adhesion and durability.',
            features: ['Interior & exterior', 'Matt finish', 'Durable', 'Multi-surface'],
            specs: { coverage: '100 sq ft/liter', finish: 'Matt', base: 'Oil-based' }
        },
        {
            slug: 'gloss-enamel',
            name: 'Gloss Enamel',
            brand: 'Final Touch',
            category: 'Decorative Paints',
            image: 'https://via.placeholder.com/480x480/1e293b/6366f1?text=Gloss+Enamel',
            description: 'Premium high-gloss enamel for wood and metal surfaces. Provides a mirror-like finish.',
            features: ['High gloss', 'Weather resistant', 'Wood & metal', 'Long-lasting shine'],
            specs: { coverage: '100 sq ft/liter', finish: 'High Gloss', base: 'Oil-based' }
        },
        {
            slug: 'gloss-finish',
            name: 'Gloss Finish',
            brand: 'Final Touch',
            category: 'Decorative Paints',
            image: 'https://via.placeholder.com/480x480/1e293b/6366f1?text=Gloss+Finish',
            description: 'Superior gloss finish enamel paint for interior and exterior applications.',
            features: ['Glossy finish', 'Interior & exterior', 'Durable', 'Easy to clean'],
            specs: { coverage: '110 sq ft/liter', finish: 'Gloss', base: 'Oil-based' }
        },
        {
            slug: 'gloss-finish-enamel',
            name: 'Gloss Finish Enamel',
            brand: 'Final Touch',
            category: 'Decorative Paints',
            image: 'https://via.placeholder.com/480x480/1e293b/6366f1?text=Gloss+Finish+Enamel',
            description: 'Professional grade gloss finish enamel with excellent flow and leveling properties.',
            features: ['Professional grade', 'Smooth application', 'Excellent flow', 'Anti-rust'],
            specs: { coverage: '100 sq ft/liter', finish: 'Gloss', base: 'Alkyd' }
        },
        {
            slug: 'matt-enamel',
            name: 'Matt Enamel',
            brand: 'Final Touch',
            category: 'Decorative Paints',
            image: 'https://via.placeholder.com/480x480/1e293b/6366f1?text=Matt+Enamel',
            description: 'Premium matt enamel for interior surfaces providing an elegant smooth finish.',
            features: ['Elegant matt finish', 'Smooth texture', 'Stain resistant', 'Interior use'],
            specs: { coverage: '100 sq ft/liter', finish: 'Matt', base: 'Oil-based' }
        },
        {
            slug: 'matt-finish-enamel',
            name: 'Matt Finish Enamel',
            brand: 'Final Touch',
            category: 'Decorative Paints',
            image: 'https://via.placeholder.com/480x480/1e293b/6366f1?text=Matt+Finish+Enamel',
            description: 'High quality matt finish enamel with superior coverage and elegant appearance.',
            features: ['Superior coverage', 'Elegant appearance', 'Smooth application', 'Durable'],
            specs: { coverage: '100 sq ft/liter', finish: 'Matt', base: 'Oil-based' }
        },
        {
            slug: 'plastic-emulsion',
            name: 'Plastic Emulsion',
            brand: 'Final Touch',
            category: 'Decorative Paints',
            image: 'https://via.placeholder.com/480x480/1e293b/6366f1?text=Plastic+Emulsion',
            description: 'Economy grade plastic emulsion for interior walls. Smooth washable finish at affordable price.',
            features: ['Washable', 'Smooth finish', 'Economy grade', 'Interior walls'],
            specs: { coverage: '120 sq ft/liter', finish: 'Matte', base: 'Water-based' }
        },
        {
            slug: 'synthetic-enamel',
            name: 'Synthetic Enamel',
            brand: 'Final Touch',
            category: 'Decorative Paints',
            image: 'https://via.placeholder.com/480x480/1e293b/6366f1?text=Synthetic+Enamel',
            description: 'Quality synthetic enamel for metal and wood surfaces. Good adhesion and flow.',
            features: ['Good adhesion', 'Metal & wood', 'Weather resistant', 'Smooth flow'],
            specs: { coverage: '100 sq ft/liter', finish: 'Gloss', base: 'Alkyd' }
        },
        {
            slug: 'silk-emulsion',
            name: 'Silk Emulsion',
            brand: 'Final Touch',
            category: 'Decorative Paints',
            image: 'https://via.placeholder.com/480x480/1e293b/6366f1?text=Silk+Emulsion',
            description: 'Premium silk sheen emulsion for luxurious interior finishes. Provides a subtle satin glow.',
            features: ['Silk sheen', 'Luxurious finish', 'Washable', 'Anti-fungal'],
            specs: { coverage: '120 sq ft/liter', finish: 'Silk Sheen', base: 'Water-based' }
        },
        {
            slug: 'super-emulsion',
            name: 'Super Emulsion',
            brand: 'Final Touch',
            category: 'Decorative Paints',
            image: 'https://via.placeholder.com/480x480/1e293b/6366f1?text=Super+Emulsion',
            description: 'Superior quality emulsion paint with excellent hiding power and washability.',
            features: ['Superior quality', 'Excellent hiding', 'Washable', 'Low odor'],
            specs: { coverage: '120 sq ft/liter', finish: 'Matte', base: 'Water-based' }
        },
        {
            slug: 'nu-emulsion',
            name: 'Nu Emulsion',
            brand: 'Final Touch',
            category: 'Decorative Paints',
            image: 'https://via.placeholder.com/480x480/1e293b/6366f1?text=Nu+Emulsion',
            description: 'Modern emulsion paint with advanced formula for smooth, durable interior walls.',
            features: ['Advanced formula', 'Smooth finish', 'Durable', 'Interior use'],
            specs: { coverage: '120 sq ft/liter', finish: 'Matte', base: 'Water-based' }
        },
        {
            slug: 'nu-enamel',
            name: 'Nu Enamel',
            brand: 'Final Touch',
            category: 'Decorative Paints',
            image: 'https://via.placeholder.com/480x480/1e293b/6366f1?text=Nu+Enamel',
            description: 'Modern enamel paint for wood and metal surfaces with excellent adhesion.',
            features: ['Modern formula', 'Excellent adhesion', 'Wood & metal', 'Durable'],
            specs: { coverage: '100 sq ft/liter', finish: 'Gloss', base: 'Oil-based' }
        },
        {
            slug: 'perfect-emulsion',
            name: 'Perfect Emulsion',
            brand: 'Final Touch',
            category: 'Decorative Paints',
            image: 'https://via.placeholder.com/480x480/1e293b/6366f1?text=Perfect+Emulsion',
            description: 'Perfect emulsion for flawless interior wall finish. Easy to apply with great coverage.',
            features: ['Flawless finish', 'Easy application', 'Great coverage', 'Washable'],
            specs: { coverage: '120 sq ft/liter', finish: 'Matte', base: 'Water-based' }
        },
        {
            slug: 'semi-plastic-emulsion',
            name: 'Semi Plastic Emulsion',
            brand: 'Final Touch',
            category: 'Decorative Paints',
            image: 'https://via.placeholder.com/480x480/1e293b/6366f1?text=Semi+Plastic',
            description: 'Semi plastic emulsion for budget-friendly interior wall painting with decent coverage.',
            features: ['Budget-friendly', 'Decent coverage', 'Interior walls', 'Easy to apply'],
            specs: { coverage: '120 sq ft/liter', finish: 'Matte', base: 'Water-based' }
        },
        {
            slug: 'premium-exterior-emulsion',
            name: 'Premium Exterior Emulsion',
            brand: 'Final Touch',
            category: 'Exterior Paints',
            image: 'https://via.placeholder.com/480x480/1e293b/6366f1?text=Exterior+Emulsion',
            description: 'Premium weather-resistant emulsion for exterior walls. UV protected and long-lasting.',
            features: ['Weather resistant', 'UV protection', 'Long-lasting', 'Anti-algae'],
            specs: { coverage: '110 sq ft/liter', finish: 'Matt', base: 'Acrylic' }
        },
        {
            slug: 'premium-matt-enamel',
            name: 'Premium Matt Enamel',
            brand: 'Final Touch',
            category: 'Decorative Paints',
            image: 'https://via.placeholder.com/480x480/1e293b/6366f1?text=Premium+Matt',
            description: 'Top-tier matt enamel with premium formulation for superior coverage and finish.',
            features: ['Premium quality', 'Superior coverage', 'Elegant matt', 'Durable'],
            specs: { coverage: '100 sq ft/liter', finish: 'Matt', base: 'Oil-based' }
        },
        {
            slug: 'premium-synthetic-enamel-plus',
            name: 'Premium Synthetic Enamel Plus',
            brand: 'Final Touch',
            category: 'Decorative Paints',
            image: 'https://via.placeholder.com/480x480/1e293b/6366f1?text=Synthetic+Enamel+Plus',
            description: 'Enhanced synthetic enamel with plus formulation for extra durability and shine.',
            features: ['Enhanced formula', 'Extra durable', 'High shine', 'Professional grade'],
            specs: { coverage: '100 sq ft/liter', finish: 'High Gloss', base: 'Alkyd' }
        },
        {
            slug: 'royal-matt-emulsion',
            name: 'Royal Matt Emulsion',
            brand: 'Final Touch',
            category: 'Decorative Paints',
            image: 'https://via.placeholder.com/480x480/1e293b/6366f1?text=Royal+Matt',
            description: 'Royal quality matt emulsion for luxurious interior wall finishes.',
            features: ['Luxurious finish', 'Royal quality', 'Low odor', 'Washable'],
            specs: { coverage: '120 sq ft/liter', finish: 'Matt', base: 'Water-based' }
        },
        {
            slug: 'silk-sheen-emulsion',
            name: 'Silk Sheen Emulsion',
            brand: 'Final Touch',
            category: 'Decorative Paints',
            image: 'https://via.placeholder.com/480x480/1e293b/6366f1?text=Silk+Sheen',
            description: 'Silk sheen emulsion for elegant interior spaces. Subtle sheen with excellent washability.',
            features: ['Silk sheen', 'Elegant', 'Highly washable', 'Stain resistant'],
            specs: { coverage: '120 sq ft/liter', finish: 'Silk Sheen', base: 'Water-based' }
        },
        {
            slug: 'soft-sheen-emulsion',
            name: 'Soft Sheen Emulsion',
            brand: 'Final Touch',
            category: 'Decorative Paints',
            image: 'https://via.placeholder.com/480x480/1e293b/6366f1?text=Soft+Sheen',
            description: 'Soft sheen emulsion providing a gentle luster for sophisticated interiors.',
            features: ['Soft sheen', 'Sophisticated look', 'Washable', 'Low VOC'],
            specs: { coverage: '120 sq ft/liter', finish: 'Soft Sheen', base: 'Water-based' }
        },
        {
            slug: 'luxury-silk-sheen-emulsion',
            name: 'Luxury Silk Sheen Emulsion',
            brand: 'Final Touch',
            category: 'Decorative Paints',
            image: 'https://via.placeholder.com/480x480/1e293b/6366f1?text=Luxury+Silk',
            description: 'Ultra-premium silk sheen emulsion for the most luxurious interior finishes.',
            features: ['Ultra-premium', 'Luxurious sheen', 'Designer finish', 'Anti-fungal'],
            specs: { coverage: '120 sq ft/liter', finish: 'Luxury Silk Sheen', base: 'Water-based' }
        },
        {
            slug: 'overall-super-semi-plastic-emulsion',
            name: 'Overall Super Semi Plastic Emulsion',
            brand: 'Final Touch',
            category: 'Decorative Paints',
            image: 'https://via.placeholder.com/480x480/1e293b/6366f1?text=Super+Semi+Plastic',
            description: 'Super semi-plastic emulsion for affordable interior wall painting.',
            features: ['Affordable', 'Good coverage', 'Interior walls', 'Easy application'],
            specs: { coverage: '120 sq ft/liter', finish: 'Matte', base: 'Water-based' }
        },

        // ===== DULUX =====
        {
            slug: 'dulux-prime-on',
            name: 'Dulux Prime-On',
            brand: 'Dulux',
            category: 'Primers',
            image: 'https://i0.wp.com/karachipaints.pk/wp-content/uploads/2022/03/Untitled-4-1.jpg?fit=500%2C500&ssl=1',
            description: 'Dulux Prime-On water-based primer. Excellent adhesion and sealing for interior walls.',
            features: ['Water-based', 'Excellent adhesion', 'Sealing primer', 'Low odor'],
            specs: { coverage: '110 sq ft/liter', finish: 'Flat', base: 'Water-based' }
        },
        {
            slug: 'dulux-aqua-primer',
            name: 'Dulux Aqua Primer',
            brand: 'Dulux',
            category: 'Primers',
            image: 'https://via.placeholder.com/480x480/1e293b/6366f1?text=Dulux+Aqua+Primer',
            description: 'Premium Dulux water-based primer for superior surface preparation.',
            features: ['Water-based', 'Superior adhesion', 'Quick drying', 'Low VOC'],
            specs: { coverage: '110 sq ft/liter', finish: 'Flat', base: 'Water-based' }
        },
        {
            slug: 'dulux-wall-smoothening-putty-20-kg',
            name: 'Dulux Wall Smoothening Putty 20 KG',
            brand: 'Dulux',
            category: 'Putty & Fillers',
            image: 'https://via.placeholder.com/480x480/1e293b/6366f1?text=Dulux+Putty',
            description: 'Dulux wall smoothening putty for leveling and preparing wall surfaces before painting.',
            features: ['20 KG pack', 'Smooth finish', 'Strong adhesion', 'Water resistant'],
            specs: { coverage: '30-35 sq ft/kg', finish: 'Smooth', base: 'Cement-based' }
        },
        {
            slug: 'dulux-weathershield-wall-putty-20-kg',
            name: 'Dulux Weathershield Wall Putty 20 KG',
            brand: 'Dulux',
            category: 'Putty & Fillers',
            image: 'https://via.placeholder.com/480x480/1e293b/6366f1?text=Dulux+Weathershield+Putty',
            description: 'Dulux Weathershield wall putty for exterior surface preparation with weather resistance.',
            features: ['Weather resistant', 'Exterior use', '20 KG pack', 'Crack bridging'],
            specs: { coverage: '30-35 sq ft/kg', finish: 'Smooth', base: 'Cement-based' }
        },

        // ===== INDUSTRIAL =====
        {
            slug: 'cold-galvanizing-paint-silver',
            name: 'Cold Galvanizing Paint Silver',
            brand: 'Industrial',
            category: 'Industrial Paints',
            image: 'https://i0.wp.com/karachipaints.pk/wp-content/uploads/2022/03/Cold-Galvanizing-Paint-Silver-1.jpg?fit=1000%2C1000&ssl=1',
            description: 'Silver cold galvanizing paint for metal protection. Provides zinc-rich coating for corrosion resistance.',
            features: ['Zinc-rich coating', 'Corrosion resistance', 'Silver finish', 'Industrial grade'],
            specs: { coverage: '80 sq ft/liter', finish: 'Metallic Silver', base: 'Zinc-rich' }
        },
        {
            slug: 'industrial-synthetic-enamel',
            name: 'Industrial Synthetic Enamel',
            brand: 'Industrial',
            category: 'Industrial Paints',
            image: 'https://via.placeholder.com/480x480/1e293b/6366f1?text=Industrial+Enamel',
            description: 'Heavy-duty industrial synthetic enamel for machinery and structural steel.',
            features: ['Heavy-duty', 'Chemical resistant', 'High durability', 'Industrial use'],
            specs: { coverage: '90 sq ft/liter', finish: 'Gloss', base: 'Alkyd' }
        },

        // ===== BERGER =====
        {
            slug: 'berger',
            name: 'Berger Paints',
            brand: 'Berger',
            category: 'Decorative Paints',
            image: 'https://via.placeholder.com/480x480/1e293b/6366f1?text=Berger+Paints',
            description: 'Berger premium quality decorative paints for interior and exterior use.',
            features: ['Premium quality', 'Wide color range', 'Durable', 'Trusted brand'],
            specs: { coverage: '120 sq ft/liter', finish: 'Varies', base: 'Varies' }
        },

        // ===== WEATHER PAINTS =====
        {
            slug: 'weather-defender',
            name: 'Weather Defender',
            brand: 'Exterior',
            category: 'Exterior Paints',
            image: 'https://via.placeholder.com/480x480/1e293b/6366f1?text=Weather+Defender',
            description: 'Ultimate weather protection exterior paint with advanced UV and rain shield technology.',
            features: ['UV protection', 'Rain shield', 'Anti-algae', 'Long lasting'],
            specs: { coverage: '100 sq ft/liter', finish: 'Matt', base: 'Acrylic' }
        },
        {
            slug: 'weather-hardshield',
            name: 'Weather Hardshield',
            brand: 'Exterior',
            category: 'Exterior Paints',
            image: 'https://via.placeholder.com/480x480/1e293b/6366f1?text=Weather+Hardshield',
            description: 'Tough exterior paint with hardshield technology for extreme weather conditions.',
            features: ['Hardshield tech', 'Extreme weather', 'Crack resistant', 'Dust proof'],
            specs: { coverage: '100 sq ft/liter', finish: 'Matt', base: 'Acrylic' }
        },
        {
            slug: 'weather-proof',
            name: 'Weather Proof',
            brand: 'Exterior',
            category: 'Exterior Paints',
            image: 'https://via.placeholder.com/480x480/1e293b/6366f1?text=Weather+Proof',
            description: 'Weather proof exterior paint providing reliable protection against elements.',
            features: ['Weather proof', 'Anti-peel', 'Color retention', 'Mildew resistant'],
            specs: { coverage: '100 sq ft/liter', finish: 'Matt', base: 'Acrylic' }
        },
        {
            slug: 'weather-protector',
            name: 'Weather Protector',
            brand: 'Exterior',
            category: 'Exterior Paints',
            image: 'https://via.placeholder.com/480x480/1e293b/6366f1?text=Weather+Protector',
            description: 'Advanced weather protector paint for exterior walls with silicon-enhanced formula.',
            features: ['Silicon enhanced', 'Self-cleaning', 'UV stable', 'Water repellent'],
            specs: { coverage: '100 sq ft/liter', finish: 'Matt', base: 'Silicone Acrylic' }
        },
        {
            slug: 'weather-resistant',
            name: 'Weather Resistant',
            brand: 'Exterior',
            category: 'Exterior Paints',
            image: 'https://via.placeholder.com/480x480/1e293b/6366f1?text=Weather+Resistant',
            description: 'Weather resistant exterior paint for lasting protection of your building.',
            features: ['Weather resistant', 'Fade proof', 'Breathable', 'Eco-friendly'],
            specs: { coverage: '100 sq ft/liter', finish: 'Matt', base: 'Acrylic' }
        },
        {
            slug: 'weather-sheath',
            name: 'Weather Sheath',
            brand: 'Exterior',
            category: 'Exterior Paints',
            image: 'https://via.placeholder.com/480x480/1e293b/6366f1?text=Weather+Sheath',
            description: 'Weather sheath exterior paint creating a protective envelope around your walls.',
            features: ['Protective sheath', 'Anti-crack', 'Long lasting', 'Easy application'],
            specs: { coverage: '100 sq ft/liter', finish: 'Matt', base: 'Acrylic' }
        },
        {
            slug: 'weather-shield',
            name: 'Weather Shield',
            brand: 'Exterior',
            category: 'Exterior Paints',
            image: 'https://via.placeholder.com/480x480/1e293b/6366f1?text=Weather+Shield',
            description: 'Premium weather shield paint providing ultimate exterior wall protection.',
            features: ['Premium grade', 'Ultimate protection', 'Anti-bacterial', 'Color lock'],
            specs: { coverage: '100 sq ft/liter', finish: 'Matt', base: 'Acrylic' }
        },
        {
            slug: 'weather-shield-powerflex',
            name: 'Weather Shield Powerflex',
            brand: 'Exterior',
            category: 'Exterior Paints',
            image: 'https://via.placeholder.com/480x480/1e293b/6366f1?text=Powerflex',
            description: 'Weather Shield Powerflex with flexible film technology for crack-free exteriors.',
            features: ['Powerflex tech', 'Crack bridging', 'Super durable', 'Rain resistant'],
            specs: { coverage: '100 sq ft/liter', finish: 'Matt', base: 'Elastomeric' }
        },
        {
            slug: 'weatherbond',
            name: 'Weatherbond',
            brand: 'Exterior',
            category: 'Exterior Paints',
            image: 'https://via.placeholder.com/480x480/1e293b/6366f1?text=Weatherbond',
            description: 'Weatherbond exterior paint with strong bonding formula for lasting adhesion.',
            features: ['Strong bonding', 'Weather resistant', 'Anti-peel', 'Durable'],
            specs: { coverage: '100 sq ft/liter', finish: 'Matt', base: 'Acrylic' }
        },
        {
            slug: 'crystal-weather-sheat',
            name: 'Crystal Weather Sheat',
            brand: 'Exterior',
            category: 'Exterior Paints',
            image: 'https://via.placeholder.com/480x480/1e293b/6366f1?text=Crystal+Weather',
            description: 'Crystal weather protection paint with advanced nano-technology for exterior walls.',
            features: ['Nano technology', 'Crystal clear protection', 'UV shield', 'Self-cleaning'],
            specs: { coverage: '100 sq ft/liter', finish: 'Matt', base: 'Nano Acrylic' }
        },
        {
            slug: 'buxly-weather-fighter',
            name: 'Buxly Weather Fighter',
            brand: 'Buxly',
            category: 'Exterior Paints',
            image: 'https://via.placeholder.com/480x480/1e293b/6366f1?text=Buxly+Weather+Fighter',
            description: 'Buxly Weather Fighter exterior paint for tough weather conditions.',
            features: ['Tough formula', 'Weather fighting', 'Anti-algae', 'Long lasting'],
            specs: { coverage: '100 sq ft/liter', finish: 'Matt', base: 'Acrylic' }
        },
        {
            slug: 'all-weather-shelter',
            name: 'All Weather Shelter',
            brand: 'Exterior',
            category: 'Exterior Paints',
            image: 'https://via.placeholder.com/480x480/1e293b/6366f1?text=All+Weather+Shelter',
            description: 'All-season exterior paint providing comprehensive weather protection.',
            features: ['All-season', 'Comprehensive protection', 'Anti-crack', 'UV stable'],
            specs: { coverage: '100 sq ft/liter', finish: 'Matt', base: 'Acrylic' }
        },
        {
            slug: 'master-thermoshield',
            name: 'Master Thermoshield',
            brand: 'Master',
            category: 'Exterior Paints',
            image: 'https://via.placeholder.com/480x480/1e293b/6366f1?text=Master+Thermoshield',
            description: 'Master Thermoshield with heat-reflective technology for cooler interiors.',
            features: ['Heat reflective', 'Energy saving', 'UV protection', 'Premium quality'],
            specs: { coverage: '100 sq ft/liter', finish: 'Matt', base: 'Acrylic' }
        },

        // ===== SPECIALTY =====
        {
            slug: 'water-base-matt-finish',
            name: 'Water Base Matt Finish',
            brand: 'Specialty',
            category: 'Decorative Paints',
            image: 'https://via.placeholder.com/480x480/1e293b/6366f1?text=Water+Base+Matt',
            description: 'Premium water-based matt finish for interior walls with superior coverage.',
            features: ['Water-based', 'Matt finish', 'Superior coverage', 'Low VOC'],
            specs: { coverage: '130 sq ft/liter', finish: 'Matt', base: 'Water-based' }
        },
        {
            slug: 'hydrous-matt-finish',
            name: 'Hydrous Matt Finish',
            brand: 'Specialty',
            category: 'Decorative Paints',
            image: 'https://via.placeholder.com/480x480/1e293b/6366f1?text=Hydrous+Matt',
            description: 'Advanced hydrous matt finish with moisture-resistant formulation.',
            features: ['Moisture resistant', 'Matt finish', 'Anti-fungal', 'Durable'],
            specs: { coverage: '130 sq ft/liter', finish: 'Matt', base: 'Water-based' }
        },
        {
            slug: 'spd-smooth-emulsion',
            name: 'SPD Smooth Emulsion',
            brand: 'SPD',
            category: 'Decorative Paints',
            image: 'https://via.placeholder.com/480x480/1e293b/6366f1?text=SPD+Smooth',
            description: 'SPD smooth emulsion for budget-friendly quality wall painting.',
            features: ['Budget-friendly', 'Smooth finish', 'Good coverage', 'Interior use'],
            specs: { coverage: '120 sq ft/liter', finish: 'Matte', base: 'Water-based' }
        },
        {
            slug: 'special-matt-enamel',
            name: 'Special Matt Enamel',
            brand: 'Final Touch',
            category: 'Decorative Paints',
            image: 'https://via.placeholder.com/480x480/1e293b/6366f1?text=Special+Matt',
            description: 'Special formulation matt enamel for distinctive interior finishes.',
            features: ['Special formula', 'Distinctive finish', 'Smooth application', 'Durable'],
            specs: { coverage: '100 sq ft/liter', finish: 'Matt', base: 'Oil-based' }
        },
        {
            slug: 'stain-guard-water-based-matt-emulsion',
            name: 'Stain Guard Water Based Matt Emulsion',
            brand: 'Specialty',
            category: 'Decorative Paints',
            image: 'https://via.placeholder.com/480x480/1e293b/6366f1?text=Stain+Guard',
            description: 'Stain guard emulsion with advanced stain-resistant technology for high-traffic areas.',
            features: ['Stain resistant', 'High-traffic areas', 'Easy to clean', 'Anti-bacterial'],
            specs: { coverage: '130 sq ft/liter', finish: 'Matt', base: 'Water-based' }
        },
        {
            slug: 'stainless-water-based-matt',
            name: 'Stainless Water Based Matt',
            brand: 'Specialty',
            category: 'Decorative Paints',
            image: 'https://via.placeholder.com/480x480/1e293b/6366f1?text=Stainless+Matt',
            description: 'Stainless water-based matt paint with superior stain-repelling properties.',
            features: ['Stain repelling', 'Water-based', 'Matt finish', 'Washable'],
            specs: { coverage: '130 sq ft/liter', finish: 'Matt', base: 'Water-based' }
        },
        {
            slug: 'subrang-aqueous-matt',
            name: 'Subrang Aqueous Matt',
            brand: 'Subrang',
            category: 'Decorative Paints',
            image: 'https://via.placeholder.com/480x480/1e293b/6366f1?text=Subrang+Aqueous',
            description: 'Subrang aqueous matt paint in a wide range of vibrant colors.',
            features: ['Vibrant colors', 'Aqueous base', 'Matt finish', 'Good coverage'],
            specs: { coverage: '130 sq ft/liter', finish: 'Matt', base: 'Water-based' }
        },
        {
            slug: 'subrang-matt-enamel',
            name: 'Subrang Matt Enamel',
            brand: 'Subrang',
            category: 'Decorative Paints',
            image: 'https://via.placeholder.com/480x480/1e293b/6366f1?text=Subrang+Matt+Enamel',
            description: 'Subrang matt enamel for stylish interior finishes with rich color depth.',
            features: ['Rich colors', 'Stylish finish', 'Good adhesion', 'Durable'],
            specs: { coverage: '100 sq ft/liter', finish: 'Matt', base: 'Oil-based' }
        },
        {
            slug: 'subrang-synthetic-enamel',
            name: 'Subrang Synthetic Enamel',
            brand: 'Subrang',
            category: 'Decorative Paints',
            image: 'https://via.placeholder.com/480x480/1e293b/6366f1?text=Subrang+Synthetic',
            description: 'Subrang synthetic enamel for wood and metal with superior gloss.',
            features: ['Superior gloss', 'Wood & metal', 'Weather resistant', 'Smooth finish'],
            specs: { coverage: '100 sq ft/liter', finish: 'Gloss', base: 'Alkyd' }
        },
        {
            slug: 'super-gloss-enamel',
            name: 'Super Gloss Enamel',
            brand: 'Final Touch',
            category: 'Decorative Paints',
            image: 'https://via.placeholder.com/480x480/1e293b/6366f1?text=Super+Gloss',
            description: 'Super high-gloss enamel for maximum shine and durability on surfaces.',
            features: ['Super high gloss', 'Maximum shine', 'Durable', 'Anti-rust'],
            specs: { coverage: '100 sq ft/liter', finish: 'Super Gloss', base: 'Alkyd' }
        },
        {
            slug: 'q-lac-enamel',
            name: 'Q-Lac Enamel',
            brand: 'Final Touch',
            category: 'Decorative Paints',
            image: 'https://via.placeholder.com/480x480/1e293b/6366f1?text=Q-Lac+Enamel',
            description: 'Q-Lac enamel with quick-lacquer technology for fast-drying glossy surfaces.',
            features: ['Quick drying', 'Glossy finish', 'Smooth flow', 'Multi-surface'],
            specs: { coverage: '100 sq ft/liter', finish: 'Gloss', base: 'Oil-based' }
        },
        {
            slug: 'satin-glo-matt-enamel',
            name: 'Satin Glo Matt Enamel',
            brand: 'Final Touch',
            category: 'Decorative Paints',
            image: 'https://via.placeholder.com/480x480/1e293b/6366f1?text=Satin+Glo',
            description: 'Satin Glo matt enamel combining a subtle satin sheen with matt elegance.',
            features: ['Satin sheen', 'Elegant', 'Durable', 'Easy to clean'],
            specs: { coverage: '100 sq ft/liter', finish: 'Satin Matt', base: 'Oil-based' }
        },
        {
            slug: 'brilliance-matt-enamel',
            name: 'Brilliance Matt Enamel',
            brand: 'Final Touch',
            category: 'Decorative Paints',
            image: 'https://via.placeholder.com/480x480/1e293b/6366f1?text=Brilliance+Matt',
            description: 'Brilliance matt enamel for a brilliant, sophisticated matt finish.',
            features: ['Brilliant finish', 'Sophisticated', 'Smooth texture', 'Stain resistant'],
            specs: { coverage: '100 sq ft/liter', finish: 'Matt', base: 'Oil-based' }
        },
        {
            slug: 'platone-high-gloss',
            name: 'Platone High Gloss',
            brand: 'Final Touch',
            category: 'Decorative Paints',
            image: 'https://via.placeholder.com/480x480/1e293b/6366f1?text=Platone+High+Gloss',
            description: 'Platone high-gloss enamel for mirror-like finishes on wood and metal.',
            features: ['Mirror-like finish', 'Premium quality', 'Anti-yellow', 'Long lasting'],
            specs: { coverage: '100 sq ft/liter', finish: 'High Gloss', base: 'Alkyd' }
        },
        {
            slug: 'plastic-bound-distemper',
            name: 'Plastic Bound Distemper',
            brand: 'Final Touch',
            category: 'Economy Paints',
            image: 'https://via.placeholder.com/480x480/1e293b/6366f1?text=Plastic+Distemper',
            description: 'Economy plastic bound distemper for budget interior wall painting.',
            features: ['Economy grade', 'Budget-friendly', 'Interior walls', 'Easy application'],
            specs: { coverage: '100 sq ft/kg', finish: 'Flat', base: 'Water-based' }
        },
        {
            slug: 'paintex-putty',
            name: 'Paintex Putty',
            brand: 'Paintex',
            category: 'Putty & Fillers',
            image: 'https://via.placeholder.com/480x480/1e293b/6366f1?text=Paintex+Putty',
            description: 'Paintex wall putty for smooth surface preparation before painting.',
            features: ['Smooth finish', 'Strong adhesion', 'Water resistant', 'Easy sanding'],
            specs: { coverage: '30-35 sq ft/kg', finish: 'Smooth', base: 'Cement-based' }
        },
        {
            slug: 'undercoat-white',
            name: 'Undercoat White',
            brand: 'General',
            category: 'Primers',
            image: 'https://via.placeholder.com/480x480/1e293b/6366f1?text=Undercoat+White',
            description: 'White undercoat primer for wood and metal surfaces before top coat application.',
            features: ['White primer', 'Wood & metal', 'Good adhesion', 'Smooth base'],
            specs: { coverage: '110 sq ft/liter', finish: 'Matt', base: 'Oil-based' }
        },
        {
            slug: 'wood-care',
            name: 'Wood Care',
            brand: 'Specialty',
            category: 'Wood Finishes',
            image: 'https://via.placeholder.com/480x480/1e293b/6366f1?text=Wood+Care',
            description: 'Premium wood care product for protection and enhancement of wooden surfaces.',
            features: ['Wood protection', 'UV resistant', 'Water repellent', 'Natural finish'],
            specs: { coverage: '80 sq ft/liter', finish: 'Natural', base: 'Alkyd' }
        },

        // ===== SPRAY PAINTS =====
        {
            slug: 'dolphin-spray-paint',
            name: 'Dolphin Spray Paint',
            brand: 'Dolphin',
            category: 'Spray Paints',
            image: 'https://via.placeholder.com/480x480/1e293b/6366f1?text=Dolphin+Spray',
            description: 'Dolphin spray paint for quick touch-ups and decorative applications.',
            features: ['Quick drying', 'Wide color range', 'Multi-surface', 'Easy application'],
            specs: { coverage: '15-20 sq ft/can', finish: 'Gloss', base: 'Aerosol' }
        },
        {
            slug: 'tiger-spray-paint-400-ml',
            name: 'Tiger Spray Paint 400 ML',
            brand: 'Tiger',
            category: 'Spray Paints',
            image: 'https://via.placeholder.com/480x480/1e293b/6366f1?text=Tiger+Spray+400ml',
            description: 'Tiger brand spray paint 400ml for professional and DIY applications.',
            features: ['400ml can', 'Professional grade', 'Fast drying', 'Smooth spray'],
            specs: { coverage: '15-20 sq ft/can', finish: 'Gloss', base: 'Aerosol' }
        },

        // ===== ROLLERS & TOOLS =====
        {
            slug: 'a-99-roller-9',
            name: 'A-99 Roller 9"',
            brand: 'Tools',
            category: 'Paint Rollers',
            image: 'https://i0.wp.com/karachipaints.pk/wp-content/uploads/2022/03/A-99-Roller-9-1.jpg?fit=1000%2C1000&ssl=1',
            description: 'A-99 professional 9-inch paint roller for smooth and even paint application.',
            features: ['9-inch size', 'Professional grade', 'Even application', 'Durable'],
            specs: { size: '9 inches', type: 'Roller', material: 'Synthetic' }
        },
        {
            slug: 'accon-textured-roller',
            name: 'Accon Textured Roller',
            brand: 'Accon',
            category: 'Paint Rollers',
            image: 'https://i0.wp.com/karachipaints.pk/wp-content/uploads/2022/03/Accon-Textured-Roller-1.jpg?fit=1000%2C1000&ssl=1',
            description: 'Accon textured roller for creating decorative textured wall finishes.',
            features: ['Textured finish', 'Decorative patterns', 'Professional', 'Reusable'],
            specs: { type: 'Textured Roller', material: 'Rubber', pattern: 'Decorative' }
        },
        {
            slug: 'acorn-roller-9',
            name: 'Acorn Roller 9"',
            brand: 'Acorn',
            category: 'Paint Rollers',
            image: 'https://via.placeholder.com/480x480/1e293b/6366f1?text=Acorn+Roller+9',
            description: 'Acorn brand 9-inch roller for professional painting applications.',
            features: ['9-inch', 'Professional', 'Smooth finish', 'Good paint pickup'],
            specs: { size: '9 inches', type: 'Roller', material: 'Synthetic' }
        },
        {
            slug: 'all-rounder-roller-9',
            name: 'All Rounder Roller 9"',
            brand: 'Tools',
            category: 'Paint Rollers',
            image: 'https://via.placeholder.com/480x480/1e293b/6366f1?text=All+Rounder+Roller',
            description: 'Versatile all-rounder 9-inch roller suitable for all paint types.',
            features: ['All paint types', '9-inch', 'Versatile', 'Good coverage'],
            specs: { size: '9 inches', type: 'Roller', material: 'Mixed fiber' }
        },
        {
            slug: 'nichiyo-roller-9',
            name: 'Nichiyo Roller 9"',
            brand: 'Nichiyo',
            category: 'Paint Rollers',
            image: 'https://via.placeholder.com/480x480/1e293b/6366f1?text=Nichiyo+Roller',
            description: 'Japanese quality Nichiyo 9-inch roller for premium paint application.',
            features: ['Japanese quality', 'Premium', 'Smooth application', 'Long lasting'],
            specs: { size: '9 inches', type: 'Roller', material: 'Premium fiber' }
        },
        {
            slug: 'tiger-roller-brush-9',
            name: 'Tiger Roller Brush 9"',
            brand: 'Tiger',
            category: 'Paint Rollers',
            image: 'https://via.placeholder.com/480x480/1e293b/6366f1?text=Tiger+Roller+9',
            description: 'Tiger brand 9-inch roller brush for efficient paint application.',
            features: ['Efficient', '9-inch', 'Good pickup', 'Durable'],
            specs: { size: '9 inches', type: 'Roller', material: 'Synthetic' }
        },
        {
            slug: 'tiger-texture-roller-9',
            name: 'Tiger Texture Roller 9"',
            brand: 'Tiger',
            category: 'Paint Rollers',
            image: 'https://via.placeholder.com/480x480/1e293b/6366f1?text=Tiger+Texture+Roller',
            description: 'Tiger texture roller for creating attractive wall patterns and textures.',
            features: ['Textured patterns', '9-inch', 'Decorative', 'Easy to use'],
            specs: { size: '9 inches', type: 'Texture Roller', material: 'Rubber' }
        },
        {
            slug: 'black-cat-paint-brush',
            name: 'Black Cat Paint Brush',
            brand: 'Black Cat',
            category: 'Paint Brushes',
            image: 'https://via.placeholder.com/480x480/1e293b/6366f1?text=Black+Cat+Brush',
            description: 'Black Cat professional paint brush for precision painting and trim work.',
            features: ['Professional grade', 'Precision', 'Good bristle retention', 'Comfortable grip'],
            specs: { type: 'Paint Brush', material: 'Natural bristle' }
        },
        {
            slug: 'universal-diamond-series-paint-brush',
            name: 'Universal Diamond Series Paint Brush',
            brand: 'Universal',
            category: 'Paint Brushes',
            image: 'https://via.placeholder.com/480x480/1e293b/6366f1?text=Diamond+Series+Brush',
            description: 'Universal Diamond Series premium paint brush for professional results.',
            features: ['Diamond series', 'Premium quality', 'Excellent flow', 'All paint types'],
            specs: { type: 'Paint Brush', material: 'Mixed bristle' }
        },
        {
            slug: 'universal-professional-series-paint-brush',
            name: 'Universal Professional Series Paint Brush',
            brand: 'Universal',
            category: 'Paint Brushes',
            image: 'https://via.placeholder.com/480x480/1e293b/6366f1?text=Professional+Brush',
            description: 'Universal Professional Series brush for expert-level painting precision.',
            features: ['Professional series', 'Expert precision', 'Durable', 'Smooth finish'],
            specs: { type: 'Paint Brush', material: 'Premium bristle' }
        },

        // ===== CHEMICALS & RAW MATERIALS =====
        {
            slug: 'aerosil-200',
            name: 'Aerosil 200',
            brand: 'Chemical',
            category: 'Raw Materials',
            image: 'https://via.placeholder.com/480x480/1e293b/6366f1?text=Aerosil+200',
            description: 'Aerosil 200 fumed silica for paint thickening and anti-settling applications.',
            features: ['Fumed silica', 'Thickening agent', 'Anti-settling', 'Industrial grade'],
            specs: { type: 'Raw Material', grade: 'Industrial' }
        },
        {
            slug: 'calcined-kaolin-dg-80',
            name: 'Calcined Kaolin DG-80',
            brand: 'Chemical',
            category: 'Raw Materials',
            image: 'https://via.placeholder.com/480x480/1e293b/6366f1?text=Calcined+Kaolin',
            description: 'Calcined Kaolin DG-80 filler for paint manufacturing.',
            features: ['Paint filler', 'High whiteness', 'Good opacity', 'Consistent quality'],
            specs: { type: 'Raw Material', grade: 'DG-80' }
        },
        {
            slug: 'tioxide-tr81',
            name: 'Tioxide TR81',
            brand: 'Chemical',
            category: 'Raw Materials',
            image: 'https://via.placeholder.com/480x480/1e293b/6366f1?text=Tioxide+TR81',
            description: 'Tioxide TR81 titanium dioxide for paint manufacturing - premium white pigment.',
            features: ['Titanium dioxide', 'Premium pigment', 'High opacity', 'UV resistant'],
            specs: { type: 'Pigment', grade: 'TR81' }
        },
        {
            slug: 'tioxide-tr92',
            name: 'Tioxide TR92',
            brand: 'Chemical',
            category: 'Raw Materials',
            image: 'https://via.placeholder.com/480x480/1e293b/6366f1?text=Tioxide+TR92',
            description: 'Tioxide TR92 titanium dioxide for high-quality paint formulations.',
            features: ['Titanium dioxide', 'High quality', 'Excellent dispersion', 'Consistent'],
            specs: { type: 'Pigment', grade: 'TR92' }
        },
        {
            slug: 'ucar-filmer-lv',
            name: 'Ucar Filmer LV',
            brand: 'Chemical',
            category: 'Raw Materials',
            image: 'https://via.placeholder.com/480x480/1e293b/6366f1?text=Ucar+Filmer+LV',
            description: 'Ucar Filmer LV coalescent agent for water-based paint formulations.',
            features: ['Coalescent agent', 'Film forming', 'Water-based paints', 'Low VOC'],
            specs: { type: 'Additive', grade: 'LV' }
        },
        {
            slug: 'wheather-safe',
            name: 'Weather Safe',
            brand: 'Exterior',
            category: 'Exterior Paints',
            image: 'https://via.placeholder.com/480x480/1e293b/6366f1?text=Weather+Safe',
            description: 'Weather Safe exterior paint for safe and reliable wall protection.',
            features: ['Safe formula', 'Reliable protection', 'Anti-fade', 'Weather resistant'],
            specs: { coverage: '100 sq ft/liter', finish: 'Matt', base: 'Acrylic' }
        },
        {
            slug: 'buxly-paints',
            name: 'Buxly Paints',
            brand: 'Buxly',
            category: 'Decorative Paints',
            image: 'https://via.placeholder.com/480x480/1e293b/6366f1?text=Buxly+Paints',
            description: 'Buxly premium quality paints for all interior and exterior applications.',
            features: ['Premium quality', 'Wide range', 'Good coverage', 'Trusted brand'],
            specs: { coverage: '120 sq ft/liter', finish: 'Varies', base: 'Varies' }
        },
        {
            slug: 'cci-paints',
            name: 'CCI Paints',
            brand: 'CCI',
            category: 'Decorative Paints',
            image: 'https://via.placeholder.com/480x480/1e293b/6366f1?text=CCI+Paints',
            description: 'CCI quality paints for residential and commercial applications.',
            features: ['Quality assured', 'Wide range', 'Reliable', 'Good value'],
            specs: { coverage: '120 sq ft/liter', finish: 'Varies', base: 'Varies' }
        },
        {
            slug: 'ici-paints',
            name: 'ICI Paints',
            brand: 'ICI',
            category: 'Decorative Paints',
            image: 'https://via.placeholder.com/480x480/1e293b/6366f1?text=ICI+Paints',
            description: 'ICI premium paints - internationally recognized quality for all surfaces.',
            features: ['International quality', 'Premium grade', 'Wide color range', 'Durable'],
            specs: { coverage: '120 sq ft/liter', finish: 'Varies', base: 'Varies' }
        },
        {
            slug: 'kansai-paints',
            name: 'Kansai Paints',
            brand: 'Kansai',
            category: 'Decorative Paints',
            image: 'https://via.placeholder.com/480x480/1e293b/6366f1?text=Kansai+Paints',
            description: 'Kansai Paints - Japanese quality paints for premium finishes.',
            features: ['Japanese quality', 'Premium finish', 'Wide range', 'Eco-friendly'],
            specs: { coverage: '120 sq ft/liter', finish: 'Varies', base: 'Varies' }
        },
        {
            slug: 'nippon-paints',
            name: 'Nippon Paints',
            brand: 'Nippon',
            category: 'Decorative Paints',
            image: 'https://via.placeholder.com/480x480/1e293b/6366f1?text=Nippon+Paints',
            description: 'Nippon Paints - Asia\'s leading paint brand with innovative solutions.',
            features: ['Asia\'s leading brand', 'Innovative', 'Premium quality', 'Wide range'],
            specs: { coverage: '120 sq ft/liter', finish: 'Varies', base: 'Varies' }
        },
        {
            slug: 'gobis-industrial-products',
            name: 'Gobis Industrial Products',
            brand: 'Gobis',
            category: 'Industrial Paints',
            image: 'https://via.placeholder.com/480x480/1e293b/6366f1?text=Gobis+Industrial',
            description: 'Gobis industrial grade paints and coatings for heavy-duty applications.',
            features: ['Industrial grade', 'Heavy-duty', 'Chemical resistant', 'Durable'],
            specs: { coverage: '90 sq ft/liter', finish: 'Varies', base: 'Industrial' }
        }
    ];

    // ---- Product Catalog API ----
    function getProductBySlug(slug) {
        return products.find(p => p.slug === slug) || null;
    }

    function getAllProducts() {
        return products;
    }

    function getProductsByCategory(category) {
        return products.filter(p => p.category === category);
    }

    function getProductsByBrand(brand) {
        return products.filter(p => p.brand === brand);
    }

    function searchProducts(query) {
        const q = query.toLowerCase();
        return products.filter(p =>
            p.name.toLowerCase().includes(q) ||
            p.brand.toLowerCase().includes(q) ||
            p.category.toLowerCase().includes(q) ||
            p.description.toLowerCase().includes(q)
        );
    }

    function getRelatedProducts(slug, count) {
        count = count || 4;
        const product = getProductBySlug(slug);
        if (!product) return products.slice(0, count);

        // Find related by same category or brand
        const related = products.filter(p =>
            p.slug !== slug &&
            (p.category === product.category || p.brand === product.brand)
        );

        // Shuffle and return count
        return related.sort(() => 0.5 - Math.random()).slice(0, count);
    }

    function getCategories() {
        return [...new Set(products.map(p => p.category))];
    }

    function getBrands() {
        return [...new Set(products.map(p => p.brand))];
    }

    // Load custom products from localStorage
    try {
        const customProducts = JSON.parse(localStorage.getItem('customProducts') || '[]');
        if (Array.isArray(customProducts)) {
            customProducts.forEach(customProd => {
                const idx = products.findIndex(p => p.slug === customProd.slug);
                if (idx !== -1) {
                    products[idx] = customProd;
                } else {
                    products.push(customProd);
                }
            });
        }
    } catch (e) {
        console.error('Error loading custom products:', e);
    }

    // Expose globally
    window.ProductCatalog = {
        getProductBySlug: getProductBySlug,
        getAllProducts: getAllProducts,
        getProductsByCategory: getProductsByCategory,
        getProductsByBrand: getProductsByBrand,
        searchProducts: searchProducts,
        getRelatedProducts: getRelatedProducts,
        getCategories: getCategories,
        getBrands: getBrands,
        products: products
    };
})();

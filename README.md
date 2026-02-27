# Karachi Paints - Project Structure

This document explains the organized directory structure of the Karachi Paints website.

## 📁 Directory Structure

```
karachipaints.pk/
├── index.html              # Main homepage
├── assets/                 # All static assets
│   ├── css/               # Stylesheets
│   ├── js/                # JavaScript files
│   ├── images/            # Images, logos, icons
│   └── fonts/             # Web fonts
├── pages/                  # All website pages
│   ├── about-us/          # About Us page
│   ├── blog/              # Blog pages
│   ├── cart/              # Shopping cart
│   ├── category/          # Product categories
│   ├── contact-us/        # Contact page
│   ├── shop/              # Shop listing page
│   ├── terms-conditions/  # Terms & Conditions
│   ├── wishlist/          # Wishlist page
│   ├── my-account/        # User account pages
│   ├── compare/           # Product comparison
│   ├── pages/product-category/  # Product category pages
│   └── wp-json/           # API endpoints (archived)
├── product/               # Individual product pages
│   └── [product-slug]/    # Each product has its own directory
│       └── index.html     # Product page
└── archive/               # Archived/backup files
    ├── wordpress-core/   # WordPress core files (wp-admin, wp-content, wp-includes)
    └── duplicates/       # Duplicate index files and unused files
```

## 📂 Directory Details

### `/assets`
Contains all static assets used across the website:
- **css/**: All stylesheets (Bootstrap, theme styles, plugin styles)
- **js/**: All JavaScript files (jQuery, plugins, custom scripts)
- **images/**: Images, logos, icons, and graphics
- **fonts/**: Web fonts (WOFF, WOFF2)

### `/pages`
Contains all main website pages organized by functionality:
- **about-us/**: Company information
- **blog/**: Blog posts and articles
- **cart/**: Shopping cart functionality
- **category/**: Product category listings
- **contact-us/**: Contact information and forms
- **shop/**: Main shop/product listing page
- **terms-conditions/**: Legal terms
- **wishlist/**: User wishlist
- **my-account/**: User account management
- **compare/**: Product comparison tool
- **pages/product-category/**: Detailed product category pages

### `/product`
Individual product detail pages. Each product has its own directory named with the product slug (e.g., `dulux-wall-smoothening-putty-20-kg-2/`).

### `/archive`
Contains files that are not actively used but kept for reference:
- **wordpress-core/**: Original WordPress installation files (wp-admin, wp-content, wp-includes)
- **duplicates/**: Duplicate index files and other unused files

## 🔍 File Naming Conventions

- Main pages use `index.html` in their respective directories
- Product pages are in `/product/[product-slug]/index.html`
- Duplicate files (index0813.html, etc.) have been moved to `/archive/duplicates/`

## 🚀 Usage

1. **Homepage**: Access `index.html` at the root
2. **Pages**: Navigate to `/pages/[page-name]/index.html`
3. **Products**: Access products at `/product/[product-slug]/index.html`
4. **Assets**: Reference assets using paths like `/assets/css/style.css`

## 📝 Notes

- This is a static HTML version of a WordPress/WooCommerce site
- All WordPress core files have been moved to `/archive/wordpress-core/`
- Duplicate and unused files are in `/archive/duplicates/`
- The structure is optimized for easy navigation and maintenance

## 🔧 Maintenance

When adding new:
- **CSS files**: Place in `/assets/css/`
- **JavaScript files**: Place in `/assets/js/`
- **Images**: Place in `/assets/images/`
- **Fonts**: Place in `/assets/fonts/`
- **Pages**: Create new directory in `/pages/` with `index.html`
- **Products**: Create new directory in `/product/[product-slug]/` with `index.html`

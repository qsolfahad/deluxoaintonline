# Project Structure Overview

## 📊 Directory Tree

```
karachipaints.pk/
│
├── 📄 index.html                    # Main homepage
├── 📄 README.md                     # Project documentation
├── 📄 STRUCTURE.md                  # This file
│
├── 📁 assets/                       # All static assets
│   ├── 📁 css/                      # Stylesheets (4 files)
│   │   ├── bootstrap.min6104.css
│   │   ├── brandsd998.css
│   │   ├── js_composer.min8e94.css
│   │   └── style.min9704.css
│   │
│   ├── 📁 js/                       # JavaScript files (44 files)
│   │   └── [All JS libraries and scripts]
│   │
│   ├── 📁 images/                   # Images and graphics
│   │   ├── favicon-kp.png
│   │   └── web-logo-new.png
│   │
│   └── 📁 fonts/                    # Web fonts (4 files)
│       ├── basel-font974e.woff
│       ├── basel-font974e.woff2
│       ├── Simple-Line-Icons974e.woff
│       └── Simple-Line-Icons974e.woff2
│
├── 📁 pages/                        # All website pages
│   ├── 📁 about-us/
│   ├── 📁 blog/
│   ├── 📁 cart/
│   ├── 📁 category/
│   ├── 📁 contact-us/
│   ├── 📁 shop/
│   ├── 📁 terms-conditions/
│   ├── 📁 wishlist/
│   ├── 📁 my-account/
│   ├── 📁 compare/
│   ├── 📁 pages/product-category/          # Product category pages (430 files)
│   └── 📁 wp-json/                  # API endpoints (archived)
│
├── 📁 product/                      # Individual product pages (273 files)
│   └── [product-slug]/              # Each product has its own directory
│       └── index.html
│
└── 📁 archive/                      # Archived files
    ├── 📁 wordpress-core/           # WordPress core files
    │   ├── wp-admin/
    │   ├── wp-content/
    │   └── wp-includes/
    │
    └── 📁 duplicates/               # Duplicate files (98 files)
        └── [Duplicate index files and unused files]
```

## 📈 Statistics

- **Total Directories**: 4 main directories (assets, pages, product, archive)
- **CSS Files**: 4 files in `/assets/css/`
- **JavaScript Files**: 44 files in `/assets/js/`
- **Product Pages**: 273 files in `/product/`
- **Main Pages**: Organized in `/pages/`
- **Archived Files**: 98 duplicate files + WordPress core

## 🎯 Key Improvements

1. ✅ **Centralized Assets**: All CSS, JS, images, and fonts in one place
2. ✅ **Organized Pages**: All website pages grouped logically
3. ✅ **Clean Product Structure**: Products remain in their own directory
4. ✅ **Archived Files**: WordPress core and duplicates separated
5. ✅ **Easy Navigation**: Clear, intuitive structure

## 🔗 Quick Links

- **Homepage**: `/index.html`
- **About Us**: `/pages/about-us/index.html`
- **Shop**: `/pages/shop/index.html`
- **Contact**: `/pages/contact-us/index.html`
- **Products**: `/product/[product-slug]/index.html`

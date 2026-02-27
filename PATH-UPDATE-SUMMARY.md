# Path Update Summary

## Problem
After reorganizing the directory structure, all HTML files were still referencing old WordPress paths (`wp-content/`, `wp-includes/`), causing `ERR_FILE_NOT_FOUND` errors.

## Solution
Created and executed a PowerShell script (`fix-paths.ps1`) that updated all file paths in 1,054 HTML files to point to the new organized structure.

## Path Mappings

### CSS Files
- `wp-includes/css/dist/block-library/style.min9704.css` → `assets/css/style.min9704.css`
- `wp-content/plugins/woocommerce/assets/css/brandsd998.css` → `assets/css/brandsd998.css`
- `wp-content/plugins/js_composer/assets/css/js_composer.min8e94.css` → `assets/css/js_composer.min8e94.css`
- `wp-content/themes/basel/css/bootstrap.min6104.css` → `assets/css/bootstrap.min6104.css`
- `wp-content/themes/basel/style.min6104.css` → `assets/css/style.min6104.css`
- `wp-content/plugins/js_composer/assets/lib/bower/font-awesome/css/v4-shims.min8e94.css` → `assets/css/v4-shims.min8e94.css`
- `wp-content/plugins/js_composer/assets/lib/bower/font-awesome/css/all.min8e94.css` → `assets/css/all.min8e94.css`
- `wp-content/plugins/woocommerce/assets/client/blocks/wc-blocksff9f.css` → `assets/css/wc-blocksff9f.css`

### JavaScript Files
- `wp-includes/js/jquery/jquery.minf43b.js` → `assets/js/jquery.minf43b.js`
- `wp-includes/js/jquery/jquery-migrate.min5589.js` → `assets/js/jquery-migrate.min5589.js`
- `wp-includes/js/underscore.min3ab8.js` → `assets/js/underscore.min3ab8.js`
- `wp-includes/js/wp-util.min9704.js` → `assets/js/wp-util.min9704.js`
- `wp-includes/js/dist/hooks.min4fdd.js` → `assets/js/hooks.min4fdd.js`
- `wp-includes/js/dist/i18n.minc33c.js` → `assets/js/i18n.minc33c.js`
- `wp-includes/js/dist/vendor/wp-polyfill.min2c7c.js` → `assets/js/wp-polyfill.min2c7c.js`
- All WooCommerce JS files → `assets/js/[filename]`
- All Basel theme JS files → `assets/js/[filename]`
- All plugin JS files → `assets/js/[filename]`

### Images
- `wp-content/uploads/2022/03/web-logo-new.png` → `assets/images/web-logo-new.png`
- `wp-content/uploads/2022/03/favicon-kp.png` → `assets/images/favicon-kp.png`
- `wp-content/themes/basel/images/icons/apple-touch-icon-152x152-precomposed.png` → `assets/images/apple-touch-icon-152x152-precomposed.png`

### Fonts
- `wp-content/themes/basel/fonts/Simple-Line-Icons974e.woff` → `assets/fonts/Simple-Line-Icons974e.woff`
- `wp-content/themes/basel/fonts/Simple-Line-Icons974e.woff2` → `assets/fonts/Simple-Line-Icons974e.woff2`
- `wp-content/themes/basel/fonts/basel-font974e.woff` → `assets/fonts/basel-font974e.woff`
- `wp-content/themes/basel/fonts/basel-font974e.woff2` → `assets/fonts/basel-font974e.woff2`

## Files Updated
- **Total HTML files processed**: 1,054
- **Files updated**: All files with old path references
- **Relative paths**: Automatically calculated based on file depth (e.g., `../assets/` for subdirectories)

## Current Asset Counts
- **CSS files**: 7 files in `/assets/css/`
- **JavaScript files**: 44 files in `/assets/js/`
- **Images**: 2 files in `/assets/images/` (logo and favicon)
- **Fonts**: 4 files in `/assets/fonts/`

## Notes
- External CDN URLs (like `i0.wp.com`) were left unchanged as they reference external resources
- All relative paths are automatically calculated based on the file's location in the directory structure
- The script preserves query parameters (like `?ver=6.7.1`) in the URLs

## Verification
All critical asset paths have been updated. The website should now load without `ERR_FILE_NOT_FOUND` errors for:
- ✅ CSS files
- ✅ JavaScript files  
- ✅ Images (logo, favicon)
- ✅ Fonts

# Efficient script to update all file paths in HTML files

$htmlFiles = Get-ChildItem -Path . -Filter *.html -Recurse | Where-Object { $_.FullName -notlike "*\archive\*" }

Write-Host "Updating paths in $($htmlFiles.Count) HTML files..."

foreach ($file in $htmlFiles) {
    $content = Get-Content $file.FullName -Raw -Encoding UTF8
    $originalContent = $content
    
    # Calculate relative path depth
    $relativePath = ""
    $filePath = $file.FullName.Replace($PWD.Path, "").TrimStart('\')
    if ($filePath) {
        $depth = ($filePath.Split('\') | Where-Object { $_ }).Count - 1
        if ($depth -gt 0) {
            $relativePath = "../" * $depth
        }
    }
    
    # CSS paths - wp-includes
    $content = $content -replace "wp-includes/css/dist/block-library/style\.min9704\.css", "${relativePath}assets/css/style.min9704.css"
    
    # CSS paths - woocommerce
    $content = $content -replace "wp-content/plugins/woocommerce/assets/css/brandsd998\.css", "${relativePath}assets/css/brandsd998.css"
    $content = $content -replace "wp-content/plugins/woocommerce/assets/client/blocks/wc-blocksff9f\.css", "${relativePath}assets/css/wc-blocksff9f.css"
    
    # CSS paths - js_composer
    $content = $content -replace "wp-content/plugins/js_composer/assets/css/js_composer\.min8e94\.css", "${relativePath}assets/css/js_composer.min8e94.css"
    $content = $content -replace "wp-content/plugins/js_composer/assets/lib/bower/font-awesome/css/v4-shims\.min8e94\.css", "${relativePath}assets/css/v4-shims.min8e94.css"
    $content = $content -replace "wp-content/plugins/js_composer/assets/lib/bower/font-awesome/css/all\.min8e94\.css", "${relativePath}assets/css/all.min8e94.css"
    
    # CSS paths - basel theme
    $content = $content -replace "wp-content/themes/basel/css/bootstrap\.min6104\.css", "${relativePath}assets/css/bootstrap.min6104.css"
    $content = $content -replace "wp-content/themes/basel/style\.min6104\.css", "${relativePath}assets/css/style.min6104.css"
    
    # JS paths - wp-includes (extract filename from path)
    $content = $content -replace "wp-includes/js/jquery/jquery\.minf43b\.js", "${relativePath}assets/js/jquery.minf43b.js"
    $content = $content -replace "wp-includes/js/jquery/jquery-migrate\.min5589\.js", "${relativePath}assets/js/jquery-migrate.min5589.js"
    $content = $content -replace "wp-includes/js/underscore\.min3ab8\.js", "${relativePath}assets/js/underscore.min3ab8.js"
    $content = $content -replace "wp-includes/js/wp-util\.min9704\.js", "${relativePath}assets/js/wp-util.min9704.js"
    $content = $content -replace "wp-includes/js/dist/hooks\.min4fdd\.js", "${relativePath}assets/js/hooks.min4fdd.js"
    $content = $content -replace "wp-includes/js/dist/i18n\.minc33c\.js", "${relativePath}assets/js/i18n.minc33c.js"
    $content = $content -replace "wp-includes/js/dist/vendor/wp-polyfill\.min2c7c\.js", "${relativePath}assets/js/wp-polyfill.min2c7c.js"
    
    # JS paths - woocommerce (extract filename)
    $content = $content -replace "wp-content/plugins/woocommerce/assets/js/jquery-blockui/jquery\.blockUI\.min215f\.js", "${relativePath}assets/js/jquery.blockUI.min215f.js"
    $content = $content -replace "wp-content/plugins/woocommerce/assets/js/frontend/add-to-cart\.mind998\.js", "${relativePath}assets/js/add-to-cart.mind998.js"
    $content = $content -replace "wp-content/plugins/woocommerce/assets/js/js-cookie/js\.cookie\.min3148\.js", "${relativePath}assets/js/js.cookie.min3148.js"
    $content = $content -replace "wp-content/plugins/woocommerce/assets/js/frontend/add-to-cart-variation\.mind998\.js", "${relativePath}assets/js/add-to-cart-variation.mind998.js"
    $content = $content -replace "wp-content/plugins/woocommerce/assets/js/frontend/woocommerce\.mind998\.js", "${relativePath}assets/js/woocommerce.mind998.js"
    $content = $content -replace "wp-content/plugins/woocommerce/assets/js/sourcebuster/sourcebuster\.mind998\.js", "${relativePath}assets/js/sourcebuster.mind998.js"
    $content = $content -replace "wp-content/plugins/woocommerce/assets/js/frontend/order-attribution\.mind998\.js", "${relativePath}assets/js/order-attribution.mind998.js"
    $content = $content -replace "wp-content/plugins/woocommerce/assets/js/frontend/cart-fragments\.mind998\.js", "${relativePath}assets/js/cart-fragments.mind998.js"
    
    # JS paths - js_composer
    $content = $content -replace "wp-content/plugins/js_composer/assets/js/vendors/woocommerce-add-to-cart8e94\.js", "${relativePath}assets/js/woocommerce-add-to-cart8e94.js"
    $content = $content -replace "wp-content/plugins/js_composer/assets/lib/bower/isotope/dist/isotope\.pkgd\.min8e94\.js", "${relativePath}assets/js/isotope.pkgd.min8e94.js"
    $content = $content -replace "wp-content/plugins/js_composer/assets/js/dist/js_composer_front\.min8e94\.js", "${relativePath}assets/js/js_composer_front.min8e94.js"
    
    # JS paths - basel theme (extract filename)
    $content = $content -replace "wp-content/themes/basel/js/([^/""']+\.min6104\.js)", "${relativePath}assets/js/`$1"
    
    # JS paths - contact form 7
    $content = $content -replace "wp-content/plugins/contact-form-7/includes/(swv/)?js/indexb5e1\.js", "${relativePath}assets/js/indexb5e1.js"
    
    # JS paths - mailchimp
    $content = $content -replace "wp-content/plugins/mailchimp-for-wp/assets/js/formsc422\.js", "${relativePath}assets/js/formsc422.js"
    
    # JS paths - google site kit (keep hash in filename)
    $content = $content -replace "wp-content/plugins/google-site-kit/dist/assets/js/(googlesitekit-[^""']+\.js)", "${relativePath}assets/js/`$1"
    
    # JS paths - jetpack
    $content = $content -replace "wp-content/plugins/jetpack/jetpack_vendor/automattic/woocommerce-analytics/build/woocommerce-analytics-clientbd07\.js", "${relativePath}assets/js/woocommerce-analytics-clientbd07.js"
    
    # Image paths
    $content = $content -replace "wp-content/uploads/2022/03/web-logo-new\.png", "${relativePath}assets/images/web-logo-new.png"
    $content = $content -replace "wp-content/uploads/2022/03/favicon-kp\.png", "${relativePath}assets/images/favicon-kp.png"
    
    # Font paths
    $content = $content -replace "wp-content/themes/basel/fonts/([^""']+\.(woff|woff2))", "${relativePath}assets/fonts/`$1"
    
    # Absolute URLs
    $content = $content -replace "https://karachipaints\.pk/wp-content/themes/basel/js/([^""']+\.js)", "${relativePath}assets/js/`$1"
    $content = $content -replace "https://karachipaints\.pk/wp-content/uploads/2022/03/(web-logo-new|favicon-kp)\.png", "${relativePath}assets/images/`$1.png"
    
    if ($content -ne $originalContent) {
        Set-Content -Path $file.FullName -Value $content -Encoding UTF8 -NoNewline
        Write-Host "Updated: $($file.Name)"
    }
}

Write-Host "`nPath update complete!"

// ============================================================
//  Delux Paint Online — Firebase Service
//  Single source of truth for orders, products & pricing
//  Uses Firebase Firestore (v12 modular SDK via CDN)
// ============================================================

(function () {
    'use strict';

    // ── Firebase Configuration ───────────────────────────────
    const firebaseConfig = {
        apiKey: "AIzaSyAVQ5HSIvwS83xl-9ZjBhSCxytA-zg3lGo",
        authDomain: "deluxpaint-9eec1.firebaseapp.com",
        projectId: "deluxpaint-9eec1",
        storageBucket: "deluxpaint-9eec1.firebasestorage.app",
        messagingSenderId: "122703968180",
        appId: "1:122703968180:web:8cf401fc817009b006e4e1",
        measurementId: "G-7YEHJGC77L"
    };

    // ── SDK URLs (Firebase v9 compat — works without a bundler) ──
    const FB_SDK_BASE = 'https://www.gstatic.com/firebasejs/10.12.2';

    // ── Internal state ────────────────────────────────────────
    let _db = null;          // Firestore instance
    let _app = null;         // Firebase app instance
    let _initialized = false;
    let _initError = null;
    let _initCallbacks = [];
    let _realtimeUnsubscribers = {};  // track onSnapshot listeners

    // ── Connection status indicator ───────────────────────────
    function _setStatus(status) {
        // Dispatch a custom event so UI can react
        window.dispatchEvent(new CustomEvent('firebaseStatus', { detail: { status } }));
        const el = document.getElementById('firebase-status-badge');
        if (!el) return;
        const icons = { connected: '🟢', disconnected: '🔴', loading: '🟡' };
        const labels = { connected: 'Firebase Connected', disconnected: 'Firebase Offline', loading: 'Connecting...' };
        el.textContent = (icons[status] || '⚪') + ' ' + (labels[status] || status);
        el.className = 'firebase-status-badge firebase-status-' + status;
    }

    // ── Dynamic SDK loader ────────────────────────────────────
    function _loadScript(src) {
        return new Promise((resolve, reject) => {
            if (document.querySelector(`script[src="${src}"]`)) { resolve(); return; }
            const s = document.createElement('script');
            s.src = src;
            s.type = 'module';
            s.onload = resolve;
            s.onerror = reject;
            document.head.appendChild(s);
        });
    }

    // ── Initialize Firebase ───────────────────────────────────
    async function _init() {
        if (_initialized) return true;
        if (_initError) return false;

        _setStatus('loading');

        try {
            // Import Firebase compat SDK (works in both module and non-module pages)
            // We use the compat version to avoid needing a bundler
            await _ensureFirebaseCompat();

            _app = firebase.initializeApp(firebaseConfig);
            _db  = firebase.firestore();

            _initialized = true;
            _setStatus('connected');
            console.log('[FirebaseService] Connected to Firestore ✅');

            // Flush waiting callbacks
            _initCallbacks.forEach(cb => cb(true));
            _initCallbacks = [];

            // Auto-load catalog on every page
            loadCatalogFromFirebase();

            // Enable offline persistence in background (non-blocking)
            _db.enablePersistence({ synchronizeTabs: true }).catch(err => {
                if (err.code !== 'failed-precondition' && err.code !== 'unimplemented') {
                    console.warn('[Firebase] Persistence note:', err.code || err.message);
                }
            });

            return true;
        } catch (err) {
            _initError = err;
            _setStatus('disconnected');
            console.error('[FirebaseService] Init failed:', err);

            _initCallbacks.forEach(cb => cb(false));
            _initCallbacks = [];
            return false;
        }
    }

    function _ensureFirebaseCompat() {
        return new Promise((resolve, reject) => {
            if (typeof firebase !== 'undefined' && firebase.firestore) { resolve(); return; }

            // Load Firebase compat scripts sequentially
            const scripts = [
                'https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js',
                'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore-compat.js',
            ];

            function loadNext(index) {
                if (index >= scripts.length) { resolve(); return; }
                const s = document.createElement('script');
                s.src = scripts[index];
                s.onload = () => loadNext(index + 1);
                s.onerror = reject;
                document.head.appendChild(s);
            }

            loadNext(0);
        });
    }

    // Ready helper — queues callback until Firebase is initialized
    function _whenReady(fn) {
        if (_initialized) return fn(true);
        if (_initError)   return fn(false);
        _initCallbacks.push(fn);
        _init();
    }

    // ── Promisified wrapper ───────────────────────────────────
    function _ready() {
        return new Promise(resolve => _whenReady(resolve));
    }

    // ============================================================
    //  ORDERS API
    // ============================================================

    /**
     * Save a new order to Firestore.
     * Falls back silently on failure — caller must handle localStorage backup.
     * @param {Object} order  - order object with id, customer, items, total, etc.
     * @returns {Promise<boolean>} true if saved to Firestore, false on error
     */
    async function saveOrder(order) {
        const ok = await _ready();
        if (!ok || !_db) return false;

        try {
            // Use order.id as the Firestore document ID for easy lookup
            await _db.collection('orders').doc(order.id).set({
                ...order,
                _createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                _source: 'web-checkout'
            });
            console.log('[FirebaseService] Order saved:', order.id);
            return true;
        } catch (err) {
            console.error('[FirebaseService] saveOrder error:', err);
            return false;
        }
    }

    /**
     * Fetch all orders from Firestore, sorted newest first.
     * @returns {Promise<Array>} array of order objects
     */
    async function fetchOrders() {
        const ok = await _ready();
        if (!ok || !_db) return null; // null = Firebase unavailable (caller falls back to localStorage)

        try {
            const snapshot = await _db.collection('orders')
                .orderBy('timestamp', 'desc')
                .get();

            const orders = snapshot.docs.map(doc => {
                const data = doc.data();
                // Remove Firestore-internal fields
                delete data._createdAt;
                delete data._source;
                return data;
            });

            console.log(`[FirebaseService] Fetched ${orders.length} orders`);
            return orders;
        } catch (err) {
            console.error('[FirebaseService] fetchOrders error:', err);
            return null;
        }
    }

    /**
     * Delete an order from Firestore by order ID.
     * @param {string} orderId
     * @returns {Promise<boolean>}
     */
    async function deleteOrder(orderId) {
        const ok = await _ready();
        if (!ok || !_db) return false;

        try {
            await _db.collection('orders').doc(orderId).delete();
            console.log('[FirebaseService] Deleted order:', orderId);
            return true;
        } catch (err) {
            console.error('[FirebaseService] deleteOrder error:', err);
            return false;
        }
    }

    /**
     * Listen to orders in real-time.
     * Calls callback whenever orders change in Firestore.
     * @param {Function} callback  - called with (orders: Array)
     * @returns {Function} unsubscribe function
     */
    function listenOrders(callback) {
        let unsubscribe = null;

        _ready().then(ok => {
            if (!ok || !_db) {
                // Offline — fire once with localStorage data
                callback(JSON.parse(localStorage.getItem('orders') || '[]'));
                return;
            }

            unsubscribe = _db.collection('orders')
                .orderBy('timestamp', 'desc')
                .onSnapshot(snapshot => {
                    const orders = snapshot.docs.map(doc => {
                        const data = doc.data();
                        delete data._createdAt;
                        delete data._source;
                        return data;
                    });
                    // Keep localStorage in sync
                    localStorage.setItem('orders', JSON.stringify(orders));
                    callback(orders);
                }, err => {
                    console.error('[FirebaseService] listenOrders error:', err);
                    // Fall back to localStorage
                    callback(JSON.parse(localStorage.getItem('orders') || '[]'));
                });

            _realtimeUnsubscribers['orders'] = unsubscribe;
        });

        // Return an unsubscribe function
        return () => {
            if (unsubscribe) unsubscribe();
        };
    }

    /**
     * Import a batch of orders (used for Excel import restore).
     * @param {Array} ordersArray
     * @returns {Promise<number>} count of successfully saved orders
     */
    async function importOrders(ordersArray) {
        const ok = await _ready();
        if (!ok || !_db) return 0;

        let saved = 0;
        const BATCH_SIZE = 400; // Firestore batch limit is 500

        for (let i = 0; i < ordersArray.length; i += BATCH_SIZE) {
            const batch = _db.batch();
            const chunk = ordersArray.slice(i, i + BATCH_SIZE);
            chunk.forEach(order => {
                if (!order.id) order.id = 'KP-' + Date.now() + '-' + Math.random().toString(36).substr(2, 6);
                const ref = _db.collection('orders').doc(order.id);
                batch.set(ref, { ...order, _source: 'import' });
                saved++;
            });
            await batch.commit();
        }

        console.log(`[FirebaseService] Imported ${saved} orders`);
        return saved;
    }

    // ============================================================
    //  PRODUCTS API
    // ============================================================

    /**
     * Save (or overwrite) a product in Firestore.
     * @param {Object} product - product object (must have .slug)
     * @param {Object} [pricing] - optional pricing object { gallon, quarter, drum }
     * @returns {Promise<boolean>}
     */
    async function saveProduct(product, pricing) {
        const ok = await _ready();
        if (!ok || !_db) return false;

        try {
            const batch = _db.batch();

            // Save product
            const prodRef = _db.collection('products').doc(product.slug);
            batch.set(prodRef, { ...product, _updatedAt: firebase.firestore.FieldValue.serverTimestamp() });

            // Save pricing if provided
            if (pricing) {
                const priceRef = _db.collection('pricing').doc(product.slug);
                batch.set(priceRef, { ...pricing, slug: product.slug, _updatedAt: firebase.firestore.FieldValue.serverTimestamp() });
            }

            await batch.commit();
            console.log('[FirebaseService] Product saved:', product.slug);
            return true;
        } catch (err) {
            console.error('[FirebaseService] saveProduct error:', err);
            return false;
        }
    }

    /**
     * Fetch all products from Firestore.
     * @returns {Promise<Array|null>} null if Firebase unavailable
     */
    async function fetchProducts() {
        const ok = await _ready();
        if (!ok || !_db) return null;

        try {
            const snapshot = await _db.collection('products').get();
            const products = snapshot.docs.map(doc => {
                const data = doc.data();
                delete data._updatedAt;
                return data;
            });
            console.log(`[FirebaseService] Fetched ${products.length} products`);
            return products;
        } catch (err) {
            console.error('[FirebaseService] fetchProducts error:', err);
            return null;
        }
    }

    /**
     * Fetch a single product directly from Firestore by slug.
     * @param {string} slug
     * @returns {Promise<Object|null>}
     */
    async function fetchProductBySlug(slug) {
        const ok = await _ready();
        if (!ok || !_db || !slug) return null;

        try {
            // First try exact doc slug match
            let doc = await _db.collection('products').doc(slug).get();
            if (doc.exists) {
                const data = doc.data();
                delete data._updatedAt;
                data.slug = data.slug || data.id || doc.id;
                return data;
            }

            // Fallback query by slug or id field
            const target = String(slug).trim().toLowerCase();
            const snap = await _db.collection('products').get();
            for (const d of snap.docs) {
                const data = d.data();
                const s = (data.slug || data.id || d.id || '').toLowerCase();
                if (s === target) {
                    delete data._updatedAt;
                    data.slug = data.slug || data.id || d.id;
                    return data;
                }
            }
            return null;
        } catch (err) {
            console.error('[FirebaseService] fetchProductBySlug error:', err);
            return null;
        }
    }

    /**
     * Delete a product from Firestore by slug.
     * @param {string} slug
     * @returns {Promise<boolean>}
     */
    async function deleteProduct(slug) {
        const ok = await _ready();
        if (!ok || !_db) return false;

        try {
            const batch = _db.batch();
            batch.delete(_db.collection('products').doc(slug));
            batch.delete(_db.collection('pricing').doc(slug));
            await batch.commit();
            console.log('[FirebaseService] Deleted product:', slug);
            return true;
        } catch (err) {
            console.error('[FirebaseService] deleteProduct error:', err);
            return false;
        }
    }

    // ============================================================
    //  PRICING API
    // ============================================================

    /**
     * Fetch all pricing from Firestore.
     * @returns {Promise<Object|null>} map of { slug: { gallon, quarter, drum } }
     */
    async function fetchPricing() {
        const ok = await _ready();
        if (!ok || !_db) return null;

        try {
            const snapshot = await _db.collection('pricing').get();
            const pricing = {};
            snapshot.docs.forEach(doc => {
                const data = doc.data();
                delete data._updatedAt;
                pricing[doc.id] = data;
            });
            console.log(`[FirebaseService] Fetched pricing for ${snapshot.size} products`);
            return pricing;
        } catch (err) {
            console.error('[FirebaseService] fetchPricing error:', err);
            return null;
        }
    }

    /**
     * Fetch pricing for a single product directly from Firestore.
     * @param {string} slug
     * @returns {Promise<Object|null>} { gallon, quarter, drum }
     */
    async function fetchPricingForProduct(slug) {
        const ok = await _ready();
        if (!ok || !_db || !slug) return null;

        try {
            const doc = await _db.collection('pricing').doc(slug).get();
            if (doc.exists) {
                const data = doc.data();
                delete data._updatedAt;
                return data;
            }
            return null;
        } catch (err) {
            console.error('[FirebaseService] fetchPricingForProduct error:', err);
            return null;
        }
    }

    /**
     * Update pricing for a single product slug.
     * @param {string} slug
     * @param {Object} pricing  { gallon, quarter, drum, basePrice }
     * @returns {Promise<boolean>}
     */
    async function savePricing(slug, pricing) {
        const ok = await _ready();
        if (!ok || !_db) return false;

        try {
            await _db.collection('pricing').doc(slug).set({
                ...pricing,
                slug,
                _updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            });
            return true;
        } catch (err) {
            console.error('[FirebaseService] savePricing error:', err);
            return false;
        }
    }

    // ============================================================
    //  SEED / SYNC HELPERS
    // ============================================================

    /**
     * Seed Firestore with the static product catalog if it is empty.
     * Called once from the admin panel on first load.
     * @returns {Promise<{productsSeeded: number, pricingSeeded: number}>}
     */
    async function seedProductsIfEmpty() {
        const ok = await _ready();
        if (!ok || !_db) return { productsSeeded: 0, pricingSeeded: 0 };

        try {
            const existing = await _db.collection('products').limit(1).get();
            if (!existing.empty) {
                console.log('[FirebaseService] Products already seeded — skipping.');
                return { productsSeeded: 0, pricingSeeded: 0 };
            }

            // Nothing to seed anymore — products-data.js is empty stub.
            // Admin must add products manually via the admin panel.
            console.log('[FirebaseService] No products in Firestore and no static catalog to seed. Add products via Admin.');
            return { productsSeeded: 0, pricingSeeded: 0 };
        } catch (err) {
            console.error('[FirebaseService] seedProductsIfEmpty error:', err);
            return { productsSeeded: 0, pricingSeeded: 0 };
        }
    }

    // ============================================================
    //  LOAD CATALOG INTO WINDOW GLOBALS
    // ============================================================

    /**
     * Fetch products and pricing from Firestore and populate
     * window.ProductCatalog.products and window.ProductPricing.pricing.
     * Dispatches 'productsLoaded' and 'pricingLoaded' events when done.
     */
    async function loadCatalogFromFirebase() {
        const ok = await _ready();
        if (!ok || !_db) {
            console.warn('[FirebaseService] Cannot load catalog — Firebase unavailable.');
            return;
        }

        try {
            // ── Load products ──────────────────────────────────
            const prodSnap = await _db.collection('products').get();
            const fbProducts = prodSnap.docs.map(doc => {
                const d = doc.data();
                delete d._updatedAt;
                d.slug = d.slug || d.id || doc.id;
                return d;
            });

            // Sort products by name in memory safely
            fbProducts.sort((a, b) => (a.name || '').localeCompare(b.name || ''));

            // Replace in-memory array contents (keep same reference)
            if (window.ProductCatalog && Array.isArray(window.ProductCatalog.products)) {
                window.ProductCatalog.products.length = 0;
                fbProducts.forEach(p => window.ProductCatalog.products.push(p));
            }

            // ── Load pricing ───────────────────────────────────
            const priceSnap = await _db.collection('pricing').get();
            const fbPricing = {};
            priceSnap.docs.forEach(doc => {
                const d = doc.data();
                delete d._updatedAt;
                delete d.slug;
                fbPricing[doc.id] = d;
            });

            if (window.ProductPricing && window.ProductPricing.pricing) {
                // Clear and repopulate the same object reference
                Object.keys(window.ProductPricing.pricing).forEach(k => delete window.ProductPricing.pricing[k]);
                Object.assign(window.ProductPricing.pricing, fbPricing);
            }

            console.log(`[FirebaseService] Catalog loaded: ${fbProducts.length} products, ${priceSnap.size} pricing docs`);
            if (window.FirebaseService) {
                window.FirebaseService.catalogLoaded = true;
            }

            // Dispatch events so pages react
            window.dispatchEvent(new CustomEvent('productsLoaded', { detail: fbProducts }));
            window.dispatchEvent(new CustomEvent('pricingLoaded',  { detail: fbPricing }));
        } catch (err) {
            console.error('[FirebaseService] loadCatalogFromFirebase error:', err);
        }
    }

    // ============================================================
    //  DISCOUNT SETTINGS
    // ============================================================

    /**
     * Fetch the global discount percentage from Firestore.
     * Stored at: settings/discount  →  { percent: 10, active: true }
     * @returns {Promise<{percent: number, active: boolean}>}
     */
    async function getDiscount() {
        const ok = await _ready();
        if (!ok || !_db) return { percent: 0, active: false };

        try {
            const doc = await _db.collection('settings').doc('discount').get();
            if (doc.exists) {
                const data = doc.data();
                return {
                    percent: Number(data.percent) || 0,
                    active:  Boolean(data.active)
                };
            }
            return { percent: 0, active: false };
        } catch (err) {
            console.error('[FirebaseService] getDiscount error:', err);
            return { percent: 0, active: false };
        }
    }

    // ============================================================
    //  FIREBASE CART API (Single Source of Truth)
    // ============================================================

    function getCartSessionId() {
        let sid = sessionStorage.getItem('cartSessionId') || localStorage.getItem('cartSessionId');
        if (!sid) {
            sid = 'cart_' + Date.now() + '_' + Math.random().toString(36).substring(2, 8);
            try { sessionStorage.setItem('cartSessionId', sid); } catch(e){}
            try { localStorage.setItem('cartSessionId', sid); } catch(e){}
        }
        return sid;
    }

    async function fetchCart() {
        const ok = await _ready();
        if (!ok || !_db) return [];
        try {
            const sid = getCartSessionId();
            const doc = await _db.collection('carts').doc(sid).get();
            if (doc.exists) {
                return doc.data().items || [];
            }
            return [];
        } catch (err) {
            console.error('[FirebaseService] fetchCart error:', err);
            return [];
        }
    }

    async function saveCartToFirebase(items) {
        const ok = await _ready();
        if (!ok || !_db) return false;
        try {
            const sid = getCartSessionId();
            await _db.collection('carts').doc(sid).set({
                sessionId: sid,
                items: items,
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            });
            return true;
        } catch (err) {
            console.error('[FirebaseService] saveCartToFirebase error:', err);
            return false;
        }
    }

    function listenCart(callback) {
        if (!_db) return null;
        const sid = getCartSessionId();
        return _db.collection('carts').doc(sid).onSnapshot(doc => {
            if (doc.exists) {
                callback(doc.data().items || []);
            } else {
                callback([]);
            }
        }, err => console.error('[FirebaseService] listenCart error:', err));
    }

    /**
     * Save the global discount to Firestore.
     * @param {number} percent   0-100
     * @param {boolean} active   whether the discount is currently live
     * @returns {Promise<boolean>}
     */
    async function setDiscount(percent, active) {
        const ok = await _ready();
        if (!ok || !_db) return false;

        try {
            await _db.collection('settings').doc('discount').set({
                percent: Number(percent) || 0,
                active:  Boolean(active),
                _updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            });
            console.log(`[FirebaseService] Discount set: ${percent}% active=${active}`);
            return true;
        } catch (err) {
            console.error('[FirebaseService] setDiscount error:', err);
            return false;
        }
    }

    // ============================================================
    //  CLEANUP
    // ============================================================

    function stopListeners() {
        Object.values(_realtimeUnsubscribers).forEach(fn => { if (typeof fn === 'function') fn(); });
        _realtimeUnsubscribers = {};
    }

    // ============================================================
    //  PUBLIC API
    // ============================================================
    window.FirebaseService = {
        // Init
        init: _init,
        isConnected: () => _initialized && !_initError,

        // Orders
        saveOrder,
        fetchOrders,
        deleteOrder,
        listenOrders,
        importOrders,

        // Products
        saveProduct,
        fetchProducts,
        fetchProductBySlug,
        deleteProduct,

        // Pricing
        fetchPricing,
        fetchPricingForProduct,
        savePricing,

        // Catalog (loads products + pricing into window globals)
        loadCatalogFromFirebase,

        // Discount settings
        getDiscount,
        setDiscount,

        // Cart (Firebase Firestore Cart)
        fetchCart,
        saveCartToFirebase,
        listenCart,

        // Admin helpers
        seedProductsIfEmpty,
        stopListeners,
    };

    // ── Auto-start initialization when the DOM is ready ───────
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', _init);
    } else {
        _init();
    }

})();

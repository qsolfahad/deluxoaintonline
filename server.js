const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// ==========================================
// Admin Credentials (change these!)
// ==========================================
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'delux@2024';

// In-memory session tokens { token: { username, expires } }
const activeSessions = new Map();

function generateToken() {
    return crypto.randomBytes(32).toString('hex');
}

function isValidToken(token) {
    if (!token || !activeSessions.has(token)) return false;
    const session = activeSessions.get(token);
    if (Date.now() > session.expires) {
        activeSessions.delete(token);
        return false;
    }
    return true;
}

// Auth middleware — protects all /api/* routes except /api/auth/login
function requireAuth(req, res, next) {
    // Public endpoints — path is relative to /api mount point
    if (req.path === '/auth/login') return next();
    if (req.method === 'GET' && (req.path === '/products' || req.path === '/pricing')) return next();

    const token = req.headers['x-admin-token'] || req.query.adminToken;
    if (!isValidToken(token)) {
        return res.status(401).json({ error: 'Unauthorized. Please log in.' });
    }
    next();
}

app.use('/api', requireAuth);

// Auth endpoints
app.post('/api/auth/login', (req, res) => {
    const { username, password } = req.body;
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
        const token = generateToken();
        const SESSION_HOURS = 8;
        activeSessions.set(token, {
            username,
            expires: Date.now() + SESSION_HOURS * 60 * 60 * 1000
        });
        console.log(`[AUTH] Login successful for user: ${username}`);
        res.json({ success: true, token, expiresIn: SESSION_HOURS * 3600 });
    } else {
        console.warn(`[AUTH] Failed login attempt for user: ${username}`);
        res.status(401).json({ success: false, error: 'Invalid username or password.' });
    }
});

app.post('/api/auth/logout', (req, res) => {
    const token = req.headers['x-admin-token'];
    if (token) activeSessions.delete(token);
    res.json({ success: true });
});

// Serve static files
app.use(express.static(path.join(__dirname, '.')));


const DB_DIR = path.join(__dirname, 'db');
const DB_FILE = path.join(DB_DIR, 'database.json');

// Ensure db directory exists
if (!fs.existsSync(DB_DIR)) {
    fs.mkdirSync(DB_DIR, { recursive: true });
}

// Helper to load default products and pricing from files
function getDefaultData() {
    console.log('Loading default products and pricing from assets...');
    try {
        const mockWindow = {};
        
        // Load products
        const productsPath = path.join(__dirname, 'assets', 'js', 'products-data.js');
        if (fs.existsSync(productsPath)) {
            const productsCode = fs.readFileSync(productsPath, 'utf8');
            // Mock window object context
            const runContext = new Function('window', `
                window.location = { protocol: 'http:', pathname: '' };
                window.fetch = () => new Promise(() => {});
                window.dispatchEvent = () => {};
                window.CustomEvent = class {};
                const localStorage = { getItem: () => '[]', setItem: () => {} };
                const console = { error: () => {}, warn: () => {} };
                const fetch = window.fetch;
                ${productsCode}
            `);
            runContext(mockWindow);
        }

        // Load pricing
        const pricingPath = path.join(__dirname, 'assets', 'js', 'pricing-data.js');
        if (fs.existsSync(pricingPath)) {
            const pricingCode = fs.readFileSync(pricingPath, 'utf8');
            const runContext = new Function('window', `
                window.location = { protocol: 'http:', pathname: '' };
                window.fetch = () => new Promise(() => {});
                window.dispatchEvent = () => {};
                window.CustomEvent = class {};
                const localStorage = { getItem: () => '{}', setItem: () => {} };
                const console = { error: () => {}, warn: () => {} };
                const fetch = window.fetch;
                ${pricingCode}
            `);
            // We run it with window context
            runContext(mockWindow);
        }

        const products = (mockWindow.ProductCatalog && mockWindow.ProductCatalog.products) || [];
        const pricing = (mockWindow.ProductPricing && mockWindow.ProductPricing.pricing) || {};

        console.log(`Loaded ${products.length} default products and pricing rules successfully.`);
        return { products, pricing, orders: [] };
    } catch (err) {
        console.error('Failed to load default assets data:', err);
        return { products: [], pricing: {}, orders: [] };
    }
}

// Database helper functions
function readDb() {
    try {
        if (!fs.existsSync(DB_FILE)) {
            const defaultData = getDefaultData();
            writeDb(defaultData);
            return defaultData;
        }
        const data = fs.readFileSync(DB_FILE, 'utf8');
        return JSON.parse(data || '{}');
    } catch (err) {
        console.error('Error reading database file:', err);
        return { products: [], pricing: {}, orders: [] };
    }
}

function writeDb(data) {
    try {
        // Atomic write via temp file
        const tempFile = DB_FILE + '.tmp';
        fs.writeFileSync(tempFile, JSON.stringify(data, null, 2), 'utf8');
        fs.renameSync(tempFile, DB_FILE);
        return true;
    } catch (err) {
        console.error('Error writing database file:', err);
        return false;
    }
}

// Initialize DB on startup if not present
readDb();

// ==========================================
// API Endpoints
// ==========================================

// --- Products API ---
app.get('/api/products', (req, res) => {
    const db = readDb();
    res.json(db.products || []);
});

app.post('/api/products', (req, res) => {
    const newProduct = req.body;
    if (!newProduct.slug || !newProduct.name) {
        return res.status(400).json({ error: 'Slug and Name are required.' });
    }

    const db = readDb();
    db.products = db.products || [];

    const existingIdx = db.products.findIndex(p => p.slug === newProduct.slug);
    if (existingIdx !== -1) {
        // Update product
        db.products[existingIdx] = { ...db.products[existingIdx], ...newProduct };
    } else {
        // Create product
        db.products.push(newProduct);
    }

    if (writeDb(db)) {
        res.json({ success: true, product: newProduct });
    } else {
        res.status(500).json({ error: 'Database write failed.' });
    }
});

app.delete('/api/products/:slug', (req, res) => {
    const slug = req.params.slug;
    const db = readDb();
    db.products = db.products || [];

    const filtered = db.products.filter(p => p.slug !== slug);
    if (filtered.length === db.products.length) {
        return res.status(404).json({ error: 'Product not found.' });
    }

    db.products = filtered;
    if (writeDb(db)) {
        res.json({ success: true });
    } else {
        res.status(500).json({ error: 'Database write failed.' });
    }
});

// --- Pricing API ---
app.get('/api/pricing', (req, res) => {
    const db = readDb();
    res.json(db.pricing || {});
});

app.post('/api/pricing', (req, res) => {
    const { slug, pricingDetails } = req.body;
    if (!slug || !pricingDetails) {
        return res.status(400).json({ error: 'Slug and Pricing details are required.' });
    }

    const db = readDb();
    db.pricing = db.pricing || {};
    db.pricing[slug] = { ...(db.pricing[slug] || {}), ...pricingDetails };

    if (writeDb(db)) {
        res.json({ success: true, pricing: db.pricing[slug] });
    } else {
        res.status(500).json({ error: 'Database write failed.' });
    }
});

// --- Orders API ---
app.get('/api/orders', (req, res) => {
    const db = readDb();
    res.json(db.orders || []);
});

app.post('/api/orders', (req, res) => {
    const newOrder = req.body;
    if (!newOrder.id) {
        return res.status(400).json({ error: 'Order ID is required.' });
    }

    const db = readDb();
    db.orders = db.orders || [];

    const existingIdx = db.orders.findIndex(o => o.id === newOrder.id);
    if (existingIdx !== -1) {
        db.orders[existingIdx] = newOrder;
    } else {
        db.orders.push(newOrder);
    }

    console.log(`\n====================================================`);
    console.log(`📩 NEW ORDER RECEIVED FOR ADMIN (ffkhans36@gmail.com)`);
    console.log(`Order ID: ${newOrder.id}`);
    console.log(`Customer: ${newOrder.customer?.firstName} ${newOrder.customer?.lastName} (${newOrder.customer?.email}, ${newOrder.customer?.phone})`);
    console.log(`Total: PKR ${newOrder.total}`);
    console.log(`====================================================\n`);

    if (writeDb(db)) {
        res.json({ success: true, order: newOrder });
    } else {
        res.status(500).json({ error: 'Database write failed.' });
    }
});

// IMPORTANT: clear route MUST be before /:id or Express routes 'clear' as an id
app.post('/api/orders/clear', (req, res) => {
    const db = readDb();
    db.orders = [];
    if (writeDb(db)) {
        res.json({ success: true });
    } else {
        res.status(500).json({ error: 'Database write failed.' });
    }
});

app.delete('/api/orders/:id', (req, res) => {
    const id = req.params.id;
    const db = readDb();
    db.orders = db.orders || [];

    const filtered = db.orders.filter(o => o.id !== id);
    if (filtered.length === db.orders.length) {
        return res.status(404).json({ error: 'Order not found.' });
    }

    db.orders = filtered;
    if (writeDb(db)) {
        res.json({ success: true });
    } else {
        res.status(500).json({ error: 'Database write failed.' });
    }
});

// Delete pricing for a product slug
app.delete('/api/pricing/:slug', (req, res) => {
    const slug = req.params.slug;
    const db = readDb();
    db.pricing = db.pricing || {};
    delete db.pricing[slug];
    if (writeDb(db)) {
        res.json({ success: true });
    } else {
        res.status(500).json({ error: 'Database write failed.' });
    }
});

// Redirect route for my-account / cart pages if accessed relative to roots
app.get('/pages/*', (req, res, next) => {
    next();
});

// Fallback all other requests to index.html (SPA routing, if any)
app.get('*', (req, res, next) => {
    // If it's a file request (has extension), let express.static handle it or fail
    if (req.path.includes('.')) {
        return next();
    }
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`====================================================`);
    console.log(`Delux Paint Online Server is running on:`);
    console.log(`🚀 http://localhost:${PORT}`);
    console.log(`Shared database initialized at: ${DB_FILE}`);
    console.log(`====================================================`);
});

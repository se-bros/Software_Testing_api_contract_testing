const express = require('express');
const cors = require('cors');
const routes = require('./product/product.routes');
const authMiddleware = require('./middleware/auth.middleware');
const port = 8080;

const createApp = () => {
    const app = express();
    app.use(cors());
    app.use(express.json());
    // Public health check — dang ky TRUOC authMiddleware nen khong doi token.
    app.get('/health', (req, res) => res.status(200).json({ status: 'ok' }));
    app.use(authMiddleware);
    app.use(routes);
    return app;
};

const init = () => {
    return createApp().listen(port, () => console.log(`Provider API listening on port ${port}...`));
};

if (require.main === module) {
    init();
}

module.exports = { createApp, init };
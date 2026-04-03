const http = require('http');
const path = require('path');
const fs = require('fs');
const express = require('express');
const cors = require('cors');
const yaml = require('yaml');
const swaggerUi = require('swagger-ui-express');

const config = require('./config');
const requestId = require('./middleware/request-id');
const { errorHandler } = require('./middleware/error-handler');
const { setupWebSocket } = require('./ws/notifications');

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const documentRoutes = require('./routes/documents');
const paymentRoutes = require('./routes/payments');
const invoiceRoutes = require('./routes/invoices');
const notificationRoutes = require('./routes/notifications');

// Ensure data & upload dirs exist
['data', 'uploads/avatars', 'uploads/documents'].forEach((dir) => {
  fs.mkdirSync(path.join(__dirname, dir), { recursive: true });
});

const app = express();

// Swagger UI from existing OpenAPI spec
const specPath = path.join(__dirname, '..', 'docs', 'openapi.yaml');
const spec = yaml.parse(fs.readFileSync(specPath, 'utf8'));
spec.servers = [{ url: `http://localhost:${config.PORT}` }];
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(spec));

// Global middleware
app.use(cors());
app.use(express.json());
app.use(requestId);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/auth', authRoutes);
app.use('/me', userRoutes);
app.use('/me/documents', documentRoutes);
app.use('/products', paymentRoutes.products);
app.use('/promo', paymentRoutes.promo);
app.use('/checkout', paymentRoutes.checkout);
app.use('/payments', paymentRoutes.payments);
app.use('/invoices', invoiceRoutes);
app.use('/notifications', notificationRoutes);

// Error handler (must be last)
app.use(errorHandler);

// HTTP + WebSocket server
const server = http.createServer(app);
setupWebSocket(server);

server.listen(config.PORT, () => {
  console.log(`Server running on http://localhost:${config.PORT}`);
  console.log(`Swagger UI: http://localhost:${config.PORT}/api-docs`);
});

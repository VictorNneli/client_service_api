const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger');
const app = express();
const port = 3000;
const globalErrorHandler = require('./middleware/errorHandler');
const { authenticate } = require('./middleware/authMiddleware');
require("dotenv").config();

app.use(express.json());
const clientRoutes = require('./routes/client');
const recordsRoutes = require('./routes/records');
const authRoutes = require('./routes/auth');

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/auth', authRoutes);
app.use('/client', authenticate, clientRoutes);
app.use('/records', authenticate, recordsRoutes);

// Global error handler
app.use(globalErrorHandler.errorHandler);

app.listen(port, ()=> {
  console.log(`server is running on http://localhost:${port}`);
});
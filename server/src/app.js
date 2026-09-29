const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const app = express();

// Security Middlewares
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});
app.use('/api', limiter);

app.use(express.json());

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'SHAMZIL ART CRAFTED API is running' });
});

// Example route imports (To be implemented)
// const authRoutes = require('./routes/authRoutes');
// const productRoutes = require('./routes/productRoutes');
// app.use('/api/auth', authRoutes);
// app.use('/api/products', productRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'We\'re having trouble connecting to the shop. Please try again.',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

module.exports = app;

import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import xss from 'xss-clean';
import authRoutes from './routes/auth.js';
import adminRoutes from './routes/admin.js';
import storeRoutes from './routes/stores.js'
import ratingRoutes from './routes/ratings.js';
import userRoutes from './routes/users.js';

const app = express();

app.use(helmet());
app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ limit: '1mb' }));
app.use(xss());

app.get('/api/health', (_req, res) => res.json({ ok: true }));

app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/stores', storeRoutes);
app.use('/api/ratings', ratingRoutes);
app.use('/api/users', userRoutes);

// 404
app.use((_req, res) => res.status(404).json({ message: 'Not Found' }));

// Error handler
app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ message: 'Server error', error: err.message });
});

export default app;

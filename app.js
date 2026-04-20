import express from 'express';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import cors from 'cors';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import dotenv from 'dotenv';
import passport from 'passport';
import connectDB from './src/config/db.js';
import './src/config/passport.js';
import authRoutes from './src/routes/api/v1/auth.routes.js';

dotenv.config();

// Initialize Express
const app = express();

// Connect to MongoDB
connectDB();

// Global Middlewares
app.use(helmet());
app.use(compression());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS config - CRITICAL for React frontend to communicate with Express
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true // Allows session cookies to be sent back and forth
}));

// Session config
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
    cookie: { 
      secure: process.env.NODE_ENV === 'production', 
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000 
    },
  })
);

// Passport init
app.use(passport.initialize());
app.use(passport.session());


app.use('/api/v1/auth',authRoutes);

// Health route 
app.get('/api/v1/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'API is running' });
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`API Server running on port ${PORT}`);
});
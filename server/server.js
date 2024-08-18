import express from "express"
import connectDB from './config/db.js';
import shopifyRoutes from './routes/shopify.js';
import dotenv from "dotenv";
import cors from 'cors';

dotenv.config()

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.use('/api/shopify', shopifyRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

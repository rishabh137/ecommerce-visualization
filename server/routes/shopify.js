import express from "express"
import { getTotalSales, getNewCustomers, getRepeatCustomers } from '../controllers/shopifyController.js';
const router = express.Router();

router.get('/total-sales', getTotalSales);
router.get('/new-customers', getNewCustomers);
router.get('/repeat-customers', getRepeatCustomers);

export default router;

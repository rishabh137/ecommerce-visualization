import Order from '../models/order.js';
import Customer from '../models/customer.js';

export const getTotalSales = async (req, res) => {
    try {
        const totalSales = await Order.aggregate([
            {
                $group: {
                    _id: {
                        $dateToString: { format: "%Y-%m-%d", date: "$created_at" }
                    },
                    total: { $sum: "$total_price_set.shop_money.amount" }
                }
            },
            { $sort: { _id: 1 } }
        ]);
        res.json(totalSales);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

export const getNewCustomers = async (req, res) => {
    try {
        const newCustomers = await Customer.aggregate([
            {
                $group: {
                    _id: {
                        $dateToString: { format: "%Y-%m-%d", date: "$created_at" }
                    },
                    count: { $sum: 1 }
                }
            },
            { $sort: { _id: 1 } }
        ]);
        res.json(newCustomers);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

export const getRepeatCustomers = async (req, res) => {
    try {
        const repeatCustomers = await Customer.aggregate([
            {
                $group: {
                    _id: "$_id",
                    purchaseCount: { $sum: 1 }
                }
            },
            { $match: { purchaseCount: { $gt: 1 } } },
            {
                $group: {
                    _id: null,
                    count: { $sum: 1 }
                }
            }
        ]);
        res.json(repeatCustomers);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

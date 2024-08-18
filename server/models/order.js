import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    total_price_set: {
        shop_money: {
            amount: {
                type: Number,
                required: true,
            },
        },
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
    customer_email: {
        type: String,
        required: true,
    },
});

const Order = mongoose.model('Order', orderSchema);

export default Order;

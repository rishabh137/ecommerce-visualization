import mongoose from 'mongoose';

const customerSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
    default_address: {
        city: String,
        country: String,
    },
});

const Customer = mongoose.model('Customer', customerSchema);

export default Customer;

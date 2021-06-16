import mongoose from 'mongoose';

const otpSchema = new mongoose.Schema({
    userName: {
        type: String
    },
    otp: {
        type: String
    },
    created: {
        type: String
    },
});

const Otp = new mongoose.model('Otp', otpSchema);

export default Otp;
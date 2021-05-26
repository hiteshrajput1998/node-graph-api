import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    userName: {
        type: String
    },
    password: {
        type: String
    },
    email: {
        type: String
    },
    created: {
        type: String
    }
});

const User = new mongoose.model('User', userSchema);

export default User;
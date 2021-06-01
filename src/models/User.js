import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    created: {
        type: String
    },
    email: {
        type: String
    },
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    password: {
        type: String
    },
    userName: {
        type: String
    },
});

const User = new mongoose.model('User', userSchema);

export default User;
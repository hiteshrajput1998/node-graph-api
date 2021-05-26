import mongoose from 'mongoose';

const collegeSchema = new mongoose.Schema({
    collegeName: {
        type: String
    },
    address: {
        type: String
    }
});

const College = new mongoose.model('College', collegeSchema);

export default College;
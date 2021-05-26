import mongoose from 'mongoose';

const imageSchema = new mongoose.Schema({
    path: {
        type: String
    },
    filename: {
        type: String
    },
    mimetype: {
        type: String
    },
    encoding: {
        type: String
    }
});

const Image = new mongoose.model('Image', imageSchema);

export default Image;
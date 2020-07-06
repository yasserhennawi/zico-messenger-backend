import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    body: {
        type: String,
        required: true
    },
    senderId: {
        type: String,
        required: true
    },
    receiverId: {
        type: String,
        required: true
    }
})

export default mongoose.model("message", schema)
import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    testField: String,
})

export default mongoose.model("test", schema)
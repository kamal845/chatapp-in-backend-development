const mongoose = require('mongoose');
const chatSchema = new mongoose.Schema({
    sender_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    receiver_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    message: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    deleted: { type: Boolean, default: false },
    saved: { type: Boolean, default: false },
});

module.exports = mongoose.model("chat", chatSchema);
const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const MemberSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    occupation: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: 'member',
        enum: ['member', 'admin', 'superadmin'],
    }
},{timestamps: true});

const Member = mongoose.model('Member', MemberSchema);
module.exports = Member;

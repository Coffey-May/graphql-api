const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const eventSchema = new Schema({
    name: String,
    stageId: String,
    appId: String,
    description: String,
    image: String,
    startsAt: Number,
    endsAt: Number
});

module.exports = mongoose.model('Event', eventSchema);

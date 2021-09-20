const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const eventSchema = new Schema({
    name: String,
    stageId: String,
    appId: String,
    description: String,
    image: String,
    startsAt: String,
    endsAt: String
});

module.exports = mongoose.model('Event', eventSchema);

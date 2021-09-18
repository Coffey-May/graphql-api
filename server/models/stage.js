const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const stageSchema = new Schema({
    name: String,
    appId: String,
    eventId: String
})

module.exports = mongoose.model('Stage', stageSchema)

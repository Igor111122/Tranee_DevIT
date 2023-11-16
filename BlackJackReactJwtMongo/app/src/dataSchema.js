const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dataSchema = new Schema({
    player:{
        type: Number,
        required: true,
    },
    gameNumber:{
        type: Number,
        required: true,
    },
    iventType:{
        type: String,
    }
},{timestamps: true});

const gameData = mongoose.model('GamesData' , dataSchema)

module.exports = gameData;
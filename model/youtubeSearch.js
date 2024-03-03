const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const youtube = new Schema({

    result:
    {
        type:Array,
    },
    date:{
        type:String
    }


})


module.exports = mongoose.model('youtube', youtube)
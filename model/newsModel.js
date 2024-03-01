const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const news = new Schema({
  
    news:{
        type:Array,
        required:true
    },
    
    date:{
        type:String
       
    
    },

    count:{
        type:Number,
    },

    page:{
        type:Number
    }
  
});



module.exports = mongoose.model('news', news);
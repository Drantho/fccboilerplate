var mongoose = require('mongoose');

var mintSchema = mongoose.Schema({
    src              : String,
    title            : String,
    description      : String,
    link             : String,
    categories       : Array,
    gallery          : String,
    owner            : {
        firstName    : {
            firstName: String,
            public   : Boolean
        },
        lastName     : {
            lastName : String,
            public   : Boolean 
        },
        userName     : {
            userName : String,
            public   : Boolean        
        },
        id           : String
    }
}, { collection : 'Mints' });


module.exports = mongoose.model('Mint', mintSchema);
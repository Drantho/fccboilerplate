// app/models/user.js
// load the things we need
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// define the schema for our user model
var userSchema = mongoose.Schema({
    isSignedUp       : Boolean,
    showMints        : Boolean,
    Mints            : Array,
    local            : {
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
        email        : {
            email    : String,
            public   : Boolean
        },
        password     : String,
        joinDate     : {
            joinDate : Date,
            public   : Boolean 
        },
        
    }
}, { collection : 'MinterestUser' });

// methods ======================
// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);
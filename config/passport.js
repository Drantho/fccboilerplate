// config/passport.js

// load all the things we need
var LocalStrategy   = require('passport-local').Strategy;

// load up the user model
var User       		= require('./models/User');

// expose this function to our app using module.exports
module.exports = function(passport) {

	// =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        
        //console.log('serializeUser fires.');
        //console.log(user)
        done(null, user._id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        //console.log('deserializeUser fires ' + id);
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

 	// =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
	// by default, if there was no name, it would just be called 'local'

    passport.use('local-signup', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, email, password, done) {

        //console.log('local-signup() firing.');
        //console.log(req.body);
		// find a user whose email is the same as the forms email
		// we are checking to see if the user trying to login already exists
        User.findOne({$or:[{ 'local.email.email' :  email },{'local.userName.userName': req.body.userName}]}, function(err, user) {
            // if there are any errors, return the error
            //console.log('User.findOne() firing.');
            if (err){
                console.log(err);
                return done(err);
            }

            // check to see if theres already a user with that email
            if (user) {
                //console.log('user found.');
                return done(null, false, req.flash('signUpMessage', 'That email/user name is already taken.'));
            } else {

                //console.log('creating new user.');
				// if there is no user with that email
                // create the user
                var newUser            = new User();
                newUser.isSignedUp = true;
                newUser.showMints = false;
                newUser.local.firstName.firstName      = req.body.firstName;
                newUser.local.firstName.public = false;
                newUser.local.lastName.lastName       = req.body.lastName;
                newUser.local.lastName.public = false
              
                // set the user's local credentials
                newUser.local.email.email    = email;
                newUser.local.email.public = false;
                newUser.local.userName.userName = req.body.userName;
                newUser.local.userName.public = false;
                newUser.local.password = newUser.generateHash(password); // use the generateHash function in our user model
                newUser.local.joinDate.joinDate = Date.now().toString();
                newUser.local.joinDate.public = false;

				// save the user
                newUser.save(function(err) {
                    if (err){
                        console.log(err)
                        throw err;
                    }
                    //console.log('user saved.');
                    return done(null, newUser);
                });
            }

        });

    }));

    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use('local-login', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'userName',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, userName, password, done) { // callback with email and password from our form
        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
        User.findOne({ 'local.userName.userName' :  userName }, function(err, user) {
            // if there are any errors, return the error before anything else
            //console.log('connected to database');
            //console.log(user);
            if (err){
                return done(err);
            }
                
                

            // if no user is found, return the message
            if (!user){
                return done(null, false, req.flash('signUpMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash                
            }
                

            // if the user is found but the password is wrong
            if (!user.validPassword(password)){
                return done(null, false, req.flash('signUpMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata                
            }
                      
          
            // all is well, return successful user
            return done(null, user);
        });

    }));

};
require('dotenv').config();

const express = require('express');
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');

const config = require('./config/config');

const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const User = require('./config/models/User');

require('./config/passport')(passport);

// Configuration
// ================================================================================================

// Set up Mongoose
mongoose.connect(config.db);
mongoose.Promise = global.Promise;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)

// required for passport
app.use(session({ secret: 'ilovescotchscotchyscotchscotch' ,cookie: { 
  secure: false
}})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

const port = process.env.PORT || 5000;

// API calls

app.post('/api/hello', (req, res) => {
    res.send({
        express: 'Hello From Express'
    });
});

///=====================================================================================================================

app.get('/api/getUser', (req, res) => {
    console.log('getUser fires');
    console.log(req.user);
    console.log('-----------------------------')
    if (req.user) {
        try{
            res.json(req.user);
            console.log('res.json success')
            return;
        }
        catch(err){
            console.log('res.json error');
            res.sendStatus(200);
        }
        
    }

    res.json({
        isSignedUp: false
    });
});

app.post('/api/getUser', (req, res) => {
    console.log('getUser fires');
    console.log(req.user);
    console.log('-----------------------------')
    if (req.user) {
        try{
            res.json(req.user);
            console.log('res.json success')
            return;
        }
        catch(err){
            console.log('res.json error');
            res.sendStatus(200);
        }
        
    }

    res.json({
        isSignedUp: false
    });
});

app.post('/api/SearchUser', (req, res) => {

    console.log(req.body);

    User.findById(req.body.user, (err, data) => {
        if (err) {
            console.log(err);
            res.json(err);
        }

        console.log(data);
        res.json(data);
    });

});

//========================================================================================================================

app.post('/api/FollowUser', (req, res) => { 
    
    console.log('/api/followUser() fires.');
    let newUser = new User();

    User.findById(req.body.userId, (errFinding, userToFollow) =>{
        if(errFinding)
        {
            console.log(errFinding);
        }

        console.log('userToFollow: ');
        console.log(userToFollow);

        User.findByIdAndUpdate(req.user._id, {
            $push: {
                following: trimUser(userToFollow)
            }
        }, {
            safe: true
        }, (errPushing, result) => {
            if (errPushing) {
                console.log(errPushing);
                res.json({
                    message: errPushing
                });
            }

            //Add signed in user to follower list
            User.findByIdAndUpdate(req.body.userId, {
                $push:{
                    followers: trimUser(req.user)}
                }, (errAddFollower, addFollowerResult) => {
                if(errAddFollower){
                    console.log(errAddFollower);
                }


                console.log('User followed successfully');
                res.json({
                    message: 'User followed successfully'
                });

            });
            
        });
        
    });

});

app.post('/api/UnFollowUser', (req, res) => { 
    
    var newUser = new User();

    User.findById(req.user._id, (errFinding, user) =>{
        if(errFinding)
        {
            console.log(errFinding);
        }

        for(let i=0;i<user.following.length; i++){
            if(user.following[i]._id.toString() == req.body.userId.toString()){
                user.following.splice(i, 1);
            }
        }

        User.findByIdAndUpdate(req.user._id, {following: user.following}, (errUpdating, result) => {
            if(errUpdating){
                console.log(err);
            }

            console.log('Following list updated.');

            //Remove signed in user from follower list
            User.findById(req.body.userId, (errFindingFollowUser, followUser) =>{
                if(errFindingFollowUser){
                    console.log(errFindingFollowUser);
                }

                console.log('Follower found.');
                for(let i=0; i<followUser.followers.length; i++){
                    if(followUser.followers[i]._id.toString() == req.user._id.toString()){
                        followUser.followers.splice(i, 1);
                        console.log('Follower list altered.');
                    }
                }

                User.findByIdAndUpdate(req.body.userId, {followers: followUser.followers}, (errUpdateFollowUser, updateFollowUser) =>{
                    if(errUpdateFollowUser){
                        console.log(errUpdateFollowUser);
                    }

                    console.log('Follower list updated.');
                    res.json({
                        followers: followUser.followers
                    });
                })

            })

            
        });
        
    });

    

});

trimUser = (user) =>{

    let trimmedUser = {
        '_id': user._id,
        'local': user.local 
    }

    return trimmedUser;

}

//===============================================================================================================================

app.post('/api/SignIn', passport.authenticate('local-login', {
    successRedirect: '/api/signInSuccess', // redirect to the secure profile section
    failureRedirect: '/api/SignInFail', // redirect back to the signup page if there is an error
}));

app.get('/api/SignInSuccess', (req, res) => {
    console.log('Sign In success');
    res.send({signedInUser: req.user, 'signedUp': true})
});

app.get('/api/SignInFail', (req, res) => {
    console.log('SignUp Fail');
    console.log(null);
    const message = req.flash().signUpMessage[0];
    console.log('signup message: ' + message);
    res.json({
        signedUp: false,
        message: message
    });
});

//================================================================================================================================

const ObjectId = require('mongodb').ObjectID;

app.post('/api/AddMint', (req, res) => {

    let newMint = {

        _id: ObjectId(),
        title: req.body.title,
        src: req.body.href,
        link: req.body.href,
        description: req.body.description,
        categories: [],
        owner: req.user._id

    }

    var newUser = new User();

    User.findByIdAndUpdate(req.user._id, {
        $push: {
            Mints: newMint
        }
    }, {
        safe: true
    }, (err, result) => {
        if (err) {
            console.log(er);
            res.json({
                message: err
            });
        }

        console.log('Mint added successfully');
        res.json({
            message: 'Mint added successfully'
        });
    });

});

app.post('/api/GetAllMints', (req, res) => {

    User.aggregate([{
            $unwind: "$Mints"
        },
        {
            $group: {
                _id: null,
                Mints: {
                    $push: "$Mints"
                }
            }
        }
    ], (err, result) => {
        if (err) {
            console.log(err);
            res.json({
                message: err
            });
        }

        console.log('Mints retrieved');
        console.log(result);
        res.json(result);
    });

});

app.post('/api/GetMint', (req, res) => {

    User.aggregate([{
            $unwind: "$Mints"
        },
        {
            $match: {
                "Mints._id": ObjectId(req.body.mint)
            }
        },
        {
            $project: {
                "_id": req.body.mint,
                "title": "$Mints.title",
                "src": "$Mints.src",
                "link": "$Mints.link",
                "description": "$Mints.description",
                "categories": "$Mints.categories",
                "owner": "$Mints.owner",
            }
        }
    ], (err, result) => {
        if (err) {
            console.log(err);
            res.json({
                message: err
            });
        }

        console.log('searching mint ' + req.body.mint);
        console.log('Mint retrieved');
        console.log(result[0]);
        res.json(result[0]);
    });

});

app.post('/api/ReMint', (req, res) => {

    User.findByIdAndUpdate(req.user._id, {
        $push: {
            Mints: trimMint(req.body.mint, req.user._id) }
        }, (errUpdate, resultUpdate) => {
        if(errUpdate){
            console.log(errUpdate);
            res.sendStatus(500);
        }

        res.json(resultUpdate);
    });
       
});

trimMint = (mint, userId) => {
    
    mint._id=ObjectId();
    mint.owner=userId.toString();
    return mint;
}

//=============================================================================================================================

app.post('/api/ChangeShowUserName', (req, res) => {
    console.log('user: ' + req.user._id);
    User.findByIdAndUpdate(req.user._id, {
        $set: {
            'local.userName.public': req.body.showUserName
        }
    }, (err, result) => {
        if (err) {
            console.log(er);
            res.json({
                message: err
            });
        }

        console.log('showUserName set to ' + req.body.showUserName);
        res.json({
            message: 'update successful showUserName set to ' + req.body.showUserName
        });
    });
});

app.post('/api/ChangeShowLastName', (req, res) => {
    console.log('user: ' + req.user._id);
    User.findByIdAndUpdate(req.user._id, {
        $set: {
            'local.lastName.public': req.body.showLastName
        }
    }, (err, result) => {
        if (err) {
            console.log(er);
            res.json({
                message: err
            });
        }

        console.log('update successful showLastName set to ' + req.body.showLastName);
        res.json({
            message: 'update successful showLastName set to ' + req.body.showLastName
        });
    });
});

app.post('/api/ChangeShowFirstName', (req, res) => {
    console.log('user: ' + req.user._id);
    User.findByIdAndUpdate(req.user._id, {
        $set: {
            'local.firstName.public': req.body.showFirstName
        }
    }, (err, result) => {
        if (err) {
            console.log(er);
            res.json({
                message: err
            });
        }

        console.log('update successful showFirstName set to ' + req.body.showFirstName);
        res.json({
            message: 'update successful showFirstName set to ' + req.body.showFirstName
        });
    });
});

app.post('/api/ChangeShowEmail', (req, res) => {
    console.log('user: ' + req.user._id);
    User.findByIdAndUpdate(req.user._id, {
        $set: {
            'local.email.public': req.body.showEmail
        }
    }, (err, result) => {
        if (err) {
            console.log(er);
            res.json({
                message: err
            });
        }

        console.log('update successful showEmail set to ' + req.body.showEmail);
        res.json({
            message: 'update successful showEmail set to ' + req.body.showEmail
        });
    });
});

app.post('/api/ChangeShowJoinDate', (req, res) => {
    console.log('user: ' + req.user._id);
    User.findByIdAndUpdate(req.user._id, {
        $set: {
            'local.joinDate.public': req.body.showJoinDate
        }
    }, (err, result) => {
        if (err) {
            console.log(er);
            res.json({
                message: err
            });
        }

        console.log('update successful showJoinDate set to ' + req.body.showJoinDate);
        res.json({
            message: 'update successful showJoinDate set to ' + req.body.showJoinDate
        });
    });
});

app.post('/api/ChangeShowMints', (req, res) => {
    console.log('user: ' + req.user._id);
    User.findByIdAndUpdate(req.user._id, {
        $set: {
            'showMints': req.body.showMints
        }
    }, (err, result) => {
        if (err) {
            console.log(er);
            res.json({
                message: err
            });
        }

        console.log('update successful showMints set to ' + req.body.showMints);
        res.json({
            message: 'update successful showMints set to ' + req.body.showMints
        });
    });
});

//=============================================================================================================

app.post('/api/signup', passport.authenticate('local-signup', {
    successRedirect: '/api/SignUpSuccess', // redirect to the secure profile section
    failureRedirect: '/api/SignUpFail', // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages
}));

app.get('/api/SignUpSuccess', (req, res) => {
    console.log('SignUp success');
    console.log(req.user);
    res.json({
        signedUp: true,
        user: req.user
    });
});

app.get('/api/SignUpFail', (req, res) => {
    console.log('SignUp Fail');
    console.log(null);
    const message = req.flash().signUpMessage[0];
    console.log('signup message: ' + message);
    res.json({
        signedUp: false,
        message: message
    });
});



//========================================================================================================

app.post('/api/ChangeShowMints', (req, res) => {
    console.log('user: ' + req.user._id);
    User.findByIdAndUpdate(req.user._id, {
        $set: {
            'showMints': req.body.showMints
        }
    }, (err, result) => {
        if (err) {
            console.log(er);
            res.json({
                message: err
            });
        }

        console.log('update successful showMints set to ' + req.body.showMints);
        res.json({
            message: 'update successful showMints set to ' + req.body.showMints
        });
    });
});

//============================================================================================

if (process.env.NODE_ENV === 'production') {
    // Serve any static files
    app.use(express.static(path.join(__dirname, 'client/build')));

    // Handle React routing, return all requests to React app
    app.get('*', function (req, res) {
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
}


app.listen(port, () => console.log(`Listening on port ${port}`));



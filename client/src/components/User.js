import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import UserListItem from './UserListItem';
import MintList from './MintList';
import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';
import FollowButton from './FollowButton';
import UnFollowButton from './UnFollowButton';
import { withRouter } from 'react-router-dom';

function TabContainer({ children, dir }) {
    return (
        <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
            {children}
        </Typography>
    );
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
    dir: PropTypes.string.isRequired,
};

const styles = theme => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        width: '100%',
    },
    galleryClass: {
        width: 343,
        marginTop: 15,
        marginLeft: 30,
        marginRight: 0,      
    },
    container: {
        paddingTop: 15,
        paddingBottom: 0,
        paddingLeft: 15,
        paddingRight: 15
    }
});


class User extends React.Component {

    constructor(props) {
        super(props);

        console.log('constructor fires.');
    
        this.state = ({
            value: 0,
            user:{
                local: {
                    userName: {userName: ''},
                    firstName: {firstName: ''},
                    lastName: {lastName: ''},
                    joinDate: {joinDate: ''},
                    email: {email: ''},
                },
                Mints: [],
                followers: [
                    {
                        local:
                        {
                            firstName:{firstName: null},
                            lastName:{lastName: null},
                            userName:{userName: null}
                        }
                    }
                    
                ],
                following: [
                    {local:
                        {
                            firstName:{firstName: null},
                            lastName:{lastName: null},
                            userName:{userName: null}
                        }
                    }
                ]
            },
            following: false,
            disabled: true,
            signedInUser: {
                isSignedUp: false
            } 
        });
    
    }

    componentWillMount(){
    
        this.fillComponent();
    
    }

    componentWillReceiveProps(){

        console.log('willReceiveProps() fires');
        this.fillComponent();
    }

    fillComponent(){
        console.log('searching for: ' + this.props.match.params.uid);
        fetch('/api/SearchUser', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user: this.props.match.params.uid
            })
        }).then(function (response) {
            return response.json();
        }).then(function (data) {

            console.log('fetch 1 fires.');
            console.log(data);
            console.log('===================================');

            fetch('/api/getMintedUser', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            }).then(function (response2) {
                return response2.json();
            }).then(function (data2) { 
                
                console.log('fetch2 fires.');
                console.log(data2);
                console.log('==================================');

                this.setState({user: data, following: this.isFollowing(data, data2), signedInUser: data2, disabled: !data2.isSignedUp});                

                console.log('User this.state');
                console.log(this.state);
                console.log('=====================================');

            }.bind(this));

        }.bind(this));
    }

    isFollowing = (userToFollow, userFollowing) =>{

        
        console.log('isFollowing() fires');
        
        if(userFollowing.following){
            for(let i=0; i<userFollowing.following.length; i++){                
                if(userFollowing.following[i]._id.toString() === userToFollow._id.toString()){
                    return true;
                }
            };
        }

        console.log('user not logged in or not found');
        return false;
    }

    handleChange = (event, value) => {
        this.setState({ value });
    }

    handleChangeIndex = index => {
        this.setState({ value: index });
    }

    handleFollowButton = () =>{

        console.log(this.state.user._id);
        this.setState({disabled: true});

        const self=this;

        fetch('/api/FollowUser', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({userId: this.state.user._id})
        }).then(function(response) {
            return response.json();
        }).then(function(data) {
            self.state.user.followers.push(self.state.signedInUser);
            self.setState({following: true, 'user.followers': self.state.user.followers, disabled: false});
            //self.setState({following: true});
            console.log(data.message);
        });
        
    }

    handleUnFollowButton = () =>{
        console.log(this.state.user._id);

        this.setState({disabled: true});
        const self=this;

        fetch('/api/UnFollowUser', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({userId: this.state.user._id})
        }).then(function(response) {
            return response.json();
        }).then(function(data) {
            console.log('attempting to remove follower');
            console.log(data);
            let newUser = self.state.user;
            newUser.followers = data.followers;
            self.setState({following: false, user: newUser, disabled: false});  
        });
    }

    onEventTriggered(state) {
        if(state.event === 'pathChange'){
            
            console.log('something happened');
            
        }
    }

    render() {
        const { classes, theme } = this.props;

        return (
            <div className={classes.root}>
                <AppBar position="static" color="default">

                    <h1 className='pageTitle'>{this.state.user.local.userName.username}</h1>
                    <span style={{width: 40}}>
                        <Avatar style={{verticalAlign: 'middle', marginRight: 10}} src="/img/user1.jpg" />
                    </span>
                    <span style={{width: 200}}>
                        <strong>Name:</strong>{this.state.user.local.firstName.firstName + ' ' + this.state.user.local.lastName.lastName}<br/>  
                        <strong>Email:</strong> {this.state.user.local.email.email}<br/>        
                        <strong>Member Since:</strong> {this.state.user.local.joinDate.joinDate}<br/>

                        
                        { this.state.following ? <UnFollowButton disabled={this.state.disabled} handleUnFollowButton={this.handleUnFollowButton.bind(this)}/> : <FollowButton disabled={this.state.disabled} handleFollowButton={this.handleFollowButton.bind(this)}/> }
                        

                    </span>
          
                    <Tabs
                        value={this.state.value}
                        onChange={this.handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                        centered
                    >
            
                        <Tab label="Followers" />
                        <Tab label="Following" />
                        <Tab label="Mints" />
            
                    </Tabs>
                </AppBar>
                <SwipeableViews
                    axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                    index={this.state.value}
                    onChangeIndex={this.handleChangeIndex}
                >
        
                <TabContainer dir={theme.direction}>
                    <Paper  className='subContainer'>
                        <h1>Followers ({this.state.user.followers.length})</h1>
                        {
                            this.state.user.followers.map(
                                function(item, i){
                                    return <UserListItem 
                                        key={i} 
                                        name={item.local.firstName.firstName + ' ' + item.local.lastName.lastName}
                                        userName={item.local.userName.userName}
                                        userId={item._id}
                                    />
                                }
                            )
                        }
                    </Paper>
                
                </TabContainer>
                <TabContainer dir={theme.direction}>
                    <Paper  className='subContainer'>
                        <h1>Following ({this.state.user.following.length})</h1>
                        {
                            this.state.user.following.map(
                                function(item, i){
                                    return <UserListItem 
                                        key={i} 
                                        name={item.local.firstName.firstName + ' ' + item.local.lastName.lastName}
                                        userName={item.local.userName.userName}
                                        userId={item._id}
                                    />
                                }
                            )
                        }
                    </Paper>
                </TabContainer>
                <TabContainer dir={theme.direction}>

                    <MintList Mints={this.state.user.Mints} signedInUser={this.state.signedInUser}/>
                    
                </TabContainer>
            </SwipeableViews>
        </div>
    );
  }
}

User.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles, { withTheme: true })(User));
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import UserListItem from './UserListItem';
import Masonry from 'react-masonry-component';
import Mint from './Mint';
import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import FollowButton from './FollowButton';
import UnFollowButton from './UnFollowButton';

const images=[
    {
      imageID: 1, 
      src: '../assets/img/1.jpg',
      description : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus egestas libero nec justo tincidunt, sit amet condimentum libero rhoncus. Nulla facilisi. Fusce commodo et velit quis consequat. Etiam nec lorem molestie, viverra justo sed, sagittis lorem. In hac habitasse platea dictumst. Duis venenatis, lorem vitae sollicitudin cursus, ipsum justo facilisis justo, quis semper nibh lacus ac erat. Nam viverra urna a ultrices sodales. Nunc in lectus quam. Vivamus viverra justo vehicula turpis pretium, at consectetur neque tristique. Suspendisse cursus nec ante nec pretium. Donec dui quam, sagittis in tellus eu, euismod viverra arcu. Sed faucibus blandit dui, eu pulvinar sem accumsan ac. Aenean lorem eros, venenatis sed suscipit non, ultrices ut ipsum. Sed in est non enim malesuada aliquam at id tortor. Maecenas nec dolor vestibulum, pulvinar purus eget, molestie nisi. Aliquam erat volutpat. Vivamus nec turpis sit amet lacus pellentesque semper. Nunc nec massa aliquet, laoreet sapien sit amet, mollis urna. Proin a nisl tortor. Ut nec eleifend metus. Curabitur rutrum magna ac orci varius faucibus. Sed scelerisque massa nec ante suscipit malesuada. Sed eu neque dolor. Suspendisse bibendum egestas augue quis venenatis. Nunc imperdiet lectus a nisi ornare cursus at vitae eros. Proin justo nunc, rutrum non nulla eget, tempor volutpat nisi. Praesent lobortis varius neque non rhoncus. Duis convallis feugiat magna eu fringilla. Nullam vestibulum felis iaculis, iaculis sapien eu, pretium nunc. Phasellus rutrum mi eget ligula iaculis ultrices. Praesent tristique mi risus, non feugiat sem iaculis at.'
    },
    {
      imageID: 2, src: '../assets/img/2.jpg'
    },
    {
      imageID: 3, src: '../assets/img/3.jpg'
    },
    {
      imageID: 4, src: '../assets/img/4.jpg'
    },
    {
      imageID: 5, src: '../assets/img/5.jpg'
    },
    {
      imageID: 6, src: '../assets/img/6.jpg'
    },
    {
      imageID: 7, src: '../assets/img/7.jpg'
    },
    {
      imageID: 8, src: '../assets/img/8.jpg'
    },
    {
      imageID: 9, src: '../assets/img/9.jpg'
    },
  ];
  
  const following = [
    {
      name: {
        firstName  : 'Daylin',
        lastName   : 'Mitchell'
      },
      email        : 'drantho@gmail.com',
      joinDate     : '7/1/2018'
    },
    {
      name: {
        firstName  : 'Dustin',
        lastName   : 'Mitchell'
      },
      email        : 'drantho@gmail.com',
      joinDate     : '7/1/2018'
    },
    {
      name: {
        firstName  : 'Devin',
        lastName   : 'Mitchell'
      },
      email        : 'drantho@gmail.com',
      joinDate     : '7/1/2018'
    },
    {
      name: {
        firstName  : 'Sean',
        lastName   : 'Mitchell'
      },
      email        : 'drantho@gmail.com',
      joinDate     : '7/1/2018'
    },
    {
      name: {
        firstName  : 'Tate',
        lastName   : 'Mitchell'
      },
      email        : 'drantho@gmail.com',
      joinDate     : '7/1/2018'
    }
  ];
  
  const followers = [  
    {
      name: {
        firstName  : 'Daylin',
        lastName   : 'Mitchell'
      },
      email        : 'drantho@gmail.com',
      joinDate     : '7/1/2018'
    },
    {
      name: {
        firstName  : 'Dustin',
        lastName   : 'Mitchell'
      },
      email        : 'drantho@gmail.com',
      joinDate     : '7/1/2018'
    },
    {
      name: {
        firstName  : 'Devin',
        lastName   : 'Mitchell'
      },
      email        : 'drantho@gmail.com',
      joinDate     : '7/1/2018'
    },
    {
      name: {
        firstName  : 'Sean',
        lastName   : 'Mitchell'
      },
      email        : 'drantho@gmail.com',
      joinDate     : '7/1/2018'
    },
    {
      name: {
        firstName  : 'Tate',
        lastName   : 'Mitchell'
      },
      email        : 'drantho@gmail.com',
      joinDate     : '7/1/2018'
    },
    {
      name: {
        firstName  : 'Daylin',
        lastName   : 'Mitchell'
      },
      email        : 'drantho@gmail.com',
      joinDate     : '7/1/2018'
    },
    {
      name: {
        firstName  : 'Dustin',
        lastName   : 'Mitchell'
      },
      email        : 'drantho@gmail.com',
      joinDate     : '7/1/2018'
    },
    {
      name: {
        firstName  : 'Devin',
        lastName   : 'Mitchell'
      },
      email        : 'drantho@gmail.com',
      joinDate     : '7/1/2018'
    },
    {
      name: {
        firstName  : 'Sean',
        lastName   : 'Mitchell'
      },
      email        : 'drantho@gmail.com',
      joinDate     : '7/1/2018'
    },
    {
      name: {
        firstName  : 'Tate',
        lastName   : 'Mitchell'
      },
      email        : 'drantho@gmail.com',
      joinDate     : '7/1/2018'
    }
  ];
  

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
            signedInUser: null 
        });
    
    }

    componentDidMount(){
    
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
            console.log('search successful.');
            console.log(data);
            this.setState({
                user: data
            });

            fetch('/api/getUser', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            }).then(function (response2) {
                return response2.json();
            }).then(function (data2) {            
                this.setState({following: this.isFollowing(data2), signedInUser: data2, disabled: !data2.isSignedUp});
                console.log('data2');
                console.log(data2);
            }.bind(this));

        }.bind(this));

        console.log('Setting Following: ');

        console.log('fillComponent fires');
    }

    isFollowing = (user) =>{

        
        console.log('isFollowing() fires');
        
        if(user.following){
            console.log('user.following: ');
            console.log(user.following);
            for(let i=0; i<user.following.length; i++){
                console.log('testing: ');
                console.log(user.following[i]._id + ' = ' + this.state.user._id);
                if(user.following[i]._id == this.state.user._id){
                    console.log('returning true');
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
                        <Avatar style={{verticalAlign: 'middle', marginRight: 10}} src="../assets/img/user1.jpg" />
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

                    <Masonry
                        className={'galleryClass'} // default '' 
                        disableImagesLoaded={false} // default false
                        updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false
                        style={{marginLeft: -30}}
                    >
        
                        {
                            this.state.user.Mints.map(function(item, i){            
                                return <Mint key={i} src={item.src} mintId={item._id}/>
                            })
                        }

                    </Masonry>
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

export default withStyles(styles, { withTheme: true })(User);
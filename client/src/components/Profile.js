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
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Paper from '@material-ui/core/Paper';
import Switch from '@material-ui/core/Switch';


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
  
const following = 
[
    {
        name: {
            firstName: 'Daylin',
            lastName: 'Mitchell'
        },
        email: 'drantho@gmail.com',
        joinDate: '7/1/2018'
    },
    {
        name: {
            firstName: 'Dustin',
            lastName: 'Mitchell'
        },
        email: 'drantho@gmail.com',
        joinDate: '7/1/2018'
    },
    {
        name: {
            firstName: 'Devin',
            lastName: 'Mitchell'
        },
        email: 'drantho@gmail.com',
        joinDate: '7/1/2018'
    },
    {
        name: {
            firstName: 'Sean',
            lastName: 'Mitchell'
        },
        email: 'drantho@gmail.com',
        joinDate: '7/1/2018'
    },
    {
        name: {
            firstName: 'Tate',
            lastName: 'Mitchell'
        },
        email: 'drantho@gmail.com',
        joinDate: '7/1/2018'
    }
];
  
const followers = 
[  
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

        
        this.state={
            userName: '',
            showUserName: false,
            firstName: '',
            showFirstName: false,
            lastName: '',
            showLastName: false,
            email: '',
            showEmail: false,
            joinDate: '',
            showJoinDate: false,
            showMints: false,
            value: 0
        }

        this.handleChangeShowUserName = this.handleChangeShowUserName.bind(this);
        this.handleChangeShowLastName = this.handleChangeShowLastName.bind(this);
        this.handleChangeShowFirstName = this.handleChangeShowFirstName.bind(this); 
        this.handleChangeShowEmail = this.handleChangeShowEmail.bind(this); 
        this.handleChangeShowJoinDate = this.handleChangeShowJoinDate.bind(this); 
        this.handleChangeShowMints = this.handleChangeShowMints.bind(this); 
    }
  
    componentDidMount(){
        fetch('/api/getUser', 
            {
                method: 'GET',
                
            }).then(function(response) {
                return response.json();
            }).then(function(data) {
                if(data.isSignedUp){
                    console.log('sign in success');
                    console.log('this');
                    console.log(this);
                    console.log('--------------');
                    this.setState({
                        userName: data.local.userName.userName,
                        showUserName: data.local.userName.public,
                        firstName: data.local.firstName.firstName,
                        showFirstName: data.local.firstName.public,
                        lastName: data.local.lastName.lastName,
                        showLastName: data.local.lastName.public,
                        email: data.local.email.email,
                        showEmail: data.local.email.public,
                        joinDate: new Date(data.local.joinDate.joinDate).toLocaleDateString("en-US"),
                        showJoinDate: data.local.joinDate.public,
                        showMints: data.showMints,
                        value: 0
                    });
                }
                else{
                    //console.log('attempting to reset form');
                    //console.log('data' + JSON.stringify(data));
                    this.props.history.push('/SignIn');                    
                }
        }.bind(this));
    }
  
    handleChange = (event, value) => {
        this.setState({ value });
    };
  
    handleChangeIndex = index => {
        this.setState({ value: index });
    };

    handleChangeShowFirstName(){
        console.log('/api/ChangeShowFirstName.')

        fetch('/api/ChangeShowFirstName/', 
            {
                method: 'POST',
                headers: 
                {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    showFirstName: !this.state.showFirstName
                })
            }).then(function(response) {
                return response.json();
            }).then(function(data) {
                console.log(data);
                this.setState({showFirstName: !this.state.showFirstName});
            }.bind(this));
    }

    handleChangeShowLastName(){
        console.log('/api/ChangeShowLastName.')

        fetch('/api/ChangeShowLastName/', 
            {
                method: 'POST',
                headers: 
                {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    showLastName: !this.state.showLastName
                })
            }).then(function(response) {
                return response.json();
            }).then(function(data) {
                console.log(data);
                this.setState({showLastName: !this.state.showLastName});
            }.bind(this));
    }

    handleChangeShowUserName(){
        
        console.log('/api/ChangeShowUserName.')

        fetch('/api/ChangeShowUserName/', 
            {
                method: 'POST',
                headers: 
                {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    showUserName: !this.state.showUserName
                })
            }).then(function(response) {
                return response.json();
            }).then(function(data) {
                console.log(data);
                this.setState({showUserName: !this.state.showUserName});
            }.bind(this));
        
        
    }

    handleChangeShowEmail(){
        console.log('/api/ChangeShowEmail.')

        fetch('/api/ChangeShowEmail/', 
            {
                method: 'POST',
                headers: 
                {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    showEmail: !this.state.showEmail
                })
            }).then(function(response) {
                return response.json();
            }).then(function(data) {
                console.log(data);
                this.setState({showEmail: !this.state.showEmail});
            }.bind(this));
    }

    handleChangeShowJoinDate(){
        console.log('/api/ChangeShowJoinDate.')

        fetch('/api/ChangeShowJoinDate/', 
            {
                method: 'POST',
                headers: 
                {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    showJoinDate: !this.state.showJoinDate
                })
            }).then(function(response) {
                return response.json();
            }).then(function(data) {
                console.log(data);
                this.setState({showJoinDate: !this.state.showJoinDate});
            }.bind(this));
    }

    handleChangeShowMints(){
        console.log('/api/ChangeShowMints.')

        fetch('/api/ChangeShowMints/', 
            {
                method: 'POST',
                headers: 
                {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    showMints: !this.state.showMints
                })
            }).then(function(response) {
                return response.json();
            }).then(function(data) {
                console.log(data);
                this.setState({showMints: !this.state.showMints});
            }.bind(this));
    }
  
    render() {
        const { classes, theme } = this.props;
  
        return (
            <div className={classes.root}>
                <AppBar position="static" color="default">
  
                    <h1 className='pageTitle'>{this.state.firstName} {this.state.lastName}</h1>
                    <span style={{width: 40}}>
                        <Avatar style={{verticalAlign: 'middle', marginRight: 10}} src="../assets/img/user1.jpg" />
                    </span>
                    <span style={{width: 200}}>
                        <strong>User Name:</strong>{this.state.userName}<br/>          
                        <strong>Member Since:</strong> {this.state.joinDate}<br/>
                    </span>
            
                    <Tabs
                        value={this.state.value}
                        onChange={this.handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                        centered
                    >
              
                        <Tab label="Settings" />
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
                        
                        
                            <h1>Settings</h1>
                        
                            <FormControl component="fieldset">                
                                <FormLabel component="legend">Show Publicly</FormLabel>
                                <FormGroup>
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                onChange = {this.handleShowFirstNameChange}
                                                value="firstName"
                                                onChange={this.handleChangeShowFirstName}
                                                checked={this.state.showFirstName}
                                            />
                                        }
                                        label="First Name"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                value="lastName"
                                                onChange={this.handleChangeShowLastName}
                                                checked={this.state.showLastName}
                                            />
                                        }
                                        label="Last Name"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                value="userName"
                                                onChange={this.handleChangeShowUserName}
                                                checked={this.state.showUserName}
                                            />
                                        }
                                        label="User Name"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                value="email"
                                                onChange={this.handleChangeShowEmail}
                                                checked={this.state.showEmail}
                                            />
                                        }
                                        label="Email"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                value="joinDate"
                                                onChange={this.handleChangeShowJoinDate}
                                                checked={this.state.showJoinDate}
                                            />
                                        }
                                        label="Join Date"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                value="mints"
                                                onChange={this.handleChangeShowMints}
                                                checked={this.state.showMints}
                                            />
                                        }
                                        label="Mints"
                                    />
                                </FormGroup>
                            </FormControl>

                        </Paper>
                    </TabContainer>
          
                    <TabContainer dir={theme.direction}>
                        <Paper  className='subContainer'>
                            <h1>Followers ({followers.length})</h1>
                            {
                                followers.map(
                                    function(item, i){
                                        return <UserListItem 
                                            key={i} 
                                            name={item.name.firstName + ' ' + item.name.lastName}
                                        />
                                    }
                                )
                            }
                        </Paper>
                    </TabContainer>
                    <TabContainer dir={theme.direction}>
                        <Paper  className='subContainer'>
                            <h1>Following ({following.length})</h1>
                            {
                                following.map(
                                    function(item, i){
                                        return <UserListItem 
                                            key={i} 
                                            name={item.name.firstName + ' ' + item.name.lastName}
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
                                images.map(function(item, i){            
                                    return <Mint key={i} src={item.src} description={item.description}/>
                                })
                            }
            
                            <Mint src={images[0].src}/>
  
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
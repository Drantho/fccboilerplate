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
            ],
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

        
        console.log('PROFILE this.props');
        console.log(this.props);

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
                        Mints: data.Mints,
                        followers: data.followers,
                        following: data.following,
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
                            <h1>Followers ({this.state.followers.length})</h1>
                            {
                                this.state.followers.map(
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
                            <h1>Following ({this.state.following.length})</h1>
                            {
                                this.state.following.map(
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
                                this.state.Mints.map(function(item, i){            
                                    return <Mint key={i} src={item.src} description={item.description}/>
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
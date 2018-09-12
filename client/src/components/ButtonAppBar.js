import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import MenuDrawer from './MenuDrawer';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

const styles = (theme) => ({
    button: {
        color: 'white'
    },
    toolBar:{
        display: 'inline-block',
        [theme.breakpoints.down('sm')]: {
            display: 'none'
        }
    },
    appBar:{
        minWidth: 360
    }
});

class MenuAppBar extends React.Component {

    constructor(){
        super();
        this.state = {
            auth: false,
            anchorEl: null
        };        
    }

    componentDidMount = () =>{
        console.log('ButtonAppBar componentDidMount fires')
        fetch('/api/GetUser/', 
            {
                method: 'POST',
                headers: 
                {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }).then(function(response) {
                return response.json();
            }).then(function(data) {                
                this.setState({auth: data.isSignedUp});
            }.bind(this));
    }

    render() {
        const { classes } = this.props;
        const { auth } = this.state;

        return (
            <div className={classes.root}>
                <AppBar className={classes.appBar} position="fixed">
                    <Toolbar>                        
                        <div >
                            <Link to="/" className="buttonAppBarLink">
                                <img src='/img/logo-white.png' alt='logo' style={{marginLeft: 0, height: 50, paddingTop: 10, paddingBottom: 10}}/>
                            </Link>
                        </div>
                        {auth && (
                            <div style={{position: 'absolute', right: 0, marginRight: 25}}>  
                                <MenuDrawer/>
                                <Toolbar className={classes.toolBar}>  
                                    <Link to="/Profile" className="buttonAppBarLink">
                                        <Button className={classes.button}>
                                            <h3>Profile</h3>
                                        </Button>
                                    </Link>
                                </Toolbar>
                                <Toolbar className={classes.toolBar}>  
                                    <Link to="/NewMint" className="buttonAppBarLink">
                                        <Button className={classes.button}>
                                            <h3>Add Mint</h3>
                                        </Button>
                                    </Link>
                                </Toolbar>
                                <Toolbar className={classes.toolBar}>  
                                    <Link to="/" className="buttonAppBarLink">
                                        <Button className={classes.button}>
                                            <h3>All Mints</h3>
                                        </Button>
                                    </Link>
                                </Toolbar>
                                <Toolbar className={classes.toolBar}>  
                                    <Button className={classes.button}>
                                        <h3>Browse Users</h3>
                                    </Button>
                                </Toolbar>
                                <Toolbar className={classes.toolBar}>  
                                    <Button className={classes.button}>
                                        <h3>Sign Out</h3>
                                    </Button>
                                </Toolbar>
                            
                            </div>
                        )}
                        {!auth && (
                            <div style={{position: 'absolute', right: 0, marginRight: 25}}>
                                <Toolbar className={classes.toolBar}>  
                                    <Link to="/SignIn" className="buttonAppBarLink">
                                        <Button className={classes.button}>
                                            <h3>Sign In</h3>
                                        </Button>
                                    </Link>
                                </Toolbar>
                                <Toolbar className={classes.toolBar}>  
                                    <Link to="/SignUp" className="buttonAppBarLink">
                                        <Button className={classes.button}>
                                            <h3>Sign Up</h3>
                                        </Button>
                                    </Link>
                                </Toolbar>
                                <Toolbar className={classes.toolBar}>  
                                    <Link to="/" className="buttonAppBarLink">
                                        <Button className={classes.button}>
                                            <h3>All Mints</h3>
                                        </Button>
                                    </Link>
                                </Toolbar>
                                <Toolbar className={classes.toolBar}>  
                                    <Button className={classes.button}>
                                        <h3>Browse Users</h3>
                                    </Button>
                                </Toolbar>
                            </div>
                        )}
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

MenuAppBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MenuAppBar);

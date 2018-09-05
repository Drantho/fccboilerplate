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
    state = {
        auth: true,
        anchorEl: null,
    };

    render() {
        const { classes } = this.props;
        const { auth } = this.state;

        return (
            <div className={classes.root}>
                <AppBar className={classes.appBar} position="fixed">
                    <Toolbar>                        
                        <div >
                            <img src='/img/logo-white.png' alt='logo' style={{marginLeft: 0, height: 50, paddingTop: 10, paddingBottom: 10}}/>
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
                            <div>
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

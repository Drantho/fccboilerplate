import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import NavList from './NavList';

const styles = theme => ({
    list: {
        width: 250,
    },
    menuButton:{
        marginRight: 20,        
        [theme.breakpoints.up('sm')]: {
            display: 'none'
        },
    }
    
});

const links = ['Profile', 'All Mints', 'Browse Users'];

class MenuDrawer extends React.Component {

    state={
        isOpen: false
    }
    
    toggleDrawer = (open) => () => {
        this.setState({
            isOpen: open,
        });
    };

    render() {
        const { classes } = this.props;

        return (
            <div>
                <IconButton className={this.props.classes.menuButton} onClick={this.toggleDrawer(true)} color="inherit" aria-label="Menu">
                    <MenuIcon />
                </IconButton>

                <Drawer open={this.state.isOpen} onClose={this.toggleDrawer(false)}>
                    <div
                        tabIndex={0}
                        role="button"
                        onClick={this.toggleDrawer(false)}
                        onKeyDown={this.toggleDrawer(false)}
                    >
                    
                        <NavList/>

                    </div>
                </Drawer>
                
            </div>
        );
    }
}

MenuDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MenuDrawer);
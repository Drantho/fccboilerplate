import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const styles = theme => ({
});

function NavList(props) {
    const { classes } = props;
    return (
        <div className={classes.root}>            
            <List component="nav">
                <ListItem button>
                    <ListItemText primary="Profile" />
                </ListItem>
                <ListItem button component="a" href="#simple-list">
                    <ListItemText primary="All Mints" />
                </ListItem>
                <ListItem button component="a" href="#simple-list">
                    <ListItemText primary="Browse Users" />
                </ListItem>
            </List>
        </div>
    );
}

NavList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NavList);
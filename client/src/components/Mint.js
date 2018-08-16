import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUser, faEllipsisV } from '@fortawesome/free-solid-svg-icons'
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router-dom'
import createHistory from 'history/createBrowserHistory'
import Button from '@material-ui/core/Button';

const history = createHistory();

library.add(faUser, faEllipsisV)

const styles = theme => ({
    galleryClass: {
      width: 343,
      marginTop: 15,
      marginLeft: 30,
      marginRight: 0, 
      marginBottom: 15,     
    },
    container: {
        paddingTop: 15,
        paddingBottom: 0,
        paddingLeft: 15,
        paddingRight: 15
    },
    actions: {
        padding: 0,
        marginLeft: -10,
        marginRight: -15
    }
  });

class Mint extends React.Component {
    state = {
        anchorEl: null,        
    };

    handleMenu = event => {
        this.setState({ anchorEl: event.currentTarget });
      };
    
      handleClose = () => {
        this.setState({ anchorEl: null });
      };
    
    render() {
        const { classes } = this.props;
        const { auth, anchorEl } = this.state;
        const open = Boolean(anchorEl);

        return (
            <div className={classes.galleryClass}>
                <Card className={classes.container} elevation={10}>                 

                    <Link to={'/ViewMint/' + this.props.mintId}>          
                        <img className="mint" src={this.props.src} />
                    </Link>

                    <CardActions className={classes.actions} disableActionSpacing>
                    <IconButton aria-label="Add to favorites">
                        <img src='/img/leaf.png' style={{width: '45%'}}/>
                    </IconButton>

                    <IconButton 
                        style={{marginLeft: 'auto'}} 
                        aria-label="Share"
                        onClick={this.handleMenu}
                        aria-owns={open ? 'menu-appbar' : null}
                    >
                      <MoreVertIcon />
                    </IconButton>
                  </CardActions>
                        
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={open}
                            onClose={this.handleClose}
                        >
                        <MenuItem onClick={this.handleClose}>Mint It!</MenuItem>
                        <Link to={'/ViewMint/' + this.props.mintId}><MenuItem >View Mint</MenuItem></Link>
                        <Link to={'/User/' + this.props.owner}><MenuItem >View User</MenuItem></Link>
                        <MenuItem onClick={this.handleClose}>Not Interested</MenuItem>
                        <MenuItem onClick={this.handleClose}>Report Spam</MenuItem>
                        <MenuItem onClick={this.handleClose}>Report Inappropriate</MenuItem>
                    </Menu>






                </Card>
            </div>
        );
    }
}

Mint.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Mint);

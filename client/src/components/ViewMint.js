import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Modal from '@material-ui/core/Modal';
import { ButtonBase } from '../../../node_modules/@material-ui/core';
import { Link } from 'react-router-dom';

const styles = theme => ({
    galleryClass: {
      width: 500,
      marginTop: 15,
      marginLeft: 'auto',
      marginRight: 'auto', 
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
    },
    paper: {
        position: 'absolute',
    },
});

const mint={
    title: 'Beach Idea',
    date: '8/1/2018',
    src: '../assets/img/1.jpg',
    link: 'http://www.peninsularv.net',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus egestas libero nec justo tincidunt, sit amet condimentum libero rhoncus. Nulla facilisi. Fusce commodo et velit quis consequat. Etiam nec lorem molestie, viverra justo sed, sagittis lorem. In hac habitasse platea dictumst. Duis venenatis, lorem vitae sollicitudin cursus, ipsum justo facilisis justo, quis semper nibh lacus ac erat. Nam viverra urna a ultrices sodales. Nunc in lectus quam. Vivamus viverra justo vehicula turpis pretium, at consectetur neque tristique. Suspendisse cursus nec ante nec pretium. Donec dui quam, sagittis in tellus eu, euismod viverra arcu. Sed faucibus blandit dui, eu pulvinar sem accumsan ac.'
}

class RecipeReviewCard extends React.Component {
    constructor(){
        super();
        this.state = { 
            anchorEl: null,
            expanded: false,
            modalOpen: false,
            mint: {
                title: '',
                src: '',
                link: '',
                description: '',
                categories: []
            } 
        };
    }

    componentDidMount(){
        console.log('searching mint ' + this.props.match.params.mintId);
        fetch('/api/GetMint', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                mint: this.props.match.params.mintId
            })
        }).then(function (response) {
            return response.json();
        }).then(function (data) {
            console.log('search successful.');
            console.log(data);
            this.setState({
                mint: data
            });
        }.bind(this));
    
    }    

    handleMenu = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    handleExpandClick = () => {
        this.setState(state => ({ expanded: !state.expanded }));        
    };

    handleModalOpen = () => {
        this.setState({ modalOpen: true });
    };
    
    handleModalClose = () => {
        this.setState({ modalOpen: false });
    };    

    render() {
    const { classes } = this.props;
    const { auth, anchorEl } = this.state;
    const open = Boolean(anchorEl);
    
      
      function getModalStyle() {
        const top = 50;
        const left = 50;
      
        return {
          top: `${top}%`,
          left: `${left}%`,
          transform: `translate(-${top}%, -${left}%)`,
        };
      }

    return (
        <div className={classes.galleryClass}>
            <Card className={classes.container}>
                <CardHeader
                    style={{paddingLeft: 0, paddingRight: 0}}
                    action={
                        <IconButton 
                            style={{marginLeft: 'auto'}} 
                            aria-label="Share"
                            onClick={this.handleMenu}
                            aria-owns={open ? 'menu-appbar' : null}
                        >
                            <MoreVertIcon />
                        </IconButton>
                    }
                    title={this.state.mint.title}
                    subheader={this.state.mint.date}
                />
                <ButtonBase onClick={this.handleModalOpen} style={{width: '100%'}}>
                    <img src={this.state.mint.src} style={{width: '100%'}}/>
                </ButtonBase>
                
                <CardActions className={classes.actions} disableActionSpacing>
                    <IconButton aria-label="Add to favorites">
                        <img src='../assets/img/leaf.png' style={{height: 20}}/>
                    </IconButton>
                    <IconButton
                        className={classnames(classes.expand, {
                            [classes.expandOpen]: this.state.expanded,
                        })}
                        style={{marginLeft: 'auto'}}
                        onClick={this.handleExpandClick}
                        aria-expanded={this.state.expanded}
                        aria-label="Show more"
                    >
                        <ExpandMoreIcon />
                    </IconButton>
                </CardActions>
                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.state.modalOpen}
                    onClose={this.handleModalClose}
                >
                    <div style={getModalStyle()} className={classes.paper}>
                        <img src={this.state.mint.src}/>
                    </div>
                </Modal>
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
                    <Link to={'/User/' + this.state.mint.owner }><MenuItem >View User</MenuItem></Link>
                    <MenuItem onClick={this.handleClose}>Not Interested</MenuItem>
                    <MenuItem onClick={this.handleClose}>Report Spam</MenuItem>
                    <MenuItem onClick={this.handleClose}>Report Inappropriate</MenuItem>
                </Menu>
                <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        <Typography paragraph>
                            {this.state.mint.description}
                        </Typography>
                    </CardContent>
                </Collapse>
            </Card>
        </div>
    );
  }
}

RecipeReviewCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RecipeReviewCard);
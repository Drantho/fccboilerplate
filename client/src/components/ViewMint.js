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
import CloseIcon from '@material-ui/icons/Close';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Modal from '@material-ui/core/Modal';
import { ButtonBase } from '../../../node_modules/@material-ui/core';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

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

class ViewMint extends React.Component {
    constructor(props){
        super(props);
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
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
    
      
    function getModalStyle() {
        const top = 50;
        const left = 50;
      
        return {
            top: `${top}%`,
            left: `${left}%`,
            transform: `translate(-${top}%, -${left}%)`,
            maxHeight: '95%',
            maxWidth: '95%',
            overflow: 'scroll' 
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
                    <img alt={this.state.mint.title} src={this.state.mint.src} style={{width: '100%'}}/>
                </ButtonBase>
                
                <CardActions className={classes.actions} disableActionSpacing>
                    <IconButton aria-label="Add to favorites">
                        <img alt='logo' src='/img/leaf.png' style={{height: 20}}/>
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
                        <IconButton onClick={this.handleModalClose} style={{'position': 'absolute', 'top': 0, 'left': 0, 'z-index': 10, 'backgroundColor': 'rgba(0,0,0, 0.4)'}}>
                            <CloseIcon style={{'color': 'white'}}/>
                        </IconButton>
                        <img alt='full size' src={this.state.mint.src}/>
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

ViewMint.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(ViewMint));
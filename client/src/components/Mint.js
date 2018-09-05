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
        minted: true     
    };

    handleMenu = event => {
        this.setState({ anchorEl: event.currentTarget });
    };
    
    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    componentDidMount = () => {

        let mintFound = false;

        let mintList = this.props.signedInUser.Mints;

        console.log('Mint props: ');
        console.log(this.props);
        console.log(this.props.signedInUser);
        console.log('this.props.signedInUser.isSignedUp ? ' + this.props.signedInUser.isSignedUp);
        
        if(this.props.signedInUser.isSignedUp){
            console.log('issignedup == true');
            for(let i=0; i<mintList.length; i++){
                console.log('testing ' + mintList[i]._id + ' == ' + this.props.mintId);
                if(mintList[i]._id.toString() == this.props.mintId.toString()){
                    console.log('mint found')
                    mintFound = true;
                    break;
                }else{
                    console.log('no match');
                }
            }
        }else{
            //set mintFound = true to disable mint feature if user is not signed in
            mintFound = true;
        }
        
        console.log('setting state to ' + mintFound);
        console.log('================================================');
        this.setState({minted: mintFound});

    }

    handleMint = () => {
        fetch('/api/ReMint/', 
            {
                method: 'POST',
                headers: 
                {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    mint: {
                        title: this.props.title,
                        link: this.props.link,
                        src: this.props.src,
                        description: this.props.description
                    }
                })
            }).then(function(response) {
                return response.json();
            }).then(function(data) {
                console.log(data);
                //this.setState({showLastName: !this.state.showLastName});
            });
    }
    
    render() {
        const { classes } = this.props;
        const { anchorEl } = this.state;
        const open = Boolean(anchorEl);

        return (
            <div className={classes.galleryClass}>
                <Card className={classes.container} elevation={10}>                 

                    <Link to={'/ViewMint/' + this.props.mintId}>          
                        <img alt={this.props.title} className="mint" src={this.props.src} />
                    </Link>

                    <CardActions className={classes.actions} disableActionSpacing>
                    

                    { 
                        !this.state.minted ? 
                        <IconButton aria-label="Add to favorites"> 
                            <img alt='logo' src='/img/leaf.png' style={{width: '45%'}}/> 
                        </IconButton> 
                        : 
                        <IconButton aria-label="Add to favorites" disabled> 
                            <img alt='logo' src='/img/leaf-gray.png' style={{width: '45%'}}/> 
                        </IconButton>
                    }

                     
                        

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

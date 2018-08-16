import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom';
import {BrowserRouter as Router, Route} from 'react-router-dom';

const styles = theme => ({
    root: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
        marginLeft: 'auto',
        marginRight: 'auto',
        width: 600,
        padding: 25
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: '95%',
    },
    menu: {
        width: 200,
    },
    button: {
        marginTop: 15,
        marginBottom: 15
    }
});



class SignIn extends React.Component {
    constructor(){
        super();
        this.state = {
            userName: '',
            password: ''
        };
        this.handleSignIn = this.handleSignIn.bind(this);
        this.handleUserNameChange = this.handleUserNameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
    }
    
    handleSignIn (event){
        const self = this;
        console.log('handleSingIn() fires.');
        console.log(this.state);
        fetch('/api/SignIn', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state)
            }).then(function(response) {
                return response.json();
            }).then(function(data) {
                //console.log(data);
                //console.log('----------------');
                //console.log(data.signedUp);
                if(data.signedUp){
                    //console.log('sign in success');
                    self.props.history.push('/Profile');
                }
                else{
                    //console.log('attempting to reset form');
                    //console.log('data' + JSON.stringify(data));
                    self.setState({
                        userName: '',
                        password: '',
                        errorMessage: data.message
                    }
                );
                document.getElementById('signInForm').reset();
            }
        });
    }
    
    handleUserNameChange(event){
        this.setState({userName: event.target.value });
    }

    handlePasswordChange(event){
        this.setState({password: event.target.value});
    }

    render() {
        const { classes } = this.props;

        return (
            <form className={classes.container} id="signInForm">
        
                <Paper className={classes.root} elevation={3}>
                    <Typography className="pageTitle">
                        Sign In
                    </Typography>
                    <TextField
                        id="userName"
                        label="User Name"
                        className={classes.textField}
                        margin="normal"
                        onChange={this.handleUserNameChange}
                    />
                    <TextField
                        id="password"
                        label="Password"
                        className={classes.textField}
                        margin="normal"
                        type="password"
                        onChange={this.handlePasswordChange}
                    />
                
                    <Button variant="contained" color="secondary" className={classes.button} onClick={this.handleSignIn}>
                        Sign In
                    </Button>
                    <h1>{this.state.errorMessage}</h1>
                </Paper>

            </form>
        );
    }
}

SignIn.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SignIn);
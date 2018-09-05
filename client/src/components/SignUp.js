import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom';

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

const blankForm = {
    userName: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    passwordRepeat: ''
}

class SignUp extends React.Component {

    constructor(){
        super();
        this.state=blankForm;
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
        this.handleLastNameChange = this.handleLastNameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handlePasswordReoeatChange = this.handlePasswordReoeatChange.bind(this);
        this.handleUserNameChange = this.handleUserNameChange.bind(this);
        this.handleSignUp = this.handleSignUp.bind(this);
    }

    

    handleUserNameChange (event) {
        this.setState({userName: event.target.value });
    }

    handleFirstNameChange (event) {
        this.setState({firstName: event.target.value });
    }

    handleLastNameChange (event) {
        this.setState({lastName: event.target.value });
    }

    handleEmailChange (event) {
        this.setState({email: event.target.value });
    }

    handlePasswordChange (event) {
        this.setState({password: event.target.value });
    }

    handlePasswordReoeatChange (event) {
        this.setState({passwordRepeat: event.target.value });
    }

    handleSignUp (event) {
        console.log(this.state);
        const self = this;
        fetch('/api/SignUp', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            body: JSON.stringify(this.state)
          }).then(function(response) {
            return response.json();
          }).then(function(data) {
              //self.setState({user: data});
              if(data.signedUp){
                self.props.history.push('/Profile');
              }
              else{
                  console.log('attempting to reset form');
                  console.log(data);
                    self.setState({
                        userName: '',
                        firstName: '',
                        lastName: '',
                        email: '',
                        password: '',
                        passwordRepeat: '',
                        errorMessage: data.message
                    }
                );
                document.getElementById('signUpForm').reset();
              }
          });
    }

    render() {
        const { classes } = this.props;

        return (
            <form className={classes.container} id="signUpForm">
        
                <Paper className={classes.root} elevation={3}>
                    <Typography className="pageTitle">
                        Sign Up
                    </Typography>
                    
                        <TextField
                            id="userName"
                            label="User Name"
                            className={classes.textField}
                            margin="normal"
                            onChange={this.handleUserNameChange}
                            text={this.state.userName}
                        />
                        <TextField
                            id="email"
                            label="Email"
                            className={classes.textField}
                            margin="normal"
                            type="email"
                            onChange={this.handleEmailChange}
                            text={this.state.email}
                        />
                        <TextField
                            id="firstName"
                            label="First Name"
                            className={classes.textField}
                            margin="normal"
                            onChange={this.handleFirstNameChange}
                            text={this.state.firstName}
                        />
                        <TextField
                            id="lastName"
                            label="Last Name"
                            className={classes.textField}
                            margin="normal"
                            onChange={this.handleLastNameChange}
                            text={this.state.lastName}
                        />
                        <TextField
                            id="password"
                            label="Password"
                            className={classes.textField}
                            margin="normal"
                            type="password"
                            onChange={this.handlePasswordChange}
                            text={this.state.password}
                        />
                        <TextField
                            id="passwordRepeat"
                            label="Re-Enter Password"
                            className={classes.textField}
                            margin="normal"
                            type="password"
                            onChange={this.handlePasswordReoeatChange}
                            text={this.state.passwordRepeat}
                        />
                
                        <Button variant="contained" color="secondary" onClick={this.handleSignUp} className={classes.button}>
                            Sign Up
                        </Button>
                    <h1>{this.state.errorMessage}</h1>
                </Paper>

            </form>
        );
    }
}

SignUp.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(SignUp));
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

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

class NewMint extends React.Component {
    constructor(){
        super();

        this.state = {
            title: '',
            href: '',
            link: '',
            description: ''
        };

        this.handleChangeTitle = this.handleChangeTitle.bind(this);
        this.handleChangeHref = this.handleChangeHref.bind(this);
        this.handleChangeLink = this.handleChangeLink.bind(this);
        this.handleChangeDescription = this.handleChangeDescription.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChangeTitle (event){
        this.setState({title: event.target.value});
    }

    handleChangeHref (event){
        this.setState({href: event.target.value});
    }

    handleChangeLink (event){
        this.setState({link: event.target.value});
    }

    handleChangeDescription (event){
        this.setState({description: event.target.value});
    }

    handleSubmit (){
        fetch('/api/AddMint', {
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
            console.log(data.message);
        });
    }
    

    render() {
        const { classes } = this.props;

    return (
        <form className={classes.container} noValidate autoComplete="off">
        
            <Paper className={classes.root} elevation={3}>
            <h3 className="pageTitle">Add a New Mint!</h3>
            
            <TextField
                id="title"
                label="Mint Title"
                className={classes.textField}
                margin="normal"
                onChange={this.handleChangeTitle}
            />
            <TextField
                id="href"
                label="*&nbsp;Image HREF"
                className={classes.textField}
                margin="normal"
                onChange={this.handleChangeHref}
            />
            <TextField
                id="link"
                label="Link"
                className={classes.textField}
                margin="normal"
                onChange={this.handleChangeLink}
            />
            <TextField
                id="description"
                label="Description"
                className={classes.textField}
                margin="normal"
                multiline
                onChange={this.handleChangeDescription}
            />
            <Typography className="pageTitle" style={{textAlign: 'left'}}>
                * Required
            </Typography>
            <Button variant="contained" color="secondary" className={classes.button} onClick={this.handleSubmit}>
                Add Mint
            </Button>
        </Paper>

      </form>
    );
  }
}

NewMint.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NewMint);
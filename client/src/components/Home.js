import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MintList from './MintList';
import { withRouter } from 'react-router-dom';

const styles = theme => ({
  galleryClass: {
    width: 335,
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 20,
    marginRight: 20,
  },
  container: {
    padding: 15
  }
});

class Home extends React.Component {

    constructor(){
        super();

        this.state = {
            Mints: [],
            signedInUser: {}
        };
  }
    
    componentWillMount(){
        fetch('/api/GetAllMints/', 
        {
            method: 'POST',
            headers: 
            {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(function(response) {
            return response.json();
        }).then(function(data) {
            

            fetch('/api/GetMintedUser/', 
            {
                method: 'POST',
                headers: 
                {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }).then(function(response) {
                return response.json();
            }).then(function(data2) {

                this.setState({Mints: data.Mints, signedInUser: data2});      
                console.log('Home state: ');
                console.log(this.state);
                console.log('===========================================')          

            }.bind(this));

        }.bind(this));

    }
    

    render() {

        return (
          <MintList Mints={this.state.Mints} signedInUser={this.state.signedInUser}/>
        );
    }
}

Home.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(Home));

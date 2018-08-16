import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Masonry from 'react-masonry-component';
import Mint from './Mint';

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

const images=[
  {
    imageID: 1, src: '../assets/img/1.jpg'
  },
  {
    imageID: 2, src: '../assets/img/2.jpg'
  },
  {
    imageID: 3, src: '../assets/img/3.jpg'
  },
  {
    imageID: 4, src: '../assets/img/4.jpg'
  },
  {
    imageID: 5, src: '../assets/img/5.jpg'
  },
  {
    imageID: 6, src: '../assets/img/6.jpg'
  },
  {
    imageID: 7, src: '../assets/img/7.jpg'
  },
  {
    imageID: 8, src: '../assets/img/8.jpg'
  },
  {
    imageID: 9, src: '../assets/img/9.jpg'
  },
];

class Home extends React.Component {

    constructor(){
        super();

        this.state = {
            Mints: []
        };
  }
    
    componentDidMount(){
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
            console.log(data[0].Mints);
            this.setState({Mints: data[0].Mints});
        }.bind(this));
    }
    

    render() {

        return (
          <Masonry
            className={'galleryClass'} // default '' 
            disableImagesLoaded={false} // default false
            updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false
        >
        
        {
          this.state.Mints.map(function(item, i){            
            return <Mint key={i} src={item.src} owner={item.owner} mintId={item._id}/>
          })
        }
        </Masonry>
        );
    }
}

Home.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Home);

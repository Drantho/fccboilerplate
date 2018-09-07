import React from 'react';
import Masonry from 'react-masonry-component';
import Mint from './Mint';


class MintList extends React.Component {

    componentDidMount = () =>{
        console.log('MintList props');
        console.log(this.props);
        console.log('=========================================')
    }
    
    render() {

        return (
          <Masonry
            className={'galleryClass'} // default '' 
            disableImagesLoaded={false} // default false
            updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false
        >
        
        {        
          this.props.Mints.map(function(item, i){            
            return <Mint key={i} title={item.title} inappropriate={item.inappropriate} spam={item.spam} src={item.src} owner={item.owner} signedInUser={this.props.signedInUser} mintId={item._id}/>
          },this)
        }
        </Masonry>
        );
    }
}

export default MintList;

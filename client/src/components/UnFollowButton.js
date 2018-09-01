import React from 'react';
import Button from '@material-ui/core/Button';

const FollowButton = (props) => (
    
    <Button 
        variant="extendedFab" 
        color="secondary" 
        style={{margin: 10}}
        onClick={props.handleUnFollowButton}
        disabled={props.disabled}
        >
        Un Follow
    </Button>
);

export default FollowButton;

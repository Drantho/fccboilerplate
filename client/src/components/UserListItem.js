import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import { Link } from 'react-router-dom';

const styles = theme => ({
  root: {
    display: 'inline-block',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  chip: {
    margin: theme.spacing.unit,
  },
});

function UserList(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <Link to={"/User/" + props.userId} key={Math.random()}>
        <Chip
          avatar={<Avatar src="/img/users/1.jpg" />}
          label={props.name}
          className={classes.chip}
        />
      </Link>
    </div>
  );
}

UserList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UserList);
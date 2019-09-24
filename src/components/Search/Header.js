import React from 'react';
import PropTypes from 'prop-types';
import {
  AppBar,
  Toolbar,
  IconButton,
  InputBase,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import DebounceInput from 'react-debounce-input';

const useStyles = makeStyles({
  backButton: {
    marginRight: 10,
  },
});

function Header({ onClickBack, onQueryChange }) {
  const classes = useStyles();

  return (
    <AppBar
      position="static"
      color="inherit"
    >
      <Toolbar>
        <IconButton
          className={classes.backButton}
          edge="start"
          color="inherit"
          aria-label="back"
          onClick={onClickBack}
        >
          <ArrowLeftIcon />
        </IconButton>

        <InputBase
          placeholder="Search"
          inputComponent={DebounceInput}
          inputProps={{ debounceTimeout: 300 }}
          onChange={onQueryChange}
        />
      </Toolbar>
    </AppBar>
  );
}

Header.propTypes = {
  onClickBack: PropTypes.func.isRequired,
  onQueryChange: PropTypes.func.isRequired,
};


export default Header;

import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import BookList from '../App/BookList';

const useStyles = makeStyles({
  shelf: {
    paddingTop: 20,
    paddingBottom: 20,
  },
});

function Shelf({
  title,
  books,
  onMoveBook,
  onRemoveBook,
}) {
  const classes = useStyles();

  return (
    <div className={classes.shelf}>
      <Typography variant="h4">
        {title}
      </Typography>

      <BookList
        books={books}
        actionType="move"
        clickAction={onMoveBook}
        onRemoveBook={onRemoveBook}
      />
    </div>
  );
}

Shelf.propTypes = {
  title: PropTypes.string.isRequired,
  books: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
    }),
  ).isRequired,
  onMoveBook: PropTypes.func.isRequired,
  onRemoveBook: PropTypes.func.isRequired,
};

export default Shelf;

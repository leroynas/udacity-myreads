import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Book from './Book';

const useStyles = makeStyles({
  grid: {
    paddingTop: 20,
  },
  gridItem: {
    display: 'flex',
  },
});

function BookList({ books, actionType, clickAction }) {
  const classes = useStyles();

  return (
    <Grid container spacing={2} className={classes.grid}>
      {books.map((book) => (
        <Grid
          key={book.id}
          item
          xs={12}
          sm={6}
          md={3}
          lg={2}
          xl={1}
          className={classes.gridItem}
        >
          <Book book={book} actionType={actionType} clickAction={clickAction} />
        </Grid>
      ))}
    </Grid>
  );
}

BookList.propTypes = {
  books: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  ).isRequired,
  actionType: PropTypes.string.isRequired,
  clickAction: PropTypes.func.isRequired,
};

export default BookList;

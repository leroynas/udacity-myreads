import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  IconButton,
  Menu,
  MenuItem,
} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  card: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: 1,
  },
  buttonMore: {
    marginLeft: 'auto',
  },
});

function Book({ book, actionType, clickAction }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const classes = useStyles();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const thumbnailLink = book.imageLinks
    ? book.imageLinks.thumbnail
    : 'https://via.placeholder.com/128x192';

  const actionText = actionType === 'add'
    ? 'Add book to...'
    : 'Move book to...';

  const authors = book.authors
    ? book.authors.join(', ')
    : 'No known authors';

  return (
    <Card className={classes.card}>
      <CardMedia
        component="img"
        alt="Contemplative Reptile"
        height="300"
        image={thumbnailLink}
        title="Contemplative Reptile"
      />

      <CardContent className={classes.content}>
        <Typography gutterBottom variant="h6">
          {book.title}
        </Typography>

        <Typography variant="body2" color="textSecondary">
          {authors}
        </Typography>
      </CardContent>

      <CardActions>
        <IconButton
          aria-label="add to"
          className={classes.buttonMore}
          onClick={handleClick}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem disabled>{actionText}</MenuItem>
          <MenuItem
            disabled={actionType === 'move' && book.shelf === 'currentlyReading'}
            onClick={() => { clickAction(book, 'currentlyReading'); }}
          >
            Currently Reading
          </MenuItem>

          <MenuItem
            disabled={actionType === 'move' && book.shelf === 'wantToRead'}
            onClick={() => { clickAction(book, 'wantToRead'); }}
          >
            Want to read
          </MenuItem>

          <MenuItem
            disabled={actionType === 'move' && book.shelf === 'read'}
            onClick={() => { clickAction(book, 'read'); }}
          >
            Read
          </MenuItem>
        </Menu>
      </CardActions>
    </Card>
  );
}

Book.propTypes = {
  book: PropTypes.shape({
    title: PropTypes.string.isRequired,
    authors: PropTypes.array,
    imageLinks: PropTypes.shape({
      thumbnail: PropTypes.string.isRequired,
    }),
    shelf: PropTypes.string,
  }).isRequired,
  actionType: PropTypes.string.isRequired,
  clickAction: PropTypes.func.isRequired,
};

export default Book;

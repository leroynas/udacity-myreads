import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { withStyles } from '@material-ui/core/styles';

import Header from './Header';
import Shelf from './Shelf';

const styles = ({
  page: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  addIcon: {
    position: 'fixed',
    right: 30,
    bottom: 30,
  },
});

class Main extends PureComponent {
  goToSearch = () => {
    const { history } = this.props;
    history.push('search');
  }

  render() {
    const {
      books,
      onMoveBook,
      onRemoveBook,
      classes,
    } = this.props;

    return (
      <div>
        <Header />

        <div className={classes.page}>
          <Shelf
            title="Currently Reading"
            books={books.currentlyReading}
            onMoveBook={onMoveBook}
            onRemoveBook={onRemoveBook}
          />

          <Shelf
            title="Want to read"
            books={books.wantToRead}
            onMoveBook={onMoveBook}
            onRemoveBook={onRemoveBook}
          />

          <Shelf
            title="Read"
            books={books.read}
            onMoveBook={onMoveBook}
            onRemoveBook={onRemoveBook}
          />
        </div>

        <Fab
          color="secondary"
          aria-label="add"
          className={classes.addIcon}
          onClick={this.goToSearch}
        >
          <AddIcon />
        </Fab>
      </div>
    );
  }
}

Main.propTypes = {
  books: PropTypes.shape({
    currentlyReading: PropTypes.array.isRequired,
    wantToRead: PropTypes.array.isRequired,
    read: PropTypes.array.isRequired,
  }).isRequired,
  onMoveBook: PropTypes.func.isRequired,
  onRemoveBook: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default withRouter(withStyles(styles)(Main));

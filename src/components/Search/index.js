import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/styles';

import Header from './Header';

import BookList from '../App/BookList';

import * as BooksAPI from '../../api/BooksAPI';

const styles = ({
  page: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  addIcon: {
    position: 'absolute',
    right: 55,
    bottom: 30,
  },
});

class Search extends PureComponent {
  constructor() {
    super();

    this.state = {
      books: [],
    };
  }

  searchBooks = async (query) => {
    const books = await BooksAPI.search(query);

    this.setState(() => ({
      books: (Array.isArray(books) ? books : []),
    }));
  }

  queryChange = (event) => {
    const { value } = event.target;
    this.searchBooks(value);
  }

  goBack = () => {
    const { history } = this.props;
    history.push('/');
  }

  render() {
    const { books } = this.state;
    const { onAddBook, classes } = this.props;

    return (
      <div>
        <Header
          onClickBack={this.goBack}
          onQueryChange={this.queryChange}
        />

        <div className={classes.page}>
          <BookList books={books} actionType="add" clickAction={onAddBook} />
        </div>
      </div>
    );
  }
}

Search.propTypes = {
  onAddBook: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default withRouter(withStyles(styles)(Search));

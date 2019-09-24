import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Route, withRouter } from 'react-router-dom';

import Main from '../Main';
import Search from '../Search';

import * as BooksAPI from '../../api/BooksAPI';

class App extends PureComponent {
  constructor() {
    super();

    this.state = {
      books: [],
      currentlyReading: [],
      wantToRead: [],
      read: [],
    };
  }

  componentDidMount() {
    this.getBooks();
  }

  getBooks = async () => {
    const books = await BooksAPI.getAll();

    const relations = books.reduce(
      (r, book) => {
        r[book.shelf] = r[book.shelf] || [];
        r[book.shelf].push(book.id);
        return r;
      },
      {},
    );

    this.setState(() => ({ books, ...relations }));
  }

  moveBook = async (oldBook, shelf) => {
    const book = { ...oldBook, shelf };

    this.setState((currentState) => ({
      books: currentState.books
        .filter((b) => b.id !== book.id)
        .concat([book]),
      [oldBook.shelf]: currentState[oldBook.shelf]
        .filter((id) => id !== book.id),
      [shelf]: currentState[shelf].concat([book.id]),
    }));

    await BooksAPI.update(book, shelf);
  }

  addBook = async (oldBook, shelf) => {
    const { history } = this.props;
    const book = { ...oldBook, shelf };

    this.setState((currentState) => ({
      books: currentState.books.concat([book]),
      [shelf]: currentState[shelf].concat([book.id]),
    }));

    history.push('/');

    await BooksAPI.update(book, shelf);
  }

  currentlyReading = () => {
    const { books, currentlyReading } = this.state;
    return books.filter((book) => currentlyReading.includes(book.id));
  }

  wantToRead = () => {
    const { books, wantToRead } = this.state;
    return books.filter((book) => wantToRead.includes(book.id));
  }

  read = () => {
    const { books, read } = this.state;
    return books.filter((book) => read.includes(book.id));
  }

  getBookListing = () => ({
    currentlyReading: this.currentlyReading(),
    wantToRead: this.wantToRead(),
    read: this.read(),
  })

  render() {
    const { books } = this.state;

    return (
      <div>
        <Route
          path="/"
          exact
          render={() => (
            <Main
              books={this.getBookListing()}
              onMoveBook={this.moveBook}
            />
          )}
        />

        <Route
          path="/search"
          render={() => (
            <Search
              books={books}
              onAddBook={this.addBook}
            />
          )}
        />
      </div>
    );
  }
}

App.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default withRouter(App);

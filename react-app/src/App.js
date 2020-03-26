import React, { Component } from "react";
import "./App.css";
import {
  getAllBooks,
  addLike,
  getAllLikes
} from "./helpers/booktonica-api-fetcher";
import BookCardList from "./components/BookCardList";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      likeCountsByBookId: {},
      currentUsername: "bill"
    };
    const getAllLikesAction = () => {
      getAllLikes().then(records => {
        const likeCountsByBookId = records.reduce((memo, record) => {
          memo[record.book_id] = record.like_count;
          return memo;
        }, {});
        this.setState({ likeCountsByBookId });
      });
    };
    const addLikeAction = book_id => addLike(book_id).then(getAllLikesAction);

    const getAllBooksAction = () =>
      getAllBooks().then(books => this.setState({ books: books }));
    this.actions = {
      addLike: addLikeAction,
      getAllLikes: getAllLikesAction,
      getAllBooks: getAllBooksAction
    };
  }

  componentDidMount() {
    this.actions.getAllBooks();
    this.actions.getAllLikes();
  }
  render() {
    const { books, likeCountsByBookId } = this.state;
    return (
      <div className="App">
        <small>Logged in as {this.state.currentUsername}</small>
        <BookCardList
          actions={this.actions}
          books={books}
          likeCountsByBookId={likeCountsByBookId}
        />
      </div>
    );
  }
}

export default App;

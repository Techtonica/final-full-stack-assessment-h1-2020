import React, { Component } from "react";
import "./App.css";
import {
  getAllBooks,
  addLike,
  getAllLikes,
  getUser
} from "./helpers/booktonica-api-fetcher";
import BookCardList from "./components/BookCardList";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      likeCountsByBookId: {},
      currentUsername: "zorro",
      currentUserData: {
        likedBookIds: []
      }
    };

    const getCurrentUserData = () => {
      return getUser(this.state.currentUsername).then(currentUserData => {
        this.setState({ currentUserData });
      });
    };
    const getAllLikesAction = () => {
      getAllLikes().then(records => {
        const likeCountsByBookId = records.reduce((accumulator, record) => {
          accumulator[record.book_id] = record.like_count;
          return accumulator;
        }, {});
        this.setState({ likeCountsByBookId });
      });
    };
    const addLikeAction = book_id =>
      addLike(book_id, this.state.currentUsername).then(() => {
        const newCount = (this.state.likeCountsByBookId[book_id] || 0) + 1;
        const updatedLikedBookIds = this.state.currentUserData.likedBookIds.concat(
          book_id
        );
        this.setState({
          likeCountsByBookId: { [book_id]: newCount },
          currentUserData: {
            likedBookIds: updatedLikedBookIds
          }
        });
      });

    const getAllBooksAction = () =>
      getAllBooks().then(books => this.setState({ books: books }));
    this.actions = {
      addLike: addLikeAction,
      getAllLikes: getAllLikesAction,
      getAllBooks: getAllBooksAction,
      getCurrentUserData
    };
  }

  componentDidMount() {
    this.actions
      .getCurrentUserData()
      .then(this.actions.getAllLikes)
      .then(this.actions.getAllBooks);
  }
  render() {
    const { books, likeCountsByBookId, currentUserData } = this.state;
    return (
      <div className="App">
        <small>Logged in as {this.state.currentUsername}</small>
        <BookCardList
          actions={this.actions}
          books={books}
          likeCountsByBookId={likeCountsByBookId}
          likedBookIds={currentUserData.likedBookIds}
        />
      </div>
    );
  }
}

export default App;

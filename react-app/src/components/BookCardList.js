import React, { Component } from "react";
import BookCard from "./BookCard";
import { Row } from "reactstrap";

class BookCardList extends Component {
  render() {
    const { books, actions, likeCountsByBookId, likedBookIds } = this.props;
    return (
      <Row>
        {books.map(book => (
          <BookCard
            actions={actions}
            key={book.book_id}
            book={book}
            likeCount={likeCountsByBookId[book.book_id]}
            isLiked={likedBookIds.includes(book.book_id)}
          />
        ))}
      </Row>
    );
  }
}

export default BookCardList;

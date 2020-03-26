import React, { Component } from "react";
import LikeButton from "./LikeButton";
import {
  Col,
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle
} from "reactstrap";

/**
 * Learn more about reactstrap Card component
 * https://reactstrap.github.io/components/card/
 */
class BookCard extends Component {
  render() {
    const { actions, likeCount, book } = this.props;
    const { book_id, cover_image_url, summary, title, author_name } = book;
    return (
      <Col xs="4">
        <Card>
          <CardImg
            className="bookCover"
            src={cover_image_url}
            alt="Book cover"
          />
          <CardBody>
            <CardTitle>{title}</CardTitle>
            <CardSubtitle>{author_name}</CardSubtitle>
            <LikeButton
              actions={actions}
              likeCount={likeCount}
              book_id={book_id}
            />
            <CardText>{summary}</CardText>
          </CardBody>
        </Card>
      </Col>
    );
  }
}

export default BookCard;

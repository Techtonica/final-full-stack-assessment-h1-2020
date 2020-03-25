import React, { Component } from "react";
import {
  Col,
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button
} from "reactstrap";

/**
 * Learn more about reactstrap Card component
 * https://reactstrap.github.io/components/card/
 */
class BookCard extends Component {
  render() {
    const {
      cover_image_url,
      summary,
      title,
      author_name,
      publication_date,
      like_count
    } = this.props.book;
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
            <Button>Like</Button>
            <CardText>
              <i>
                Liked {like_count} times. {publication_date}
              </i>{" "}
              - {summary}
            </CardText>
          </CardBody>
        </Card>
      </Col>
    );
  }
}

export default BookCard;

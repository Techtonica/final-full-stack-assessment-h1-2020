import React, { Component } from "react";
import { Button } from "reactstrap";

class LikeButton extends Component {
  render() {
    const { book_id, actions, likeCount } = this.props;
    return (
      <div>
        Liked {likeCount} times.
        <Button onClick={() => actions.addLike(book_id)}>Like</Button>
      </div>
    );
  }
}

export default LikeButton;

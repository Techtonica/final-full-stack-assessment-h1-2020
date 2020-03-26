import React, { Component } from "react";
import { Button } from "reactstrap";

class LikeButton extends Component {
  render() {
    const { book_id, actions, likeCount, isLiked } = this.props;
    return (
      <div>
        <small className="likeCount">{likeCount || 0} likes</small>
        <Button
          color={isLiked ? "success" : "primary"}
          disabled={isLiked}
          onClick={() => actions.addLike(book_id)}
        >
          {isLiked ? "Liked" : "Like"}
        </Button>
      </div>
    );
  }
}

export default LikeButton;

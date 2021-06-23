import React, { useState } from "react";
import { Button, Grid, Input } from "../elements";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as commentActions } from "../redux/modules/comment";

function CommentWrite({ post_id }) {
  const dispatch = useDispatch();
  const [commentText, setCommentText] = useState("");

  const handleChange = (e) => {
    setCommentText(e.target.value);
  };

  const write = () => {
    dispatch(commentActions.addCommentFB(post_id, commentText));
    setCommentText("");
  };

  return (
    <>
      <Grid is_flex>
        <Input
          placeholder="댓글 내용을 입력해주세요 :)"
          value={commentText}
          _onChange={handleChange}
          _onSubmit={write}
        />
        <Button width="fit-content" margin="0px 2px 0px 2px" _onClick={write}>
          작성
        </Button>
      </Grid>
    </>
  );
}

export default CommentWrite;

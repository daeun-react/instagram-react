import React, { useEffect } from "react";
import { Grid, Image, Text } from "../elements";

import { useSelector, useDispatch } from "react-redux";
import { actionCreators as commentActions } from "../redux/modules/comment";

function CommentList({ post_id }) {
  const dispatch = useDispatch();
  const comment_list = useSelector((state) => state.comment.list);

  useEffect(() => {
    if (!comment_list[post_id]) {
      dispatch(commentActions.getCommentFB(post_id));
    }
  }, []);

  if (!comment_list[post_id] || !post_id) {
    return null;
  }

  return (
    <Grid padding="16px">
      {comment_list[post_id].map((comment) => (
        <CommentItem key={comment.id} {...comment} />
      ))}
    </Grid>
  );
}

export default CommentList;

const CommentItem = (props) => {
  const { user_profile, user_name, user_id, post_id, contents, insert_dt } =
    props;
  return (
    <Grid is_flex>
      <Grid is_flex width="auto">
        <Image shape="circle" />
        <Text bold>{user_name}</Text>
      </Grid>
      <Grid is_flex margin="0px 4px">
        <Text margin="0px">{contents}</Text>
        <Text margin="0px">{insert_dt}</Text>
      </Grid>
    </Grid>
  );
};

CommentItem.defaultProps = {
  user_profile: "",
  user_name: "duboo",
  user_id: "",
  post_id: 1,
  contents: "귀여운 강아지네요!",
  insert_dt: "2021-01-01 19:00:00",
};

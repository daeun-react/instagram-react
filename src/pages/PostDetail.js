import React, { useEffect } from "react";
import Post from "../components/Post";
import CommentWrite from "../components/CommentWrite";
import CommentList from "../components/CommentList";

import { useSelector, useDispatch } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";
import Permit from "../shared/Permit";
import { Wrapper, WrapperCenter } from "../shared/Style";

function PostDetail(props) {
  const dispatch = useDispatch();
  const id = props.match.params.id;

  const user_info = useSelector((state) => state.user.user);
  const post_list = useSelector((state) => state.post.list);

  const post_idx = post_list.findIndex((p) => p.id === id);
  const post = post_list[post_idx];
  // console.log(post_idx, post);

  useEffect(() => {
    if (post) {
      return;
    }
    dispatch(postActions.getOnePostFB(id));
  }, [post, id, dispatch]);

  return (
    <Wrapper>
      <WrapperCenter width="50%">
        {post && (
          <Post {...post} is_me={post.user_info.user_id === user_info?.uid} />
        )}
        <Permit>
          <CommentWrite post_id={id} />
        </Permit>
        <CommentList post_id={id} />
      </WrapperCenter>
    </Wrapper>
  );
}

export default PostDetail;

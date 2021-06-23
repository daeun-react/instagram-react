import React, { useEffect, useState } from "react";
import Upload from "../shared/Upload";
import { Button, Grid, Image, Input, Text } from "../elements/index";
import { useSelector, useDispatch } from "react-redux";

import { history } from "../redux/configureStore";
import { actionCreators as PostActions } from "../redux/modules/post";
import { actionCreators as ImageActions } from "../redux/modules/image";
import { Wrapper, WrapperCenter } from "../shared/Style";

function PostWrite(props) {
  const dispatch = useDispatch();
  const is_login = useSelector((state) => state.user.is_login);
  const preview = useSelector((state) => state.image.preview);
  const post_list = useSelector((state) => state.post.list);

  const post_id = props.match.params.id;
  const is_edit = post_id ? true : false;
  const _post = is_edit ? post_list.find((p) => p.id === post_id) : null;

  const [contents, setContents] = useState(_post ? _post?.contents : "");
  useEffect(() => {
    if (is_edit && !_post) {
      console.log("앗! 해당 포스트 정보가 없습니다");
      history.goBack();
    }
    if (is_edit) {
      dispatch(ImageActions.setPreview(_post.image_url));
    }
  }, []);

  const changeContents = (e) => {
    setContents(e.target.value);
  };

  const addPost = () => {
    dispatch(PostActions.addPostFB(contents));
  };

  const editPost = () => {
    dispatch(PostActions.editPostFB(post_id, { contents: contents }));
  };

  if (!is_login) {
    return (
      <Grid margin="100px 0px" padding="16px" center>
        <Text size="32px" bold>
          앗!잠깐!
        </Text>
        <Text size="16px">로그인 후에만 글을 쓸 수 있어요!</Text>
        <Button
          _onClick={() => {
            history.replace("/login");
          }}
        >
          로그인 하러가기
        </Button>
      </Grid>
    );
  }

  return (
    <Wrapper>
      <WrapperCenter width="50%">
        <Grid>
          <Grid padding="8px 0px">
            <Text margin="0px" size="36px" bold>
              {is_edit ? "게시글 수정" : "게시글 작성"}
            </Text>
            <Upload />
          </Grid>

          <Grid padding="8px 0px">
            <Grid>
              <Text margin="0px" size="24px" bold>
                미리보기
              </Text>
            </Grid>

            <Image
              shape="rectangle"
              src={preview ? preview : "http://via.placeholder.com/400x300"}
            />
          </Grid>

          <Grid padding="8px 0px">
            <Input
              value={contents}
              _onChange={changeContents}
              label="게시글 내용"
              placeholder="게시글 작성"
              multiLine
            />
          </Grid>

          <Grid padding="8px 0px">
            {is_edit ? (
              <Button text="게시글 수정" _onClick={editPost}></Button>
            ) : (
              <Button text="게시글 작성" _onClick={addPost}></Button>
            )}
          </Grid>
        </Grid>
      </WrapperCenter>
    </Wrapper>
  );
}

export default PostWrite;

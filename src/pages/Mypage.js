import React, { useCallback, useState } from "react";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Text, Image, Button } from "../elements";
import { Wrapper, WrapperCenter } from "../shared/Style";
import { actionCreators as userActions } from "../redux/modules/user";
import { actionCreators as postActions } from "../redux/modules/post";

import { useEffect } from "react";
import PostCard from "../components/PostCard";
import { Row, Col } from "react-bootstrap";

import InfinityScroll from "../shared/InfinityScroll";

function Mypage() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  // const myPost = useSelector((state) => state.post.my_post_list);
  const {
    my_post_list: post_list,
    mypage_paging,
    is_loading,
  } = useSelector((state) => state.post);

  const profileRef = useRef();

  useEffect(() => {
    if (!user) {
      return;
    }
    dispatch(postActions.getPostByIdFB(user.uid));
  }, [user, dispatch]);

  const changeProfileInput = () => {
    const image = profileRef.current.files[0];
    if (!image) {
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onloadend = () => {
      dispatch(userActions.updateProfileFB(reader.result));
    };
  };

  const changeProfile = () => {
    profileRef.current.click();
  };

  const renderCards = () => {
    return (
      post_list &&
      post_list.map((post) => (
        <Col key={post.id}>
          <PostCard {...post} />
        </Col>
      ))
    );
  };

  return (
    <Wrapper>
      <WrapperCenter width="60%">
        <input
          type="file"
          ref={profileRef}
          onChange={changeProfileInput}
          style={{ display: "none" }}
        />

        <Grid is_flex justify_content="flex-start" border>
          <Grid padding="32px" margin="16px" width="auto">
            <Image
              src={user?.user_profile}
              size={150}
              _onClick={changeProfile}
            />
          </Grid>
          <Grid>
            <Text size="32px">{user?.user_name}</Text>
            <Text size="20px">{user?.id}</Text>
            <Button _onClick={changeProfile} width="fit-content">
              프로필 사진 바꾸기
            </Button>
          </Grid>
        </Grid>

        <Grid>
          <InfinityScroll
            callNext={() => {
              dispatch(postActions.getPostByIdFB(user.uid, mypage_paging.next));
            }}
            is_next={mypage_paging.next ? true : false}
            loading={is_loading}
          >
            <Row lg={3} md={2} xs={1}>
              {renderCards()}
            </Row>
          </InfinityScroll>
        </Grid>
      </WrapperCenter>
    </Wrapper>
  );
}

export default Mypage;

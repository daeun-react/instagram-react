import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Post from "../components/Post";
import { Button, Grid, Text } from "../elements";
import { actionCreators as postActions } from "../redux/modules/post";
import { history } from "../redux/configureStore";
import InfinityScroll from "../shared/InfinityScroll";
import { Wrapper, WrapperCenter } from "../shared/Style";
import { Container, Row, Col, Card } from "react-bootstrap";
import PostCard from "../components/PostCard";
import { ToastContainer } from "react-toastify";

function PostList(props) {
  const dispatch = useDispatch();

  const {
    list: post_list,
    paging,
    is_loading,
  } = useSelector((state) => state.post);

  useEffect(() => {
    if (post_list.length < 2) {
      dispatch(postActions.getPostFB());
    }
  }, [dispatch, post_list.length]);

  // const loadMoreClick = () => {
  //   dispatch(postActions.getPostFB(paging.next));
  // };

  if (post_list?.length === 0) {
    return (
      <Wrapper>
        <WrapperCenter>
          <Text size="28px">앗 ! 등록된 포스트가 없습니다.</Text>
        </WrapperCenter>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      {/* <WrapperCenter width="60%"> */}
      <ToastContainer />

      <InfinityScroll
        callNext={() => {
          dispatch(postActions.getPostFB(paging.next));
        }}
        is_next={paging.next ? true : false}
        loading={is_loading}
      >
        <Container>
          <Row lg={3} md={2} xs={1}>
            {post_list.map((p) => {
              return (
                <Col key={p.id}>
                  <PostCard
                    {...p}
                    _onClick={() => {
                      history.push(`/post/${p.id}`);
                    }}
                  />
                </Col>
              );
            })}
            {/* <Button _onClick={loadMoreClick}>LOAD MORE</Button> */}
          </Row>
        </Container>
      </InfinityScroll>
      {/* </WrapperCenter> */}
    </Wrapper>
  );
}

export default PostList;

import moment from "moment";
import React from "react";
import { Card } from "react-bootstrap";
import { Grid, Image, Text, Button } from "../elements";
import { history } from "../redux/configureStore";

function PostCard(props) {
  return (
    <Grid padding="8px 0px" _onClick={props._onClick}>
      <Card>
        {/* Header */}
        <Card.Header>
          <Grid is_flex>
            <Grid is_flex width="auto">
              <Image shape="circle" src={props.user_info.user_profile} />
              <Text bold>{props.user_info.user_name}</Text>
            </Grid>
            <Grid is_flex width="auto">
              <Text>{moment(props.insert_dt).fromNow()}</Text>
              {props.is_me && (
                <Button
                  width="auto"
                  margin="4px"
                  padding="4px"
                  _onClick={() => {
                    history.push(`/write/${props.id}`);
                  }}
                >
                  수정
                </Button>
              )}
            </Grid>
          </Grid>
        </Card.Header>

        {/* Body - Text */}
        <Card.Body>
          <Text overflowHidden>{props.contents}</Text>
        </Card.Body>

        {/* Body - IMAGE */}
        <Card.Img variant="bottom" src={props.image_url} />

        {/* FOOTER */}
        <Card.Footer>
          <Text bold>댓글 {props.comment_cnt}개</Text>
        </Card.Footer>
      </Card>
    </Grid>
  );
}

PostCard.defaultProps = {
  user_info: {
    user_name: "daeun.lee",
    user_profile:
      "https://firebasestorage.googleapis.com/v0/b/image-community-955f8.appspot.com/o/109530515_140381271035518_8397330293062530983_n.jpg?alt=media&token=a06bc0da-ec6b-47a1-b86a-275b4465fa8d",
  },
  image_url:
    "https://firebasestorage.googleapis.com/v0/b/image-community-955f8.appspot.com/o/109530515_140381271035518_8397330293062530983_n.jpg?alt=media&token=a06bc0da-ec6b-47a1-b86a-275b4465fa8d",
  contents: "duboo.2020 인스타 따라하기",
  comment_cnt: 10,
  insert_dt: "2021-02-27 10:00:00",
  is_me: false,
  _onClick: () => {},
};

export default PostCard;

import React from "react";
import { Grid, Image, Text } from "../elements";

function Card(props) {
  const { image_url, user_name, post_id } = props;
  return (
    <Grid padding="16px" is_flex>
      <Grid width="auto" margin="0px 8px 0px 0px">
        <Image size={85} shape="square" src={image_url} />
      </Grid>
      <Grid>
        <Text>
          <b>{user_name}</b>님이 게시글에 댓글을 남겼습니다! :)
        </Text>
      </Grid>
    </Grid>
  );
}

Card.defaultProps = {
  image_url: "",
  user_name: "",
  post_id: null,
};

export default Card;

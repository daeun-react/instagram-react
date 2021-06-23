import React, { useEffect, useState } from "react";
import { Grid, Text, Image } from "../elements";
import Card from "../components/Card";
import { realtime } from "../shared/firebase";
import { useSelector } from "react-redux";
import { history } from "../redux/configureStore";
import { Wrapper, WrapperCenter } from "../shared/Style";

function Notification() {
  const user = useSelector((state) => state.user.user);
  const [noti, setNoti] = useState([]);

  useEffect(() => {
    if (!user) {
      return;
    }

    const notiDB = realtime.ref(`noti/${user.uid}/list`);
    const _noti = notiDB.orderByChild("insert_dt");
    //realtime database는 내림차순 지원하지 않음,
    //오름차순으로 가져와서 자바스크립트에서 역순으로 만들면됨..

    _noti.once("value", (snapshot) => {
      if (snapshot.exists()) {
        let _data = snapshot.val();

        let _noti_list = Object.keys(_data)
          .reverse()
          .map((s) => {
            return _data[s];
          });

        // let _data_reverse = Object.keys(_data).reverse();
        // console.log(_data, _data_reverse, _noti_list);
        setNoti(_noti_list);
      }
    });
  }, [user]);

  return (
    <Wrapper justifyContent="flex-start">
      <Text margin="16px" size="16px" bold>
        새로운 댓글알림
      </Text>
      <WrapperCenter width="50%" borderColor="#D8D8D8">
        {noti.map((n, idx) => {
          return (
            <Grid
              is_hover
              bg="white"
              key={`noti_${idx}`}
              _onClick={() => {
                history.push(`post/${n.post_id}`);
              }}
            >
              <Card {...n} />
            </Grid>
          );
        })}
      </WrapperCenter>
    </Wrapper>
  );
}

export default Notification;

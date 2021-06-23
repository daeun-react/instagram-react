import React, { useEffect } from "react";
import { Badge } from "@material-ui/core";
import NotificationsIcon from "@material-ui/icons/Notifications";

import { realtime } from "../shared/firebase";
import { useSelector } from "react-redux";
import { Grid } from "../elements";

function NotiBadge(props) {
  const user_id = useSelector((state) => state.user.user.uid);
  const [is_read, setIsRead] = React.useState(true);
  const notiCheck = () => {
    const notiDB = realtime.ref(`noti/${user_id}`);
    notiDB.update({ read: true });
    props._onClick();
  };

  useEffect(() => {
    if (!user_id) {
      return;
    }
    const notiDB = realtime.ref(`noti/${user_id}`);
    notiDB.on("value", (snapshot) => {
      setIsRead(snapshot?.val()?.read);
    });

    return () => notiDB.off();
  }, []);

  return (
    <Grid cursorType="pointer" width="auto">
      <Badge
        color="secondary"
        variant="dot"
        invisible={is_read}
        onClick={notiCheck}
      >
        <NotificationsIcon />
      </Badge>
    </Grid>
  );
}

NotiBadge.defaultProps = {
  _onClick: () => {},
};

export default NotiBadge;

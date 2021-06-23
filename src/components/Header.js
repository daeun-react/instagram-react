import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

import NotiBadge from "./NotiBadge";
import { Button, Grid, Text } from "../elements";

import { apiKey } from "../shared/firebase";
import { history } from "../redux/configureStore";
import { actionCreators as userActions } from "../redux/modules/user";


function Header() {
  const dispatch = useDispatch();
  const is_login = useSelector((state) => state.user.is_login);

  const _session_key = `firebase:authUser:${apiKey}:[DEFAULT]`;
  const is_session = sessionStorage.getItem(_session_key) ? true : false;

  const headerName = (
    <span role="img" aria-label="writing hand">
      PHOTO🐶
    </span>
  );

  if (is_login && is_session) {
    return (
      <Grid is_flex border padding="4px 16px">
        <Grid _onClick={() => history.push("/")}>
          <Text margin="0px" size="24px" bold>
            {headerName}
          </Text>
        </Grid>

        <Grid is_flex justify_content="flex-end">
          <Button
            bg="white"
            width="fit-content"
            margin="0px 16px 0px 0px"
            text="내정보"
            _onClick={() => {
              history.push("/mypage");
            }}
          />

          <Button
            bg="white"
            width="fit-content"
            margin="0px 16px 0px 0px"
            text="로그아웃"
            _onClick={() => {
              dispatch(userActions.logoutFB());
            }}
          />

          <NotiBadge
            _onClick={() => {
              history.push("/noti");
            }}
          />
        </Grid>
      </Grid>
    );
  }

  return (
    <Grid is_flex border padding="4px 16px">
      <Grid _onClick={() => history.push("/")}>
        <Text margin="0px" size="24px" bold>
          {headerName}
        </Text>
      </Grid>

      <Grid is_flex justify_content="flex-end">
        <Button
          bg="white"
          width="fit-content"
          margin="0px 16px 0px 0px"
          text="로그인"
          _onClick={() => {
            history.push("/login");
          }}
        />
        <Button
          bg="white"
          width="fit-content"
          text="회원가입"
          _onClick={() => {
            history.push("/signup");
          }}
        />
      </Grid>
    </Grid>
  );
}

export default Header;

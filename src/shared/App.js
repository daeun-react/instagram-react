import React, { useEffect, Suspense, lazy } from "react";
import { Route } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { history } from "../redux/configureStore";

import { useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
import { apiKey } from "./firebase";

import Header from "../components/Header";
import Permit from "./Permit";
import { Button, Grid } from "../elements";
// import {
//   Login,
//   Mypage,
//   Notification,
//   PostDetail,
//   PostList,
//   PostWrite,
//   Signup,
// } from "../pages";

const Login = lazy(() => import("../pages/Login"));
const Mypage = lazy(() => import("../pages/Mypage"));
const Notification = lazy(() => import("../pages/Notification"));
const PostDetail = lazy(() => import("../pages/PostDetail"));
const PostList = lazy(() => import("../pages/PostList"));
const PostWrite = lazy(() => import("../pages/PostWrite"));
const Signup = lazy(() => import("../pages/Signup"));

function App(props) {
  const dispatch = useDispatch();
  const _session_key = `firebase:authUser:${apiKey}:[DEFAULT]`;
  const is_session = sessionStorage.getItem(_session_key) ? true : false;

  /*
   * 로그인 유지하기
   * - 세션에 로그인 정보 저장
   * - 위치에 따른 페이지 분기
   */

  useEffect(() => {
    if (is_session) {
      dispatch(userActions.loginCheckFB());
    } else {
      const page =
        history.location.pathname === "/"
          ? "/login"
          : history.location.pathname;
      history.push(page);
    }
  }, [dispatch, is_session]);

  return (
    <>
      <Grid>
        <Header />
        <ConnectedRouter history={history}>
          <Suspense fallback={<div>로딩중....</div>}>
            <Route path="/" exact component={PostList} />
            <Route path="/login" exact component={Login} />
            <Route path="/signup" exact component={Signup} />
            <Route path="/write" exact component={PostWrite} />
            <Route path="/write/:id" exact component={PostWrite} />
            <Route path="/post/:id" exact component={PostDetail} />
            <Route path="/noti" exact component={Notification} />
            <Route path="/mypage" exact component={Mypage} />
          </Suspense>
        </ConnectedRouter>
      </Grid>

      {/* Write 페이지는 로그인 권한이 있는 유저에게만 보여짐(Permit) */}
      <Permit>
        <Button
          is_float
          text="+"
          _onClick={() => {
            history.push("/write");
          }}
        ></Button>
      </Permit>
    </>
  );
}

export default App;

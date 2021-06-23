import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { deleteCookie, setCookie } from "../../shared/Cookie";

import firebase from "firebase/app";
import { auth, firestore, realtime, storage } from "../../shared/firebase";
import gravatar from "gravatar";
import { actionCreators as postActions } from "./post";
import { toast } from "react-toastify";

// [[ action-type ]]
const LOG_IN = "LOG_IN";
const LOG_OUT = "LOG_OUT";
const GET_USER = "GET_USER";
const SET_USER = "SET_USER";
const LOGIN_ERROR = "LOGIN_ERROR";
const SIGNUP_ERROR = "SIGNUP_ERROR";
// [[ action-function ]]
// (1. 기존)
// const logIn = (user) => {
//   return {
//     type: LOG_IN,
//     user,
//   };
// };
// (2. redux-actions 사용)
const logIn = createAction(LOG_IN, (user) => user);
const logOut = createAction(LOG_OUT);
const getUser = createAction(GET_USER, (user) => user);
const setUser = createAction(SET_USER, (user) => user);
const loginError = createAction(LOGIN_ERROR);
const signupError = createAction(SIGNUP_ERROR);

// [[ initialState ]]
const initialState = {
  user: null,
  is_login: false,
  login_error: false,
};

// [[ middleware actions ]]
const loginAction = (user) => {
  return function (dispatch, getState, { history }) {
    dispatch(logIn(user));
    history.push("/");
  };
};

export const updateProfileFB = (imageStr) => {
  return function (dispatch, getState, { history }) {
    // console.log(auth.currentUser);
    // console.log(imageStr);
    const _user = getState().user.user;
    const _post = getState().post;

    const _upload = storage
      .ref(`images/profile/${_user.user_id}_${new Date().getTime()}`)
      .putString(imageStr, "data_url");

    _upload.then((snapshot) => {
      snapshot.ref
        .getDownloadURL()
        .then((url) => {
          return url;
        })
        .then((url) => {
          auth.currentUser
            .updateProfile({
              photoURL: url,
            })
            .then(() => {
              dispatch(
                setUser({
                  user_name: _user.user_name,
                  id: _user.id,
                  user_profile: url,
                  uid: _user.uid,
                })
              );

              const postDB = firestore.collection("post");
              postDB
                .where("user_id", "==", _user.uid)
                .get()
                .then((docs) => {
                  docs.forEach((doc) => {
                    postDB.doc(doc.id).update({ user_profile: url });
                  });
                  dispatch(postActions.getPostByIdFB(_user.uid));
                })
                .catch((err) => {
                  window.alert("앗! 프로필 이미지 수정에 문제가 있어요!");
                  console.log("앗! 프로필 이미지 수정에 문제가 있어요!", err);
                });
            })
            .catch((error) => {
              var errorCode = error.code;
              var errorMessage = error.message;
              console.log(errorCode, errorMessage);
            });
        })
        .catch((err) => {
          window.alert("앗! 이미지 업로드에 문제가 있어요!");
          console.log("앗! 이미지 업로드에 문제가 있어요!", err);
        });
    });
  };
};

export const signupFB = (id, pwd, user_name) => {
  return function (dispatch, getState, { history }) {
    auth
      .createUserWithEmailAndPassword(id, pwd)
      .then((user) => {
        auth.currentUser
          .updateProfile({
            displayName: user_name,
            photoURL: gravatar.url(id, { s: "24px", d: "retro" }),
          })
          .then(() => {
            // dispatch(
            //   setUser({
            //     user_name: user_name,
            //     id: id,
            //     user_profile: "",
            //     uid: user.user.uid,
            //   })
            // );
            dispatch(loginFB(id, pwd, true));
            console.log(user.user.uid);
            const notiDB = realtime.ref(`noti/${user.user.uid}`);
            notiDB.update({ read: true });

            // history.push("/");
          })
          .catch((err) => console.log(err));
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode.indexOf("auth/email-already-in-use") > -1) {
          dispatch(signupError());
        }
        console.log(errorCode, errorMessage);
      });
  };
};

const loginFB = (id, pwd, signup = false) => {
  return function (dispatch, getState, { history }) {
    auth.setPersistence(firebase.auth.Auth.Persistence.SESSION).then((res) => {
      auth
        .signInWithEmailAndPassword(id, pwd)
        .then((user) => {
          // console.log(user);

          dispatch(
            setUser({
              user_name: user.user.displayName,
              id: id,
              user_profile: user.user.photoURL,
              uid: user.user.uid,
            })
          );
          history.push("/");

          toast.success(
            signup ? "회원가입 되었습니다." : "로그인 되었습니다.",
            {
              position: "top-right",
              autoClose: 1000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            }
          );
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          dispatch(loginError());
          console.log(errorCode, errorMessage);
        });
    });
  };
};

/*
 * 로그인 유지를 위한 체크함수
 */
const loginCheckFB = () => {
  return function (dispatch, getState, { history }) {
    auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(
          setUser({
            user_name: user.displayName,
            user_profile: user.photoURL,
            id: user.email,
            uid: user.uid,
          })
        );
      } else {
        dispatch(logOut());
      }
    });
  };
};

/*
 * 로그아웃 함수
 */
const logoutFB = () => {
  return function (dispatch, getState, { history }) {
    auth.signOut().then(() => {
      dispatch(logOut());
      history.replace("/login");
    });
  };
};

export default handleActions(
  {
    [LOG_IN]: (state, action) =>
      produce(state, (draft) => {
        setCookie("is_login", "success");
        draft.user = action.payload.user;
        draft.is_login = true;
        draft.login_error = false;
        draft.signup_error = false;
      }),
    [LOG_OUT]: (state, action) =>
      produce(state, (draft) => {
        deleteCookie("is_login");
        draft.user = null;
        draft.is_login = false;
      }),
    [GET_USER]: (state, action) => produce(state, (draft) => {}),
    [SET_USER]: (state, action) =>
      produce(state, (draft) => {
        setCookie("is_login", "success");
        draft.user = action.payload.user;
        draft.is_login = true;
        draft.login_error = false;
        draft.signup_error = false;
      }),
    [LOGIN_ERROR]: (state, action) =>
      produce(state, (draft) => {
        draft.login_error = true;
      }),
    [SIGNUP_ERROR]: (state, action) =>
      produce(state, (draft) => {
        draft.signup_error = true;
      }),
  },
  initialState
);

const actionCreators = {
  logIn,
  logOut,
  getUser,
  loginAction,
  signupFB,
  loginFB,
  logoutFB,
  loginCheckFB,
  updateProfileFB,
};

export { actionCreators };

import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { firestore, storage } from "../../shared/firebase";
import moment from "moment";
import { actionCreators as imageActions } from "./image";

const SHOW_POST = "SHOW_POST";
const SHOW_MY_POST = "SHOW_MY_POST";
const ADD_POST = "ADD_POST";
const EDIT_POST = "EDIT_POST";
const LOADING = "LOADING";
const CHANGE_POST_PROFILE = "CHANGE_POST_PROFILE";

const showPost = createAction(SHOW_POST, (post_list, paging) => ({
  post_list,
  paging,
}));

const showMyPost = createAction(SHOW_MY_POST, (my_post_list, paging) => ({
  my_post_list,
  paging,
}));

const addPost = createAction(ADD_POST, (post) => ({ post }));
const editPost = createAction(EDIT_POST, (post_id, post) => ({
  post_id,
  post,
}));
const loading = createAction(LOADING, (is_loading) => ({ is_loading }));
const changePostProfile = createAction(CHANGE_POST_PROFILE, (uid, url) => ({
  uid,
  url,
}));

const initialPost = {
  // id: 0,
  // user_info: {
  //   user_name: "mean0",
  //   user_profile: "https://mean0images.s3.ap-northeast-2.amazonaws.com/4.jpeg",
  // },
  image_url:
    "https://firebasestorage.googleapis.com/v0/b/image-community-955f8.appspot.com/o/109530515_140381271035518_8397330293062530983_n.jpg?alt=media&token=a06bc0da-ec6b-47a1-b86a-275b4465fa8d",
  contents: "",
  comment_cnt: 0,
  insert_dt: moment().format("YYYY-MM-DD HH:mm:ss"),
};

const getPostFB = (start = null, size = 6) => {
  return function (dispatch, getState, { history }) {
    const _paging = getState().post.paging;
    if (_paging.start && !_paging.next) {
      return;
    }
    dispatch(loading(true));

    const postDB = firestore.collection("post");
    let query = postDB.orderBy("insert_dt", "desc");

    if (start) {
      query = query.startAt(start);
    }

    query
      .limit(size + 1)
      .get()
      .then((docs) => {
        let post_list = [];

        let paging = {
          start: docs.docs[0],
          next:
            docs.docs.length === size + 1
              ? docs.docs[docs.docs.length - 1]
              : null,
          size: size,
        };

        docs.forEach((doc) => {
          let _post = doc.data();
          const post = Object.keys(_post).reduce(
            (acc, cur) => {
              if (cur.indexOf("user_") > -1) {
                return {
                  ...acc,
                  user_info: { ...acc.user_info, [cur]: _post[cur] },
                };
              } else {
                return {
                  ...acc,
                  [cur]: _post[cur],
                };
              }
            },
            { id: doc.id, user_info: {} }
          );
          post_list.push(post);
        });

        if (paging.next !== null) {
          post_list.pop();
        }
        // console.log(post_list);
        dispatch(showPost(post_list, paging));
      })
      .catch((err) => {
        window.alert("앗! 포스트 불러오기에 문제가 있어요!");
        console.log("앗! 포스트 불러오기에 문제가 있어요!", err);
      });
  };
};

const getOnePostFB = (id) => {
  return function (dispatch, getState, { history }) {
    const postDB = firestore.collection("post");

    postDB
      .doc(id)
      .get()
      .then((doc) => {
        const _post = doc.data();
        const post = Object.keys(_post).reduce(
          (acc, cur) => {
            if (cur.indexOf("user_") > -1) {
              return {
                ...acc,
                user_info: { ...acc.user_info, [cur]: _post[cur] },
              };
            }
            return { ...acc, [cur]: _post[cur] };
          },
          {
            id: doc.id,
            user_info: {},
          }
        );

        dispatch(showPost([post]));
      });
  };
};

const getPostByIdFB = (uid, start = null, size = 6) => {
  return function (dispatch, getState, { history }) {
    const postDB = firestore.collection("post");
    dispatch(loading());

    let query = postDB.where("user_id", "==", uid).orderBy("insert_dt", "desc");

    if (start) {
      query = query.startAt(start);
    }

    query
      .limit(size + 1)
      .get()
      .then((docs) => {
        const my_post_list = [];

        let paging = {
          start: docs.docs[0],
          next:
            docs.docs.length === size + 1
              ? docs.docs[docs.docs.length - 1]
              : null,
          size: size,
        };

        docs.forEach((doc) => {
          let _post = doc.data();
          const post = Object.keys(_post).reduce(
            (acc, cur) => {
              if (cur.indexOf("user_") > -1) {
                return {
                  ...acc,
                  user_info: { ...acc.user_info, [cur]: _post[cur] },
                };
              } else {
                return {
                  ...acc,
                  [cur]: _post[cur],
                };
              }
            },
            { id: doc.id, user_info: {} }
          );
          my_post_list.push(post);
        });

        if (paging.next !== null) {
          my_post_list.pop();
        }

        dispatch(showMyPost(my_post_list, paging));
      });
  };
};

const addPostFB = (contents = "") => {
  return function (dispatch, getState, { history }) {
    const postDB = firestore.collection("post");

    const _user = getState().user.user;

    const user_info = {
      user_name: _user.user_name,
      user_id: _user.uid,
      user_profile: _user.user_profile,
    };

    const _post = {
      ...initialPost,
      contents: contents,
      insert_dt: moment().format("YYYY-MM-DD HH:mm:ss"),
    };

    // console.log(_post);

    const _image = getState().image.preview;
    const _upload = storage
      .ref(`images/${user_info.user_id}_${new Date().getTime()}`)
      .putString(_image, "data_url");

    _upload.then((snapshot) => {
      snapshot.ref
        .getDownloadURL()
        .then((url) => {
          return url;
        })
        .then((url) => {
          postDB
            .add({ ...user_info, ..._post, image_url: url })
            .then((doc) => {
              let post = { user_info, ..._post, id: doc.id, image_url: url };
              dispatch(addPost(post));
              history.replace("/");
              dispatch(imageActions.setPreview(null));
            })
            .catch((err) => {
              window.alert("앗! 포스트 작성에 문제가 있어요!");
              console.log("앗! 포스트 작성에 문제가 있어요!", err);
            });
        })
        .catch((err) => {
          window.alert("앗! 이미지 업로드에 문제가 있어요!");
          console.log("앗! 이미지 업로드에 문제가 있어요!", err);
        });
    });
  };
};

const editPostFB = (post_id = null, post = {}) => {
  return function (dispatch, getState, { history }) {
    if (!post_id) return;

    const _image = getState().image.preview;
    const _post_idx = getState().post.list.findIndex((p) => p.id === post_id);
    const _post = getState().post.list[_post_idx];
    const user_id = getState().user.user.uid;

    const postDB = firestore.collection("post");
    if (_image === _post.image_url) {
      postDB
        .doc(post_id)
        .update(post)
        .then((doc) => dispatch(editPost(post_id, { ...post })));
      history.replace("/");
    } else {
      const _upload = storage
        .ref(`images/${user_id}_${new Date().getTime()}`)
        .putString(_image, "data_url");

      _upload.then((snapshot) => {
        snapshot.ref
          .getDownloadURL()
          .then((url) => {
            // console.log(url);
            return url;
          })
          .then((url) => {
            postDB
              .doc(post_id)
              .update({ ...post, image_url: url })
              .then((doc) => {
                dispatch(editPost(post_id, { ...post, image_url: url }));
                history.replace("/");
              });
          })
          .catch((err) => {
            window.alert("앗! 포스트 수정에 문제가 있어요!");
            console.log("앗! 포스트 수정에 문제가 있어요!", err);
          });
      });
    }
  };
};

const initialState = {
  list: [],
  paging: { start: null, next: null, size: 6 },
  my_post_list: [],
  mypage_paging: { start: null, next: null, size: 6 },
  is_loading: true,
};

const reducer = handleActions(
  {
    [SHOW_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list.push(...action.payload.post_list);

        // 혹시 모를 중복제거
        draft.list = draft.list.reduce((acc, cur) => {
          if (acc.findIndex((a) => a.id === cur.id) === -1) {
            return [...acc, cur];
          } else {
            acc[acc.findIndex((a) => a.id === cur.id)] = cur;
            return acc;
          }
        }, []);

        if (action.payload.paging) {
          draft.paging = action.payload.paging;
        }

        draft.is_loading = false;
      }),
    [SHOW_MY_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.my_post_list.push(...action.payload.my_post_list);

        draft.my_post_list = draft.my_post_list.reduce((acc, cur) => {
          if (acc.findIndex((a) => a.id === cur.id) === -1) {
            return [...acc, cur];
          } else {
            acc[acc.findIndex((a) => a.id === cur.id)] = cur;
            return acc;
          }
        }, []);

        if (action.payload.paging) {
          draft.mypage_paging = action.payload.paging;
        }

        draft.is_loading = false;
      }),

    [ADD_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list.unshift(action.payload.post);
      }),
    [EDIT_POST]: (state, action) =>
      produce(state, (draft) => {
        let idx = draft.list.findIndex((p) => p.id === action.payload.post_id);
        draft.list[idx] = { ...draft.list[idx], ...action.payload.post };
      }),
    [LOADING]: (state, action) =>
      produce(state, (draft) => {
        draft.is_loading = action.payload.is_loading;
      }),
    [CHANGE_POST_PROFILE]: (state, action) =>
      produce(state, (draft) => {
        draft.my_post_list = draft.my_post_list.map((list) =>
          list.user_info.user_id === action.payload.uid
            ? {
                ...list,
                user_info: {
                  ...list.user_info,
                  user_profile: action.payload.url,
                },
              }
            : list
        );
      }),
  },
  initialState
);
export default reducer;

const actionCreators = {
  addPostFB,
  getOnePostFB,
  getPostByIdFB,
  getPostFB,
  editPostFB,
  editPost,
  changePostProfile,
};

export { actionCreators };

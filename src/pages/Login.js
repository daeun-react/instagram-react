import React from "react";
import { Text, Grid, Button } from "../elements";
import { Wrapper, WrapperCenter, inputStyle } from "../shared/Style";
import { actionCreators as userActions } from "../redux/modules/user";

import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

function Login() {
  const dispatch = useDispatch();
  const login_error = useSelector((state) => state.user.login_error);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = (data) => {
    dispatch(userActions.loginFB(data.email, data.password));
  };

  return (
    <Wrapper>
      <WrapperCenter>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Text size="32px" bold>
            로그인
          </Text>

          <Grid padding="16px 0px">
            <Text margin="0px">이메일</Text>
            <input
              name="email"
              label="이메일"
              placeholder="이메일을 입력해주세요."
              style={inputStyle}
              {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
            />
            {errors.email && errors.email.type === "required" && (
              <Text margin="0px" error>
                이메일을 입력해주세요.
              </Text>
            )}
            {errors.email && errors.email.type === "pattern" && (
              <Text margin="0px" error>
                이메일 입력 형식을 확인해주세요.
              </Text>
            )}
          </Grid>

          <Grid padding="16px 0px">
            <Text margin="0px">패스워드</Text>
            <input
              name="password"
              type="password"
              label="패스워드"
              placeholder="패스워드를 입력해주세요."
              autoComplete="off"
              style={inputStyle}
              {...register("password", { required: true, minLength: 6 })}
            />

            {errors.password && errors.password.type === "required" && (
              <Text margin="0px" error>
                패스워드를 입력해주세요.
              </Text>
            )}

            {errors.password && errors.password.type === "minLength" && (
              <Text margin="0px" error>
                패스워드 값은 6글자 이상 입력해주세요.
              </Text>
            )}
          </Grid>

          {login_error && (
            <Text margin="0px" error>
              이메일 또는 패스워드를 다시 한 번 확인해주세요.
            </Text>
          )}

          <Button bg="#868B8E" text="로그인하기" type="submit"></Button>

          <Link to="/signup" style={{ textDecoration: "none" }}>
            <Text color="#bf1650" bold>
              아직 아이디가 없다면...
            </Text>
          </Link>
        </form>
      </WrapperCenter>
    </Wrapper>
  );
}

export default Login;

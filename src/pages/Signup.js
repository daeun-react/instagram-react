import React, { useCallback, useRef, useState } from "react";
import { Button, Grid, Input, Text } from "../elements";
import { Wrapper, WrapperCenter, inputStyle } from "../shared/Style";

import { useDispatch, useSelector } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
import { emailCheck } from "../shared/common";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

function Signup() {
  const dispatch = useDispatch();
  const signup_error = useSelector((state) => state.user.signup_error);

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm();

  //   console.log(watch("password"), watch("password_confirm"));
  const passwordRef = useRef();
  passwordRef.current = watch("password");

  const onSubmit = (data) => {
    const { email, nickname, password } = data;
    dispatch(userActions.signupFB(email, password, nickname));
  };

  return (
    <Wrapper>
      <WrapperCenter>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Text size="32px" bold>
            회원가입
          </Text>

          <Grid padding="16px 0px">
            <input
              name="email"
              style={inputStyle}
              placeholder="이메일을 입력해주세요."
              {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
            />
            {errors.email && errors.email.type === "required" && (
              <Text margin="0px" error>
                이메일 값을 입력해주세요.
              </Text>
            )}

            {errors.email && errors.email.type === "pattern" && (
              <Text margin="0px" error>
                이메일 형식을 확인해주세요.
              </Text>
            )}
          </Grid>

          <Grid padding="16px 0px">
            <input
              name="nickname"
              style={inputStyle}
              placeholder="닉네임을 입력해주세요."
              {...register("nickname", { required: true, maxLength: 10 })}
            />

            {errors.nickname && errors.nickname.type === "required" && (
              <Text margin="0px" error>
                닉네임 값을 입력해주세요.
              </Text>
            )}

            {errors.nickname && errors.nickname.type === "maxLength" && (
              <Text margin="0px" error>
                닉네임은 최대 10자 까지만 입력 가능합니다.
              </Text>
            )}
          </Grid>

          <Grid padding="16px 0px">
            <input
              name="password"
              type="password"
              style={inputStyle}
              autoComplete="off"
              placeholder="패스워드를 입력해주세요."
              {...register("password", { required: true, minLength: 6 })}
            />

            {errors.password && errors.password.type === "required" && (
              <Text margin="0px" error>
                패스워드 값을 입력해주세요.
              </Text>
            )}

            {errors.password && errors.password.type === "minLength" && (
              <Text margin="0px" error>
                패스워드는 최소 6글자 이상 입력해주세요.
              </Text>
            )}
          </Grid>

          <Grid padding="16px 0px">
            <input
              name="password_confirm"
              type="password"
              style={inputStyle}
              autoComplete="off"
              placeholder="패스워드 확인을 입력해주세요."
              {...register("password_confirm", {
                required: true,
                minLength: 6,
                validate: (value) => value === passwordRef.current,
              })}
            />

            {errors.password_confirm &&
              errors.password_confirm.type === "required" && (
                <Text margin="0px" error>
                  패스워드 확인 값을 입력해주세요.
                </Text>
              )}

            {errors.password_confirm &&
              errors.password_confirm.type === "minLength" && (
                <Text margin="0px" error>
                  패스워드 확인 값은 최소 6글자 이상 입력해주세요.
                </Text>
              )}

            {errors.password_confirm &&
              errors.password_confirm.type === "validate" && (
                <Text margin="0px" error>
                  입력하신 패스워드와 일치하지 않습니다.
                </Text>
              )}
          </Grid>

          {signup_error && (
            <Text margin="0px" error>
              이미 회원가입된 이메일 입니다. 다시 확인해주세요.
            </Text>
          )}
          <Button bg="#868B8E" text="회원가입하기" type="submit"></Button>

          <Link to="/login" style={{ textDecoration: "none" }}>
            <Text color="#bf1650" bold>
              이미 아이디가 있다면...
            </Text>
          </Link>
        </form>
      </WrapperCenter>
    </Wrapper>
  );
}

export default Signup;

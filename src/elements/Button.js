import React from "react";
import styled, { css } from "styled-components";

function Button(props) {
  const { text, _onClick, is_float, children, margin, width, padding, bg } =
    props;
  if (is_float) {
    return (
      <FloatButton onClick={_onClick}>{text ? text : children}</FloatButton>
    );
  }

  const styles = {
    margin,
    width,
    padding,
    bg,
  };

  return (
    <StyledButton {...styles} onClick={_onClick}>
      {text ? text : children}
    </StyledButton>
  );
}

Button.defaultProps = {
  text: false,
  _onClick: () => {},
  is_float: false,
  children: null,
  width: "100%",
  bg: "#212121",
};

const StyledButton = styled.button`
  width: ${(props) => props.width};
  margin: ${(props) => props.margin};
  padding: ${(props) => (props.padding ? props.padding : `13px 10px`)};
  box-sizing: border-box;
  background-color: ${(props) => (props.bg ? props.bg : "#212121")};
  color: ${(props) => (props.bg === "white" ? "#212121" : "#fff")};
  border: none;
  cursor: pointer;
  white-space: nowrap;
  border-radius: 5px;

  ${(props) =>
    props.bg !== "white" &&
    css`
      &:hover {
        background-color: #b9b7bd;
      }
    `};

  ${(props) =>
    props.bg === "white" &&
    css`
      &:hover {
        border: 1px solid #d8d8d8;
        border-radius: 10px;
      }
    `}
`;

const FloatButton = styled.button`
  width: 100px;
  height: 100px;
  background-color: #f8d210;
  color: #212121;
  font-size: 2rem;
  font-weight: 700;

  box-sizing: border-box;
  border: 1px solid #fafafa;
  border-radius: 50%;

  position: fixed;
  bottom: 50px;
  right: 16px;
  text-align: center;
  vertical-align: center;
`;

export default Button;

import React from "react";
import styled, { css } from "styled-components";

function Grid({
  children,
  is_flex,
  width,
  padding,
  margin,
  bg,
  center,
  _onClick,
  justify_content,
  border,
  is_hover,
  cursorType,
}) {
  const styles = {
    is_flex,
    width,
    padding,
    margin,
    bg,
    center,
    justify_content,
    border,
    is_hover,
    cursorType,
  };

  return (
    <GridBox {...styles} onClick={_onClick}>
      {children}
    </GridBox>
  );
}

Grid.defaultProps = {
  children: null,
  is_flex: false,
  width: "100%",
  padding: false,
  margin: false,
  bg: false,
  center: false,
  _onClick: () => {},
  justify_content: false,
  border: false,
  is_hover: false,
  cursorType: false,
};

const GridBox = styled.div`
  width: ${(props) => props.width};
  box-sizing: border-box;
  ${(props) => (props.cursorType ? `cursor: ${props.cursorType};` : ``)};
  ${(props) => (props.padding ? `padding: ${props.padding};` : ``)};
  ${(props) => (props.margin ? `margin : ${props.margin};` : ``)};
  ${(props) => (props.bg ? `background-color: ${props.bg};` : ``)};
  ${(props) => (props.border ? `border-bottom:1px solid #D8D8D8;` : ``)};
  ${(props) =>
    props.is_flex
      ? `display:flex; align-items:center; justify-content: space-between;`
      : ``};
  ${(props) => (props.center ? `text-align:center;` : "")};
  ${(props) =>
    props.is_flex && props.justify_content
      ? `justify-content:${props.justify_content};`
      : ""};

  ${(props) =>
    props.is_hover &&
    css`
      &:hover {
        background-color: #ffffe0;
      }
    `};
`;

export default Grid;

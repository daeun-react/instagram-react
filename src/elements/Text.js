import React from "react";
import styled, { css } from "styled-components";

function Text({
  children,
  bold,
  color,
  size,
  margin,
  error,
  overflowHidden,
  _onClick,
}) {
  const styles = {
    bold,
    color,
    size,
    margin,
    error,
    overflowHidden,
  };
  return (
    <P {...styles} onClick={_onClick}>
      {children}
    </P>
  );
}

Text.defaultProps = {
  children: null,
  bold: false,
  color: "#222831",
  size: "14px",
  margin: false,
  error: false,
  overflowHidden: false,
  _onClick: () => {},
};

const P = styled.p`
  color: ${(props) => props.color};
  font-size: ${(props) => props.size};
  font-weight: ${(props) => (props.bold ? "600" : "400")};
  ${(props) => (props.margin ? `margin: ${props.margin};` : `margin:0 auto;`)}
  ${(props) => (props.error ? `color:#bf1650;` : ``)}
  ${(props) =>
    props.overflowHidden
      ? `text-overflow: ellipsis;
         overflow: hidden;
         white-space: nowrap;`
      : ""}

  ${(props) =>
    props.error &&
    css`
      &:before {
        content: "⚠ ";
        display: inline;
      }
    `}
`;

export default Text;

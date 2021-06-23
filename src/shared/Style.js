import styled, { css } from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  /* height: 100%; */
  min-height: calc(100vh - 50px);
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: ${(props) =>
    props.justifyContent ? props.justifyContent : "center"};
  background-color: #fafafa;
  /* background-color: yellow; */
`;

export const WrapperCenter = styled.div`
  width: ${(props) => (props.width ? props.width : "400px")};
  margin: 0 auto;
  ${(props) =>
    props.borderColor ? `border:1px solid ${props.borderColor}` : "400px"};
  ${(props) =>
    props.borderBottom &&
    css`
      border: none;
      border-bottom: 1px solid #d8d8d8;
    `}
`;

export const inputStyle = {
  border: "1px solid #212121",
  width: "100%",
  padding: "12px 4px",
  boxSizing: "border-box",
};

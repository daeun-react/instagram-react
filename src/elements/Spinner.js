import React from "react";
import styled from "styled-components";
import LoadingSvg from "../asset/loading.svg";

function Spinner({ type, size }) {
  return (
    <>
      <SpinnerWrap type={type}>
        <SpinnerSvg size={size} />
      </SpinnerWrap>
    </>
  );
}

Spinner.defaultProps = {
  type: "inline", // inline or page
  size: 60,
};

const SpinnerWrap = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px 0;
  ${(props) =>
    props.type === "page"
      ? `position: fixed;
        height: 95vh;
        top: 0;
        left: 0;
        padding: 0;
        zIndex: 9999;`
      : ``}
`;

const SpinnerSvg = styled.div`
  --size: ${(props) => props.size}px;
  width: var(--size);
  height: var(--size);
  background-size: var(--size);
  background-image: url("${LoadingSvg}");
`;

export default Spinner;

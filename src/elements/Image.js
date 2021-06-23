import React from "react";
import styled from "styled-components";

function Image({ shape, src, size, _onClick }) {
  const styles = {
    src,
    size,
  };
  if (shape === "circle") {
    return <ImageCircle {...styles} onClick={_onClick}></ImageCircle>;
  }
  if (shape === "rectangle") {
    return (
      <AspectOutter>
        <AspectInner {...styles} onClick={_onClick}></AspectInner>
      </AspectOutter>
    );
  }
  if (shape === "square") {
    return <ImageDefault {...styles} onClick={_onClick}></ImageDefault>;
  }
}

Image.defaultProps = {
  shape: "circle",
  src: "https://firebasestorage.googleapis.com/v0/b/image-community-955f8.appspot.com/o/109530515_140381271035518_8397330293062530983_n.jpg?alt=media&token=a06bc0da-ec6b-47a1-b86a-275b4465fa8d",
  size: 36,
  _onClick: () => {},
};

const ImageDefault = styled.div`
  --size: ${(props) => props.size}px;
  width: var(--size);
  height: var(--size);
  background-image: url("${(props) => props.src}");
  background-size: cover;
`;

const AspectOutter = styled.div`
  width: 100%;
  min-width: 250px;
`;
const AspectInner = styled.div`
  position: relative;
  padding-top: 75%;
  overflow: hidden;
  background-image: url("${(props) => props.src}");
  background-size: cover;
`;

const ImageCircle = styled.div`
  --size: ${(props) => props.size}px;
  width: var(--size);
  height: var(--size);
  border-radius: var(--size);

  background-image: url("${(props) => props.src}");
  background-size: cover;
  margin: 4px;
`;

export default Image;

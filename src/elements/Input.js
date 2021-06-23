import React from "react";
import styled, { css } from "styled-components";
import { Grid, Text } from ".";

function Input(props) {
  const {
    name,
    multiLine,
    label,
    placeholder,
    type,
    _onChange,
    value,
    _onSubmit,
    readOnly,
  } = props;

  if (multiLine) {
    return (
      <Grid>
        {label && <Text margin="0px">{label}</Text>}
        <StyledTextArea
          name={name}
          rows={10}
          placeholder={placeholder}
          onChange={_onChange}
          value={value}
        ></StyledTextArea>
      </Grid>
    );
  }

  return (
    <Grid>
      {label && <Text margin="0px">{label}</Text>}
      <StyledInput
        name={name}
        type={type}
        placeholder={placeholder}
        onChange={_onChange}
        value={value}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            _onSubmit();
          }
        }}
        readOnly={readOnly}
      />
    </Grid>
  );
}

Input.defaultProps = {
  name: "",
  multiLine: false,
  label: false,
  placeholder: "텍스트를 입력해주세요.",
  type: "text",
  value: "",
  _onChange: () => {},
  _onSubmit: () => {},
  readOnly: false,
};

const StyledTextArea = styled.textarea`
  border: 1px solid #212121;
  width: 100%;
  padding: 12px 4px;
  box-sizing: border-box;
`;

const StyledInput = styled.input`
  border: 1px solid #212121;
  width: 100%;
  padding: 12px 4px;
  box-sizing: border-box;

  ${(props) =>
    props.readOnly &&
    css`
      border: none;
      border-bottom: 1px solid #212121;
      outline: none;
      background-color: #fafafa;
    `}
`;

export default Input;

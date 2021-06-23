import React, { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Grid, Input } from "../elements";
import { actionCreators as ImageActions } from "../redux/modules/image";

function Upload() {
  const is_uploading = useSelector((state) => state.image.uploading);
  const dispatch = useDispatch();

  const [imageName, setImageName] = useState("");
  const fileInput = useRef();

  const handleImageUploadClick = () => {
    fileInput.current.click();
  };

  const uploadFB = () => {
    const image = fileInput.current.files[0];
    if (!image) {
      return window.alert("업로드할 이미지를 선택해주세요!");
    }
    setImageName(image.name);

    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onloadend = () => {
      // console.log(reader.result);
      dispatch(ImageActions.setPreview(reader.result));
    };

    dispatch(ImageActions.uploadImageFB(image));
  };

  return (
    <>
      <input
        type="file"
        disabled={is_uploading}
        ref={fileInput}
        onChange={() => uploadFB()}
        style={{ display: "none" }}
      />

      <Grid is_flex>
        <Input
          value={imageName}
          placeholder="이미지를 검색해주세요 :)"
          readOnly
        />
        <Button
          width="fit-content"
          margin="0px 2px 0px 2px"
          _onClick={handleImageUploadClick}
        >
          이미지검색
        </Button>
      </Grid>
    </>
  );
}

export default Upload;

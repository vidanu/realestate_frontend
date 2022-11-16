import React from "react";
import ImageUploading from "react-images-uploading";
import { Alert, Button, ButtonGroup } from "reactstrap";
import "./index.css";
const ImageUploader = (props) => {
  const {
    maxNumber = 5,
    acceptType = ["jpeg", "jpg", "png"],
    maxFileSize = 5000000
  } = props;
  const [images, setImages] = React.useState([]);

  const onChange = (imageList, addUpdateIndex) => {
    setImages(imageList);
  };
  const onError = () => {
    setImages([]);
  };
  const printjson = () => {
    document.getElementById("jsonprint").innerHTML = JSON.stringify(
      images,
      null,
      6
    ).replace(/\n( *)/g, function (match, p1) {
      return "<br>" + "&nbsp;".repeat(p1.length);
    });
    console.log(images);
  };

  return (
    <div className="App">
      <ImageUploading
        multiple
        value={images}
        onChange={onChange}
        onError={onError}
        maxNumber={maxNumber}
        acceptType={acceptType}
        maxFileSize={maxFileSize}
        dataURLKey="data_url"
      >
        {({
          imageList,
          onImageUpload,
          onImageRemoveAll,
          onImageUpdate,
          onImageRemove,
          isDragging,
          dragProps,
          errors
        }) => (
          <>
            {errors && (
              <Alert color="danger text-start">
                <ul>
                  {errors.maxNumber && (
                    <li>Number of selected images exceed maxNumber</li>
                  )}
                  {errors.acceptType && (
                    <li>Your selected file type is not allow</li>
                  )}
                  {errors.maxFileSize && (
                    <li>Selected file size exceed maxFileSize</li>
                  )}
                </ul>
              </Alert>
            )}

            <div className="upload__image-wrapper">
              <div
                className="upload-container"
                {...dragProps}
                onClick={onImageUpload}
                style={
                  isDragging
                    ? { backgroundColor: "#afafaf", color: "white" }
                    : undefined
                }
              >
                Choose a file or Drag it here
              </div>

              <div className="p-2" style={{ textAlign: "left" }}>
                {imageList.map((image, index) => (
                  <div
                    key={index}
                    className="image-item  "
                    style={{
                      width: "150px",
                      marginRight: "10px",
                      display: "inline-block"
                    }}
                  >
                    <img
                      src={image["data_url"]}
                      alt=""
                      style={{ width: "100%" }}
                    />
                    <div className="image-item__btn-wrapper mt-1">
                      <ButtonGroup size="sm" style={{ width: "100%" }}>
                        <Button
                          color="primary"
                          onClick={() => onImageUpdate(index)}
                        >
                          Update
                        </Button>
                        <Button
                          color="danger"
                          onClick={() => onImageRemove(index)}
                        >
                          Remove
                        </Button>
                      </ButtonGroup>
                    </div>
                  </div>
                ))}
              </div>
              {images.length > 0 && (
                <>
                  <hr />
                  <div className="text-start p-2">
                    <Button onClick={printjson} color="success">
                      Upload
                    </Button>{" "}
                    <Button onClick={onImageRemoveAll} color="danger">
                      Remove All Images
                    </Button>
                  </div>
                  <pre className="text-start" id="jsonprint"></pre>
                </>
              )}
            </div>
          </>
        )}
      </ImageUploading>
    </div>
  );
};

export default ImageUploader;

import React from "react";
import ContentLoader from "react-content-loader";

const ImageLoader = () => {
  return (
    <ContentLoader
      backgroundColor="#f3f8fb"
      foregroundColor="#ecebeb"
      width="100%"
      height="100%"
    >
      <rect x="0" y="0" width="100%" height="100%" />
    </ContentLoader>
  );
};

export default ImageLoader;

import React from "react";
import ContentLoader from "react-content-loader";
import ImageLoader from "./ImageLoader.js";

const SiteLoader = () => {
  return (
    <>
      {/* <ContentLoader
        viewBox="0 0 400 50"
        width={400}
        height={50}
        backgroundColor="#f3f3f3"
        foregroundColor="white"
      >
        <rect x="0" y="15" rx="4" ry="4" width="400" height="20" />
      </ContentLoader> */}
      <br />
      <ImageLoader />
    </>
  );
};

export default SiteLoader;

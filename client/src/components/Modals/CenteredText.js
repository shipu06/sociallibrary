import React from "react";
import ImageGallery from "react-image-gallery";

const CenteredText = ({ alert, children }) => {
  return (
    <>
      <h1
        style={{
          color: alert ? "red" : "#222",
        }}
        className="text-3xl flex justify-center items-center flex-col py-12 fixed top-16 bottom-0 right-0 left-0 bg-slate-100"
      >
        {children}
      </h1>
    </>
  );
};

export default CenteredText;

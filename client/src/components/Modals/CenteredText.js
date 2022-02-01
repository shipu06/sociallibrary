import React from "react";

const CenteredText = ({ alert, children }) => {
  return (
    <h1
      style={{
        position: "absolute",
        top: "50vh",
        left: "50vw",
        fontWeight: 400,
        transform: "translate(-50%,-50%)",
        color: alert ? "red" : "#222",
      }}
    >
      {children}
    </h1>
  );
};

export default CenteredText;

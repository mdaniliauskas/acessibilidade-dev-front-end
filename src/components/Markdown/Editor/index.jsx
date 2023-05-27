import React from "react";

import  MDEditor  from "@uiw/react-md-editor";

const Editor = ({ text, handleText }) => {
  return (
    <>
      <MDEditor value={text} onChange={handleText} preview="edit" />
    </>
  );
};

export default Editor;

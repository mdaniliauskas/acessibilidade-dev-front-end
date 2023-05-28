import { Card, CardBody } from "@chakra-ui/react";
import MDEditor from "@uiw/react-md-editor";
import React from "react";
import rehypeSanitize from "rehype-sanitize";

const Preview = ({ text, minHeight = 200}) => {
  
  return (
        <MDEditor value={text} hideToolbar={true} preview="preview" previewOptions={{
          rehypePlugins: [[rehypeSanitize]] 
        }} />
  );
};

export default Preview;

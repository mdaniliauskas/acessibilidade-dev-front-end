import { Card, CardBody } from "@chakra-ui/react";
import MDEditor from "@uiw/react-md-editor";
import React from "react";

const Preview = ({ text }) => {
  return (
    <Card variant="outline">
      <CardBody>
        <MDEditor.Markdown source={text} />
      </CardBody>
    </Card>
  );
};

export default Preview;

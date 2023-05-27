import { Flex, Spinner } from "@chakra-ui/react";
import React from "react";

const SpinnerLoading = () => {
  return (
    <Flex justify="center" align="center">
      <Spinner m={10} />
    </Flex>
  );
};

export default SpinnerLoading;

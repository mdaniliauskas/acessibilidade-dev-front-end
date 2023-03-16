import React from "react";
import { Button } from "@chakra-ui/react";
import styles from "./styles.module.css";

function CustomButton({
  type = "submit",
  children,
  bg = "green",
  bgHover = "green.600",
}) {
  return (
    <Button
      type={type}
      borderRadius={30}
      width={200}
      boxShadow="lg"
      bg={bg}
      color="white"
      _hover={{ bg: bgHover ? bgHover : bg }}
    >
      {children}
    </Button>
  );
}

export default CustomButton;

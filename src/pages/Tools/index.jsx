import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { Alert, Box, Heading } from "@chakra-ui/react";
import { useAuth0 } from "@auth0/auth0-react";

import {
  TextCard,
  CustomButton,
  SpinnerLoading,
  CategoryFilter,
} from "../../components";

import { getListTools } from "../../services/tools.service";

const Tools = () => {
  const { isAuthenticated, user } = useAuth0();
  const navigate = useNavigate();

  const [error, setError] = useState(false);
  const [listTools, setListTools] = useState([]);
  const [toolsForCategory, setToolsForCategory] = useState({});
  const [categorySelected, setCategorySelected] = useState(0);

    return (
        <Box className="container">      
        <Heading as="h2" color="#696666" style={{ width: "fit-content" }}>
          Catálogo de Ferramentas
        </Heading>
        </Box>
    );

};


export default Tools;
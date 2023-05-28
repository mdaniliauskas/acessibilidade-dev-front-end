import React from "react";
import CategoryTag from "../CategoryTag";
import { Box } from "@chakra-ui/react";

function CategoryFilter({ categories, state, setState }) {
  const categoriesTitle = {
    0: "Todas",
    1: "Auditiva",
    2: "Motora",
    3: "Visual",
  };
  const onFilterCategory = (category) => {
    setState(category);
  };
  return (
    <Box className="row g-3 justify-content-center justify-content-xxl-start">
      {categories.map((categoryObj, index) => (
        <Box key={index} className="col-auto">
          <CategoryTag
            name={categoriesTitle[categoryObj.categoryId]}
            value={categoryObj._count}
            selected={state}
            callback={onFilterCategory}
            index={index}
          />
        </Box>
      ))}
    </Box>
  );
}

export default CategoryFilter;

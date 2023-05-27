import React from 'react'
import { useState } from 'react';
import CategoryTag from '../CategoryTag';
import { Box } from '@chakra-ui/react';

function CategoryFilter() {
  const categories = ["Todas", "Auditiva", "Motora", "Visual"];
  const [categorySelected, setCategorySelected] = useState(0);
  const onFilterCategory = (category) => {
    setCategorySelected(category);
  };
  return (
    <Box className='row g-3 justify-content-center justify-content-xxl-start'>
    {
        categories.map((category, index) => (
        <Box key={index} className="col-auto">
            <CategoryTag name={category} value="10" state={categorySelected} index={index} callback={onFilterCategory} />
        </Box>
      ))
    }
    </Box>
  )
}

export default CategoryFilter;
import React, { useEffect, useState } from "react";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { styled } from '@mui/material/styles';

const CustomStyledToggleButton = styled(ToggleButton)(({ theme }) => ({
  backgroundColor: '#f3f4f6', // Light background for unselected buttons
  color: '#333', // Dark text for contrast
  width: '100px', // Slightly increased width for better tap area
  height: '45px',
  fontWeight: 'bold',
  borderRadius: '8px',
  boxShadow: '0 3px 6px rgba(0, 0, 0, 0.15)',
  textTransform: 'none',
  transition: 'all 0.3s ease-in-out',
  
  '&.Mui-selected': {
    backgroundColor: '#1f72cd', // Vibrant blue for selected button
    color: '#fff', // White text for contrast
    boxShadow: '0 4px 10px rgba(31, 114, 205, 0.4)', // Stronger shadow for emphasis
    '&:hover': {
      backgroundColor: '#185a9d', // Slightly darker blue on hover
    },
  },
  
  '&:hover': {
    backgroundColor: '#e0e7ff', // Subtle hover effect for unselected button
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
  },
  
  '&:active': {
    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3)',
  },
}));

export default function CustomToggleButton({ onLanguageChange }) {
  const [alignment, setAlignment] = useState('hindi');

  const handleChange = (event, newAlignment) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
      onLanguageChange(newAlignment === 'english' ? 'en' : 'hi');
    }
  };

  useEffect(() => {
    onLanguageChange('hi');
  }, []);

  return (
    <ToggleButtonGroup
      value={alignment}
      exclusive
      onChange={handleChange}
      aria-label="language selection"
      sx={{
        backgroundColor: '#ffffff',
        borderRadius: '8px',
        padding: '2px',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
      }}
    >
      <CustomStyledToggleButton value="hindi">
        हिन्दी
      </CustomStyledToggleButton>
      <CustomStyledToggleButton value="english">
        English
      </CustomStyledToggleButton>
    </ToggleButtonGroup>
  );
}

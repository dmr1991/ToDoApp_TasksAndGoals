import React from 'react';
import { Button } from 'react-bootstrap';
import './MainButton.scss'; // Import custom css

const MainButton = ({ children, variant = 'primary', onClick, className = '', ...props }) => {
  return (
    <Button variant={variant} onClick={onClick} className={`custom-btn ${className}`} {...props}>
      {children}
    </Button>
  );
};

export default MainButton;

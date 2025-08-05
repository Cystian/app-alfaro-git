// src/components/ui/button.jsx
import React from 'react';

export const Button = ({ children, className = '', ...props }) => {
  return (
    <button
      className={className}
      {...props}
    >
      {children}
    </button>
  );
};

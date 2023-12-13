import React from 'react';
import { Alert, AlertTitle } from '@mui/material';

const MyAlert = ({ backgroundColor, title, message }) => {
  return (
    <Alert
      severity="info"
      variant="filled"
      style={{
        position: 'absolute',
        top: '100px',
        right: '10px',
        margin: '16px',
        backgroundColor: backgroundColor,
      }}
    >
      <AlertTitle>{title}</AlertTitle>
      {message}
    </Alert>
  );
};

export default MyAlert;

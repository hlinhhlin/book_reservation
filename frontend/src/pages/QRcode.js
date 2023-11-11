import React from "react";
import { Box, Typography } from '@mui/material';

const QRcode = () => {
    
    return (
    <Box display="flex" alignItems="center" className="body">
      <img src="qrcode.jpg" alt="qrcode" style={{ width: '100px', marginRight: '20px' }} />
      <div>
        <Typography variant="body1" style={{fontSize: '20px'}}>Scan to identify your user</Typography>
        <Typography variant="body1" style={{fontSize: '20px'}}>Mr. John Smith</Typography>
      </div>
    </Box>
    
    );

};

export default QRcode;
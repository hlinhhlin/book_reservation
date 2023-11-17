import React from "react";
import { Box, Typography } from "@mui/material";
import QRCode from "react-qr-code";
import { useUser } from "../UserContext";


const QRcode = () => {
  
  const { user, loginUser, logoutUser } = useUser();

    return (
      <div className="qrcode-container">
        <Box display="flex" alignItems="center" className="body">
        <QRCode value={`${user.id}-${user.firstname}-${user.lastname}`} />
        {/*<img src="qrcode.jpg" alt="qrcode" style={{ width: '350px', marginBottom: '30px' }} />*/}
        <div>
          <Typography variant="body1" style={{ fontSize: "20px", 
        marginTop: '50px' }}>
            Scan to identify your user
          </Typography>
          <Typography variant="body1" style={{ fontSize: "20px", fontWeight: 'bolder' }}>
            {user.firstname + " " + user.lastname}
          </Typography>
        </div>
        </Box>
      </div>
    );

};

export default QRcode;

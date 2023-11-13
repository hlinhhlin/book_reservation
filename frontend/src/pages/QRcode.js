import React from "react";
import { Box, Typography } from "@mui/material";
import QRCode from "react-qr-code";
import { useUser } from "../UserContext";

const QRcode = () => {
  const { user, loginUser, logoutUser } = useUser();

  return (
    <Box display="flex" alignItems="center" className="body">
      <QRCode value={`${user.id}-${user.firstname}-${user.lastname}`} />
      {/* <img src="qrcode.jpg" alt="qrcode" style={{ width: '100px', marginRight: '20px' }} /> */}
      <div>
        <Typography variant="body1" style={{ fontSize: "20px" }}>
          Scan to identify your user
        </Typography>
        <Typography variant="body1" style={{ fontSize: "20px" }}>
          {user.firstname + " " + user.lastname}
        </Typography>
      </div>
    </Box>
  );
};

export default QRcode;

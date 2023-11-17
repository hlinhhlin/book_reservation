import React from "react";
import "../style.css";
import { Typography, TextField, Button, Box} from '@mui/material';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';

const EditProfilePage = () => {

  return (
    <Box style={{ display: "flex" }}>
        <img src="user.png" alt="user" className="circle-frame" />
    <div className="profile-container" style={{marginLeft: "180px", marginTop: "50px"}}>
    <div style={{ display: "flex", alignItems: "center", marginTop: '20px'}}>
        <Typography style={{fontSize: '20px', marginRight: "50px"}}>First Name</Typography>
        <TextField id="outlined-basic" label="First Name" variant="outlined" style={{ width: '500px' }}/>
    </div>
    <div style={{ display: "flex", alignItems: "center", marginTop: '20px'}}>
        <Typography style={{fontSize: '20px', marginRight: "50px"}}>Last Name</Typography>
        <TextField id="outlined-basic" label="Last Name" variant="outlined" style={{ width: '500px' }}/>
    </div>
    <div style={{ display: "flex", alignItems: "center", marginTop: '20px'}}>
        <Typography style={{fontSize: '20px', marginRight: "90px"}}>Email</Typography>
        <TextField id="outlined-basic" label="Email" variant="outlined" style={{ width: '500px' }}/>
    </div>
    <div style={{ display: "flex", alignItems: "center", marginTop: '20px'}}>
        <Typography style={{fontSize: '20px', marginRight: "49px"}}>Telephone</Typography>
        <TextField id="outlined-basic" label="Telephone" variant="outlined" style={{ width: '500px' }}/>
    </div>
    <div style={{ display: "flex", alignItems: "center", marginTop: '20px'}}>
        <Typography style={{fontSize: '20px', marginRight: "70px"}}>Address</Typography>
        <TextField id="outlined-basic" label="Address" variant="outlined" style={{ width: '500px' }}/>
    </div>
    <Button variant="contained" color="primary" style={{ width: "200px", height: "50px", marginTop: '50px', marginLeft: "250px",textTransform: "none", fontSize: '20px' }}>
        Submit
    </Button>
    </div>
    </Box>
  );
};

export default EditProfilePage;
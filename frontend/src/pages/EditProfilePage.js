import React from "react";
import "../style.css";
import { Typography, TextField, Button, IconButton} from '@mui/material';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';


const EditProfilePage = () => {

  return (
    <div className="profile-container">
        <img src="user.png" alt="user" className="circle-frame" />
        <IconButton component="label" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(150%, -140%)', backgroundColor: '#f5f5f5', borderRadius: '50%', padding: '8px' }}>
            <PhotoCameraIcon/>
            <input type="file" accept="image/*" style={{ display: 'none' }} />
        </IconButton>
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
    <Button variant="contained" color="primary" style={{ width: "200px", height: "50px", marginTop: '50px', textTransform: "none", fontSize: '15px' }}>
        Submit
    </Button>
    </div>
  );
};

export default EditProfilePage;
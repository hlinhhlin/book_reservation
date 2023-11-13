import React, { useState } from "react";
import { Typography, IconButton, Button, Box } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import "../style.css";
import { useNavigate } from 'react-router-dom';
import EditProfilePage from './EditProfilePage';

const ProfilePage = () => {

    const navigate = useNavigate();

    const handleEditClick = () => {
        navigate('/editprofile');
      };
    

    return (
        <div className="profile-container">
            <img src="user.png" alt="user" className="circle-frame" />
            <div style={{ display: "flex", alignItems: "center" }}>
            <Typography style={{fontSize: '25px', marginRight: "2px"}}>Name-Surname</Typography>
            <IconButton onClick={handleEditClick}> <EditIcon/> </IconButton>
            </div>
            <div style={{ display: "flex", marginTop: "60px" }}>
                <Button variant="contained" color="primary" style={{ width: "210px", height: "80px", marginRight: "40px", textTransform: "none", fontSize: '20px' }}>
                    + Topup eMoney
                </Button>
                <Typography style={{ width: "210px", height: "80px", display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid #ccc", borderRadius: '5px', fontSize: '20px' }}>
                    300 Baht
                </Typography>
            </div>
            <div style={{ display: "flex", marginTop: "60px" }}>
                <Button variant="contained" className="button" style={{textTransform: "none", marginRight: "20px", fontSize: "18px", color: "black", background: "#f5f5f5"}}>
                    <img src="checkout.png" alt="Icon" style={{ marginBottom: "10px" }} />
                        Check Out
                </Button>
                <Button variant="contained" className="button" style={{textTransform: "none", marginRight: "20px", fontSize: "18px", color: "black", background: "#f5f5f5"}}>
                    <img src="hold.png" alt="Icon" style={{ marginBottom: "10px" }} />
                        Hold
                </Button>
                <Button variant="contained" className="button" style={{textTransform: "none", marginRight: "20px", fontSize: "18px", color: "black", background: "#f5f5f5"}}>
                    <img src="bookfine.png" alt="Icon" style={{ marginBottom: "10px" }} />
                        Book Fines
                </Button>
            </div>
            <div className="button-container">
                <Button variant="contained" className="button" style={{textTransform: "none", marginRight: "20px", fontSize: "18px", color: "black", background: "#f5f5f5"}}>
                    <img src="transaction.png" alt="Icon" style={{ marginBottom: "10px" }} />
                        Transaction History
                </Button>
                <Button variant="contained" className="button" style={{textTransform: "none", marginRight: "20px", fontSize: "18px", color: "black", background: "#f5f5f5"}}>
                    <img src="borrowing.png" alt="Icon" style={{ marginBottom: "10px" }} />
                        Borrowing History
                </Button>
                <Button variant="contained" className="button" style={{textTransform: "none", marginRight: "20px", fontSize: "18px", color: "black", background: "#f5f5f5"}}>
                    <img src="pending.png" alt="Icon" style={{ marginBottom: "10px" }} />
                        Pending for Payment
                </Button>
            </div>
        </div>
      );
  };
  
  export default ProfilePage;
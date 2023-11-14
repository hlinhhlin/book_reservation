import React, { useState } from "react";
import { Typography, IconButton, Button, Box } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import "../style.css";
import { useNavigate } from 'react-router-dom';
import EditProfilePage from './EditProfilePage';
import TopUpPage from "./TopUpPage";
import CheckOutPage from "./CheckOutPage";

const ProfilePage = () => {

    const navigate = useNavigate();

    const handleEditClick = () => {
        navigate('/editprofile');
      };

    const handleTopUpClick = () => {
        navigate('/topUp');
      };

    const handleCheckOutClick = () => {
        navigate('/checkOut');
      };

      const handleHoldClick = () => {
        navigate('/hold');
      };

      const handleBookFineClick = () => {
        navigate('/bookFine');
      };

      const handleTransactionHistoryClick = () => {
        navigate('/transactionHistory');
      };

    return (
        <div className="profile-container">
            <img src="user.png" alt="user" className="circle-frame" />
            <div style={{ display: "flex", alignItems: "center" }}>
                <Typography style={{fontSize: '25px', marginRight: "2px"}}>Name-Surname</Typography>
                <IconButton onClick={handleEditClick}> <EditIcon/> </IconButton>
            </div>
            <div style={{ display: "flex", marginTop: "60px" }}>
                <Button onClick={handleTopUpClick} variant="contained" color="primary" style={{ width: "210px", height: "80px", marginRight: "40px", textTransform: "none", fontSize: '20px', fontWeight: 'bolder' }}>
                    + Topup eMoney
                </Button>
                <Typography style={{ width: "210px", height: "80px", display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid #ccc", borderRadius: '5px', fontSize: '20px' }}>
                    300 Baht
                </Typography>
            </div>
            <div style={{ display: "flex", marginTop: "60px" }}>
                <Button onClick={handleCheckOutClick} variant="contained" className="button" style={{textTransform: "none", marginRight: "20px", fontSize: "18px", color: "black", background: "#f5f5f5"}}>
                    <img src="checkout.png" alt="Icon" style={{ marginBottom: "10px" }} />
                        Check Out
                </Button>
                <Button onClick={handleHoldClick} variant="contained" className="button" style={{textTransform: "none", marginRight: "20px", fontSize: "18px", color: "black", background: "#f5f5f5"}}>
                    <img src="hold.png" alt="Icon" style={{ marginBottom: "10px" }} />
                        Hold
                </Button>
                
            </div>
            <div className="button-container">
                <Button onClick={handleBookFineClick} variant="contained" className="button" style={{textTransform: "none", marginRight: "20px", fontSize: "18px", color: "black", background: "#f5f5f5"}}>
                    <img src="bookfine.png" alt="Icon" style={{ marginBottom: "10px" }} />
                        Book Fines
                </Button>
                <Button onClick={handleTransactionHistoryClick} variant="contained" className="button" style={{textTransform: "none", marginRight: "20px", fontSize: "18px", color: "black", background: "#f5f5f5"}}>
                    <img src="transaction.png" alt="Icon" style={{ marginBottom: "10px" }} />
                        Transaction History
                </Button>
            </div>
        </div>
      );
  };
  
  export default ProfilePage;
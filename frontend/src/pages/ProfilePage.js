import React, { useState, useEffect } from "react";
import { Typography, IconButton, Button, Box } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import "../style.css";
import { useNavigate } from "react-router-dom";
import EditProfilePage from "./EditProfilePage";
import TopUpPage from "./TopUpPage";
import CheckOutPage from "./CheckOutPage";
import { useUser } from "../UserContext";

const ProfilePage = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [totalAmount, setTotalAmount] = useState(0);

  const handleEditClick = () => {
    navigate("/editprofile");
  };

  const handleTopUpClick = () => {
    navigate("/topUp");
  };

  const handleCheckOutClick = () => {
    navigate("/checkOut");
  };

  const handleHoldClick = () => {
    navigate("/hold");
  };

  const handleBookFineClick = () => {
    navigate("/bookFine");
  };

  const handleTransactionHistoryClick = () => {
    navigate("/transactionHistory");
  };

  useEffect(() => {
    // Fetch transactions with 'successful' status when the component mounts
    fetch(`http://localhost:5050/user/transaction/${user.id}`)
      .then((response) => response.json())
      .then((data) => {
        // Filter transactions with 'successful' status
        const successfulTransactions = data.filter(
          (transaction) => transaction.Status === 'successful'
        );
  
        // Sum the Amount for 'successful' transactions
        const sumAmount = successfulTransactions.reduce(
          (total, item) => total + item.Amount,
          0
        );
  
        setTotalAmount(sumAmount);
      })
      .catch((error) => {
        console.log("Error fetching transactions:", error);
      });
  }, []);
  

  return (
    <div className="profile-container">
      <img src="user.png" alt="user" className="circle-frame" />
      <div style={{ display: "flex", alignItems: "center" }}>
        <Typography style={{ fontSize: "25px", marginRight: "2px" }}>
          {user.firstname + " " + user.lastname}
        </Typography>
        <IconButton onClick={handleEditClick}>
          {" "}
          <EditIcon />{" "}
        </IconButton>
      </div>
      <div style={{ display: "flex", marginTop: "60px" }}>
        <Button
          onClick={handleTopUpClick}
          variant="contained"
          color="primary"
          style={{
            width: "210px",
            height: "80px",
            marginRight: "40px",
            textTransform: "none",
            fontSize: "20px",
            fontWeight: "bolder",
          }}
        >
          + Topup eMoney
        </Button>
        <Typography
          style={{
            width: "210px",
            height: "80px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "1px solid #ccc",
            borderRadius: "5px",
            fontSize: "20px",
          }}
        >
          {totalAmount} Baht
        </Typography>
      </div>
      <div style={{ display: "flex", marginTop: "60px" }}>
        <Button
          onClick={handleCheckOutClick}
          variant="contained"
          className="button"
          style={{
            textTransform: "none",
            marginRight: "20px",
            fontSize: "18px",
            color: "black",
            background: "#f5f5f5",
          }}
        >
          <img src="checkout.png" alt="Icon" style={{ marginBottom: "10px" }} />
          Check Out
        </Button>
        <Button
          onClick={handleHoldClick}
          variant="contained"
          className="button"
          style={{
            textTransform: "none",
            marginRight: "20px",
            fontSize: "18px",
            color: "black",
            background: "#f5f5f5",
          }}
        >
          <img src="hold.png" alt="Icon" style={{ marginBottom: "10px" }} />
          Hold
        </Button>
      </div>
      <div className="button-container">
        <Button
          onClick={handleBookFineClick}
          variant="contained"
          className="button"
          style={{
            textTransform: "none",
            marginRight: "20px",
            fontSize: "18px",
            color: "black",
            background: "#f5f5f5",
          }}
        >
          <img src="bookfine.png" alt="Icon" style={{ marginBottom: "10px" }} />
          Book Fines
        </Button>
        <Button
          onClick={handleTransactionHistoryClick}
          variant="contained"
          className="button"
          style={{
            textTransform: "none",
            marginRight: "20px",
            fontSize: "18px",
            color: "black",
            background: "#f5f5f5",
          }}
        >
          <img
            src="transaction.png"
            alt="Icon"
            style={{ marginBottom: "10px" }}
          />
          Transaction History
        </Button>
      </div>
    </div>
  );
};

export default ProfilePage;

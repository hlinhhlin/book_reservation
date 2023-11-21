import React, { useState } from "react";
import "../style.css";
import { Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useUser } from "../Context/UserContext";

const TopUpPage = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);

  const handleInputAmount = (event) => {
    setSelectedAmount(event.target.value);
  };

  const handleMoneyButtonClick = (amount) => {
    setSelectedAmount(amount === selectedAmount ? null : amount);
  };

  const handlePaymentClick = (method) => {
    setSelectedPaymentMethod(method === selectedPaymentMethod ? null : method);
  };

  const handleConfirmClick = () => {
    if (selectedAmount !== null) {
        console.log(typeof(selectedAmount));
      const topUpData = { userId: user.id, amount: selectedAmount };
      fetch(`http://localhost:5050/user/transaction/topup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(topUpData),
      })
        .then((response) => {
          if (response.ok) {
            // If the response is successful, navigate to the profile page
            navigate("/profile", { state: { totalAmount: selectedAmount } });
          } else {
            // Handle errors or failed requests here
            console.error("Failed to top up. Please try again.");
          }
        })
        .catch((error) => {
          console.error("Error occurred while processing the request:", error);
        });
    } else {
      console.error("No amount selected.");
    }
  };
  

  const handleCancelClick = () => {
    navigate("/profile");
  };

  return (
    <div>
      <p
        style={{
          fontSize: "20px",
          fontWeight: "bold",
          marginTop: "50px",
          marginBottom: "30px",
          marginLeft: "50px",
        }}
      >
        Topup eMoney
      </p>
      <div className="topup-container">
        <Button
          variant="outlined"
          className={`topup-button ${selectedAmount === 100 ? "selected" : ""}`}
          onClick={() => handleMoneyButtonClick("100")}
          style={{
            backgroundColor: selectedAmount === "100" ? "#FF9800" : "white",
            color: selectedAmount === "100" ? "white" : "black",
            marginRight: "50px",
            fontSize: "17px",
            borderWidth: "2px",
            borderRadius: "30px",
          }}
        >
          100
        </Button>
        <Button
          variant="outlined"
          className={`topup-button ${selectedAmount === 200 ? "selected" : ""}`}
          onClick={() => handleMoneyButtonClick("200")}
          style={{
            backgroundColor: selectedAmount === "200" ? "#FF9800" : "white",
            color: selectedAmount === "200" ? "white" : "black",
            marginRight: "50px",
            fontSize: "17px",
            borderWidth: "2px",
            borderRadius: "30px",
          }}
        >
          200
        </Button>
        <Button
          variant="outlined"
          className={`topup-button ${selectedAmount === 300 ? "selected" : ""}`}
          onClick={() => handleMoneyButtonClick("300")}
          style={{
            backgroundColor: selectedAmount === "300" ? "#FF9800" : "white",
            color: selectedAmount === "300" ? "white" : "black",
            marginRight: "50px",
            fontSize: "17px",
            borderWidth: "2px",
            borderRadius: "30px",
          }}
        >
          300
        </Button>
        <Button
          variant="outlined"
          className={`topup-button ${selectedAmount === 400 ? "selected" : ""}`}
          onClick={() => handleMoneyButtonClick("400")}
          style={{
            backgroundColor: selectedAmount === "400" ? "#FF9800" : "white",
            color: selectedAmount === "400" ? "white" : "black",
            marginRight: "50px",
            fontSize: "17px",
            borderWidth: "2px",
            borderRadius: "30px",
          }}
        >
          400
        </Button>
        <Button
          variant="outlined"
          className={`topup-button ${selectedAmount === 500 ? "selected" : ""}`}
          onClick={() => handleMoneyButtonClick("500")}
          style={{
            backgroundColor: selectedAmount === "500" ? "#FF9800" : "white",
            color: selectedAmount === "500" ? "white" : "black",
            marginRight: "50px",
            fontSize: "17px",
            borderWidth: "2px",
            borderRadius: "30px",
          }}
        >
          500
        </Button>
      </div>

      <div style={{ display: "flex" }}>
        <p
          style={{
            marginTop: "55px",
            marginLeft: "95px",
            marginRight: "20px",
            fontSize: "17px",
          }}
        >
          Specific Amount
        </p>
        <TextField
          id="outlined-basic"
          label="Amount"
          variant="outlined"
          style={{ height: "60px", width: "305px", marginTop: "40px" }}
          onChange={handleInputAmount}
        />
      </div>

      <p
        style={{
          fontSize: "20px",
          fontWeight: "bold",
          marginTop: "50px",
          marginBottom: "30px",
          marginLeft: "50px",
        }}
      >
        Payment Method
      </p>
      <div>
        <Button
          className={`payment-button ${
            selectedPaymentMethod === "internetBanking" ? "selected" : ""
          }`}
          onClick={() => handlePaymentClick("internetBanking")}
          variant="contained"
          style={{
            backgroundColor:
              selectedPaymentMethod === "internetBanking"
                ? "#FF9800"
                : "#f5f5f5",
            color:
              selectedPaymentMethod === "internetBanking" ? "white" : "black",
            fontSize: "17px",
            textTransform: "none",
            marginRight: "40px",
            marginLeft: "100px",
            marginBottom: "50px",
          }}
        >
          <img src="Banking.png" alt="Icon" style={{ marginBottom: "10px" }} />
          Internet Banking
        </Button>

        <Button
          className={`payment-button ${
            selectedPaymentMethod === "cash" ? "selected" : ""
          }`}
          onClick={() => handlePaymentClick("cash")}
          variant="contained"
          style={{
            backgroundColor:
              selectedPaymentMethod === "cash" ? "#FF9800" : "#f5f5f5",
            color: selectedPaymentMethod === "cash" ? "white" : "black",
            fontSize: "17px",
            textTransform: "none",
            marginRight: "20px",
            marginBottom: "50px",
          }}
        >
          <img src="Cash.png" alt="Icon" style={{ marginBottom: "4px" }} />
          Cash
        </Button>
      </div>

      <div
        style={{ display: "flex", marginLeft: "245px", marginBottom: "100px" }}
      >
        <Button
          onClick={handleCancelClick}
          variant="contained"
          style={{
            width: "150px",
            height: "55px",
            marginRight: "40px",
            textTransform: "none",
            fontSize: "20px",
            color: "black",
            backgroundColor: "white",
          }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          color="primary"
          style={{
            width: "150px",
            height: "55px",
            marginRight: "40px",
            textTransform: "none",
            fontSize: "20px",
          }}
          onClick={handleConfirmClick}
        >
          Confirm
        </Button>
      </div>
    </div>
  );
};

export default TopUpPage;

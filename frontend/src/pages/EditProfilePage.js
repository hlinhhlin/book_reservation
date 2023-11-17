import React, { useState, useEffect } from "react";
import { Typography, TextField, Button, IconButton, Box } from "@mui/material";
import { useUser, loginUser } from "../UserContext";
import "../style.css";

const EditProfilePage = () => {
  const { user, loginUser } = useUser();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [telNumber, setTelNumber] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    fetch(`http://localhost:5050/user/profile/${user.id}`)
      .then((response) => response.json())
      .then((data) => {
        setFirstName(data.FirstName);
        setLastName(data.LastName);
        setEmail(data.Email);
        setTelNumber(data.TelNumber);
        setAddress(data.Address);
      })
      .catch((error) => {
        console.log("Error fetching transactions:", error);
      });
  }, [user.id]);

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleTelNumberChange = (e) => {
    setTelNumber(e.target.value);
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handleSubmit = () => {
    // Prepare the data for the update
    const updatedData = {
      FirstName: firstName,
      LastName: lastName,
      Email: email,
      TelNumber: telNumber,
      Address: address,
    };
  
    console.log(updatedData);
  
    // Make the API call to update the data
    fetch(`http://localhost:5050/user/profile/update/${user.id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.message); // Log or handle the success message
            fetch(`http://localhost:5050/user/profile/${user.id}`)
            .then((response) => response.json())
            .then((userData) => {
                const updatedUser = {
                    id: user.id, // Keep the existing id
                    firstname: userData.FirstName,
                    lastname: userData.LastName,
                    telphone: userData.TelNumber,
                    email: userData.Email,
                    address: userData.Address // Update other properties with the new data
                  };
                
                  loginUser(updatedUser); // Update user data in the context                console.log(userData);
            })
            .catch((error) => {
              console.error("Error fetching updated user data:", error);
            });
        })
      .catch((error) => {
        console.error("Error updating profile:", error);
      });
  };
  

  return (
    <Box style={{ display: "flex" }}>
      <img src="user.png" alt="user" className="circle-frame" />
      <div
        className="profile-container"
        style={{ marginLeft: "180px", marginTop: "50px" }}
      >
        <div
          style={{ display: "flex", alignItems: "center", marginTop: "20px" }}
        >
          <Typography style={{ fontSize: "20px", marginRight: "50px" }}>
            First Name
          </Typography>
          <TextField
            id="outlined-basic"
            label="First Name"
            variant="outlined"
            style={{ width: "500px" }}
            value={firstName}
            onChange={handleFirstNameChange}
          />
        </div>
        <div
          style={{ display: "flex", alignItems: "center", marginTop: "20px" }}
        >
          <Typography style={{ fontSize: "20px", marginRight: "50px" }}>
            Last Name
          </Typography>
          <TextField
          disabled
            id="outlined-basic"
            label="Last Name"
            variant="outlined"
            style={{ width: "500px" }}
            value={lastName}
            onChange={handleLastNameChange}
          />
        </div>
        <div
          style={{ display: "flex", alignItems: "center", marginTop: "20px" }}
        >
          <Typography style={{ fontSize: "20px", marginRight: "90px" }}>
            Email
          </Typography>
          <TextField
            id="outlined-basic"
            label="Email"
            variant="outlined"
            style={{ width: "500px" }}
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <div
          style={{ display: "flex", alignItems: "center", marginTop: "20px" }}
        >
          <Typography style={{ fontSize: "20px", marginRight: "49px" }}>
            Telephone
          </Typography>
          <TextField
            id="outlined-basic"
            label="Telephone"
            variant="outlined"
            style={{ width: "500px" }}
            value={telNumber}
            onChange={handleTelNumberChange}
          />
        </div>
        <div
          style={{ display: "flex", alignItems: "center", marginTop: "20px" }}
        >
          <Typography style={{ fontSize: "20px", marginRight: "70px" }}>
            Address
          </Typography>
          <TextField
            id="outlined-basic"
            label="Address"
            variant="outlined"
            style={{ width: "500px" }}
            value={address}
            onChange={handleAddressChange}
          />
        </div>
        <Button
          variant="contained"
          color="primary"
          style={{
            width: "200px",
            height: "50px",
            marginTop: "50px",
            marginLeft: "250px",
            textTransform: "none",
            fontSize: "20px",
          }}
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </div>
    </Box>
  );
};

export default EditProfilePage;

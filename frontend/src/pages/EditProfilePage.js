import React, { useState, useEffect } from "react";
import { Typography, TextField, Button, IconButton } from "@mui/material";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import { useUser } from "../UserContext";

const EditProfilePage = () => {
  const { user } = useUser();
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
      })
      .catch((error) => {
        console.error("Error updating profile:", error);
      });
  };

  return (
    <div className="profile-container">
      <img src="user.png" alt="user" className="circle-frame" />
      <IconButton
        component="label"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(150%, -140%)",
          backgroundColor: "#f5f5f5",
          borderRadius: "50%",
          padding: "8px",
        }}
      >
        {/* <PhotoCameraIcon /> */}
        <input type="file" accept="image/*" style={{ display: "none" }} />
      </IconButton>
      <div style={{ display: "flex", alignItems: "center", marginTop: "20px" }}>
        <Typography style={{ fontSize: "20px", marginRight: "50px" }}>
          First Name
        </Typography>
        <TextField
          id="outlined-basic"
          label="First Name"
          variant="outlined"
          value={firstName || ''}
          onChange={(e) => setFirstName(e.target.value)}
          style={{ width: "500px" }}
        />
      </div>
      <div style={{ display: "flex", alignItems: "center", marginTop: "20px" }}>
        <Typography style={{ fontSize: "20px", marginRight: "50px" }}>
          Last Name
        </Typography>
        <TextField
          id="outlined-basic"
          label="Last Name"
          variant="outlined"
          value={lastName || ''}
          onChange={(e) => setLastName(e.target.value)}
          style={{ width: "500px" }}
        />
      </div>
      <div style={{ display: "flex", alignItems: "center", marginTop: "20px" }}>
        <Typography style={{ fontSize: "20px", marginRight: "90px" }}>
          Email
        </Typography>
        <TextField
          id="outlined-basic"
          label="Email"
          variant="outlined"
          value={email || ''}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: "500px" }}
        />
      </div>
      <div style={{ display: "flex", alignItems: "center", marginTop: "20px" }}>
        <Typography style={{ fontSize: "20px", marginRight: "49px" }}>
          Telephone
        </Typography>
        <TextField
          id="outlined-basic"
          label="Telephone"
          variant="outlined"
          value={telNumber || ''}
          onChange={(e) => setTelNumber(e.target.value)}
          style={{ width: "500px" }}
        />
      </div>
      <div style={{ display: "flex", alignItems: "center", marginTop: "20px" }}>
        <Typography style={{ fontSize: "20px", marginRight: "70px" }}>
          Address
        </Typography>
        <TextField
          id="outlined-basic"
          label="Address"
          variant="outlined"
          value={address || ''}
          onChange={(e) => setAddress(e.target.value)}
          style={{ width: "500px" }}
        />
      </div>
      <Button
        variant="contained"
        color="primary"
        style={{
          width: "200px",
          height: "50px",
          marginTop: "50px",
          textTransform: "none",
          fontSize: "20px",
        }}
        onClick={handleSubmit}
      >
        Submit
      </Button>
    </div>
  );
};

export default EditProfilePage;

import * as React from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Alert from '@mui/material/Alert';
import { useNavigate } from "react-router-dom";
import { useUser } from '../UserContext';
import { useAuth } from "../AuthContext";


export default function SignUp() {
    const [passwordsMatch, setPasswordsMatch] = useState(true);
    const navigate = useNavigate();
    const { loginUser } = useUser();
    const { isAuthenticated, login, logout } = useAuth();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
      
        const enteredPassword = data.get("password");
        const enteredPasswordConfirmation = data.get("passwordcf");
      
        if (enteredPassword !== enteredPasswordConfirmation) {
          console.log("Password and password confirmation do not match");
          setPasswordsMatch(false);
          return;
        }
        console.log(data);

        const newUser = {
          firstname: data.get("firstName"), // Corrected name
              lastname: data.get("lastName"), // Corrected name
              tel: data.get("tel"),
              email: data.get("email"),
              no: data.get("no"),
              soi: data.get("soi"),
              street: data.get("street"),
              subdistrict: data.get("subdistrict"),
              district: data.get("district"),
              province: data.get("province"),
              zipcode: data.get("zipcode"),
              username: data.get("username"),
              password: enteredPassword,
        }

        try {
          const response = await fetch("http://localhost:5050/addUser", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newUser),
          });
      
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
      
          const result = await response.json();
          loginUser({ id: result.id, ...newUser });
          // loginUser(newUser);
          login();
          navigate('/');

          // Continue with other actions or state updates if needed
        } catch (error) {
          console.error("Error:", error);
        }
      };
      

  return (
    <Container component="main" maxWidth="sm" sx={{ pb: 7 }}>
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h4"
          component="div"
          fontWeight={"bold"}
          sx={{ mb: 3 }}
        >
          <span style={{ color: "black" }}>Welcome to </span>
          <span style={{ color: "orange" }}>BookBelay</span>
        </Typography>
        <Typography component="h1" variant="h5" sx={{ fontWeight: "bold" }}>
          Sign up
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="tel"
                label="Telephone Number"
                name="tel"
              />
            </Grid>
          </Grid>
          <Grid container spacing={2} sx={{ my: 3 }}>
            <Grid item xs={6}>
              <TextField
                required
                fullWidth
                name="no"
                label="No. of house"
                id="no"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth name="soi" label="Soi" id="soi" />
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                fullWidth
                name="street"
                label="Street"
                id="street"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                fullWidth
                name="subdistrict"
                label="Subdistrict"
                id="subdistrict"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                fullWidth
                name="district"
                label="District"
                id="district"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                fullWidth
                name="province"
                label="Province"
                id="province"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                fullWidth
                name="zipcode"
                type="number"
                label="Zip code"
                id="zipcode"
              />
            </Grid>
          </Grid>
          <Grid container spacing={2} sx={{ my: 3 }}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="username"
                label="Username"
                id="username"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="passwordcf"
                label="Password Confirmation"
                id="passwordcf"
                type="password"
              />
            </Grid>
            {!passwordsMatch && (
          <Alert severity="error" variant="filled" sx={{mt:3, mx:'auto'}}>Password and password confirmation do not match</Alert>
        )}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 1, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link variant="body2" href="/login">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

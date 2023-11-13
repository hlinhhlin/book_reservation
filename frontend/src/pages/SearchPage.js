import React, { useState, useEffect } from "react";
import { Typography, Box, TextField, Grid, Paper} from "@mui/material";

const SearchPage = () => {

  return (
    <Box>
      <TextField id="outlined-basic" label="Search in library" variant="outlined" style={{ marginTop: '20px', marginLeft: '20px', width: '500px' }} />
      <Typography variant="h6" style={{ margin: '20px', fontWeight: 'bolder', fontSize: '20px' }}>Newest</Typography>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Paper elevation={3} className="paperStyle" style={{ boxShadow: 'none' }}>
            <img src="7472b79d-bda6-4389-9a95-293304b517e9 1.png" alt="Book 1" className="imageStyle"/>
            <Typography variant="subtitle1" style={{ margin: '20px', fontSize: '20px', cursor: 'pointer' }}>The Shining</Typography>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper elevation={3}  className="paperStyle" style={{ boxShadow: 'none' }}>
            <img src="7db4f74b-945d-4016-af0d-0c5e192294dd 1.png" alt="Book 2"  className="imageStyle"/>
            <Typography variant="subtitle1" style={{ margin: '20px', fontSize: '20px', cursor: 'pointer' }}>1984</Typography>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper elevation={3} className="paperStyle" style={{ boxShadow: 'none' }}>
            <img src="0fcd449f-a076-480e-a740-07a2c100877a 1.png" alt="Book 3"  className="imageStyle"/>
            <Typography variant="subtitle1" style={{ margin: '20px', fontSize: '20px', cursor: 'pointer' }}>Woman</Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
    
  );
}
export default SearchPage;
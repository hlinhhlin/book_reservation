import React, { useState } from 'react';
import "../style.css";
import { Button, TextField, Typography } from '@mui/material';


const TopUpPage = () => {
    const [pressed, setPressed] = useState(false);
    
    return (
      <div>
        <p style={{fontSize: '20px', fontWeight: 'bold', marginTop: '50px', marginBottom: '30px', marginLeft: '50px'}}>Topup eMoney</p>
        <div className="topup-container">
            <Button variant="outlined" className="topup-button" value={100} style={{marginRight: '50px', borderWidth: '2px', borderRadius: '30px', color: 'black'}}>
                100
            </Button>
            <Button variant="outlined" className="topup-button" value={200} style={{marginRight: '50px', borderWidth: '2px', borderRadius: '30px', color: 'black'}}>
                200
            </Button>
            <Button variant="outlined" className="topup-button" value={300} style={{marginRight: '50px', borderWidth: '2px', borderRadius: '30px', color: 'black'}}>
                300
            </Button>
            <Button variant="outlined" className="topup-button" value={400} style={{marginRight: '50px', borderWidth: '2px', borderRadius: '30px', color: 'black'}}>
                400
            </Button>
            <Button variant="outlined" className="topup-button" value={500} style={{marginRight: '50px', borderWidth: '2px', borderRadius: '30px', color: 'black'}}>
                500
            </Button>
        </div>
        <div style={{ display: "flex"}}>
            <p style={{marginTop: '55px', marginLeft: '95px', marginRight: '20px', fontSize: '17px'}}>Specific Amount</p>
            <TextField id="outlined-basic" label="Amount" variant="outlined" style={{ height: '60px', width: '305px', marginTop:'40px'}}/>
        </div>
        <p style={{fontSize: '20px', fontWeight: 'bold', marginTop: '50px', marginBottom: '30px', marginLeft: '50px'}}>Payment Method</p>
        <div>
            <Button variant="contained" className="button" style={{textTransform: "none", marginLeft: "95px",  marginRight: "40px", marginBottom: '50px',  fontSize: "18px", color: "black", background: "#f5f5f5"}}>
                <img src="Banking.png" alt="Icon" style={{ marginBottom: "10px" }} />
                    Internet Banking
            </Button>
            <Button variant="contained" className="button" style={{textTransform: "none", marginRight: "20px", marginBottom: '50px', fontSize: "18px", color: "black", background: "#f5f5f5"}}>
                <img src="Cash.png" alt="Icon" style={{ marginBottom: "5px" }} />
                    Cash
            </Button>
        </div>
        <div style={{ display: "flex", marginLeft: "245px", marginBottom: "100px" }}>
                <Button variant="contained" style={{ width: "150px", height: "55px", marginRight: "40px", textTransform: "none", fontSize: '20px', color: 'black', backgroundColor: 'white' }}>
                    Cancel
                </Button>
                <Button variant="contained" color="primary" style={{ width: "150px", height: "55px", marginRight: "40px", textTransform: "none", fontSize: '20px' }}>
                    Confirm
                </Button>
            </div>
      </div>
    );
  };
    
export default TopUpPage;
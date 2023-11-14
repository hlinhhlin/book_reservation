import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";


const TransactionHistoryPage = () => {

    return (
        
        <Box>
            <div style={{display: "flex"}}>
                <div style={{marginLeft: "50px", marginTop: "50px", lineHeight: "1.5"}}>
                    <p>dd/mm/yyyy</p>
                    <p style={{color: "#444444"}}>Type: </p>
                    <p style={{color: "#444444"}}>Status</p>
                </div>
                <div>
                    <h5 style={{color:"red", marginTop: "100px", marginLeft: "1100px"}}>100 BAHT</h5>
                </div>
                </div>
            <hr />
        </Box>

        
    );

};

export default TransactionHistoryPage;
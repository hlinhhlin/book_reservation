import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";


function CheckOutPage() {
    const [bookData, setBookData] = useState([]);

   

    return (
        <Box>
        <div className="img-left-format" style={{display: "flex"}}>
            <img src="bookcover2.jpg" alt="Book 2"/>
            <div className="text-format">
                <h4>Title</h4>
                <p>author name</p>
                <div style={{display: "flex"}}>
                    <div className="date-container">
                        <p>Borrowed Date:</p>
                        <p>dd/mm/yyyy</p>
                    </div>
                    <div className="date-container" style={{marginLeft: '100px'}}>
                        <p>Return Date:</p>
                        <p>dd/mm/yyyy</p>
                    </div>
                </div>   
            </div>
        </div>
        <hr />
        <div className="img-left-format" style={{display: "flex"}}>
            <img src="bookcover2.jpg" alt="Book 2"/>
            <div className="text-format">
                <h4>Title</h4>
                <p>author name</p>
                <div style={{display: "flex"}}>
                    <div className="date-container">
                        <p>Borrowed Date:</p>
                        <p>dd/mm/yyyy</p>
                    </div>
                    <div className="date-container" style={{marginLeft: '100px'}}>
                        <p>Return Date:</p>
                        <p>dd/mm/yyyy</p>
                    </div>
                </div>   
            </div>
        </div>
        <hr />
        </Box>


    );
};

export default CheckOutPage;
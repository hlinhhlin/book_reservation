import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";


const BookFinePage = () => {
    
    return (
        <Box>
        <div className="img-left-format" style={{display: "flex"}}>
            <img src="bookcover2.jpg" alt="Book 2"/>
            <div className="text-format">
                <h4>Title</h4>
                <p>author name</p>
                <div style={{display: "flex"}}>
                    <div className="date-container" style={{marginTop: "65px"}}>
                        <p>dd/mm/yyyy</p>
                    </div>
                </div>   
            </div>
            <h5 style={{color: "red", marginTop: "210px", marginLeft: "900px"}}>10 BAHT</h5>
        </div>
        <hr />
        </Box>
    );

};

export default BookFinePage;
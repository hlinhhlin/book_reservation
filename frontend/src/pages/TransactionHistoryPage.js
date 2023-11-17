import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { useUser } from "../UserContext";
import { FormatDate } from "../Config";

const TransactionHistoryPage = () => {
  const { user } = useUser();
  const [transaction, setTransaction] = useState([]);

  useEffect(() => {
    // Fetch transactions when the component mounts
    fetch(`http://localhost:5050/user/transaction/${user.id}`)
      .then((response) => response.json())
      .then((data) => {
        setTransaction(data);
      })
      .catch((error) => {
        console.log("Error fetching transactions:", error);
      });
  }, []);

  return (
    <Box>
    {transaction &&
      transaction.map(({ TransactionDate, Status, Type, Amount }, index) => (
        <div key={TransactionDate}>
          <div style={{ display: "flex" }}>
            <div
              style={{
                marginLeft: "50px",
                marginTop: "50px",
                lineHeight: "1.5",
              }}
            >
              <p>{FormatDate(TransactionDate)}</p>
              <p style={{ color: "#444444" }}>Type: {Type}</p>
              <p style={{ color: "#444444" }}>Status: {Status}</p>
            </div>
            <div>
              <h5
                style={{
                  color: Type === "fine" ? "red" : Type === "top-up" ? "green" : "black",
                  marginTop: "100px",
                  marginLeft: "1100px",
                }}
              >
                {Amount} BAHT
              </h5>
            </div>
          </div>
          {index < transaction.length - 1 && <hr />} {/* Add horizontal line if it's not the last transaction */}
        </div>
      ))}
  </Box>
  
  );
};

export default TransactionHistoryPage;

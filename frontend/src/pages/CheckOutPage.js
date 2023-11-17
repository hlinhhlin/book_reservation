import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { FormatDate } from "../Config";
import { useUser } from "../UserContext";

function CheckOutPage() {
    const [bookData, setBookData] = useState([]);
    const { user } = useUser();

    const arrayBufferToBase64 = (buffer) => {
        let binary = "";
        const bytes = new Uint8Array(buffer);
        for (let i = 0; i < bytes.byteLength; i++) {
          binary += String.fromCharCode(bytes[i]);
        }
        return btoa(binary);
      };

    useEffect(() => {
        // Fetch transactions when the component mounts
        fetch(`http://localhost:5050/user/checkout/${user.id}`)
          .then((response) => response.json())
          .then((data) => {
            setBookData(data.books);
          })
          .catch((error) => {
            console.log("Error fetching transactions:", error);
          });
      }, []);

    return (
<Box>
  {bookData && bookData.map(({ Title, BookImage, PenName, BorrowDate, ReturnDate }, index) => (
    <React.Fragment key={index}>
      <div className="img-left-format" style={{ display: "flex" }}>
        <img src={`data:image/jpeg;base64,${arrayBufferToBase64(
                  BookImage.data
                )}`} alt="Book 2" />
        <div className="text-format">
          <h4>Title: {Title}</h4>
          <p>Author: {PenName}</p>
          <div style={{ display: "flex" }}>
            <div className="date-container">
              <p>Borrowed Date:</p>
              <p>{FormatDate(BorrowDate)}</p>
            </div>
            <div className="date-container" style={{ marginLeft: '100px' }}>
              <p>Return Date:</p>
              <p>{FormatDate(ReturnDate)}</p>
            </div>
          </div>
        </div>
      </div>
      {index < bookData.length - 1 && <hr />} {/* Add horizontal line if it's not the last item */}
    </React.Fragment>
  ))}
</Box>



    );
};

export default CheckOutPage;
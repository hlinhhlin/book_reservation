import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NavBar from "./components/Navbar";
import SearchPage from "./pages/SearchPage";
import Login from "./pages/LogInPage";
import SignUp from "./pages/SignUpPage";
import QRcode from "./pages/QRcode";
import ProfilePage from "./pages/ProfilePage";
import EditProfilePage from "./pages/EditProfilePage";
import TopUpPage from "./pages/TopUpPage";
import CheckOutPage from "./pages/CheckOutPage";
import HoldPage from "./pages/HoldPage";
import BookFinePage from "./pages/BookFinePage";
import TransactionHistoryPage from "./pages/TransactionHistoryPage";
import GenreBookPage from "./pages/GenreBookPage";
import BookListPage from "./pages/BookListPage";
import BookDetailsPage from "./pages/BookDetailsPage";

import { UserProvider } from "./Context/UserContext";
import { AuthProvider } from "./Context/AuthContext";
import { GenreProvider } from "./Context/GenreContext";
import { SearchProvider } from "./Context/SearchContext";
import { BookProvider } from "./Context/BookContext";

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <UserProvider>
          <SearchProvider>
            <GenreProvider>
              <BookProvider>
                <div>
                  <NavBar />
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/search" element={<SearchPage />} />
                    <Route path="/qrcode" element={<QRcode />} />
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="/editprofile" element={<EditProfilePage />} />
                    <Route path="/topup" element={<TopUpPage />} />
                    <Route path="/checkOut" element={<CheckOutPage />} />
                    <Route path="/hold" element={<HoldPage />} />
                    <Route path="/bookFine" element={<BookFinePage />} />
                    <Route path="/bookslist" element={<BookListPage />} />
                    <Route exact path="/book/:bookID" element={<BookDetailsPage />} />
                    <Route
                      path="/transactionHistory"
                      element={<TransactionHistoryPage />}
                    />
                    <Route path="/genre/:genre" element={<GenreBookPage />} />
                  </Routes>
                </div>
              </BookProvider>
            </GenreProvider>
          </SearchProvider>
        </UserProvider>
      </Router>
    </AuthProvider>
  );
}

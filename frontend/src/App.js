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
import FictionPage from "./pages/FictionPage";
import MysteryPage from "./pages/MysteryPage";
import RomancePage from "./pages/RomancePage";
import FantasyPage from "./pages/FantasyPage";
import ThrillerPage from "./pages/ThrillerPage";
import HorrorPage from "./pages/HorrorPage";
import HistoryPage from "./pages/HistoryPage";
import BiographyPage from "./pages/BiographyPage";
import ComedyPage from "./pages/ComedyPage";

import { UserProvider } from "./UserContext";
import { AuthProvider } from "./AuthContext";




export default function App() {
  return (
    <AuthProvider>
      <Router>
        <UserProvider>
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
              <Route path="/transactionHistory" element={<TransactionHistoryPage />} /> 
              <Route path="/fiction" element={<FictionPage />} /> 
              <Route path="/mystery" element={<MysteryPage />} /> 
              <Route path="/romance" element={<RomancePage />} /> 
              <Route path="/fantasy" element={<FantasyPage />} /> 
              <Route path="/thriller" element={<ThrillerPage />} /> 
              <Route path="/horror" element={<HorrorPage />} /> 
              <Route path="/history" element={<HistoryPage />} /> 
              <Route path="/biography" element={<BiographyPage />} /> 
              <Route path="/comedy" element={<ComedyPage />} /> 
            </Routes>
          </div>
        </UserProvider>
      </Router>
    </AuthProvider>
  );
}

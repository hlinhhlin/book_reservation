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
            </Routes>
          </div>
        </UserProvider>
      </Router>
    </AuthProvider>
  );
}

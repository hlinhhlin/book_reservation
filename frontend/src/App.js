import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NavBar from "./components/Navbar";
import SearchPage from "./pages/SearchPage";
import Login from "./pages/LogInPage";
import SignUp from "./pages/SignUpPage";
import QRcode from "./pages/QRcode";
import ProfilePage from "./pages/ProfilePage";

import { UserProvider } from "./UserContext";
import { AuthProvider } from "./AuthContext";
import QRcode from "./pages/QRcode";


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

            </Routes>
          </div>
        </UserProvider>
      </Router>
    </AuthProvider>
  );
}

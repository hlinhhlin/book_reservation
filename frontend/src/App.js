import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import NavBar from './components/Navbar';
import SearchPage from './pages/SearchPage';
import Login from './pages/LogInPage';
import SignUp from './pages/SignUpPage';


export default function App() {
  return (
    <Router>
      <div>
        <NavBar/>
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/search" element={<SearchPage/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<SignUp/>} />

        </Routes>
      </div>
    </Router>
  );
}

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import NavBar from './components/Navbar';
import SearchPage from './pages/SearchPage';

export default function App() {
  return (
    <Router>
      <div>
        <NavBar/>
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/search" element={<SearchPage/>} />
          {/* Define more routes as needed */}
        </Routes>
      </div>
    </Router>
  );
}

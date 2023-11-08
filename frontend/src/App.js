import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './component/Home';

export default function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* Define more routes as needed */}
        </Routes>
      </div>
    </Router>
  );
}

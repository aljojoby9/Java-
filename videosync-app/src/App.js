import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import MainLayout from './components/Layout/MainLayout';
import HomePage from './pages/HomePage';
import MeetingPage from './pages/MeetingPage';

function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/meeting" element={<MeetingPage />} />
          {/* Later, we can use /meeting/:meetingId for specific meetings */}
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;

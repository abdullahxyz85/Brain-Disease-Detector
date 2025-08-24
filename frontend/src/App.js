import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import CognitiveGames from './pages/CognitiveGames';
import MemoryGame from './components/games/MemoryGame';
import ReactionGame from './components/games/ReactionGame';
import ProblemSolvingGame from './components/games/ProblemSolvingGame';
import SpatialSkillsGame from './components/games/SpatialSkillsGame';
import CognitiveQuiz from './pages/CognitiveQuiz';
import SpeechAnalysis from './pages/SpeechAnalysis';
import Resources from './pages/Resources';
import ResultsDashboard from './components/results/ResultsDashboard';
import Login from './components/auth/Login';
import SignUp from './components/auth/SignUp';
import ForgotPassword from './components/auth/ForgotPassword';
import PrivateRoute from './components/auth/PrivateRoute';
import AuthStatusIndicator from './components/auth/AuthStatusIndicator';
import { AuthProvider } from './contexts/AuthContext';
import './App.css';
import AlzheimerDetector from './pages/AlzheimerDetector';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app">
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/games" element={<CognitiveGames />} />
              <Route path="/games/memory" element={<MemoryGame />} />
              <Route path="/games/reaction" element={<ReactionGame />} />
              <Route path="/games/problem-solving" element={<ProblemSolvingGame />} />
              <Route path="/games/spatial" element={<SpatialSkillsGame />} />
              <Route path="/quiz" element={<CognitiveQuiz />} />
              <Route path="/speech" element={<SpeechAnalysis />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="/results" element={
                <PrivateRoute>
                  <ResultsDashboard />
                </PrivateRoute>
              } />
              <Route path="/alzheimer-detector" element={<AlzheimerDetector />} />
            </Routes>
          </main>
          <Footer />
          <AuthStatusIndicator />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;

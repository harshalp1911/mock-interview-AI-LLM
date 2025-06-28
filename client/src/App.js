import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import NewMock from './pages/NewMock';
import ReviewMock from './pages/ReviewMock';
import InterviewRoom from './pages/InterviewRoom';

import OAuthSuccess from './pages/OAuthSuccess';
import Dashboard from './pages/Dashboard';
import LoginButton from './components/LoginButton';
import LogoutButton from './components/LogoutButton';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/new" replace />} />
      <Route path="/new" element={<NewMock />} />
      <Route path="/review/:mockId" element={<ReviewMock />} />
      <Route path="/interview/:mockId" element={<InterviewRoom />} />
      <Route path="/login" element={<LoginButton />} />
      <Route path="/oauth-success" element={<OAuthSuccess />} />
      <Route
        path="/dashboard"
        element={
          <>
            <Dashboard />
            <LogoutButton />
          </>
        }
      />
    </Routes>
  );
}

export default App;

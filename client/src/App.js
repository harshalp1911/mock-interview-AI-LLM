// client/src/App.js
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Navbar from './components/Navbar';
import NewMock from './pages/NewMock';
import ReviewMock from './pages/ReviewMock';
import InterviewRoom from './pages/InterviewRoom';
import OAuthSuccess from './pages/OAuthSuccess';
import Dashboard from './pages/Dashboard';
import RequireAuth from './components/RequireAuth';

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        {/* The user always lands on /new */}
        <Route path="/" element={<Navigate to="/new" replace />} />

        {/* Public: landing page */}
        <Route path="/new" element={<NewMock />} />

        {/* Still require login for these */}
        <Route
          path="/review/:mockId"
          element={
            <RequireAuth redirectTo="/new">
              <ReviewMock />
            </RequireAuth>
          }
        />
        <Route
          path="/interview/:mockId"
          element={
            <RequireAuth redirectTo="/new">
              <InterviewRoom />
            </RequireAuth>
          }
        />
        <Route
          path="/dashboard"
          element={
            <RequireAuth redirectTo="/new">
              <Dashboard />
            </RequireAuth>
          }
        />

        {/* OAuth landing — stores token then navigates on */}
        <Route path="/oauth-success" element={<OAuthSuccess />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;

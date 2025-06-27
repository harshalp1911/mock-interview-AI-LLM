import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import NewMock     from './pages/NewMock';
import ReviewMock  from './pages/ReviewMock';
import InterviewRoom from './pages/InterviewRoom';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/new" replace />} />
      <Route path="/new" element={<NewMock />} />
      <Route path="/review/:mockId" element={<ReviewMock />} />
      <Route path="/interview/:mockId" element={<InterviewRoom />} />
    </Routes>
  );
}

export default App;

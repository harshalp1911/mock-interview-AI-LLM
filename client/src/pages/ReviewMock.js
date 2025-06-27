import React, { useState, useEffect } from 'react';
import { useParams, useNavigate }     from 'react-router-dom';
import axios                          from 'axios';
import '../App.css';

export default function ReviewMock() {
  const { mockId }       = useParams();
  const navigate         = useNavigate();
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:5001/api/mocks/${mockId}`)
      .then(res => setQuestions(res.data.questions))
      .catch(() => alert('Failed to load questions'));
  }, [mockId]);

  return (
    <div className="review-mock">
      <h2>Review Your Questions</h2>
      <ul className="review-list">
        {questions.map((q, i) => (
          <li key={q._id || i}>
            {i + 1}. {q.text}
          </li>
        ))}
      </ul>
      <button
        className="start-btn"
        onClick={() => navigate(`/interview/${mockId}`)}
        disabled={!questions.length}
      >
        Start Interview
      </button>
    </div>
  );
}

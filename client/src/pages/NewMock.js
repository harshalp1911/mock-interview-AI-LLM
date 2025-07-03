import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './NewMock.css'; // Import custom styles

const NewMock = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const [questions, setQuestions] = useState(['']);

  const requireLogin = () => {
    alert('Please log in before creating mocks.');
    navigate('/new');
  };

  const handleAddQuestion = () => {
    if (!token) return requireLogin();
    setQuestions(qs => [...qs, '']);
  };

  const handleRemoveQuestion = (index) => {
    if (!token) return requireLogin();
    setQuestions(qs => qs.filter((_, i) => i !== index));
  };

  const handleQuestionChange = (index, value) => {
    const copy = [...questions];
    copy[index] = value;
    setQuestions(copy);
  };

  const handleSubmit = async () => {
    if (!token) return requireLogin();

    try {
      const res = await fetch('http://localhost:5001/api/mocks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ questions })
      });

      const data = await res.json();
      if (!res.ok) {
        return alert(data.msg || 'Failed to create mock');
      }

      navigate(`/review/${data.mockId}`);
    } catch (err) {
      console.error(err);
      alert('Network error — please try again.');
    }
  };

  return (
    <div className="mock-container">
      <div className="left-panel">
        <h3> Start your interview Practice </h3>
        <ul>
            <li> Create your own ques.</li>
            <li> Submit the ques and start your interview room</li>
        </ul>
        <h3>🧠 Interview Tips</h3>
        <ul>
          <li>Include both technical and behavioral questions.</li>
          <li>Start with “Tell me about yourself.”</li>
          <li>Ask open-ended questions to simulate real interviews.</li>
        </ul>

        <h4>💡 Sample Questions</h4>
        <ul>
          <li>What are your strengths and weaknesses?</li>
          <li>Explain closures in JavaScript.</li>
          <li>How would you design a scalable system?</li>
        </ul>

        <a href="https://github.com/harshalp1911/mock-interview-AI-LLM" target ="_blank">Visit for Documentation</a>
        
        <ul> 
            <h3>Meet Developers</h3>
          <li><a href="https://github.com/harshalp1911" target ="_blank">Harshal Patil</a></li>
          <li><a href="https://github.com/turbo7slug" target ="_blank"> Mohd Yusuf Hesam</a></li>
          <li><a href="https://github.com/Im-Alam" target ="_blank">Imran Alam</a></li>
          <li><a href="https://github.com/rishi-0205" target ="_blank">Rishi Srivastava</a></li>
        </ul>
      </div>

      <div className="right-panel">
        <h2>Create Mock Interview</h2>
        <div className="question-list">
          {questions.map((q, i) => (
            <div key={i} className="question-item">
              <input
                type="text"
                value={q}
                placeholder={`Question ${i + 1}`}
                onChange={e => handleQuestionChange(i, e.target.value)}
              />
              <button className="remove-btn" onClick={() => handleRemoveQuestion(i)}>
                Remove
              </button>
            </div>
          ))}
        </div>

        <div className="actions">
          <button className="add-btn" onClick={handleAddQuestion}>
            Add Question
          </button>
          <button className="submit-btn" onClick={handleSubmit} disabled={!token}>
            Submit Questions
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewMock;

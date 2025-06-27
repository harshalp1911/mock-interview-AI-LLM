import React, { useState } from 'react';
import { useNavigate }      from 'react-router-dom';
import axios                from 'axios';
import '../App.css';

export default function CreateMock() {
  const [questions, setQuestions] = useState(['']);
  const [loading, setLoading]     = useState(false);
  const navigate                  = useNavigate();

  const updateQuestion = (idx, text) => {
    const qs = [...questions];
    qs[idx] = text;
    setQuestions(qs);
  };

  const addQuestion = () => setQuestions([...questions, '']);

  const removeQuestion = idx => {
    const qs = questions.filter((_, i) => i !== idx);
    setQuestions(qs);
  };

  const submitQuestions = async () => {
    if (!questions.every(q => q.trim())) return;
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5001/api/mocks', {
        questions: questions.map((t, i) => ({ text: t, order: i }))
      });
      navigate(`/review/${res.data.mockId}`);
    } catch (err) {
      console.error(err);
      alert('Submission failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-mock">
      <h2>Create Mock Interview</h2>
      <div className="question-list">
        {questions.map((q, i) => (
          <div className="question-item" key={i}>
            <input
              type="text"
              placeholder={`Question ${i + 1}`}
              value={q}
              onChange={e => updateQuestion(i, e.target.value)}
            />
            <button
              className="remove-btn"
              onClick={() => removeQuestion(i)}
              disabled={questions.length === 1}
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="actions">
        <button className="add-btn" onClick={addQuestion}>
          Add Question
        </button>
        <button
          className="submit-btn"
          onClick={submitQuestions}
          disabled={loading || !questions.every(q => q.trim())}
        >
          {loading ? 'Submitting…' : 'Submit Questions'}
        </button>
      </div>
    </div>
  );
}

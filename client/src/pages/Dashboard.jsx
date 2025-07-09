//src/pages/Dashboard.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    // Decode JWT manually
    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const decodedData = JSON.parse(atob(base64));
      setUser(decodedData);
    } catch (err) {
      console.error("Invalid token");
      navigate("/login");
    }
  }, [navigate]);

  if (!user) return <p>Loading...</p>;

  return (
    <div>
      <h1>Welcome, {user.name} 👋</h1>
      <p>Email: {user.email}</p>
      <p> Feature not yet Implemented...
        <table> Approach Break Down
            <tr> 👉 Store all user responses and corresponding interview questions during the session.</tr>
            <tr>👉 Send each Q&A pair to an AI model to evaluate the quality of the answer.</tr>
            <tr>👉  Generate a score and feedback for each question, then calculate an overall interview score.</tr>
            <tr>👉  Display a summary with questions, user answers, individual scores, and final feedback.</tr>
        </table>
      </p>
    </div>
  );
};

export default Dashboard;

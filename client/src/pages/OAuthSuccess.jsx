// src/pages/OAuthSucess.jsx

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const OAuthSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    console.log("Token received:", token);

    if (token) {
      localStorage.setItem("token", token);
      // ✅ Delay the redirect to ensure state settles
      setTimeout(() => {
        navigate("/new");
      }, 100);
    } else {
      // ✅ Don't redirect unless token was never saved
      const savedToken = localStorage.getItem("token");
      if (!savedToken) {
        navigate("/login");
      }
    }
  }, [navigate]);

  return <p>Logging you in...</p>;
};

export default OAuthSuccess;

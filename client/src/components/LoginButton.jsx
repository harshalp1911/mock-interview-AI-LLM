// src/components/LoginButton.jsx
const LoginButton = () => {
  const handleLogin = () => {
    window.location.href = "http://localhost:5001/api/auth/google";
  };

  return <button onClick={handleLogin}>Login with Google</button>;
};

export default LoginButton;

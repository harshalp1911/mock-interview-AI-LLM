// src/components/LogoutButton.jsx
const LogoutButton = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;

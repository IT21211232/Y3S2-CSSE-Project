const LogoutPage = () => {
  localStorage.setItem("role", "PUBLIC");
  window.location = "/login";

  return null;
};

export default LogoutPage;

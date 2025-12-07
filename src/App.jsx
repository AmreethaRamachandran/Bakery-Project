import { useState } from "react";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import Categories from "./components/Categories";
import BestSellers from "./components/BestSellers";
import SavoryTreasures from "./components/SavoryTreasures";
import SweetLegacy from "./components/SweetLegacy";
import RoyalBites from "./components/RoyalBites";
import Footer from "./components/Footer";
import LoginPage from "./components/LoginPage"; 
import SignupPage from "./components/SignupPage";

function App() {
  const [currentPage, setCurrentPage] = useState("login"); // Start with login page
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setCurrentPage("home");
  };

  const handleSignup = () => {
    setCurrentPage("signup");
  };

  const handleBackToLogin = () => {
    setCurrentPage("login");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentPage("login");
  };

  // Show login page first
  if (currentPage === "login") {
    return <LoginPage onLogin={handleLogin} onSignup={handleSignup} />;
  }

  // Show signup page
  if (currentPage === "signup") {
    return <SignupPage onBackToLogin={handleBackToLogin} />;
  }

  // Show home page after login
  return (
    <div className="font-sans">
      <Navbar onLogout={handleLogout} isLoggedIn={isLoggedIn} />
      <HeroSection />
      <Categories />
      <BestSellers />
      <SavoryTreasures />
      <SweetLegacy />
      <RoyalBites />
      <Footer />
    </div>
  );
}

export default App;

import { useState } from "react";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import TimelessDelights from "./components/TimelessDelights";
import Categories from "./components/Categories";
import BestSellers from "./components/BestSellers";
import SavoryTreasures from "./components/SavoryTreasures";
import SweetLegacy from "./components/SweetLegacy";
import RoyalBites from "./components/RoyalBites";
import ComboPack from "./components/ComboPack";
import ShopByCollection from "./components/ShopByCollection";
import TasteOverGenerations from "./components/TasteOverGenerations";
import CustomerLove from "./components/CustomerLove";
import BehindTheScenes from "./components/BehindTheScenes";
import OurJourney from "./components/OurJourney";
import Footer from "./components/Footer";
import LoginPage from "./components/LoginPage"; 
import SignupPage from "./components/SignupPage";
import ComboPage from "./components/ComboPage";
import Savouries from "./components/Savouries";
import Sweets from "./components/Sweets";
import KitchenSpecials from "./components/KitchenSpecials";

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

  const handleCategoryClick = (categoryName) => {
    if (categoryName === 'Combo') {
      window.scrollTo(0, 0);
      setCurrentPage("combo");
    }
  };

  const handleBackToHome = () => {
    window.scrollTo(0, 0);
    setCurrentPage("home");
  };

  const handleNavComboClick = () => {
    window.scrollTo(0, 0);
    setCurrentPage("combo");
  };

  const handleNavSavouriesClick = () => {
    window.scrollTo(0, 0);
    setCurrentPage("savouries");
  };

  const handleNavSweetsClick = () => {
    window.scrollTo(0, 0);
    setCurrentPage("sweets");
  };

  const handleNavKitchenSpecialsClick = () => {
    window.scrollTo(0, 0);
    setCurrentPage("kitchenSpecials");
  };

  // Show login page first
  if (currentPage === "login") {
    return <LoginPage onLogin={handleLogin} onSignup={handleSignup} />;
  }

  // Show signup page
  if (currentPage === "signup") {
    return <SignupPage onBackToLogin={handleBackToLogin} />;
  }

  // Show savouries page
  if (currentPage === "savouries") {
    return (
      <div className="font-sans">
        <Navbar onHomeClick={handleBackToHome} onLogout={handleLogout} isLoggedIn={isLoggedIn} onComboClick={handleNavComboClick} onSavouriesClick={handleNavSavouriesClick} onSweetsClick={handleNavSweetsClick} onKitchenSpecialsClick={handleNavKitchenSpecialsClick} currentPage={currentPage} />
        <Savouries onBack={handleBackToHome} />
        <Footer />
      </div>
    );
  }

  // Show sweets page
  if (currentPage === "sweets") {
    return (
      <div className="font-sans">
        <Navbar onHomeClick={handleBackToHome} onLogout={handleLogout} isLoggedIn={isLoggedIn} onComboClick={handleNavComboClick} onSavouriesClick={handleNavSavouriesClick} onSweetsClick={handleNavSweetsClick} onKitchenSpecialsClick={handleNavKitchenSpecialsClick} currentPage={currentPage} />
        <Sweets onBack={handleBackToHome} />
        <Footer />
      </div>
    );
  }

  // Show kitchen specials page
  if (currentPage === "kitchenSpecials") {
    return (
      <div className="font-sans">
        <Navbar onHomeClick={handleBackToHome} onLogout={handleLogout} isLoggedIn={isLoggedIn} onComboClick={handleNavComboClick} onSavouriesClick={handleNavSavouriesClick} onSweetsClick={handleNavSweetsClick} onKitchenSpecialsClick={handleNavKitchenSpecialsClick} currentPage={currentPage} />
        <KitchenSpecials onBack={handleBackToHome} />
        <Footer />
      </div>
    );
  }

  // Show combo page
  if (currentPage === "combo") {
    return (
      <div className="font-sans">
        <Navbar onHomeClick={handleBackToHome} onLogout={handleLogout} isLoggedIn={isLoggedIn} onComboClick={handleNavComboClick} onSavouriesClick={handleNavSavouriesClick} onSweetsClick={handleNavSweetsClick} onKitchenSpecialsClick={handleNavKitchenSpecialsClick} currentPage={currentPage} />
        <ComboPage onBack={handleBackToHome} />
        <Footer />
      </div>
    );
  }

  // Show home page after login
  return (
    <div className="font-sans">
      <Navbar onHomeClick={handleBackToHome} onLogout={handleLogout} isLoggedIn={isLoggedIn} onComboClick={handleNavComboClick} onSavouriesClick={handleNavSavouriesClick} onSweetsClick={handleNavSweetsClick} onKitchenSpecialsClick={handleNavKitchenSpecialsClick} currentPage={currentPage} />
      <HeroSection />
      <Categories onCategoryClick={handleCategoryClick} />
      <BestSellers />
      <SavoryTreasures />
      <SweetLegacy />
      <RoyalBites />
      <TimelessDelights />
      <ComboPack />
      <ShopByCollection />
      <TasteOverGenerations />
      <CustomerLove />
      <BehindTheScenes />
      <OurJourney />
      <Footer />
    </div>
  );
}

export default App;

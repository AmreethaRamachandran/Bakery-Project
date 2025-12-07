import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import LoginPage from "./components/LoginPage"; 
import SignupPage from "./components/SignupPage";

function App() {
  return (
    <div className="font-sans">
      <Navbar />

      <Routes>
        {/* Home page */}
        <Route path="/" element={<HeroSection />} />
        
        {/* Login page */}
        <Route path="/login" element={<LoginPage />} />

        {/* Signup page */}
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </div>
  );
}

export default App;

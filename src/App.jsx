import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import Categories from "./components/Categories";
import BestSellers from "./components/BestSellers";
import SavoryTreasures from "./components/SavoryTreasures";
import SweetLegacy from "./components/SweetLegacy";
import RoyalBites from "./components/RoyalBites";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="font-sans">
      <Navbar />
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

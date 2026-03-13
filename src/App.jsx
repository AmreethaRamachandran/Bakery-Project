import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/firebaseConfig";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import TimelessDelights from "./components/TimelessDelights";
import Categories from "./components/Categories";
import BestSellers from "./components/BestSellers";
import SavoryTreasures from "./components/SavoryTreasures";
import SweetLegacy from "./components/SweetLegacy";
import ComboPack from "./components/ComboPack";
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
import ReviewPage from "./components/ReviewPage";
import ProductDetails from "./components/ProductDetails";
import CartPage from "./components/CartPage";
import NavbarWithCart from "./components/NavbarWithCart";
import CartDrawer from "./components/CartDrawer";
import { CartProvider } from "./context/CartContext";

function App() {
  const [currentPage, setCurrentPage] = useState("login");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  // ✅ NEW: Loading state while Firebase checks auth
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  // ✅ NEW: Check Firebase auth on app load
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is logged in
        setIsLoggedIn(true);
        setCurrentPage("home");
      } else {
        // User is not logged in
        setIsLoggedIn(false);
        setCurrentPage("login");
      }
      // Finished checking auth
      setIsAuthLoading(false);
    });

    return unsubscribe;
  }, []);

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
    } else if (categoryName === 'Murukku') {
      window.scrollTo(0, 0);
      setCurrentPage("murukku");
    } else if (categoryName === 'Specials') {
      window.scrollTo(0, 0);
      setCurrentPage("kitchenSpecials");
    } else if (categoryName === 'Mixture') {
      window.scrollTo(0, 0);
      setCurrentPage("mixture");
    } else if (categoryName === 'Laddu') {
      window.scrollTo(0, 0);
      setCurrentPage("laddu");
    } else if (categoryName === 'Savouries') {
      window.scrollTo(0, 0);
      setCurrentPage("savouries");
    } else if (categoryName === 'Sweets') {
      window.scrollTo(0, 0);
      setCurrentPage("sweets");
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

  const handleWriteReviewClick = () => {
    window.scrollTo(0, 0);
    setCurrentPage("review");
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    window.scrollTo(0, 0);
    setCurrentPage("productDetails");
  };

  const handleCartClick = () => {
    window.scrollTo(0, 0);
    setCurrentPage("cart");
  };

  const handleCheckout = () => {
    alert("Proceeding to checkout...");
  };



  // ✅ NEW: Show loading splash while Firebase checks auth
  if (isAuthLoading) {
    return (
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        background: "linear-gradient(135deg, #FFF8F0, #FFF0EA)",
        fontFamily: "'Playfair Display', serif"
      }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 20 }}>🍰</div>
          <div style={{ fontSize: 24, fontWeight: 700, color: "#8B4513", marginBottom: 10 }}>
            From Karaikudi
          </div>
          <div style={{ fontSize: 14, color: "#888", marginBottom: 20 }}>
            Loading your delicious experience...
          </div>
          <div style={{
            width: 40,
            height: 40,
            border: "4px solid #FF6B35",
            borderTop: "4px solid transparent",
            borderRadius: "50%",
            margin: "0 auto",
            animation: "spin 1s linear infinite"
          }} />
          <style>{`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}</style>
        </div>
      </div>
    );
  }

  // Show login page
  if (currentPage === "login") {
    return <LoginPage onLogin={handleLogin} onSignup={handleSignup} />;
  }

  // Show signup page
  if (currentPage === "signup") {
    return <SignupPage onBackToLogin={handleBackToLogin} />;
  }



  // Show murukku page (filtered savouries)
  if (currentPage === "murukku") {
    return (
      <CartProvider>
        <div className="font-sans">
          <NavbarWithCart 
            onHomeClick={handleBackToHome} 
            onLogout={handleLogout} 
            isLoggedIn={isLoggedIn} 
            onComboClick={handleNavComboClick} 
            onSavouriesClick={handleNavSavouriesClick} 
            onSweetsClick={handleNavSweetsClick} 
            onKitchenSpecialsClick={handleNavKitchenSpecialsClick} 
            currentPage={currentPage} 
            onCartClick={handleCartClick} 
            onProductClick={handleProductClick} 
          />
          <Savouries onBack={handleBackToHome} initialCategory="Murukku" onProductClick={handleProductClick} />
          <Footer />
        </div>
      </CartProvider>
    );
  }

  // Show mixture page (filtered savouries)
  if (currentPage === "mixture") {
    return (
      <CartProvider>
        <div className="font-sans">
          <NavbarWithCart 
            onHomeClick={handleBackToHome} 
            onLogout={handleLogout} 
            isLoggedIn={isLoggedIn} 
            onComboClick={handleNavComboClick} 
            onSavouriesClick={handleNavSavouriesClick} 
            onSweetsClick={handleNavSweetsClick} 
            onKitchenSpecialsClick={handleNavKitchenSpecialsClick} 
            currentPage={currentPage} 
            onCartClick={handleCartClick} 
            onProductClick={handleProductClick} 
          />
          <Savouries onBack={handleBackToHome} initialCategory="Mixture" onProductClick={handleProductClick} />
          <Footer />
        </div>
      </CartProvider>
    );
  }

  // Show savouries page
  if (currentPage === "savouries") {
    return (
      <CartProvider>
        <div className="font-sans">
          <NavbarWithCart 
            onHomeClick={handleBackToHome} 
            onLogout={handleLogout} 
            isLoggedIn={isLoggedIn} 
            onComboClick={handleNavComboClick} 
            onSavouriesClick={handleNavSavouriesClick} 
            onSweetsClick={handleNavSweetsClick} 
            onKitchenSpecialsClick={handleNavKitchenSpecialsClick} 
            currentPage={currentPage} 
            onCartClick={handleCartClick} 
            onProductClick={handleProductClick} 
          />
          <Savouries onBack={handleBackToHome} onProductClick={handleProductClick} />
          <Footer />
        </div>
      </CartProvider>
    );
  }

  // Show product details page
  if (currentPage === "productDetails") {
    return (
      <CartProvider>
        <div className="font-sans">
          <NavbarWithCart 
            onHomeClick={handleBackToHome} 
            onLogout={handleLogout} 
            isLoggedIn={isLoggedIn} 
            onComboClick={handleNavComboClick} 
            onSavouriesClick={handleNavSavouriesClick} 
            onSweetsClick={handleNavSweetsClick} 
            onKitchenSpecialsClick={handleNavKitchenSpecialsClick} 
            currentPage={currentPage} 
            onCartClick={handleCartClick} 
            onProductClick={handleProductClick} 
          />
          <ProductDetails product={selectedProduct} onBack={handleBackToHome} onAddToCart={() => setIsCartDrawerOpen(true)} />
          <CartDrawer isOpen={isCartDrawerOpen} onClose={() => setIsCartDrawerOpen(false)} />
          <Footer />
        </div>
      </CartProvider>
    );
  }

  // Show cart page
  if (currentPage === "cart") {
    return (
      <CartProvider>
        <div className="font-sans">
          <NavbarWithCart 
            onHomeClick={handleBackToHome} 
            onLogout={handleLogout} 
            isLoggedIn={isLoggedIn} 
            onComboClick={handleNavComboClick} 
            onSavouriesClick={handleNavSavouriesClick} 
            onSweetsClick={handleNavSweetsClick} 
            onKitchenSpecialsClick={handleNavKitchenSpecialsClick} 
            currentPage={currentPage} 
            onCartClick={handleCartClick} 
            onProductClick={handleProductClick} 
          />
          <CartPage onBack={handleBackToHome} onCheckout={handleCheckout} />
          <Footer />
        </div>
      </CartProvider>
    );
  }

  // Show sweets page
  if (currentPage === "sweets") {
    return (
      <CartProvider>
        <div className="font-sans">
          <NavbarWithCart 
            onHomeClick={handleBackToHome} 
            onLogout={handleLogout} 
            isLoggedIn={isLoggedIn} 
            onComboClick={handleNavComboClick} 
            onSavouriesClick={handleNavSavouriesClick} 
            onSweetsClick={handleNavSweetsClick} 
            onKitchenSpecialsClick={handleNavKitchenSpecialsClick} 
            currentPage={currentPage} 
            onCartClick={handleCartClick} 
            onProductClick={handleProductClick} 
          />
          <Sweets onBack={handleBackToHome} onProductClick={handleProductClick} />
          <Footer />
        </div>
      </CartProvider>
    );
  }

  // Show laddu page (filtered sweets)
  if (currentPage === "laddu") {
    return (
      <CartProvider>
        <div className="font-sans">
          <NavbarWithCart 
            onHomeClick={handleBackToHome} 
            onLogout={handleLogout} 
            isLoggedIn={isLoggedIn} 
            onComboClick={handleNavComboClick} 
            onSavouriesClick={handleNavSavouriesClick} 
            onSweetsClick={handleNavSweetsClick} 
            onKitchenSpecialsClick={handleNavKitchenSpecialsClick} 
            currentPage={currentPage} 
            onCartClick={handleCartClick} 
            onProductClick={handleProductClick} 
          />
          <Sweets onBack={handleBackToHome} initialCategory="Laddu" onProductClick={handleProductClick} />
          <Footer />
        </div>
      </CartProvider>
    );
  }

  // Show kitchen specials page
  if (currentPage === "kitchenSpecials") {
    return (
      <CartProvider>
        <div className="font-sans">
          <NavbarWithCart 
            onHomeClick={handleBackToHome} 
            onLogout={handleLogout} 
            isLoggedIn={isLoggedIn} 
            onComboClick={handleNavComboClick} 
            onSavouriesClick={handleNavSavouriesClick} 
            onSweetsClick={handleNavSweetsClick} 
            onKitchenSpecialsClick={handleNavKitchenSpecialsClick} 
            currentPage={currentPage} 
            onCartClick={handleCartClick} 
            onProductClick={handleProductClick} 
          />
          <KitchenSpecials onBack={handleBackToHome} onProductClick={handleProductClick} />
          <Footer />
        </div>
      </CartProvider>
    );
  }

  // Show combo page
  if (currentPage === "combo") {
    return (
      <CartProvider>
        <div className="font-sans">
          <NavbarWithCart 
            onHomeClick={handleBackToHome} 
            onLogout={handleLogout} 
            isLoggedIn={isLoggedIn} 
            onComboClick={handleNavComboClick} 
            onSavouriesClick={handleNavSavouriesClick} 
            onSweetsClick={handleNavSweetsClick} 
            onKitchenSpecialsClick={handleNavKitchenSpecialsClick} 
            currentPage={currentPage} 
            onCartClick={handleCartClick} 
            onProductClick={handleProductClick} 
          />
          <ComboPage onBack={handleBackToHome} onProductClick={handleProductClick} />
          <Footer />
        </div>
      </CartProvider>
    );
  }

  // Show Review Page
  if (currentPage === "review") {
    return (
      <div className="font-sans">
        <Navbar 
          onHomeClick={handleBackToHome} 
          onLogout={handleLogout}
          isLoggedIn={isLoggedIn}
          onComboClick={handleNavComboClick}
          onSavouriesClick={handleNavSavouriesClick}
          onSweetsClick={handleNavSweetsClick}
          onKitchenSpecialsClick={handleNavKitchenSpecialsClick}
          currentPage={currentPage}
          onProductClick={handleProductClick}
        />
        <ReviewPage onBackClick={handleBackToHome} />
        <Footer />
      </div>
    );
  }

  // Show home page after login
  return (
    <div className="font-sans">
      <Navbar 
        onHomeClick={handleBackToHome} 
        onLogout={handleLogout} 
        isLoggedIn={isLoggedIn} 
        onComboClick={handleNavComboClick} 
        onSavouriesClick={handleNavSavouriesClick} 
        onSweetsClick={handleNavSweetsClick} 
        onKitchenSpecialsClick={handleNavKitchenSpecialsClick} 
        currentPage={currentPage} 
        onProductClick={handleProductClick} 
      />
      <HeroSection />
      <Categories onCategoryClick={handleCategoryClick} />
      <BestSellers />
      <SavoryTreasures onCategoryClick={handleCategoryClick} />
      <SweetLegacy onCategoryClick={handleCategoryClick} />
      <TimelessDelights />
      <ComboPack />
      <TasteOverGenerations />
      <CustomerLove onWriteReviewClick={handleWriteReviewClick} />
      <BehindTheScenes />
      <OurJourney />
      <Footer />
    </div>
  );
}

export default App;
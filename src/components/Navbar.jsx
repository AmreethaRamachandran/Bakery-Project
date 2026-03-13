import { useState, useEffect } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";

// ✅ UNIFIED HELPER: Get order timestamp for sorting
function getOrderTimestamp(order) {
  try {
    // Try new field first (orderDate)
    let timestamp = order.orderDate || order.createdAt;
    if (!timestamp) return 0;
    
    if (timestamp.toMillis && typeof timestamp.toMillis === 'function') {
      return timestamp.toMillis();
    }
    if (timestamp instanceof Date) {
      return timestamp.getTime();
    }
    return 0;
  } catch (error) {
    console.error("Error getting timestamp:", error);
    return 0;
  }
}

// ✅ UNIFIED HELPER: Safe amount getter (NEW structure first, then OLD fallback)
function getOrderAmount(order) {
  try {
    if (!order) return 0;
    
    // PRIMARY: Flat totalAmount (new orders from CartPage)
    if (order.totalAmount !== undefined && order.totalAmount !== null) {
      const parsed = parseFloat(order.totalAmount);
      if (!isNaN(parsed)) return parsed;
    }
    
    // FALLBACK: Old nested structure (pricing.totalAmount)
    if (order.pricing && typeof order.pricing === 'object') {
      if (order.pricing.totalAmount !== undefined && order.pricing.totalAmount !== null) {
        const parsed = parseFloat(order.pricing.totalAmount);
        if (!isNaN(parsed)) return parsed;
      }
    }
    
    // FALLBACK: Old plain number structure (pricing as number)
    if (typeof order.pricing === 'number' && !isNaN(order.pricing)) {
      return order.pricing;
    }
    
    return 0;
  } catch (error) {
    console.error("Error getting amount:", error);
    return 0;
  }
}

// ✅ UNIFIED HELPER: Safe date formatter
function formatOrderDate(order) {
  try {
    if (!order) return "Date N/A";
    
    // Try new field first, fallback to old field
    let timestamp = order.orderDate || order.createdAt;
    if (!timestamp) return "Date N/A";
    
    // Firestore Timestamp has toDate() method
    if (timestamp.toDate && typeof timestamp.toDate === 'function') {
      return timestamp.toDate().toLocaleDateString('en-IN', { 
        day: 'numeric', 
        month: 'short', 
        year: 'numeric' 
      });
    }
    
    // Fallback: already a Date
    if (timestamp instanceof Date) {
      return timestamp.toLocaleDateString('en-IN', { 
        day: 'numeric', 
        month: 'short', 
        year: 'numeric' 
      });
    }
    
    return "Date N/A";
  } catch (error) {
    console.error("Error formatting date:", error);
    return "Date N/A";
  }
}

function Navbar({ onHomeClick, onLogout, onComboClick, onSavouriesClick, onSweetsClick, onKitchenSpecialsClick, onCartClick, onProductClick, cartCount = 0, currentPage = 'home' }) {
  const [userName, setUserName] = useState("");
  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [showOrdersPanel, setShowOrdersPanel] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserName(user.displayName || user.email);

        // Fetch orders for this user from Firestore
        try {
          setOrdersLoading(true);
          const db = getFirestore();
          const q = query(collection(db, "orders"), where("userId", "==", user.uid));
          const snapshot = await getDocs(q);
          const userOrders = snapshot.docs
            .map(doc => {
              return { id: doc.id, ...doc.data() };
            })
            // ✅ SORT BY DATE: Newest first
            .sort((a, b) => getOrderTimestamp(b) - getOrderTimestamp(a));
          setOrders(userOrders);
        } catch (err) {
          console.error("Failed to fetch orders:", err);
        } finally {
          setOrdersLoading(false);
        }
      } else {
        setUserName("");
        setOrders([]);
      }
    });
    return () => unsubscribe();
  }, []);

  // Product mapping for navbar dropdown items
  const productMap = {
    'thenkuzhal-murukku': { id: 1, name: 'Thenkuzhal Murukku', category: 'Murukku', image: '/images/tkmurukku.webp', rating: 5, reviews: 45, price: 120.00 },
    'butter-murukku': { id: 2, name: 'Butter Murukku', category: 'Murukku', image: '/images/butter murukku.jpg', rating: 4.5, reviews: 38, price: 130.00 },
    '4-suthu-murukku': { id: 3, name: '4 Suthu Murukku', category: 'Murukku', image: '/images/4 suthu murukku.webp', rating: 4, reviews: 32, price: 125.00 },
    '5-suthu-murukku': { id: 4, name: '5 Suthu Murukku', category: 'Murukku', image: '/images/5 suthu murukku.webp', rating: 4.5, reviews: 28, price: 125.00 },
    '7-suthu-murukku': { id: 5, name: '7 Suthu Murukku', category: 'Murukku', image: '/images/7sutthumurukuu.jpg', rating: 5, reviews: 35, price: 125.00 },
    '9-suthu-murukku': { id: 6, name: '9 Suthu Murukku', category: 'Murukku', image: '/images/9 suthu murukku.webp', rating: 4.5, reviews: 30, price: 125.00 },
    '11-suthu-murukku': { id: 7, name: '11 Suthu Murukku', category: 'Murukku', image: '/images/11 suthu murukku.jpg', rating: 5, reviews: 40, price: 125.00 },
    'mini-thenkuzhal': { id: 8, name: 'Mini Thenkuzhal', category: 'Murukku', image: '/images/mini-thenkuzhal.jpg', rating: 4, reviews: 25, price: 110.00 },
    'kaara-murukku': { id: 9, name: 'Kaara Murukku', category: 'Murukku', image: '/images/kaara murukku.jpg', rating: 5, reviews: 50, price: 135.00 },
    'tire-murukku': { id: 10, name: 'Tire Murukku', category: 'Murukku', image: '/images/TyreMurukku.avif', rating: 4.5, reviews: 33, price: 140.00 },
    'mini-kai-murukku': { id: 11, name: 'Mini Kai Murukku', category: 'Murukku', image: '/images/mini kai murukku.webp', rating: 4, reviews: 28, price: 115.00 },
    'urundai-seedai': { id: 12, name: 'Urundai Seedai', category: 'Seedai', image: '/images/urundai seedai.webp', rating: 5, reviews: 42, price: 150.00 },
    'chinna-seedai': { id: 13, name: 'Chinna Seedai', category: 'Seedai', image: '/images/chinna seedai.webp', rating: 4.5, reviews: 36, price: 145.00 },
    'seepu-seedai': { id: 14, name: 'Seepu Seedai', category: 'Seedai', image: '/images/seepu seedai.webp', rating: 4, reviews: 30, price: 155.00 },
    'inippu-seedai': { id: 15, name: 'Inippu Seedai', category: 'Seedai', image: '/images/inippu seedai.webp', rating: 5, reviews: 48, price: 160.00 },
    'mixture': { id: 16, name: 'Mixture', category: 'Mixture', image: '/images/Bombay_mixture_grande.webp', rating: 5, reviews: 65, price: 140.00 },
    'kara-boondhi': { id: 17, name: 'Kara Boondhi', category: 'Mixture', image: '/images/KaaraBoondhi_2024-05-16T07_46_49.615Z.webp', rating: 4.5, reviews: 52, price: 135.00 },
    'athirasam': { id: 1, name: 'Athirasam', category: 'Athirasam', image: '/images/adhirasam.jpg', rating: 5, reviews: 55, price: 180.00 },
    'periya-athirasam': { id: 2, name: 'Periya Athirasam', category: 'Athirasam', image: '/images/periya athirasam.webp', rating: 4.5, reviews: 48, price: 200.00 },
    'rava-laddu': { id: 3, name: 'Rava Laddu', category: 'Laddu', image: '/images/rava laddu.jpg', rating: 5, reviews: 70, price: 160.00 },
    'ulundhamavurundai': { id: 4, name: 'Ulundhamavurundai', category: 'Urundai', image: '/images/ulundhamaavurundaii.jpg', rating: 4.5, reviews: 42, price: 170.00 },
    'mavurundai': { id: 5, name: 'Mavurundai', category: 'Urundai', image: '/images/Maavurundai-5pcs-₹70.jpg', rating: 4, reviews: 38, price: 165.00 },
    'manakolam': { id: 1, name: 'Manakolam', category: 'Kitchen Specials', image: '/images/manakolamm.jpg', rating: 5, reviews: 65, price: 140.00 },
    'thattai': { id: 2, name: 'Thattai', category: 'Kitchen Specials', image: '/images/thattai.webp', rating: 4.5, reviews: 58, price: 135.00 },
    'ribbon-pakkoda': { id: 3, name: 'Ribbon Pakkoda', category: 'Kitchen Specials', image: '/images/ribbon pakkoda for best sellers image.webp', rating: 5, reviews: 72, price: 145.00 },
    'native-snack-combo': { id: 1, name: 'Native Snack Combo', category: 'Combo', image: '/images/combo murukku.webp', rating: 5, reviews: 60, price: 500.00 },
    'sweet-combo': { id: 2, name: 'Sweet Combo', category: 'Combo', image: '/images/combo laddu.jpg', rating: 4, reviews: 19, price: 145.00 }
  };

  const handleProductItemClick = (e, productKey) => {
    e.preventDefault();
    if (onProductClick && productMap[productKey]) {
      onProductClick(productMap[productKey]);
    }
  };

  const announcements = [
    { text: 'Welcome Offer Coupon Code:', code: 'WELCOME10' },
    { text: 'Free Delivery on Orders Above:', code: '₹500' },
    { text: 'Special Discount Today:', code: 'SAVE20' },
    { text: 'Fresh Baked Daily:', code: 'QUALITY ASSURED' }
  ];

  const [currentAnnouncement, setCurrentAnnouncement] = useState(0);
  const [showSearch, setShowSearch] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showWishlist, setShowWishlist] = useState(false);
  const [showBulkEnquiry, setShowBulkEnquiry] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const handlePrevious = () => {
    setCurrentAnnouncement((prev) =>
      prev === 0 ? announcements.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentAnnouncement((prev) =>
      prev === announcements.length - 1 ? 0 : prev + 1
    );
  };

  const closeAllDrawers = () => {
    setShowSearch(false);
    setShowCart(false);
    setShowWishlist(false);
    setShowBulkEnquiry(false);
    setShowProfile(false);
    setShowOrdersPanel(false);
  };

  const BROWN_PRIMARY = '#8B4513';
  const BROWN_LIGHT = '#A05C2F';
  const ACCENT_ORANGE = '#FF6B35';

  // Helper: status badge color
  const getStatusStyle = (status) => {
    switch ((status || '').toLowerCase()) {
      case 'delivered': return 'bg-green-100 text-green-700';
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      case 'cancelled': return 'bg-red-100 text-red-700';
      case 'placed': return 'bg-blue-100 text-blue-700';
      default: return 'bg-blue-100 text-blue-700';
    }
  };

  return (
    <header className="sticky top-0 z-20 bg-white">
      {/* Top Announcement Bar */}
      <div className="bg-[#8B4513] text-white py-1.5 sm:py-2 overflow-hidden">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 flex items-center justify-between">
          <button
            onClick={handlePrevious}
            className="text-white hover:text-gray-200 hover:scale-110 transition-all duration-300 flex-shrink-0"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm relative overflow-hidden px-2">
            <span key={currentAnnouncement} className="animate-[slideIn_0.5s_ease-out] text-center truncate">
              {announcements[currentAnnouncement].text} <strong className="whitespace-nowrap">{announcements[currentAnnouncement].code}</strong>
            </span>
          </div>
          <button
            onClick={handleNext}
            className="text-white hover:text-gray-200 hover:scale-110 transition-all duration-300 flex-shrink-0"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="border-b relative">
        <div className="absolute left-0 top-0 w-64 h-full bg-gradient-to-r from-[#FF6B35]/5 to-transparent pointer-events-none"></div>
        <div className="absolute right-0 top-0 w-64 h-full bg-gradient-to-l from-[#8B4513]/5 to-transparent pointer-events-none"></div>

        {/* Left Side - Animated Bakery Scene */}
        <div className="absolute left-2 top-1/2 -translate-y-1/2 hidden xl:block">
          <div className="relative">
            <div className="absolute -top-8 left-4 w-1 h-12 bg-gradient-to-t from-gray-300 to-transparent opacity-40 animate-steam"></div>
            <div className="absolute -top-8 left-6 w-1 h-16 bg-gradient-to-t from-gray-300 to-transparent opacity-30 animate-steam" style={{ animationDelay: '0.5s' }}></div>
            <div className="absolute -top-8 left-8 w-1 h-10 bg-gradient-to-t from-gray-300 to-transparent opacity-50 animate-steam" style={{ animationDelay: '1s' }}></div>
            <div className="relative">
              <div className="text-4xl animate-float-slow filter drop-shadow-lg">🧺</div>
              <div className="absolute top-0 left-2 text-2xl animate-bread-pop" style={{ animationDelay: '0s' }}>🥖</div>
              <div className="absolute -top-2 left-4 text-xl animate-bread-pop" style={{ animationDelay: '0.3s' }}>🥐</div>
            </div>
          </div>
          <div className="mt-3 space-y-2">
            <div className="flex items-center gap-1">
              <span className="text-xs text-[#8B4513] font-semibold opacity-60 animate-pulse">Fresh</span>
              <span className="text-yellow-500 text-xs animate-twinkle">✨</span>
            </div>
          </div>
        </div>

        {/* Right Side - Animated Sweet Display */}
        <div className="absolute right-2 top-1/2 -translate-y-1/2 hidden xl:block">
          <div className="relative">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 shadow-inner flex items-center justify-center animate-spin-slow">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-white to-gray-50 border-2 border-gray-200"></div>
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="relative w-12 h-12">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 text-2xl animate-sweet-bounce" style={{ animationDelay: '0s' }}>🍪</div>
                <div className="absolute bottom-0 left-0 text-xl animate-sweet-bounce" style={{ animationDelay: '0.3s' }}>🧁</div>
                <div className="absolute bottom-0 right-0 text-xl animate-sweet-bounce" style={{ animationDelay: '0.6s' }}>🍰</div>
              </div>
            </div>
            <div className="absolute -top-1 -right-1 text-yellow-400 text-sm animate-twinkle">✨</div>
            <div className="absolute -bottom-1 -left-1 text-yellow-400 text-xs animate-twinkle" style={{ animationDelay: '0.5s' }}>✨</div>
          </div>
          <div className="mt-3 text-center">
            <span className="text-xs text-[#8B4513] font-semibold opacity-60 animate-pulse">Delicious</span>
          </div>
        </div>

        <div className="max-w-7xl mx-auto flex items-center justify-between py-4 px-4 relative z-10">
          {/* Logo */}
          <button
            onClick={() => onHomeClick && onHomeClick()}
            className="flex items-center gap-2 group cursor-pointer flex-shrink-0"
          >
            <div className="relative transform transition-all duration-500 group-hover:scale-105">
              <div className="flex flex-col items-start">
                <span className="text-xl sm:text-3xl lg:text-4xl font-black text-white leading-none block" style={{ fontFamily: 'Impact, "Franklin Gothic Bold", sans-serif', WebkitTextStroke: '2px #B91C50', textShadow: '0 0 0 #B91C50', letterSpacing: '1px' }}>from</span>
                <span className="text-xl sm:text-3xl lg:text-4xl font-black text-white leading-none block" style={{ fontFamily: 'Impact, "Franklin Gothic Bold", sans-serif', WebkitTextStroke: '2px #B91C50', textShadow: '0 0 0 #B91C50', letterSpacing: '1px' }}>karaikudi</span>
                <span className="text-[8px] sm:text-[10px] lg:text-xs text-[#8B4513] tracking-wide mt-0.5 lg:mt-1 font-semibold">Authentic Traditional Delights</span>
              </div>
            </div>
          </button>

          {/* Navigation */}
          <nav className="hidden lg:flex gap-8 text-sm font-medium">
            {/* Savouries Dropdown */}
            <div className="relative group">
              <button
                onClick={(e) => { e.preventDefault(); if (onSavouriesClick) onSavouriesClick(); }}
                className={`transition-colors flex items-center gap-1 ${currentPage === 'savouries' ? 'text-[#FF6B35] pb-1' : 'hover:text-[#FF6B35]'}`}
              >
                Savouries ▼
                {currentPage === 'savouries' ? (
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-[#FF6B35] animate-pulse"></span>
                ) : (
                  <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-[#FF6B35] group-hover:w-full transition-all duration-300"></span>
                )}
              </button>
              <div className="absolute top-full left-0 mt-2 w-[500px] bg-white rounded-lg shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-[9999] border border-gray-100">
                <div className="grid grid-cols-3 gap-6 p-6">
                  <div>
                    <h3 className="font-bold text-[#8B4513] mb-3 text-sm uppercase tracking-wide">MURUKKU</h3>
                    <ul className="space-y-2">
                      <li><a href="#thenkuzhal-murukku" onClick={(e) => handleProductItemClick(e, 'thenkuzhal-murukku')} className="text-gray-700 hover:text-[#FF6B35] transition-colors text-sm cursor-pointer">Thenkuzhal Murukku</a></li>
                      <li><a href="#butter-murukku" onClick={(e) => handleProductItemClick(e, 'butter-murukku')} className="text-gray-700 hover:text-[#FF6B35] transition-colors text-sm cursor-pointer">Butter Murukku</a></li>
                      <li><a href="#4-suthu-murukku" onClick={(e) => handleProductItemClick(e, '4-suthu-murukku')} className="text-gray-700 hover:text-[#FF6B35] transition-colors text-sm cursor-pointer">4 Suthu Murukku</a></li>
                      <li><a href="#5-suthu-murukku" onClick={(e) => handleProductItemClick(e, '5-suthu-murukku')} className="text-gray-700 hover:text-[#FF6B35] transition-colors text-sm cursor-pointer">5 Suthu Murukku</a></li>
                      <li><a href="#7-suthu-murukku" onClick={(e) => handleProductItemClick(e, '7-suthu-murukku')} className="text-gray-700 hover:text-[#FF6B35] transition-colors text-sm cursor-pointer">7 Suthu Murukku</a></li>
                      <li><a href="#9-suthu-murukku" onClick={(e) => handleProductItemClick(e, '9-suthu-murukku')} className="text-gray-700 hover:text-[#FF6B35] transition-colors text-sm cursor-pointer">9 Suthu Murukku</a></li>
                      <li><a href="#11-suthu-murukku" onClick={(e) => handleProductItemClick(e, '11-suthu-murukku')} className="text-gray-700 hover:text-[#FF6B35] transition-colors text-sm cursor-pointer">11 Suthu Murukku</a></li>
                      <li><a href="#mini-thenkuzhal" onClick={(e) => handleProductItemClick(e, 'mini-thenkuzhal')} className="text-gray-700 hover:text-[#FF6B35] transition-colors text-sm cursor-pointer">Mini Thenkuzhal</a></li>
                      <li><a href="#kaara-murukku" onClick={(e) => handleProductItemClick(e, 'kaara-murukku')} className="text-gray-700 hover:text-[#FF6B35] transition-colors text-sm cursor-pointer">Kaara Murukku</a></li>
                      <li><a href="#tire-murukku" onClick={(e) => handleProductItemClick(e, 'tire-murukku')} className="text-gray-700 hover:text-[#FF6B35] transition-colors text-sm cursor-pointer">Tire Murukku</a></li>
                      <li><a href="#mini-kai-murukku" onClick={(e) => handleProductItemClick(e, 'mini-kai-murukku')} className="text-gray-700 hover:text-[#FF6B35] transition-colors text-sm cursor-pointer">Mini Kai Murukku</a></li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-bold text-[#8B4513] mb-3 text-sm uppercase tracking-wide">SEEDAI</h3>
                    <ul className="space-y-2">
                      <li><a href="#urundai-seedai" onClick={(e) => handleProductItemClick(e, 'urundai-seedai')} className="text-gray-700 hover:text-[#FF6B35] transition-colors text-sm cursor-pointer">Urundai Seedai</a></li>
                      <li><a href="#chinna-seedai" onClick={(e) => handleProductItemClick(e, 'chinna-seedai')} className="text-gray-700 hover:text-[#FF6B35] transition-colors text-sm cursor-pointer">Chinna Seedai</a></li>
                      <li><a href="#seepu-seedai" onClick={(e) => handleProductItemClick(e, 'seepu-seedai')} className="text-gray-700 hover:text-[#FF6B35] transition-colors text-sm cursor-pointer">Seepu Seedai</a></li>
                      <li><a href="#inippu-seedai" onClick={(e) => handleProductItemClick(e, 'inippu-seedai')} className="text-gray-700 hover:text-[#FF6B35] transition-colors text-sm cursor-pointer">Inippu Seedai</a></li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-bold text-[#8B4513] mb-3 text-sm uppercase tracking-wide">MIXTURE</h3>
                    <ul className="space-y-2">
                      <li><a href="#mixture" onClick={(e) => handleProductItemClick(e, 'mixture')} className="text-gray-700 hover:text-[#FF6B35] transition-colors text-sm cursor-pointer">Mixture</a></li>
                      <li><a href="#kara-boondhi" onClick={(e) => handleProductItemClick(e, 'kara-boondhi')} className="text-gray-700 hover:text-[#FF6B35] transition-colors text-sm cursor-pointer">Kara Boondhi</a></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Sweets Dropdown */}
            <div className="relative group">
              <button
                onClick={(e) => { e.preventDefault(); if (onSweetsClick) onSweetsClick(); }}
                className={`transition-colors flex items-center gap-1 ${currentPage === 'sweets' ? 'text-[#FF6B35] pb-1' : 'hover:text-[#FF6B35]'}`}
              >
                Sweets ▼
                {currentPage === 'sweets' ? (
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-[#FF6B35] animate-pulse"></span>
                ) : null}
              </button>
              <div className="absolute top-full left-0 mt-2 w-[500px] bg-white rounded-lg shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-[9999] border border-gray-100">
                <div className="grid grid-cols-3 gap-8 p-6">
                  <div>
                    <h3 className="font-bold text-[#8B4513] mb-3 text-sm uppercase tracking-wide">ATHIRASAM</h3>
                    <ul className="space-y-2">
                      <li><a href="#athirasam" onClick={(e) => handleProductItemClick(e, 'athirasam')} className="text-gray-700 hover:text-[#FF6B35] transition-colors text-sm cursor-pointer">Athirasam</a></li>
                      <li><a href="#periya-athirasam" onClick={(e) => handleProductItemClick(e, 'periya-athirasam')} className="text-gray-700 hover:text-[#FF6B35] transition-colors text-sm cursor-pointer">Periya Athirasam</a></li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-bold text-[#8B4513] mb-3 text-sm uppercase tracking-wide">LADDU</h3>
                    <ul className="space-y-2">
                      <li><a href="#rava-laddu" onClick={(e) => handleProductItemClick(e, 'rava-laddu')} className="text-gray-700 hover:text-[#FF6B35] transition-colors text-sm cursor-pointer">Rava Laddu</a></li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-bold text-[#8B4513] mb-3 text-sm uppercase tracking-wide">URUNDAI</h3>
                    <ul className="space-y-2">
                      <li><a href="#ulundhamavurundai" onClick={(e) => handleProductItemClick(e, 'ulundhamavurundai')} className="text-gray-700 hover:text-[#FF6B35] transition-colors text-sm cursor-pointer">Ulundhamavurundai</a></li>
                      <li><a href="#mavurundai" onClick={(e) => handleProductItemClick(e, 'mavurundai')} className="text-gray-700 hover:text-[#FF6B35] transition-colors text-sm cursor-pointer">Mavurundai</a></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Kitchen Specials Dropdown */}
            <div className="relative group">
              <button
                onClick={(e) => { e.preventDefault(); if (onKitchenSpecialsClick) onKitchenSpecialsClick(); }}
                className={`transition-colors flex items-center gap-1 ${currentPage === 'kitchenSpecials' ? 'text-[#FF6B35] pb-1' : 'hover:text-[#FF6B35]'}`}
              >
                Kitchen Specials ▼
                {currentPage === 'kitchenSpecials' ? (
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-[#FF6B35] animate-pulse"></span>
                ) : (
                  <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-[#FF6B35] group-hover:w-full transition-all duration-300"></span>
                )}
              </button>
              <div className="absolute top-full left-0 mt-2 w-[200px] bg-white rounded-lg shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-[9999] border border-gray-100">
                <div className="p-6">
                  <ul className="space-y-2">
                    <li><a href="#manakolam" onClick={(e) => handleProductItemClick(e, 'manakolam')} className="text-gray-700 hover:text-[#FF6B35] transition-colors text-sm cursor-pointer">Manakolam</a></li>
                    <li><a href="#thattai" onClick={(e) => handleProductItemClick(e, 'thattai')} className="text-gray-700 hover:text-[#FF6B35] transition-colors text-sm cursor-pointer">Thattai</a></li>
                    <li><a href="#ribbon-pakkoda" onClick={(e) => handleProductItemClick(e, 'ribbon-pakkoda')} className="text-gray-700 hover:text-[#FF6B35] transition-colors text-sm cursor-pointer">Ribbon Pakkoda</a></li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Combo Dropdown */}
            <div className="relative group">
              <button
                onClick={(e) => { e.preventDefault(); if (onComboClick) onComboClick(); }}
                className={`transition-colors flex items-center gap-1 ${currentPage === 'combo' ? 'text-[#FF6B35] pb-1' : 'hover:text-[#FF6B35]'}`}
              >
                Combo ▼
                {currentPage === 'combo' ? (
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-[#FF6B35] animate-pulse"></span>
                ) : (
                  <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-[#FF6B35] group-hover:w-full transition-all duration-300"></span>
                )}
              </button>
              <div className="absolute top-full left-0 mt-2 w-[200px] bg-white rounded-lg shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-[9999] border border-gray-100">
                <div className="p-6">
                  <ul className="space-y-2">
                    <li><a href="#native-snack-combo" onClick={(e) => handleProductItemClick(e, 'native-snack-combo')} className="text-gray-700 hover:text-[#FF6B35] transition-colors text-sm cursor-pointer">Native Snack Combo</a></li>
                    <li><a href="#sweet-combo" onClick={(e) => handleProductItemClick(e, 'sweet-combo')} className="text-gray-700 hover:text-[#FF6B35] transition-colors text-sm cursor-pointer">Sweet Combo</a></li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Bulk Enquiry */}
            <button
              onClick={(e) => { e.preventDefault(); closeAllDrawers(); setShowBulkEnquiry(true); }}
              className="relative group transition-colors hover:text-[#FF6B35]"
            >
              Bulk Enquiry
              <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-[#FF6B35] group-hover:w-full transition-all duration-300"></span>
            </button>
          </nav>

          {/* Right Icons */}
          <div className="flex items-center gap-2 sm:gap-3 lg:gap-4">
            {/* Search */}
            <button
              onClick={() => { closeAllDrawers(); setShowSearch(true); }}
              className="relative group hover:text-[#FF6B35] transition-all duration-300 transform hover:scale-110"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            {/* Profile */}
            <button
              onClick={() => { closeAllDrawers(); setShowProfile(true); }}
              className="relative group hover:text-[#FF6B35] transition-all duration-300 transform hover:scale-110"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </button>

            {/* Wishlist */}
            <button
              onClick={() => { closeAllDrawers(); setShowWishlist(true); }}
              className="relative group hover:text-[#FF6B35] transition-all duration-300 transform hover:scale-110"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5 group-hover:fill-[#FF6B35] transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center animate-pulse">0</span>
            </button>

            {/* Cart */}
            <button
              onClick={() => { closeAllDrawers(); onCartClick && onCartClick(); }}
              className="relative group hover:text-[#FF6B35] transition-all duration-300 transform hover:scale-110"
            >
              <FaShoppingCart className="w-5 h-5 sm:w-6 sm:h-6" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse font-bold">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="lg:hidden border-t bg-white overflow-x-auto scrollbar-hide">
          <div className="flex items-center gap-4 px-4 py-3 min-w-max">
            <button onClick={(e) => { e.preventDefault(); if (onSavouriesClick) onSavouriesClick(); }} className={`text-sm font-medium whitespace-nowrap ${currentPage === 'savouries' ? 'text-[#FF6B35]' : 'text-gray-700 hover:text-[#FF6B35]'} transition-colors`}>Savouries</button>
            <button onClick={(e) => { e.preventDefault(); if (onSweetsClick) onSweetsClick(); }} className={`text-sm font-medium whitespace-nowrap ${currentPage === 'sweets' ? 'text-[#FF6B35]' : 'text-gray-700 hover:text-[#FF6B35]'} transition-colors`}>Sweets</button>
            <button onClick={(e) => { e.preventDefault(); if (onKitchenSpecialsClick) onKitchenSpecialsClick(); }} className={`text-sm font-medium whitespace-nowrap ${currentPage === 'kitchenSpecials' ? 'text-[#FF6B35]' : 'text-gray-700 hover:text-[#FF6B35]'} transition-colors`}>Kitchen Specials</button>
            <button onClick={(e) => { e.preventDefault(); if (onComboClick) onComboClick(); }} className={`text-sm font-medium whitespace-nowrap ${currentPage === 'combo' ? 'text-[#FF6B35]' : 'text-gray-700 hover:text-[#FF6B35]'} transition-colors`}>Combo</button>
            <button onClick={(e) => { e.preventDefault(); closeAllDrawers(); setShowBulkEnquiry(true); }} className="text-sm font-medium whitespace-nowrap text-gray-700 hover:text-[#FF6B35] transition-colors">Bulk Enquiry</button>
          </div>
        </div>
      </div>

      {/* ── PROFILE DRAWER (WITH FIXED ORDERS PANEL) ── */}
      <div className={`fixed top-0 right-0 h-full w-[90%] sm:w-[600px] bg-white shadow-xl transition-transform duration-300 z-[60] ${showProfile ? "translate-x-0" : "translate-x-full"}`}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="px-6 py-6 border-b border-gray-200 flex justify-between items-center bg-white">
            <h2 className="text-xl font-bold text-gray-800 tracking-wider">
              {showOrdersPanel ? 'My Orders' : 'Account'}
            </h2>
            <button
              onClick={() => {
                if (showOrdersPanel) setShowOrdersPanel(false);
                else setShowProfile(false);
              }}
              className="text-[#8B4513] hover:text-black text-2xl font-bold"
            >
              {showOrdersPanel ? '←' : '×'}
            </button>
          </div>

          {/* Content */}
          <div className="flex-grow p-6 overflow-y-auto">

            {/* ── ORDERS PANEL ── */}
            {showOrdersPanel ? (
              <div>
                {ordersLoading ? (
                  <div className="flex items-center justify-center py-12">
                    <div className="w-8 h-8 border-4 border-[#8B4513] border-t-transparent rounded-full animate-spin"></div>
                    <span className="ml-3 text-gray-500 text-sm">Loading your orders...</span>
                  </div>
                ) : orders.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-16 text-center">
                    <svg className="w-16 h-16 text-gray-200 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                    <p className="text-gray-500 font-medium">No orders yet</p>
                    <p className="text-gray-400 text-sm mt-1">Your placed orders will appear here.</p>
                    <button
                      onClick={() => { setShowOrdersPanel(false); setShowProfile(false); }}
                      className="mt-4 bg-[#8B4513] text-white px-4 py-2 rounded-md text-sm hover:bg-[#A05C2F] transition-colors"
                    >
                      Start Shopping
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <p className="text-sm text-gray-400">{orders.length} order{orders.length > 1 ? 's' : ''} found</p>
                    {orders.map(order => (
                      <div key={order.id} className="border border-gray-100 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <p className="font-semibold text-gray-800 text-sm">Order #{order.id.slice(0, 8).toUpperCase()}</p>
                            {/* ✅ FIXED: Use formatOrderDate helper */}
                            <p className="text-xs text-gray-400 mt-0.5">
                              {formatOrderDate(order)}
                            </p>
                          </div>
                          <span className={`text-xs px-2.5 py-1 rounded-full font-semibold capitalize ${getStatusStyle(order.status)}`}>
                            {order.status || 'Processing'}
                          </span>
                        </div>

                        {/* Order Items */}
                        {order.items && order.items.length > 0 && (
                          <div className="mt-2 space-y-1">
                            {order.items.map((item, idx) => (
                              <div key={idx} className="flex justify-between text-xs text-gray-600">
                                <span>{item.name} × {item.quantity}</span>
                                <span>₹{(parseFloat(item.price) * item.quantity).toFixed(2)}</span>
                              </div>
                            ))}
                          </div>
                        )}

                        <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between items-center">
                          <span className="text-xs text-gray-500">Total Amount</span>
                          {/* ✅ FIXED: getOrderAmount now uses unified helper function */}
                          <span className="font-bold text-[#8B4513]">₹{getOrderAmount(order).toFixed(2)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              /* ── MAIN PROFILE PANEL ── */
              <div className="space-y-2">
                {/* Greeting */}
                <div className="p-4 mb-4 bg-gray-50 rounded-lg border-l-4 border-[#FF6B35]">
                  <p className="font-semibold text-gray-800">Welcome {userName}!</p>
                  <p className="text-sm text-gray-500">Manage your account details and orders below.</p>
                </div>

                {/* Nav Links */}
                <nav className="space-y-1">
                  {/* My Orders — clicking opens the orders panel */}
                  <button
                    onClick={() => setShowOrdersPanel(true)}
                    className="w-full flex items-center justify-between p-3 text-gray-700 hover:bg-[#8B4513]/10 hover:text-[#8B4513] rounded-md transition-all duration-200"
                  >
                    <div className="flex items-center">
                      <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2m-7 7h3m-3 4h3" />
                      </svg>
                      <span className="font-medium">My Orders</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {orders.length > 0 && (
                        <span className="bg-[#8B4513] text-white text-xs rounded-full px-2 py-0.5">{orders.length}</span>
                      )}
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </button>

                  {/* Saved Addresses */}
                  <a href="#addresses" className="flex items-center p-3 text-gray-700 hover:bg-[#8B4513]/10 hover:text-[#8B4513] rounded-md transition-all duration-200">
                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="font-medium">Saved Addresses</span>
                  </a>

                  {/* Wallet */}
                  <a href="#wallet" className="flex items-center p-3 text-gray-700 hover:bg-[#8B4513]/10 hover:text-[#8B4513] rounded-md transition-all duration-200">
                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                    <span className="font-medium">Wallet & Credits</span>
                  </a>

                  {/* Account Settings */}
                  <a href="#settings" className="flex items-center p-3 text-gray-700 hover:bg-[#8B4513]/10 hover:text-[#8B4513] rounded-md transition-all duration-200">
                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37a1.724 1.724 0 002.572-1.065z" />
                    </svg>
                    <span className="font-medium">Account Settings</span>
                  </a>

                  {/* Help */}
                  <a href="#help" className="flex items-center p-3 text-gray-700 hover:bg-[#8B4513]/10 hover:text-[#8B4513] rounded-md transition-all duration-200">
                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9.247a3 3 0 100 5.506 3 3 0 000-5.506z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.424 17.585A2 2 0 0017 19v2h2v-2a2 2 0 00-2-2h-1.576zM7 19v2h2v-2H7zM3 15h2m-2-4h2m-2-4h2m14 8h2m-2-4h2m-2-4h2" />
                    </svg>
                    <span className="font-medium">Help & Support</span>
                  </a>
                </nav>
              </div>
            )}
          </div>

          {/* Footer: Log Out */}
          {!showOrdersPanel && (
            <div className="p-6 border-t border-gray-200">
              <button
                onClick={() => { setShowProfile(false); onLogout && onLogout(); }}
                className="w-full bg-[#8B4513] text-white py-3 rounded-md font-semibold hover:bg-[#A05C2F] transition-colors shadow-md"
              >
                Log Out
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Overlay */}
      {(showSearch || showCart || showWishlist || showBulkEnquiry || showProfile) && (
        <div onClick={closeAllDrawers} className="fixed inset-0 bg-black/50 z-[50]"></div>
      )}
    </header>
  );
}

export default Navbar;
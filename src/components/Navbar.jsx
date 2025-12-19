import { useState } from 'react';
import { FaShoppingCart } from 'react-icons/fa';

function Navbar({ onHomeClick, onLogout,onComboClick, onSavouriesClick, onSweetsClick, onKitchenSpecialsClick, onCartClick, onProductClick, cartCount = 0, currentPage = 'home' }) {
  
  // Product mapping for navbar dropdown items
  const productMap = {
    // Savouries - Murukku
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
    // Savouries - Seedai
    'urundai-seedai': { id: 12, name: 'Urundai Seedai', category: 'Seedai', image: '/images/urundai seedai.webp', rating: 5, reviews: 42, price: 150.00 },
    'chinna-seedai': { id: 13, name: 'Chinna Seedai', category: 'Seedai', image: '/images/chinna seedai.webp', rating: 4.5, reviews: 36, price: 145.00 },
    'seepu-seedai': { id: 14, name: 'Seepu Seedai', category: 'Seedai', image: '/images/seepu seedai.webp', rating: 4, reviews: 30, price: 155.00 },
    'inippu-seedai': { id: 15, name: 'Inippu Seedai', category: 'Seedai', image: '/images/inippu seedai.webp', rating: 5, reviews: 48, price: 160.00 },
    // Savouries - Mixture
    'mixture': { id: 16, name: 'Mixture', category: 'Mixture', image: '/images/Bombay_mixture_grande.webp', rating: 5, reviews: 65, price: 140.00 },
    'kara-boondhi': { id: 17, name: 'Kara Boondhi', category: 'Mixture', image: '/images/KaaraBoondhi_2024-05-16T07_46_49.615Z.webp', rating: 4.5, reviews: 52, price: 135.00 },
    // Sweets - Athirasam
    'athirasam': { id: 1, name: 'Athirasam', category: 'Athirasam', image: '/images/adhirasam.jpg', rating: 5, reviews: 55, price: 180.00 },
    'periya-athirasam': { id: 2, name: 'Periya Athirasam', category: 'Athirasam', image: '/images/periya athirasam.webp', rating: 4.5, reviews: 48, price: 200.00 },
    // Sweets - Laddu
    'rava-laddu': { id: 3, name: 'Rava Laddu', category: 'Laddu', image: '/images/rava laddu.jpg', rating: 5, reviews: 70, price: 160.00 },
    // Sweets - Urundai
    'ulundhamavurundai': { id: 4, name: 'Ulundhamavurundai', category: 'Urundai', image: '/images/ulundhamaavurundaii.jpg', rating: 4.5, reviews: 42, price: 170.00 },
    'mavurundai': { id: 5, name: 'Mavurundai', category: 'Urundai', image: '/images/Maavurundai-5pcs-₹70.jpg', rating: 4, reviews: 38, price: 165.00 },
    // Kitchen Specials
    'manakolam': { id: 1, name: 'Manakolam', category: 'Kitchen Specials', image: '/images/manakolamm.jpg', rating: 5, reviews: 65, price: 140.00 },
    'thattai': { id: 2, name: 'Thattai', category: 'Kitchen Specials', image: '/images/thattai.webp', rating: 4.5, reviews: 58, price: 135.00 },
    'ribbon-pakkoda': { id: 3, name: 'Ribbon Pakkoda', category: 'Kitchen Specials', image: '/images/ribbon pakkoda for best sellers image.webp', rating: 5, reviews: 72, price: 145.00 },
    // Combo
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
  const [showProfile, setShowProfile] = useState(false); // State for the Profile Drawer

  // --- ANNOUNCEMENT HANDLERS ---
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

  // --- DRAWER HANDLER (UPDATED) ---
  const closeAllDrawers = () => {
    setShowSearch(false);
    setShowCart(false);
    setShowWishlist(false);
    setShowBulkEnquiry(false);
    setShowProfile(false); // Include showProfile
  };
  
  // Custom brown color palette variables for clarity
  const BROWN_PRIMARY = '#8B4513'; // Saddle Brown
  const BROWN_LIGHT = '#A05C2F'; // Lighter Brown
  const ACCENT_ORANGE = '#FF6B35'; // Your existing orange accent color

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
            <span 
              key={currentAnnouncement}
              className="animate-[slideIn_0.5s_ease-out] text-center truncate"
            >
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
        {/* Decorative Background Elements */}
        <div className="absolute left-0 top-0 w-64 h-full bg-gradient-to-r from-[#FF6B35]/5 to-transparent pointer-events-none"></div>
        <div className="absolute right-0 top-0 w-64 h-full bg-gradient-to-l from-[#8B4513]/5 to-transparent pointer-events-none"></div>
        
        {/* Left Side - Animated Bakery Scene */}
        <div className="absolute left-2 top-1/2 -translate-y-1/2 hidden xl:block">
          <div className="relative">
            <div className="absolute -top-8 left-4 w-1 h-12 bg-gradient-to-t from-gray-300 to-transparent opacity-40 animate-steam"></div>
            <div className="absolute -top-8 left-6 w-1 h-16 bg-gradient-to-t from-gray-300 to-transparent opacity-30 animate-steam" style={{ animationDelay: '0.5s' }}></div>
            <div className="absolute -top-8 left-8 w-1 h-10 bg-gradient-to-t from-gray-300 to-transparent opacity-50 animate-steam" style={{ animationDelay: '1s' }}></div>
            
            <div className="relative">
              <div className="text-4xl animate-float-slow filter drop-shadow-lg">
                🧺
              </div>
              <div className="absolute top-0 left-2 text-2xl animate-bread-pop" style={{ animationDelay: '0s' }}>
                🥖
              </div>
              <div className="absolute -top-2 left-4 text-xl animate-bread-pop" style={{ animationDelay: '0.3s' }}>
                🥐
              </div>
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
                <div className="absolute top-0 left-1/2 -translate-x-1/2 text-2xl animate-sweet-bounce" style={{ animationDelay: '0s' }}>
                  🍪
                </div>
                <div className="absolute bottom-0 left-0 text-xl animate-sweet-bounce" style={{ animationDelay: '0.3s' }}>
                  🧁
                </div>
                <div className="absolute bottom-0 right-0 text-xl animate-sweet-bounce" style={{ animationDelay: '0.6s' }}>
                  🍰
                </div>
              </div>
            </div>
            
            <div className="absolute -top-1 -right-1 text-yellow-400 text-sm animate-twinkle">
              ✨
            </div>
            <div className="absolute -bottom-1 -left-1 text-yellow-400 text-xs animate-twinkle" style={{ animationDelay: '0.5s' }}>
              ✨
            </div>
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
                <span className="text-xl sm:text-3xl lg:text-4xl font-black text-white leading-none block" style={{fontFamily: 'Impact, "Franklin Gothic Bold", sans-serif', WebkitTextStroke: '2px #B91C50', textShadow: '0 0 0 #B91C50', letterSpacing: '1px'}}>from</span>
                <span className="text-xl sm:text-3xl lg:text-4xl font-black text-white leading-none block" style={{fontFamily: 'Impact, "Franklin Gothic Bold", sans-serif', WebkitTextStroke: '2px #B91C50', textShadow: '0 0 0 #B91C50', letterSpacing: '1px'}}>karaikudi</span>
                <span className="text-[8px] sm:text-[10px] lg:text-xs text-[#8B4513] tracking-wide mt-0.5 lg:mt-1 font-semibold">Authentic Traditional Delights</span>
              </div>
            </div>
          </button>

          {/* Navigation */}
          <nav className="hidden lg:flex gap-8 text-sm font-medium">
            {/* Savouries Dropdown */}
            <div className="relative group">
              <button 
                onClick={(e) => {
                  e.preventDefault();
                  if (onSavouriesClick) onSavouriesClick();
                }}
                className={`transition-colors flex items-center gap-1 ${currentPage === 'savouries' ? 'text-[#FF6B35] pb-1' : 'hover:text-[#FF6B35]'}`}
              >
                Savouries ▼
                {currentPage === 'savouries' ? (
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-[#FF6B35] animate-pulse"></span>
                ) : (
                  <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-[#FF6B35] group-hover:w-full transition-all duration-300"></span>
                )}
              </button>
              
              {/* Dropdown Menu */}
              <div className="absolute top-full left-0 mt-2 w-[500px] bg-white rounded-lg shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-[9999] border border-gray-100">
                <div className="grid grid-cols-3 gap-6 p-6">
                  {/* MURUKKU Column */}
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

                  {/* SEEDAI Column */}
                  <div>
                    <h3 className="font-bold text-[#8B4513] mb-3 text-sm uppercase tracking-wide">SEEDAI</h3>
                    <ul className="space-y-2">
                      <li><a href="#urundai-seedai" onClick={(e) => handleProductItemClick(e, 'urundai-seedai')} className="text-gray-700 hover:text-[#FF6B35] transition-colors text-sm cursor-pointer">Urundai Seedai</a></li>
                      <li><a href="#chinna-seedai" onClick={(e) => handleProductItemClick(e, 'chinna-seedai')} className="text-gray-700 hover:text-[#FF6B35] transition-colors text-sm cursor-pointer">Chinna Seedai</a></li>
                      <li><a href="#seepu-seedai" onClick={(e) => handleProductItemClick(e, 'seepu-seedai')} className="text-gray-700 hover:text-[#FF6B35] transition-colors text-sm cursor-pointer">Seepu Seedai</a></li>
                      <li><a href="#inippu-seedai" onClick={(e) => handleProductItemClick(e, 'inippu-seedai')} className="text-gray-700 hover:text-[#FF6B35] transition-colors text-sm cursor-pointer">Inippu Seedai</a></li>
                    </ul>
                  </div>

                  {/* MIXTURE Column */}
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
                onClick={(e) => {
                  e.preventDefault();
                  if (onSweetsClick) onSweetsClick();
                }}
                className={`transition-colors flex items-center gap-1 ${currentPage === 'sweets' ? 'text-[#FF6B35] pb-1' : 'hover:text-[#FF6B35]'}`}
              >
                Sweets ▼
                {currentPage === 'sweets' ? (
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-[#FF6B35] animate-pulse"></span>
                ) : null}
              </button>
              
              {/* Dropdown Menu */}
              <div className="absolute top-full left-0 mt-2 w-[500px] bg-white rounded-lg shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-[9999] border border-gray-100">
                <div className="grid grid-cols-3 gap-8 p-6">
                  {/* ATHIRASAM Column */}
                  <div>
                    <h3 className="font-bold text-[#8B4513] mb-3 text-sm uppercase tracking-wide">ATHIRASAM</h3>
                    <ul className="space-y-2">
                      <li><a href="#athirasam" onClick={(e) => handleProductItemClick(e, 'athirasam')} className="text-gray-700 hover:text-[#FF6B35] transition-colors text-sm cursor-pointer">Athirasam</a></li>
                      <li><a href="#periya-athirasam" onClick={(e) => handleProductItemClick(e, 'periya-athirasam')} className="text-gray-700 hover:text-[#FF6B35] transition-colors text-sm cursor-pointer">Periya Athirasam</a></li>
                    </ul>
                  </div>

                  {/* LADDU Column */}
                  <div>
                    <h3 className="font-bold text-[#8B4513] mb-3 text-sm uppercase tracking-wide">LADDU</h3>
                    <ul className="space-y-2">
                      <li><a href="#rava-laddu" onClick={(e) => handleProductItemClick(e, 'rava-laddu')} className="text-gray-700 hover:text-[#FF6B35] transition-colors text-sm cursor-pointer">Rava Laddu</a></li>
                    </ul>
                  </div>

                  {/* URUNDAI Column */}
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
                onClick={(e) => {
                  e.preventDefault();
                  if (onKitchenSpecialsClick) onKitchenSpecialsClick();
                }}
                className={`transition-colors flex items-center gap-1 ${currentPage === 'kitchenSpecials' ? 'text-[#FF6B35] pb-1' : 'hover:text-[#FF6B35]'}`}
              >
                Kitchen Specials ▼
                {currentPage === 'kitchenSpecials' ? (
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-[#FF6B35] animate-pulse"></span>
                ) : (
                  <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-[#FF6B35] group-hover:w-full transition-all duration-300"></span>
                )}
              </button>
              
              {/* Dropdown Menu */}
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
                onClick={(e) => {
                  e.preventDefault();
                  if (onComboClick) onComboClick();
                }}
                className={`transition-colors flex items-center gap-1 ${currentPage === 'combo' ? 'text-[#FF6B35] pb-1' : 'hover:text-[#FF6B35]'}`}
              >
                Combo ▼
                {currentPage === 'combo' ? (
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-[#FF6B35] animate-pulse"></span>
                ) : (
                  <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-[#FF6B35] group-hover:w-full transition-all duration-300"></span>
                )}
              </button>
              
              {/* Dropdown Menu */}
              <div className="absolute top-full left-0 mt-2 w-[200px] bg-white rounded-lg shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-[9999] border border-gray-100">
                <div className="p-6">
                  <ul className="space-y-2">
                    <li><a href="#native-snack-combo" onClick={(e) => handleProductItemClick(e, 'native-snack-combo')} className="text-gray-700 hover:text-[#FF6B35] transition-colors text-sm cursor-pointer">Native Snack Combo</a></li>
                    <li><a href="#sweet-combo" onClick={(e) => handleProductItemClick(e, 'sweet-combo')} className="text-gray-700 hover:text-[#FF6B35] transition-colors text-sm cursor-pointer">Sweet Combo</a></li>
                  </ul>
                </div>
              </div>
            </div>
            
            {/* BULK ENQUIRY LINK */}
            <button 
              onClick={(e) => {
                e.preventDefault();
                closeAllDrawers(); 
                setShowBulkEnquiry(true); 
              }}
              className={`relative group transition-colors ${currentPage === 'home' ? 'hover:text-[#FF6B35]' : 'hover:text-[#FF6B35]'}`}
            >
              Bulk Enquiry
              <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-[#FF6B35] group-hover:w-full transition-all duration-300"></span>
            </button>
          </nav>

          {/* Right Icons */}
          <div className="flex items-center gap-2 sm:gap-3 lg:gap-4">
            {/* 🔍 Search */}
            <button
              onClick={() => {closeAllDrawers(); setShowSearch(true);}}
              className="relative group hover:text-[#FF6B35] transition-all duration-300 transform hover:scale-110"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <span className="absolute inset-0 rounded-full bg-[#FF6B35] opacity-0 group-hover:opacity-10 blur-md transition-opacity"></span>
            </button>

            {/* 👤 Profile - REVISED: ICON ONLY, NO IMAGE, OPENS DRAWER */}
            <button 
              onClick={() => {closeAllDrawers(); setShowProfile(true);}} 
              className="relative group hover:text-[#FF6B35] transition-all duration-300 transform hover:scale-110"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span className="absolute inset-0 rounded-full bg-[#FF6B35] opacity-0 group-hover:opacity-10 blur-md transition-opacity"></span>
            </button>

            {/* ❤️ Wishlist */}
            <button
              onClick={() => {closeAllDrawers(); setShowWishlist(true);}}
              className="relative group hover:text-[#FF6B35] transition-all duration-300 transform hover:scale-110"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5 group-hover:fill-[#FF6B35] transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center animate-pulse">0</span>
              <span className="absolute inset-0 rounded-full bg-[#FF6B35] opacity-0 group-hover:opacity-10 blur-md transition-opacity"></span>
            </button>

            {/* 🛒 Cart */}
            <button
              onClick={() => {closeAllDrawers(); onCartClick && onCartClick();}}
              className="relative group hover:text-[#FF6B35] transition-all duration-300 transform hover:scale-110"
            >
              <FaShoppingCart className="w-5 h-5 sm:w-6 sm:h-6" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse font-bold">
                  {cartCount}
                </span>
              )}
              <span className="absolute inset-0 rounded-full bg-[#FF6B35] opacity-0 group-hover:opacity-10 blur-md transition-opacity"></span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu - Horizontal Scroll */}
        <div className="lg:hidden border-t bg-white overflow-x-auto scrollbar-hide">
          <div className="flex items-center gap-4 px-4 py-3 min-w-max">
            <button 
              onClick={(e) => { e.preventDefault(); if (onSavouriesClick) onSavouriesClick(); }}
              className={`text-sm font-medium whitespace-nowrap ${currentPage === 'savouries' ? 'text-[#FF6B35]' : 'text-gray-700 hover:text-[#FF6B35]'} transition-colors`}
            >
              Savouries
            </button>
            <button 
              onClick={(e) => { e.preventDefault(); if (onSweetsClick) onSweetsClick(); }}
              className={`text-sm font-medium whitespace-nowrap ${currentPage === 'sweets' ? 'text-[#FF6B35]' : 'text-gray-700 hover:text-[#FF6B35]'} transition-colors`}
            >
              Sweets
            </button>
            <button 
              onClick={(e) => { e.preventDefault(); if (onKitchenSpecialsClick) onKitchenSpecialsClick(); }}
              className={`text-sm font-medium whitespace-nowrap ${currentPage === 'kitchenSpecials' ? 'text-[#FF6B35]' : 'text-gray-700 hover:text-[#FF6B35]'} transition-colors`}
            >
              Kitchen Specials
            </button>
            <button 
              onClick={(e) => { e.preventDefault(); if (onComboClick) onComboClick(); }}
              className={`text-sm font-medium whitespace-nowrap ${currentPage === 'combo' ? 'text-[#FF6B35]' : 'text-gray-700 hover:text-[#FF6B35]'} transition-colors`}
            >
              Combo
            </button>
            <button 
              onClick={(e) => { e.preventDefault(); closeAllDrawers(); setShowBulkEnquiry(true); }}
              className="text-sm font-medium whitespace-nowrap text-gray-700 hover:text-[#FF6B35] transition-colors"
            >
              Bulk Enquiry
            </button>
          </div>
        </div>
      </div>

      {/* --- DRAWERS (UNCHANGED) --- */}
      
      {/* Search Drawer */}
      <div className={`fixed top-0 right-0 h-full w-[90%] sm:w-[600px] bg-white shadow-xl transition-transform duration-300 z-[60] ${showSearch ? "translate-x-0" : "translate-x-full"}`}>
        <div className="flex justify-between items-center px-6 py-6">
          <p className="text-gray-400 text-sm font-semibold tracking-wide">WHAT ARE YOU LOOKING FOR?</p>
          <button onClick={() => setShowSearch(false)} className="text-[#8b5a2b] hover:text-black text-xl font-bold">&times;</button>
        </div>
        <div className="px-6 py-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search Products..."
              className="w-full border-b-2 border-[#8b5a2b] text-lg text-[#8b5a2b] placeholder-[#8b5a2b] outline-none py-2 pr-10"
            />
            <svg className="absolute right-0 top-2 w-6 h-6 text-[#8b5a2b] pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Cart Drawer */}
      <div className={`fixed top-0 right-0 h-full w-[90%] sm:w-[600px] bg-white shadow-xl transition-transform duration-300 z-[60] ${showCart ? "translate-x-0" : "translate-x-full"}`}>
        <div className="flex flex-col h-full">
          <div className="px-6 py-6 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-lg font-semibold text-[#8B4513]">Cart 0</h2>
            <button onClick={() => setShowCart(false)} className="text-[#8B4513] hover:text-black text-xl font-bold">&times;</button>
          </div>
          <div className="flex flex-col items-center justify-center flex-grow px-6 text-center">
            <svg className="w-16 h-16 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <p className="text-gray-500 mb-4">No products in the cart.</p>
            <button
              onClick={() => setShowCart(false)}
              className="bg-[#8B4513] text-white px-4 py-2 rounded hover:bg-[#a05c2f] transition-colors"
            >
              Shop Our Products
            </button>
          </div>
        </div>
      </div>

      {/* Wishlist Drawer */}
      <div className={`fixed top-0 right-0 h-full w-[90%] sm:w-[600px] bg-white shadow-xl transition-transform duration-300 z-[60] ${showWishlist ? "translate-x-0" : "translate-x-full"}`}>
        <div className="flex flex-col h-full">
          <div className="px-6 py-6 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-lg font-semibold text-[#8B4513]">Wishlist</h2>
            <button onClick={() => setShowWishlist(false)} className="text-[#8B4513] hover:text-black text-xl font-bold">&times;</button>
          </div>
          <div className="flex flex-col items-center justify-center flex-grow px-6 text-center">
            <svg className="w-16 h-16 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <p className="text-gray-500 mb-4">There are no products in your wishlist!</p>
            <button
              onClick={() => setShowWishlist(false)}
              className="bg-[#8B4513] text-white px-4 py-2 rounded hover:bg-[#a05c2f] transition-colors"
            >
              Browse Products
            </button>
          </div>
        </div>
      </div>

      {/* Bulk Enquiry Drawer */}
      <div className={`fixed top-0 right-0 h-full w-[90%] sm:w-[600px] bg-white shadow-xl transition-transform duration-300 z-[60] ${showBulkEnquiry ? "translate-x-0" : "translate-x-full"}`}>
        <div className="flex flex-col h-full">
          <div className="px-6 py-6 border-b border-gray-200 flex justify-between items-center bg-[#8B4513]">
            <h2 className="text-xl font-bold text-white tracking-wider">Bulk Enquiry</h2>
            <button onClick={() => setShowBulkEnquiry(false)} className="text-white hover:text-gray-200 text-2xl font-bold">&times;</button>
          </div>
          <div className="flex-grow p-6 overflow-y-auto">
            <p className="text-gray-700 mb-6">Planning a large order for an event or business? Fill out the form below and our team will get back to you with a special quote!</p>
            
            <form className="space-y-4">
              <div>
                <label htmlFor="bulkName" className="block text-sm font-medium text-gray-700">Full Name</label>
                <input
                  type="text"
                  id="bulkName"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-[#FF6B35] focus:border-[#FF6B35]"
                  placeholder="Your Name"
                  required
                />
              </div>

              <div>
                <label htmlFor="bulkEmail" className="block text-sm font-medium text-gray-700">Email Address</label>
                <input
                  type="email"
                  id="bulkEmail"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-[#FF6B35] focus:border-[#FF6B35]"
                  placeholder="you@example.com"
                  required
                />
              </div>

              <div>
                <label htmlFor="bulkPhone" className="block text-sm font-medium text-gray-700">Phone Number</label>
                <input
                  type="tel"
                  id="bulkPhone"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-[#FF6B35] focus:border-[#FF6B35]"
                  placeholder="+91-XXXXXXXXXX"
                  required
                />
              </div>

              <div>
                <label htmlFor="bulkProduct" className="block text-sm font-medium text-gray-700">Product(s) of Interest</label>
                <input
                  type="text"
                  id="bulkProduct"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-[#FF6B35] focus:border-[#FF6B35]"
                  placeholder="e.g., 50kg Murukku, 100 boxes Athirasam"
                  required
                />
              </div>

              <div>
                <label htmlFor="bulkQuantity" className="block text-sm font-medium text-gray-700">Required Quantity (Approx)</label>
                <input
                  type="text"
                  id="bulkQuantity"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-[#FF6B35] focus:border-[#FF6B35]"
                  placeholder="e.g., 50 kg or 1000 units"
                  required
                />
              </div>

              <div>
                <label htmlFor="bulkDetails" className="block text-sm font-medium text-gray-700">Additional Details / Event Date</label>
                <textarea
                  id="bulkDetails"
                  rows="3"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-[#FF6B35] focus:border-[#FF6B35]"
                  placeholder="Tell us more about your requirement..."
                ></textarea>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full bg-[#FF6B35] text-white py-3 rounded-md font-semibold text-lg hover:bg-[#ff855e] transition-colors shadow-lg"
                >
                  Submit Bulk Enquiry
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      
      {/* 👤 REVISED PROFILE DRAWER/SIDEBAR (Interactive Brown Menu) */}
      <div className={`fixed top-0 right-0 h-full w-[90%] sm:w-[600px] bg-white shadow-xl transition-transform duration-300 z-[60] ${showProfile ? "translate-x-0" : "translate-x-full"}`}>
        <div className="flex flex-col h-full">
          {/* Drawer Header */}
          <div className="px-6 py-6 border-b border-gray-200 flex justify-between items-center bg-white">
            <h2 className="text-xl font-bold text-gray-800 tracking-wider">Account</h2>
            <button onClick={() => setShowProfile(false)} className={`text-[${BROWN_PRIMARY}] hover:text-black text-2xl font-bold`}>&times;</button>
          </div>
          
          {/* Profile Content - Interactive Menu */}
          <div className="flex-grow p-6 overflow-y-auto space-y-2">
            
            {/* Greeting/Login Prompt */}
            <div className={`p-4 mb-4 bg-gray-50 rounded-lg border-l-4 border-[${ACCENT_ORANGE}]`}>
                <p className="font-semibold text-gray-800">Welcome Jane Doe!</p>
                <p className="text-sm text-gray-500">Manage your account details and orders below.</p>
            </div>

            {/* Profile Navigation Links */}
            <nav className="space-y-1">
                {/* My Orders */}
                <a href="#my-orders" className={`flex items-center p-3 text-gray-700 hover:bg-[${BROWN_PRIMARY}]/10 hover:text-[${BROWN_PRIMARY}] rounded-md transition-all duration-200`}>
                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2m-7 7h3m-3 4h3"/></svg>
                    <span className="font-medium">My Orders</span>
                </a>
                
                {/* Saved Addresses */}
                <a href="#addresses" className={`flex items-center p-3 text-gray-700 hover:bg-[${BROWN_PRIMARY}]/10 hover:text-[${BROWN_PRIMARY}] rounded-md transition-all duration-200`}>
                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                    <span className="font-medium">Saved Addresses</span>
                </a>
                
                {/* Wallet / Credit (Interactive Example) */}
                <a href="#wallet" className={`flex items-center p-3 text-gray-700 hover:bg-[${BROWN_PRIMARY}]/10 hover:text-[${BROWN_PRIMARY}] rounded-md transition-all duration-200`}>
                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/></svg>
                    <span className="font-medium">Wallet & Credits</span>
                </a>
                
                {/* Account Settings */}
                <a href="#settings" className={`flex items-center p-3 text-gray-700 hover:bg-[${BROWN_PRIMARY}]/10 hover:text-[${BROWN_PRIMARY}] rounded-md transition-all duration-200`}>
                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37a1.724 1.724 0 002.572-1.065z"/></svg>
                    <span className="font-medium">Account Settings</span>
                </a>
                
                {/* Help/Contact */}
                <a href="#help" className={`flex items-center p-3 text-gray-700 hover:bg-[${BROWN_PRIMARY}]/10 hover:text-[${BROWN_PRIMARY}] rounded-md transition-all duration-200`}>
                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9.247a3 3 0 100 5.506 3 3 0 000-5.506z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.424 17.585A2 2 0 0017 19v2h2v-2a2 2 0 00-2-2h-1.576zM7 19v2h2v-2H7zM3 15h2m-2-4h2m-2-4h2m14 8h2m-2-4h2m-2-4h2"/></svg>
                    <span className="font-medium">Help & Support</span>
                </a>
                
            </nav>
            
          </div>
          
          {/* Footer/Auth Buttons */}
          <div className="p-6 border-t border-gray-200 space-y-3">
            <button
  onClick={() => {
    setShowProfile(false);
    onLogout && onLogout();
  }}
  className={`w-full mt-6 bg-[${BROWN_PRIMARY}] text-white py-3 rounded-md font-semibold hover:bg-[${BROWN_LIGHT}] transition-colors shadow-md`}
>
  Log Out
</button>
          </div>
        </div>
      </div>
      
      {/* Overlay */}
      {(showSearch || showCart || showWishlist || showBulkEnquiry || showProfile) && (
        <div
          onClick={closeAllDrawers}
          className="fixed inset-0 bg-black/50 z-[50]"
        ></div>
      )}
    </header>
  );
}

export default Navbar;

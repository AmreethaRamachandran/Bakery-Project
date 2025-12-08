import { useState } from 'react';
import cakeImg from "../assets/images.jpg";
import chikkiImg from "../assets/download.jpg";

function Navbar({ onHomeClick }) {
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

  return (
    <header className="sticky top-0 z-20 bg-white">
      {/* Top Announcement Bar */}
      <div className="bg-[#8B4513] text-white py-2 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <button 
            onClick={handlePrevious}
            className="text-white hover:text-gray-200 hover:scale-110 transition-all duration-300"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div className="flex items-center gap-2 text-sm relative">
            <span 
              key={currentAnnouncement}
              className="animate-[slideIn_0.5s_ease-out]"
            >
              {announcements[currentAnnouncement].text} <strong>{announcements[currentAnnouncement].code}</strong>
            </span>
          </div>
          <button 
            onClick={handleNext}
            className="text-white hover:text-gray-200 hover:scale-110 transition-all duration-300"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="border-b relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute left-0 top-0 w-64 h-full bg-gradient-to-r from-[#FF6B35]/5 to-transparent pointer-events-none"></div>
        <div className="absolute right-0 top-0 w-64 h-full bg-gradient-to-l from-[#8B4513]/5 to-transparent pointer-events-none"></div>
        
        {/* Left Side - Animated Bakery Scene */}
        <div className="absolute left-2 top-1/2 -translate-y-1/2 hidden xl:block">
          {/* Steam rising effect */}
          <div className="relative">
            <div className="absolute -top-8 left-4 w-1 h-12 bg-gradient-to-t from-gray-300 to-transparent opacity-40 animate-steam"></div>
            <div className="absolute -top-8 left-6 w-1 h-16 bg-gradient-to-t from-gray-300 to-transparent opacity-30 animate-steam" style={{ animationDelay: '0.5s' }}></div>
            <div className="absolute -top-8 left-8 w-1 h-10 bg-gradient-to-t from-gray-300 to-transparent opacity-50 animate-steam" style={{ animationDelay: '1s' }}></div>
            
            {/* Hot bread basket */}
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
          
          {/* Decorative elements below */}
          <div className="mt-3 space-y-2">
            <div className="flex items-center gap-1">
              <span className="text-xs text-[#8B4513] font-semibold opacity-60 animate-pulse">Fresh</span>
              <span className="text-yellow-500 text-xs animate-twinkle">✨</span>
            </div>
          </div>
        </div>
        
        {/* Right Side - Animated Sweet Display */}
        <div className="absolute right-2 top-1/2 -translate-y-1/2 hidden xl:block">
          {/* Rotating plate with sweets */}
          <div className="relative">
            {/* Plate */}
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 shadow-inner flex items-center justify-center animate-spin-slow">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-white to-gray-50 border-2 border-gray-200"></div>
            </div>
            
            {/* Sweets on plate */}
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
            
            {/* Sparkles */}
            <div className="absolute -top-1 -right-1 text-yellow-400 text-sm animate-twinkle">
              ✨
            </div>
            <div className="absolute -bottom-1 -left-1 text-yellow-400 text-xs animate-twinkle" style={{ animationDelay: '0.5s' }}>
              ✨
            </div>
          </div>
          
          {/* Label below */}
          <div className="mt-3 text-center">
            <span className="text-xs text-[#8B4513] font-semibold opacity-60 animate-pulse">Delicious</span>
          </div>
        </div>

        <div className="max-w-7xl mx-auto flex items-center justify-between py-4 px-4 relative z-10">

          {/* Logo */}
          <button 
            onClick={() => onHomeClick && onHomeClick()}
            className="flex items-center gap-3 group cursor-pointer"
          >
            <div className="relative transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-12">
              <div className="w-16 h-16 bg-gradient-to-br from-[#8B4513] to-[#6B3410] rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
                <svg className="w-10 h-10 text-white transform transition-transform group-hover:rotate-180 duration-700" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C11.5 2 11 2.19 10.59 2.59L2.59 10.59C1.8 11.37 1.8 12.63 2.59 13.41L10.59 21.41C11.37 22.2 12.63 22.2 13.41 21.41L21.41 13.41C22.2 12.63 22.2 11.37 21.41 10.59L13.41 2.59C13 2.19 12.5 2 12 2M12 4L20 12L12 20L4 12L12 4Z"/>
                </svg>
              </div>
              <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-12 h-6 bg-white rounded-t-full border-2 border-[#8B4513] transition-all group-hover:border-[#FF6B35]">
                <div className="w-full h-full flex items-end justify-center">
                  <div className="w-2 h-2 bg-[#8B4513] rounded-full mb-1 animate-pulse"></div>
                </div>
              </div>
              {/* Glow effect */}
              <div className="absolute inset-0 rounded-full bg-[#FF6B35] opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500"></div>
            </div>
            <div className="leading-tight">
              <p className="font-bold text-base group-hover:text-[#FF6B35] transition-colors">M S Shanmugandar</p>
              <p className="text-xl font-bold text-[#8B4513] group-hover:text-[#FF6B35] transition-colors">Bakery</p>
            </div>
          </button>

          {/* Navigation */}
          <nav className="hidden lg:flex gap-8 text-sm font-medium">
            <a href="#savouries" className="relative group hover:text-[#FF6B35] transition-colors flex items-center gap-1">
              Savouries ▼
              <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-[#FF6B35] group-hover:w-full transition-all duration-300"></span>
            </a>
            <a href="#sweets" className="relative group text-[#FF6B35] pb-1 flex items-center gap-1">
              Sweets ▼
              <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-[#FF6B35] animate-pulse"></span>
            </a>           


  {/* BAKERY DROPDOWN */}

          
<div className="relative group cursor-pointer">
  {/* Navbar Link */}
  <span className="flex items-center gap-1 text-[#8B4513] hover:text-[#C55A27] transition-colors">
    Bakery
    <span className="transition-transform duration-300 group-hover:rotate-180">▼</span>
  </span>

  {/* Dropdown Overlay */}
  <div
    className="
      fixed left-0 top-[170px] w-screen h-[50vh]
      bg-white border-b border-[#E5C8A6]
      shadow-md z-50
      opacity-0 invisible translate-y-5 transition-all duration-500 ease-out
      group-hover:opacity-100 group-hover:visible group-hover:translate-y-0">
    <div className="flex h-full px-50 py-10">
      {/* LEFT SECTION */}
      <div className="w-2/3 flex flex-col justify-center gap-10 pr-10">
        <div className="grid grid-cols-2 gap-15">
          {/* Cakes */}
          <div>
            <h3 className="text-[#8B4513] font-semibold text-sm tracking-wider mb-4">
              CAKES
            </h3>
            <ul className="space-y-3">
              <li className="relative inline-block cursor-pointer hover:text-[#C55A27] transition group/item">
                Rich Plum Cake
                <span className="absolute left-0 -bottom-[2px] bg-[#C55A27] h-[2px] w-0 group-hover/item:w-full transition-all duration-300"></span>
              </li>
            </ul>
          </div>

          {/* Cookies */}
          <div>
            <h3 className="text-[#8B4513] font-semibold text-sm tracking-wider mb-4">
              COOKIES
            </h3>
           <ul className="space-y-3">
  {["Coconut Cookies", "Vanilla Cookies", "Coin Biscuits", "Rusk"].map((item) => (
    <li key={item} className="block cursor-pointer group/item">
      <span className="relative inline-block hover:text-[#C55A27] transition">

        {item}

        {/* underline only under text */}
        <span
          className="
            absolute left-0 -bottom-[2px] h-[2px] bg-[#C55A27]
            w-full origin-left 
            scale-x-0 group-hover/item:scale-x-100
            transition-transform duration-300
          "
        ></span>

      </span>
    </li>
  ))}
      </ul>
    </div>
  </div>
</div>

    {/* RIGHT IMAGE */}
<div className="w-1/4 flex items-center justify-end">
  <img
    src={cakeImg}
    alt="Rich Plum Cake"
    className="w-[300px] h-[300px] object-cover rounded-full border border-[#E5C8A6]"
  />
</div>

    </div>
  </div>
</div>



            {/* CHIKKI DROPDOWN */}



<div className="relative group cursor-pointer">
  {/* Navbar Link */}
  <a href="#chikki" className="relative flex items-center gap-1 text-[#8B4513] hover:text-[#FF6B35] transition-colors">
    Chikki
    <span className="transition-transform duration-300 group-hover:rotate-180">▼</span>
    <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-[#FF6B35] group-hover:w-full transition-all duration-300"></span>
  </a>

  {/* Dropdown Overlay */}
  <div
    className="
      fixed left-0 top-[170px] w-screen h-[50vh]
      bg-white border-b border-[#E5C8A6]
      shadow-md z-50
      opacity-0 invisible translate-y-5 transition-all duration-500 ease-out
      group-hover:opacity-100 group-hover:visible group-hover:translate-y-0
    "
  >
    <div className="flex h-full px-50 py-10">
      {/* LEFT SECTION */}
      <div className="w-2/3 flex flex-col justify-center gap-10 pr-10">
        <div className="grid grid-cols-2 gap-15">
          <div>
            <h3 className="text-[#8B4513] font-semibold text-sm tracking-wider mb-4">
              CHIKKI BITES
            </h3>
             <ul className="space-y-3">
              {["Pori Urundai Smashed", "Peanut Chikki Bites", "Black Sesame Chikki Bites", "Groundnut Chikki Balls", "Kamarakat/ Kamarkattu"].map((item) => (
                <li key={item} className="block cursor-pointer group/item">
                  <span className="relative inline-block hover:text-[#C55A27] transition">
                    {item}
                    {/* underline only under text */}
                    <span
                      className="
                        absolute left-0 -bottom-[2px] h-[2px] bg-[#C55A27]
                        w-full origin-left 
                        scale-x-0 group-hover/item:scale-x-100
                        transition-transform duration-300
                      "
                    ></span>
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Cookies */}
          <div>
            <h3 className="text-[#8B4513] font-semibold text-sm tracking-wider mb-4">
              CHIKKI BARS
            </h3>
            <ul className="space-y-3">
              {["Groundnut Chikki Ban", "Koko Peanut Chikki Ban", "White Sesame Chikki Bar", "Black Sesame Chikki Bar"].map((item) => (
                <li key={item} className="block cursor-pointer group/item">
                  <span className="relative inline-block hover:text-[#C55A27] transition">
                    {item}
                    {/* underline only under text */}
                    <span
                      className="
                        absolute left-0 -bottom-[2px] h-[2px] bg-[#C55A27]
                        w-full origin-left 
                        scale-x-0 group-hover/item:scale-x-100
                        transition-transform duration-300
                      "
                    ></span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* RIGHT IMAGE */}
      <div className="w-1/4 flex items-center justify-end">
        <img
          src={chikkiImg}
          alt="chikki"
          className="w-[300px] h-[300px] object-cover rounded-full border border-[#E5C8A6]"
        />
      </div>
    </div>
  </div>
</div>



            
            <a href="#kitchen-specials" className="relative group hover:text-[#FF6B35] transition-colors flex items-center gap-1">
              Kitchen Specials ▼
              <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-[#FF6B35] group-hover:w-full transition-all duration-300"></span>
            </a>
            <button 
              onClick={(e) => {
                e.preventDefault();
                if (onComboClick) onComboClick();
              }}
              className="relative group hover:text-[#FF6B35] transition-colors flex items-center gap-1"
            >
              Combo ▼
              <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-[#FF6B35] group-hover:w-full transition-all duration-300"></span>
            </button>
            <a href="#bulk-enquiry" className="relative group hover:text-[#FF6B35] transition-colors">
              Bulk Enquiry
              <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-[#FF6B35] group-hover:w-full transition-all duration-300"></span>
            </a>
          </nav>

          {/* Right Icons */}
          <div className="flex items-center gap-4">
            {/* 🔍 Search */}
            <button
              onClick={() => setShowSearch(true)}
              className="relative group hover:text-[#FF6B35] transition-all duration-300 transform hover:scale-110"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <span className="absolute inset-0 rounded-full bg-[#FF6B35] opacity-0 group-hover:opacity-10 blur-md transition-opacity"></span>
            </button>

            {/* 👤 Profile */}
            <button className="relative group hover:text-[#FF6B35] transition-all duration-300 transform hover:scale-110">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span className="absolute inset-0 rounded-full bg-[#FF6B35] opacity-0 group-hover:opacity-10 blur-md transition-opacity"></span>
            </button>

            {/* ❤️ Wishlist */}
            <button
              onClick={() => setShowWishlist(true)}
              className="relative group hover:text-[#FF6B35] transition-all duration-300 transform hover:scale-110"
            >
              <svg className="w-5 h-5 group-hover:fill-[#FF6B35] transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center animate-pulse">0</span>
              <span className="absolute inset-0 rounded-full bg-[#FF6B35] opacity-0 group-hover:opacity-10 blur-md transition-opacity"></span>
            </button>

            {/* 🛒 Cart */}
            <button
              onClick={() => setShowCart(true)}
              className="relative group hover:text-[#FF6B35] transition-all duration-300 transform hover:scale-110"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center animate-pulse">0</span>
              <span className="absolute inset-0 rounded-full bg-[#FF6B35] opacity-0 group-hover:opacity-10 blur-md transition-opacity"></span>
            </button>
          </div>
        </div>
      </div>

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

      {/* Overlay */}
      {(showSearch || showCart || showWishlist) && (
        <div
          onClick={() => {
            setShowSearch(false);
            setShowCart(false);
            setShowWishlist(false);
          }}
          className="fixed inset-0 bg-black/50 z-[50]"
        ></div>
      )}
    </header>
  );
}

export default Navbar;

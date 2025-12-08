import { useState } from "react";

function Navbar() {
  const [showSearch, setShowSearch] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showWishlist, setShowWishlist] = useState(false);

  return (
    <header className="sticky top-0 z-20 bg-white">
      {/* Top Announcement Bar */}
      <div className="bg-[#8B4513] text-white py-2">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <button className="text-white hover:text-gray-200">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div className="flex items-center gap-2 text-sm">
            <span>Welcome Offer Coupon Code: <strong>WELCOME10</strong></span>
          </div>
          <button className="text-white hover:text-gray-200">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="border-b">
        <div className="max-w-7xl mx-auto flex items-center justify-between py-4 px-4">

          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-16 h-16 bg-[#8B4513] rounded-full flex items-center justify-center">
                <svg className="w-10 h-10 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C11.5 2 11 2.19 10.59 2.59L2.59 10.59C1.8 11.37 1.8 12.63 2.59 13.41L10.59 21.41C11.37 22.2 12.63 22.2 13.41 21.41L21.41 13.41C22.2 12.63 22.2 11.37 21.41 10.59L13.41 2.59C13 2.19 12.5 2 12 2M12 4L20 12L12 20L4 12L12 4Z"/>
                </svg>
              </div>
              <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-12 h-6 bg-white rounded-t-full border-2 border-[#8B4513]">
                <div className="w-full h-full flex items-end justify-center">
                  <div className="w-2 h-2 bg-[#8B4513] rounded-full mb-1"></div>
                </div>
              </div>
            </div>
            <div className="leading-tight">
              <p className="font-bold text-base">M S Shanmugandar</p>
              <p className="text-xl font-bold text-[#8B4513]">Bakery</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden lg:flex gap-8 text-sm font-medium">
            <a href="#savouries" className="hover:text-[#FF6B35] transition-colors flex items-center gap-1">Savouries ▼</a>
            <a href="#sweets" className="text-[#FF6B35] border-b-2 border-[#FF6B35] pb-1 flex items-center gap-1">Sweets ▼</a>
            <a href="#bakery" className="hover:text-[#FF6B35] transition-colors flex items-center gap-1">Bakery ▼</a>
            <a href="#chikki" className="hover:text-[#FF6B35] transition-colors flex items-center gap-1">Chikki ▼</a>
            <a href="#kitchen-specials" className="hover:text-[#FF6B35] transition-colors flex items-center gap-1">Kitchen Specials ▼</a>
            <a href="#combo" className="hover:text-[#FF6B35] transition-colors flex items-center gap-1">Combo ▼</a>
            <a href="#bulk-enquiry" className="hover:text-[#FF6B35] transition-colors">Bulk Enquiry</a>
          </nav>

          {/* Right Icons */}
          <div className="flex items-center gap-4">
            {/* 🔍 Search */}
            <button
              onClick={() => setShowSearch(true)}
              className="hover:text-[#FF6B35] transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            {/* 👤 Profile */}
            <button className="hover:text-[#FF6B35] transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </button>

            {/* ❤️ Wishlist */}
            <button
              onClick={() => setShowWishlist(true)}
              className="hover:text-[#FF6B35] transition-colors relative"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">0</span>
            </button>

            {/* 🛒 Cart */}
            <button
              onClick={() => setShowCart(true)}
              className="hover:text-[#FF6B35] transition-colors relative"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">0</span>
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

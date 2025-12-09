function Footer() {
  return (
    <footer className="bg-[#D4A574] text-gray-800 relative overflow-hidden">
      {/* Decorative top border */}
      <div className="h-4 bg-white border-b-2 border-dashed border-gray-400">
        <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 1200 20">
          <path d="M0,10 Q10,0 20,10 T40,10 T60,10 T80,10 T100,10 T120,10 T140,10 T160,10 T180,10 T200,10 T220,10 T240,10 T260,10 T280,10 T300,10 T320,10 T340,10 T360,10 T380,10 T400,10 T420,10 T440,10 T460,10 T480,10 T500,10 T520,10 T540,10 T560,10 T580,10 T600,10 T620,10 T640,10 T660,10 T680,10 T700,10 T720,10 T740,10 T760,10 T780,10 T800,10 T820,10 T840,10 T860,10 T880,10 T900,10 T920,10 T940,10 T960,10 T980,10 T1000,10 T1020,10 T1040,10 T1060,10 T1080,10 T1100,10 T1120,10 T1140,10 T1160,10 T1180,10 T1200,10" 
                stroke="#666" 
                fill="none" 
                strokeWidth="1"/>
        </svg>
      </div>

      {/* Decorative Background Elements */}
      <div className="absolute left-10 top-20 opacity-20">
        <svg className="w-32 h-48" viewBox="0 0 100 150">
          <rect x="20" y="50" width="60" height="80" fill="none" stroke="currentColor" strokeWidth="1"/>
          <polygon points="50,10 10,50 90,50" fill="none" stroke="currentColor" strokeWidth="1"/>
          <circle cx="50" cy="30" r="5" fill="currentColor"/>
        </svg>
      </div>

      <div className="absolute right-10 bottom-20 opacity-20">
        <svg className="w-40 h-40" viewBox="0 0 150 150">
          <rect x="30" y="60" width="90" height="70" fill="none" stroke="currentColor" strokeWidth="1"/>
          <polygon points="75,20 20,60 130,60" fill="none" stroke="currentColor" strokeWidth="1"/>
          <rect x="55" y="80" width="15" height="25" fill="none" stroke="currentColor"/>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12 relative z-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Savouries Column */}
          <div>
            <h3 className="font-bold text-lg mb-4">Savouries</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#thenkuzhal-murukku" className="hover:text-[#8B4513] transition-colors">Thenkuzhal Murukku</a></li>
              <li><a href="#butter-murukku" className="hover:text-[#8B4513] transition-colors">Butter Murukku</a></li>
              <li><a href="#4-suthu-murukku" className="hover:text-[#8B4513] transition-colors">4 Suthu Murukku</a></li>
              <li><a href="#5-suthu-murukku" className="hover:text-[#8B4513] transition-colors">5 Suthu Murukku</a></li>
              <li><a href="#7-suthu-murukku" className="hover:text-[#8B4513] transition-colors">7 Suthu Murukku</a></li>
              <li><a href="#9-suthu-murukku" className="hover:text-[#8B4513] transition-colors">9 Suthu Murukku</a></li>
              <li><a href="#11-suthu-murukku" className="hover:text-[#8B4513] transition-colors">11 Suthu Murukku</a></li>
              <li><a href="#mini-thenkuzhal" className="hover:text-[#8B4513] transition-colors">Mini Thenkuzhal</a></li>
              <li><a href="#kaara-murukku" className="hover:text-[#8B4513] transition-colors">Kaara Murukku</a></li>
              <li><a href="#tire-murukku" className="hover:text-[#8B4513] transition-colors">Tire Murukku</a></li>
              <li><a href="#mini-kai-murukku" className="hover:text-[#8B4513] transition-colors">Mini Kai Murukku</a></li>
              <li><a href="#urundai-seedai" className="hover:text-[#8B4513] transition-colors">Urundai Seedai</a></li>
              <li><a href="#chinna-seedai" className="hover:text-[#8B4513] transition-colors">Chinna Seedai</a></li>
              <li><a href="#seepu-seedai" className="hover:text-[#8B4513] transition-colors">Seepu Seedai</a></li>
              <li><a href="#inippu-seedai" className="hover:text-[#8B4513] transition-colors">Inippu Seedai</a></li>
              <li><a href="#mixture" className="hover:text-[#8B4513] transition-colors">Mixture</a></li>
              <li><a href="#kara-boondhi" className="hover:text-[#8B4513] transition-colors">Kara Boondhi</a></li>
            </ul>
          </div>

          {/* Sweets Column */}
          <div>
            <h3 className="font-bold text-lg mb-4">Sweets</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#athirasam" className="hover:text-[#8B4513] transition-colors">Athirasam</a></li>
              <li><a href="#periya-athirasam" className="hover:text-[#8B4513] transition-colors">Periya Athirasam</a></li>
              <li><a href="#rava-laddu" className="hover:text-[#8B4513] transition-colors">Rava Laddu</a></li>
              <li><a href="#ulundhamavurundai" className="hover:text-[#8B4513] transition-colors">Ulundhamavurundai</a></li>
              <li><a href="#mavurundai" className="hover:text-[#8B4513] transition-colors">Mavurundai</a></li>
            </ul>
          </div>

          {/* Information Column */}
          <div>
            <h3 className="font-bold text-lg mb-4">Information</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#about" className="hover:text-[#8B4513] transition-colors">About Us</a></li>
              <li><a href="#terms" className="hover:text-[#8B4513] transition-colors">Terms and Conditions</a></li>
              <li><a href="#privacy" className="hover:text-[#8B4513] transition-colors">Privacy Policy</a></li>
              <li><a href="#delivery" className="hover:text-[#8B4513] transition-colors">Delivery & Shipping Policy</a></li>
              <li><a href="#return" className="hover:text-[#8B4513] transition-colors">Return Policy</a></li>
              <li><a href="#contact" className="hover:text-[#8B4513] transition-colors">Contact Us</a></li>
              <li><a href="#sitemap" className="hover:text-[#8B4513] transition-colors">Sitemap</a></li>
            </ul>
          </div>

          {/* My Account Column */}
          <div>
            <h3 className="font-bold text-lg mb-4">My Account</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#account" className="hover:text-[#8B4513] transition-colors">My Account</a></li>
              <li><a href="#orders" className="hover:text-[#8B4513] transition-colors">Order History</a></li>
              <li><a href="#wishlist" className="hover:text-[#8B4513] transition-colors">Wish List</a></li>
            </ul>
          </div>

          {/* Contact Us Column */}
          <div>
            <h3 className="font-bold text-lg mb-4">Contact Us</h3>
            <div className="space-y-3 text-sm">
              <p className="leading-relaxed">
                No 77, Pillayar Kovil Street,<br />
                Sattur - 626203.<br />
                Virudhunagar District.<br />
                Tamilnadu, India.
              </p>
              <p className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                +91 95009 93465
              </p>
              <div className="flex gap-4 pt-2">
                <a href="#facebook" className="hover:text-[#8B4513] transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a href="#instagram" className="hover:text-[#8B4513] transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a href="#youtube" className="hover:text-[#8B4513] transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* FSSAI License */}
        <div className="text-center mb-6">
          <div className="inline-block">
            <img 
              src="https://upload.wikimedia.org/wikipedia/en/thumb/8/82/FSSAI_logo.svg/200px-FSSAI_logo.svg.png" 
              alt="FSSAI" 
              className="h-12 mx-auto mb-2"
            />
            <p className="text-sm font-semibold">License Number: 12422032000859</p>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="text-center mb-6">
          <p className="text-sm font-semibold mb-4">100% Secure Shopping</p>
          <div className="flex justify-center items-center gap-3 flex-wrap">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/American_Express_logo_%282018%29.svg/120px-American_Express_logo_%282018%29.svg.png" alt="American Express" className="h-8"/>
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/120px-Visa_Inc._logo.svg.png" alt="Visa" className="h-8"/>
            <img src="https://www.rupay.co.in/images/logo.png" alt="RuPay" className="h-8"/>
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Google_Pay_Logo.svg/120px-Google_Pay_Logo.svg.png" alt="Google Pay" className="h-8"/>
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Paytm_logo.svg/120px-Paytm_logo.svg.png" alt="Paytm" className="h-8"/>
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Mastercard_2019_logo.svg/120px-Mastercard_2019_logo.svg.png" alt="Mastercard" className="h-8"/>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-sm border-t border-gray-600 pt-6">
          <p className="mb-2">Copyright © 2025 Sattur Mittai Kadai. All rights reserved.</p>
          <p>Designed and Developed by <a href="#" className="font-semibold hover:text-[#8B4513] transition-colors">Weone Digital</a>.</p>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <button 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 bg-white text-gray-800 p-3 rounded-full shadow-lg hover:bg-gray-100 transition-all z-50"
        aria-label="Scroll to top"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button>
    </footer>
  );
}

export default Footer;

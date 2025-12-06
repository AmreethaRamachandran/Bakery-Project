function Navbar() {
  return (
    <header className="shadow-sm sticky top-0 z-20 bg-white">
      <div className="max-w-6xl mx-auto flex items-center justify-between py-3 px-4">
        <div className="flex items-center gap-2">
          <div className="h-10 w-10 rounded-full bg-amber-600 flex items-center justify-center text-white font-bold">
            SMK
          </div>
          <div className="leading-tight">
            <p className="font-semibold text-sm">Sattur Mittai Kadai</p>
            <p className="text-xs text-gray-500">Since 1914</p>
          </div>
        </div>

        <nav className="hidden md:flex gap-6 text-sm font-medium text-gray-700">
          <a href="#home" className="hover:text-amber-700">Home</a>
          <a href="#savouries" className="hover:text-amber-700">Savouries</a>
          <a href="#sweets" className="hover:text-amber-700">Sweets</a>
          <a href="#chikki" className="hover:text-amber-700">Chikki</a>
          <a href="#about" className="hover:text-amber-700">Our Story</a>
        </nav>

        <div className="flex items-center gap-3 text-sm">
          <button className="hidden sm:inline px-3 py-1 border rounded-full text-gray-700 hover:border-amber-600">
            Login
          </button>
          <button className="px-3 py-1.5 rounded-full bg-amber-600 text-white font-medium hover:bg-amber-700">
            Cart (0)
          </button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;

function HeroSection() {
  return (
    <section
      id="home"
      className="bg-gradient-to-r from-amber-50 via-amber-100 to-orange-50"
    >
      <div className="max-w-6xl mx-auto px-4 py-12 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <p className="text-sm font-semibold text-amber-700 tracking-wide uppercase">
            Traditional Indian Sweets & Snacks
          </p>
          <h1 className="mt-3 text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
            Taste and quality
            <span className="text-amber-700"> carried over generations</span>
          </h1>
          <p className="mt-4 text-gray-600 text-sm md:text-base">
            Crispy kaara sevu, authentic chikkis and delightful sweets
            delivered fresh from Sattur to your doorstep.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <button className="px-5 py-2.5 rounded-full bg-amber-700 text-white font-semibold hover:bg-amber-800">
              Shop Sweets
            </button>
            <button className="px-5 py-2.5 rounded-full border border-amber-600 text-amber-700 font-semibold hover:bg-amber-50">
              Shop Savouries
            </button>
          </div>
        </div>

        <div className="relative flex justify-center">
          <div className="h-64 w-64 md:h-80 md:w-80 rounded-full bg-[url('https://www.satturmittaikadai.com/cdn/shop/files/home_hero_image.jpg')] bg-cover bg-center shadow-xl border-4 border-amber-200" />
        </div>
      </div>
    </section>
  );
}

export default HeroSection;

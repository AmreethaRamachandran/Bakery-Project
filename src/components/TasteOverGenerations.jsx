function TasteOverGenerations() {
  return (
    <section className="relative py-20 bg-gradient-to-br from-[#6B3410] via-[#8B4513] to-[#6B3410] text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 border-2 border-white rounded-full"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 border-2 border-white rounded-full"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 border border-white rounded-full"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left Content - Text */}
          <div className="space-y-6 order-2 md:order-1">
            <div className="inline-block">
              <span className="text-[#FF6B35] text-sm font-semibold tracking-widest uppercase border-b-2 border-[#FF6B35] pb-1">
                Since 1914
              </span>
            </div>

            <h2 className="font-serif text-5xl md:text-6xl leading-tight italic">
              Taste and Quality carried
              <br />
              <span className="text-[#FF6B35]">over generations!</span>
            </h2>

            <div className="w-20 h-1 bg-[#FF6B35]"></div>

            <p className="text-lg text-gray-200 leading-relaxed">
              Mittai Kadai has stood the testament of time by consistently 
              providing quality and taste. Currently run by the fourth 
              generation, the Mittai Kadai has lived up to the expectations of 
              our clients through fresh, healthy and delightful snacks and sweets.
            </p>

            <div className="flex items-center gap-8 pt-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-[#FF6B35]">110+</div>
                <div className="text-sm text-gray-300 mt-1">Years Legacy</div>
              </div>
              <div className="w-px h-12 bg-gray-400"></div>
              <div className="text-center">
                <div className="text-4xl font-bold text-[#FF6B35]">4th</div>
                <div className="text-sm text-gray-300 mt-1">Generation</div>
              </div>
              <div className="w-px h-12 bg-gray-400"></div>
              <div className="text-center">
                <div className="text-4xl font-bold text-[#FF6B35]">1000+</div>
                <div className="text-sm text-gray-300 mt-1">Products</div>
              </div>
            </div>

            <button className="group mt-8 px-8 py-4 bg-[#FF6B35] text-white rounded-lg hover:bg-[#FF8C5C] transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              Our Story
              <span className="inline-block ml-2 group-hover:translate-x-2 transition-transform">→</span>
            </button>
          </div>

          {/* Right Content - Image with Frame */}
          <div className="relative order-1 md:order-2">
            <div className="relative mx-auto max-w-md">
              {/* Decorative Corner Elements */}
              <div className="absolute -top-6 -left-6 w-24 h-24 border-t-4 border-l-4 border-[#D4A574]"></div>
              <div className="absolute -top-6 -right-6 w-24 h-24 border-t-4 border-r-4 border-[#D4A574]"></div>
              <div className="absolute -bottom-6 -left-6 w-24 h-24 border-b-4 border-l-4 border-[#D4A574]"></div>
              <div className="absolute -bottom-6 -right-6 w-24 h-24 border-b-4 border-r-4 border-[#D4A574]"></div>

              {/* Main Image Container */}
              <div className="relative bg-gradient-to-br from-[#D4A574] to-[#BFA278] p-1 rounded-lg shadow-2xl">
                <div className="bg-white p-4 rounded-lg">
                  <img
                    src="https://images.unsplash.com/photo-1566843972142-a7a6a18c152d?w=600"
                    alt="Founder Since 1914"
                    className="w-full h-[500px] object-cover rounded grayscale"
                  />
                  
                  {/* Signature Badge */}
                  <div className="absolute bottom-8 right-8 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg shadow-lg">
                    <div className="font-serif italic text-2xl text-[#8B4513]">Since</div>
                    <div className="text-4xl font-bold text-[#6B3410]">1914</div>
                  </div>
                </div>
              </div>

              {/* Floating Decorative Elements */}
              <div className="absolute -top-8 right-1/4 w-16 h-16 bg-[#FF6B35] rounded-full opacity-20 animate-float"></div>
              <div className="absolute bottom-1/4 -left-8 w-20 h-20 bg-[#D4A574] rounded-full opacity-20 animate-float-delayed"></div>
              
              {/* Heritage Badge */}
              <div className="absolute top-1/2 -left-12 bg-gradient-to-br from-[#FF6B35] to-[#FF8C5C] text-white px-6 py-3 rounded-full shadow-xl transform -rotate-12">
                <div className="text-center">
                  <div className="text-xs font-medium">Heritage</div>
                  <div className="text-lg font-bold">Brand</div>
                </div>
              </div>
            </div>

            {/* Background Decorative Shapes */}
            <div className="absolute top-0 right-0 w-72 h-72 bg-[#FF6B35] rounded-full opacity-5 blur-3xl -z-10"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#D4A574] rounded-full opacity-5 blur-3xl -z-10"></div>
          </div>
        </div>

        {/* Bottom Timeline */}
        <div className="mt-20 pt-12 border-t border-white/20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-3xl font-bold text-[#FF6B35]">1914</div>
              <div className="text-sm text-gray-300">Foundation</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-[#FF6B35]">1950</div>
              <div className="text-sm text-gray-300">2nd Generation</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-[#FF6B35]">1985</div>
              <div className="text-sm text-gray-300">3rd Generation</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-[#FF6B35]">2020</div>
              <div className="text-sm text-gray-300">4th Generation</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TasteOverGenerations;

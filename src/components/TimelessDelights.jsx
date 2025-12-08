import { useState } from 'react';

function TimelessDelights() {
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <section className="relative bg-gradient-to-br from-[#D4A574] via-[#C8A882] to-[#BFA278] py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6 animate-fade-in-left">
            <div className="space-y-4">
              <h2 className="font-serif text-6xl md:text-7xl text-[#5C3D2E] italic">
                Timeless Delights
              </h2>
            </div>
            
            <p className="text-2xl text-[#5C3D2E] leading-relaxed">
              A taste of India's heritage in every<br />
              sweet and savoury.
            </p>

            <button className="group mt-8 px-8 py-3 border-2 border-[#5C3D2E] bg-transparent hover:bg-[#5C3D2E] hover:text-white transition-all duration-300 text-[#5C3D2E] font-medium tracking-wider">
              Our Story
              <span className="inline-block ml-2 group-hover:translate-x-2 transition-transform">→</span>
            </button>
          </div>

          {/* Right Content - Video/Image Section */}
          <div className="relative animate-fade-in-right">
            {/* Main circular video frame */}
            <div className="relative mx-auto w-[400px] h-[400px]">
              {/* Decorative circular text */}
              <div className="absolute inset-0 animate-spin-slow z-10 pointer-events-none">
                <svg viewBox="0 0 200 200" className="w-full h-full">
                  <defs>
                    <path
                      id="circlePath"
                      d="M 100, 100 m -80, 0 a 80,80 0 1,1 160,0 a 80,80 0 1,1 -160,0"
                    />
                  </defs>
                  <text className="fill-[#5C3D2E] text-xs font-medium tracking-[0.3em]">
                    <textPath href="#circlePath" startOffset="0%">
                      SAVOURY • TASTY • MUNCHY • YUMMY • 
                    </textPath>
                  </text>
                </svg>
              </div>

              {/* Video/Image container */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-[320px] h-[320px] rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-500">
                  <img
                    src="https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600"
                    alt="Traditional Indian Sweets"
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Play button overlay */}
                  <button
                    onClick={togglePlay}
                    className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-all duration-300 group"
                  >
                    <div className={`w-20 h-20 rounded-full bg-white flex items-center justify-center shadow-lg transform transition-all duration-300 ${isPlaying ? 'scale-90' : 'scale-100 group-hover:scale-110'}`}>
                      {isPlaying ? (
                        <div className="flex gap-1.5">
                          <div className="w-1.5 h-6 bg-[#5C3D2E] rounded"></div>
                          <div className="w-1.5 h-6 bg-[#5C3D2E] rounded"></div>
                        </div>
                      ) : (
                        <svg className="w-8 h-8 text-[#5C3D2E] ml-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      )}
                    </div>
                  </button>

                  {/* Decorative corners */}
                  <div className="absolute top-0 left-0 w-12 h-12 border-t-4 border-l-4 border-[#D4A574]"></div>
                  <div className="absolute top-0 right-0 w-12 h-12 border-t-4 border-r-4 border-[#D4A574]"></div>
                  <div className="absolute bottom-0 left-0 w-12 h-12 border-b-4 border-l-4 border-[#D4A574]"></div>
                  <div className="absolute bottom-0 right-0 w-12 h-12 border-b-4 border-r-4 border-[#D4A574]"></div>
                </div>
              </div>
            </div>

            {/* Secondary image with year badge */}
            <div className="absolute -bottom-10 -right-5 animate-float z-10">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1533155607801-d1b9e6e3eb5b?w=300"
                  alt="Since 1914"
                  className="w-48 h-32 object-cover rounded-lg shadow-xl border-4 border-white"
                />
                <div className="absolute -top-3 -right-3 bg-white rounded-full p-4 shadow-lg">
                  <div className="text-center">
                    <div className="text-xs text-[#5C3D2E] font-medium">SINCE</div>
                    <div className="text-2xl font-bold text-[#8B4513]">1914</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative plate illustration */}
            <div className="absolute -bottom-5 left-0 opacity-30">
              <svg width="300" height="150" viewBox="0 0 300 150" className="text-[#5C3D2E]">
                <ellipse cx="150" cy="100" rx="120" ry="40" fill="none" stroke="currentColor" strokeWidth="2" />
                <circle cx="130" cy="80" r="25" fill="currentColor" opacity="0.3" />
                <circle cx="170" cy="85" r="20" fill="currentColor" opacity="0.3" />
                <circle cx="150" cy="95" r="22" fill="currentColor" opacity="0.3" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TimelessDelights;

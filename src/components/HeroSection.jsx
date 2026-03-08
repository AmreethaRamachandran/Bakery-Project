import { useState, useEffect } from 'react';

function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      title: "Welcome Offer - 10% OFF",
      subtitle: "NEW CUSTOMER SPECIAL",
      description: "Get 10% discount on your first order. Use code: WELCOME10 at checkout. Valid on all products!",
      badge: "LIMITED TIME",
      image: "https://www.satturmittaikadai.com/cdn/shop/files/sattur-black-sesame-chikki.webp?v=1745996140&width=360",
      bgColor: "from-amber-50 via-amber-100 to-orange-100"
    },
    {
      id: 2,
      title: "Free Delivery on Orders ₹500+",
      subtitle: "SAVE MORE TODAY",
      description: "Shop for ₹500 or more and enjoy free home delivery. Fresh bakery items delivered right to your doorstep!",
      badge: "EVERYDAY OFFER",
      image: "https://www.satturmittaikadai.com/cdn/shop/files/karasevu.webp?v=1745996060&width=720",
      bgColor: "from-orange-50 via-pink-50 to-red-100"
    },
    {
      id: 3,
      title: "Special Discount - Save 20%",
      subtitle: "TODAY'S BEST DEAL",
      description: "Get flat 20% off on selected combo packs and festive special items. Use code: SAVE20. Hurry, limited stock!",
      badge: "HOT DEAL",
      image: "https://www.satturmittaikadai.com/cdn/shop/files/onion-murukku_bfa2d16d-6941-48fb-8f29-d7ad378e0ae4.webp?v=1763727631&width=360",
      bgColor: "from-yellow-50 via-amber-50 to-orange-100"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  const goToSlide = (index) => setCurrentSlide(index);

  return (
    <section id="home" className="relative w-full h-[550px] sm:h-[600px] lg:h-[700px] overflow-hidden bg-gray-50">
      {/* Carousel Container */}
      <div className="relative h-full w-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out transform ${
              index === currentSlide ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8 pointer-events-none'
            }`}
          >
            {/* Background Gradient */}
            <div className={`absolute inset-0 bg-gradient-to-br ${slide.bgColor} opacity-60`} />
            
            <div className="relative h-full max-w-7xl mx-auto px-6 lg:px-12 flex items-center">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center w-full py-12">
                
                {/* Text Content - Order 2 on mobile, 1 on desktop */}
                <div className="order-2 lg:order-1 flex flex-col items-center lg:items-start text-center lg:text-left z-10">
                  <span className="px-4 py-1.5 bg-[#FF6B35] text-white text-xs md:text-sm font-black rounded-full uppercase tracking-widest shadow-xl mb-4 animate-bounce">
                    {slide.badge}
                  </span>
                  
                  <p className="text-sm md:text-base font-bold text-amber-800 tracking-widest uppercase mb-2">
                    {slide.subtitle}
                  </p>
                  
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black text-[#5C2E0E] leading-[1.1] mb-4">
                    {slide.title}
                  </h1>
                  
                  <p className="max-w-xl text-gray-700 text-base md:text-lg lg:text-xl font-medium leading-relaxed mb-8">
                    {slide.description}
                  </p>
                  
                  <div className="flex flex-wrap justify-center lg:justify-start items-center gap-4">
                    <div className="flex items-center gap-2 px-4 py-2 bg-white/50 backdrop-blur-md rounded-lg border border-white/40 shadow-sm">
                      <svg className="w-5 h-5 text-[#FF6B35]" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="font-bold text-sm md:text-base text-gray-800">Exclusive Offer</span>
                    </div>
                  </div>
                </div>

                {/* Image - Order 1 on mobile, 2 on desktop */}
                <div className="order-1 lg:order-2 flex justify-center items-center relative">
                  <div className="absolute inset-0 bg-white/20 blur-3xl rounded-full scale-75" />
                  <div className="relative group h-48 w-48 sm:h-64 sm:w-64 md:h-80 md:w-80 lg:h-[450px] lg:w-[450px]">
                    <div className="absolute inset-0 bg-white rounded-full shadow-2xl transition-transform duration-500 group-hover:scale-105" />
                    <img 
                      src={slide.image} 
                      alt={slide.title}
                      className="absolute inset-2 w-[calc(100%-16px)] h-[calc(100%-16px)] object-cover rounded-full border-4 border-amber-100 shadow-inner animate-[float_6s_ease-in-out_infinite]"
                    />
                  </div>
                </div>

              </div>
            </div>
          </div>
        ))}

        {/* Navigation Arrows - Hidden on smallest screens for cleaner look */}
        <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 z-30 flex justify-between pointer-events-none">
          <button
            onClick={prevSlide}
            className="pointer-events-auto p-2 md:p-4 rounded-full bg-white/30 backdrop-blur-lg hover:bg-[#8B4513] hover:text-white text-[#8B4513] shadow-xl transition-all duration-300 group"
          >
            <svg className="w-6 h-6 transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={nextSlide}
            className="pointer-events-auto p-2 md:p-4 rounded-full bg-white/30 backdrop-blur-lg hover:bg-[#8B4513] hover:text-white text-[#8B4513] shadow-xl transition-all duration-300 group"
          >
            <svg className="w-6 h-6 transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Progress Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-4 items-center px-6 py-3 bg-black/5 backdrop-blur-md rounded-full">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`group relative h-2 transition-all duration-500 ${
              index === currentSlide ? 'w-12 bg-[#8B4513]' : 'w-3 bg-gray-400'
            } rounded-full`}
            aria-label={`Slide ${index + 1}`}
          >
            <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#8B4513] text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
              0{index + 1}
            </span>
          </button>
        ))}
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
      `}</style>
    </section>
  );
}

export default HeroSection;
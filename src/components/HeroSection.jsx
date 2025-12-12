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
      image: "https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg",
      bgColor: "from-amber-50 via-amber-100 to-orange-50"
    },
    {
      id: 2,
      title: "Free Delivery on Orders ₹500+",
      subtitle: "SAVE MORE TODAY",
      description: "Shop for ₹500 or more and enjoy free home delivery. Fresh bakery items delivered right to your doorstep!",
      badge: "EVERYDAY OFFER",
      image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&h=600&fit=crop",
      bgColor: "from-orange-50 via-pink-50 to-red-50"
    },
    {
      id: 3,
      title: "Special Discount - Save 20%",
      subtitle: "TODAY'S BEST DEAL",
      description: "Get flat 20% off on selected combo packs and festive special items. Use code: SAVE20. Hurry, limited stock!",
      badge: "HOT DEAL",
      image: "https://images.pexels.com/photos/3026807/pexels-photo-3026807.jpeg",
      bgColor: "from-yellow-50 via-amber-50 to-orange-50"
    }
  ];

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <section id="home" className="relative overflow-hidden h-[500px] md:h-[600px] isolate">
      {/* Carousel Container */}
      <div className="relative h-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            <div className={`h-full bg-gradient-to-r ${slide.bgColor}`}>
              <div className="max-w-7xl mx-auto px-4 h-full">
                <div className="grid md:grid-cols-2 gap-10 items-center h-full py-12">
                  {/* Text Content */}
                  <div className="space-y-6">
                    {/* Badge */}
                    <div className="inline-block">
                      <span className="px-4 py-2 bg-[#FF6B35] text-white text-xs font-bold rounded-full uppercase tracking-wider shadow-lg animate-pulse">
                        {slide.badge}
                      </span>
                    </div>
                    
                    <p className="text-sm font-semibold text-amber-700 tracking-wide uppercase">
                      {slide.subtitle}
                    </p>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#8B4513] leading-tight drop-shadow-sm">
                      {slide.title}
                    </h1>
                    <p className="text-gray-700 text-lg md:text-xl font-medium leading-relaxed">
                      {slide.description}
                    </p>
                    
                    {/* Promotional Elements */}
                    <div className="flex items-center gap-3 pt-4">
                      <div className="flex items-center gap-2 text-[#FF6B35]">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="font-bold text-lg">Exclusive Offer</span>
                      </div>
                      <div className="h-6 w-px bg-gray-300"></div>
                      <span className="text-gray-600 font-semibold">Limited Period Only</span>
                    </div>
                  </div>

                  {/* Image */}
                  <div className="relative flex justify-center items-center">
                    <div className="h-72 w-72 md:h-96 md:w-96 rounded-full overflow-hidden shadow-2xl border-8 border-white">
                      <img 
                        src={slide.image} 
                        alt={slide.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Previous Button */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white p-3 rounded-full shadow-lg transition-all"
          aria-label="Previous slide"
        >
          <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Next Button */}
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white p-3 rounded-full shadow-lg transition-all"
          aria-label="Next slide"
        >
          <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Dots Navigation */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-3 rounded-full transition-all ${
              index === currentSlide 
                ? 'w-8 bg-[#8B4513]' 
                : 'w-3 bg-gray-400 hover:bg-gray-600'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}

export default HeroSection;

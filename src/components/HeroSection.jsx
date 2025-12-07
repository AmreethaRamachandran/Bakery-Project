import { useState, useEffect } from 'react';

function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      title: "Taste and Quality Carried Over Generations",
      subtitle: "Traditional Indian Sweets & Snacks",
      description: "Crispy kaara sevu, authentic chikkis and delightful sweets delivered fresh from Sattur to your doorstep.",
      image: "https://images.unsplash.com/photo-1606312619070-d48b4ade4787?w=800&h=600&fit=crop",
      bgColor: "from-amber-50 via-amber-100 to-orange-50"
    },
    {
      id: 2,
      title: "Fresh Bakery Delights Every Day",
      subtitle: "Handcrafted with Love",
      description: "Explore our wide range of freshly baked goods, made with the finest ingredients and traditional recipes.",
      image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&h=600&fit=crop",
      bgColor: "from-orange-50 via-pink-50 to-red-50"
    },
    {
      id: 3,
      title: "Celebrate with Our Special Sweets",
      subtitle: "Perfect for Every Occasion",
      description: "Make your celebrations memorable with our authentic Indian sweets and savories.",
      image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=800&h=600&fit=crop",
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
    <section id="home" className="relative overflow-hidden">
      {/* Carousel Container */}
      <div className="relative h-[500px] md:h-[600px]">
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
                    <p className="text-sm font-semibold text-amber-700 tracking-wide uppercase">
                      {slide.subtitle}
                    </p>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight">
                      {slide.title}
                    </h1>
                    <p className="text-gray-600 text-base md:text-lg">
                      {slide.description}
                    </p>
                    <div className="flex flex-wrap gap-4 pt-4">
                      <button className="px-6 py-3 rounded-full bg-[#8B4513] text-white font-semibold hover:bg-[#6B3410] transition-colors">
                        Shop Now
                      </button>
                      <button className="px-6 py-3 rounded-full border-2 border-[#8B4513] text-[#8B4513] font-semibold hover:bg-[#8B4513] hover:text-white transition-colors">
                        View Menu
                      </button>
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
      </div>

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

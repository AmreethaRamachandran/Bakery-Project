import { useState } from 'react';

function SavoryTreasures({ onCategoryClick }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const products = [
    {
      id: 1,
      name: "Thenkuzhal Murukku",
      image: "/images/tkmurukku.webp",
      price: 120.00,
      rating: 5,
      reviews: 45
    },
    {
      id: 2,
      name: "Butter Murukku",
      image: "/images/butter murukku.jpg",
      price: 130.00,
      rating: 4.5,
      reviews: 38
    },
    {
      id: 3,
      name: "Kaara Murukku",
      image: "/images/kaara murukku.jpg",
      price: 125.00,
      rating: 4.5,
      reviews: 40
    },
    {
      id: 4,
      name: "Urundai Seedai",
      image: "/images/urundai seedai.webp",
      price: 150.00,
      rating: 5,
      reviews: 48
    },
    {
      id: 5,
      name: "Chinna Seedai",
      image: "/images/chinna seedai.webp",
      price: 140.00,
      rating: 4.5,
      reviews: 42
    },
    {
      id: 6,
      name: "Seepu Seedai",
      image: "/images/seepu seedai.webp",
      price: 145.00,
      rating: 4,
      reviews: 35
    },
    {
      id: 7,
      name: "Inippu Seedai",
      image: "/images/inippu seedai.webp",
      price: 155.00,
      rating: 4.5,
      reviews: 38
    },
    {
      id: 8,
      name: "Mixture",
      image: "/images/Bombay_mixture_grande.webp",
      price: 130.00,
      rating: 5,
      reviews: 60
    },
    {
      id: 9,
      name: "Ribbon Pakoda",
      image: "/images/Ribbon_Pakoda_1.webp",
      price: 130.00,
      rating: 5,
      reviews: 55
    },
    {
      id: 10,
      name: "Mini Kai Murukku",
      image: "/images/mini kai murukku.webp",
      price: 110.00,
      rating: 4.5,
      reviews: 33
    }
  ];

  const itemsToShow = 1; // Show one product at a time
  const maxSlide = products.length - 1;

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev >= maxSlide ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev <= 0 ? maxSlide : prev - 1));
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(
          <svg key={i} className="w-4 h-4 fill-current text-orange-500" viewBox="0 0 20 20">
            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
          </svg>
        );
      } else {
        stars.push(
          <svg key={i} className="w-4 h-4 fill-current text-gray-400" viewBox="0 0 20 20">
            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
          </svg>
        );
      }
    }
    return stars;
  };

  // Calculate visible products - show 4 products starting from current index
  const getVisibleProducts = () => {
    const visible = [];
    for (let i = 0; i < 4; i++) {
      const index = (currentSlide + i) % products.length;
      visible.push(products[index]);
    }
    return visible;
  };

  const visibleProducts = getVisibleProducts();

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-orange-50 to-white relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute right-10 top-20 opacity-20">
        <svg className="w-40 h-40" viewBox="0 0 200 200">
          <circle cx="100" cy="100" r="80" fill="none" stroke="#FF6B35" strokeWidth="2"/>
          <circle cx="100" cy="100" r="60" fill="none" stroke="#FF6B35" strokeWidth="2"/>
          <circle cx="100" cy="100" r="40" fill="none" stroke="#FF6B35" strokeWidth="2"/>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-[#FF6B35] mb-4" style={{ fontFamily: 'cursive' }}>
            Savory Treasures
          </h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            A Taste of India's Flavorful Snacks and Delicacies
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          <div className="flex gap-6 overflow-hidden">
            {/* Savouries Info Card */}
            <div className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/5 bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg overflow-hidden shadow-lg relative">
              <div className="absolute inset-0 opacity-10">
                <img 
                  src="https://images.unsplash.com/photo-1599490659213-e2b9527bd087?w=600&h=600&fit=crop"
                  alt="Background"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="relative z-10 p-8 h-full flex flex-col justify-center text-white">
                <h3 className="text-3xl font-bold mb-4">Savouries</h3>
                <p className="text-sm mb-6 leading-relaxed">
                  Savour the crunch, relive the tradition.
                </p>
                <button 
                  onClick={() => onCategoryClick && onCategoryClick('Savouries')}
                  className="px-6 py-2 border-2 border-white text-white font-semibold rounded-md hover:bg-white hover:text-gray-800 transition-all duration-300 self-start"
                >
                  View More
                </button>
              </div>
            </div>

            {/* Product Cards */}
            {visibleProducts.map((product) => (
              <div key={product.id} className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/5">
                <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 h-full">
                  {/* Product Image */}
                  <div className="relative h-64 overflow-hidden group">
                    <img 
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      style={product.name === "Mixture" ? { objectPosition: 'center 60%' } : {}}
                    />
                  </div>

                  {/* Product Info */}
                  <div className="p-5">
                    <h3 className="text-lg font-bold mb-2 text-gray-900">{product.name}</h3>
                    
                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex gap-0.5">
                        {renderStars(product.rating)}
                      </div>
                      <span className="text-sm text-gray-600">
                        {product.reviews} review{product.reviews !== 1 ? 's' : ''}
                      </span>
                    </div>

                    {/* Price */}
                    <p className="text-xl font-bold text-gray-900 mb-4">
                      Rs. {product.price.toFixed(2)}
                    </p>

                    {/* Add to Cart Button */}
                    <button className="w-full bg-[#8B4513] text-white py-3 rounded-md font-semibold hover:bg-[#6B3410] transition-colors shadow-md">
                      Add To Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white p-3 rounded-full shadow-lg hover:bg-gray-100 transition-all z-20"
            aria-label="Previous"
          >
            <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white p-3 rounded-full shadow-lg hover:bg-gray-100 transition-all z-20"
            aria-label="Next"
          >
            <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
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
    </section>
  );
}

export default SavoryTreasures;

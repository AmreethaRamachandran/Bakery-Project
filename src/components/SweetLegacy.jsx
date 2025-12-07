import { useState } from 'react';

function SweetLegacy() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const products = [
    {
      id: 1,
      name: "Karupatti Mittai",
      image: "https://images.unsplash.com/photo-1582716401301-b2407dc7563d?w=600&h=600&fit=crop",
      price: 150.00,
      rating: 4,
      reviews: 66
    },
    {
      id: 2,
      name: "Adhirasam",
      image: "https://images.unsplash.com/photo-1586444248902-2f64eddc13df?w=600&h=600&fit=crop",
      price: 130.00,
      rating: 4,
      reviews: 29
    },
    {
      id: 3,
      name: "Badhusha",
      image: "https://images.unsplash.com/photo-1626074353765-517a681e40be?w=600&h=600&fit=crop",
      price: 130.00,
      rating: 4,
      reviews: 28
    },
    {
      id: 4,
      name: "Vellam Mittai",
      image: "https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=600&h=600&fit=crop",
      price: 130.00,
      rating: 4,
      reviews: 28
    },
    {
      id: 5,
      name: "Wheat Halwa",
      image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=600&h=600&fit=crop",
      price: 130.00,
      rating: 4,
      reviews: 25
    }
  ];

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

  // Calculate visible products - show 5 products starting from current index
  const getVisibleProducts = () => {
    const visible = [];
    for (let i = 0; i < 5; i++) {
      const index = (currentSlide + i) % products.length;
      visible.push(products[index]);
    }
    return visible;
  };

  const visibleProducts = getVisibleProducts();

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-gray-100 to-white relative overflow-hidden">
      {/* Snowflakes */}
      <div className="absolute left-20 top-10 text-2xl text-blue-400 animate-pulse">❄️</div>
      <div className="absolute right-1/4 top-32 text-xl text-blue-400 animate-pulse">❄️</div>
      <div className="absolute left-1/3 bottom-40 text-lg text-blue-400 animate-pulse">❄️</div>
      <div className="absolute right-20 top-1/4 text-xl text-blue-400 animate-pulse">❄️</div>
      <div className="absolute left-10 bottom-32 text-lg text-blue-400 animate-pulse">❄️</div>

      {/* Santa and decorations */}
      <div className="absolute right-16 top-32 text-5xl animate-bounce">🎅</div>

      {/* Feel the song button */}
      <div className="absolute top-8 right-8">
        <button className="bg-white text-gray-800 px-4 py-2 rounded-lg text-sm hover:bg-gray-100 transition-colors shadow-md border border-gray-300">
          Feel the song
        </button>
      </div>

      {/* Mute icon */}
      <div className="absolute top-8 right-44">
        <button className="bg-white text-gray-800 p-2 rounded-full shadow-md border border-gray-300 hover:bg-gray-100 transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
          </svg>
        </button>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-[#FF6B35] mb-4" style={{ fontFamily: 'cursive' }}>
            Sweet Legacy
          </h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Relish the richness in every bite.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          <div className="flex gap-6 overflow-hidden">
            {/* Sweets Info Card */}
            <div className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/6 bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg overflow-hidden shadow-lg relative">
              <div className="absolute inset-0 opacity-10">
                <img 
                  src="https://images.unsplash.com/photo-1610564558002-e245a7661b0d?w=600&h=600&fit=crop"
                  alt="Background"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="relative z-10 p-8 h-full flex flex-col justify-center text-white">
                <h3 className="text-3xl font-bold mb-4">Sweets</h3>
                <p className="text-sm mb-6 leading-relaxed">
                  Melt-in-the-mouth magic, made with love and legacy.
                </p>
                <button className="px-6 py-2 border-2 border-white text-white font-semibold rounded-md hover:bg-white hover:text-gray-800 transition-all duration-300 self-start">
                  View More
                </button>
              </div>
              {/* Decorative snowflakes on card */}
              <div className="absolute top-4 left-4 text-lg text-white animate-pulse">❄️</div>
              <div className="absolute bottom-6 right-4 text-sm text-white animate-pulse">❄️</div>
            </div>

            {/* Product Cards */}
            {visibleProducts.map((product) => (
              <div key={product.id} className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/6">
                <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 h-full">
                  {/* Product Image */}
                  <div className="relative h-64 overflow-hidden group">
                    <img 
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    
                    {/* Decorative elements on some cards */}
                    {product.id === 2 && (
                      <>
                        <div className="absolute top-3 left-3 text-2xl">🌿</div>
                        <div className="absolute bottom-3 right-3 text-xl">🌿</div>
                      </>
                    )}
                    
                    {product.id === 3 && (
                      <>
                        <div className="absolute top-3 right-3 text-2xl">🌿</div>
                        <div className="absolute bottom-3 left-3 text-xl">🥜</div>
                      </>
                    )}
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

export default SweetLegacy;

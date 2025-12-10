function BestSellers() {
  const products = [
    {
      id: 1,
      name: "Thenkuzhal Murukku",
      image: "/src/images/then kulal murukku.jpeg",
      price: 120.00,
      rating: 5,
      reviews: 45,
      hasChristmasDecor: false
    },
    {
      id: 2,
      name: "Kaara Murukku",
      image: "/src/images/kaara murukku.jpg",
      price: 125.00,
      rating: 4,
      reviews: 40,
      hasChristmasDecor: false
    },
    {
      id: 3,
      name: "Periya Athirasam",
      image: "/src/images/periya athirasam.webp",
      price: 150.00,
      rating: 5,
      reviews: 55,
      hasChristmasDecor: false
    },
    {
      id: 4,
      name: "Ribbon Pakoda",
      image: "/src/images/ribbon pakkoda for best sellers image.webp",
      price: 130.00,
      rating: 5,
      reviews: 48,
      hasChristmasDecor: false
    }
  ];

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

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-[#3E2723] to-[#4E342E] text-white relative overflow-hidden">
      {/* Decorative Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" viewBox="0 0 1200 800">
          <pattern id="paisley" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
            <path d="M50,10 Q70,30 60,50 Q50,70 30,60 Q10,50 20,30 Q30,10 50,10" fill="currentColor"/>
          </pattern>
          <rect width="100%" height="100%" fill="url(#paisley)"/>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-[#FF6B35] mb-4">Best Sellers</h2>
          <p className="text-lg text-gray-300 max-w-4xl">
            From crunchy to Traditional Indian Sweets and Snacks, every bite tells a story – explore our legendary flavours today.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 w-full max-w-sm">
              {/* Product Image */}
              <div className="relative h-64 overflow-hidden group">
                <img 
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                
                {/* Christmas Decoration Overlay */}
                {product.hasChristmasDecor && (
                  <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-2 left-2 text-3xl">🎄</div>
                    <div className="absolute top-4 right-4 text-2xl">🎄</div>
                    <div className="absolute bottom-2 left-4 text-xl">🕯️</div>
                    <div className="absolute bottom-4 right-2 text-xl">🕯️</div>
                  </div>
                )}

                {/* Wishlist and Quick View Icons */}
                <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button className="bg-white p-2 rounded-full shadow-lg hover:bg-red-50 transition-colors">
                    <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </button>
                  <button className="bg-white p-2 rounded-full shadow-lg hover:bg-gray-100 transition-colors">
                    <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </button>
                </div>
              </div>              {/* Product Info */}
              <div className="p-5 text-gray-800">
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
          ))}
        </div>

        {/* View More Button or Message */}
        <div className="flex justify-center mt-12">
          {products.length > 4 ? (
            <button className="px-8 py-3 border-2 border-white text-white font-semibold rounded-md hover:bg-white hover:text-gray-800 transition-all duration-300">
              View More
            </button>
          ) : (
            <p className="text-white text-lg font-medium opacity-80">
              All best sellers are displayed above
            </p>
          )}
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

export default BestSellers;

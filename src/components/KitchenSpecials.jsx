import { useState } from 'react';

function KitchenSpecials({ onBack }) {
  const kitchenSpecials = [
    {
      id: 1,
      name: 'Manakolam',
      category: 'Kitchen Specials',
      image: 'https://images.unsplash.com/photo-1608797178974-15b35a64ede9?w=600',
      rating: 5,
      reviews: 65,
      price: 140.00
    },
    {
      id: 2,
      name: 'Thattai',
      category: 'Kitchen Specials',
      image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600',
      rating: 4.5,
      reviews: 58,
      price: 135.00
    },
    {
      id: 3,
      name: 'Ribbon Pakkoda',
      category: 'Kitchen Specials',
      image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=600',
      rating: 5,
      reviews: 72,
      price: 145.00
    }
  ];

  const renderStars = (rating) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            className={`w-4 h-4 ${
              star <= rating ? 'text-[#FF6B35] fill-current' : 'text-gray-300 fill-current'
            }`}
            viewBox="0 0 20 20"
          >
            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
          </svg>
        ))}
      </div>
    );
  };

  return (
    <section className="bg-gradient-to-b from-[#FFF8F0] via-[#FFE8D6] to-[#FFF5EB] min-h-screen">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 pt-8">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-[#8B4513] hover:text-[#FF6B35] transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="text-lg font-semibold">Back</span>
          </button>
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#6B3410] font-serif italic drop-shadow-md">
            Kitchen Specials
          </h1>
          <div className="w-20"></div> {/* Spacer for centering */}
        </div>
      </div>

      {/* Category Banner Image - Full Width */}
      <div className="relative h-64 md:h-80 mb-12 overflow-hidden">
        <img
          src="/src/images/kitchen specialls.png"
          alt="Kitchen Specials"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/30 to-transparent"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <h2 className="text-5xl md:text-6xl font-bold mb-4 drop-shadow-2xl">Kitchen Specials</h2>
          <p className="text-xl md:text-2xl drop-shadow-lg">Handpicked favorites from our kitchen</p>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {kitchenSpecials.map((product) => (
            <div
              key={product.id}
              className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-[#D4A574]/20"
            >
              <div className="relative overflow-hidden h-56">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3 bg-[#FF6B35] text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                  Kitchen Special
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-lg font-bold text-[#6B3410] mb-2 group-hover:text-[#FF6B35] transition-colors">
                  {product.name}
                </h3>
                <div className="flex items-center gap-2 mb-3">
                  {renderStars(product.rating)}
                  <span className="text-sm text-gray-600">({product.reviews})</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-[#8B4513]">₹{product.price.toFixed(2)}</span>
                  <button className="bg-[#FF6B35] text-white px-4 py-2 rounded-lg hover:bg-[#8B4513] transition-colors shadow-md">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Info Section */}
        <div className="mt-16 bg-white/80 backdrop-blur-sm rounded-2xl p-8 max-w-3xl mx-auto border border-[#D4A574]/30 shadow-lg">
          <h3 className="text-2xl font-bold text-[#8B4513] mb-4 text-center">Our Kitchen Specials</h3>
          <p className="text-gray-700 text-center leading-relaxed">
            These are our chef's handpicked favorites, crafted with extra care and premium ingredients. 
            Each item represents the best of traditional cooking techniques passed down through generations.
          </p>
        </div>
      </div>
    </section>
  );
}

export default KitchenSpecials;

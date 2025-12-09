import { useState } from 'react';

function ComboPage({ onBack }) {
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = [
    { name: 'Combo', count: 2, bgColor: 'bg-gradient-to-br from-purple-100 to-purple-200' }
  ];

  const comboProducts = [
    {
      id: 1,
      name: 'Native Snack Combo',
      category: 'Combo',
      image: 'https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=600',
      rating: 5,
      reviews: 60,
      price: 500.00
    },
    {
      id: 2,
      name: 'Chikki Treats',
      category: 'Combo',
      image: 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=600',
      rating: 4,
      reviews: 19,
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

  const filteredProducts = activeCategory === 'All' 
    ? comboProducts 
    : comboProducts.filter(p => p.category === activeCategory);

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
            Combo Delights
          </h1>
          <div className="w-20"></div> {/* Spacer for centering */}
        </div>

      </div>

      {/* Category Banner Image - Full Width */}
      <div className="relative h-64 md:h-80 mb-12 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=1200"
          alt="Combo Banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#8B4513]/80 via-[#6B3410]/40 to-transparent"></div>
        <div className="absolute bottom-8 left-8 text-white">
          <h2 className="text-5xl font-bold mb-2 drop-shadow-lg">Combo Treasures</h2>
          <p className="text-xl opacity-90">Handcrafted combinations for every celebration</p>
        </div>
      </div>

      {/* Content Container */}
      <div className="max-w-7xl mx-auto px-4">
        {/* Category Tabs */}
        <div className="mb-12">
          <div className="bg-gradient-to-r from-[#FFF8F0] to-[#FFE8D6] rounded-2xl shadow-xl border border-[#D4A574]/20 p-2 inline-flex flex-wrap gap-2">
            <button
              onClick={() => setActiveCategory('All')}
              className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                activeCategory === 'All'
                  ? 'bg-gradient-to-br from-[#8B4513] to-[#6B3410] text-white shadow-lg'
                  : 'text-[#6B3410] hover:bg-[#FFE8D6]'
              }`}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat.name}
                onClick={() => setActiveCategory(cat.name)}
                className={`px-6 py-3 rounded-xl font-semibold transition-all flex items-center gap-2 ${
                  activeCategory === cat.name
                    ? 'bg-gradient-to-br from-[#8B4513] to-[#6B3410] text-white shadow-lg'
                    : 'text-[#6B3410] hover:bg-[#FFE8D6]'
                }`}
              >
                <span>{cat.name}</span>
                <span className={`text-sm px-2 py-0.5 rounded-full ${
                  activeCategory === cat.name ? 'bg-white/20' : 'bg-[#FFD4A3]'
                }`}>
                  ({cat.count})
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-16">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-gradient-to-br from-[#FFFAF5] to-[#FFF0E1] rounded-2xl shadow-lg overflow-hidden group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-[#D4A574]/20"
            >
              {/* Product Image */}
              <div className="relative h-64 overflow-hidden bg-gradient-to-br from-[#FFE8D6] to-[#FFD4A3]">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4">
                  <button className="bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors shadow-lg">
                    <svg className="w-5 h-5 text-[#FF6B35]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-[#8B4513] mb-2 group-hover:text-[#FF6B35] transition-colors">
                  {product.name}
                </h3>
                
                <div className="flex items-center gap-2 mb-3">
                  {renderStars(product.rating)}
                  <span className="text-sm text-gray-600">({product.reviews})</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold text-[#FF6B35]">
                    ₹{product.price.toFixed(2)}
                  </div>
                  <button className="bg-[#8B4513] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#6B3410] transition-colors shadow-md hover:shadow-lg">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📦</div>
            <h3 className="text-2xl font-bold text-[#8B4513] mb-2">No products found</h3>
            <p className="text-gray-600">Try selecting a different category</p>
          </div>
        )}

        {/* Other Categories Section */}
        <div className="mt-20 mb-16 bg-gradient-to-br from-[#FFF8F0] to-[#FFE8D6] rounded-3xl p-8 shadow-inner border border-[#D4A574]/30">
          <div className="text-center mb-12">
            <p className="text-sm text-[#8B4513] mb-2 tracking-widest uppercase font-semibold">Explore More</p>
            <h2 className="text-4xl md:text-5xl font-bold text-[#6B3410] font-serif italic drop-shadow-md">
              Discover Our Collection
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Savouries Card */}
            <div className="group cursor-pointer relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 h-64">
              <img
                src="https://images.unsplash.com/photo-1599909533730-f9ff6c7b8b7e?w=600"
                alt="Savouries"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <h3 className="text-white text-3xl font-bold drop-shadow-lg transition-transform duration-300 group-hover:-translate-y-3">Savouries</h3>
                <p className="text-white text-sm mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">17 Items</p>
              </div>
            </div>

            {/* Sweets Card */}
            <div className="group cursor-pointer relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 h-64">
              <img
                src="https://images.unsplash.com/photo-1607920591413-4ec007e70023?w=600"
                alt="Sweets"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <h3 className="text-white text-3xl font-bold drop-shadow-lg transition-transform duration-300 group-hover:-translate-y-3">Sweets</h3>
                <p className="text-white text-sm mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">5 Items</p>
              </div>
            </div>

            {/* Kitchen Specials Card */}
            <div className="group cursor-pointer relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 h-64">
              <img
                src="https://images.unsplash.com/photo-1608797178974-15b35a64ede9?w=600"
                alt="Kitchen Specials"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <h3 className="text-white text-3xl font-bold drop-shadow-lg transition-transform duration-300 group-hover:-translate-y-3">Kitchen Specials</h3>
                <p className="text-white text-sm mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">3 Items</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ComboPage;

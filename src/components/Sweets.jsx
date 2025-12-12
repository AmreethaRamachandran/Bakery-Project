import { useState } from 'react';

function Sweets({ onBack, onProductClick, initialCategory = 'All' }) {
  const [activeCategory, setActiveCategory] = useState(initialCategory);

  const categories = [
    { name: 'Athirasam', count: 2, bgColor: 'bg-gradient-to-br from-pink-100 to-pink-200' },
    { name: 'Laddu', count: 1, bgColor: 'bg-gradient-to-br from-rose-100 to-rose-200' },
    { name: 'Urundai', count: 2, bgColor: 'bg-gradient-to-br from-red-100 to-red-200' }
  ];

  const sweets = [
    // Athirasam Items
    {
      id: 1,
      name: 'Athirasam',
      category: 'Athirasam',
      image: '/images/adhirasam.jpg',
      rating: 5,
      reviews: 55,
      price: 180.00
    },
    {
      id: 2,
      name: 'Periya Athirasam',
      category: 'Athirasam',
      image: '/images/periya athirasam.webp',
      rating: 4.5,
      reviews: 48,
      price: 200.00
    },
    // Laddu Items
    {
      id: 3,
      name: 'Rava Laddu',
      category: 'Laddu',
      image: '/images/rava laddu.jpg',
      rating: 5,
      reviews: 70,
      price: 160.00
    },
    // Urundai Items
    {
      id: 4,
      name: 'Ulundhamavurundai',
      category: 'Urundai',
      image: '/images/ulundhamaavurundaii.jpg',
      rating: 4.5,
      reviews: 42,
      price: 170.00
    },
    {
      id: 5,
      name: 'Mavurundai',
      category: 'Urundai',
      image: '/images/Maavurundai-5pcs-₹70.jpg',
      rating: 4,
      reviews: 38,
      price: 165.00
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
    ? sweets 
    : sweets.filter(p => p.category === activeCategory);

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
            Sweets Collection
          </h1>
          <div className="w-20"></div> {/* Spacer for centering */}
        </div>
      </div>

      {/* Category Banner Image - Full Width */}
      <div className="relative h-64 md:h-80 mb-12 overflow-hidden">
        <img
          src="/images/sweets banner.png"
          alt="Sweets"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/30 to-transparent"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <h2 className="text-5xl md:text-6xl font-bold mb-4 drop-shadow-2xl">Sweet Delights</h2>
          <p className="text-xl md:text-2xl drop-shadow-lg">Traditional flavors, timeless joy</p>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="max-w-7xl mx-auto px-4 mb-12">
        <div className="flex flex-wrap gap-4 justify-center bg-white/80 backdrop-blur-sm p-4 rounded-2xl shadow-lg border border-[#D4A574]/30">
          <button
            onClick={() => setActiveCategory('All')}
            className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 ${
              activeCategory === 'All'
                ? 'bg-[#8B4513] text-white shadow-lg scale-105'
                : 'bg-white text-[#8B4513] hover:bg-[#FFF8F0] hover:scale-105'
            }`}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat.name}
              onClick={() => setActiveCategory(cat.name)}
              className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 ${
                activeCategory === cat.name
                  ? 'bg-[#8B4513] text-white shadow-lg scale-105'
                  : 'bg-white text-[#8B4513] hover:bg-[#FFF8F0] hover:scale-105'
              }`}
            >
              {cat.name}
              <span className={`px-2 py-0.5 rounded-full text-xs ${
                activeCategory === cat.name
                  ? 'bg-white/20 text-white'
                  : 'bg-[#FFE8D6] text-[#8B4513]'
              }`}>
                {cat.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 pb-16">
        {filteredProducts.length > 0 ? (
          activeCategory === 'All' ? (
            // Show all products grouped by category
            <div className="space-y-16">
              {/* Athirasam Section */}
              <div>
                <div className="flex items-center gap-4 mb-8">
                  <div className="flex-grow h-px bg-gradient-to-r from-transparent via-[#8B4513]/30 to-transparent"></div>
                  <h2 className="text-3xl font-bold text-[#8B4513] uppercase tracking-wide">Athirasam</h2>
                  <div className="flex-grow h-px bg-gradient-to-r from-transparent via-[#8B4513]/30 to-transparent"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {sweets.filter(p => p.category === 'Athirasam').map((product) => (
                    <div
                      key={product.id}
                      className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-[#D4A574]/20 cursor-pointer"
                      onClick={() => onProductClick(product)}
                    >
                      <div className="relative overflow-hidden h-56">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute top-3 right-3 bg-[#FF6B35] text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                          {product.category}
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
                          <button 
                            className="bg-[#FF6B35] text-white px-4 py-2 rounded-lg hover:bg-[#8B4513] transition-colors shadow-md"
                            onClick={(e) => {
                              e.stopPropagation();
                              onProductClick(product);
                            }}
                          >
                            View Details
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Laddu Section */}
              <div>
                <div className="flex items-center gap-4 mb-8">
                  <div className="flex-grow h-px bg-gradient-to-r from-transparent via-[#8B4513]/30 to-transparent"></div>
                  <h2 className="text-3xl font-bold text-[#8B4513] uppercase tracking-wide">Laddu</h2>
                  <div className="flex-grow h-px bg-gradient-to-r from-transparent via-[#8B4513]/30 to-transparent"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {sweets.filter(p => p.category === 'Laddu').map((product) => (
                    <div
                      key={product.id}
                      className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-[#D4A574]/20 cursor-pointer"
                      onClick={() => onProductClick(product)}
                    >
                      <div className="relative overflow-hidden h-56">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute top-3 right-3 bg-[#FF6B35] text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                          {product.category}
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
                          <button 
                            className="bg-[#FF6B35] text-white px-4 py-2 rounded-lg hover:bg-[#8B4513] transition-colors shadow-md"
                            onClick={(e) => {
                              e.stopPropagation();
                              onProductClick(product);
                            }}
                          >
                            View Details
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Urundai Section */}
              <div>
                <div className="flex items-center gap-4 mb-8">
                  <div className="flex-grow h-px bg-gradient-to-r from-transparent via-[#8B4513]/30 to-transparent"></div>
                  <h2 className="text-3xl font-bold text-[#8B4513] uppercase tracking-wide">Urundai</h2>
                  <div className="flex-grow h-px bg-gradient-to-r from-transparent via-[#8B4513]/30 to-transparent"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {sweets.filter(p => p.category === 'Urundai').map((product) => (
                    <div
                      key={product.id}
                      className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-[#D4A574]/20 cursor-pointer"
                      onClick={() => onProductClick(product)}
                    >
                      <div className="relative overflow-hidden h-56">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute top-3 right-3 bg-[#FF6B35] text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                          {product.category}
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
                          <button 
                            className="bg-[#FF6B35] text-white px-4 py-2 rounded-lg hover:bg-[#8B4513] transition-colors shadow-md"
                            onClick={(e) => {
                              e.stopPropagation();
                              onProductClick(product);
                            }}
                          >
                            View Details
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            // Show filtered products by selected category
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-[#D4A574]/20 cursor-pointer"
                  onClick={()=>onProductClick(product)}
                >
                  <div className="relative overflow-hidden h-56">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-3 right-3 bg-[#FF6B35] text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                      {product.category}
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
                      <button 
                        onClick={(e)=>{e.stopPropagation();onProductClick(product);}}
                        className="bg-[#FF6B35] text-white px-4 py-2 rounded-lg hover:bg-[#8B4513] transition-colors shadow-md"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )
        ) : (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">📦</div>
            <h3 className="text-2xl font-bold text-[#8B4513] mb-2">No products found</h3>
            <p className="text-gray-600">Try selecting a different category</p>
          </div>
        )}
      </div>
    </section>
  );
}

export default Sweets;

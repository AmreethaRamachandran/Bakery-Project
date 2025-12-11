import { useState } from 'react';
import { FaStar, FaHeart, FaRegHeart, FaShoppingCart, FaTruck, FaShieldAlt, FaLeaf } from 'react-icons/fa';
import { useCart } from '../context/CartContext';

function ProductDetails({ product, onBack }) {
  const [selectedWeight, setSelectedWeight] = useState('250gms');
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeTab, setActiveTab] = useState('description');
  const { addToCart } = useCart();

  if (!product) return null;

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(
          <FaStar key={i} className="text-[#FF6B35]" />
        );
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(
          <div key={i} className="relative">
            <FaStar className="text-gray-300" />
            <div className="absolute top-0 left-0 overflow-hidden w-1/2">
              <FaStar className="text-[#FF6B35]" />
            </div>
          </div>
        );
      } else {
        stars.push(
          <FaStar key={i} className="text-gray-300" />
        );
      }
    }
    return stars;
  };

  const getPrice = () => {
    return selectedWeight === '80gms' ? (product.price * 0.32).toFixed(2) : product.price.toFixed(2);
  };

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedWeight);
    // Optional: Show a success message or animation
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedWeight);
    // Navigate to cart page (will be handled by parent component)
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-[#FFF8F0] via-white to-[#FFF5EB]">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-[#8B4513] hover:text-[#FF6B35] transition-colors mb-6"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="font-semibold">Back to Products</span>
        </button>

        {/* Product Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Left Side - Image */}
          <div className="space-y-4">
            <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden group">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-[500px] object-cover transform group-hover:scale-105 transition-transform duration-500"
              />
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className="absolute top-6 right-6 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
              >
                {isFavorite ? (
                  <FaHeart className="text-red-500 text-xl" />
                ) : (
                  <FaRegHeart className="text-gray-400 text-xl" />
                )}
              </button>
              
              {/* Badge */}
              <div className="absolute top-6 left-6">
                <span className="bg-gradient-to-r from-[#FF6B35] to-[#FF8C42] text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                  Bestseller
                </span>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white rounded-xl p-4 text-center shadow-md">
                <FaLeaf className="text-green-500 text-2xl mx-auto mb-2" />
                <p className="text-xs text-gray-600 font-semibold">100% Natural</p>
              </div>
              <div className="bg-white rounded-xl p-4 text-center shadow-md">
                <FaShieldAlt className="text-blue-500 text-2xl mx-auto mb-2" />
                <p className="text-xs text-gray-600 font-semibold">Quality Assured</p>
              </div>
              <div className="bg-white rounded-xl p-4 text-center shadow-md">
                <FaTruck className="text-orange-500 text-2xl mx-auto mb-2" />
                <p className="text-xs text-gray-600 font-semibold">Fast Delivery</p>
              </div>
            </div>
          </div>

          {/* Right Side - Details */}
          <div className="space-y-6">
            {/* Product Name */}
            <div>
              <h1 className="text-4xl font-bold text-[#8B4513] mb-2">{product.name}</h1>
              <p className="text-gray-500 text-sm font-medium">{product.category}</p>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-3">
              <div className="flex gap-1">
                {renderStars(product.rating)}
              </div>
              <span className="text-[#8B4513] font-semibold">{product.rating}</span>
              <span className="text-gray-500">({product.reviews} reviews)</span>
            </div>

            {/* Price */}
            <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl p-6 border-2 border-orange-200">
              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-bold text-[#FF6B35]">₹{getPrice()}</span>
                <span className="text-gray-500 text-lg">per pack</span>
              </div>
              <p className="text-sm text-gray-600 mt-2">Inclusive of all taxes</p>
            </div>

            {/* Weight Selection */}
            <div>
              <label className="block text-[#8B4513] font-semibold mb-3">
                Weight: <span className="text-[#FF6B35]">{selectedWeight}</span>
              </label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setSelectedWeight('250gms')}
                  className={`py-4 px-6 rounded-xl font-semibold transition-all border-2 ${
                    selectedWeight === '250gms'
                      ? 'bg-[#FF6B35] text-white border-[#FF6B35] shadow-lg scale-105'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-[#FF6B35]'
                  }`}
                >
                  250gms
                </button>
                <button
                  onClick={() => setSelectedWeight('80gms')}
                  className={`py-4 px-6 rounded-xl font-semibold transition-all border-2 ${
                    selectedWeight === '80gms'
                      ? 'bg-[#FF6B35] text-white border-[#FF6B35] shadow-lg scale-105'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-[#FF6B35]'
                  }`}
                >
                  80gms
                </button>
              </div>
            </div>

            {/* Delivery Options */}
            <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
              <div className="flex items-center gap-2 mb-2">
                <FaTruck className="text-blue-600" />
                <span className="font-semibold text-[#8B4513]">Delivery Options</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter your zip code"
                  className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FF6B35]"
                />
                <button className="px-6 py-2 bg-[#FF6B35] text-white rounded-lg font-semibold hover:bg-[#FF8C42] transition-colors">
                  CHECK
                </button>
              </div>
            </div>

            {/* Quantity Selector */}
            <div>
              <label className="block text-[#8B4513] font-semibold mb-3">Quantity</label>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-12 h-12 bg-white border-2 border-gray-300 rounded-lg flex items-center justify-center hover:border-[#FF6B35] transition-colors text-xl font-bold text-gray-700"
                >
                  −
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-20 h-12 text-center text-xl font-bold border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B35]"
                />
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-12 h-12 bg-white border-2 border-gray-300 rounded-lg flex items-center justify-center hover:border-[#FF6B35] transition-colors text-xl font-bold text-gray-700"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              <button
                onClick={handleAddToCart}
                className="py-4 px-6 bg-gradient-to-r from-[#8B4513] to-[#6B3410] text-white rounded-xl font-bold hover:shadow-xl transform hover:-translate-y-1 transition-all flex items-center justify-center gap-2"
              >
                <FaShoppingCart />
                Add To Cart
              </button>
              <button
                onClick={handleBuyNow}
                className="py-4 px-6 bg-gradient-to-r from-black to-gray-800 text-white rounded-xl font-bold hover:shadow-xl transform hover:-translate-y-1 transition-all"
              >
                Buy It Now
              </button>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="bg-white rounded-3xl shadow-xl p-8">
          {/* Tab Headers */}
          <div className="flex gap-6 border-b border-gray-200 mb-6">
            <button
              onClick={() => setActiveTab('description')}
              className={`pb-4 px-2 font-semibold transition-colors relative ${
                activeTab === 'description' ? 'text-[#FF6B35]' : 'text-gray-500 hover:text-[#8B4513]'
              }`}
            >
              Description
              {activeTab === 'description' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FF6B35]"></div>
              )}
            </button>
            <button
              onClick={() => setActiveTab('ingredients')}
              className={`pb-4 px-2 font-semibold transition-colors relative ${
                activeTab === 'ingredients' ? 'text-[#FF6B35]' : 'text-gray-500 hover:text-[#8B4513]'
              }`}
            >
              Ingredients
              {activeTab === 'ingredients' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FF6B35]"></div>
              )}
            </button>
            <button
              onClick={() => setActiveTab('nutrition')}
              className={`pb-4 px-2 font-semibold transition-colors relative ${
                activeTab === 'nutrition' ? 'text-[#FF6B35]' : 'text-gray-500 hover:text-[#8B4513]'
              }`}
            >
              Nutrition
              {activeTab === 'nutrition' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FF6B35]"></div>
              )}
            </button>
          </div>

          {/* Tab Content */}
          <div className="text-gray-700 leading-relaxed">
            {activeTab === 'description' && (
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-[#8B4513] mb-4">About {product.name}</h3>
                <p className="text-gray-600 leading-relaxed">
                  {product.name} is a star item on our menu. It is a hot-selling item that earned us 
                  immense reputation among our customers. Made with traditional recipes passed down 
                  through generations, this authentic snack represents the true taste of South Indian 
                  culinary heritage.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Each piece is handcrafted with premium quality ingredients, ensuring the perfect 
                  blend of taste, texture, and aroma. Our {product.name} is prepared fresh daily using 
                  time-honored techniques that preserve its authentic flavor and crunchiness.
                </p>
                <div className="bg-orange-50 rounded-xl p-6 mt-6">
                  <h4 className="font-bold text-[#8B4513] mb-3">Why Choose Our {product.name}?</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-[#FF6B35] mt-1">✓</span>
                      <span>Made with 100% natural ingredients</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#FF6B35] mt-1">✓</span>
                      <span>No artificial preservatives or colors</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#FF6B35] mt-1">✓</span>
                      <span>Traditional preparation methods</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#FF6B35] mt-1">✓</span>
                      <span>Freshly prepared in small batches</span>
                    </li>
                  </ul>
                </div>
              </div>
            )}
            
            {activeTab === 'ingredients' && (
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-[#8B4513] mb-4">Ingredients</h3>
                <p className="text-gray-600 mb-4">
                  Our {product.name} is made with carefully selected, high-quality ingredients:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
                    <span className="font-semibold text-[#8B4513]">• Rice Flour</span>
                  </div>
                  <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
                    <span className="font-semibold text-[#8B4513]">• Urad Dal</span>
                  </div>
                  <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
                    <span className="font-semibold text-[#8B4513]">• Butter</span>
                  </div>
                  <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
                    <span className="font-semibold text-[#8B4513]">• Sesame Seeds</span>
                  </div>
                  <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
                    <span className="font-semibold text-[#8B4513]">• Cumin Seeds</span>
                  </div>
                  <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
                    <span className="font-semibold text-[#8B4513]">• Salt</span>
                  </div>
                  <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
                    <span className="font-semibold text-[#8B4513]">• Asafoetida</span>
                  </div>
                  <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
                    <span className="font-semibold text-[#8B4513]">• Edible Oil</span>
                  </div>
                </div>
                <div className="bg-green-50 rounded-xl p-4 mt-6 border border-green-200">
                  <p className="text-sm text-green-800">
                    <strong>Note:</strong> Contains no artificial colors, flavors, or preservatives. 
                    May contain traces of nuts.
                  </p>
                </div>
              </div>
            )}
            
            {activeTab === 'nutrition' && (
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-[#8B4513] mb-4">Nutritional Information</h3>
                <p className="text-gray-600 mb-4">Per 100g serving:</p>
                <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-6 border border-orange-200">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-3 border-b border-orange-200">
                      <span className="font-semibold text-[#8B4513]">Energy</span>
                      <span className="text-gray-700 font-medium">520 kcal</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-orange-200">
                      <span className="font-semibold text-[#8B4513]">Protein</span>
                      <span className="text-gray-700 font-medium">8.5g</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-orange-200">
                      <span className="font-semibold text-[#8B4513]">Carbohydrates</span>
                      <span className="text-gray-700 font-medium">52g</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-orange-200">
                      <span className="font-semibold text-[#8B4513]">Fat</span>
                      <span className="text-gray-700 font-medium">28g</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-orange-200">
                      <span className="font-semibold text-[#8B4513]">Fiber</span>
                      <span className="text-gray-700 font-medium">3.2g</span>
                    </div>
                    <div className="flex justify-between items-center py-3">
                      <span className="font-semibold text-[#8B4513]">Sodium</span>
                      <span className="text-gray-700 font-medium">580mg</span>
                    </div>
                  </div>
                </div>
                <div className="bg-blue-50 rounded-xl p-4 mt-6 border border-blue-200">
                  <p className="text-sm text-blue-800">
                    <strong>Storage:</strong> Store in an airtight container in a cool, dry place. 
                    Best consumed within 30 days of opening.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductDetails;

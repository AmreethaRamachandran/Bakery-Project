import { FaTrash, FaShoppingBag, FaTruck, FaShieldAlt } from 'react-icons/fa';
import { useCart } from '../context/CartContext';

function CartPage({ onBack, onCheckout }) {
  const { cartItems, updateQuantity, removeFromCart, getCartTotal, getCartCount } = useCart();

  const getItemPrice = (item) => {
    return item.weight === '80gms' ? item.price * 0.32 : item.price;
  };

  const getItemTotal = (item) => {
    return getItemPrice(item) * item.quantity;
  };

  const deliveryCharge = cartItems.length > 0 && getCartTotal() < 500 ? 40 : 0;
  const finalTotal = getCartTotal() + deliveryCharge;

  if (cartItems.length === 0) {
    return (
      <section className="min-h-screen bg-gradient-to-b from-[#FFF8F0] via-white to-[#FFF5EB] py-6 sm:py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4">
          <button
            onClick={onBack}
            className="flex items-center gap-1 sm:gap-2 text-[#8B4513] hover:text-[#FF6B35] transition-colors mb-4 sm:mb-6"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="font-semibold text-sm sm:text-base">Continue Shopping</span>
          </button>

          <div className="flex flex-col items-center justify-center py-10 sm:py-16 md:py-20">
            <div className="bg-white rounded-full p-6 sm:p-7 md:p-8 shadow-lg mb-4 sm:mb-5 md:mb-6">
              <FaShoppingBag className="text-4xl sm:text-5xl md:text-6xl text-gray-300" />
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#8B4513] mb-2 sm:mb-3">Your Cart is Empty</h2>
            <p className="text-gray-600 text-sm sm:text-base mb-6 sm:mb-8">Add some delicious items to get started!</p>
            <button
              onClick={onBack}
              className="px-6 py-3 sm:px-7 sm:py-3.5 md:px-8 md:py-4 bg-gradient-to-r from-[#FF6B35] to-[#FF8C42] text-white text-sm sm:text-base rounded-xl font-bold hover:shadow-xl transform hover:-translate-y-1 transition-all"
            >
              Start Shopping
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-b from-[#FFF8F0] via-white to-[#FFF5EB] py-6 sm:py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-4 sm:mb-6 md:mb-8">
          <button
            onClick={onBack}
            className="flex items-center gap-1 sm:gap-2 text-[#8B4513] hover:text-[#FF6B35] transition-colors"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="font-semibold text-sm sm:text-base">Continue Shopping</span>
          </button>
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-[#8B4513]">Shopping Cart</h1>
          <div className="w-20 sm:w-32 md:w-40"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-3 sm:space-y-4">
            <div className="bg-white rounded-xl md:rounded-2xl shadow-lg p-4 sm:p-5 md:p-6">
              <div className="flex items-center justify-between mb-4 sm:mb-5 md:mb-6">
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-[#8B4513]">
                  Cart Items ({getCartCount()})
                </h2>
              </div>

              <div className="space-y-3 sm:space-y-4">
                {cartItems.map((item, index) => (
                  <div
                    key={`${item.id}-${item.weight}-${index}`}
                    className="flex gap-2 sm:gap-3 md:gap-4 p-3 sm:p-4 bg-gradient-to-r from-orange-50 to-amber-50 rounded-lg sm:rounded-xl border border-orange-200 hover:shadow-md transition-shadow"
                  >
                    {/* Product Image */}
                    <div className="flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-cover rounded-lg shadow-md"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-grow">
                      <h3 className="text-sm sm:text-base md:text-lg font-bold text-[#8B4513] mb-1">{item.name}</h3>
                      <p className="text-xs sm:text-sm text-gray-600 mb-1 sm:mb-2">{item.category}</p>
                      <div className="flex items-center gap-1.5 sm:gap-2 mb-2 sm:mb-3">
                        <span className="text-xs sm:text-sm bg-white px-2 sm:px-3 py-0.5 sm:py-1 rounded-full border border-orange-300 font-semibold text-[#8B4513]">
                          {item.weight}
                        </span>
                        <span className="text-sm sm:text-base md:text-lg font-bold text-[#FF6B35]">
                          ₹{getItemPrice(item).toFixed(2)}
                        </span>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => updateQuantity(item.id, item.weight, item.quantity - 1)}
                          className="w-8 h-8 bg-white border-2 border-gray-300 rounded-lg flex items-center justify-center hover:border-[#FF6B35] transition-colors font-bold"
                        >
                          −
                        </button>
                        <span className="w-12 text-center font-bold text-[#8B4513]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.weight, item.quantity + 1)}
                          className="w-8 h-8 bg-white border-2 border-gray-300 rounded-lg flex items-center justify-center hover:border-[#FF6B35] transition-colors font-bold"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Price and Remove */}
                    <div className="flex flex-col items-end justify-between">
                      <button
                        onClick={() => removeFromCart(item.id, item.weight)}
                        className="text-red-500 hover:text-red-700 transition-colors p-2"
                        title="Remove item"
                      >
                        <FaTrash />
                      </button>
                      <div className="text-right">
                        <p className="text-sm text-gray-600 mb-1">Total</p>
                        <p className="text-xl font-bold text-[#8B4513]">
                          ₹{getItemTotal(item).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white rounded-xl p-4 text-center shadow-md">
                <FaTruck className="text-orange-500 text-2xl mx-auto mb-2" />
                <p className="text-xs text-gray-600 font-semibold">Fast Delivery</p>
              </div>
              <div className="bg-white rounded-xl p-4 text-center shadow-md">
                <FaShieldAlt className="text-blue-500 text-2xl mx-auto mb-2" />
                <p className="text-xs text-gray-600 font-semibold">Secure Payment</p>
              </div>
              <div className="bg-white rounded-xl p-4 text-center shadow-md">
                <svg className="w-8 h-8 text-green-500 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <p className="text-xs text-gray-600 font-semibold">Quality Assured</p>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-4">
              <h2 className="text-2xl font-bold text-[#8B4513] mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-700">
                  <span>Subtotal ({getCartCount()} items)</span>
                  <span className="font-semibold">₹{getCartTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Delivery Charge</span>
                  <span className="font-semibold">
                    {deliveryCharge === 0 ? (
                      <span className="text-green-600">FREE</span>
                    ) : (
                      `₹${deliveryCharge.toFixed(2)}`
                    )}
                  </span>
                </div>
                {deliveryCharge > 0 && (
                  <div className="text-sm text-orange-600 bg-orange-50 p-3 rounded-lg border border-orange-200">
                    Add ₹{(500 - getCartTotal()).toFixed(2)} more for free delivery!
                  </div>
                )}
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-[#8B4513]">Total Amount</span>
                    <span className="text-2xl font-bold text-[#FF6B35]">
                      ₹{finalTotal.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Coupon Code */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-[#8B4513] mb-2">
                  Have a coupon code?
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter code"
                    className="flex-1 px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent"
                  />
                  <button className="px-4 py-2 bg-[#8B4513] text-white rounded-lg font-semibold hover:bg-[#6B3410] transition-colors">
                    Apply
                  </button>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={onCheckout}
                className="w-full py-4 bg-gradient-to-r from-[#FF6B35] to-[#FF8C42] text-white rounded-xl font-bold text-lg hover:shadow-xl transform hover:-translate-y-1 transition-all mb-4"
              >
                Proceed to Checkout
              </button>

              {/* Additional Info */}
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Free delivery on orders above ₹500</span>
                </div>
                <div className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Cash on delivery available</span>
                </div>
                <div className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Easy returns within 7 days</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CartPage;

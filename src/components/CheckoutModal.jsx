import { useState } from 'react';
import { FaX } from 'react-icons/fa6';
import { useCart } from '../context/CartContext';

function CheckoutModal({ isOpen, onClose, product, quantity, weight }) {
  const [activeTab, setActiveTab] = useState('contact');
  const [formData, setFormData] = useState({
    mobile: '',
    email: '',
    address: '',
    city: '',
    pincode: ''
  });

  const { cartItems } = useCart();

  if (!isOpen) return null;

  const getTotalPrice = () => {
    if (product) {
      return (product.price * quantity).toFixed(2);
    }
    return cartItems.reduce((total, item) => {
      return total + (item.price * item.quantity);
    }, 0).toFixed(2);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleContinue = () => {
    if (activeTab === 'contact' && formData.mobile && formData.email) {
      setActiveTab('address');
    } else if (activeTab === 'address' && formData.address && formData.city && formData.pincode) {
      setActiveTab('payment');
    }
  };

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/40 z-50 transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col lg:flex-row shadow-2xl">
          
          {/* Left Side - Order Summary (Purple Background) */}
          <div className="bg-gradient-to-b from-purple-900 to-purple-800 text-white p-6 lg:w-2/5 flex flex-col justify-between">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-2xl font-bold">From KaraKudh</h3>
                <div className="flex items-center gap-2 mt-1 text-sm">
                  <span className="bg-green-500 text-white px-2 py-0.5 rounded text-xs font-bold">✓</span>
                  <span>Razorpay Trusted Business</span>
                </div>
              </div>
              <button
                onClick={onClose}
                className="hover:bg-white/20 p-2 rounded-lg transition-colors"
              >
                <FaX size={20} />
              </button>
            </div>

            {/* Order Summary */}
            <div className="space-y-4 mb-6">
              <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                <div className="text-xs text-gray-300 mb-2">Order summary</div>
                <div className="flex gap-3">
                  <img
                    src={product?.image || '/images/product.jpg'}
                    alt={product?.name || 'Product'}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h4 className="font-bold text-sm">{product?.name || 'Product'}</h4>
                    <p className="text-xs text-gray-300">{weight}</p>
                    <p className="text-xs text-gray-300">Qty. {quantity}</p>
                    <p className="font-bold text-lg mt-1">₹{getTotalPrice()}</p>
                  </div>
                </div>
              </div>

              {/* Coupons */}
              <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm cursor-pointer hover:bg-white/20 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">🎫</span>
                    <div>
                      <div className="font-bold text-sm">Coupons and offers</div>
                      <div className="text-xs text-gray-300">4 offers available</div>
                    </div>
                  </div>
                  <span className="text-xl">→</span>
                </div>
              </div>
            </div>

            {/* Decorative Footer */}
            <div className="text-center pt-4 border-t border-white/10">
              <div className="text-xs text-gray-300 mb-2">Secured by</div>
              <div className="flex items-center justify-center gap-1">
                <span className="text-lg">🔒</span>
                <span className="font-bold">Razorpay</span>
              </div>
            </div>
          </div>

          {/* Right Side - Checkout Form */}
          <div className="p-6 lg:w-3/5 flex flex-col overflow-y-auto">
            {/* Tabs */}
            <div className="flex gap-4 border-b border-gray-200 mb-6">
              <button
                onClick={() => setActiveTab('contact')}
                className={`pb-3 font-semibold text-sm transition-colors ${
                  activeTab === 'contact'
                    ? 'text-purple-600 border-b-2 border-purple-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Contact
              </button>
              <button
                onClick={() => setActiveTab('address')}
                className={`pb-3 font-semibold text-sm transition-colors ${
                  activeTab === 'address'
                    ? 'text-purple-600 border-b-2 border-purple-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Address
              </button>
              <button
                onClick={() => setActiveTab('payment')}
                className={`pb-3 font-semibold text-sm transition-colors ${
                  activeTab === 'payment'
                    ? 'text-purple-600 border-b-2 border-purple-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Payment
              </button>
            </div>

            {/* Contact Tab */}
            {activeTab === 'contact' && (
              <div className="space-y-4 flex-1">
                <div>
                  <label className="block text-sm font-bold text-gray-800 mb-2">
                    📱 Contact details
                  </label>
                  <p className="text-xs text-gray-600 mb-4">Enter mobile & email to continue</p>

                  <div className="space-y-3">
                    <div className="flex gap-2">
                      <select className="px-3 py-3 bg-gray-100 rounded-lg text-sm font-bold">
                        <option>🇮🇳 +91</option>
                      </select>
                      <input
                        type="tel"
                        name="mobile"
                        value={formData.mobile}
                        onChange={handleInputChange}
                        placeholder="Mobile number"
                        className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gray-50"
                      />
                    </div>

                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Email address"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gray-50"
                    />

                    <label className="flex items-center gap-3 cursor-pointer">
                      <input type="checkbox" defaultChecked className="w-5 h-5" />
                      <span className="text-sm text-gray-700">Send me offers and order updates</span>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Address Tab */}
            {activeTab === 'address' && (
              <div className="space-y-4 flex-1">
                <div>
                  <label className="block text-sm font-bold text-gray-800 mb-2">
                    📍 Delivery Address
                  </label>

                  <div className="space-y-3">
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="Street address"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gray-50"
                    />

                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="City"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gray-50"
                    />

                    <input
                      type="text"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleInputChange}
                      placeholder="Pincode"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gray-50"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Payment Tab */}
            {activeTab === 'payment' && (
              <div className="space-y-4 flex-1">
                <div>
                  <label className="block text-sm font-bold text-gray-800 mb-2">
                    💳 Payment Method
                  </label>

                  <div className="space-y-2">
                    <label className="flex items-center gap-3 p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                      <input type="radio" name="payment" defaultChecked className="w-5 h-5" />
                      <span className="text-sm font-semibold">Credit / Debit Card</span>
                    </label>

                    <label className="flex items-center gap-3 p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                      <input type="radio" name="payment" className="w-5 h-5" />
                      <span className="text-sm font-semibold">UPI (Google Pay, PhonePe, etc.)</span>
                    </label>

                    <label className="flex items-center gap-3 p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                      <input type="radio" name="payment" className="w-5 h-5" />
                      <span className="text-sm font-semibold">Net Banking</span>
                    </label>

                    <label className="flex items-center gap-3 p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                      <input type="radio" name="payment" className="w-5 h-5" />
                      <span className="text-sm font-semibold">Wallet</span>
                    </label>
                  </div>

                  <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                    <p className="text-xs text-blue-600">
                      ℹ️ All payments are powered by Razorpay and are secure. Read our{' '}
                      <a href="#" className="font-bold underline">
                        Privacy Policy
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Continue/Pay Button */}
            <div className="space-y-3 mt-6">
              <button
                onClick={handleContinue}
                className={`w-full py-4 rounded-lg font-bold text-white transition-colors ${
                  activeTab === 'payment'
                    ? 'bg-purple-900 hover:bg-purple-800'
                    : 'bg-purple-900 hover:bg-purple-800'
                }`}
              >
                {activeTab === 'payment' ? `Pay ₹${getTotalPrice()}` : 'Continue'}
              </button>

              <p className="text-xs text-center text-gray-600 px-2">
                By proceeding, I agree to Razorpay's{' '}
                <a href="#" className="font-bold text-purple-600">
                  Privacy Notice
                </a>
                {' '} • {' '}
                <a href="#" className="font-bold text-purple-600">
                  Edit Preferences
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CheckoutModal;

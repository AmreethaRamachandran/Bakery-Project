import { FaTrash, FaShoppingBag, FaTruck, FaShieldAlt } from 'react-icons/fa';
import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { auth, db } from "../firebase/firebaseConfig";
import CheckoutModal from './CheckoutModal';

function CartPage({ onBack, onCheckout }) {
  const { cartItems, updateQuantity, removeFromCart, getCartTotal, getCartCount, clearCart } = useCart();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [checkoutData, setCheckoutData] = useState(null);

  const getItemPrice = (item) => {
    return item.weight === '80gms' ? item.price * 0.32 : item.price;
  };

  const getItemTotal = (item) => {
    return getItemPrice(item) * item.quantity;
  };

  // ✅ WEIGHT-AWARE TOTAL: Calculate subtotal considering 80gms weight reduction
  const getWeightAdjustedSubtotal = () => {
    return cartItems.reduce((total, item) => {
      const adjustedPrice = getItemPrice(item);
      return total + (adjustedPrice * item.quantity);
    }, 0);
  };

  const weightAdjustedSubtotal = getWeightAdjustedSubtotal();
  const deliveryCharge = cartItems.length > 0 && weightAdjustedSubtotal < 500 ? 40 : 0;
  const finalTotal = weightAdjustedSubtotal + deliveryCharge;

  const handleProceedToCheckout = () => {
    const user = auth.currentUser;
    if (!user) {
      alert("Please login to continue");
      return;
    }
    setIsCheckoutOpen(true);
  };

  const handleFinalPayment = async (formData, paymentMethod, razorpayPaymentId) => {
    setIsLoading(true);
    try {
      const user = auth.currentUser;

      if (!user) {
        alert("Please login to continue");
        setIsLoading(false);
        return;
      }

      const paymentStatus = paymentMethod === 'cod' ? 'pending' : 'completed';
      const subtotal = parseFloat(weightAdjustedSubtotal.toFixed(2));
      const totalAmount = parseFloat((subtotal + deliveryCharge).toFixed(2));

      // ✅ FLAT STRUCTURE: Save as flat totalAmount (NOT nested inside pricing)
      // This is what Navbar and AdminDashboard expect to read
      const orderData = {
        userId: user.uid,
        userName: user.displayName || "Customer",
        userEmail: user.email,
        userPhone: formData.mobile,

        deliveryAddress: {
          street: formData.address,
          city: formData.city,
          pincode: formData.pincode,
          state: "",
          country: "India"
        },

        items: cartItems.map(item => {
          const pricePerUnit = item.weight === '80gms' ? item.price * 0.32 : item.price;
          return {
            id: item.id,
            name: item.name,
            category: item.category,
            weight: item.weight,
            price: parseFloat(pricePerUnit.toFixed(2)),
            quantity: item.quantity,
            total: parseFloat((pricePerUnit * item.quantity).toFixed(2)),
            image: item.image
          };
        }),

        // ✅ FLAT STRUCTURE: Do NOT nest in pricing object
        subtotal: subtotal,
        deliveryCharge: deliveryCharge,
        discount: 0,
        totalAmount: totalAmount,  // ← FLAT, directly on order object

        paymentMethod: paymentMethod,
        paymentStatus: paymentStatus,
        razorpayPaymentId: razorpayPaymentId || null,

        status: "placed",
        orderDate: Timestamp.now(),
        estimatedDelivery: Timestamp.fromDate(new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)),

        adminNotes: "",
        orderTimestamp: Date.now()
      };

      const docRef = await addDoc(collection(db, "orders"), orderData);
      console.log("Order placed successfully with ID:", docRef.id);
      console.log("Order total saved as:", totalAmount);

      clearCart();
      setIsCheckoutOpen(false);

      const message = paymentMethod === 'cod'
        ? `🎉 Order placed successfully!\nPay ₹${totalAmount.toFixed(2)} on delivery\nOrder ID: ${docRef.id}`
        : `🎉 Payment successful!\nOrder ID: ${docRef.id}`;

      alert(message);

      if (onCheckout) {
        onCheckout(docRef.id);
      }

    } catch (error) {
      console.error("Order placement error:", error);
      alert("Failed to place order: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

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
                    <div className="flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-cover rounded-lg shadow-md"
                      />
                    </div>

                    <div className="flex-grow">
                      <h3 className="text-sm sm:text-base md:text-lg font-bold text-[#8B4513] mb-1">{item.name}</h3>
                      <p className="text-xs sm:text-sm text-gray-600 mb-1 sm:mb-2">{item.category}</p>
                      
                      {/* ✅ WEIGHT SELECTOR */}
                      <div className="flex items-center gap-1.5 sm:gap-2 mb-2 sm:mb-3 flex-wrap">
                        <select
                          value={item.weight}
                          onChange={(e) => {
                            const newWeight = e.target.value;
                            // Remove old item and add new one with updated weight
                            removeFromCart(item.id, item.weight);
                            setTimeout(() => {
                              updateQuantity(item.id, newWeight, item.quantity);
                            }, 100);
                          }}
                          className="text-xs sm:text-sm bg-white px-2 sm:px-3 py-1 sm:py-1.5 rounded-full border-2 border-orange-300 font-semibold text-[#8B4513] cursor-pointer hover:border-[#FF6B35] transition-colors"
                        >
                          <option value="250gms">250gms</option>
                          <option value="80gms">80gms</option>
                        </select>
                        <span className="text-sm sm:text-base md:text-lg font-bold text-[#FF6B35] whitespace-nowrap">
                          ₹{getItemPrice(item).toFixed(2)}
                        </span>
                      </div>

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

          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-4">
              <h2 className="text-2xl font-bold text-[#8B4513] mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-700">
                  <span>Subtotal ({getCartCount()} items)</span>
                  <span className="font-semibold">₹{weightAdjustedSubtotal.toFixed(2)}</span>
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
                    Add ₹{(500 - weightAdjustedSubtotal).toFixed(2)} more for free delivery!
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

              <button
                onClick={handleProceedToCheckout}
                disabled={isLoading}
                className={`w-full py-4 bg-gradient-to-r from-[#FF6B35] to-[#FF8C42] text-white rounded-xl font-bold text-lg hover:shadow-xl transform hover:-translate-y-1 transition-all mb-4 ${
                  isLoading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isLoading ? 'Processing...' : 'Proceed to Checkout'}
              </button>

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

      {isCheckoutOpen && (
        <CheckoutModalWithPayment
          isOpen={isCheckoutOpen}
          onClose={() => setIsCheckoutOpen(false)}
          cartItems={cartItems}
          totalAmount={finalTotal}
          deliveryCharge={deliveryCharge}
          onPaymentComplete={handleFinalPayment}
          isLoading={isLoading}
        />
      )}
    </section>
  );
}

function CheckoutModalWithPayment({ isOpen, onClose, cartItems, totalAmount, deliveryCharge, onPaymentComplete, isLoading }) {
  const [activeTab, setActiveTab] = useState('contact');
  const [selectedPayment, setSelectedPayment] = useState('card');
  const [formData, setFormData] = useState({
    mobile: '',
    email: '',
    address: '',
    city: '',
    pincode: ''
  });

  if (!isOpen) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (!formData.mobile || !formData.email) {
      alert('Please enter mobile and email');
      return false;
    }
    if (!formData.address || !formData.city || !formData.pincode) {
      alert('Please enter complete address');
      return false;
    }
    return true;
  };

  const handlePaymentSubmit = async () => {
    if (!validateForm()) return;
    await onPaymentComplete(formData, selectedPayment, null);
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/40 z-50 transition-opacity" onClick={onClose} />

      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col lg:flex-row shadow-2xl">

          <div className="bg-gradient-to-b from-purple-900 to-purple-800 text-white p-6 lg:w-2/5 flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-bold mb-2">KaraKudh Order</h3>
              <p className="text-white/80 text-sm mb-6">Complete your purchase</p>

              <div className="bg-white/20 rounded-xl p-4 backdrop-blur-sm mb-6 max-h-64 overflow-y-auto">
                <div className="text-sm font-semibold mb-3">Order Items ({cartItems.length})</div>
                <div className="space-y-2">
                  {cartItems.map((item, idx) => {
                    // ✅ WEIGHT-AWARE PRICE: Calculate correct price based on weight
                    const pricePerUnit = item.weight === '80gms' ? item.price * 0.32 : item.price;
                    const itemTotal = pricePerUnit * item.quantity;
                    return (
                      <div key={idx} className="flex justify-between text-sm">
                        <span>{item.name} ({item.weight}) x {item.quantity}</span>
                        <span className="font-bold">₹{itemTotal.toFixed(2)}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="bg-white/20 rounded-xl p-4 backdrop-blur-sm">
                <div className="flex justify-between text-sm mb-2">
                  <span>Subtotal</span>
                  <span>₹{(totalAmount - deliveryCharge).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm mb-3 pb-3 border-b border-white/30">
                  <span>Delivery</span>
                  <span className="text-green-200">{deliveryCharge === 0 ? 'FREE' : `₹${deliveryCharge.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>₹{totalAmount.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="text-center pt-4 border-t border-white/20">
              <p className="text-sm text-white/80 mb-2">Secured by Razorpay</p>
              <p className="text-xs text-white/70">100% Safe & Secure</p>
            </div>
          </div>

          <div className="p-6 lg:w-3/5 flex flex-col overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">Checkout</h2>
              <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl font-bold transition-colors">✕</button>
            </div>

            <div className="flex gap-4 border-b border-gray-200 mb-6">
              {['contact', 'address', 'payment'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-3 font-semibold text-sm transition-colors capitalize ${
                    activeTab === tab ? 'text-purple-600 border-b-2 border-purple-600' : 'text-gray-500'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {activeTab === 'contact' && (
              <div className="space-y-4 flex-1">
                <label className="block text-sm font-bold text-gray-800 mb-2">📱 Contact Details</label>
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
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                    />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Email address"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                  />
                </div>
              </div>
            )}

            {activeTab === 'address' && (
              <div className="space-y-4 flex-1">
                <label className="block text-sm font-bold text-gray-800 mb-2">📍 Delivery Address</label>
                <div className="space-y-3">
                  <input type="text" name="address" value={formData.address} onChange={handleInputChange} placeholder="Street address" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600" />
                  <input type="text" name="city" value={formData.city} onChange={handleInputChange} placeholder="City" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600" />
                  <input type="text" name="pincode" value={formData.pincode} onChange={handleInputChange} placeholder="Pincode" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600" />
                </div>
              </div>
            )}

            {activeTab === 'payment' && (
              <div className="space-y-4 flex-1">
                <label className="block text-sm font-bold text-gray-800 mb-2">💳 Payment Method</label>
                <div className="space-y-2">
                  {['card', 'upi', 'netbanking', 'wallet', 'cod'].map(method => (
                    <label key={method} className="flex items-center gap-3 p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        name="payment"
                        value={method}
                        checked={selectedPayment === method}
                        onChange={(e) => setSelectedPayment(e.target.value)}
                        className="w-5 h-5"
                      />
                      <span className="text-sm font-semibold capitalize">
                        {method === 'card' && 'Credit / Debit Card'}
                        {method === 'upi' && 'UPI (Google Pay, PhonePe)'}
                        {method === 'netbanking' && 'Net Banking'}
                        {method === 'wallet' && 'Wallet'}
                        {method === 'cod' && 'Cash on Delivery'}
                      </span>
                    </label>
                  ))}
                </div>
                {selectedPayment === 'cod' && (
                  <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-300">
                    <p className="text-sm text-green-700 font-semibold">✓ Pay when your order is delivered</p>
                  </div>
                )}
              </div>
            )}

            <div className="space-y-3 mt-6">
              <div className="flex gap-3">
                {activeTab === 'contact' ? (
                  <button onClick={onClose} className="flex-1 py-3 border-2 border-gray-300 text-gray-600 rounded-lg font-bold hover:bg-gray-50 transition-colors">Cancel</button>
                ) : (
                  <button
                    onClick={() => {
                      if (activeTab === 'address') setActiveTab('contact');
                      if (activeTab === 'payment') setActiveTab('address');
                    }}
                    className="flex-1 py-3 border-2 border-purple-600 text-purple-600 rounded-lg font-bold hover:bg-purple-50 transition-colors"
                  >
                    Back
                  </button>
                )}

                {activeTab !== 'payment' && (
                  <button
                    onClick={() => {
                      if (activeTab === 'contact' && formData.mobile && formData.email) {
                        setActiveTab('address');
                      } else if (activeTab === 'address' && formData.address && formData.city && formData.pincode) {
                        setActiveTab('payment');
                      } else {
                        alert('Please fill all fields');
                      }
                    }}
                    className="flex-1 py-3 bg-purple-600 text-white rounded-lg font-bold hover:bg-purple-700 transition-colors"
                  >
                    Continue
                  </button>
                )}
              </div>

              {activeTab === 'payment' && (
                <button
                  onClick={handlePaymentSubmit}
                  disabled={isLoading}
                  className="w-full py-4 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg font-bold text-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Processing...' : (
                    selectedPayment === 'cod'
                      ? 'Place Order - Pay on Delivery'
                      : `Pay ₹${totalAmount.toFixed(2)}`
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CartPage;
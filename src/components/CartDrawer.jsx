import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { FaX } from 'react-icons/fa6';

function CartDrawer({ isOpen, onClose }) {
  const { cartItems, removeFromCart, updateQuantity } = useCart();
  const [lastAddedItem, setLastAddedItem] = useState(null);

  useEffect(() => {
    if (cartItems.length > 0) {
      setLastAddedItem(cartItems[cartItems.length - 1]);
    }
  }, [cartItems]);

  if (!isOpen) return null;

  // ✅ WEIGHT-AWARE: Get correct price based on weight
  const getItemPrice = (item) => {
    return item.weight === '80gms' ? item.price * 0.32 : item.price;
  };

  // ✅ WEIGHT-AWARE: Calculate total considering 80gms weight reduction
  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      const adjustedPrice = getItemPrice(item);
      return total + (adjustedPrice * item.quantity);
    }, 0).toFixed(2);
  };

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/30 z-40 transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 h-screen w-full max-w-md bg-white shadow-2xl z-50 flex flex-col overflow-hidden animate-slide-in">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#8B4513] to-[#A05C2F] text-white p-4 sm:p-6 flex items-center justify-between">
          <h2 className="text-xl sm:text-2xl font-bold">Your cart</h2>
          <button
            onClick={onClose}
            className="hover:bg-white/20 p-2 rounded-lg transition-colors"
          >
            <FaX size={20} />
          </button>
        </div>

        {/* Cart Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 sm:space-y-6">
          {cartItems.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500 text-lg">Your cart is empty</p>
            </div>
          ) : (
            cartItems.map((item, index) => (
              <div key={index} className="border-b border-gray-200 pb-4">
                <div className="flex gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-bold text-[#8B4513] text-sm sm:text-base">
                      {item.name}
                    </h3>
                    <p className="text-gray-600 text-xs sm:text-sm">
                      Weight: {item.weight}
                    </p>
                    {/* ✅ WEIGHT-AWARE: Use getItemPrice to show correct amount */}
                    <p className="text-[#FF6B35] font-bold text-sm sm:text-base mt-1">
                      ₹{(getItemPrice(item) * item.quantity).toFixed(2)}
                    </p>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2 mt-2 bg-gray-100 rounded-lg w-fit p-1">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.weight, item.quantity - 1)
                        }
                        className="px-2 py-1 text-gray-600 hover:text-[#8B4513] font-bold"
                      >
                        −
                      </button>
                      <span className="px-3 py-1 text-sm font-semibold text-gray-700">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.weight, item.quantity + 1)
                        }
                        className="px-2 py-1 text-gray-600 hover:text-[#8B4513] font-bold"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromCart(item.id, item.weight)}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <FaX size={16} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="border-t border-gray-200 bg-gray-50 p-4 sm:p-6 space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                {/* ✅ WEIGHT-AWARE: Use getTotalPrice which accounts for 80gms */}
                <span>₹{getTotalPrice()}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Taxes & Fees</span>
                <span className="text-green-600">Included</span>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-4 flex justify-between items-center font-bold text-lg">
              <span className="text-gray-800">Estimated total</span>
              {/* ✅ WEIGHT-AWARE: Use getTotalPrice which accounts for 80gms */}
              <span className="text-[#FF6B35]">₹{getTotalPrice()}</span>
            </div>

            <button className="w-full bg-gray-800 hover:bg-gray-900 text-white font-bold py-3 sm:py-4 rounded-lg transition-colors">
              Check out
            </button>

            <button
              onClick={onClose}
              className="w-full bg-white border-2 border-gray-300 hover:border-gray-400 text-gray-800 font-bold py-3 sm:py-4 rounded-lg transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes slide-in {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }

        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>
    </>
  );
}

export default CartDrawer;
import React, { useState } from 'react';
import { X, Minus, Plus, ShoppingBag, CheckCircle } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * @typedef {Object} CartItem
 * @property {(string|number)} id - The unique identifier of the item
 * @property {string} name - The name of the item
 * @property {number} price - The price of the item
 * @property {number} quantity - The quantity of the item in cart
 * @property {string} image - The URL of the item's image
 */

/**
 * Cart component that displays the shopping cart contents
 * 
 * @param {Object} props
 * @param {boolean} props.isOpen - Whether the cart is open
 * @param {(isOpen: boolean) => void} props.setIsOpen - Function to set cart open state
 * @param {(onCheckout: () => void) => void} props.onCheckout - Function to handle checkout
 * @returns {React.JSX.Element|null}
 */
export default function Cart({ isOpen, setIsOpen, onCheckout }) {
  const { items, total, removeItem, updateQuantity, clearCart } = useCartStore();
  const [isClearing, setIsClearing] = useState(false);

  const handleProceedToCheckout = () => {
    setIsOpen(false);
    if (onCheckout) {
      onCheckout();
    }
  };

  const handleClearCart = () => {
    setIsClearing(true);
    setTimeout(() => {
      clearCart();
      setIsClearing(false);
    }, 300);
  };

  if (!isOpen) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 overflow-hidden backdrop-blur-sm"
    >
      <div 
        className="absolute inset-0 bg-black/30 transition-opacity" 
        onClick={() => setIsOpen(false)} 
      />
      <motion.div 
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="absolute right-0 top-0 bottom-0 w-full max-w-md"
      >
        <div className="h-full bg-white/95 backdrop-blur-sm shadow-2xl flex flex-col">
          <div className="flex-1 overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <ShoppingBag className="h-6 w-6" />
                Your Cart
              </h2>
              <div className="flex items-center gap-2">
                {items.length > 0 && (
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={handleClearCart}
                    className="text-sm text-red-500 hover:bg-red-50 px-3 py-1 rounded-full transition-colors"
                  >
                    Clear Cart
                  </motion.button>
                )}
                <button
                  onClick={() => setIsOpen(false)}
                  className="rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 transition-all"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
            </div>

            <AnimatePresence mode="wait">
              {items.length === 0 ? (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="flex flex-col items-center justify-center h-96"
                >
                  <ShoppingBag className="h-16 w-16 text-gray-400 mb-4" />
                  <p className="text-xl font-medium text-gray-600">Your cart is empty</p>
                  <p className="text-gray-500 mt-2">Add some delicious items to get started!</p>
                </motion.div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-6 space-y-4"
                >
                  {items.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-all"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg line-clamp-1">{item.name}</h3>
                        <p className="text-orange-600 font-bold">${item.price.toFixed(2)}</p>
                        <div className="flex items-center gap-3 mt-2">
                          <motion.button
                            whileTap={{ scale: 0.9 }}
                            onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                            className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                          >
                            <Minus className="h-4 w-4" />
                          </motion.button>
                          <span className="font-medium w-8 text-center">{item.quantity}</span>
                          <motion.button
                            whileTap={{ scale: 0.9 }}
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                          >
                            <Plus className="h-4 w-4" />
                          </motion.button>
                        </div>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => removeItem(item.id)}
                        className="p-2 rounded-full hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <X className="h-5 w-5" />
                      </motion.button>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {items.length > 0 && (
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="border-t bg-white p-6 shadow-lg"
            >
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-medium">Total</span>
                <span className="text-2xl font-bold text-orange-600">
                  ${total.toFixed(2)}
                </span>
              </div>
              <motion.button 
                onClick={handleProceedToCheckout}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3 px-4 bg-orange-600 text-white rounded-lg font-semibold hover:bg-orange-700 transition-colors flex items-center justify-center gap-2"
              >
                <CheckCircle className="h-5 w-5" />
                Proceed to Checkout
              </motion.button>
            </motion.div>
          )}
        </div> 
      </motion.div>
    </motion.div>
  );
}
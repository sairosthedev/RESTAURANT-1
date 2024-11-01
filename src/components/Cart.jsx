import React, { useState, useEffect } from 'react';
import { X, Minus, Plus, ShoppingBag, CheckCircle, ArrowLeft } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { motion, AnimatePresence } from 'framer-motion';
import Checkout from './Checkout';

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
  const [showCheckout, setShowCheckout] = useState(false);
  const [loading, setLoading] = useState(false);
  const userId = 'user123'; // Replace with actual user ID from your auth context or state

  const handleProceedToCheckout = () => {
    setShowCheckout(true);
    if (onCheckout) {
      onCheckout();
    }
  };

  const handleClearCart = async () => {
    setIsClearing(true);
    try {
      await fetch(`/api/cart/clear/${userId}`, { method: 'DELETE' });
      clearCart();
    } catch (error) {
      console.error('Error clearing cart:', error);
    } finally {
      setIsClearing(false);
    }
  };

  const handleRemoveItem = async (itemId) => {
    try {
      await fetch(`/api/cart/remove/${userId}/${itemId}`, { method: 'DELETE' });
      removeItem(itemId);
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  const handleUpdateQuantity = async (itemId, quantity) => {
    setLoading(true);
    try {
      await fetch(`/api/cart/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, itemId, quantity }),
      });
      updateQuantity(itemId, quantity);
    } catch (error) {
      console.error('Error updating quantity:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchCart = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/cart/${userId}`);
        const data = await response.json();
        // Assuming you have a method to set items in your store
        // setItems(data.items);
      } catch (error) {
        console.error('Error fetching cart:', error);
      } finally {
        setLoading(false);
      }
    };

    if (isOpen) {
      fetchCart();
    }
  }, [isOpen, userId]);

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
                    {isClearing ? 'Clearing...' : 'Clear Cart'}
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
                            onClick={() => handleUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                            className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                          >
                            <Minus className="h-4 w-4" />
                          </motion.button>
                          <span className="font-medium w-8 text-center">{item.quantity}</span>
                          <motion.button
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                            className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                          >
                            <Plus className="h-4 w-4" />
                          </motion.button>
                        </div>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleRemoveItem(item.id)}
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
      {showCheckout && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed inset-0 bg-white z-[60] overflow-y-auto"
        >
          <div className="min-h-screen p-4">
            <button
              onClick={() => setShowCheckout(false)}
              className="fixed top-4 left-4 p-2 rounded-full hover:bg-gray-100"
            >
              <ArrowLeft className="h-6 w-6" />
            </button>
            <div className="pt-16">
              <Checkout 
                totalAmount={total} 
                cartItems={items} 
                onClose={() => {
                  setShowCheckout(false);
                  setIsOpen(false);
                }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
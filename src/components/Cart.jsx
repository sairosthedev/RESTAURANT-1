import React from 'react';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { useCartStore } from '../store/cartStore';

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
 * @returns {React.JSX.Element|null}
 */
export default function Cart({ isOpen, setIsOpen }) {
  const { items, total, removeItem, updateQuantity } = useCartStore();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50 transition-opacity" onClick={() => setIsOpen(false)} />
      <div className="absolute right-0 top-0 bottom-0 w-full max-w-md">
        <div className="h-full bg-white shadow-xl flex flex-col transform transition-transform">
          <div className="flex-1 overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <ShoppingBag className="h-6 w-6" />
                Your Cart
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-96">
                <ShoppingBag className="h-16 w-16 text-gray-400 mb-4" />
                <p className="text-xl font-medium text-gray-600">Your cart is empty</p>
                <p className="text-gray-500 mt-2">Add some delicious items to get started!</p>
              </div>
            ) : (
              <div className="p-6 space-y-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm border border-gray-100"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{item.name}</h3>
                      <p className="text-orange-600 font-bold">${item.price.toFixed(2)}</p>
                      <div className="flex items-center gap-3 mt-2">
                        <button
                          onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                          className="p-1 rounded-full hover:bg-gray-100"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="font-medium w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 rounded-full hover:bg-gray-100"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {items.length > 0 && (
            <div className="border-t bg-gray-50 p-6">
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-medium">Total</span>
                <span className="text-2xl font-bold text-orange-600">
                  ${total.toFixed(2)}
                </span>
              </div>
              <button className="w-full btn-primary">
                Proceed to Checkout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
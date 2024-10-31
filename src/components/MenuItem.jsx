import React from 'react';
import { Plus, Star, Clock } from 'lucide-react';
import { useCartStore } from '../store/cartStore';

/**
 * @typedef {Object} MenuItemType
 * @property {string} id - Unique identifier for the menu item
 * @property {string} name - Name of the menu item
 * @property {string} description - Description of the menu item
 * @property {number} price - Price of the menu item
 * @property {string} image - URL of the menu item's image
 * @property {string} category - Category of the menu item
 */

/**
 * MenuItem component that displays a food menu item card
 * @param {Object} props
 * @param {MenuItemType} props.item - The menu item to display
 * @returns {React.JSX.Element}
 */
export default function MenuItem({ item }) {
  const addItem = useCartStore((state) => state.addItem);

  return (
    <div className="bg-gradient-to-br from-white to-orange-50/30 rounded-xl shadow-md overflow-hidden menu-item-hover group">
      <div className="relative">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-48 object-cover transform group-hover:scale-105 transition-transform duration-500"
        />
        <div className="menu-item-badge">
          <Star className="h-4 w-4 fill-current" />
          4.8
        </div>
        <div className="menu-item-time">
          <Clock className="h-4 w-4" />
          15-20 min
        </div>
      </div>
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-xl text-gray-900 group-hover:text-orange-600 transition-colors">
            {item.name}
          </h3>
          <span className="text-orange-600 font-bold text-xl bg-orange-100 px-3 py-1 rounded-full">
            ${item.price.toFixed(2)}
          </span>
        </div>
        <p className="text-gray-600 mb-4">{item.description}</p>
        <button
          onClick={() => addItem({ ...item, quantity: 1 })}
          className="w-full btn-primary flex items-center justify-center gap-2 group"
        >
          <Plus className="h-5 w-5 group-hover:rotate-180 transition-transform duration-300" />
          Add to Cart
        </button>
      </div>
    </div>
  );
}
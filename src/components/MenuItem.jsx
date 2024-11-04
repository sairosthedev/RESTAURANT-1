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
 * @property {string} prepTime - Preparation time for the menu item
 */

/**
 * MenuItem component that displays a food menu item card
 * @param {Object} props
 * @param {MenuItemType} props.item - The menu item to display
 * @param {Function} props.showNotification - Function to show notifications
 * @returns {React.JSX.Element}
 */
export default function MenuItem({ item, showNotification }) {
  // Hooks
  const addToCart = useCartStore((state) => state.addItem);

  // Event Handlers
  const handleAddToCart = () => {
    addToCart(item);
    showNotification(`Added ${item.name} to cart`, 'success');
  };

  return (
    <div className="bg-gradient-to-br from-white to-orange-50/30 rounded-xl shadow-md overflow-hidden menu-item-hover group">
      {/* Image Section */}
      <div className="relative">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-48 object-cover transform group-hover:scale-105 transition-transform duration-500"
        />
        {/* Badges */}
        <div className="menu-item-badge">
          <Star className="h-4 w-4 fill-current" />
          <span>4.8</span>
        </div>
        <div className="menu-item-time">
          <Clock className="h-4 w-4" />
          <span>{item.prepTime}</span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-xl text-gray-900 group-hover:text-orange-600 transition-colors">
            {item.name}
          </h3>
          <span className="text-orange-600 font-bold text-xl bg-orange-100 px-3 py-1 rounded-full">
            ${item.price.toFixed(2)}
          </span>
        </div>

        {/* Description */}
        <p className="text-gray-600 mb-4">
          {item.description}
        </p>

        {/* Action Button */}
        <button
          onClick={handleAddToCart}
          className="w-full btn-primary flex items-center justify-center gap-2 group"
        >
          <Plus className="h-5 w-5 group-hover:rotate-180 transition-transform duration-300" />
          Add to Cart 
        </button>
      </div>
    </div>
  );
}
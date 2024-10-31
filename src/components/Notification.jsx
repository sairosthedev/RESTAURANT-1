import React, { useEffect } from 'react';
import { X } from 'lucide-react';

/**
 * Notification component for displaying alerts and messages
 * @param {Object} props
 * @param {string} props.message - The message to display
 * @param {string} props.type - The type of notification ('success' | 'error' | 'warning' | 'info')
 * @param {boolean} props.isVisible - Whether the notification is visible
 * @param {() => void} props.onClose - Function to close the notification
 * @param {number} [props.duration=3000] - Duration in ms before auto-closing
 * @returns {React.JSX.Element | null}
 */
export default function Notification({ 
  message, 
  type = 'info', 
  isVisible, 
  onClose, 
  duration = 3000 
}) {
  useEffect(() => {
    if (isVisible && duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  if (!isVisible) return null;

  const typeStyles = {
    success: 'bg-green-100 text-green-800 border-green-300',
    error: 'bg-red-100 text-red-800 border-red-300',
    warning: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    info: 'bg-blue-100 text-blue-800 border-blue-300',
  };

  return (
    <div className={`fixed top-24 right-4 z-50 max-w-sm rounded-lg border p-4 shadow-lg ${typeStyles[type]}`}>
      <div className="flex items-start gap-2">
        <p className="flex-1">{message}</p>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 transition-colors"
          aria-label="Close notification"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
} 
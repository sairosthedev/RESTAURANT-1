import React, { useState } from 'react';
import { useCartStore } from '../store/cartStore';
import { CheckCircle, Loader2, CreditCard } from 'lucide-react';
import CardIcons from './CardIcons';
import { motion, AnimatePresence } from 'framer-motion';
import CardPreview from './CardPreview';

const PaymentForm = ({ totalAmount, onSuccess }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [errors, setErrors] = useState({});
  const [generalError, setGeneralError] = useState('');
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    name: ''
  });
  const clearCart = useCartStore(state => state.clearCart);
  const [isFlipped, setIsFlipped] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    
    // Validate name
    if (formData.name.trim().length < 3) {
      newErrors.name = 'Name must be at least 3 characters long';
    }
    
    // Validate card number (using Luhn algorithm)
    const cardNumber = formData.cardNumber.replace(/\s/g, '');
    if (!/^\d{16}$/.test(cardNumber) || !isValidCreditCard(cardNumber)) {
      newErrors.cardNumber = 'Please enter a valid 16-digit card number';
    }
    
    // Validate expiry date
    const [month, year] = formData.expiryDate.split('/');
    const currentYear = new Date().getFullYear() % 100;
    const currentMonth = new Date().getMonth() + 1;
    
    if (!/^\d{2}\/\d{2}$/.test(formData.expiryDate) ||
        parseInt(month) < 1 || parseInt(month) > 12 ||
        parseInt(year) < currentYear ||
        (parseInt(year) === currentYear && parseInt(month) < currentMonth)) {
      newErrors.expiryDate = 'Please enter a valid future expiry date (MM/YY)';
    }
    
    // Validate CVV
    if (!/^\d{3,4}$/.test(formData.cvv)) {
      newErrors.cvv = 'CVV must be 3 or 4 digits';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidCreditCard = (number) => {
    let sum = 0;
    let isEven = false;
    
    // Loop through values starting from the rightmost digit
    for (let i = number.length - 1; i >= 0; i--) {
      let digit = parseInt(number.charAt(i));

      if (isEven) {
        digit *= 2;
        if (digit > 9) {
          digit -= 9;
        }
      }

      sum += digit;
      isEven = !isEven;
    }

    return sum % 10 === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGeneralError('');
    
    if (!validateForm()) {
      return;
    }
    
    setIsProcessing(true);

    try {
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          if (Math.random() > 0.9) {
            reject(new Error('Payment failed'));
          }
          resolve();
        }, 2000);
      });
      
      clearCart();
      setShowSuccess(true);
      setTimeout(() => {
        if (onSuccess) {
          onSuccess();
        }
      }, 2000);
    } catch (error) {
      console.error('Payment failed:', error);
      setGeneralError('Payment failed. Please try again or contact support.');
    } finally {
      setIsProcessing(false);
    }
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];

    for (let i = 0; i < match.length; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(' ');
    }
    return value;
  };

  const formatExpiryDate = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return `${v.substring(0, 2)}/${v.substring(2, 4)}`;
    }
    return v;
  };

  const handleInputChange = (e) => {
    let { name, value } = e.target;
    
    // Apply formatting based on field
    if (name === 'cardNumber') {
      value = formatCardNumber(value);
    } else if (name === 'expiryDate') {
      value = formatExpiryDate(value);
    } else if (name === 'cvv') {
      value = value.replace(/\D/g, '').slice(0, 4);
    }

    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  // Add card brand detection
  const getCardBrand = (cardNumber) => {
    const patterns = {
      visa: /^4/,
      mastercard: /^5[1-5]/,
      amex: /^3[47]/,
      discover: /^6(?:011|5)/,
    };

    const number = cardNumber.replace(/\s+/g, '');
    for (const [brand, pattern] of Object.entries(patterns)) {
      if (pattern.test(number)) return brand;
    }
    return 'unknown';
  };

  const acceptedCards = ['visa', 'mastercard', 'amex', 'discover'];

  return (
    <div className="space-y-6">
      <div className="flex justify-center space-x-4 mb-6">
        {acceptedCards.map(card => (
          <div key={card} className="w-12 opacity-50 hover:opacity-100 transition-opacity">
            {CardIcons[card]}
          </div>
        ))}
      </div>

      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="bg-green-50 p-4 rounded-lg border border-green-200"
          >
            <div className="flex items-center justify-center space-x-2 text-green-700">
              <CheckCircle className="h-5 w-5" />
              <span className="font-medium">Payment Successful!</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <CardPreview cardData={formData} isFlipped={isFlipped} />

      <form onSubmit={handleSubmit} className="space-y-6">
        {generalError && (
          <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded-md">
            {generalError}
          </div>
        )}
        
        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Cardholder Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Mdala Sairos"
              className={`mt-1 block w-full rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              }`}
              required
            />
            {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
          </div>

          <div>
            <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">
              Card Number
            </label>
            <div className="relative">
              <input
                type="text"
                id="cardNumber"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleInputChange}
                maxLength="19"
                placeholder="1234 5678 9012 3456"
                className={`mt-1 block w-full pl-10 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 ${
                  errors.cardNumber ? 'border-red-500' : 'border-gray-300'
                }`}
                required
                aria-invalid={errors.cardNumber ? 'true' : 'false'}
                aria-describedby={errors.cardNumber ? 'cardNumber-error' : undefined}
              />
              <CreditCard className="absolute left-3 top-[60%] transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              {formData.cardNumber && (
                <div className="absolute right-3 top-[60%] transform -translate-y-1/2">
                  {CardIcons[getCardBrand(formData.cardNumber)]}
                </div>
              )}
            </div>
            {errors.cardNumber && (
              <p className="mt-1 text-sm text-red-600" id="cardNumber-error">{errors.cardNumber}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700">
                Expiry Date
              </label>
              <input
                type="text"
                id="expiryDate"
                name="expiryDate"
                placeholder="MM/YY"
                value={formData.expiryDate}
                onChange={handleInputChange}
                maxLength="5"
                className={`mt-1 block w-full rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 ${
                  errors.expiryDate ? 'border-red-500' : 'border-gray-300'
                }`}
                required
              />
              {errors.expiryDate && <p className="mt-1 text-sm text-red-600">{errors.expiryDate}</p>}
            </div>

            <div>
              <label htmlFor="cvv" className="block text-sm font-medium text-gray-700">
                CVV
              </label>
              <input
                type="text"
                id="cvv"
                name="cvv"
                value={formData.cvv}
                onChange={handleInputChange}
                onFocus={() => setIsFlipped(true)}
                onBlur={() => setIsFlipped(false)}
                maxLength="4"
                placeholder="123"
                className={`mt-1 block w-full rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 ${
                  errors.cvv ? 'border-red-500' : 'border-gray-300'
                }`}
                required
              />
              {errors.cvv && <p className="mt-1 text-sm text-red-600">{errors.cvv}</p>}
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center font-medium text-lg border-t pt-4">
          <span>Total Amount:</span>
          <span className="text-orange-600">${totalAmount.toFixed(2)}</span>
        </div>

        <button
          type="submit"
          disabled={isProcessing}
          className="w-full py-3 px-4 bg-orange-600 text-white rounded-lg font-semibold hover:bg-orange-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          aria-busy={isProcessing}
        >
          {isProcessing ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              <span>Processing...</span>
            </>
          ) : (
            <>
              <CheckCircle className="h-5 w-5" />
              Pay Now
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default PaymentForm;
import React from 'react';
import { motion } from 'framer-motion';

const CardPreview = ({ cardData, isFlipped }) => {
  return (
    <motion.div
      className="relative w-full h-48 perspective-1000"
      initial={false}
      animate={{ rotateY: isFlipped ? 180 : 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className={`absolute w-full h-full rounded-xl p-6 backface-hidden
        ${isFlipped ? 'hidden' : 'bg-gradient-to-br from-gray-900 to-gray-800'}`}>
        <div className="flex flex-col h-full text-white">
          <div className="flex justify-between items-center">
            <div className="w-12 h-8 bg-gradient-to-br from-yellow-400 to-yellow-200 rounded-md"></div>
            <span className="text-lg font-medium">Credit Card</span>
          </div>
          <div className="flex-1 flex items-center">
            <div className="text-2xl tracking-wider font-medium">
              {cardData.cardNumber || '•••• •••• •••• ••••'}
            </div>
          </div>
          <div className="flex justify-between items-end">
            <div>
              <div className="text-xs opacity-75">Card Holder</div>
              <div className="font-medium">{cardData.name || 'YOUR NAME'}</div>
            </div>
            <div>
              <div className="text-xs opacity-75">Expires</div>
              <div className="font-medium">{cardData.expiryDate || 'MM/YY'}</div>
            </div>
          </div>
        </div>
      </div>
      <div className={`absolute w-full h-full rounded-xl p-6 backface-hidden rotate-y-180
        ${!isFlipped ? 'hidden' : 'bg-gradient-to-br from-gray-800 to-gray-700'}`}>
        <div className="w-full h-12 bg-black mt-4"></div>
        <div className="flex justify-end mt-4">
          <div className="w-16 h-8 bg-white rounded flex items-center justify-center text-gray-800">
            {cardData.cvv || 'CVV'}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CardPreview; 
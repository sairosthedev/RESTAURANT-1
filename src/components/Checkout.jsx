import React, { useState } from 'react';
import PaymentForm from './PaymentForm';
import { CheckCircle } from 'lucide-react';

const Checkout = ({ totalAmount, onClose }) => {
    const [isSuccess, setIsSuccess] = useState(false);

    const handlePaymentSuccess = () => {
        setIsSuccess(true);
        setTimeout(() => {
            if (onClose) onClose();
        }, 2000);
    };

    if (isSuccess) {
        return (
            <div className="max-w-2xl mx-auto p-6 flex flex-col items-center justify-center min-h-[400px]">
                <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h2>
                <p className="text-gray-600">Thank you for your order.</p>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Checkout</h2>
            <PaymentForm totalAmount={totalAmount} onSuccess={handlePaymentSuccess} />
        </div>
    );
};

export default Checkout; 
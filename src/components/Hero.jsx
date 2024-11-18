// Importing necessary libraries and components
import React, { useState } from 'react';
import { ArrowRight, UtensilsCrossed, X } from 'lucide-react';
import { supabase } from '../services/supabaseClient';

// Creating a functional component for the Hero section
export default function Hero() {
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    guests: 2,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleReservation = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('reservations')
        .insert([
          {
            date: new Date(formData.date).toISOString(),
            status: 'pending',
            guests: parseInt(formData.guests),
            name: formData.name,
            email: formData.email,
            phone: formData.phone
          }
        ]);

      if (error) {
        console.warn('Reservation failed:', error.message);
        alert('Sorry, we couldn\'t process your reservation. Please try again.');
        return;
      }

      alert('Reservation request received! We\'ll contact you to confirm the details.');
      setShowModal(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        date: '',
        guests: 2,
      });
      
    } catch (error) {
      console.error('Unexpected error:', error);
      alert('An unexpected error occurred. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  // Returning the JSX for the Hero section
  return (
    <div className="relative h-[600px] flex items-center">
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1687422808248-f807f4ea2a2e?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 hero-gradient" />
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
        <div className="flex items-center gap-4 mb-8">
          <UtensilsCrossed className="h-12 w-12 text-orange-500 floating-animation" />
          <span className="text-xl font-medium text-orange-300">Since 2022</span>
        </div>
        <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
          Experience the Taste of
          <br />
          <span className="text-orange-500 shine-effect inline-block">Zimbabwe</span>
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-2xl text-gray-200">
          Discover our authentic recipes and signature dishes, crafted with love and tradition.
        </p>
        <div className="flex flex-wrap gap-4">
          <a href="#mains" className="btn-primary inline-flex items-center gap-2 group text-lg">
            View Menu 
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </a>
          <button 
            onClick={() => setShowModal(true)}
            className="btn-secondary group text-lg"
          >
            Make a Reservation
            <span className="block text-sm text-orange-500 group-hover:text-orange-600 transition-colors">
              Book your table now
            </span>
          </button>
        </div>
      </div>

      {/* Reservation Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full relative">
            <button 
              onClick={() => setShowModal(false)}
              className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
            >
              <X className="h-6 w-6" />
            </button>
            
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Make a Reservation</h2>
            
            <form onSubmit={handleReservation} className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full p-2 border rounded"
                />
              </div>
              
              <div>
                <label className="block text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full p-2 border rounded"
                />
              </div>
              
              <div>
                <label className="block text-gray-700 mb-1">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full p-2 border rounded"
                />
              </div>
              
              <div>
                <label className="block text-gray-700 mb-1">Date & Time</label>
                <input
                  type="datetime-local"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  required
                  className="w-full p-2 border rounded"
                />
              </div>
              
              <div>
                <label className="block text-gray-700 mb-1">Number of Guests</label>
                <input
                  type="number"
                  name="guests"
                  value={formData.guests}
                  onChange={handleInputChange}
                  min="1"
                  max="10"
                  required
                  className="w-full p-2 border rounded"
                />
              </div>
              
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600 transition-colors
                  ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
              >
                {isLoading ? 'Processing...' : 'Confirm Reservation'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
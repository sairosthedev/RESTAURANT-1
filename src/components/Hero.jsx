import React, { useState } from 'react';
import { ArrowRight, UtensilsCrossed } from 'lucide-react';
import '../styles/Hero.css';

export default function Hero() {
  const [showReservationModal, setShowReservationModal] = useState(false);

  const handleReservationClick = () => {
    setShowReservationModal(true);
  };

  return (
    <div className="relative h-[600px] flex items-center">
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1532635241-17e820acc59f?auto=format&fit=crop&w=2000&q=80)',
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
            onClick={handleReservationClick}
            className="btn-secondary group text-lg"
          >
            Make a Reservation
            <span className="block text-sm text-orange-500 group-hover:text-orange-600 transition-colors">
              Book your table now
            </span>
          </button>
        </div>
      </div>

      {showReservationModal && (
        <div className="reservation-modal">
          <div className="modal-content">
            <button 
              className="close-btn"
              onClick={() => setShowReservationModal(false)}
            >
              ×
            </button>
            <h2>Make a Reservation</h2>
            <form className="reservation-form">
              <input type="text" placeholder="Name" required />
              <input type="email" placeholder="Email" required />
              <input type="tel" placeholder="Phone" required />
              <input type="date" required />
              <input type="time" required />
              <input type="number" placeholder="Number of Guests" min="1" max="10" required />
              <button type="submit">Confirm Reservation</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
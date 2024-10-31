import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { menuItems } from './data/menuItems';
import Navbar from './components/Navbar';
import MenuItem from './components/MenuItem';
import Cart from './components/Cart';
import Hero from './components/Hero';
import Features from './components/Features';
import Footer from './components/Footer';
import Notification from './components/Notification';

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [notification, setNotification] = useState({
    message: '',
    type: 'info',
    isVisible: false
  });

  const showNotification = (message, type = 'info') => {
    setNotification({
      message,
      type,
      isVisible: true
    });
  };

  const hideNotification = () => {
    setNotification(prev => ({ ...prev, isVisible: false }));
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar setIsCartOpen={setIsCartOpen} />
        <Cart isOpen={isCartOpen} setIsOpen={setIsCartOpen} />
        <Hero />
        <Features />
        
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="space-y-16">
            {['mains', 'sides', 'drinks', 'desserts'].map((category) => {
              const items = menuItems.filter((item) => item.category === category);
              if (items.length === 0) return null;

              return (
                <section key={category} className="scroll-mt-20" id={category}>
                  <div className="flex items-center justify-between mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 capitalize">
                      {category}
                    </h2>
                    <div className="h-px bg-orange-200 flex-grow ml-8" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {items.map((item) => (
                      <MenuItem 
                        key={item.id} 
                        item={item} 
                        showNotification={showNotification}
                      />
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        </main>

        <Footer />
        <Notification
          message={notification.message}
          type={notification.type}
          isVisible={notification.isVisible}
          onClose={hideNotification}
        />
      </div>
    </Router>
  );
}

export default App;
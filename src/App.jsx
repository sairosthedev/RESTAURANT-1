import React, { useState } from 'react';
import { menuItems } from './data/menuItems';
import Navbar from './components/Navbar';
import MenuItem from './components/MenuItem';
import Cart from './components/Cart';
import Hero from './components/Hero';
import Features from './components/Features';

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
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
                    <MenuItem key={item.id} item={item} />
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </main>

      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Macdonald Food Bucket</h3>
              <p className="text-gray-400">
                Bringing Zimbabwe's finest comfort food to your table since 2001.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Opening Hours</h3>
              <p className="text-gray-400">Sunday - Friday</p>
              <p className="text-gray-400">10:00 AM - 10:00 PM</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Contact</h3>
              <p className="text-gray-400">123 Main Street</p>
              <p className="text-gray-400">Harare, Zimbabwe</p>
              <p className="text-gray-400">+263 786 033 933</p>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            © {new Date().getFullYear()} Macdonald Food Bucket. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
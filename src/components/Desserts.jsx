import React from 'react';
import MenuItem from './MenuItem';
import { menuItems } from '../data/menuItems';

const Desserts = () => {
  const desserts = menuItems.filter(item => item.category === 'desserts');

  return (
    <section className="py-16 bg-gray-50" id="desserts">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Desserts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {desserts.map((dessert) => (
            <MenuItem key={dessert.id} item={dessert} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Desserts; 
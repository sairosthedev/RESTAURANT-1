import React from 'react';
import { Utensils, Clock, Truck, Award } from 'lucide-react';

const features = [
  {
    icon: Utensils,
    title: 'Fresh Ingredients',
    description: 'We use only the freshest, locally-sourced ingredients in all our dishes.',
    gradient: 'from-orange-500 to-red-500'
  },
  {
    icon: Clock,
    title: 'Fast Service',
    description: 'Quick preparation without compromising on quality.',
    gradient: 'from-orange-500 to-yellow-500'
  },
  {
    icon: Truck,
    title: 'Free Delivery',
    description: 'Free delivery on orders above $30 within Harare.',
    gradient: 'from-orange-500 to-pink-500'
  },
  {
    icon: Award,
    title: 'Best Quality',
    description: 'Winner of Zimbabwe\'s Best Restaurant 2023.',
    gradient: 'from-orange-500 to-purple-500'
  }
];

export default function Features() {
  return (
    <div className="bg-gradient-to-b from-white to-orange-50/30 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 section-header inline-block">
            Why Choose Us
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Experience the perfect blend of traditional Zimbabwean flavors and modern cuisine
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className={`feature-icon-wrapper bg-gradient-to-br ${feature.gradient}`}>
                <feature.icon className="feature-icon" />
              </div>
              <h3 className="text-xl font-semibold mb-2 transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-gray-600 transition-colors duration-300">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
/**
 * @typedef {Object} MenuItem
 * @property {string} id - Unique identifier for the menu item
 * @property {string} name - Name of the menu item
 * @property {string} description - Description of the menu item
 * @property {number} price - Price of the menu item
 * @property {string} image - URL of the menu item's image
 * @property {('mains'|'sides'|'drinks')} category - Category of the menu item
 */

/**
 * Array of menu items
 * @type {MenuItem[]}
 */
export const menuItems = [
  {
    id: '1',
    name: 'Signature Bucket',
    description: 'Our famous crispy fried chicken bucket with special seasoning',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?auto=format&fit=crop&w=800&q=80',
    category: 'mains'
  },
  {
    id: '2',
    name: 'Peri-Peri Wings',
    description: 'Spicy chicken wings with African Peri-Peri sauce',
    price: 12.99,
    image: 'https://images.unsplash.com/photo-1527477396000-e27163b481c2?auto=format&fit=crop&w=800&q=80',
    category: 'mains'
  },
  {
    id: '3',
    name: 'Sadza Platter',
    description: 'Traditional Zimbabwean cornmeal with grilled chicken',
    price: 15.99,
    image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=800&q=80',
    category: 'mains'
  },
  {
    id: '4',
    name: 'African Coleslaw',
    description: 'Fresh cabbage slaw with African spices',
    price: 4.99,
    image: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=800&q=80',
    category: 'sides'
  },
  {
    id: '5',
    name: 'Mazoe Orange',
    description: 'Classic Zimbabwean orange drink',
    price: 2.99,
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80',
    category: 'drinks'
  }
];
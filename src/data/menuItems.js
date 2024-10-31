/**
 * @typedef {Object} MenuItem
 * @property {string} id - Unique identifier for the menu item
 * @property {string} name - Name of the menu item
 * @property {string} description - Description of the menu item
 * @property {number} price - Price of the menu item
 * @property {string} image - URL of the menu item's image
 * @property {('mains'|'sides'|'drinks'|'desserts')} category - Category of the menu item
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
    image: 'https://www.freshproducemea.com/wp-content/uploads/2024/08/Mazoe-Zim.jpg',
    category: 'drinks'
  },
  {
    id: '6',
    name: 'Chocolate Lava Cake',
    description: 'Warm chocolate cake with a molten center, served with vanilla ice cream',
    price: 8.99,
    image: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?auto=format&fit=crop&w=800&q=80',
    category: 'desserts'
  },
  {
    id: '7',
    name: 'New York Cheesecake',
    description: 'Classic creamy cheesecake with graham cracker crust',
    price: 7.99,
    image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=800&q=80',
    category: 'desserts'
  },
  {
    id: '8',
    name: 'Tiramisu',
    description: 'Italian coffee-flavored dessert with layers of mascarpone and ladyfingers',
    price: 8.49,
    image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=800&q=80',
    category: 'desserts'
  },
  {
    id: '9',
    name: 'Apple Pie',
    description: 'Homemade apple pie with a flaky crust, served warm with ice cream',
    price: 6.99,
    image: 'https://images.unsplash.com/photo-1621743478914-cc8a86d7e7b5?auto=format&fit=crop&w=800&q=80',
    category: 'desserts'
  }
];
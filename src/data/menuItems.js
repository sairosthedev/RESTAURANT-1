/**
 * @typedef {Object} MenuItem
 * @property {string} id - Unique identifier for the menu item
 * @property {string} name - Name of the menu item
 * @property {string} description - Description of the menu item
 * @property {number} price - Price of the menu item
 * @property {string} image - URL of the menu item's image
 * @property {('mains'|'sides'|'drinks'|'desserts')} category - Category of the menu item
 * @property {string} prepTime - Preparation time for the menu item
 */

/**
 * Array of menu items
 * @type {MenuItem[]}
 */
export const menuItems = [
  {
    id: '1',
    name: 'Sadza ne Nyama',
    description: 'Traditional Zimbabwean sadza served with tender beef stew, mixed vegetables and gravy',
    price: 15.99,
    image: '/images/menu/sadza-ne-nyama.jpg',
    category: 'mains',
    prepTime: '15-20 min'
  },
  {
    id: '2',
    name: 'Mapopo Candy',
    description: 'Traditional Zimbabwean sweet treat made from papaya/pawpaw',
    price: 4.99,
    image: '/images/menu/mapopo-candy.jpg',
    category: 'desserts',
    prepTime: '5 min'
  },
  {
    id: '3',
    name: 'Muriwo une Dovi',
    description: 'Fresh vegetables cooked with rich homemade peanut butter sauce',
    price: 8.99,
    image: '/images/menu/muriwo-une-dovi.jpg',
    category: 'sides',
    prepTime: '15-20 min'
  },
  {
    id: '4',
    name: 'Mazoe Orange Crush',
    description: 'Iconic Zimbabwean orange drink, perfectly chilled and refreshing',
    price: 2.99,
    image: '/images/menu/mazoe-orange.jpg',
    category: 'drinks',
    prepTime: '2 min'
  },
  {
    id: '5',
    name: 'Sadza ne Hove',
    description: 'Slow-roasted fish with fresh green vegetables and sadza',
    price: 13.99,
    image: '/images/menu/fish-sadza.jpg',
    category: 'mains',
    prepTime: '25-30 min'
  },
  {
    id: '6',
    name: 'Zim-Style Chicken',
    description: 'Grilled chicken marinated in traditional Zimbabwean spices',
    price: 14.99,
    image: '/images/menu/zim-chicken.jpg',
    category: 'mains',
    prepTime: '20-25 min'
  },
  {
    id: '7',
    name: 'Maheu',
    description: 'Traditional non-alcoholic fermented maize drink',
    price: 2.49,
    image: '/images/menu/maheu.jpg',
    category: 'drinks',
    prepTime: '5 min'
  },
  {
    id: '8',
    name: 'Rupiza',
    description: 'Traditional Zimbabwean pumpkin leaves with peanut butter',
    price: 7.99,
    image: '/images/menu/rupiza.jpg',
    category: 'sides',
    prepTime: '15 min'
  },
  {
    id: '9',
    name: 'Chimukuyu',
    description: 'Traditional dried vegetables with peanut butter',
    price: 8.49,
    image: '/images/menu/chimukuyu.jpg',
    category: 'sides',
    prepTime: '15 min'
  },
  {
    id: '10',
    name: 'Madora',
    description: 'Traditional Zimbabwean delicacy of fried mopane worms',
    price: 11.99,
    image: '/images/menu/madora.jpg',
    category: 'mains',
    prepTime: '15-20 min'
  },
  {
    id: '11',
    name: 'Nhopi',
    description: 'Traditional pumpkin dish with peanut butter and brown sugar',
    price: 6.99,
    image: '/images/menu/nhopi.jpg',
    category: 'desserts',
    prepTime: '20 min'
  },
  {
    id: '12',
    name: 'Zim Hot Tea',
    description: 'Traditional Zimbabwean tea served with sugar',
    price: 2.99,
    image: '/images/menu/zim-tea.jpg',
    category: 'drinks',
    prepTime: '5 min'
  }
];
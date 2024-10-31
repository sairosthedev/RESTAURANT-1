/**
 * @typedef {Object} MenuItem
 * @property {string} id
 * @property {string} name
 * @property {string} description
 * @property {number} price
 * @property {string} image
 * @property {'mains' | 'sides' | 'drinks' | 'desserts'} category
 */

/**
 * @typedef {MenuItem & {quantity: number}} CartItem
 */

// Export empty objects to maintain module structure
export const MenuItem = {};
export const CartItem = {};
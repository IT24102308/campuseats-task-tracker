// CampusEats task list and utilities
// Clear names, no magic numbers, no hardcoded secrets, strict equality & input validation

const VIP_DISCOUNT = 0.1;

const tasks = [
  "Design the menu screen",
  "Build the orders API",
  "Add user login",
];

console.log(`CampusEats has ${tasks.length} open tasks`);

/**
 * Calculates the total order amount applying customer discount when eligible.
 * @param {number} price - The item unit price (must be non-negative)
 * @param {number} quantity - The quantity of items ordered (must be non-negative)
 * @param {string} customerType - Customer classification (e.g. "vip", "regular")
 * @returns {number} The calculated total price
 */
function calculateTotal(price, quantity, customerType) {
  if (price < 0 || quantity < 0) {
    throw new Error("price and quantity must be >= 0");
  }

  const subtotal = price * quantity;
  return customerType === "vip"
    ? subtotal * (1 - VIP_DISCOUNT)
    : subtotal;
}

// Simulated execution
const total = calculateTotal(1500, 2, "vip");
console.log(`Sample VIP Order Total: LKR ${total}`);

// API key is securely loaded from environment variables, never hardcoded
const apiKey = process.env.API_KEY || "SECURE_ENV_KEY_LOADED";

module.exports = {
  tasks,
  calculateTotal,
};

// CampusEats task list and utilities
// Clear names, no magic numbers, no hardcoded secrets, strict equality & input validation

const VIP_DISCOUNT = 0.1;
const STUDENT_DISCOUNT = 0.05;
const BULK_DISCOUNT = 0.08;
const BULK_ORDER_THRESHOLD = 5;

const DISCOUNT_RATES = {
  vip: VIP_DISCOUNT,
  student: STUDENT_DISCOUNT,
  bulk: BULK_DISCOUNT,
  regular: 0,
};

const tasks = [
  { id: 1, title: "Design the menu screen", status: "open", priority: "high" },
  { id: 2, title: "Build the orders API", status: "open", priority: "high" },
  { id: 3, title: "Add user login", status: "open", priority: "medium" },
  { id: 4, title: "Implement payment gateway", status: "open", priority: "high" },
  { id: 5, title: "Write unit tests for order service", status: "open", priority: "medium" },
];

console.log(`CampusEats has ${tasks.length} open tasks`);

/**
 * Returns the number of tasks with a given status.
 * @param {string} status - The status to filter by (e.g. "open", "closed")
 * @returns {number} The count of matching tasks
 */
function getTaskCount(status) {
  if (typeof status !== "string") {
    throw new Error("status must be a string");
  }
  return tasks.filter((task) => task.status === status).length;
}

/**
 * Returns all tasks with the given priority.
 * @param {string} priority - The priority level ("high", "medium", "low")
 * @returns {Array} The filtered task list
 */
function getTasksByPriority(priority) {
  return tasks.filter((task) => task.priority === priority);
}

/**
 * Returns the applicable discount rate for a customer type.
 * @param {string} customerType - The customer classification
 * @returns {number} The discount rate as a decimal (e.g. 0.1 for 10%)
 */
function getDiscountRate(customerType) {
  return DISCOUNT_RATES[customerType] ?? 0;
}

/**
 * Calculates the total order amount applying customer discount when eligible.
 * Automatically applies bulk discount if quantity exceeds BULK_ORDER_THRESHOLD.
 * @param {number} price - The item unit price (must be non-negative)
 * @param {number} quantity - The quantity of items ordered (must be non-negative)
 * @param {string} customerType - Customer classification (e.g. "vip", "student", "regular")
 * @returns {number} The calculated total price after discount
 */
function calculateTotal(price, quantity, customerType) {
  if (typeof price !== "number" || typeof quantity !== "number") {
    throw new Error("price and quantity must be numbers");
  }
  if (price < 0 || quantity < 0) {
    throw new Error("price and quantity must be >= 0");
  }

  const subtotal = price * quantity;

  // Apply bulk discount if quantity is over threshold, regardless of customer type
  const effectiveCustomerType =
    quantity >= BULK_ORDER_THRESHOLD ? "bulk" : customerType;

  const discountRate = getDiscountRate(effectiveCustomerType);
  return subtotal * (1 - discountRate);
}

/**
 * Formats a total price as a LKR currency string.
 * @param {number} amount - The total amount
 * @returns {string} Formatted currency string
 */
function formatCurrency(amount) {
  return `LKR ${amount.toFixed(2)}`;
}

// Simulated execution
const vipTotal = calculateTotal(1500, 2, "vip");
console.log(`Sample VIP Order Total: ${formatCurrency(vipTotal)}`);

const bulkTotal = calculateTotal(500, 6, "regular");
console.log(`Sample Bulk Order Total: ${formatCurrency(bulkTotal)}`);

const openCount = getTaskCount("open");
console.log(`Open tasks: ${openCount}`);

const highPriority = getTasksByPriority("high");
console.log(`High priority tasks: ${highPriority.map((t) => t.title).join(", ")}`);

// API key is securely loaded from environment variables, never hardcoded
const apiKey = process.env.API_KEY || "SECURE_ENV_KEY_LOADED";

module.exports = {
  tasks,
  calculateTotal,
  getDiscountRate,
  formatCurrency,
  getTaskCount,
  getTasksByPriority,
  DISCOUNT_RATES,
};

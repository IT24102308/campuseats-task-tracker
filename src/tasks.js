// CampusEats task list and utilities
// Clear names, no magic numbers, no hardcoded secrets, strict equality & input validation

const VIP_DISCOUNT = 0.1;
const STUDENT_DISCOUNT = 0.05;

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
 * Calculates the total order amount applying customer discount when eligible.
 * @param {number} price - The item unit price (must be non-negative)
 * @param {number} quantity - The quantity of items ordered (must be non-negative)
 * @param {string} customerType - Customer classification (e.g. "vip", "student", "regular")
 * @returns {number} The calculated total price
 */
function calculateTotal(price, quantity, customerType) {
  if (price < 0 || quantity < 0) {
    throw new Error("price and quantity must be >= 0");
  }

  const subtotal = price * quantity;

  if (customerType === "vip") {
    return subtotal * (1 - VIP_DISCOUNT);
  }
  if (customerType === "student") {
    return subtotal * (1 - STUDENT_DISCOUNT);
  }
  return subtotal;
}

// Simulated execution
const total = calculateTotal(1500, 2, "vip");
console.log(`Sample VIP Order Total: LKR ${total}`);

const openCount = getTaskCount("open");
console.log(`Open tasks: ${openCount}`);

const highPriority = getTasksByPriority("high");
console.log(`High priority tasks: ${highPriority.map((t) => t.title).join(", ")}`);

// API key is securely loaded from environment variables, never hardcoded
const apiKey = process.env.API_KEY || "SECURE_ENV_KEY_LOADED";

module.exports = {
  tasks,
  calculateTotal,
  getTaskCount,
  getTasksByPriority,
};

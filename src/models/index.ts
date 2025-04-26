import User from "./User";
import Category from "./Category";
import MenuItem from "./MenuItem";
import Order from "./Order";
import OrderItem from "./OrderItem";
import Setting from "./Setting";

// Re-export all models
export { User, Category, MenuItem, Order, OrderItem, Setting };

// Initialize all associations
const initializeAssociations = () => {
  // Category - MenuItem
  Category.hasMany(MenuItem, { foreignKey: "category_id", as: "menuItems" });
  MenuItem.belongsTo(Category, { foreignKey: "category_id", as: "category" });

  // User - Order
  User.hasMany(Order, { foreignKey: "created_by", as: "orders" });
  Order.belongsTo(User, { foreignKey: "created_by", as: "creator" });

  // Order - OrderItem
  Order.hasMany(OrderItem, { foreignKey: "order_id", as: "orderItems" });
  OrderItem.belongsTo(Order, { foreignKey: "order_id", as: "order" });

  // MenuItem - OrderItem
  MenuItem.hasMany(OrderItem, { foreignKey: "menu_item_id", as: "orderItems" });
  OrderItem.belongsTo(MenuItem, { foreignKey: "menu_item_id", as: "menuItem" });
};

initializeAssociations();

export default {
  User,
  Category,
  MenuItem,
  Order,
  OrderItem,
  Setting,
};

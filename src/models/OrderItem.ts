import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database";
import Order from "./Order";
import MenuItem from "./MenuItem";

interface OrderItemAttributes {
  id?: number;
  order_id: number;
  menu_item_id: number;
  quantity: number;
  unit_price: number;
  notes?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface OrderItemCreationAttributes extends OrderItemAttributes {}

class OrderItem
  extends Model<OrderItemAttributes, OrderItemCreationAttributes>
  implements OrderItemAttributes
{
  public id!: number;
  public order_id!: number;
  public menu_item_id!: number;
  public quantity!: number;
  public unit_price!: number;
  public notes?: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

OrderItem.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    order_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Order,
        key: "id",
      },
    },
    menu_item_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: MenuItem,
        key: "id",
      },
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    unit_price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "OrderItem",
    tableName: "order_items",
  },
);

// Define associations
OrderItem.belongsTo(Order, { foreignKey: "order_id", as: "order" });
OrderItem.belongsTo(MenuItem, { foreignKey: "menu_item_id", as: "menuItem" });

Order.hasMany(OrderItem, { foreignKey: "order_id", as: "orderItems" });
MenuItem.hasMany(OrderItem, { foreignKey: "menu_item_id", as: "orderItems" });

export default OrderItem;

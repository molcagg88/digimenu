import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database";
import User from "./User";

interface OrderAttributes {
  id?: number;
  customer_name: string;
  table_number: number;
  status: "pending" | "in_progress" | "ready" | "delivered" | "cancelled";
  total_amount: number;
  notes?: string;
  created_by?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

interface OrderCreationAttributes extends OrderAttributes {}

class Order
  extends Model<OrderAttributes, OrderCreationAttributes>
  implements OrderAttributes
{
  public id!: number;
  public customer_name!: string;
  public table_number!: number;
  public status!:
    | "pending"
    | "in_progress"
    | "ready"
    | "delivered"
    | "cancelled";
  public total_amount!: number;
  public notes?: string;
  public created_by?: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Order.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    customer_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    table_number: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM(
        "pending",
        "in_progress",
        "ready",
        "delivered",
        "cancelled",
      ),
      allowNull: false,
      defaultValue: "pending",
    },
    total_amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0.0,
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    created_by: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: User,
        key: "id",
      },
    },
  },
  {
    sequelize,
    modelName: "Order",
    tableName: "orders",
  },
);

// Define association with User
Order.belongsTo(User, { foreignKey: "created_by", as: "creator" });
User.hasMany(Order, { foreignKey: "created_by", as: "orders" });

export default Order;

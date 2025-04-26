import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database";
import Category from "./Category";

interface MenuItemAttributes {
  id?: number;
  category_id: number;
  name: string;
  description: string;
  price: number;
  image_url: string;
  active: boolean;
  ingredients: string;
  allergens: string;
  display_order: number;
  createdAt?: Date;
  updatedAt?: Date;
}

interface MenuItemCreationAttributes extends MenuItemAttributes {}

class MenuItem
  extends Model<MenuItemAttributes, MenuItemCreationAttributes>
  implements MenuItemAttributes
{
  public id!: number;
  public category_id!: number;
  public name!: string;
  public description!: string;
  public price!: number;
  public image_url!: string;
  public active!: boolean;
  public ingredients!: string;
  public allergens!: string;
  public display_order!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

MenuItem.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Category,
        key: "id",
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    ingredients: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    allergens: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    display_order: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    modelName: "MenuItem",
    tableName: "menu_items",
  },
);

// Define association
MenuItem.belongsTo(Category, { foreignKey: "category_id", as: "category" });
Category.hasMany(MenuItem, { foreignKey: "category_id", as: "menuItems" });

export default MenuItem;

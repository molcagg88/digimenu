import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database";

interface CategoryAttributes {
  id?: number;
  name: string;
  description: string;
  image_url: string;
  active: boolean;
  display_order: number;
  createdAt?: Date;
  updatedAt?: Date;
}

interface CategoryCreationAttributes extends CategoryAttributes {}

class Category
  extends Model<CategoryAttributes, CategoryCreationAttributes>
  implements CategoryAttributes
{
  public id!: number;
  public name!: string;
  public description!: string;
  public image_url!: string;
  public active!: boolean;
  public display_order!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Category.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
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
    display_order: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    modelName: "Category",
    tableName: "categories",
  },
);

export default Category;

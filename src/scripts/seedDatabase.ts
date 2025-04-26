import dotenv from "dotenv";
import sequelize from "../config/database";
import { User, Category, MenuItem, Setting } from "../models";

// Load environment variables
dotenv.config();

/**
 * Seed the database with initial data
 */
const seedDatabase = async () => {
  try {
    // Sync database
    await sequelize.sync({ force: true });
    console.log("Database synced");

    // Create admin user
    const adminUser = await User.create({
      username: "admin",
      email: "admin@restaurant.com",
      password: "admin123", // This will be hashed by the model hook
      role: "admin",
      active: true,
    });
    console.log("Admin user created:", adminUser.username);

    // Create staff user
    const staffUser = await User.create({
      username: "staff",
      email: "staff@restaurant.com",
      password: "staff123", // This will be hashed by the model hook
      role: "staff",
      active: true,
    });
    console.log("Staff user created:", staffUser.username);

    // Create categories
    const categories = await Category.bulkCreate([
      {
        name: "Appetizers",
        description: "Start your meal right",
        image_url:
          "https://images.unsplash.com/photo-1546241072-48010ad2862c?w=500&q=80",
        active: true,
        display_order: 1,
      },
      {
        name: "Main Course",
        description: "Delicious entrees",
        image_url:
          "https://images.unsplash.com/photo-1559847844-5315695dadae?w=500&q=80",
        active: true,
        display_order: 2,
      },
      {
        name: "Desserts",
        description: "Sweet treats",
        image_url:
          "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=500&q=80",
        active: true,
        display_order: 3,
      },
      {
        name: "Beverages",
        description: "Refreshing drinks",
        image_url:
          "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=500&q=80",
        active: true,
        display_order: 4,
      },
    ]);
    console.log(`${categories.length} categories created`);

    // Create menu items
    const menuItems = await MenuItem.bulkCreate([
      {
        category_id: 1, // Appetizers
        name: "Mozzarella Sticks",
        description: "Crispy outside, gooey inside",
        price: 8.99,
        image_url:
          "https://images.unsplash.com/photo-1548340748-6d98e4c1bf77?w=500&q=80",
        active: true,
        ingredients: "Mozzarella cheese, breadcrumbs, eggs",
        allergens: "Dairy, Gluten",
        display_order: 1,
      },
      {
        category_id: 2, // Main Course
        name: "Grilled Salmon",
        description: "Fresh salmon with lemon butter",
        price: 18.99,
        image_url:
          "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=500&q=80",
        active: true,
        ingredients: "Salmon, butter, lemon, herbs",
        allergens: "Fish",
        display_order: 1,
      },
      {
        category_id: 3, // Desserts
        name: "Chocolate Cake",
        description: "Rich and decadent",
        price: 6.99,
        image_url:
          "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&q=80",
        active: true,
        ingredients: "Chocolate, flour, sugar, eggs",
        allergens: "Gluten, Dairy, Eggs",
        display_order: 1,
      },
      {
        category_id: 4, // Beverages
        name: "Fresh Lemonade",
        description: "Freshly squeezed lemons with mint",
        price: 3.99,
        image_url:
          "https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=500&q=80",
        active: true,
        ingredients: "Lemons, sugar, water, mint",
        allergens: "",
        display_order: 1,
      },
    ]);
    console.log(`${menuItems.length} menu items created`);

    // Create default settings
    const settings = await Setting.bulkCreate([
      {
        key: "ordering_enabled",
        value: "true",
        description: "Enable online ordering functionality",
      },
      {
        key: "control_panel_enabled",
        value: "true",
        description: "Enable admin control panel access",
      },
      {
        key: "restaurant_name",
        value: "Digital Restaurant",
        description: "Name of the restaurant",
      },
      {
        key: "restaurant_address",
        value: "123 Main St, Anytown, USA",
        description: "Address of the restaurant",
      },
      {
        key: "restaurant_phone",
        value: "(555) 123-4567",
        description: "Contact phone number",
      },
    ]);
    console.log(`${settings.length} settings created`);

    console.log("Database seeded successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    // Close database connection
    await sequelize.close();
  }
};

// Run the seed function
seedDatabase();

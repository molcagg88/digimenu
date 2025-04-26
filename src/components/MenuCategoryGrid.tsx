import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import MenuItemsList from "./MenuItemsList";

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image_url: string;
  active: boolean;
  ingredients: string;
  allergens: string;
  display_order: number;
}

interface Category {
  id: number;
  name: string;
  description: string;
  image_url: string;
  active: boolean;
  display_order: number;
  items?: MenuItem[];
}

interface MenuCategoryGridProps {
  categories?: Category[];
}

const MenuCategoryGrid: React.FC<MenuCategoryGridProps> = ({
  categories = [],
}) => {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null,
  );

  // Mock data for development purposes
  const mockCategories: Category[] = [
    {
      id: 1,
      name: "Appetizers",
      description: "Start your meal with these delicious options",
      image_url:
        "https://images.unsplash.com/photo-1546241072-48010ad2862c?w=600&q=80",
      active: true,
      display_order: 1,
      items: [
        {
          id: 1,
          name: "Mozzarella Sticks",
          description: "Crispy on the outside, melty on the inside",
          price: 8.99,
          image_url:
            "https://images.unsplash.com/photo-1548340748-6d98e4ee1356?w=400&q=80",
          active: true,
          ingredients: "Mozzarella cheese, breadcrumbs, herbs, marinara sauce",
          allergens: "Dairy, Gluten",
          display_order: 1,
        },
        {
          id: 2,
          name: "Bruschetta",
          description: "Toasted bread topped with tomatoes, garlic, and basil",
          price: 7.99,
          image_url:
            "https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=400&q=80",
          active: true,
          ingredients: "Bread, tomatoes, garlic, basil, olive oil",
          allergens: "Gluten",
          display_order: 2,
        },
      ],
    },
    {
      id: 2,
      name: "Main Courses",
      description: "Hearty and satisfying entrees",
      image_url:
        "https://images.unsplash.com/photo-1544025162-d76694265947?w=600&q=80",
      active: true,
      display_order: 2,
      items: [
        {
          id: 3,
          name: "Grilled Salmon",
          description: "Fresh salmon fillet with lemon herb butter",
          price: 18.99,
          image_url:
            "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=400&q=80",
          active: true,
          ingredients: "Salmon, butter, lemon, herbs, vegetables",
          allergens: "Fish, Dairy",
          display_order: 1,
        },
        {
          id: 4,
          name: "Pasta Primavera",
          description: "Pasta with fresh seasonal vegetables",
          price: 14.99,
          image_url:
            "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=400&q=80",
          active: true,
          ingredients:
            "Pasta, zucchini, bell peppers, carrots, broccoli, cream sauce",
          allergens: "Gluten, Dairy",
          display_order: 2,
        },
      ],
    },
    {
      id: 3,
      name: "Desserts",
      description: "Sweet treats to end your meal",
      image_url:
        "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=600&q=80",
      active: true,
      display_order: 3,
      items: [
        {
          id: 5,
          name: "Chocolate Lava Cake",
          description: "Warm chocolate cake with a molten center",
          price: 6.99,
          image_url:
            "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&q=80",
          active: true,
          ingredients: "Chocolate, flour, eggs, sugar, butter",
          allergens: "Dairy, Eggs, Gluten",
          display_order: 1,
        },
        {
          id: 6,
          name: "Cheesecake",
          description: "Creamy New York style cheesecake",
          price: 7.99,
          image_url:
            "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=400&q=80",
          active: true,
          ingredients: "Cream cheese, sugar, eggs, graham cracker crust",
          allergens: "Dairy, Eggs, Gluten",
          display_order: 2,
        },
      ],
    },
    {
      id: 4,
      name: "Beverages",
      description: "Refreshing drinks to complement your meal",
      image_url:
        "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=600&q=80",
      active: true,
      display_order: 4,
      items: [
        {
          id: 7,
          name: "Fresh Lemonade",
          description: "Freshly squeezed lemons with a hint of mint",
          price: 3.99,
          image_url:
            "https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=400&q=80",
          active: true,
          ingredients: "Lemons, sugar, water, mint",
          allergens: "",
          display_order: 1,
        },
        {
          id: 8,
          name: "Iced Coffee",
          description: "Cold brewed coffee served over ice",
          price: 4.99,
          image_url:
            "https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=400&q=80",
          active: true,
          ingredients: "Coffee, ice, optional: milk, sugar",
          allergens: "Optional: Dairy",
          display_order: 2,
        },
      ],
    },
  ];

  const displayCategories = categories.length > 0 ? categories : mockCategories;

  const handleCategoryClick = (category: Category) => {
    setSelectedCategory(category === selectedCategory ? null : category);
  };

  return (
    <div className="bg-background p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">Our Menu</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {displayCategories.map((category) => (
          <Card
            key={category.id}
            className={`overflow-hidden transition-all duration-300 hover:shadow-lg ${selectedCategory?.id === category.id ? "ring-2 ring-primary" : ""}`}
          >
            <div className="relative h-48 overflow-hidden">
              <img
                src={category.image_url}
                alt={category.name}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
            <CardContent className="p-4">
              <h3 className="text-xl font-semibold mb-2">{category.name}</h3>
              <p className="text-muted-foreground mb-4">
                {category.description}
              </p>
              <Button
                onClick={() => handleCategoryClick(category)}
                variant={
                  selectedCategory?.id === category.id ? "default" : "outline"
                }
                className="w-full"
              >
                {selectedCategory?.id === category.id
                  ? "Hide Items"
                  : "View Items"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedCategory && (
        <div className="mt-8 animate-in fade-in-50 duration-300">
          <h3 className="text-2xl font-bold mb-4">{selectedCategory.name}</h3>
          <MenuItemsList items={selectedCategory.items || []} />
        </div>
      )}
    </div>
  );
};

export default MenuCategoryGrid;

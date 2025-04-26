import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Plus, Minus, Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image_url: string;
  ingredients: string[];
  allergens: string[];
  active: boolean;
}

interface MenuItemsListProps {
  categoryId?: number;
  items?: MenuItem[];
  onAddToOrder?: (item: MenuItem, quantity: number) => void;
}

const MenuItemsList = ({
  categoryId = 1,
  items = defaultItems,
  onAddToOrder = () => {},
}: MenuItemsListProps) => {
  const [quantities, setQuantities] = useState<Record<number, number>>({});

  const handleIncrement = (itemId: number) => {
    setQuantities((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }));
  };

  const handleDecrement = (itemId: number) => {
    if ((quantities[itemId] || 0) > 0) {
      setQuantities((prev) => ({
        ...prev,
        [itemId]: prev[itemId] - 1,
      }));
    }
  };

  const handleAddToOrder = (item: MenuItem) => {
    const quantity = quantities[item.id] || 0;
    if (quantity > 0) {
      onAddToOrder(item, quantity);
      // Reset quantity after adding to order
      setQuantities((prev) => ({
        ...prev,
        [item.id]: 0,
      }));
    }
  };

  return (
    <div className="w-full bg-background p-4">
      <h2 className="text-2xl font-bold mb-4">Menu Items</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <Card key={item.id} className="overflow-hidden">
            <div className="h-48 overflow-hidden">
              <img
                src={item.image_url}
                alt={item.name}
                className="w-full h-full object-cover"
              />
            </div>
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle>{item.name}</CardTitle>
                <div className="text-lg font-bold">
                  ${item.price.toFixed(2)}
                </div>
              </div>
              <CardDescription>{item.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-2">
                <span className="text-sm font-medium">Ingredients:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {item.ingredients.map((ingredient, idx) => (
                    <Badge key={idx} variant="outline">
                      {ingredient}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-sm font-medium">Allergens:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {item.allergens.length > 0 ? (
                    item.allergens.map((allergen, idx) => (
                      <Badge key={idx} variant="destructive">
                        {allergen}
                      </Badge>
                    ))
                  ) : (
                    <span className="text-sm text-muted-foreground">
                      None listed
                    </span>
                  )}
                </div>
              </div>
            </CardContent>
            <Separator />
            <CardFooter className="flex justify-between items-center p-4">
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleDecrement(item.id)}
                  disabled={(quantities[item.id] || 0) === 0}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-8 text-center">
                  {quantities[item.id] || 0}
                </span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleIncrement(item.id)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex items-center space-x-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <Info className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>View detailed nutritional information</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <Button
                  onClick={() => handleAddToOrder(item)}
                  disabled={(quantities[item.id] || 0) === 0}
                >
                  Add to Order
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

// Default items for demonstration
const defaultItems: MenuItem[] = [
  {
    id: 1,
    name: "Classic Burger",
    description: "Juicy beef patty with lettuce, tomato, and special sauce",
    price: 12.99,
    image_url:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80",
    ingredients: ["Beef", "Lettuce", "Tomato", "Onion", "Special Sauce"],
    allergens: ["Gluten", "Dairy"],
    active: true,
  },
  {
    id: 2,
    name: "Margherita Pizza",
    description: "Traditional pizza with tomato sauce, mozzarella, and basil",
    price: 14.99,
    image_url:
      "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=800&q=80",
    ingredients: ["Dough", "Tomato Sauce", "Mozzarella", "Basil", "Olive Oil"],
    allergens: ["Gluten", "Dairy"],
    active: true,
  },
  {
    id: 3,
    name: "Caesar Salad",
    description:
      "Fresh romaine lettuce with Caesar dressing, croutons, and parmesan",
    price: 9.99,
    image_url:
      "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=800&q=80",
    ingredients: ["Romaine Lettuce", "Croutons", "Parmesan", "Caesar Dressing"],
    allergens: ["Gluten", "Dairy", "Eggs"],
    active: true,
  },
  {
    id: 4,
    name: "Veggie Bowl",
    description:
      "Healthy mix of quinoa, roasted vegetables, and tahini dressing",
    price: 11.99,
    image_url:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80",
    ingredients: ["Quinoa", "Roasted Vegetables", "Avocado", "Tahini Dressing"],
    allergens: ["Sesame"],
    active: true,
  },
  {
    id: 5,
    name: "Chocolate Brownie",
    description: "Rich chocolate brownie with vanilla ice cream",
    price: 6.99,
    image_url:
      "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800&q=80",
    ingredients: ["Chocolate", "Flour", "Sugar", "Eggs", "Butter"],
    allergens: ["Gluten", "Dairy", "Eggs"],
    active: true,
  },
  {
    id: 6,
    name: "Fresh Fruit Smoothie",
    description: "Blend of seasonal fruits with yogurt and honey",
    price: 5.99,
    image_url:
      "https://images.unsplash.com/photo-1505252585461-04db1eb84625?w=800&q=80",
    ingredients: ["Mixed Berries", "Banana", "Yogurt", "Honey"],
    allergens: ["Dairy"],
    active: true,
  },
];

export default MenuItemsList;

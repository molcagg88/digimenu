import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ShoppingCart, Menu, User } from "lucide-react";
import MenuCategoryGrid from "./MenuCategoryGrid";
import OrderSummary from "./OrderSummary";

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image_url: string;
  ingredients: string[];
  allergens: string[];
}

interface Category {
  id: number;
  name: string;
  description: string;
  image_url: string;
  items: MenuItem[];
}

interface OrderItem {
  menuItem: MenuItem;
  quantity: number;
}

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [showOrderSummary, setShowOrderSummary] = useState(false);

  // Mock data for categories
  const categories: Category[] = [
    {
      id: 1,
      name: "Appetizers",
      description: "Start your meal with these delicious options",
      image_url:
        "https://images.unsplash.com/photo-1546241072-48010ad2862c?w=800&q=80",
      items: [
        {
          id: 101,
          name: "Mozzarella Sticks",
          description: "Crispy on the outside, melty on the inside",
          price: 8.99,
          image_url:
            "https://images.unsplash.com/photo-1548340748-6d98e4c1bf28?w=800&q=80",
          ingredients: ["Mozzarella cheese", "Breadcrumbs", "Herbs"],
          allergens: ["Dairy", "Gluten"],
        },
        {
          id: 102,
          name: "Bruschetta",
          description: "Toasted bread topped with tomatoes, garlic, and basil",
          price: 7.99,
          image_url:
            "https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=800&q=80",
          ingredients: ["Bread", "Tomatoes", "Garlic", "Basil", "Olive oil"],
          allergens: ["Gluten"],
        },
      ],
    },
    {
      id: 2,
      name: "Main Courses",
      description: "Hearty and satisfying entrées",
      image_url:
        "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=80",
      items: [
        {
          id: 201,
          name: "Grilled Salmon",
          description: "Fresh salmon fillet with lemon butter sauce",
          price: 18.99,
          image_url:
            "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=800&q=80",
          ingredients: ["Salmon", "Butter", "Lemon", "Herbs"],
          allergens: ["Fish", "Dairy"],
        },
        {
          id: 202,
          name: "Pasta Primavera",
          description: "Pasta with fresh seasonal vegetables",
          price: 14.99,
          image_url:
            "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=800&q=80",
          ingredients: [
            "Pasta",
            "Zucchini",
            "Bell peppers",
            "Carrots",
            "Olive oil",
          ],
          allergens: ["Gluten"],
        },
      ],
    },
    {
      id: 3,
      name: "Desserts",
      description: "Sweet treats to end your meal",
      image_url:
        "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=800&q=80",
      items: [
        {
          id: 301,
          name: "Chocolate Lava Cake",
          description: "Warm chocolate cake with a molten center",
          price: 7.99,
          image_url:
            "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800&q=80",
          ingredients: ["Chocolate", "Flour", "Sugar", "Eggs", "Butter"],
          allergens: ["Dairy", "Eggs", "Gluten"],
        },
        {
          id: 302,
          name: "Cheesecake",
          description: "Creamy New York style cheesecake",
          price: 6.99,
          image_url:
            "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=800&q=80",
          ingredients: ["Cream cheese", "Sugar", "Eggs", "Graham crackers"],
          allergens: ["Dairy", "Eggs", "Gluten"],
        },
      ],
    },
    {
      id: 4,
      name: "Beverages",
      description: "Refreshing drinks to complement your meal",
      image_url:
        "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=800&q=80",
      items: [
        {
          id: 401,
          name: "Fresh Lemonade",
          description: "Freshly squeezed lemons with a hint of mint",
          price: 3.99,
          image_url:
            "https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=800&q=80",
          ingredients: ["Lemons", "Sugar", "Water", "Mint"],
          allergens: [],
        },
        {
          id: 402,
          name: "Iced Coffee",
          description: "Cold brewed coffee served over ice",
          price: 4.99,
          image_url:
            "https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=800&q=80",
          ingredients: ["Coffee", "Ice", "Optional: milk"],
          allergens: ["Optional: dairy"],
        },
      ],
    },
  ];

  const handleAddToOrder = (item: MenuItem, quantity: number) => {
    const existingItemIndex = orderItems.findIndex(
      (orderItem) => orderItem.menuItem.id === item.id,
    );

    if (existingItemIndex >= 0) {
      const updatedOrderItems = [...orderItems];
      updatedOrderItems[existingItemIndex].quantity += quantity;
      setOrderItems(updatedOrderItems);
    } else {
      setOrderItems([...orderItems, { menuItem: item, quantity }]);
    }
  };

  const handleUpdateQuantity = (itemId: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      setOrderItems(orderItems.filter((item) => item.menuItem.id !== itemId));
    } else {
      setOrderItems(
        orderItems.map((item) =>
          item.menuItem.id === itemId
            ? { ...item, quantity: newQuantity }
            : item,
        ),
      );
    }
  };

  const handleRemoveItem = (itemId: number) => {
    setOrderItems(orderItems.filter((item) => item.menuItem.id !== itemId));
  };

  const calculateTotal = () => {
    return orderItems.reduce(
      (total, item) => total + item.menuItem.price * item.quantity,
      0,
    );
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background border-b border-border shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Menu className="h-6 w-6" />
            <h1 className="text-2xl font-bold">Digital Menu</h1>
          </div>

          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setShowOrderSummary(!showOrderSummary)}
              className="relative"
            >
              <ShoppingCart className="h-5 w-5" />
              {orderItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full w-5 h-5 text-xs flex items-center justify-center">
                  {orderItems.reduce((total, item) => total + item.quantity, 0)}
                </span>
              )}
            </Button>
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 flex flex-col md:flex-row gap-6">
        {/* Menu Section */}
        <div className={`flex-1 ${showOrderSummary ? "md:w-2/3" : "w-full"}`}>
          <Tabs defaultValue="menu" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="menu">Menu</TabsTrigger>
              <TabsTrigger value="specials">Daily Specials</TabsTrigger>
              <TabsTrigger value="popular">Most Popular</TabsTrigger>
            </TabsList>

            <TabsContent value="menu" className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-semibold mb-6">Our Menu</h2>
                  <MenuCategoryGrid
                    categories={categories}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                    onAddToOrder={handleAddToOrder}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="specials">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-semibold mb-4">
                    Today's Specials
                  </h2>
                  <p className="text-muted-foreground">
                    Check back later for our daily specials!
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="popular">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-semibold mb-4">
                    Customer Favorites
                  </h2>
                  <p className="text-muted-foreground">
                    Our most popular items will appear here!
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Order Summary Sidebar */}
        {showOrderSummary && (
          <div className="md:w-1/3 w-full">
            <OrderSummary
              orderItems={orderItems}
              onUpdateQuantity={handleUpdateQuantity}
              onRemoveItem={handleRemoveItem}
              total={calculateTotal()}
            />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-muted py-6 border-t border-border mt-auto">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2023 Digital Menu System. All rights reserved.</p>
          <p className="mt-2">Powered by PERN Stack</p>
        </div>
      </footer>
    </div>
  );
}

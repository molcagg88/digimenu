import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  PlusCircle,
  Edit,
  Trash2,
  Search,
  RefreshCw,
  LogOut,
  BarChart3,
} from "lucide-react";
import DashboardMetrics from "./DashboardMetrics";

interface Category {
  id: number;
  name: string;
  description: string;
  image_url: string;
  active: boolean;
  display_order: number;
}

interface MenuItem {
  id: number;
  category_id: number;
  name: string;
  description: string;
  price: number;
  image_url: string;
  active: boolean;
  ingredients: string;
  allergens: string;
  display_order: number;
}

interface Order {
  id: number;
  customer_name: string;
  table_number: number;
  status: string;
  total_amount: number;
  created_at: string;
  updated_at: string;
}

const AdminDashboard: React.FC = () => {
  const [isAddCategoryDialogOpen, setIsAddCategoryDialogOpen] = useState(true);
  const [isAddMenuItemDialogOpen, setIsAddMenuItemDialogOpen] = useState(false);

  // Mock data for demonstration
  const categories: Category[] = [
    {
      id: 1,
      name: "Appetizers",
      description: "Start your meal right",
      image_url:
        "https://images.unsplash.com/photo-1546241072-48010ad2862c?w=500&q=80",
      active: true,
      display_order: 1,
    },
    {
      id: 2,
      name: "Main Course",
      description: "Delicious entrees",
      image_url:
        "https://images.unsplash.com/photo-1559847844-5315695dadae?w=500&q=80",
      active: true,
      display_order: 2,
    },
    {
      id: 3,
      name: "Desserts",
      description: "Sweet treats",
      image_url:
        "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=500&q=80",
      active: true,
      display_order: 3,
    },
  ];

  const menuItems: MenuItem[] = [
    {
      id: 1,
      category_id: 1,
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
      id: 2,
      category_id: 2,
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
      id: 3,
      category_id: 3,
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
  ];

  const orders: Order[] = [
    {
      id: 1,
      customer_name: "Table 5",
      table_number: 5,
      status: "Pending",
      total_amount: 34.97,
      created_at: "2023-06-15T14:30:00Z",
      updated_at: "2023-06-15T14:30:00Z",
    },
    {
      id: 2,
      customer_name: "Table 8",
      table_number: 8,
      status: "In Progress",
      total_amount: 52.45,
      created_at: "2023-06-15T14:15:00Z",
      updated_at: "2023-06-15T14:20:00Z",
    },
    {
      id: 3,
      customer_name: "Table 3",
      table_number: 3,
      status: "Completed",
      total_amount: 27.98,
      created_at: "2023-06-15T13:45:00Z",
      updated_at: "2023-06-15T14:10:00Z",
    },
  ];

  return (
    <div className="bg-background min-h-screen p-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Restaurant Admin Dashboard</h1>
        <p className="text-muted-foreground">Manage your menu and orders</p>
      </header>

      <Tabs defaultValue="categories">
        <TabsList className="mb-6">
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="menu-items">Menu Items</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        {/* Categories Tab */}
        <TabsContent value="categories">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Menu Categories</h2>
            <Dialog
              open={isAddCategoryDialogOpen}
              onOpenChange={setIsAddCategoryDialogOpen}
            >
              <DialogTrigger asChild>
                <Button>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add Category
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Category</DialogTitle>
                  <DialogDescription>
                    Create a new menu category. Click save when you're done.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Name
                    </Label>
                    <Input
                      id="name"
                      className="col-span-3"
                      placeholder="e.g. Appetizers"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="description" className="text-right">
                      Description
                    </Label>
                    <Textarea
                      id="description"
                      className="col-span-3"
                      placeholder="Brief description of this category"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="image" className="text-right">
                      Image URL
                    </Label>
                    <Input
                      id="image"
                      className="col-span-3"
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="order" className="text-right">
                      Display Order
                    </Label>
                    <Input
                      id="order"
                      type="number"
                      className="col-span-3"
                      placeholder="1"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="active" className="text-right">
                      Active
                    </Label>
                    <div className="col-span-3">
                      <Switch id="active" defaultChecked />
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setIsAddCategoryDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">Save Category</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <Card key={category.id}>
                <div className="aspect-video w-full overflow-hidden rounded-t-lg">
                  <img
                    src={category.image_url}
                    alt={category.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{category.name}</CardTitle>
                      <CardDescription>{category.description}</CardDescription>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-muted-foreground">
                        Display Order: {category.display_order}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-muted-foreground">
                        Status:
                      </span>
                      <span
                        className={`text-sm ${category.active ? "text-green-500" : "text-red-500"}`}
                      >
                        {category.active ? "Active" : "Inactive"}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Menu Items Tab */}
        <TabsContent value="menu-items">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Menu Items</h2>
            <Dialog
              open={isAddMenuItemDialogOpen}
              onOpenChange={setIsAddMenuItemDialogOpen}
            >
              <DialogTrigger asChild>
                <Button>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add Menu Item
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Add New Menu Item</DialogTitle>
                  <DialogDescription>
                    Create a new menu item. Fill in all the details and click
                    save when you're done.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="item-name" className="text-right">
                      Name
                    </Label>
                    <Input
                      id="item-name"
                      className="col-span-3"
                      placeholder="e.g. Grilled Salmon"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="item-category" className="text-right">
                      Category
                    </Label>
                    <Select>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem
                            key={category.id}
                            value={category.id.toString()}
                          >
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="item-description" className="text-right">
                      Description
                    </Label>
                    <Textarea
                      id="item-description"
                      className="col-span-3"
                      placeholder="Brief description of this item"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="item-price" className="text-right">
                      Price
                    </Label>
                    <Input
                      id="item-price"
                      type="number"
                      step="0.01"
                      className="col-span-3"
                      placeholder="9.99"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="item-image" className="text-right">
                      Image URL
                    </Label>
                    <Input
                      id="item-image"
                      className="col-span-3"
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="item-ingredients" className="text-right">
                      Ingredients
                    </Label>
                    <Textarea
                      id="item-ingredients"
                      className="col-span-3"
                      placeholder="Comma separated list of ingredients"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="item-allergens" className="text-right">
                      Allergens
                    </Label>
                    <Textarea
                      id="item-allergens"
                      className="col-span-3"
                      placeholder="Comma separated list of allergens"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="item-order" className="text-right">
                      Display Order
                    </Label>
                    <Input
                      id="item-order"
                      type="number"
                      className="col-span-3"
                      placeholder="1"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="item-active" className="text-right">
                      Active
                    </Label>
                    <div className="col-span-3">
                      <Switch id="item-active" defaultChecked />
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setIsAddMenuItemDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">Save Menu Item</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <div className="bg-card rounded-lg border shadow">
            <div className="p-4 flex justify-between items-center border-b">
              <div className="flex items-center space-x-2">
                <Select>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map((category) => (
                      <SelectItem
                        key={category.id}
                        value={category.id.toString()}
                      >
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search menu items..."
                  className="w-[300px] pl-8"
                />
              </div>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Image</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {menuItems.map((item) => {
                  const category = categories.find(
                    (c) => c.id === item.category_id,
                  );
                  return (
                    <TableRow key={item.id}>
                      <TableCell>
                        <div className="h-10 w-10 rounded overflow-hidden">
                          <img
                            src={item.image_url}
                            alt={item.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{item.name}</TableCell>
                      <TableCell>{category?.name}</TableCell>
                      <TableCell>${item.price.toFixed(2)}</TableCell>
                      <TableCell>
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${item.active ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
                        >
                          {item.active ? "Active" : "Inactive"}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        {/* Orders Tab */}
        <TabsContent value="orders">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Orders</h2>
            <Button variant="outline">
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh
            </Button>
          </div>

          <div className="bg-card rounded-lg border shadow">
            <div className="p-4 flex justify-between items-center border-b">
              <div className="flex items-center space-x-2">
                <Select>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Order Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search orders..."
                  className="w-[300px] pl-8"
                />
              </div>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Table</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">#{order.id}</TableCell>
                    <TableCell>Table {order.table_number}</TableCell>
                    <TableCell>
                      <Select
                        defaultValue={order.status
                          .toLowerCase()
                          .replace(" ", "-")}
                      >
                        <SelectTrigger className="w-[130px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="in-progress">
                            In Progress
                          </SelectItem>
                          <SelectItem value="completed">Completed</SelectItem>
                          <SelectItem value="cancelled">Cancelled</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>${order.total_amount.toFixed(2)}</TableCell>
                    <TableCell>
                      {new Date(order.created_at).toLocaleString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>System Settings</CardTitle>
              <CardDescription>
                Configure system-wide settings for your restaurant menu system.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between space-x-2">
                <div className="space-y-0.5">
                  <Label htmlFor="ordering-enabled">
                    Enable Online Ordering
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Allow customers to place orders through the digital menu.
                  </p>
                </div>
                <Switch id="ordering-enabled" defaultChecked />
              </div>
              <div className="flex items-center justify-between space-x-2">
                <div className="space-y-0.5">
                  <Label htmlFor="control-panel-enabled">
                    Enable Control Panel
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Allow staff to access the admin control panel.
                  </p>
                </div>
                <Switch id="control-panel-enabled" defaultChecked />
              </div>
              <div className="pt-4 border-t">
                <h3 className="text-lg font-medium mb-4">User Management</h3>
                <div className="flex justify-end mb-4">
                  <Button>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add User
                  </Button>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Username</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">admin</TableCell>
                      <TableCell>admin@restaurant.com</TableCell>
                      <TableCell>Administrator</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">staff</TableCell>
                      <TableCell>staff@restaurant.com</TableCell>
                      <TableCell>Staff</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <DashboardMetrics />
    </div>
  );
};

export default AdminDashboard;

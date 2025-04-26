import React, { useState } from "react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { Separator } from "./ui/separator";
import { Badge } from "./ui/badge";
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import { ScrollArea } from "./ui/scroll-area";

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  notes?: string;
}

interface OrderSummaryProps {
  items?: OrderItem[];
  onQuantityChange?: (id: string, quantity: number) => void;
  onRemoveItem?: (id: string) => void;
  onSubmitOrder?: (tableNumber: string) => void;
}

const OrderSummary = ({
  items = [
    { id: "1", name: "Margherita Pizza", price: 12.99, quantity: 1 },
    { id: "2", name: "Caesar Salad", price: 8.99, quantity: 2 },
    { id: "3", name: "Garlic Bread", price: 4.99, quantity: 1 },
  ],
  onQuantityChange = () => {},
  onRemoveItem = () => {},
  onSubmitOrder = () => {},
}: OrderSummaryProps) => {
  const [tableNumber, setTableNumber] = useState("");
  const [orderStatus, setOrderStatus] = useState<
    "pending" | "submitted" | "processing" | "ready"
  >("pending");

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + tax;

  const handleSubmitOrder = () => {
    if (!tableNumber.trim()) {
      alert("Please enter a table number");
      return;
    }

    onSubmitOrder(tableNumber);
    setOrderStatus("submitted");

    // Simulate order processing
    setTimeout(() => setOrderStatus("processing"), 2000);
    setTimeout(() => setOrderStatus("ready"), 5000);
  };

  const getStatusBadge = () => {
    switch (orderStatus) {
      case "submitted":
        return <Badge variant="secondary">Order Submitted</Badge>;
      case "processing":
        return <Badge variant="default">Processing</Badge>;
      case "ready":
        return (
          <Badge variant="default" className="bg-green-600">
            Ready for Pickup
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <Card className="w-full max-w-sm bg-white shadow-lg h-full flex flex-col">
      <CardHeader className="bg-primary text-primary-foreground">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag size={20} />
            <span>Your Order</span>
          </div>
          {getStatusBadge()}
        </CardTitle>
      </CardHeader>

      <ScrollArea className="flex-grow">
        <CardContent className="pt-6">
          {items.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <ShoppingBag className="mx-auto mb-2" size={32} />
              <p>Your order is empty</p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between items-start">
                  <div className="flex-1">
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-muted-foreground">
                      ${item.price.toFixed(2)}
                    </p>
                    {item.notes && (
                      <p className="text-xs italic mt-1">{item.notes}</p>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-7 w-7"
                      onClick={() =>
                        onQuantityChange(
                          item.id,
                          Math.max(1, item.quantity - 1),
                        )
                      }
                    >
                      <Minus size={14} />
                    </Button>

                    <span className="w-6 text-center">{item.quantity}</span>

                    <Button
                      variant="outline"
                      size="icon"
                      className="h-7 w-7"
                      onClick={() =>
                        onQuantityChange(item.id, item.quantity + 1)
                      }
                    >
                      <Plus size={14} />
                    </Button>

                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 text-red-500 hover:text-red-700 hover:bg-red-50"
                      onClick={() => onRemoveItem(item.id)}
                    >
                      <Trash2 size={14} />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {items.length > 0 && (
            <div className="mt-6 space-y-4">
              <Separator />

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Tax (8%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <label htmlFor="table-number" className="text-sm font-medium">
                  Table Number
                </label>
                <Input
                  id="table-number"
                  placeholder="Enter table number"
                  value={tableNumber}
                  onChange={(e) => setTableNumber(e.target.value)}
                  disabled={orderStatus !== "pending"}
                />
              </div>
            </div>
          )}
        </CardContent>
      </ScrollArea>

      <CardFooter className="border-t bg-muted/20 p-4">
        <Button
          className="w-full"
          disabled={items.length === 0 || orderStatus !== "pending"}
          onClick={handleSubmitOrder}
        >
          {orderStatus === "pending" ? "Place Order" : "Order Placed"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default OrderSummary;

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
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useShoppingCart } from "@/context/ShoppingCartContext";

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

interface MenuItemCardProps {
  item: MenuItem;
}

const MenuItemCard: React.FC<MenuItemCardProps> = ({ item }) => {
  const [quantity, setQuantity] = useState(0);
  const [specialInstructions, setSpecialInstructions] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { addItem, getItemQuantity } = useShoppingCart();

  const handleIncrement = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecrement = () => {
    if (quantity > 0) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleAddToCart = () => {
    if (quantity > 0) {
      addItem(
        {
          id: item.id,
          name: item.name,
          price: item.price,
          image_url: item.image_url,
          specialInstructions: specialInstructions.trim() || undefined,
        },
        quantity,
      );
      setQuantity(0);
      setSpecialInstructions("");
      setIsDialogOpen(false);
    }
  };

  return (
    <Card className="overflow-hidden h-full flex flex-col">
      <div className="h-48 overflow-hidden">
        <img
          src={item.image_url}
          alt={item.name}
          className="w-full h-full object-cover"
        />
      </div>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{item.name}</CardTitle>
          <div className="text-lg font-bold">${item.price.toFixed(2)}</div>
        </div>
        <CardDescription className="line-clamp-2">
          {item.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-2 flex-grow">
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
              <span className="text-sm text-muted-foreground">None listed</span>
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
            onClick={handleDecrement}
            disabled={quantity === 0}
          >
            <Minus className="h-4 w-4" />
          </Button>
          <span className="w-8 text-center">{quantity}</span>
          <Button variant="outline" size="icon" onClick={handleIncrement}>
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex items-center space-x-2">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="ghost" size="icon">
                <Info className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{item.name}</DialogTitle>
                <DialogDescription>{item.description}</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div>
                  <h4 className="text-sm font-medium mb-2">
                    Special Instructions
                  </h4>
                  <Textarea
                    placeholder="Any special requests or allergies?"
                    value={specialInstructions}
                    onChange={(e) => setSpecialInstructions(e.target.value)}
                    className="min-h-[100px]"
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <Button onClick={handleAddToCart} disabled={quantity === 0}>
                  Add to Order
                </Button>
              </div>
            </DialogContent>
          </Dialog>
          <Button onClick={handleAddToCart} disabled={quantity === 0}>
            Add to Order
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default MenuItemCard;

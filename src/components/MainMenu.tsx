import React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface MainMenuProps {
  className?: string;
}

const MainMenu: React.FC<MainMenuProps> = ({ className }) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className={className}>
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[400px]">
        <SheetHeader>
          <SheetTitle className="text-2xl font-bold">Digital Menu</SheetTitle>
        </SheetHeader>
        <div className="py-6">
          <nav className="flex flex-col space-y-1">
            <Button variant="ghost" className="justify-start">
              Home
            </Button>
            <Button variant="ghost" className="justify-start">
              Menu
            </Button>
            <Button variant="ghost" className="justify-start">
              Daily Specials
            </Button>
            <Button variant="ghost" className="justify-start">
              Most Popular
            </Button>
            <Separator className="my-2" />
            <Button variant="ghost" className="justify-start">
              About Us
            </Button>
            <Button variant="ghost" className="justify-start">
              Contact
            </Button>
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MainMenu;

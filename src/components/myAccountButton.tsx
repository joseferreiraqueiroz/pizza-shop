import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import { CaretDown, DeviceMobile, SignOut } from "phosphor-react";
export function MyAccountButton() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button className="flex items-center gap-2" variant="outline">
            Minha conta
            <CaretDown/>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="mt-4 w-56">
        <DropdownMenuLabel className="flex flex-col">
            <span>José ítalo</span>
            <span className="text-sm text-muted-foreground">@joseferreira@gmail.com</span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
            <DeviceMobile size={20} weight="bold"/>
            <span>Perfil da loja</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="text-rose-500 dark:text-rose-400 cursor-pointer">
            <SignOut size={20} weight="bold" className="text-rose-500 dark:text-rose-400"/>
            <span>Billing</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu> 
  );
}

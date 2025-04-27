import { Separator } from "@radix-ui/react-separator";
import { ForkKnife, HouseLine, Pizza } from "phosphor-react";
import { NavLink } from "./navLink";
import { ModeToggle } from "./theme/theme-toggle";
import { MyAccountButton } from "./myAccountButton";

export function Header() {
  return (
    <div className="border-b">
      <div className="h-18 flex items-center p-6 gap-8">
        <Pizza className="w-7 h-7"/>
        <Separator orientation="vertical" className="h-8 border-[1px]"/>
        <div className="flex items-center gap-3 text-[14px] text-muted-foreground">
            <NavLink to="/">
              <HouseLine className="w-4 h-4" weight="bold"/>
              <span>Início</span>
            </NavLink>
            <NavLink to="/order">
              <ForkKnife className="w-4 h-4" weight="bold"/>
              <span>Pedidos</span>
            </NavLink>
          </div>
          <div className="flex items-center gap-3 ml-auto">
              <ModeToggle/>
              <MyAccountButton/>
          </div>
        </div>
    </div>
  );
}

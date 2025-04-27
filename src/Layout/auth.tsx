import { Outlet } from "react-router-dom";
import { Pizza } from 'phosphor-react'

export function AuthLayout(){
    return(
        <div className="grid grid-cols-2 min-h-screen antialiased">
        <div className="bg-muted border-r border-foreground/5 h-full flex flex-col justify-between p-8 text-muted-foreground">
            <div className="flex items-center gap-3 text-foreground">
                <Pizza className="w-5 h-5"/>
                <h2 className="font-semibold">Pizza Shop</h2>
            </div>
            <footer>
                <span className="text-sm">Painel do parceiro &copy; Pizza Shop - {new Date().getFullYear()}</span>
            </footer>
        </div>
        <div className="relative">
            <Outlet/>
        </div>
    </div>
    )   
}
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
import { useMutation, useQuery } from "@tanstack/react-query";
import { SignOutFn } from "@/api/signin-out";
import { getProfile } from "@/api/get-profile";
import { getManagerRestaurant } from "@/api/get-manager-restaurant";
import { Skeleton } from "./ui/skeleton";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { Dialog } from "./ui/dialog";
import { StoreProfileDialog } from "./store-profile-dialog";
import { useNavigate } from "react-router-dom";
export function MyAccountButton() {

  const navigate = useNavigate()

  const {data: profile, isLoading: isLoadingProfile} = useQuery({
    queryKey: ['get-profile'],
    queryFn: getProfile
  })
  
  const {data: restaurantData, isLoading: isLoadingManagedRestaurant} = useQuery({
    queryKey: ['get-restaurant-data'],
    queryFn: getManagerRestaurant
  })

  const {mutateAsync: signinOutFn, isPending: isSigninOut} = useMutation({
    mutationFn: SignOutFn,
    onSuccess: () =>{
      navigate('/auth/signin', {replace: true})
    }
  })

  return (
    <Dialog>
    <DropdownMenu>
      <DropdownMenuTrigger>
  <Button className="flex items-center gap-2" variant="outline">
    {isLoadingManagedRestaurant ? (
      <Skeleton className="h-4 w-40"/>
    ) : (
      <>
        {restaurantData?.name}
        <CaretDown />
      </>
    )}
  </Button>
</DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="mt-4 w-56">
        <DropdownMenuLabel className="flex flex-col">
           {isLoadingProfile ?  (
              <div className="space-y-1.5">
                <Skeleton className="h-4 w-32"/>
                <Skeleton className="h-3 w-24"/>
              </div>
           ): (
            <>
            <span>{profile?.name}</span>
            <span className="text-sm text-muted-foreground">{profile?.email}</span>
            </>
           )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
             <DialogTrigger asChild>
        <DropdownMenuItem>
   
            <DeviceMobile size={20} weight="bold"/>
            <span>Perfil da loja</span>
           
        </DropdownMenuItem>
         </DialogTrigger>
        <DropdownMenuItem asChild className="text-rose-500 dark:text-rose-400 cursor-pointer" disabled={isSigninOut}>
          <button onClick={() => signinOutFn()} >
            <SignOut size={20} weight="bold" className="text-rose-500 dark:text-rose-400"/> 
            <span>Sair</span>
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
    <StoreProfileDialog/>
    </Dialog> 
  );
}

import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProfile } from "@/api/udpate-profile";
import { toast } from "sonner";
import { off } from "process";
import { DialogClose } from "@radix-ui/react-dialog";


const SchemaValidationUpdateProfileForm = z.object({
    name: z.string().min(1)
})

type StoreProfileSchema = z.infer<typeof SchemaValidationUpdateProfileForm>

export function StoreProfileDialog() {
    const queryClient = useQueryClient()
    const {register, handleSubmit} = useForm<StoreProfileSchema>({
        resolver: zodResolver(SchemaValidationUpdateProfileForm)
    })

    const {mutateAsync: updateProfileFn} = useMutation({
        mutationFn: updateProfile,
        onSuccess(_, {name}){
            const cached = queryClient.getQueryData(['get-restaurant-data'])
            if(cached){
                queryClient.setQueryData(['get-restaurant-data'], {
                    ...cached,
                    name
                })
            }
        }
    })

    async function handleUpdateForm(data: StoreProfileSchema){
        try{
            await updateProfileFn({
                name: data.name
            })
            toast.success('Perfil atualizado com sucesso!')
        }
        catch(err){
            console.log(err)
        }
    }

    return (
    
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Perfil da loja</DialogTitle>
                <DialogDescription>
                    Atualize as informações da loja
                </DialogDescription>
            </DialogHeader>
           <form onSubmit={handleSubmit(handleUpdateForm)}>
                <div className="flex py-4 items-center gap-4">
                        <Label className="text-right col-span-1" htmlFor="name">Nome:</Label>
                        <Input className="col-span-3" {...register("name")} id="name" />
                </div>
            <DialogFooter>
                <DialogClose asChild>
                <Button variant="ghost" type="button">Cancelar</Button>
                </DialogClose>
                <Button type="submit">Salvar</Button>
            </DialogFooter>
            </form>

        </DialogContent>
      
    )
}
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { useForm } from 'react-hook-form'
import { zodResolver }  from '@hookform/resolvers/zod'
import * as z from 'zod'
import { toast } from "sonner";
import { Link, useSearchParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "@/api/sign-in";

const SchemaValidationForm = z.object({
    email: z.string().email().min(1, 'e-mail obrigatório')
})

export function SignIn() {
    const [ searchParams ] = useSearchParams() 
    type TypeSchemaValidation = z.infer<typeof SchemaValidationForm>
    const { register, handleSubmit, formState:{isSubmitting} } = useForm<TypeSchemaValidation>({
        resolver: zodResolver(SchemaValidationForm),
        defaultValues: {
          email: searchParams.get('email') ?? ''
        }
    })

    const {mutateAsync: authenticate} = useMutation({
      mutationFn: signIn,
      
    })

    async function handleSignIn(data: TypeSchemaValidation){
        await authenticate({email: data.email})
        toast.success('Enviamos um link de autenticação para o seu e-mail')
    }
    return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="absolute top-8 right-8">
        <Button asChild variant="ghost" className="text-[16px]">
          <Link to="/auth/signup">Fazer cadastro</Link>
        </Button>
      </div>
      <div className="w-[350px] flex flex-col gap-4">
        <div className="flex flex-col items-center ">
          <h1 className="font-semibold text-2xl tracking-tight">Acessar painel</h1>
          <span className="text-sm text-muted-foreground">
            Acompanhe suas vendas pelo painel do parceiro
          </span>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit(handleSignIn)}>
          <Label className="text-sm font-semibold" htmlFor="email">Seu e-mail</Label>
          <Input id="email"
          {...register('email')}
          type="email"
          />
          <Button type='submit' className="w-full h-10 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed" disabled={isSubmitting}>Acessar painel</Button>
        </form>
      </div>
    </div>
  );
}

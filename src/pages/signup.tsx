import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { registerRestaurant } from "@/api/register-restaurant";

const SchemaValidationForm = z.object({
  restaurantName: z.string().min(1, "nome do restaurante obrigatório"),
  managerName: z.string().min(1, "nome obrigatório"),
  email: z.string().email().min(1, "e-mail obrigatório"),
  phone: z.string(),
});

export function SignUp() {
  type TypeSchemaValidation = z.infer<typeof SchemaValidationForm>;
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<TypeSchemaValidation>({
    resolver: zodResolver(SchemaValidationForm),
  });

  const navigate = useNavigate()
  const { mutateAsync: registerRestaurantFN } = useMutation({
    mutationFn: registerRestaurant
  })

  async function handleSignUp(data: TypeSchemaValidation) {
    try{await registerRestaurantFN({
      restaurantName: data.restaurantName,
      managerName: data.managerName,
      email: data.email,
      phone: data.phone,
    })
    toast.success("Restaurante cadastrado com sucesso!", {
      action: {
        label: 'login',
        onClick: () => navigate(`/auth/signin?email=${data.email}`)
      }
    })}catch(err){
      console.log(err)
    };
  }
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="absolute top-8 right-8">
        <Button asChild variant="ghost" className="text-[16px]">
          <Link to="/auth/signin">Fazer login</Link>
        </Button>
      </div>
      <div className="w-[350px] flex flex-col gap-4">
        <div className="flex flex-col items-center ">
          <h1 className="font-semibold text-2xl tracking-tight">
            Criar conta gratuita
          </h1>
          <span className="text-sm text-muted-foreground">
            Cadastre-se e seja nosso parceiro
          </span>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit(handleSignUp)}>
          <div>
            <Label className="text-sm font-semibold" htmlFor="email">
              Nome do restaurante
            </Label>
            <Input
              id="restaurantName"
              {...register("restaurantName")}
              type="text"
            />
          </div>
          <div>
            <Label className="text-sm font-semibold" htmlFor="email">
              Seu nome
            </Label>
            <Input id="text" {...register("managerName")} type="text" />
          </div>
          <div>
            <Label className="text-sm font-semibold" htmlFor="email">
              Seu e-mail
            </Label>
            <Input id="email" {...register("email")} type="email" />
          </div>
          <div>
            <Label className="text-sm font-semibold" htmlFor="email">
              Seu telefone
            </Label>
            <Input id="phone" {...register("phone")} type="tel" />
          </div>
          <Button
            type="submit"
            className="w-full h-10 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
            disabled={isSubmitting}
          >
            Acessar painel
          </Button>
          <p className="text-sm text-center text-muted-foreground px-5">
            Ao continuar, você concorda com nossos{" "}
            <a href="" className="underline underline-offset-2">
              Termos de serviço
            </a>{" "}
            e{" "}
            <a href="" className="underline underline-offset-2">
              políticas de privacidade
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}

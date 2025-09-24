import { api } from "@/lib/axios";

export async function SignOutFn(){
    await api.post('/sign-out')
}
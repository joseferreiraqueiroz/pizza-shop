import { api } from "@/lib/axios";

interface UpdateProfileBody{
    name: string
}

export async function updateProfile({name}: UpdateProfileBody){
    await api.put('profile', {
        name
    })
}
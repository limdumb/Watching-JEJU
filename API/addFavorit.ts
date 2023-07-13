import { baseInstance } from "./instance"

export interface FavoritProps {
  userId: number
}

export const addFavorit = async (props: FavoritProps) => {
  const request = {userId: props.userId}
  try{
    const response = await baseInstance.post("", request)
    return response.status
  }catch(err){

  }
}
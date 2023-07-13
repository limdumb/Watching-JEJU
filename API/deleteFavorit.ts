import { FavoritProps } from "./addFavorit";
import { baseInstance } from "./instance";

export const deleteFavorit = async (props: FavoritProps) => {
  const request = {userId: props.userId}
  try{
    const response = await baseInstance.post("", request)
    return response.status
  }catch(err){

  }
};

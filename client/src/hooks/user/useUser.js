import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getUsersApiFn, updateUserApiFn } from "../../services/user/userApiFn";





export function useGetUser(userQueryObj){

    // console.log(userQueryObj);
    
  
    const{data: users, isLoading: isGettingUsers, error: getUserError}=useQuery({
        queryFn:()=>getUsersApiFn(userQueryObj),
        queryKey:["user"],     
    })
    // console.log(data);
    return {users,isGettingUsers, getUserError};
}

// const {users,isGettingUsers, getUserError} = useGetUser()



export function useUpdateUser(){

    const queryClient = useQueryClient()

    const {mutate:updateUserMutateFn, isLodaing: isUserUpdating, error: isUpdateUserError  }= useMutation({
        mutationFn: updateUserApiFn,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["user"]
            });
        },
        onError: (err)=>{
            console.log(err);            
        }  
    })

    return {updateUserMutateFn,isUserUpdating, isUpdateUserError};
}


// const{updateUserMutateFn,isUserUpdating, isUpdateUserError} = useUpdateUser();

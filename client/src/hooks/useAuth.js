import { useMutation, useQueryClient } from "@tanstack/react-query";
import { loginUserApiFn, registerUserApiFn } from "../services/authApi";
import { useNavigate } from "react-router-dom";




//Registration Hook
export function useRegisterUser(){
    const queryClient  = useQueryClient();

    const { mutate: registerUserMutation, isLoading: isuserRegistering, error: registerUserError} = useMutation({
        mutationFn: registerUserApiFn,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["user"]
            });
        },
        onError: (err)=>{
            console.log(err);            
        }
    });

    return {registerUserMutation, isuserRegistering, registerUserError };


}
// const {registerUserMutation, isuserRegistering, registerUserError } = useRegisterUser()





//Login Hook
export function useLoginUser(){
    const queryClient  = useQueryClient();
    const navigate = useNavigate();

    const { mutate: loginUserMutation, isLoading: isUserLogging, error: loginUserError} = useMutation({
        mutationFn: loginUserApiFn,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["user"]
            });

            navigate('/dashboard');
        },
        onError: (err)=>{
            console.log(err);
        }
    });

    return {loginUserMutation, isUserLogging, loginUserError};
}
// const {loginUserMutation, isUserLogging, loginUserError} = useLoginUser();

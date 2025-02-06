

import { createGuidelineApiFn, deleteGuidelineApiFn, getGuidelinesApiFn, updateGuidelineApiFn } from "../../services/guideline/guidelineApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";



// GET Guidelines
export function useGetGuidelines(){
    const {data: guidelines, isLoading:isGuidelinesLoading, error: guidelinesError } = useQuery({
        queryFn: getGuidelinesApiFn,
        queryKey:['guidelines']
    });

    return {guidelines, isGuidelinesLoading, guidelinesError };
}


// const {guidelines, isGuidelinesLoading, guidelinesError } = useGetGuidelines()





// CREATE Guideline Comment
export function useCreateGuideline(){
    const queryClient = useQueryClient()

    const{mutate:createGuidelineMutationFn, isLoading:isCreatingGuideline, error: createGuidelineError } = useMutation({
        mutationFn: createGuidelineApiFn,
        onSuccess:()=>{
            queryClient.invalidateQueries({
                queryKey:['guidelines']
            })
        }
    })

  return {createGuidelineMutationFn, isCreatingGuideline, createGuidelineError} 
}

// const {createGuidelineMutationFn, isCreatingGuideline, createGuidelineError}  = useCreateGuideline();






// UPDATE Guideline Comment
export function useUpdateGuideline(){
    const queryClient = useQueryClient()

    const{mutate:updateGuidelineMutationFn, isLoading:isUpdatingGuideline, error: updateGuidelineError } = useMutation({
        mutationFn: updateGuidelineApiFn,
        onSuccess:()=>{
            queryClient.invalidateQueries({
                queryKey:['guidelines']
            })
        }
    })

  return {updateGuidelineMutationFn, isUpdatingGuideline, updateGuidelineError} 
}

// const {updateGuidelineMutationFn, isUpdatingGuideline, updateGuidelineError}   = useUpdateGuideline();




// DELETE Guideline Comment
export function useDeleteGuideline(){
    const queryClient = useQueryClient()

    const{mutate:deleteGuidelineMutationFn, isLoading:isDeletingGuideline, error: deleteGuidelineError } = useMutation({
        mutationFn: deleteGuidelineApiFn,
        onSuccess:()=>{
            queryClient.invalidateQueries({
                queryKey:['guidelines']
            })
        }
    })

  return {deleteGuidelineMutationFn, isDeletingGuideline, deleteGuidelineError} 
}


// const {deleteGuidelineMutationFn, isDeletingGuideline, deleteGuidelineError}   = useDeleteGuideline();


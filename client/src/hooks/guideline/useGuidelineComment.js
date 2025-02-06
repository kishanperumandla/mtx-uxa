import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createGuidelinesCommentsApiFn, getGuidelinesCommentsApiFn, updateGuidelinesCommentsApiFn } from "../../services/guideline/guidelineCommentsApi";



// CREATE Guideline Comments
export function useCreateGuidelineComments(){
    const queryClient =  useQueryClient()

    const{mutate:guidelineCommentMutationFn, isLoading:isCreatingguidelineComment, error: guidelineCommentError } = useMutation({
        mutationFn: createGuidelinesCommentsApiFn,
        onSuccess:()=>{
            queryClient.invalidateQueries({
                queryKey:['guidelineComments']
            })
        }
    })

  return {guidelineCommentMutationFn, isCreatingguidelineComment, guidelineCommentError} 
}

// const {guidelineCommentMutationFn, isCreatingguidelineComment, guidelineCommentError}  = useCreateGuidelineComments();





// GET Guideline Comments
export function useGetGuidelineComments(){
    const {data: guidelineComments, isLoading:isGuidelineCommentsLoading, error: guidelineCommentsError } = useQuery({
        queryFn: getGuidelinesCommentsApiFn,
        queryKey:['guidelineComments']
    });

    return {guidelineComments, isGuidelineCommentsLoading, guidelineCommentsError };
}


// const {guidelineComments, isGuidelineCommentsLoading, guidelineCommentsError } = useGetGuidelineComments()







// UPDATED Guideline Comment
export function useUpdateGuidelineComment(){
    const queryClient =  useQueryClient()

    const{mutate:updateGuidelineCommentMutationFn, isLoading:isUpdatingGuidelineComment, error: updateGuidelineCommentError } = useMutation({
        mutationFn: updateGuidelinesCommentsApiFn,
        onSuccess:()=>{
            queryClient.invalidateQueries({
                queryKey:['guidelineComments']
            })
        }
    })

  return {updateGuidelineCommentMutationFn, isUpdatingGuidelineComment, updateGuidelineCommentError} 
}

// const {updateGuidelineCommentMutationFn, isUpdatingGuidelineComment, updateGuidelineCommentError} = useUpdateGuidelineComment();


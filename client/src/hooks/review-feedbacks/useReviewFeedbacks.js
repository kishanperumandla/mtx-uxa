import React from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { createReviewFeedbackApiFn, deleteReviewFeedbackApiFn, getReviewFeedbacksApiFn, updateReviewFeedbackApiFn } from '../../services/review-feedback/reviewFeedbackApi'


// POST Review Feedback
export  function useCreateReviewFeedback(){
    const queryClient =  useQueryClient()

    const{mutate:createReviewFeedbackMutationFn, isLoading:isCreatingReviewFeedback, error: reviewFeedbackError } = useMutation({
        mutationFn: createReviewFeedbackApiFn,
        onSuccess:()=>{
            queryClient.invalidateQueries({
                queryKey:['review-feedbacks']
            })
        }
    })

  return {createReviewFeedbackMutationFn, isCreatingReviewFeedback, reviewFeedbackError} 
}
// const {createReviewFeedbackMutationFn, isCreatingReviewFeedback, reviewFeedbackError} = useCreateReviewFeedback()






// GET Review Feedbacks
export  function useGetReviewFeedbacks(projectQuery){

    const{data:reviewFeedbacks, isLoading:isFetchingReviewFeedbacks, error: fetchReviewFeedbacksError } = useQuery({
        queryFn: ()=>getReviewFeedbacksApiFn(projectQuery),
        queryKey:['review-feedbacks']

    })

  return {reviewFeedbacks, isFetchingReviewFeedbacks, fetchReviewFeedbacksError} 
}
// const {reviewFeedbacks, isFetchingReviewFeedbacks, fetchReviewFeedbacksError} = useGetReviewFeedbacks()







// UPDATE Review Feedback
export  function useUpdateReviewFeedback(){
    const queryClient =  useQueryClient()

    const{mutate:updateReviewFeedbackMutationFn, isLoading:isUpdatingReviewFeedback, error: updateReviewFeedbackError } = useMutation({
        mutationFn: updateReviewFeedbackApiFn,
        onSuccess:()=>{
            queryClient.invalidateQueries({
                queryKey:['review-feedbacks']
            })
        },
        onError:(err)=>{
            console.log(err);
            
        }        
    })


  return {updateReviewFeedbackMutationFn, isUpdatingReviewFeedback, updateReviewFeedbackError} 
}
// const {updateReviewFeedbackMutationFn, isUpdatingReviewFeedback, updateReviewFeedbackError}  = useUpdateReviewFeedback()





// DELETE Review Feedback
export  function useDeleteReviewFeedback(){
    const queryClient =  useQueryClient()

    const{mutate:deleteReviewFeedbackMutationFn, isLoading:isDeletingReviewFeedback, error: deleteReviewFeedbackError } = useMutation({
        mutationFn: deleteReviewFeedbackApiFn,
        onSuccess:()=>{
            queryClient.invalidateQueries({
                queryKey:['review-feedbacks']
            })
        },
        onError:(err)=>{
            console.log(err);
            
        }        
    })

  return {deleteReviewFeedbackMutationFn, isDeletingReviewFeedback, deleteReviewFeedbackError} 
}

// const {deleteReviewFeedbackMutationFn, isDeletingReviewFeedback, deleteReviewFeedbackError} = useDeleteReviewFeedback()



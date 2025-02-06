import React from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { createFeedbackCommentApiFn, deleteFeedbackCommentApiFn, getFeedbackCommentsApiFn, updateFeedbackCommentApiFn } from '../../services/review-feedback/feedbackCommentApi'



// POST Feedback Comments
export  function useCreateFeedbackComment(){
    const queryClient =  useQueryClient()

    const{mutate:createFeedbackCommentMutationFn, isLoading:isCreatingFeedbackComment, error: FeedbackCommentError } = useMutation({
        mutationFn: createFeedbackCommentApiFn,
        onSuccess:()=>{
            queryClient.invalidateQueries({
                queryKey:['feedback-comments']
            })
        }
    })

  return {createFeedbackCommentMutationFn, isCreatingFeedbackComment, FeedbackCommentError} 
}
// const {createFeedbackCommentMutationFn, isCreatingFeedbackComment, FeedbackCommentError} = useCreateFeedbackComment()






// GET Feedback Comments
export  function useGetFeedbackComments(feedbackCommentsQuery){

    // console.log(feedbackCommentsQuery);
    

    const{data:feedbackComments, isLoading:isFetchingfeedbackComments, error: fetchfeedbackCommentsError } = useQuery({
        queryFn: ()=>getFeedbackCommentsApiFn(feedbackCommentsQuery),
        queryKey:['feedback-comments']

    })

  return {feedbackComments, isFetchingfeedbackComments, fetchfeedbackCommentsError} 
}
// const {feedbackComments, isFetchingfeedbackComments, fetchfeedbackCommentsError}   = useGetFeedbackComments()





// UPDATE Feedback Comments
export  function useUpdateFeedbackComment(){
    const queryClient =  useQueryClient()

    const{mutate:updateFeedbackCommentMutationFn, isLoading:isUpdatingFeedbackComment, error: updateFeedbackCommentError } = useMutation({
        mutationFn: updateFeedbackCommentApiFn,
        onSuccess:()=>{
            queryClient.invalidateQueries({
                queryKey:['feedback-comments']
            })
        }
    })

  return {updateFeedbackCommentMutationFn, isUpdatingFeedbackComment, updateFeedbackCommentError} 
}
// const {updateFeedbackCommentMutationFn, isUpdatingFeedbackComment, updateFeedbackCommentError}  = useUpdateFeedbackComment()





// DELETE Feedback Comment
export  function useDeleteFeedbackComment(){
    const queryClient =  useQueryClient()

    const{mutate:deleteFeedbackCommentMutationFn, isLoading:isDeletingFeedbackComment, error: deleteFeedbackCommentError } = useMutation({
        mutationFn: deleteFeedbackCommentApiFn,
        onSuccess:()=>{
            queryClient.invalidateQueries({
                queryKey:['feedback-comments']
            })
        }
    })

  return {deleteFeedbackCommentMutationFn, isDeletingFeedbackComment, deleteFeedbackCommentError} 
}
// const {deleteFeedbackCommentMutationFn, isDeletingFeedbackComment, deleteFeedbackCommentError}   = useDeleteFeedbackComment()










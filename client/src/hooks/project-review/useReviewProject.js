import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import { createReviewProjectApiFn, getReviewProjectApiFn, getReviewProjectStatsApiFn, updateReviewProjectApiFn } from '../../services/project-review/reviewProjectApi'


// POST Review Project
export  function useCreateReviewProject(){
    const queryClient =  useQueryClient()

    const{mutate:reviewProjectMutationFn, isLoading:isCreatingReviewProject, error: reviewProjectError } = useMutation({
        mutationFn: createReviewProjectApiFn,
        onSuccess:()=>{
            queryClient.invalidateQueries({
                queryKey:['review-project']
            })
        }
    })

  return {reviewProjectMutationFn, isCreatingReviewProject, reviewProjectError} 
}

// const {reviewProjectMutationFn, isCreatingReviewProject, reviewProjectError}  = useCreateReviewProject()





// GET Review Projects
export  function useGetReviewProject(projectQuery){

    const{data:reviewProjects, isLoading:isFetchingReviewProjects, error: fetchReviewProjectError } = useQuery({
        queryFn: ()=>getReviewProjectApiFn(projectQuery),
        queryKey:['review-project']

    })

  return {reviewProjects, isFetchingReviewProjects, fetchReviewProjectError} 
}


// const {reviewProjects, isFetchingReviewProjects, fetchReviewProjectError}   = useGetReviewProject()






// UPDATE Review Project
export  function useUpdateReviewProject(){
    const queryClient =  useQueryClient()

    const{mutate:updateReviewProjectMutationFn, isLoading:isUpdatingReviewProject, error: updateReviewProjectError } = useMutation({
        mutationFn: updateReviewProjectApiFn,
        onSuccess:()=>{
            queryClient.invalidateQueries({
                queryKey:['review-project']
            })
        }
    })

  return {updateReviewProjectMutationFn, isUpdatingReviewProject, updateReviewProjectError} 
}

// const {updateReviewProjectMutationFn, isUpdatingReviewProject, updateReviewProjectError}   = useUpdateReviewProject()






//REVIEW PROJECT Statistics

export function useGetReviewProjectStats(){
    const {data:reviewProjectStats, isLoading: isReviewProjectStatsLoading, isError: isReviewProjectStatsError  } = useQuery({
        queryFn:getReviewProjectStatsApiFn,
        queryKey:['ReviewProjectStats']
    });

    return {reviewProjectStats, isReviewProjectStatsLoading,isReviewProjectStatsError} 
}

// const {reviewProjectStats, isReviewProjectStatsLoading,isReviewProjectStatsError} = useGetReviewProjectStats();


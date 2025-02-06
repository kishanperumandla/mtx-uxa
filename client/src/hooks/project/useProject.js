import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createProjectApiFn, getProjectApiFn, getProjectStatsApiFn, updateProjectApiFn } from "../../services/project/projectApi";



// CREATE Project
export function useCreateProject(){
    const queryClient =  useQueryClient()

    const{mutate:projectMutationFn, isLoading:isCreatingProject, error: projectError } = useMutation({
        mutationFn: createProjectApiFn,
        onSuccess:()=>{
            queryClient.invalidateQueries({
                queryKey:['project']
            })
        }
    })

  return {projectMutationFn, isCreatingProject, projectError} 
}

// const {projectMutationFn, isCreatingProject, projectError} = useCreateProject();






// GET Projects
export function useGetProject(projectQury){
    const{data:projects, isLoading:isFetchingProjects, error: fetchProjectError} = useQuery({
        queryFn: ()=>getProjectApiFn(projectQury),
        queryKey:['project']
    })

    return {projects, isFetchingProjects, fetchProjectError}  
}

// const {projects, isFetchingProjects, fetchProjectError}  = useGetProject()






// UPDATE Project
export function useUpdateProject(){
    const queryClient =  useQueryClient()

    const{mutate:updateProjectMutationFn, isLoading:isUpdateProject, error: updateProjectError } = useMutation({
        mutationFn: updateProjectApiFn,
        onSuccess:()=>{
            queryClient.invalidateQueries({
                queryKey:['project']
            })
        }
    })
  return {updateProjectMutationFn, isUpdateProject, updateProjectError} 
}

// const {updateProjectMutationFn, isUpdateProject, updateProjectError}  = useUpdateProject();








// PROJECT Statistics

export function useGetProjectStats(){
    const {data:projectStats, isLoading: isProjectStatsLoading, isError: isProjectStatsError  } = useQuery({
        queryFn:getProjectStatsApiFn,
        queryKey:['ProjectStats']
    });

    return {projectStats, isProjectStatsLoading,isProjectStatsError} 
}

// const {projectStats, isProjectStatsLoading,isProjectStatsError}   = useGetProjectStats();


import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createForecastApiFn, getForecastApiFn } from "../../services/forecast/forecastApi";




// CREATE Forecast
export function useCreateForecast(){
    const queryClient =  useQueryClient()

    const{mutate:createForecastMutationFn, isLoading:isCreatingForecast, error: forecastError } = useMutation({
        mutationFn: createForecastApiFn,
        onSuccess:()=>{
            queryClient.invalidateQueries({
                queryKey:['forecast']
            })
        }
    })

  return {createForecastMutationFn, isCreatingForecast, forecastError} 
}

// const {createForecastMutationFn, isCreatingForecast, forecastError} = useCreateForecast();






// GET Forecast
export function useGetForecast(){
    const{data:forecast, isLoading:isFetchingForecast, error: fetchForecastError} = useQuery({
        queryFn: getForecastApiFn,
        queryKey:['forecast']
    })

    return {forecast, isFetchingForecast, fetchForecastError}  
}

// const {forecast, isFetchingForecast, fetchForecastError}  = useGetForecast()









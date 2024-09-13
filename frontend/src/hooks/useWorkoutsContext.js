import { WorkoutsContext } from '../contexts/workoutContexts'
import { useContext } from 'react'
export const useWorkoutsContext = () => {
    const context = useContext(WorkoutsContext)
    if(!context){
        throw Error('use context must be used inside a context provider')
    }

    return context
}
 

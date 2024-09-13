import { useWorkoutsContext } from '../hooks/useWorkoutsContext'
const { useState } = require("react")

const Workoutform = () => {

        const {dispatch} = useWorkoutsContext()

        const [title,setTitle] = useState('')
        
        const [reps,setReps] = useState('')
        
        const [load,setLoad ] = useState('')

        const [error,setError ] = useState(null)

        const [emptyFeilds,setEmptyFields] = useState([])
       
        const handlesubmit = async (e) =>{
            e.preventDefault()
            const workout = {title, reps , load}

            const response =  await fetch('api/workouts',{
                method: 'POST',
                body: JSON.stringify(workout),
                headers:{
                    'Content-Type': 'application/json'
                }
            })

            const json = await response.json()
            if(!response.ok){

                setError(json.error)
                setEmptyFields(json.emptyFeilds)

            }
            if(response.ok){
                setLoad('')
                setTitle('')
                setReps('')
                setError(null)
                setEmptyFields([])
                console.log('new workout added',json)
                dispatch({type:'CREATE_WORKOUT', payload:json})
            }
        }

        return(
            <form className="create" onSubmit={handlesubmit}>
                <h3>Add a new workout</h3>
                <label>Exersize Title:</label>
                <input
                 type="text"
                 onChange={(e)=>setTitle(e.target.value)}
                 value={title}
                 className={emptyFeilds.includes('title') ? 'error':''}
                />

                <label>Reps:</label>
                <input
                 type="number"
                 onChange={(e)=>setReps(e.target.value)}
                 value={reps}
                 className={emptyFeilds.includes('reps') ? 'error':''}
                />

                <label>Load(kg):</label>
                <input
                 type="number"
                 onChange={(e)=>setLoad(e.target.value)}
                 value={load}
                 className={emptyFeilds.includes('load') ? 'error':''}
                />  
                <button>Add workout</button>
                {error && <div className="error">{error}</div>}
            </form>
        )    
    
}

export default Workoutform
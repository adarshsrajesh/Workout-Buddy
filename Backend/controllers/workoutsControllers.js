const { default: mongoose } = require('mongoose')
const Workout = require('../models/Workoutsmodel')
// create new workouts
const createWorkout = async(req,res)=>{
    const {title, reps, load} = req.body

    let emptyFeilds = []

    if(!title){
        emptyFeilds.push('title')
    }
    if(!reps){
        emptyFeilds.push('reps')
    }
    if(!load){
        emptyFeilds.push('load')
    }

    if(emptyFeilds.length>0){
        return res.status(400).json({error:'please fill in all the feilds',emptyFeilds})
    }


   try{
    const workout = await Workout.create({title,reps,load})
    res.status(200).json(workout)
   }

   catch(error){
   res.status(400).json({error:error.message})
   }
}

// get alll workouts
const getWorkouts = async (req,res)=>{
    const workouts = await Workout.find({}).sort({createdAt:-1})
    res.status(200).json(workouts)
}

//get single workout

const getWorkout = async (req,res)=>{
    const { id } = req.params
    const workout = await Workout.findById(id)
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error: 'no such workouts'})
    }

    res.status(200).json(workout)
}

//Delete Workout
const deleteWorkout = async (req,res) => {

    const { id } = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error: 'no such workouts'})
    }
    const workout = await Workout.findOneAndDelete({_id:id})
    if(!workout){
       res.status(400).json({error:'no such workout'})
    }
    res.status(200).json(workout)
}

const updateWorkout = async (req,res) => {

    const { id } = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error: 'no such workouts'})
    }
    const workout = await Workout.findByIdAndUpdate({_id:id},{
        ...req.body
    })

    if(!workout){
     res.status(400).json({error:'no such workout'})
    }
    res.status(200).json(workout)
}
module.exports ={createWorkout,getWorkout,getWorkouts,deleteWorkout,updateWorkout }
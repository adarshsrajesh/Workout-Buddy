const express = require('express')
const router = express.Router()
const Workout = require('../models/Workoutsmodel')
const{createWorkout,getWorkout,getWorkouts, deleteWorkout, updateWorkout} = require('../controllers/workoutsControllers')

router.get('/',getWorkouts)//all workouts

router.get('/:id',getWorkout)//single workouts

router.post('/',createWorkout)//add workout

router.delete('/:id',deleteWorkout)//delete workout

router.patch('/:id',updateWorkout)//update workout

module.exports = router
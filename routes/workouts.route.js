const express = require('express');
const router = express.Router();

const { getAllWorkouts, getSingleWorkout, createWorout, deleteWorkout, updateWorkout } = require('../controllers/workout.controller');

// get all workout list
router.get('/', getAllWorkouts);

// get a single workout
router.get('/:id', getSingleWorkout)

// post workout
router.post('/', createWorout);

// delete a workout
router.delete('/:id', deleteWorkout);

// update a workout
router.patch('/:id', updateWorkout)

module.exports = router;
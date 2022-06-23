const workoutModel = require('../models/workout.model');
const mongoose = require('mongoose');

// get list of workout
const getAllWorkouts = async (req, res) => {
  try {
    const workouts = await workoutModel.find({}).sort({ createdAt: -1 });
    return res.status(200).json(workouts);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }  
}

// get a single workout
const getSingleWorkout = async (req, res) => {
  const { id } = req.params;
  try {
    if(!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: 'No such workout!' });
    }
    const workout = await workoutModel.findById(id);
    if(!workout) {
      return res.status(400).json({ message: 'No such workout exists!' });
    }  
    return res.status(200).json(workout);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }  
}

// create a new workout
const createWorout = async (req, res) => {
  const { title, reps, load } = req.body;
  try {
    const workout = await workoutModel.create({ title, reps, load });
    return res.status(200).json({ message: 'Saved' });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }  
}

// delete a workout
const deleteWorkout = async (req, res) => {
  const { id } = req.params;
  try {
    if(!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: 'No such workout!' });
    }
    const workout = await workoutModel.findOneAndDelete({ _id: id });
    if(!workout) {
      return res.status(400).json({ message: 'No such workout exists!' });
    }  
    return res.status(200).json({ message: 'Deleted' });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }    
}

// update a workout
const updateWorkout = async (req, res) => {
  const { id } = req.params;
  try {
    if(!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: 'No such workout!' });
    }
    const workout = await workoutModel.findOneAndUpdate({ _id: id }, { ...req.body });
    if(!workout) {
      return res.status(400).json({ message: 'No such workout exists!' });
    }  
    return res.status(200).json({ message: 'Updated' });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }   
}

module.exports = { getAllWorkouts, getSingleWorkout, createWorout, deleteWorkout, updateWorkout }
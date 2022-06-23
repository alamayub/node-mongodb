require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const workoutRoutes = require('./routes/workouts.route');

// express app
const app = express();

// middleware
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next()  
});

// routes
app.get('/', (req, res) => {
  res.json({ msg: 'Welome to app' })  
});

app.use('/workout', workoutRoutes);

// connect to db
mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log('connected to DB & app running on', process.env.PORT);  
    });
  }).catch(err => {
    console.log(err);  
  });
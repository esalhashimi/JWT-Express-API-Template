const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const logger = require('morgan');


//Controllers
const authCtrl = require("./controllers/auth")

mongoose.connect(process.env.MONGODB_URL);


mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

app.use(cors());
app.use(express.json());
app.use(logger('dev'));

// Public Routes
app.use("/auth" , authCtrl)


//Protected Routes


app.listen(process.env.PORT || 3000, () => {
  console.log('The express app is ready!');
});

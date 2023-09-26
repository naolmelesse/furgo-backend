const express = require("express");
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const signUp = require('./routes/signUp');
const auth = require('./routes/auth');
const getCars = require('./routes/getCars');
const getUser = require('./routes/getUser');
const rentCar = require('./routes/rent-car');
const upgradeUser = require('./routes/upgradeUser');
const addCar = require('./routes/addCar');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

dotenv.config();

mongoose.connect(process.env.AUTH, () => {
  console.log("DB connected");
}, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

  
const PORT = process.env.PORT || 8080;

// const directory = path.join(__dirname, '');
// app.use('/', express.static(directory));

app.use(express.static(__dirname + '/public/uploads'));
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ["GET", "POST"],
  credentials: true
}));
app.use(bodyParser.urlencoded({extended: true}));

app.use('/', signUp);
app.use('/', auth);
app.use('/', getCars);
app.use('/', upgradeUser);
app.use('/', addCar);
app.use('/', rentCar);
app.use('/', getUser);
app.listen(PORT, console.log(`Server started on port ${PORT}`));

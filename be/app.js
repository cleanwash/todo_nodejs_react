const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const indexRouter = require('./routes/index');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use('/api',indexRouter);
const mongoURI = `mongodb://localhost:27017/todo_app_react_node`;

//useNewUrlParser: true는 예전 형식의 monogdb도 잘 읽을 수 있게 도와준다. 
mongoose.connect(mongoURI, { useNewUrlParser: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});

const express = require  ("express");
const morgan = require  ("morgan");
const helmet = require  ("helmet");
const cors = require  ("cors");
const mongoose = require('mongoose');

require('dotenv').config();

const middlewares = require('./middlewares');
const logs = require('./api/logs');

const app = express();
//create database connection
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });


app.use(morgan('common'));
app.use(helmet());
app.use(cors({
    origin: process.env.CORS_ORIGN,
}));
app.use(express.json());

app.get('/',(req, res) => {
    res.json({
        message: 'hello world',
    });
});

app.use('/api/logs', logs);

//if a request gets here we didnt find the rought they were looking for 
//when requsting non exsisting path
app.use(middlewares.notFound);

//error hadlling middle ware
app.use(middlewares.errorHandler);

const port = process.env.PORT || 8585;
app.listen(port, () => {
console.log('Listning  at Http://localhost:${port} ')

});


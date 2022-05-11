const { Router } = require('express');
const RateLimit = require('express-rate-limit');
const MongoStore = require('rate-limit-mongo');

const LogEntry = require('../models/LogEntry');

const {
  API_KEY,
  DATABASE_URL,
} = process.env;

const router = Router();


router.get('/', async (req, res, next) => {
  try {
    const entries = await LogEntry.find();
    res.json(entries);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    if (req.get('X-API-KEY') !== API_KEY) {
      res.status(401);
      throw new Error('UnAuthorized');
    }
    const logEntry = new LogEntry(req.body);
    const createdEntry = await logEntry.save();//atempt to save it and run the validation
    res.json(createdEntry);
  } catch (error) {
    if (error.name === 'ValidationError') {
      res.status(422);
    }
    next(error);
  }
});

module.exports = router;

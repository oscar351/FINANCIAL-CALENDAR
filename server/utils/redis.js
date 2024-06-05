const redis = require('redis');
const dotenv = require('dotenv');

dotenv.config();

const redisClient = redis.createClient({
    url: `redis://${process.env.REDIS_USER}:${process.env.REDIS_PASSWORD}@${process.env.REDIS_HOST}:${process.env.REDIS_PORT}/0`,
    legacyMode: true,
 });
 
 redisClient.on('connect', () => {
    console.info('Redis connected!');
  });
  redisClient.on('error', (err) => {
    console.error('Redis Client Error', err);
  });
  redisClient.connect().then(); // redis v4 연결 (비동기)

// module.exports = redisClient

const set = (key, value) => {
  redisClient.set(key, JSON.stringify(value));
};

const get = (req, res, next) => {
  let key = req.originalUrl;

  redisClient.get(key, (error, data) => {
    if (error) {
      res.status(400).send({
        ok: false,
        message: error,
      });
    }
    if (data !== null) {
      console.log('data from redis!');
      res.status(200).send({
        ok: true,
        data: JSON.parse(data),
      });
    } else next();
  });
};

module.exports = {
  redisClient,
  set,
  get,
};
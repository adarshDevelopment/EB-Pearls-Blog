const dotenv = require('dotenv');
dotenv.config();

const AppConfig = {
  port : process.env.SERVER_PORT,
  jwtSecret: process.env.JWT_SECRET
}

const MongoDbConfig = {
  mongoDbUrl: process.env.MONGODB_URL
}

module.exports = {
  AppConfig,
  MongoDbConfig
}
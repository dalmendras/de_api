require('dotenv').config();

const config = {
  // Environment
  env: process.env.NODE_ENV || 'dev',
  // Port Server
  server_port: process.env.SERVER_PORT || 8080,
  // Database
  dbUser:      process.env.DB_USER,
  dbPassword:  process.env.DB_PASSWORD,
  dbHost:      process.env.DB_HOST,
  dbName:      process.env.DB_NAME,
  dbPort:      process.env.DB_PORT,

  // Api basic Auth Master
  api_user_master:  process.env.API_USER_MASTER,
  api_pass_master:  process.env.API_PASS_MASTER
}

module.exports = { config };

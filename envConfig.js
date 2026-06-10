const dotenv = require("dotenv");

dotenv.config();

// Export all environment variables from .env file
module.exports = {
	MONGO_URI: process.env.MONGO_URI,
	PORT: process.env.PORT
	
};

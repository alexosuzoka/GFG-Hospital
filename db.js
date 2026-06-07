const mongoclient = require('mongoose')
const MONGO_URI  = require("./envConfig");

const connectDB = async () => {
	
		const client = await mongoclient.connect(MONGO_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,}
			)

			if (mongoclient.ConnectionStates.connected) {
				console.log("MongoDB connected");
				return 1;
				
				
			}

			else {
				console.error("MongoDB connection failed");
				return 0;
			}



			
			
	} 

		 
		 
			
		
	

module.exports = {
	connectDB,
	mongoclient
		
}
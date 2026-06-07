const mongoclient = require('mongoose')
const MONGO_URI  = require("./envConfig");


// Establish a session to the MongoDB database
const connectDB = async () => {
	
		const client = await mongoclient.connect(MONGO_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,}
			)

			if (client.ConnectionStates.connected) {
				console.log("MongoDB connected");
				return 1;
				
				
			}

			else {
				console.error("MongoDB connection failed");
				return 0;
			}



			
			
	} 

	const disconnectDB = async () => {
		await mongoclient.disconnect( () => {
			console.log("MongoDB disconnected");
		});
	}

		 
		 
			
		
	

module.exports = {
	connectDB,
	disconnectDB
		
}
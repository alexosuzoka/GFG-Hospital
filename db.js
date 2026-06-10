const mongoclient = require('mongoose')
const MONGO_URI  = require("./envConfig");


// Establish a session to the MongoDB database
const connectDB = async () => {
	
		const client = await mongoclient.connect(MONGO_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,}
			)

			if (client.ConnectionStates.connected === 1) {
				console.log("MongoDB connected");
				
				
				
			}

			else {
				console.error("MongoDB connection failed");
				
			}



			
			
	} 

	const disconnectDB = async () => {
		await mongoclient.disconnect().then( () => {
             console.log("Database connection ended!!")
		})
		
	}

		 
		 
			
		
	

module.exports = {
	connectDB,
	disconnectDB
		
}
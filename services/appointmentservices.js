
const dbsession = require("../db");
const appointment = require("../models/Appointment");

var results

if (dbsession.connectDB() === 1) {
    console.log("Connected to DB, fetching appointments...");
    results = appointment.find({});
    
}

else {

    console.error("Failed to connect to DB, cannot fetch appointments.");
    results = null;
} 
dbsession.mongoclient.disconnect();

module.exports = {
      results
}


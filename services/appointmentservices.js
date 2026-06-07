
const dbsession = require("../db");
const appointment = require("../models/Appointment");



 const getallappointments = async () => {
if (dbsession.connectDB() === 1) {
    console.log("Connected to DB, fetching appointments...");
    try {
       var result = await appointment.find({});
    }
    catch(err) {
        console.error("Error fetching appointments: ", err);
    }
    



} 

return result;
dbsession.mongoclient.disconnect();

module.exports = {
      getallappointments
}

 }

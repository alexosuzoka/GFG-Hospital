const dbclient = require("../db.js")
const Appointment = require("../models/Appointment.js")
const express = require("express")
const app = express()

var req = app.request
var res = app.response






const getAllAppointments = async (req, res) => {
    
        const connetionstatus = await dbclient.connectDB()
        if (connectionstatus === 1) {
            //call the model function to get all appointments
            const appointments = Appointment.find({})
            if (appointments != null) {
                return res.status(200).json(appointments)
                dbclient.disconnectDB()
            }
            else {
                return res.status(404).json({ message: "No appointments found" })
                dbclient.disconnectDB()
            }
            }
            else {
                
                return res.status(500).json({ message: "Database connection failed" })
                dbclient.disconnectDB()

            }
        
            
            
        }


        const createAppointment = async (req, res) => {
            if (req.body != null && dbclient.connectDB() === 1) {
                const { patientName, doctorName, date } = req.body
                const newappointment = new Appointment({
                    patientName,
                    doctorName,
                date
            })


            newappointment.save().then(result => {
                return res.status(201).json(result)
                dbclient.disconnectDB()
            })
            .catch(err => {
                return res.status(500).json({ message: "Error creating appointment" })
                console.error(err)
            })

            }

            else {
                return res.status(500).json("Database connection failed")
                dbclient.disconnectDB()
            }

            }

            // update appointment data
            const updateAppointment = async (req, res) => {
                if (req.params.id != null && dbclient.connectDB() === 1) {
                    appointmentmodel.findByIdAndUpdate(req.params.id)
                    .then(result => {
                        if(!result) {
                            return res.status(404).json({message: "Appointment not found"})
                            dbclient.disconnectDB();
                        }
                        else {
                            result.patientName = req.body.patientName
                            result.doctorName = req.bodydoctorName
                            result.date = req.body.date

                            result.save().then(updatedresult => {
                                return res.status(200).message("Appointment updated successfully")
                                .catch(err => {
                                    res.status(500).message("Appointment failed to upload")
                                    dbclient.disconnectDB()
                                })
                            })
                        }
                    })

            }

            // if unable to get parameters from request pipeline or failed database connection
            else {
                res.status(500).message("Unable to get parameters or failed database connection")
                console.error(res.error.message)
            }
            
        
        } 

        const deleteappointments = async (req, res) => {
          // Verify the parameter id is available and database session state is active

          if (req.params.id != null && dbclient.connectDB() === 1) {
           Appointment.findByIdAndDelete(req.params.id)
            .then(
                () =>
                     res.json('Appointment deleted.'))
            .catch(
                err => res.status(400).message('Error: ' + err));
    

          }

        }


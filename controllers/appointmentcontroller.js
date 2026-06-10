const dbclient = require("../db")
const Appointment = require("../models/Appointment")
const express = require("express")
const app = express()








const getAllAppointments = app.router.get('/', async (req, res) => {
    
            //call the model function to get all appointments
            Appointment.find().then(result => {
                res.status(200).json(result)
            })
            .catch(err =>{
                res.status(404).message("No Appointments found")
            })
             dbclient.disconnectDB()

            } ) 
            
        
            
            
        


        const createAppointment = app.router.post('/add', async (req, res) => {
            if (req.body != null) {
                const { patientName, doctorName, date } = req.body
                const newappointment = new Appointment({
                    patientName,
                    doctorName,
                    date
            })


            newappointment.save().then(result => {
             res.status(201).json(result)
                dbclient.disconnectDB()
            })
            .catch(err => {
                 res.status(500).json({ message: "Error creating appointment" })
                console.error(err)
            })

            }

            else {
                 res.status(500).json({message: "Missing required fields"})
                
            }

            }) 

            // update appointment data
            const updateAppointment = app.router.post('/update/:id', async (req, res) => {
                if (req.params.id != null) {
                    Appointment.findByIdAndUpdate(req.params.id)
                    .then(result => {
                    
                            result.patientName = req.body.patientName
                            result.doctorName = req.bodydoctorName
                            result.date = req.body.date

                            result.save().then(updatedresult => {
                             res.status(200).message("Appointment updated successfully")
                                .catch(err => {
                                    res.status(500).message("Appointment failed to upload")
                                    dbclient.disconnectDB()
                                })
                            })
                        })
                }

            

            // if unable to get parameters from request pipeline or failed database connection
                else {
                res.status(500).message("Unable to get required parameters")
                console.error(res.error)
             }
            
        
        })
    

        const deleteappointments = app.router.delete('/delete/:id', async (req, res) => {
          // Verify the parameter id is available and database session state is active

          if (req.params.id != null) {
           Appointment.findByIdAndDelete(req.params.id)
            .then(
                () =>
                     res.json('Appointment deleted.'))
            .catch(
                err => res.status(400).message('Error: ' + err));
    

          }

        } )

        module.exports = {
            getAllAppointments,
            createAppointment,
            updateAppointment,
            deleteappointments
        }


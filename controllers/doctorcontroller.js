const dbclient = require("../db")
const Doctor = require("../models/Doctor")
const express = require("express")
const app = express()

var req = app.request
var res = app.response




// Get all doctors

const getallDoctors = async( req, res) =>  {
    if (dbclient.connectDB === 1) {
        //call the model function to get all appointments
        const doctors = await Doctor.find().then(doctors => {
            res.status(200).json(doctors)
            .catch(err => {
                res.status(404).message("Unable to get Doctors")
                dbclient.disconnectDB()
            })
        })
    }

    else {
        res.status(500).message("Database Connection failed")
    }
}


const createDoctor = async (req, res) => {

     if (req.body != null && dbclient.connectDB() === 1) {
      const {name, specialty} = req.body

      const newdoctor = new Doctor({name, specialty})

      newdoctor.save().then(result  => {
        res.status(201).json(result)
        .catch(err => {
            res.status(400).json({message: "Unable to save new Doctor + '' + ${newdoctor.name}"})
        })
      })
      dbclient.disconnectDB()
       }

       else {
        res.status(500).json({ message: "Database connection failed or no new field inputted" })
       }
    }


    // update Doctor records
            const updateDoctor = async (req, res) => {
                if (req.params.id != null && dbclient.connectDB() === 1) {
                    await Doctor.findById(req.params.id)
                    .then(result => {
                    
                            result.name = req.body.name
                            result.specialty = req.body.specialty

                            result.save().then(updatedresult => {
                             res.status(200).message("Updated successfully")
                                .catch(err => {
                                    res.status(500).message("New Data failed to upload")
                                    dbclient.disconnectDB()
                                })
                            })
                        })
                }

                else {
                    res.status(500).json({message: "Missing required parameters || Unable to connect to Database"})
                }
            }


            //Delete Doctor by ID

            const deletedoctor = async (req, res) => {

             if (req.params.id != null && dbclient.connectDB() === 1) {
                Doctor.findByIdAndDelete(req.params.id).then(data => {
                    if (!data) {
                       return res.status(404).json({message: "No doctor record found"})
                    }

                    else {
                        return res.status(200).json({message: "Successfully deleted data"})

                    }
                        })
                    }
                
             

             else {
                res.status(500).json({message: "Missing required fields || Unable to coonect to database"})
             }

            }
        

            module.exports = {
                getallDoctors,
                createDoctor,
                updateDoctor,
                deletedoctor,
                
            }



const dbclient = require("../db")
const Patient = require("../models/Patient")
const express = require("express")
const app = express()

var req = app.request
var res = app.response



// Get all Patients record

const getallpatients = async (req, res) => {
    if (dbclient.connectDB() === 1) {
  await Patient.find().then(data => {
      res.status(200).json(data)
      .catch(err => {
        res.status(400).json({message: "Failed in retrieving patients records"})
      })
    })
    dbclient.disconnectDB()
    }
    else {
        res.status(500).json({message: "Unable to connect to database"})
    }

    }


    //Add new Patient

    const addnewpatient = async (req, res) => {
      if (dbclient.connectDB() === 1) {
        const {name, age, gender} = req.body
        const newpatient = new Patient({name, age, gender});
        newpatient.save().then(() => {
            return res.status(200).json({message: "Successfully added Patient + '' + ${newpatient.name}"})
            .catch( err => {
                return res.status(400).json({message: err})
            })
        })

      }

      else {
        res.status(500).json({message: "Unable to connect to database"})
      }
    }

    //Update Patient Records

    const updatepatient = async (req, res) => {
       if (req.params.id && dbclient.connectDB === 1) {
        Patient.findById(req.params.id).then(patients => {
            patients.name = req.body.name
            patients.age = req.body.age
            patients.gender = req.body.gender

            patients.save().then( () => {
                return res.status(200).json({message: "Successfully updated Patient + '' + ${patients.name}"})
                 })
                .catch(err => {
                    return res.status(400).json({message: "Unable to save Patient"})
                })
           
        })
       }

       else {
        return res.status(500).json({message: "Missing required field or Unable to connect to database"})
       }
    }


    //Delete Patient by ID

    const deletpatient = async (req,res) => {
        if (req.params.id != null && dbclient.connectDB() === 1) {
        Patient.findByIdAndDelete(req.params.id).then(patient => {
    if (!patient) {
        return res.status(404).json({message: "No records found for patients"})

    }

    else {
        return res.status(200).json({message: "Patient successfully deleted"})
    }

        })
    }
    
    else {
        return res.status(500).json({message: "Unable to connect to Database"})
    }

    }

    module.exports = {
        getallpatients,
        addnewpatient,
        updatepatient,
        deletpatient
    }


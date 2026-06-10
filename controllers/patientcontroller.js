const dbclient = require("../db")
const Patient = require("../models/Patient")
const express = require("express")
const app = express()




// Get all Patients record

const getallpatients = app.router.get('/', async (req, res) => {
    
  await Patient.find().then(data => {
      res.status(200).json(data)
      .catch(err => {
        res.status(400).json({message: "Failed in retrieving patients records"})
      })
    })
    dbclient.disconnectDB()
    }

 ) 

    //Add new Patient

    const addnewpatient = app.router.post('/add', async (req, res) => {
      if (req.body != null) {
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
        res.status(500).json({message: "Missing required fields"})
      }
    }
) 
    //Update Patient Records

    const updatepatient = app.router.post('/update/:id', async (req, res) => {
       if (req.params.id != null) {
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
        return res.status(500).json({message: "Missing required field"})
       }
    }) 


    //Delete Patient by ID

    const deletpatient = app.router.delete('/delete/:id', async (req,res) => {
        if (req.params.id != null) {
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
        return res.status(500).json({message: "Missing required field"})
    }

    }) 

    module.exports = {
        getallpatients,
        addnewpatient,
        updatepatient,
        deletpatient
    }


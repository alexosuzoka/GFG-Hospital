const dbclient = require("../db")
const Doctor = require("../models/Doctor")
const express = require("express")
const app = express()





// Get all doctors

const getallDoctors = app.router.get('/',  async( req, res) =>  {
    
        //call the model function to get all appointments
        const doctors = await Doctor.find().then(doctors => {
            res.status(200).json(doctors)
            .catch(err => {
                res.status(404).message("Unable to get Doctors")
                dbclient.disconnectDB()
            })
        })
    

   
})


const createDoctor = app.router.post('/add', async (req, res) => {

     if (req.body != null) {
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
        res.status(500).json({ message: "No field inputted" })
       }
    } ) 


    // update Doctor records
            const updateDoctor = app.router.post('/update/:id', async (req, res) => {
                if (req.params.id != null) {
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
                    res.status(500).json({message: "Missing required parameters"})
                }
            })
            
            
            //Delete Doctor by ID

            const deletedoctor = app.router.delete('/delete/:id', async (req, res) => {

             if (req.params.id != null) {
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
                res.status(500).json({message: "Missing required fields"})
             }

            }) 
        

            module.exports = {
                getallDoctors,
                createDoctor,
                updateDoctor,
                deletedoctor,
                
            }



const express = require('express')
const userSchema = require('../models/userSchema')


const userRoutes = express.Router()
// ### PROFILE VIEW  ####//
userRoutes.get('/profile-view', async (req, res) => {
    try {
        const viewData = await userSchema.find()
        if (viewData) {
            return res.status(200).json({
                success: true,
                error: false,
                data: viewData,
                message: "Data viewed successfully"
            })
        } else {
            return res.status(400).json({
                success: false,
                error: true,
                message: "Data cannot viwed"
            })
        }

    } catch (error) {
        return res.status(500).json({
            success: false,
            error: true,
            message: "Internal server error ",
            errorMessage: error
        })
    }
})
// ### PROFILE DELETE  ####//
userRoutes.post('/profile-delete/:id', async (req, res) => {
    try {

        const id = req.params.id
        const delData = await userSchema.deleteOne({ _id: id })
        if (delData) {
            return res.status(200).json({
                success: true,
                error: false,
                message: "Data deleted successfully"
            })
        } else {
            return res.status(400).json({
                success: false,
                error: true,
                message: "Data cannot deleted"
            })
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: true,
            message: "Internal server error ",
            errorMessage: error
        })
    }
})

// ### PROFILE UPDATE  ####//
userRoutes.post('/profile-edit/:id', async (req, res) => {
    try {
        const id = req.params.id
        const oldData = await userSchema.findOne({ _id: id })
        const data = {
            Name: req.body.Name ? req.body.Name : oldData.Name,
            Address: req.body.Address ? req.body.Address : oldData.Address,
            Mobile: req.body.Mobile ? req.body.Mobile : oldData.Mobile,
            Age: req.body.Age ? req.body.Age : oldData.Age,
            user_img: req.file ? req.file.path : oldData.Age,
        }
        const newData = await userSchema.updateOne({ _id: id }, { $set: data })
        if (newData) {
            return res.status(200).json({
                success: true,
                error: false,
                message: 'Data updated successfully',
                data: newData
            })
        } else {
            return res.status(400).json({
                success: false,
                error: true,
                message: "Data cannot updated"
            })
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: true,
            message: "internal server error",
            errorMessage: error

        })

    }
})


















module.exports = userRoutes
const mongoose=require("mongoose");
const Business=require('../models/Business')
const asyncHandler=require("../middlewares/async");
const ErrorResponse=require("../utils/ErrorResponse");

// @desc Get all businesses
// @route GET /api/v1/business
// @access private
exports.getBusinesses=asyncHandler(async (req,res,next) => {
    const businesses=await Business.find()
    res.status(200).send({
        success: true,
        data: businesses
    })

})

// @desc Get single businesses
// @route GET /api/v1/business/:id
// @access private
exports.getBusiness=asyncHandler(async (req,res,next) => {
    const business=await Business.findById(req.params.id)
    if(!business) {
        return next(new ErrorResponse(404,'Business not found'))
    }
    res.status(200).send({
        success: true,
        data: business
    })

})

// @desc add a business
// @route POST /api/v1/business
// @access private
exports.addBusiness=asyncHandler(async (req,res,next) => {
    const data=req.body

    const business=await Business.create(data)

    res.status(201).send({
        success: true,
        data: business
    })

})

// @desc Update a business
// @route PATCH /api/v1/business/:id
// @access private
exports.updateBusiness=asyncHandler(async (req,res,next) => {
    const {phone,email,website}=req.body

    const business=await Business.findById(req.params.id)
    if(!business) {
        return next(new ErrorResponse(404,`Business with ID:${req.params.id} not found!`))
    }
    if(phone) business.phone=phone
    if(email) business.email=email
    if(website) business.website=website

    await business.save()

    res.status(200).send({
        success: true,
        data: business
    })

})

// @desc Delete a business
// @route DELETE /api/v1/business/id
// @access private
exports.deleteBusiness=asyncHandler(async (req,res,next) => {

    const business=await Business.findOne({_id: req.params.id})
    if(!business) {
        return next(new ErrorResponse(404,'Business not found'))
    }
    await business.remove()
    res.status(200).send({
        success: true,
        data: {}
    })

})
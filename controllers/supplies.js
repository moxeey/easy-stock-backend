const mongoose=require("mongoose");
const Supply=require('../models/Supply')
const asyncHandler=require("../middlewares/async");
const ErrorResponse=require("../utils/ErrorResponse");

// @desc Get all supplies
// @route GET /api/v1/supplies
// @access private
exports.getOrders=asyncHandler(async (req,res,next) => {
    const supplies=await Supply.find()
    res.status(200).send({
        success: true,
        data: supplies
    })
})

// @desc Get single supplies
// @route GET /api/v1/supplies/:id
// @access private
exports.getOrder=asyncHandler(async (req,res,next) => {
    const supply=await Supply.findById(req.params.id)
    res.status(200).send({
        success: true,
        data: supply
    })
})

// @desc add a supplies
// @route POST /api/v1/supplies
// @access private
exports.addOrder=asyncHandler(async (req,res,next) => {
    const data=req.body
    const supplies=await Supply.create(data)
    res.status(201).send({
        success: true,
        data: supplies
    })
})

// @desc Update a supplies
// @route PATCH /api/v1/supplies/:id
// @access private
exports.updateOrder=asyncHandler(async (req,res,next) => {
    const {products}=req.body
    const supply=await Supply.findById(req.params.id)
    if(!supply) {
        return next(new ErrorResponse(404,`Supply with ID:${req.params.id} not found!`))
    }
    if(products) {
        supply.products=products
        supply.total=products.reduce((total,product) => {
            total+=product.price*product.qty
        },0)
    }
    await supply.save()

    res.status(200).send({
        success: true,
        data: supply
    })
})
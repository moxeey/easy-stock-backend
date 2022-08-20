const mongoose=require("mongoose");
const Supplier=require('../models/Supplier')
const asyncHandler=require("../middlewares/async");
const ErrorResponse=require("../utils/ErrorResponse");

// @desc Get all suppliers
// @route GET /api/v1/suppliers
// @access private
exports.getSuppliers=asyncHandler(async (req,res,next) => {
    const suppliers=await Supplier.find()
    res.status(200).send({
        success: true,
        data: suppliers
    })
})

// @desc Get single suppliers
// @route GET /api/v1/suppliers/:id
// @access private
exports.getSupplier=asyncHandler(async (req,res,next) => {
    const supplier=await Supplier.findById(req.params.id)
    res.status(200).send({
        success: true,
        data: supplier
    })
})

// @desc add a suppliers
// @route POST /api/v1/suppliers
// @access private
exports.addSupplier=asyncHandler(async (req,res,next) => {
    const data=req.body
    const suppliers=await Supplier.create(data)
    res.status(201).send({
        success: true,
        data: suppliers
    })
})

// @desc Update a suppliers
// @route PATCH /api/v1/suppliers/:id
// @access private
exports.updateSupplier=asyncHandler(async (req,res,next) => {
    const {phone,email,name}=req.body
    const supplier=await Supplier.findById(req.params.id)
    if(!supplier) {
        return next(new ErrorResponse(404,`Supplier with ID:${req.params.id} not found!`))
    }
    if(phone) supplier.phone=phone
    if(email) supplier.email=email
    if(name) supplier.name=name

    await supplier.save()

    res.status(200).send({
        success: true,
        data: supplier
    })
})
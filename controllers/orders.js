const mongoose=require("mongoose");
const Order=require('../models/Order')
const asyncHandler=require("../middlewares/async");
const ErrorResponse=require("../utils/ErrorResponse");

// @desc Get all orders
// @route GET /api/v1/orders
// @access private
exports.getOrders=asyncHandler(async (req,res,next) => {
    const orders=await Order.find()
    res.status(200).send({
        success: true,
        data: orders
    })
})

// @desc Get single orders
// @route GET /api/v1/orders/:id
// @access private
exports.getOrder=asyncHandler(async (req,res,next) => {
    const order=await Order.findById(req.params.id)
    res.status(200).send({
        success: true,
        data: order
    })
})

// @desc add a orders
// @route POST /api/v1/orders
// @access private
exports.addOrder=asyncHandler(async (req,res,next) => {
    const data=req.body
    const orders=await Order.create(data)
    res.status(201).send({
        success: true,
        data: orders
    })
})

// @desc Update a orders
// @route PATCH /api/v1/orders/:id
// @access private
exports.updateOrder=asyncHandler(async (req,res,next) => {
    const {products}=req.body
    const order=await Order.findById(req.params.id)
    if(!order) {
        return next(new ErrorResponse(404,`Order with ID:${req.params.id} not found!`))
    }
    if(products) {
        order.products=products
        order.total=products.reduce((total,product) => {
            total+=product.price*product.qty
        },0)
    }
    await order.save()

    res.status(200).send({
        success: true,
        data: order
    })
})
const mongoose=require("mongoose");
const Transaction=require('../models/Transaction')
const asyncHandler=require("../middlewares/async");
const ErrorResponse=require("../utils/ErrorResponse");

// @desc Get all transactions
// @route GET /api/v1/transactions
// @access private
exports.getTransactions=asyncHandler(async (req,res,next) => {
    const transactions=await Transaction.find()
    res.status(200).send({
        success: true,
        data: transactions
    })
})

// @desc Get single transactions
// @route GET /api/v1/transactions/:id
// @access private
exports.getTransaction=asyncHandler(async (req,res,next) => {
    const transaction=await Transaction.findById(req.params.id)
    res.status(200).send({
        success: true,
        data: transaction
    })
})

// @desc add a transactions
// @route POST /api/v1/transactions
// @access private
exports.addTransaction=asyncHandler(async (req,res,next) => {
    const data=req.body
    const transactions=await Transaction.create(data)
    res.status(201).send({
        success: true,
        data: transactions
    })
})

// @desc Update a transactions
// @route PATCH /api/v1/transactions/:id
// @access private
exports.updateTransaction=asyncHandler(async (req,res,next) => {
    const {amount}=req.body
    const transaction=await Transaction.findById(req.params.id)
    if(!transaction) {
        return next(new ErrorResponse(404,`Transaction with ID:${req.params.id} not found!`))
    }
    if(amount) transaction.amount=amount

    await transaction.save()

    res.status(200).send({
        success: true,
        data: transaction
    })
})
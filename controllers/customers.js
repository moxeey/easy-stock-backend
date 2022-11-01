const Customer=require('../models/Customer')
const asyncHandler=require("../middlewares/async");
const ErrorResponse=require("../utils/ErrorResponse");

// @desc Get all customers
// @route GET /api/v1/customers
// @access private
exports.getCustomers=asyncHandler(async (req,res,next) => {
    const customers=await Customer.find()
    res.status(200).send({
        success: true,
        data: customers
    })
})

// @desc Get single customers
// @route GET /api/v1/customers/:id
// @access private
exports.getCustomer=asyncHandler(async (req,res,next) => {
    const customer=await Customer.findById(req.params.id)
    res.status(200).send({
        success: true,
        data: customer
    })
})

// @desc add a customers
// @route POST /api/v1/customers
// @access private
exports.addCustomer=asyncHandler(async (req,res,next) => {
    const data=req.body
    const customers=await Customer.create(data)
    res.status(201).send({
        success: true,
        data: customers
    })
})

// @desc Update a customers
// @route PATCH /api/v1/customers/:id
// @access private
exports.updateCustomer=asyncHandler(async (req,res,next) => {
    const {phone,email,name}=req.body
    const customer=await Customer.findById(req.params.id)
    if(!customer) {
        return next(new ErrorResponse(404,`Customer with ID:${req.params.id} not found!`))
    }
    if(phone) customer.phone=phone
    if(email) customer.email=email
    if(name) customer.name=name

    await customer.save()

    res.status(200).send({
        success: true,
        data: customer
    })
})

// @desc Delete a customer
// @route DELETE /api/v1/customers/id
// @access private
exports.deleteCustomer=asyncHandler(async (req,res,next) => {

    const customer=await Customer.findOne({_id: req.params.id})
    if(!customer) {
        return next(new ErrorResponse(404,'Customer not found'))
    }
    await customer.remove()
    res.status(200).send({
        success: true,
        data: {}
    })

})
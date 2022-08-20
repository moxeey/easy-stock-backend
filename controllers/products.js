const mongoose=require("mongoose");
const Product=require('../models/Product')
const asyncHandler=require("../middlewares/async");

// @desc Get all products
// @route GET /api/v1/products
// @access public
exports.getProducts=asyncHandler(async (req,res,next) => {
    const products=await Product.find()
    res.status(200).send({
        success: true,
        data: products
    })

})

// @desc Get single products
// @route GET /api/v1/products/:id
// @access public
exports.getProduct=asyncHandler(async (req,res,next) => {
    const product=await Product.findById(req.params.id)
    res.status(200).send({
        success: true,
        data: product
    })

})

// @desc add a product
// @route POST /api/v1/products
// @access private
exports.addProduct=asyncHandler(async (req,res,next) => {
    const data=req.body

    const product=await Product.create(data)

    res.status(201).send({
        success: true,
        data: product
    })

})


// @desc Update a products
// @route PATCH /api/v1/products/:id
// @access private
exports.updateProduct=asyncHandler(async (req,res,next) => {
    const {name,price}=req.body
    const product=await Product.findById(req.params.id)
    if(!product) {
        return next(new ErrorResponse(404,`Product with ID:${req.params.id} not found!`))
    }
    if(name) product.name=name
    if(price) product.price=price

    await product.save()

    res.status(200).send({
        success: true,
        data: product
    })
})
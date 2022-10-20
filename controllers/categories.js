const mongoose=require("mongoose");
const Category=require('../models/Category')
const asyncHandler=require("../middlewares/async");
const ErrorResponse=require("../utils/ErrorResponse");

// @desc Get all categories
// @route GET /api/v1/categories
// @access private
exports.getCategories=asyncHandler(async (req,res,next) => {
    const categories=await Category.find()
    res.status(200).send({
        success: true,
        data: categories
    })
})

// @desc Get single categories
// @route GET /api/v1/categories/:id
// @access private
exports.getCategory=asyncHandler(async (req,res,next) => {
    const category=await Category.findById(req.params.id)
    res.status(200).send({
        success: true,
        data: category
    })
})

// @desc add a categories
// @route POST /api/v1/categories
// @access private
exports.addCategory=asyncHandler(async (req,res,next) => {
    const data=req.body
    const categories=await Category.create(data)
    res.status(201).send({
        success: true,
        data: categories
    })
})

// @desc Update a categories
// @route PATCH /api/v1/categories/:id
// @access private
exports.updateCategory=asyncHandler(async (req,res,next) => {
    const {name}=req.body
    const category=await Category.findById(req.params.id)
    if(!category) {
        return next(new ErrorResponse(404,`Category with ID:${req.params.id} not found!`))
    }
    if(name) category.name=name
    await category.save()

    res.status(200).send({
        success: true,
        data: category
    })
})

// @desc Delete a category
// @route DELETE /api/v1/categories/id
// @access private
exports.deleteCategory=asyncHandler(async (req,res,next) => {

    const category=await Category.findOne({_id: req.params.id})
    if(!category) {
        return next(new ErrorResponse(404,'Category not found'))
    }
    await category.remove()
    res.status(200).send({
        success: true,
        data: {}
    })

})
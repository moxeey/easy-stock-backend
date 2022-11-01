const Shop=require('../models/Shop')
const asyncHandler=require("../middlewares/async");
const ErrorResponse=require("../utils/ErrorResponse");

// @desc Get all shops
// @route GET /api/v1/shops
// @access private
exports.getShops=asyncHandler(async (req,res,next) => {
    const shops=await Shop.find()
    res.status(200).send({
        success: true,
        data: shops
    })
})

// @desc Get single shops
// @route GET /api/v1/shops/:id
// @access private
exports.getShop=asyncHandler(async (req,res,next) => {
    const shop=await Shop.findById(req.params.id)
    res.status(200).send({
        success: true,
        data: shop
    })
})

// @desc add a shops
// @route POST /api/v1/shops
// @access private
exports.addShop=asyncHandler(async (req,res,next) => {
    const data=req.body
    const shops=await Shop.create(data)
    res.status(201).send({
        success: true,
        data: shops
    })
})

// @desc Update a shops
// @route PATCH /api/v1/shops/:id
// @access private
exports.updateShop=asyncHandler(async (req,res,next) => {
    const {phone,email,title,address,location}=req.body
    const shop=await Shop.findById(req.params.id)
    if(!shop) {
        return next(new ErrorResponse(404,`Shop with ID:${req.params.id} not found!`))
    }
    if(phone) shop.phone=phone
    if(email) shop.email=email
    if(title) shop.title=title
    if(address) shop.address=address
    if(location) shop.location=location


    await shop.save()

    res.status(200).send({
        success: true,
        data: shop
    })
})

// @desc Delete a shop
// @route DELETE /api/v1/shops/id
// @access private
exports.deleteShop=asyncHandler(async (req,res,next) => {

    const shop=await Shop.findOne({_id: req.params.id})
    if(!shop) {
        return next(new ErrorResponse(404,'Shop not found'))
    }
    await shop.remove()
    res.status(200).send({
        success: true,
        data: {}
    })

})
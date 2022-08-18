const router=require('express').Router()
const {getProducts,addProduct,getProduct}=require('../controllers/products')

router.route('/').get(getProducts).post(addProduct)
router.route('/:id').get(getProduct)

module.exports=router
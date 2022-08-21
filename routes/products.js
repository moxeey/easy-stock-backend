const router=require('express').Router()
const {getProducts,addProduct,getProduct,updateProduct}=require('../controllers/products')

router.route('/').get(getProducts).post(addProduct)
router.route('/:id').get(getProduct).patch(updateProduct)

module.exports=router
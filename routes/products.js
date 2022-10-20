const router=require('express').Router()
const {getProducts,addProduct,getProduct,updateProduct,deleteProduct}=require('../controllers/products')

router.route('/').get(getProducts).post(addProduct)
router.route('/:id').get(getProduct).patch(updateProduct).delete(deleteProduct)

module.exports=router
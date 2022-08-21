const express=require('express')
const router=express.Router()

const {getOrder,getOrders,updateOrder,addOrder}=require('../controllers/orders')

router.route('/').get(getOrders).post(addOrder)
router.route('/:id').get(getOrder).patch(updateOrder)

module.exports=router
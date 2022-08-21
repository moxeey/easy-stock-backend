const express=require('express')
const router=express.Router()

const {getOrders,getOrder,updateOrder,addOrder}=require('../controllers/supplies')

router.route('/').get(getOrders).post(addOrder)
router.route('/:id').get(getOrder).patch(updateOrder)

module.exports=router
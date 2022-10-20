const express=require('express')
const router=express.Router()

const {getOrders,getOrder,updateOrder,addOrder,deleteSupply}=require('../controllers/supplies')

router.route('/').get(getOrders).post(addOrder)
router.route('/:id').get(getOrder).patch(updateOrder).delete(deleteSupply)

module.exports=router
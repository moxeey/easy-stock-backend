const express=require('express')
const router=express.Router()

const {getCustomer,getCustomers,addCustomer,updateCustomer}=require('../controllers/customers')

router.route('/').get(getCustomers).post(addCustomer)
router.route('/:id').get(getCustomer).patch(updateCustomer)

module.exports=router
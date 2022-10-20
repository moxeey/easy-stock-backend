const express=require('express')
const router=express.Router()

const {getSupplier,getSuppliers,addSupplier,updateSupplier,deleteSupplier}=require('../controllers/suppliers')

router.route('/').get(getSuppliers).post(addSupplier)
router.route('/:id').get(getSupplier).patch(updateSupplier).delete(deleteSupplier)

module.exports=router
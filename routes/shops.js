const express=require('express')
const router=express.Router()

const {getShop,getShops,addShop,updateShop,deleteShop}=require('../controllers/shops')

router.route('/').get(getShops).post(addShop)
router.route('/:id').get(getShop).patch(updateShop).delete(deleteShop)

module.exports=router
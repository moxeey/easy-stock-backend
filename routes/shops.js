const express=require('express')
const router=express.Router()

const {getShop,getShops,addShop,updateShop}=require('../controllers/shops')

router.route('/').get(getShops).post(addShop)
router.route('/:id').get(getShop).patch(updateShop)

module.exports=router
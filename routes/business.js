const expres=require('express')
const router=expres.Router()
const {getBusiness,getBusinesses,addBusiness,updateBusiness}=require('../controllers/business')

router.route('/')
    .get(getBusinesses).post(addBusiness)
router.route('/:id')
    .get(getBusiness)
    .patch(updateBusiness)


module.exports=router
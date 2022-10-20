const expres=require('express')
const router=expres.Router()
const {getBusiness,getBusinesses,addBusiness,updateBusiness,deleteBusiness}=require('../controllers/business')

router.route('/')
    .get(getBusinesses).post(addBusiness)
router.route('/:id')
    .get(getBusiness)
    .patch(updateBusiness)
    .delete(deleteBusiness)


module.exports=router
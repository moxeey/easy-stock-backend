const express=require('express')
const router=express.Router()

const {getCategories,getCategory,addCategory,updateCategory}=require('../controllers/categories')

router.route('/').get(getCategories).post(addCategory)
router.route('/:id').get(getCategory).patch(updateCategory)

module.exports=router
const express=require('express')
const router=express.Router()

const {getTransaction,getTransactions,updateTransaction,addTransaction}=require('../controllers/transactions')

router.route('/').get(getTransactions).post(addTransaction)
router.route('/:id').get(getTransaction).patch(updateTransaction)

module.exports=router
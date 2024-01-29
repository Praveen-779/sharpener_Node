const Expense = require('../models/expense');
const sequelize = require('../util/database');
const DownloadedExpense = require('../models/downloadedexpense')


const UserServices = require('../services/userservices');
const S3Services = require('../services/s3services');

exports.downloadExpense = async (req,res,next) => {
    try {
        const expenses = await UserServices.getExpenses(req);
        const stringifiedExpense = JSON.stringify(expenses);
        const filename = `Expensetrack${req.user.id}/${new Date()}.txt`;
        const fileUrl = await S3Services.uploadTos3(stringifiedExpense,filename);
        addDownloadedExpense(req,fileUrl);
        console.log(fileUrl);
        res.status(200).json({url : fileUrl});
    } catch(err) {
        console.log(err);
    }
    
}



exports.addExpense = async (req, res, next) => {
    const t = await sequelize.transaction();
    const amount = req.body.amount;
    const description = req.body.description;
    const category = req.body.category;

    try {
        const response = await req.user.createExpense({
            amount : amount,
            description: description,
            category: category
        },{transaction : t}) ;

        const totalExpense = req.user.totalexpense + + amount;
        await req.user.update({totalexpense : totalExpense },{transaction:t});
        console.log(totalExpense);

        //if everything is successfull, transaction will commit
        await t.commit();
        return res.status(200).json({});
    } catch(err) {
        console.log(err);
        //if any error occur transaction will rollback to previous commit
        await t.rollback();
        return res.status(500).json({error:'failed to add expense'});
    }
}

exports.getExpenses = async (req,res,next) => {
    try {
        const expenses = await req.user.getExpenses();
        return res.status(200).json({expenses : expenses});
    } catch(err) {
        return res.status(500).json({err}) ;
    }
}

exports.deleteExpense =  async (req,res,next) => {
    const id = req.params.id;
    const t = await sequelize.transaction();
    try {
        const expense = await Expense.findOne({where : {id : id, userId : req.user.id}},{transaction: t});
        const deletingAmount = expense.amount;
        console.log(expense.amount);
        await expense.destroy({transaction:t});
        console.log(deletingAmount);
        const totalExpense = Math.max(0,req.user.totalexpense - deletingAmount);
        await req.user.update({totalexpense : totalExpense},{transaction:t});
        await t.commit();
        return res.status(200).json({});
    } catch(err) {
        console.log(err);
        await  t.rollback();
        return res.status(500).json({err});
        }
}

exports.getDownloadedExpense = async(req,res,next) => {
    try {
        console.log(req.user.id);
        const response = await DownloadedExpense.findAll({where : {userId : req.user.id}});
        res.status(200).json({downloadedFiles : response});
    } catch(err) {
        console.log(err);
        res.status(500).json({err : err});
    }
   
}

async function addDownloadedExpense(req,fileUrl)  {
    try {
        const response = await DownloadedExpense.create({
            url : fileUrl,
            date : new Date().toLocaleString(),
            userId : req.user.id
        })
    } catch (err) {
        console.log(err);
        throw err;
    }
    
}
// DataBase Integration


//1 server and mongodb integration
//mongoose import
const mongoose = require('mongoose');



//2 state connection string via mongodb integration
mongoose.connect('mongodb://localhost:27017/BankServer',
{
    useNewUrlParser:true      // to avoid warnings
});



//3 define bank db model

const User=mongoose.model('User',
{
    //schema
    acno:Number,
    username:String,
    password:Number,
    balance:0,
    transaction:[]
})

module.exports={
    User
}
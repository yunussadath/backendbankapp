//import jwt

const jwt=require('jsonwebtoken')

//import db.js

const db = require('./db.js')

userDetails={       //object of objects
    1000:{acno:1000,username:'ajas',password:1000,balance:1000,transaction:[]},
    1001:{acno:1001,username:'ajmal',password:1111,balance:100,transaction:[]},
    1002:{acno:1002,username:'salma',password:1222,balance:10,transaction:[]},
  }

const register=(acno,username,password)=>{

 return db.User.findOne({acno})   //port 27017 ,backendport 3000

 .then(user=>{
   if(user){
    return{
      statusCode:401,
      status:false,
      message:'User Already Registered'
    }
   }
   else{
    const newUser=new db.User({
      acno,
        username,
        password,
        balance:0,
        transaction:[]
    }
    )
    newUser.save()  // to store data in mongodb
    return{
      statusCode:200,
      status:true,
      message:'Register Success'
  }
   }
   
 })
   
    // if(acno in userDetails){
    //   return{
    //     statusCode:401,
    //     status:false,
    //     message:'User Already Registered'
    //   }
    // }
    // else{
    //   userDetails[acno]={
    //     acno,
    //     username,
    //     password,
    //     balance:0,
    //     transaction:[]
    //   }
    // console.log(userDetails);
  
    // return{
    //     statusCode:200,
    //     status:true,
    //     message:'Register Success'
    // }
      
    // }
  }

  const login=(acno,pswd)=>{
   
    return db.User.findOne({acno,password:pswd})   //port 27017 ,backendport 3000
    .then(user=>{
      if(user){
        currentUser= user.username    // welcome user
        currentAcno=acno;                           //print transaction history
         //token generation
         const token=jwt.sign({currentAcno:acno},'suprekey77')
        return{
          statusCode:200,
          status:true,
          message:'Login Success',
          currentAcno,
          currentUser,
          token
      }
      }
      else{
        return{
          statusCode:401,
          status:false,
          message:'Incorrect Username Or Password '
        }
      }
    }) 

    // if(acno in userDetails){
    //   if(pswd==userDetails[acno]['password']){
    //     currentUser=userDetails[acno]['username']      // welcome user
    //     currentAcno=acno;                           //print transaction history
    //      //token generation
    //      const token=jwt.sign({currentAcno:acno},'suprekey77')
    //     return{
    //       statusCode:200,
    //       status:true,
    //       message:'Login Success',
    //       currentAcno,
    //       currentUser,
    //       token
    //   }
    //   }
    //   else{
    //     return{
    //       statusCode:401,
    //       status:false,
    //       message:'Password Error'
    //     }
      
    //   }
    // }
    // else{
    //   return{
    //     statusCode:401,
    //     status:false,
    //     message:'Invalid Username'
    //   }
    // }
  }


 const deposit=(acno,pswd,amt)=>{
  var amount=parseInt(amt)  

  return db.User.findOne({acno,password:pswd})   //port 27017 ,backendport 3000

  .then(User=>{
    if(User){
      User.balance+= amount
      User.transaction.push({
        type:'Credit',
        amount
      })
      User.save();
     
      
      return{
        statusCode:200,
        status:true,
        message:`${amount} is credited and balance is ${User.balance}`
      }
      
    }
    else{
     
      return{
        statusCode:401,
        status:false,
        message:'invalid password or username'
      }
    }
  })
    //  var amount=parseInt(amt);             //string ne integer lekk convert cheyyan

    //  if(acno in userDetails){
    //   if(pswd==userDetails[acno]['password']){
    //     userDetails[acno]['balance']+=amount;
    //     userDetails[acno]['transaction'].push({
    //       type:'Credit',
    //       amount
    //     })
    //     console.log(userDetails);
       
        
    //     return{
    //       statusCode:200,
    //       status:true,
    //       message:`${amount} is credited and balance is ${userDetails[acno]['balance']}`
    //     }
        
    //   }
    //   else{
       
    //     return{
    //       statusCode:401,
    //       status:false,
    //       message:'invalid password'
    //     }
    //   }
    //  }
    //  else{
    
    //   return{
    //     statusCode:401,
    //     status:false,
    //     message:'invalid user details'
    //   }
    //  }
  }


 const withdraw=(acno,pswd,amt)=>{
  var amount=parseInt(amt)                     //amount + aavaan parseInt kodukkuka

  return db.User.findOne({acno,password:pswd})   //port 27017 ,backendport 3000

  .then(User=>{
    if(User){
      if(User.balance > amount){

      
      User.balance-= amount
      User.transaction.push({
        type:'Debit',
        amount
      })
      User.save();
     
      
      return{
        statusCode:200,
        status:true,
        message:`${amount} is Debited and balance is ${User.balance}`
      }
      
    }
    else{
     
      return{
        statusCode:401,
        status:false,
        message:'ineffient balance'
      }
    }
  }
  })

  // return db.User.findOne({acno,password:pswd,amount:amt}) 
  //    var amount=parseInt(amt);             //string ne integer lekk convert cheyyan

  //    if(acno in userDetails){
  //     if(pswd==userDetails[acno]['password']){
  //       if(userDetails[acno]['balance']>amount){
  //       userDetails[acno]['balance']-=amount;
  //       userDetails[acno]['transaction'].push({
  //         type:'Debit',
  //         amount
  //       })
  //       console.log(userDetails);
       
        
        
  //       return{
  //         statusCode:200,
  //         status:true,
  //         message:`${amount} is debited and balance is ${userDetails[acno]['balance']}`
  //       }
  //     }
  //     else{
        
  //       return {
  //         statusCode:401,
  //         status:false,
  //         message:'insuffient balance'
  //       }
  //     }
  //     }
  //     else{
        
  //       return {
  //         statusCode:401,
  //         status:false,
  //         message:'invalid password'
  //       }
  //     }
  //    }
  //    else{
      
  //     return {
  //       statusCode:401,
  //       status:false,
  //       message:'invalid user details'
  //     }
  // }
}

const getTransaction=(acno)=>{

  return db.User.findOne({acno,}) 
  .then(User=>{
    if(User){
      return{
        statusCode:200,
        status:true,
        transaction:User.transaction
      }
    }
    return{
      statusCode:401,
      status:false,
      message:'Transfer Error'
    }
  })
  // return{
  //   statusCode:200,
  //   status:true,
  //   transaction:userDetails[acno]['transaction']
  // }
      

}
  //export

  module.exports={
    register,
    login,
    deposit,
    withdraw,
    getTransaction
  }
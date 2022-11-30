//server creation

// 1)import express

const express = require('express')

//import dataService

const dataService= require('./service/dataService')

//import jwt

const jwt=require('jsonwebtoken')

// 2)create an app using the express

const app = express();

//parse json from req body

app.use(express.json());

// 3)create a port number

app.listen(3000, ()=>{
    console.log('listening on port 3000');
})

//application specific middleware

const middleware=(req,res,next)=>{
   console.log('application specific middleware');
   next();
}
app.use(middleware)

//Router specific middleware

const jwtMiddleware = (req, res, next)=>{
  try{
   const token=req.headers['x-access-token'];
   console.log('Router specific middleware');          //verifying tokens
   const data=jwt.verify(token,'suprekey77')
   console.log(data);
   next();
  }
  catch{

   // 422 unproccessable errors
   res.status(422).json({                                  // ({}) - object
     statusCode:422,
     status:false,
     message:'please login'
   })
  }
}

// 4)resolving  HTTP requests

     //GET METHOD   - to get a data
     app.get('/',(req,res)=>{
        res.send("GET METHOD");
     })

     //POST METHOD   - to create a data

     app.post('/',(req,res)=>{
        res.send("POST METHOD");
     })

     //PUT METHOD   - to updata  a data completely

     app.put('/',(req,res)=>{
        res.send("PUT METHOD");
     })

     //DELETE METHOD   - to delete a data

     app.delete('/',(req,res)=>{
        res.send("DELETE METHOD");
     })

     //PATCH METHOD  - to update a data partially

     app.patch('/',(req,res)=>{
        res.send("PATCH METHOD");
     })

     //API calls or request

     //login
     //register
     //deposit
     //withdraw
     //transaction

     //Resolving register request

     app.post('/register',(req,res)=>{
        console.log(req.body);
        dataService.register(req.body.acno,req.body.username,req.body.password)
        .then(result=>{
         res.status(result.statusCode).json(result); 
        })
           //result.statusCode status code maaran vendi

        // if(result){
        //     res.send("Successfully Registered");
        // }
        // else{
        //     res.send("User Already Registered");
        // }
     });

      //Resloving Login Request

     app.post('/login',(req,res)=>{
      console.log(req.body);
      dataService.login(req.body.acno,req.body.password)
      .then(result=>{
         res.status(result.statusCode).json(result); 
      })
      
   
   });


//Resloving deposit Request

app.post('/deposit',jwtMiddleware,(req,res)=>{
   console.log(req.body);
   dataService.deposit(req.body.acno,req.body.password,req.body.amount)
   .then(result=>{
      res.status(result.statusCode).json(result); 
   })
   

});

//Resloving withdraw Request

app.post('/withdraw',(req,res)=>{
   console.log(req.body);
dataService.withdraw(req.body.acno,req.body.password,req.body.amount)
.then(result=>{
   res.status(result.statusCode).json(result); 
})
   

});

//Resloving transaction Request

app.post('/transaction',(req,res)=>{
   console.log(req.body);
   dataService.getTransaction(req.body.acno)
   .then(result=>{
      res.status(result.statusCode).json(result); 
   })
   

});
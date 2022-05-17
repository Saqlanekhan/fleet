const express = require('express');
const mongoose=require('mongoose');

const Db=require('./src/model/mongoose')


const app = express()
const port = 3000;



app.use(express.json())
app.post('/customerinfo', async (req, res) => {
  
    const db=new Db(req.body)  ;
    const response=await db.insertCustomer();
   
    res.send(response)
   })

   app.post('/book',async (req,res)=>{
    const db=new Db(req.body)  ;
    const response=await db.booking();
    if(response.er==1){
        res.status(500).json(response)
    }else{
        res.status(200).json(response)
    }
   })

   app.post('/vehileRegister',async (req,res)=>{
             
    const db=new Db(req.body);
const response=await db.vehicleR();
if(response.er==1){
    res.status(500).json(response)
}else{
    res.status(200).json(response)
}


   })
   

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})

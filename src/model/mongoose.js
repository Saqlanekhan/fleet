const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/Fleet')


const vehicle=require("../collection/vehicle")
const customer=require("../collection/customer")
const bookings=require("../collection/bookings")


class Db{
constructor(requestDataObj){
this.requestData=requestDataObj
}

async insertCustomer(){
    const EmailId=this.requestData.EmailId;
    let erMsg=""
//check
try{
const checkCustomer= await customer.find({"EmailId":EmailId});
if(checkCustomer.length>0){
    return "customer already exists"
}else{
    const saveCustomer=await customer.create(this.requestData);

    return "customer data saved successfully"
}



}catch(er){

erMsg=er


}
return erMsg
    
}


async booking(){
    let erMsg=""
  try{
     const responseCheck= await bookings.create(this.requestData);
     console.log(responseCheck)
     return {message:"booking confirmed",data:responseCheck,er:0}
  } catch(e){
    erMsg=e
  } 
  return {message:erMsg,er:1}
}

async vehicleR(){
    let erMsg=""
  try{
     const responseCheck= await vehicle.create(this.requestData);
     console.log(responseCheck)
     return {message:"vehicle registered",data:responseCheck,er:0}
  } catch(e){
    erMsg=e
  } 
  return {message:erMsg,er:1}
}

}

module.exports=Db

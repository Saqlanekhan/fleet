const kue= require ('kue-scheduler')
var Queue = kue.createQueue();
const mongoose= require('mongoose')

const bookings = require('./src/collection/bookings')

require('./src/model/mongoose')

//processing jobs


Queue.process('getLatestBookings',async(job,done)=>{

    console.log('\nProcessing job with id %s at %d',job.id,new Date());

    const booking = await bookings.find({"createdAt":{$gte:new Date(Date.now()-90 * 60 *1000)}})

    done(null,booking)



})



Queue.on('schedule error',function(error){
    console.log(error)

})

Queue.on('schedule success ',function(job){
   job.on('complete',function(result){
       if(result.length ===0){
           console.log('no new records in last 3 minuts');
       }else{
           console.log('new booking records:',result);
       }

   }).on('failed attempt',function(errorMessage,doneAttempts){
       console.log('job failed ')
   }).on('failed',function(errorMessage){
       console.log('job failed ')
   }).on('progress',function(progress,data){
       console.log('\r  job #' + job.id + ' ' + progress + '% complete with data',data)
   })
})


var job = Queue
.createJob('getLatestBookings',{
    to:'any'
})

.attempts(3)
.backoff({
    delay:1000,
    type:'fixed'
})
.priority('normal');

Queue.every('3 seconds',job)



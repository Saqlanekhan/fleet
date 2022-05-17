
const mongoose = require('mongoose')
const {Schema}=mongoose

const bookingSchema=new Schema( {
   vehicle_id:{
    type: Schema.ObjectId,
    required: true,
    trim: true,
},
    Customer_id: {
        type: Schema.ObjectId,
        required: true,
        trim: true,
    },
    From_address: {
        type: String,
        required: true,
        trim: true,
    },
    To_address: {
        type: String,
        required: true,
        trim: true,
    },
    booking_date:{
         type: Date,
         required: true,
          trim: true,

    },
    booking_time:{
        type: String,
        required: true,
         trim: true,
    },
    passenger_count:{
        type:Number
    }


    
})

const bookings = mongoose.model('booking',bookingSchema)

module.exports = bookings
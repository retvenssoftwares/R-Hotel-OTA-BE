const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const randomstring = require('randomstring')

const bookingSchema = mongoose.Schema({

    //     propertyId:{
    //         type:String,
    //         default:""
    //     },
    //     roomTypeId: {
    //         type: String,
    //         default: ''
    //     },
    //     employee_id:{
    //         type:String,
    //         default:""
    //     },
    //     guest_id:{
    //         type:String,
    //         default:mongoose.Types.ObjectId
    //     },
    //     arrival_date:{
    //         type: String,
    //         default:""
    //     },
    //     special_occasion:{
    //         type :String,
    //         default:""
    //     },
    //     departure_date:{
    //         type:String,
    //         default:""
    //     },
    //     
    //     guest_title:{
    //         type:String,
    //         default:""
    //     },
    //     guest_first_name:{
    //         type:String,
    //         default:""
    //     },
    //     guest_last_name:{
    //         type:String,
    //         default:""
    //     },
    //   
    //     guest_mobile_number:{
    //         type:String,
    //         default:""
    //     },
    //     guest_email:{
    //         type:String,
    //         default:""
    //     },
    //     guest_special_request:{
    //         type:String,
    //         default:""
    //     },
    //     
    //
    //     guest_fax:{
    //         type:String,
    //         default:""
    //     },
    //    
    //     discount:{
    //         type:String,
    //         default:""
    //     },
    //     payment_mode:{
    //         type:String,
    //         default:""
    //     },
    //     payment_link: {
    //         type: String,
    //         default:''
    //     },
    //     billing_instructions:{
    //         type:String,
    //         default:""
    //     },
    //     payment_id:{
    //         type:String,
    //         default:""
    //     },
    //     business_source:{
    //         type:String,
    //         default:""
    //     },
    //     market_segment:{
    //         type:String,
    //         default:""
    //     },
    //     company_name:{
    //         type:String,
    //         default:""
    //     },
    //     company_address:{
    //         type:String,
    //         default:""
    //     },
    //     caller_type:{
    //         type:String,
    //         default:""
    //     },

    //     guest_location:{
    //         type:String,
    //         default:""
    //     },

    //     calls_details:[{
    //         call_id:{
    //             type:String,
    //             default:""
    //         }
    //     }],

    //     callback_date_time:{
    //         type:String,
    //         default:""
    //     },     

    //     salutation :{
    //         type:String,
    //         default:""
    //     },
    //     remark :{
    //         type : String,
    //         default:""
    //     },
    //     department:{
    //         type : String,
    //         default:""
    //     },
    //     gst_number:{
    //         type:String,
    //         default:""
    //     },
    //     reservation_type:{
    //         type:String,
    //         default:""
    //     },
    //     reservation_number: {
    //         type: String, default:''
    //     },
    //     subReservation_no:[
    //         {type: String}
    //     ],

    //     booking_status:{
    //         type: String,
    //         enum:["PendingBooking", "FailBooking", "ConfirmBooking", "CancelledBooking"],
    //         default: "FailBooking"
    //     },
    //     made_by:{
    //         type: String,
    //         required: false,
    //         default: ''
    //     },


    //     booking_source: {
    //         type:String,
    //         default:""
    //     },
    //     Inventory_Mode:{
    //         type : String,
    //         default :""
    //     },
    //     lang_key : {
    //         type:String,
    //         default :""
    //     },
    //     alternate_contact:{
    //         type : String,
    //         default:""
    //     },
    //     // disposition :{
    //     //     type : String,
    //     //     default:""
    //     // },
    //     business_source: {
    //         type:String,
    //         default:""
    //     },
    //     reservation_type:{
    //         type:String,
    //         default:""
    //     },
    //     total_price: {
    //         type:String,
    //         default:""
    //     },
    //     room_nights:{
    //         type:String,
    //         default:""
    //     },

    propertyId: {
        type: String,
        default: ""
    },
    checkInDate: {
        type: String,
        default: ""
    },
    checkOutDate: {
        type: String,
        default: ""
    },
    bookingId: {
        type: String,
        default: ""
    },
    roomDetails: [{
        roomTypeId: {
            type: String,
            default: ""
        },
        ratePlanId: {
            type: String,
            default: ""
        },
        reservationId: {
            type: String,
            default: randomstring.generate(15)
        },
        guestGender: {
            type: String,
            default: ""
        },
        baseAdult: {
            type: String,
            default: ""
        },
        guestAddress1: {
            type: String,
            default: ""
        },
        guestAddress2: {
            type: String,
            default: ""
        },
        purposeOfTravel: {
            type: String,
            default: ""
        },
        extraChild: {
            type: String,
            default: ""
        },
        extraAdult: {
            type: String,
            default: ""
        },
        guestDevice: {
            type: String,
            default: ""
        },
        guestLocation: {
            type: String,
            default: ""
        },
        roomPrice: {
            type: String,
            default: ""
        },
        roomTax: {
            type: String,
            default: ""
        },
        guestFirstName: {
            type: String,
            default: ""
        },
        guestLastName: {
            type: String,
            default: ""
        },
        guestEmail: {
            type: String,
            default: ""
        },
        guestCity: {
            type: String,
            default: ""
        },
        guestState: {
            type: String,
            default: ""
        },
        guestCountry: {
            type: String,
            default: ""
        },
        guestZipCode: {
            type: String,
            default: ""
        },
        guestPhoneNumber: {
            type: String,
            default: ""
        },
        estimatedArrival: {
            type: String,
            default: ""
        },
        specialRequest: {
            type: String,
            default: "",
        },
        salutation: {
            type: String,
            default: ""
        },

    }],

    roomNights: {
        type: String,
        default: ""
    },
    totalRoomRate: {
        type: String,
        default: ""
    },
    totalTax: {
        type: String,
        default: "",
    },
    totalAmount: {
        type: String,
        default: "",
    },
    bookingStatus: {
        type: String,
        default: "",
    },
    paymentStatus: {
        type: String,
        default: "",
    },
    paymentMode: {
        type: String,
        default: "",
    },
    madeBy: {
        type: String,
        default: "",
    },


})

module.exports = mongoose.model('Booking', bookingSchema);

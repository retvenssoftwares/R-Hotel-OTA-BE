const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema;

const bookingSchema = mongoose.Schema({
    booking_id:{
        type: mongoose.Types.ObjectId,
        default: mongoose.Types.ObjectId,
        unique: true
    },
    propertyId:{
        type:String,
        default:""
    },
    roomTypeId: {
        type: String,
        default: ''
    },
    employee_id:{
        type:String,
        default:""
    },
    guest_id:{
        type:String,
        default:mongoose.Types.ObjectId
    },
    arrival_date:{
        type: String,
        default:""
    },
    special_occasion:{
        type :String,
        default:""
    },
    departure_date:{
        type:String,
        default:""
    },
    purpose_of_travel:{
        type:String,
        default:""
    },
    guest_title:{
        type:String,
        default:""
    },
    guest_first_name:{
        type:String,
        default:""
    },
    guest_last_name:{
        type:String,
        default:""
    },
    guest_gender:{
        type:String,
        default:""
    },
    guest_mobile_number:{
        type:String,
        default:""
    },
    guest_email:{
        type:String,
        default:""
    },
    guest_special_request:{
        type:String,
        default:""
    },
    guest_address_1:{
        type:String,
        default:""
    },
    guest_address_2:{
        type:String,
        default:""
    },
    guest_city:{
        type:String,
        default:""
    },
    guest_state:{
        type:String,
        default:""
    },
    guest_country:{
        type:String,
        default:""
    },
    guest_zip_code:{
        type:String,
        default:""
    },
    guest_fax:{
        type:String,
        default:""
    },
    guest_device:{
        type:String,
        default:""
    },
    discount:{
        type:String,
        default:""
    },
    payment_mode:{
        type:String,
        default:""
    },
    payment_link: {
        type: String,
        default:''
    },
    billing_instructions:{
        type:String,
        default:""
    },
    payment_id:{
        type:String,
        default:""
    },
    business_source:{
        type:String,
        default:""
    },
    market_segment:{
        type:String,
        default:""
    },
    company_name:{
        type:String,
        default:""
    },
    company_address:{
        type:String,
        default:""
    },
    caller_type:{
        type:String,
        default:""
    },

    guest_location:{
        type:String,
        default:""
    },

    calls_details:[{
        call_id:{
            type:String,
            default:""
        }
    }],

    callback_date_time:{
        type:String,
        default:""
    },     
   
    salutation :{
        type:String,
        default:""
    },
    remark :{
        type : String,
        default:""
    },
    department:{
        type : String,
        default:""
    },
    gst_number:{
        type:String,
        default:""
    },
    reservation_type:{
        type:String,
        default:""
    },
    reservation_number: {
        type: String, default:''
    },
    subReservation_no:[
        {type: String}
    ],
   
    booking_status:{
        type: String,
        enum:["PendingBooking", "FailBooking", "ConfirmBooking", "CancelledBooking"],
        default: "FailBooking"
    },
    made_by:{
        type: String,
        required: false,
        default: ''
    },
  
    
    booking_source: {
        type:String,
        default:""
    },
    Inventory_Mode:{
        type : String,
        default :""
    },
    lang_key : {
        type:String,
        default :""
    },
    alternate_contact:{
        type : String,
        default:""
    },
    // disposition :{
    //     type : String,
    //     default:""
    // },
    business_source: {
        type:String,
        default:""
    },
    reservation_type:{
        type:String,
        default:""
    },
    total_price: {
        type:String,
        default:""
    },
    room_nights:{
        type:String,
        default:""
    },
        

}, {timestamps:true})

module.exports = mongoose.model('Booking', bookingSchema);

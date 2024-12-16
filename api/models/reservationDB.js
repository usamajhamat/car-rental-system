const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    age: { type: Number, required: true }, // Use Number for age
    phone: { type: String, required: true },
    email: { type: String, required: true, match: [/\S+@\S+\.\S+/, 'Please use a valid email address'] },  // Email validation
    address: String,
    city: String,
    zipcode: { type: String, required: true }, // You can use String or Number here depending on your use case
    carType: { type: String, required: true }, 
    pickPlace: { type: String, required: true },
    dropPlace: { type: String, required: true },
    pickDate: { type: Date, required: true },  // Use Date type for pickDate
    dropDate: { type: Date, required: true },  // Use Date type for dropDate
    pickTime: { type: String, required: true },
    dropTime: { type: String, required: true }
});

const Reservation = mongoose.model('Reservation', reservationSchema);

module.exports = Reservation;

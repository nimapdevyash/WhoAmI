import mongoose from "mongoose";
const contactSchema = new mongoose.Schema({
  first_name: {
    type: String,
    require: true,
  },
  last_name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  mobile_number: {
    type: String,
    require: true,
  },
  address: {
    type: String,
    require: true,
  },
} , {
  timestamps : true
});

module.exports = mongoose.model("Contacts" , contactSchema);
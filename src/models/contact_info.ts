import mongoose from "mongoose";
const contactSchema = new mongoose.Schema(
  {
    name: {
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
  },
  {
    timestamps: true,
  }
);

const Contacts = mongoose.model("Contacts", contactSchema);

export default Contacts ;

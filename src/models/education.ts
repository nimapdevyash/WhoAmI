
import mongoose from "mongoose";

const educationSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  collage_name: {
    type: String,
    require: true,
  },
  start_year: {
    type: String,
    require: true,
  },
  end_year: {
    type: String,
    require: true,
  },
}, {
  timestamps : true
});

module.exports = mongoose.model("Education" , educationSchema);
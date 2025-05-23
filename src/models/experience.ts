
import mongoose from "mongoose";

const experienceSchema = new mongoose.Schema({
  organization : {
    type: String,
    require: true,
  },
  position: {
    type: String,
    require: true,
  },
  start_date: {
    type: String,
    require: true,
  },
  end_date: {
    type: String,
    require: true,
  },
} , {
  timestamps : true
});

const Experience = mongoose.model("Experience" , experienceSchema);

export default Experience ;
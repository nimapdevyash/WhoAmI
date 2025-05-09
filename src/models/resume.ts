import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema({
  name : {
    type : String,
  },
  url : {
    type : String,
    require : true
  }
} , {timestamps : true})

const Resume = mongoose.model("Resume" , resumeSchema);

export default Resume ;
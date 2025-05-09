import mongoose from "mongoose";

const skillsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    Svg_logo: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

const Skills = mongoose.model("Skills", skillsSchema);

export default Skills;

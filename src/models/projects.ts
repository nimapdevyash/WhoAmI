import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
    },
    tools: {
      type: JSON,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
    live_url: {
      type: String,
      require: true,
    },
    github_url: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

const Project = mongoose.model("Project", projectSchema);

export default Project ;

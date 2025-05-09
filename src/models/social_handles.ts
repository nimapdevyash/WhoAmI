
import mongoose from "mongoose";

const social_handlesSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },url: {
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

const SocialHandles = mongoose.model("SocialHandles", social_handlesSchema);

export default SocialHandles;

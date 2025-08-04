import mongoose from "mongoose";

const parliamentSchema = new mongoose.Schema(
  {
    role: { type: String, required: true },
    name: { type: String, required: true },
    image: { type: String, required: true },
    year: { type: String, required: true },
  },
  { timestamps: true }
);

const ParliamentModel =
  mongoose.models.member || mongoose.model("member", parliamentSchema);

export default ParliamentModel;

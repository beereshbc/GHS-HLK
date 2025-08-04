import mongoose from "mongoose";

const staffSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    designation: { type: String, required: true },
    experience: { type: Number, required: true },
    image: { type: String, required: true },
  },
  { timestamps: true }
);

const StaffModel =
  mongoose.models.staff || mongoose.model("staff", staffSchema);

export default StaffModel;

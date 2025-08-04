import mongoose from "mongoose";

const timeTableSchema = new mongoose.Schema(
  {
    classLevel: {
      type: Number,
      required: true,
      unique: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const TimeTableModel =
  mongoose.models.timeTable || mongoose.model("timeTable", timeTableSchema);

export default TimeTableModel;

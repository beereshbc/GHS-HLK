import mongoose from "mongoose";

const TopperSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true },
    name: { type: String, required: true },
    image: { type: String, required: true },
    subjectMarks: {
      Kannada: { type: Number, required: true },
      English: { type: Number, required: true },
      Hindi: { type: Number, required: true },
      Mathematics: { type: Number, required: true },
      Science: { type: Number, required: true },
      SocialScience: { type: Number, required: true },
    },
    obtainedTotalMarks: { type: Number, required: true },
    maxTotalMarks: { type: Number, required: true },
    percentage: { type: Number, required: true },
    passoutYear: { type: Number, required: true },
  },
  { timestamps: true }
);

const TopperModel =
  mongoose.models.topper || mongoose.model("topper", TopperSchema);

export default TopperModel;

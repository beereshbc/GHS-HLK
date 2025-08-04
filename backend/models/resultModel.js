import mongoose from "mongoose";

const resultSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    rollNumber: { type: Number, required: true },
    class: { type: Number, enum: [8, 9, 10], required: true },
    year: { type: String, required: true },
    examType: { type: String, required: true },

    subjects: {
      Kannada: { type: Number, required: true },
      English: { type: Number, required: true },
      Hindi: { type: Number, required: true },
      Math: { type: Number, required: true },
      Science: { type: Number, required: true },
      SocialScience: { type: Number, required: true },
    },

    total: { type: Number, required: true },
    maxTotal: { type: Number, required: true },
    percentage: { type: Number, required: true },
    status: { type: String, required: true },
  },
  { timestamps: true }
);

const ResultModel =
  mongoose.models.result || mongoose.model("result", resultSchema);

export default ResultModel;

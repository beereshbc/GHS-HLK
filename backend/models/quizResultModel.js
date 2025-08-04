import mongoose from "mongoose";

const quizResultSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    classLevel: { type: Number, enum: [8, 9, 10], required: true },
    image: { type: String, required: true },
    week: { type: Number, required: true },
    maxMarks: { type: Number, required: true },
    obtainedMarks: { type: Number, required: true },
  },
  { timestamps: true }
);

const QuizResultModel =
  mongoose.models.quizResult || mongoose.model("quizResult", quizResultSchema);
export default QuizResultModel;

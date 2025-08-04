import mongoose from "mongoose";

const quizFormSchema = new mongoose.Schema(
  {
    classLevel: { type: Number, enum: [8, 9, 10], required: true },
    link: { type: String, required: true, default: "" },
  },
  { timestamps: true }
);

const QuizFormModel =
  mongoose.models.quizForm || mongoose.model("quizForm", quizFormSchema);

export default QuizFormModel;

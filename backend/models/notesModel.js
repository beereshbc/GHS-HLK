import mongoose from "mongoose";

const notesSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    driveLink: { type: String, required: true, default: "" },
    classLevel: { type: Number, enum: [8, 9, 10], required: true },
  },
  { timestamps: true }
);

const NotesModel =
  mongoose.models.notes || mongoose.model("notes", notesSchema);

export default NotesModel;

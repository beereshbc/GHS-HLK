import mongoose from "mongoose";

const gallerySchema = new mongoose.Schema(
  {
    image: { type: String, required: true },
    title: { type: String, required: true },
  },
  { timestamps: true }
);

const GalleryModel =
  mongoose.models.gallery || mongoose.model("gallery", gallerySchema);

export default GalleryModel;

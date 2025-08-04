import express from "express";
import {
  addBannerStudent,
  addBlog,
  addGallery,
  addMember,
  addStaff,
  addTopper,
  deleteAllResults,
  deleteBannerStudent,
  deleteBlogById,
  deleteGalleryItem,
  deleteMember,
  deleteStaff,
  deleteTopper,
  generateContent,
  getAllBlogs,
  getAllBlogsAdmin,
  getAllResults,
  getBannerStudent,
  getBlogById,
  getGallery,
  getMembers,
  getNotesLinks,
  getQuizLinks,
  getResult,
  getStaff,
  getTimetables,
  getToppers,
  loginAdmin,
  togglePublish,
  updateNotesLinks,
  updateQuizLinks,
  uploadResults,
  uploadTimetables,
} from "../controllers/adminController.js";
import upload from "../middlewares/multer.js";

const adminRouter = express.Router();

adminRouter.post("/admin-login", loginAdmin);
adminRouter.post("/add-quiz-student", upload.single("image"), addBannerStudent);
adminRouter.get("/quiz-student", getBannerStudent);
adminRouter.post("/dlt-quiz-student", deleteBannerStudent);
adminRouter.post("/add-staff", upload.single("image"), addStaff);
adminRouter.get("/staffs", getStaff);
adminRouter.post("/dlt-staff", deleteStaff);
adminRouter.post("/update-quiz-links", updateQuizLinks);
adminRouter.post("/add-notes-link", updateNotesLinks);
adminRouter.post("/update-timetable", upload.array("files"), uploadTimetables);
adminRouter.get("/quizzes", getQuizLinks);
adminRouter.get("/notes", getNotesLinks);
adminRouter.get("/timetables", getTimetables);
adminRouter.post("/upload-results", uploadResults);
adminRouter.get("/results", getResult);
adminRouter.get("/all-results", getAllResults);
adminRouter.delete("/dlt-results", deleteAllResults);
adminRouter.post("/add-member", upload.single("image"), addMember);
adminRouter.get("/get-members", getMembers);
adminRouter.post("/dlt-member", deleteMember);
adminRouter.post("/add-gallery", upload.single("image"), addGallery);
adminRouter.get("/get-gallery", getGallery);
adminRouter.post("/dlt-item", deleteGalleryItem);
adminRouter.post("/add-toppers", upload.single("image"), addTopper);
adminRouter.get("/get-toppers", getToppers);
adminRouter.post("/dlt-topper/:id", deleteTopper);
//

adminRouter.post("/add", upload.single("image"), addBlog); //Auth
adminRouter.get("/all", getAllBlogs);
adminRouter.get("/blog", getAllBlogsAdmin);
adminRouter.post("/delete", deleteBlogById); //Auth
adminRouter.post("/toggle-publish", togglePublish); //Auth
adminRouter.post("/generate", generateContent); //Auth
adminRouter.get("/:blogId", getBlogById);

export default adminRouter;

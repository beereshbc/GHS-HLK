import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";
import QuizResultModel from "../models/quizResultModel.js";
import StaffModel from "../models/staffModel.js";
import QuizFormModel from "../models/quizFormModel.js";
import TimeTableModel from "../models/timeTableModel.js";
import NotesModel from "../models/notesModel.js";
import ResultModel from "../models/resultModel.js";
import ParliamentModel from "../models/parliamentModel.js";
import GalleryModel from "../models/galleryModel.js";
import TopperModel from "../models/toppersModel.js";
import fs from "fs";
import main from "../config/gemini.js";
import BlogModel from "../models/blogModel.js";

const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(email, process.env.JWT_SECRET);
      res.json({ success: true, token });
    } else {
      res.json({ message: "Invalid Credentials" });
    }
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};

const addBannerStudent = async (req, res) => {
  try {
    const { name, classLevel, week, maxMarks, obtainedMarks } = req.body;
    const imageFile = req.file;

    if (
      !name ||
      !classLevel ||
      !week ||
      !maxMarks ||
      !obtainedMarks ||
      !imageFile
    ) {
      return res.json({ success: false, message: "Missing Details" });
    }

    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: "image",
    });
    const imageUrl = imageUpload.secure_url;

    const quizStudentData = {
      name,
      classLevel,
      week,
      maxMarks,
      obtainedMarks,
      image: imageUrl,
    };

    const newStudent = new QuizResultModel(quizStudentData);
    await newStudent.save();
    return res.json({ success: true, message: "Student Added" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

const getBannerStudent = async (req, res) => {
  try {
    const students = await QuizResultModel.find({});
    res.json({ success: true, students });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

const deleteBannerStudent = async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ success: false, message: "Invalid ID" });
    }

    const student = await QuizResultModel.findByIdAndDelete(id);

    if (!student) {
      return res
        .status(404)
        .json({ success: false, message: "Student not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Student data deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const addStaff = async (req, res) => {
  try {
    const { name, designation, experience } = req.body;
    const imageFile = req.file;

    if (!name || !designation || !experience || !imageFile) {
      return res.json({ success: false, message: "Missing Details" });
    }

    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: "image",
    });
    const imageUrl = imageUpload.secure_url;

    const staffData = {
      name,
      designation,
      experience,
      image: imageUrl,
    };

    const newStaff = new StaffModel(staffData);
    await newStaff.save();
    return res.json({ success: true, message: "Staff Added successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const getStaff = async (req, res) => {
  try {
    const staffs = await StaffModel.find({});
    if (staffs.length === 0) {
      return res.json({ success: false, message: "No staff members found" });
    }
    return res.json({ success: true, staffs });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const deleteStaff = async (req, res) => {
  try {
    const { id } = req.body;

    const staff = await StaffModel.findByIdAndDelete(id);
    if (!staff) {
      return res.json({ success: false, message: "Staff Not Found" });
    }
    return res.json({
      success: true,
      message: `${staff.name} deleted successfully`,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const updateQuizLinks = async (req, res) => {
  try {
    const { links } = req.body;

    if (!links || !Array.isArray(links)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid links data" });
    }

    for (const item of links) {
      const { classLevel, link } = item;
      if (!classLevel || !link) continue;

      await QuizFormModel.findOneAndUpdate(
        { classLevel },
        { link },
        { upsert: true, new: true }
      );
    }

    res
      .status(200)
      .json({ success: true, message: "Quiz links updated successfully" });
  } catch (error) {
    console.error("Quiz update error:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const updateNotesLinks = async (req, res) => {
  try {
    const { links } = req.body;

    if (!links || !Array.isArray(links)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid links data" });
    }

    for (const item of links) {
      const { classLevel, name, driveLink } = item;
      if (!classLevel || !name || !driveLink) continue;

      await NotesModel.findOneAndUpdate(
        { classLevel, name },
        { driveLink },
        { upsert: true, new: true }
      );
    }

    res
      .status(200)
      .json({ success: true, message: "Notes links updated successfully" });
  } catch (error) {
    console.error("Notes update error:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const uploadTimetables = async (req, res) => {
  try {
    const { classLevels } = req.body;
    const files = req.files;

    if (!files || files.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "No files uploaded" });
    }

    const levelArray = Array.isArray(classLevels) ? classLevels : [classLevels];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const classLevel = parseInt(levelArray[i]);

      if (!file?.path) {
        console.error(`Missing file path at index ${i}`);
        continue;
      }

      const result = await cloudinary.uploader.upload(file.path, {
        resource_type: "image",
      });

      if (!result.secure_url) {
        console.error(`Cloudinary upload failed at index ${i}`);
        continue;
      }

      await TimeTableModel.findOneAndUpdate(
        { classLevel },
        { image: result.secure_url },
        { upsert: true, new: true }
      );
    }

    res.status(200).json({
      success: true,
      message: "Timetables uploaded and updated successfully",
    });
  } catch (error) {
    console.error("Timetable upload error:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const getQuizLinks = async (req, res) => {
  try {
    const quizzes = await QuizFormModel.find().sort({ classLevel: 1 });
    res.status(200).json({ success: true, quizzes });
  } catch (error) {
    console.error("Error fetching quiz links:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

const getNotesLinks = async (req, res) => {
  try {
    const notes = await NotesModel.find().sort({ classLevel: 1 });
    res.status(200).json({ success: true, notes });
  } catch (error) {
    console.error("Error fetching notes links:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

const getTimetables = async (req, res) => {
  try {
    const timetables = await TimeTableModel.find().sort({ classLevel: 1 });
    res.status(200).json({ success: true, timetables });
  } catch (error) {
    console.error("Error fetching timetables:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

const uploadResults = async (req, res) => {
  try {
    const results = req.body;

    if (!Array.isArray(results) || results.length === 0) {
      return res.status(400).json({ message: "Invalid Excel data format" });
    }

    const formattedResults = results.map((item) => {
      const {
        name,
        rollNumber,
        class: classLevel,
        year,
        examType,
        Kannada,
        English,
        Hindi,
        Math,
        Science,
        SocialScience,
        total,
        maxTotal,
        percentage,
        status,
      } = item;

      return {
        name,
        rollNumber,
        class: classLevel,
        year,
        examType,
        subjects: {
          Kannada,
          English,
          Hindi,
          Math,
          Science,
          SocialScience,
        },
        total,
        maxTotal,
        percentage,
        status,
      };
    });

    await ResultModel.insertMany(formattedResults);

    res.status(200).json({ message: "Results uploaded successfully" });
  } catch (err) {
    console.error("Error uploading results:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getResult = async (req, res) => {
  try {
    const { class: classLevel, rollNumber } = req.query;

    if (!classLevel || !rollNumber) {
      return res.status(400).json({
        success: false,
        message: "Class and Roll Number are required",
      });
    }

    const result = await ResultModel.findOne({
      class: parseInt(classLevel),
      rollNumber: parseInt(rollNumber),
    });

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Result not found for the given class and roll number.",
      });
    }

    return res.status(200).json({
      success: true,
      result,
    });
  } catch (error) {
    console.error("Error fetching result:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

const getAllResults = async (req, res) => {
  try {
    const results = await ResultModel.find();
    res.status(200).json({ success: true, results });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

const deleteAllResults = async (req, res) => {
  try {
    await ResultModel.deleteMany({});
    res
      .status(200)
      .json({ success: true, message: "All results deleted successfully" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

const addMember = async (req, res) => {
  try {
    const { name, role, year } = req.body;
    const imageFile = req.file;

    if (!name || !role || !year || !imageFile) {
      return res.json({ success: false, message: "Missing Details" });
    }

    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: "image",
    });
    const imageUrl = imageUpload.secure_url;

    const memberData = {
      name,
      role,
      year,
      image: imageUrl,
    };

    const newMember = new ParliamentModel(memberData);
    await newMember.save();
    return res.json({ success: true, message: "Member Added" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

const getMembers = async (req, res) => {
  try {
    const members = await ParliamentModel.find().sort({ year: -1 });
    return res.json({ success: true, members });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

const deleteMember = async (req, res) => {
  try {
    const { id } = req.body;

    const member = await ParliamentModel.findByIdAndDelete(id);
    if (!member) {
      return res.json({ success: false, message: "Member not found" });
    }
    return res.json({
      success: true,
      message: `${member.name}'s Data is deleted`,
    });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

const addGallery = async (req, res) => {
  try {
    const { title } = req.body;
    const imageFile = req.file;

    if (!title || !imageFile) {
      return res.json({ success: false, message: "Missing Details" });
    }

    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: "image",
    });
    const imageUrl = imageUpload.secure_url;

    const galleryData = {
      title,
      image: imageUrl,
    };

    const newItem = new GalleryModel(galleryData);
    await newItem.save();
    return res.json({ success: true, message: "Item Added" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

const getGallery = async (req, res) => {
  try {
    const galleryItems = await GalleryModel.find({});
    return res.json({ success: true, galleryItems });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

const deleteGalleryItem = async (req, res) => {
  try {
    const { id } = req.body;

    const item = await GalleryModel.findByIdAndDelete(id);
    if (!item) {
      return res.json({ success: false, message: "Item is not found" });
    }
    return res.json({
      success: true,
      message: `${item.title} Data is deleted`,
    });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

const addTopper = async (req, res) => {
  try {
    const { name, passoutYear, obtainedTotalMarks, maxTotalMarks, percentage } =
      req.body;

    const subjects = [
      "Kannada",
      "English",
      "Hindi",
      "Mathematics",
      "Science",
      "SocialScience",
    ];

    const subjectMarks = {};
    for (const subject of subjects) {
      const raw = req.body[subject]; // ✅ flat key, NOT subjectMarks[subject]

      if (raw === undefined || raw === null || raw === "") {
        return res.json({
          success: false,
          error: `Missing value for ${subject}`,
        });
      }

      const num = parseFloat(raw);
      if (isNaN(num)) {
        return res.json({
          success: false,
          error: `Invalid number for ${subject}`,
        });
      }

      subjectMarks[subject] = num;
    }

    if (
      !name ||
      !passoutYear ||
      !obtainedTotalMarks ||
      !maxTotalMarks ||
      !percentage ||
      !req.file
    ) {
      return res.json({ success: false, error: "Missing required fields." });
    }

    const uploadResult = await cloudinary.uploader.upload(req.file.path, {
      folder: "toppers",
    });

    fs.unlinkSync(req.file.path);

    const topper = new TopperModel({
      id: Date.now(),
      name,
      image: uploadResult.secure_url,
      subjectMarks,
      obtainedTotalMarks: Number(obtainedTotalMarks),
      maxTotalMarks: Number(maxTotalMarks),
      percentage: Number(percentage),
      passoutYear: Number(passoutYear),
    });

    await topper.save();

    res.json({ success: true, message: "Topper added successfully!" });
  } catch (error) {
    res.json({ success: false, error: error.message });
  }
};

const getToppers = async (req, res) => {
  try {
    const toppers = await TopperModel.find({}).sort({ passoutYear: -1 });

    if (!toppers || toppers.length === 0) {
      return res
        .status(200)
        .json({ success: true, toppers: [], message: "No toppers found yet." });
    }

    return res.status(200).json({ success: true, toppers });
  } catch (error) {
    console.error("Error fetching toppers:", error);
    return res.status(500).json({ success: false, error: error.message });
  }
};

const deleteTopper = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedTopper = await TopperModel.findByIdAndDelete(id);

    if (!deletedTopper) {
      return res
        .status(404)
        .json({ success: false, error: "Topper not found" });
    }

    return res
      .status(200)
      .json({ success: true, message: "Topper deleted successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

const generateContent = async (req, res) => {
  try {
    const { prompt } = req.body;
    const content = await main(
      prompt + "Generate a blog content for this topic in simple text format"
    );
    res.json({ success: true, content });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

const addBlog = async (req, res) => {
  try {
    const { title, subTitle, description, isPublished } = JSON.parse(
      req.body.blog
    );

    const imageFile = req.file;

    if (!title || !description || !imageFile) {
      return res.json({ success: false, message: "Details are missing" });
    }

    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: "image",
    });
    const imageUrl = imageUpload.secure_url;

    const image = imageUrl;

    await BlogModel.create({
      title,
      subTitle,
      description,
      image,
      isPublished,
    });

    res.json({ success: true, message: "Blog added successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

const getAllBlogs = async (req, res) => {
  try {
    const blogs = await BlogModel.find({ isPublished: true });
    res.json({ success: true, blogs });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

const getBlogById = async (req, res) => {
  try {
    const { blogId } = req.params;
    const blog = await BlogModel.findById(blogId);
    if (!blog) {
      return res.json({ success: false, message: "Blog is not found" });
    }
    res.json({ success: true, blog });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

import mongoose from "mongoose";

const deleteBlogById = async (req, res) => {
  try {
    const { id } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.json({ success: false, message: "Invalid Blog ID" });
    }

    const blog = await BlogModel.findByIdAndDelete(id);

    if (!blog) {
      return res.json({ success: false, message: "Blog not found" });
    }

    res.json({ success: true, message: `${blog.title} deleted successfully` });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

const togglePublish = async (req, res) => {
  try {
    const { id } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.json({ success: false, message: "Invalid Blog ID" });
    }

    const blog = await BlogModel.findById(id);

    if (!blog) {
      return res.json({ success: false, message: "Blog not found" });
    }

    blog.isPublished = !blog.isPublished;
    await blog.save();

    res.json({
      success: true,
      message: `Blog has been ${
        blog.isPublished ? "published" : "unpublished"
      }`,
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
const getAllBlogsAdmin = async (req, res) => {
  try {
    const blogs = await BlogModel.find({}).sort({
      createdAt: -1,
    });
    res.json({ success: true, blogs });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export {
  loginAdmin,
  addBannerStudent,
  getBannerStudent,
  deleteBannerStudent,
  addStaff,
  deleteStaff,
  getStaff,
  updateNotesLinks,
  updateQuizLinks,
  uploadTimetables,
  getNotesLinks,
  getTimetables,
  getQuizLinks,
  uploadResults,
  getResult,
  getAllResults,
  deleteAllResults,
  addMember,
  getMembers,
  deleteMember,
  addGallery,
  getGallery,
  deleteGalleryItem,
  addTopper,
  getToppers,
  deleteTopper,
  generateContent,
  getAllBlogs,
  deleteBlogById,
  togglePublish,
  getBlogById,
  addBlog,
  getAllBlogsAdmin,
};

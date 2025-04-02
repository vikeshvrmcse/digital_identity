const express = require('express')
const Quiz=require('../Models/quize.js')
const mongoose = require("mongoose");
const ensureAuthentication=require('../Middlewares/auth.js');
const quizRouter = express.Router();


quizRouter.post("/create_quizzes",ensureAuthentication, async(req, res) => {
  try {
    const { userId, title, description, category, difficulty, passingScore, questions } = req.body;

    if (!userId) return res.status(400).json({ message: "User ID is required" });
    if (!questions || questions.length === 0) return res.status(400).json({ message: "At least one question is required" });

    const newQuiz = new Quiz({ userId, title, description, category, difficulty, passingScore, questions });
    await newQuiz.save();

    res.status(201).json({ message: "Quiz saved successfully", quiz: newQuiz });
  } catch (error) {
    res.status(500).json({ message: "Error saving quiz", error });
  }
});




quizRouter.get("/", ensureAuthentication, async (req, res) => {
    try {
        const userId = req.userId; 

        if (!userId) {
            return res.status(400).json({ success: false, message: "User ID is required" });
        }
        const quizzes = await Quiz.find({ userId: new mongoose.Types.ObjectId(userId) });

        if (quizzes.length === 0) {
            return res.status(404).json({ success: false, message: "No quizzes found for this user" });
        }
        res.status(200).json({ success: true, quizzes });
    } catch (error) {
        console.error("Error fetching quizzes:", error);
        res.status(500).json({ success: false, message: "Error fetching quizzes", error });
    }
});

quizRouter.delete("/delete_quizzes/:quizId", ensureAuthentication, async (req, res) => {
  try {
    const { quizId } = req.params;
    await Quiz.findByIdAndDelete(quizId);
    res.json({ success: true, message: "Quiz deleted successfully" });
  } catch (error) {
    console.error("Error deleting quiz:", error);
    res.status(500).json({ success: false, message: "Error deleting quiz" });
  }
});




quizRouter.put("/update_quizzes/:quizId", async (req, res) => {
  try {
    const { quizId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(quizId)) {
      return res.status(400).json({ success: false, message: "Invalid Quiz ID" });
    }

    const updatedQuiz = await Quiz.findByIdAndUpdate(quizId, req.body, {
      new: true,
    });

    if (!updatedQuiz) {
      return res.status(404).json({ success: false, message: "Quiz not found" });
    }

    res.json(updatedQuiz); // Return the updated quiz data
  } catch (error) {
    console.error("Error updating quiz:", error);
    res.status(500).json({ success: false, message: "Error updating quiz" });
  }
});


  


module.exports= quizRouter;

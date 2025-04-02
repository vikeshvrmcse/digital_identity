
const mongoose=require('mongoose')

const QuestionSchema = new mongoose.Schema({
  questionText: { type: String, required: true },
  image: { type: String },
  options: { type: [String], required: true },
  correctAnswer: { type: String, required: true },
  explanation: { type: String },
  timeLimit: { type: Number }
});

const QuizSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
  title: { type: String, required: true },
  description: { type: String },
  category: { type: String, required: true },
  difficulty: { type: String, required: true },
  passingScore: { type: Number, required: true },
  questions: { type: [QuestionSchema], required: true }
});

const Quiz = mongoose.model("Quiz", QuizSchema);
module.exports=Quiz;

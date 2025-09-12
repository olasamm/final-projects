const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
require("dotenv").config();
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
express.static('uploads');
const URI = process.env.uri

port = process.env.PORT 
// const User = require("./model/userModel");
const Student = require('./model/studentModel');
const Lecturer = require('./model/lecturerModel');
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use('/uploads', express.static('uploads'));

const Resource = require('./model/resourceModel');
const multer = require("multer");
const upload = multer({ dest: 'uploads/' });

mongoose.connect(URI)
.then(() => {
    console.log("Connected to MONGODB");
})
.catch((err) => {
    console.log(err);
});



  // Student Signup
app.post('/student/signup', async (req, res) => {
  try {
    const { matricNumber, name, email, password } = req.body;
    if (!matricNumber || !name || !email || !password) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    const existingStudent = await Student.findOne({ matricNumber });
    if (existingStudent) {
      return res.status(400).json({ error: 'Student already exists' });
    }
    const student = new Student({ matricNumber, name, email, password });
    await student.save();
    res.status(201).json({ message: 'Student signed up successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to sign up student: ' + error.message });
  }
});

// Lecturer Signup
app.post('/lecturer/signup', async (req, res) => {
  try {
    console.log('Incoming Request Body:', req.body);
    const lecturer = new Lecturer(req.body);
    await lecturer.save();
    res.status(201).json({ message: 'Lecturer signed up successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to sign up lecturer: ' + error.message });
  }
});

// Student Signin
app.post('/student/signin', async (req, res) => {
  try {
    const { matricNumber, password } = req.body;
    const student = await Student.findOne({ matricNumber });
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }
    if (student.password !== password) {
      return res.status(401).json({ error: 'Invalid password' });
    }
    res.status(200).json({ message: 'Student signed in successfully', id: student._id, name: student.name });
  } catch (error) {
    res.status(500).json({ error: 'Failed to sign in student: ' + error.message });
  }
});

// Lecturer Signin
app.post('/lecturer/signin', async (req, res) => {
  try {
    const { staffId, password } = req.body;
    const lecturer = await Lecturer.findOne({ staffId });
    if (!lecturer) {
      return res.status(404).json({ error: 'Lecturer not found' });
    }
    if (lecturer.password !== password) {
      return res.status(401).json({ error: 'Invalid password' });
    }
    res.status(200).json({ message: 'Lecturer signed in successfully', id: lecturer._id, name: lecturer.name });
  } catch (error) {
    res.status(500).json({ error: 'Failed to sign in lecturer: ' + error.message });
  }
});



  let assignments = [];
  let submissions = {};
  
  app.post('/create-assignment', async (req, res) => {
    try {
      const { id, title, course, lecturerName, instructions, dueDate, dueTime, questions } = req.body;
      console.log('index.js: Received create-assignment:', req.body);
      if (!id || !title || !course || !lecturerName || !instructions || !dueDate || !dueTime || !questions || questions.length === 0) {
        console.log('index.js: Missing fields in create-assignment:', req.body);
        return res.status(400).json({ error: 'All fields are required and at least one question must be provided.' });
      }
      const assignment = { id: id.toString(), title, course, lecturerName, instructions, dueDate, dueTime, questions, createdAt: new Date().toISOString() };
      assignments.push(assignment);
      console.log('index.js: Assignment created:', { id, title, course, lecturerName });
      res.status(201).json({ message: 'Assignment created successfully', assignment });
    } catch (error) {
      console.error('index.js: Error creating assignment:', error);
      res.status(500).json({ error: 'Failed to create assignment' });
    }
  });
  
  app.get('/assignments', (req, res) => {
    console.log('index.js: Fetching assignments:', assignments);
    res.status(200).json(assignments);
  });
  
  app.post('/submit-assignment', async (req, res) => {
    try {
      const { assignmentId, studentId, studentName, answers, files, images } = req.body;
      console.log('index.js: Received submit-assignment:', req.body);
      if (!assignmentId || !studentId || !studentName || !answers) {
        console.log('index.js: Missing fields in submit-assignment:', req.body);
        return res.status(400).json({ error: 'All fields are required' });
      }
      const assignmentExists = assignments.find(a => a.id.toString() === assignmentId.toString());
      if (!assignmentExists) {
        console.log('index.js: Assignment not found for ID:', assignmentId);
        return res.status(404).json({ error: 'Assignment not found' });
      }
      const submission = {
        assignmentId: assignmentId.toString(),
        studentId: studentId.toString(),
        studentName,
        answers,
        files: files || {},
        images: images || {},
        submittedAt: new Date().toISOString(),
        status: "pending",
        grade: null,
        totalGrade: null,
        comment: ""
      };
      if (!submissions[assignmentId]) {
        submissions[assignmentId] = [];
      }
      submissions[assignmentId].push(submission);
      console.log('index.js: Submission created:', { assignmentId, studentId, studentName });
      res.status(201).json({ message: 'Submission successful', submission });
    } catch (error) {
      console.error('index.js: Error submitting assignment:', error);
      res.status(500).json({ error: 'Failed to submit assignment' });
    }
  });
  
  app.get('/submissions', (req, res) => {
    console.log('index.js: Fetching submissions:', submissions);
    if (Object.keys(submissions).length === 0) {
      console.log('index.js: No submissions found');
    }
    res.status(200).json(submissions);
  });
  
  app.post('/grade-submission', async (req, res) => {
    try {
      const { assignmentId, studentId, grade, totalGrade, comment } = req.body;
      console.log('index.js: Received grade-submission:', req.body);
      if (!assignmentId || !studentId || !totalGrade) {
        console.log('index.js: Missing fields in grade-submission:', req.body);
        return res.status(400).json({ error: 'All fields are required' });
      }
      if (!submissions[assignmentId]) {
        console.log('index.js: No submissions for assignmentId:', assignmentId);
        return res.status(404).json({ error: 'Submission not found' });
      }
      const submission = submissions[assignmentId].find(sub => sub.studentId.toString() === studentId.toString());
      if (!submission) {
        console.log('index.js: Submission not found for studentId:', studentId, 'assignmentId:', assignmentId);
        return res.status(404).json({ error: 'Submission not found' });
      }
      submission.grade = grade || submission.grade;
      submission.totalGrade = totalGrade.toString();
      submission.comment = comment || submission.comment;
      submission.status = "graded";
      console.log('index.js: Submission graded:', { assignmentId, studentId, totalGrade });
      res.status(200).json({ message: 'Submission graded', submission });
    } catch (error) {
      console.error('index.js: Error grading submission:', error);
      res.status(500).json({ error: 'Failed to grade submission' });
    }
  });
  
  app.post('/clear-data', (req, res) => {
    assignments = [];
    submissions = {};
    console.log('index.js: Data cleared');
    res.status(200).json({ message: 'Data cleared' });
  });





  // Upload resource (Lecturer)
app.post('/resources', upload.single('file'), async (req, res) => {
  try {
    console.log('Request body:', req.body);
    console.log('Uploaded file:', req.file);

    const { title, description } = req.body;
    const filePath = req.file ? req.file.path : null;

    if (!title || !description || !filePath) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const resource = new Resource({ title, description, filePath });
    await resource.save();

    res.status(201).json({ message: 'Resource added successfully' });
  } catch (error) {
    console.error('Error adding resource:', error);
    res.status(500).json({ message: 'Failed to add resource' });
  }
});

// Fetch resources (Student)
app.get('/resources', async (req, res) => {
  try {
    const resources = await Resource.find();
    res.status(200).json(resources);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch resources' });
  }
});



app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.use((req, res, next) => {
  console.log('Incoming Request:', req.method, req.url, req.body);
  next();
});



app.listen(port, () => {
    console.log(`Server is running on port ${port}`);

    
})

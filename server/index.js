const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
require("dotenv").config();
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const URI = process.env.uri

port = process.env.PORT 
const User = require("./model/userModel");
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());



mongoose.connect(URI)
.then(() => {
    console.log("Connected to MONGODB");
})
.catch((err) => {
    console.log(err);
});



  
  app.post('/submit', async (req, res) => {
    try {
      const { id, name, mail, password } = req.body;
      console.log('Received for /submit:', { id, name, mail, password });
      if (!id || !name || !mail || !password) {
        return res.status(400).json({ error: 'Missing required fields' });
      }
      if (mongoose.connection.readyState !== 1) {
        console.error('MongoDB not connected:', mongoose.connection.readyState);
        return res.status(500).json({ error: 'Database not connected' });
      }
      const existingUser = await User.findOne({ userId: id });
      console.log('Existing user check:', existingUser);
      if (existingUser) {
        return res.status(400).json({ error: 'User already exists' });
      }
      const user = new User({ userId: id, name, mail, password });
      const savedUser = await user.save();
      console.log('Saved user:', savedUser);
      res.status(201).json({ id, name, mail });
    } catch (error) {
      console.error('Error signing up:', error);
      if (error.name === 'ValidationError') {
        return res.status(400).json({ error: 'Validation failed: ' + error.message });
      }
      if (error.code === 11000) {
        return res.status(400).json({ error: 'Duplicate ID detected' });
      }
      res.status(500).json({ error: 'Failed to save user: ' + error.message });
    }
  });
  
  app.post('/signin', async (req, res) => {
    try {
      const { id, password } = req.body;
      console.log('Received id:', id, 'Type:', typeof id);
      const user = await User.findOne({ userId: id }); 
      console.log('Found user:', user); 
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      if (user.password !== password) {
        return res.status(401).json({ error: 'Invalid password' });
      }
      res.status(200).json({ message: 'User signed in successfully', id, name: user.name });
    } catch (error) {
      console.error('Error signing in:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });





  app.post('/lecturer-signup', async (req, res) => {
    try {
      const { id, name, mail, password } = req.body;
      console.log('Received for /submit:', { id, name, mail, password });
      if (!id || !name || !mail || !password) {
        return res.status(400).json({ error: 'Missing required fields' });
      }
      if (mongoose.connection.readyState !== 1) {
        console.error('MongoDB not connected:', mongoose.connection.readyState);
        return res.status(500).json({ error: 'Database not connected' });
      }
      const existingUser = await User.findOne({ userId: id });
      console.log('Existing user check:', existingUser);
      if (existingUser) {
        return res.status(400).json({ error: 'User already exists' });
      }
      const user = new User({ userId: id, name, mail, password });
      const savedUser = await user.save();
      console.log('Saved user:', savedUser);
      res.status(201).json({ id, name, mail });
    } catch (error) {
      console.error('Error signing up:', error);
      if (error.name === 'ValidationError') {
        return res.status(400).json({ error: 'Validation failed: ' + error.message });
      }
      if (error.code === 11000) {
        return res.status(400).json({ error: 'Duplicate ID detected' });
      }
      res.status(500).json({ error: 'Failed to save user: ' + error.message });
    }
  });

  app.post('/lecturer-signin', async (req, res) => {
    try {
      const { id, password } = req.body;
      console.log('Received id:', id, 'Type:', typeof id); 
      const user = await User.findOne({ userId: id }); 
      console.log('Found user:', user); 
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      if (user.password !== password) {
        return res.status(401).json({ error: 'Invalid password' });
      }
      res.status(200).json({ message: 'User signed in successfully', id, name: user.name });
    } catch (error) {
      console.error('Error signing in:', error);
      res.status(500).json({ error: 'Internal server error' });
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

app.get("/", (req, res) => {
    res.send("Hello World!");
});




app.listen(port, () => {
    console.log(`Server is running on port ${port}`);

    
})

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json()); // عشان نقدر نقرأ البيانات اللي جاية من الفورم

// 1. الاتصال بقاعدة البيانات
mongoose.connect('mongodb://127.0.0.1:27017/meanCrudDB')
    .then(() => console.log('✅ MongoDB Connected to CRUD Database!'))
    .catch(err => console.error('❌ Connection Error:', err));

// 2. تصميم شكل البيانات (Task Model)
const taskSchema = new mongoose.Schema({
    title: String,
    description: String
});

const Task = mongoose.model('Task', taskSchema);

// 3. الـ API Routes (العمليات الأربعة)

// GET: هات كل المهام
app.get('/api/tasks', async (req, res) => {
    const tasks = await Task.find();
    res.json(tasks);
});

// POST: ضيف مهمة جديدة (Create)
app.post('/api/tasks', async (req, res) => {
    const newTask = new Task(req.body);
    await newTask.save();
    res.json(newTask);
});

// PUT: عدل مهمة موجودة (Update)
app.put('/api/tasks/:id', async (req, res) => {
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedTask);
});

// DELETE: امسح مهمة (Delete)
app.delete('/api/tasks/:id', async (req, res) => {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: 'Task deleted successfully' });
});

// تشغيل السيرفر
app.listen(PORT, () => {
    console.log(`🚀 CRUD Server running on http://localhost:${PORT}`);
});
const express = require("express");
const routes = express.Router();

let students= [
    { id: 1, name: "kavya", dept: "CSE", age:20},
    { id: 2, name: "Kavi", dept: "CSE", age:20},
    { id: 3, name: "varun", dept: "CSE", age:20},
    { id: 4, name: "Sri", dept: "CSE", age:20}
];
routes.get("/",(req,res) => {
    res.json(students);
});

routes.post("/", (req, res) => {
  const { name, dept, age } = req.body;

  if (!name || !dept || !age) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const newStudent = {
    id: students.length + 1,
    name,
    dept,
    age
  };

  students.push(newStudent);
  res.status(201).json({
    message: "Student added successfully",
    student: newStudent
  });
});

routes.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { name, dept, age } = req.body;

  const student = students.find(s => s.id === id);

  if (!student) {
    return res.status(404).json({ message: "Student not found" });
  }

  student.name = name || student.name;
  student.dept = dept || student.dept;
  student.age = age || student.age;

  res.json({
    message: "Student updated successfully",
    student
  });
});

routes.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = students.findIndex(s => s.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Student not found" });
  }

  const deletedStudent = students.splice(index, 1);

  res.json({
    message: "Student deleted successfully",
    student: deletedStudent[0]
  });
});

 
module.exports = routes;

const express = require("express");
const router = express.Router();

const {
  addTeacher,
  getTeachers,
  updateTeacher,
  deactivateTeacher
} = require("../controllers/teacherController");

router.post("/", addTeacher);
router.get("/", getTeachers);
router.put("/:id", updateTeacher);
router.put("/:id/deactivate", deactivateTeacher);

module.exports = router;
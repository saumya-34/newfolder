const expressClass = require('express');
const studentRouter = expressClass.Router();
const studentController = require('../controller/student.js');


studentRouter.get("/:method",studentController.getStudent)
studentRouter.post("/:method",studentController.postStudent)
studentRouter.put("/",studentController.putStudent)
studentRouter.delete("/",studentController.deleteStudent)
studentRouter.patch("/",studentController.patchStudent)

module.exports = studentRouter;

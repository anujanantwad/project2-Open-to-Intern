const express = require("express")
const router = express.Router();
const collegeController =require("../Controller/collegeController")
const InternController =require("../Controller/internController")



router.post("/functionup/colleges", collegeController.CreateCollege )
router.post("/functionup/interns", InternController.CreateIntern )
router.get("/functionup/collegeDetails",collegeController.getCollege)
module.exports = router;





const CollegeModel = require("../Model/CollegeModel")
const internModel = require("../Model/internModel")

const CreateCollege = async function (req, res) {
    try {
        let data = req.body
        if (!data.name)  return res.status(400).send({ status: false, message: "Name is required" });
        if (!data.fullName) return res.status(400).send({ status: false, message: "fullName is required" });
       const CreatedData = await CollegeModel.create(data)
        res.status(201).send({ msg: CreatedData })
    } catch (err) {
        res.status(500).send({ msg: err.message })
    }
}

const getCollege = async function(req,res){
   
    try {
      let filter = req.query
      console.log(filter)
      if (!filter) return res.status(404).send({ status: false, Error: "please set query" })
      let data = await internModel.find({isDeleted: false , filter}).populate('collegeId');
      console.log(data)
      if (data.length === 0) return res.status(404).send({ status: false, msg: "Intern not found" });
  
      res.status(200).send({ status: true, msg: "got intern Sucessfully" ,data: data });
    } catch (err) {
      res.status(500).send({ status: false, msg: err.message });
    }
   }; 

module.exports.CreateCollege=CreateCollege
module.exports.getCollege=getCollege
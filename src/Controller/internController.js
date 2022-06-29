const internModel = require("../Model/internModel")

const CreateIntern = async function (req, res) {
    try {
        let data = req.body
        if (!data.name)  return res.status(400).send({ status: false, message: "Name is required" });
        if (!data.email) return res.status(400).send({ status: false, message: "email is required" });
        if (!data.mobile) return res.status(400).send({ status: false, message: "mobile is required" });
        if (!data.collegeId) return res.status(400).send({ status: false, message: "collegeId is required" }); 
       const CreatedData = await internModel.create(data)
        res.status(201).send({ msg: CreatedData })
    } catch (err) {
        res.status(500).send({ msg: err.message })
    }
};
const getCollege = async function(req,res){
   
    try {
      let filter = req.query
      console.log(filter)
      if (!filter) return res.status(404).send({ status: false, Error: "please set query" })
      let data = await internModel.find({isDeleted: false , filter});
      console.log(data)
      if (data.length === 0) return res.status(404).send({ status: false, msg: "Intern not found" });
  
      res.status(200).send({ status: true, msg: "got intern Sucessfully" ,data: data });
    } catch (err) {
      res.status(500).send({ status: false, msg: err.message });
    }
   }; 

module.exports.CreateIntern=CreateIntern
//module.exports.getCollege=getCollege
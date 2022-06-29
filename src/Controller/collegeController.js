const CollegeModel = require("../Model/CollegeModel")
const internModel = require("../Model/internModel")
const validator = require("../validator/validate")

const CreateCollege = async function (req, res) {
    try {
        let data = req.body
        if (!data.name)  return res.status(400).send({ status: false, message: "Name is required" });
        if (!data.name.match(/^[a-zA-Z. ]{2,30}$/)) return res.status(400).send({ status: false, msg: "please enter valid intern name" })
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
      
      if (!filter) return res.status(404).send({ status: false, Error: "please set query" })
     let checkCollegeName = await CollegeModel.findOne({ name:filter.name, isDeleted: false }) /*Check College Name From DB*/

    if (!checkCollegeName) return res.status(404).send({ status: false, msg: "No such college Name found", });

    let collegeId = checkCollegeName._id /*Get CollegeID from CheckCollegeName*/

      let getAllInternData = await internModel.find({ collegeId: collegeId, isDeleted: false }).select({ name: 1, email: 1, mobile: 1 })

      if (!getAllInternData.length) return res.status(404).send({ status: false, msg: "No intern Apply for This College", });
      //console.log(getAllInternData)
      //assign value
      let name = checkCollegeName.name; 
      let fullName = checkCollegeName.fullName;
      let logoLink = checkCollegeName.logoLink;
  
      //call value
      let collegeData = {
        name: name,
        fullName: fullName,
        logoLink: logoLink,
        interns: getAllInternData
      }
  
      res.status(200).send({ status: true, msg: "got intern Sucessfully" ,data: collegeData });
    } catch (err) {
      res.status(500).send({ status: false, msg: err.message });
    }
   }; 

module.exports.CreateCollege=CreateCollege
module.exports.getCollege=getCollege
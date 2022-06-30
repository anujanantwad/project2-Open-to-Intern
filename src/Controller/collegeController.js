const CollegeModel = require("../Model/CollegeModel")
const internModel = require("../Model/internModel")
const validator = require("../validator/validate")


const CreateCollege = async function (req, res) {
  try {

    let data = req.body
    // name
    if (!data.name) return res.status(400).send({ status: false, message: "Name is required" });
    if (!data.name.match(/^[a-zA-Z. ]{2,30}$/)) return res.status(400).send({ status: false, msg: "please enter valid college name" })
    if (!validator.isValid(data.name)) return res.status(400).send({ status: false, msg: "name is not valid" })

    const uniqueName = await CollegeModel.find({ name: data.name }).select({ name: 1, _id: 0 })
    if (uniqueName.length) return res.status(400).send({ status: false, msg: "name is already exist" }) //validating uniqueness of Name

    // fullname
    if (!data.fullName) return res.status(400).send({ status: false, message: "fullName is required" })

    // logoName
    if (!validator.isValid(data.logoLink)) return res.status(400).send({ status: false, msg: "LogoName is mandatory" })// validation of url required
    if (!validator.isUrl(data.logoLink)) return res.status(400).send({ status: false, msg: "enter a valid logoname Logourl" })

    const CreatedData = await CollegeModel.create(data)
    res.status(201).send({ status: true, data: CreatedData })
  }
  catch (err) {
    res.status(500).send({ msg: err.message })
  }
}

const getCollege = async function (req, res) {

  try {

    let filter = req.query
    if (Object.keys(filter).length == 0) return res.status(200).send({ status: true, msg: "query should be present" });

    let checkCollegeName = await CollegeModel.findOne({ name: filter.name, isDeleted: false }) /*Check College Name From DB*/
    if (!checkCollegeName) return res.status(404).send({ status: true, msg: "No such college Name found", });

    let collegeId = checkCollegeName._id /*Get CollegeID from CheckCollegeName*/
    let getAllInternData = await internModel.find({ collegeId: collegeId, isDeleted: false }).select({ name: 1, email: 1, mobile: 1 })
    if (!getAllInternData.length) return res.status(404).send({ status: false, msg: "No intern Apply for This College", });

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

    res.status(200).send({ status: true, msg: "got intern Sucessfully", data: collegeData });
  } catch (err) {
    res.status(500).send({ status: false, msg: err.message });
  }
};

module.exports.CreateCollege = CreateCollege
module.exports.getCollege = getCollege
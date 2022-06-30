const internModel = require("../Model/internModel")
const CollegeModel = require("../Model/CollegeModel")
const validator = require("../validator/validate")



// create intern

const CreateIntern = async function (req, res) {
    try {
        let data = req.body
        // name
        if (!data.name) return res.status(400).send({ status: false, message: "Name is required" });
        if (!data.name.match(/^[a-zA-Z. ]{2,30}$/)) return res.status(400).send({ status: false, msg: "please enter valid intern name" })

        // email
        if (!(data.email)) return res.status(400).send({ status: false, message: "email is required" });
        let email = req.body.email
        if (!validator.isValidEmail(email)) return res.status(400).send({ msg: `this Email is not valid ::${email}` })
        let checkemail = await internModel.findOne({ email: data.email })
        if (checkemail) return res.status(400).send({ status: false, msg: "email-ID Already Used" })

        // mobile
        if (!data.mobile) return res.status(400).send({ status: false, message: "mobile is required" });
        let mobile = req.body.mobile
        if (!validator.isValidNumber(mobile)) return res.status(400).send({ msg: `this mobile is not valid ::${mobile}` })
        let checknumber = await internModel.findOne({ mobile: data.mobile })    /*Check Mobile From DB*/
        if (checknumber) return res.status(400).send({ status: false, msg: "Mobile Number Already Used" })

        // collegeID
        if (!data.collegeName) return res.status(400).send({ status: false, message: "collegeName is required" });
        const validateId = await CollegeModel.findOne({ name: data.collegeName })
        if (!validateId) return res.status(400).send({ status: false, msg: "college is not valid or not exist" })
        //--------------------------
        req.body.collegeId = validateId._id
        await internModel.create(data)
        let obj = {
            isDeleted: false,
            name: data.name,
            email: data.email,
            mobile: data.mobile,
            collegeId: validateId._id
        }
        res.status(201).send({ status: true, msg: obj })
    } catch (err) {
        res.status(500).send({ msg: err.message })
    }
};

module.exports.CreateIntern = CreateIntern

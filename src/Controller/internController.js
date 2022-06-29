const internModel = require("../Model/internModel")
const validator = require("../validator/validate")
const CreateIntern = async function (req, res) {
    try {
        let data = req.body
        if (!data.name)  return res.status(400).send({ status: false, message: "Name is required" });
        if (!data.name.match(/^[a-zA-Z. ]{2,30}$/)) return res.status(400).send({ status: false, msg: "please enter valid intern name" })

        if (!(data.email) ) return res.status(400).send({ status: false, message: "email is required" });
        let email = req.body.email
        if (!validator.isValidEmail(email)) return res.status(400).send({ msg: `this Email is not valid ::${email}` })
        let checkemail = await internModel.findOne({ email: data.email })    /*Check Email From DB*/
        if (checkemail) return res.status(400).send({ status: false, msg: "email-ID Already Used" })


        if (!data.mobile) return res.status(400).send({ status: false, message: "mobile is required" });
        let mobile = req.body.mobile
        if (!validator.isValidNumber(mobile)) return res.status(400).send({ msg: `this mobile is not valid ::${mobile}` })
        let checknumber = await internModel.findOne({ mobile: data.mobile })    /*Check Mobile From DB*/
        if (checknumber) return res.status(400).send({ status: false, msg: "Mobile Number Already Used" })


        if (!data.collegeId) return res.status(400).send({ status: false, message: "collegeId is required" }); 
       const CreatedData = await internModel.create(data)
        res.status(201).send({ msg: CreatedData })
    } catch (err) {
        res.status(500).send({ msg: err.message })
    }
};

module.exports.CreateIntern=CreateIntern

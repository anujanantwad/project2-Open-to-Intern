const CollegeModel = require("../Model/CollegeModel")


const CreateCollege = async function (req, res) {
    try {
        let data = req.body
        if (!data.name)  return res.status(400).send({ status: false, message: "Name is required" });
           
        // let firstName = data.firstName.trim()
        // firstName = firstName.split(' ').filter(x => x).join(' ')
        // data.firstName = firstName

        if (!data.fullName) return res.status(400).send({ status: false, message: "fulltName is required" });
            
        // let lastName = data.lastName.trim()
        // lastName = lastName.split(' ').filter(x => x).join('')
        // data.lastName = lastName

        
       const CreatedData = await CollegeModel.create(data)
        res.status(201).send({ msg: CreatedData })
    } catch (err) {
        res.status(500).send({ msg: err.message })
    }
}

module.exports.CreateCollege=CreateCollege
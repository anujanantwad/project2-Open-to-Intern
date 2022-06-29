const mongoose = require('mongoose');
// var validator = require("email-validator");



const collegeSchema = new mongoose.Schema({
   name: {
    type: String,
    required: true,
    unique:true
  },
  fullName: {
    type: String,
    required: true,
  },

  logoLink: {
    type: String,
    required: true,
  
  },
  
  isDeleted:{
    type:Boolean,
    default:false,

  }
 

}, { timestamps: true });

module.exports = mongoose.model("Colleges", collegeSchema)
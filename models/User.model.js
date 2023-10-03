const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const userSchema = new Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  repeatPassword: {
    type: String,
  },

  userPermission: {
    type: String,
    default: 'user',
  },

  name: {
    type: String,
  },
  
  
  dateOfBirth: {
    type: Date,
  },

  companyName: {
    type: String,
  },

  country: {
    type: String,
  },

  city: {
    type: String,
  },

  region:{
    type: String,
  },

  address:{
    type: String,
  },

  postCode:{
    type: String,
  },

  companyDescription: {
    type: String,
  },
  
  companyIndustry: {
    type: String,
  },

  mobilePhone: {
    type: String,
  },


});

const User = model("User", userSchema);

module.exports = User;

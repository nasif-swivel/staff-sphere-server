var mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const employeeSchema = mongoose.Schema({
  empId: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

employeeSchema.plugin(uniqueValidator);

const Employee = mongoose.model("Employee", employeeSchema);
module.exports = Employee;

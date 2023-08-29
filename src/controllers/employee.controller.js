const Employee = require("../models/employee.model");

const createEmployee = async (req, res) => {
  const { firstName, lastName, email, phoneNumber, gender, empId, image } =
    req.body;

  try {
    const newEmployee = new Employee({
      empId,
      firstName,
      lastName,
      email,
      phoneNumber,
      gender,
      image,
    });

    const savedEmployee = await newEmployee.save();

    res.status(201).json({
      employee: savedEmployee,
      message: "Employee created successfully",
    });
  } catch (error) {
    res
      .status(400)
      .json({ error: error.message, message: "Employee creation failed" });
  }
};

const updateEmployee = async (req, res) => {
  const { firstName, lastName, email, phoneNumber, gender, empId, image } =
    req.body;

  try {
    const updatedEmployee = await Employee.findOneAndUpdate(
      { empId: empId },
      { firstName, lastName, email, phoneNumber, gender, image },
      { new: true }
    );

    if (!updatedEmployee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.json({
      employee: updatedEmployee,
      message: "Employee updated successfully",
    });
  } catch (error) {
    res
      .status(400)
      .json({ error: error.message, message: "Employee update failed" });
  }
};

const deleteEmployee = async (req, res) => {
  const empId = req.body.empId;

  try {
    const deletedEmployee = await Employee.findOneAndDelete({
      empId: empId,
    });

    if (!deletedEmployee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.json({ message: "Employee deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting employee", error: error.message });
  }
};

const getEmployeeById = async (req, res) => {
  const empId = req.query.empId;

  try {
    const employee = await Employee.findOne({ empId: empId });

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.json({ employee });
  } catch (error) {
    res
      .status(500)
      .json({ error: error.message, message: "Employee finding failed" });
  }
};

const getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json({ employees });
  } catch (error) {
    res
      .status(500)
      .json({ error: error.message, message: "Employees retrieval failed" });
  }
};

module.exports = {
  createEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployeeById,
  getAllEmployees,
};

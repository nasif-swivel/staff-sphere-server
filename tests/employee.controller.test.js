const request = require("supertest");
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config({ path: "./config.env" });

const routes = require("../src/routes");
const Employee = require("../src/models/employee.model");

const app = express();
app.use(express.json());
app.use(routes);

describe("Employee Controller", () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URL, {
      dbName: "staff-sphere",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("should create a new employee", async () => {
    const response = await request(app).post("/create").send({
      empId: "T100",
      firstName: "Create",
      lastName: "Employee",
      email: "create@mail.com",
      phoneNumber: "0777777771",
      gender: "Female",
      image: "https://randomuser.me/api/portraits/women/68.jpg",
    });

    expect(response.status).toBe(201);
    expect(response.body.message).toBe("Employee created successfully");
  });

  it("should update an existing employee", async () => {
    const existingEmployee = {
      empId: "T200",
      firstName: "Create",
      lastName: "Employee",
      email: "create@mail.com",
      phoneNumber: "0777777771",
      gender: "Female",
      image: "https://randomuser.me/api/portraits/women/68.jpg",
    };

    const savedExistingEmployee = await new Employee(existingEmployee).save();

    const updatedData = {
      firstName: "Updated",
      lastName: "Employee",
      email: "updated@mail.com",
      phoneNumber: "0777777771",
      gender: "Female",
      image: "https://randomuser.me/api/portraits/women/68.jpg",
    };

    const response = await request(app)
      .put("/update")
      .send({
        empId: savedExistingEmployee.empId,
        ...updatedData,
      });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Employee updated successfully");

    const updatedEmployee = await Employee.findOne({
      empId: savedExistingEmployee.empId,
    });
    expect(updatedEmployee.firstName).toBe(updatedData.firstName);
    expect(updatedEmployee.lastName).toBe(updatedData.lastName);
    expect(updatedEmployee.email).toBe(updatedData.email);
    expect(updatedEmployee.phoneNumber).toBe(updatedData.phoneNumber);
    expect(updatedEmployee.gender).toBe(updatedData.gender);
    expect(updatedEmployee.image).toBe(updatedData.image);
  });

  it("should handle employee not found during update", async () => {
    const nonExistentEmpId = "T300";

    const updatedData = {
      firstName: "Updated",
      lastName: "Employee",
      email: "updated@mail.com",
      phoneNumber: "0777777771",
      gender: "Female",
      image: "https://randomuser.me/api/portraits/women/68.jpg",
    };

    const response = await request(app)
      .put("/update")
      .send({
        empId: nonExistentEmpId,
        ...updatedData,
      });

    expect(response.status).toBe(404);
    expect(response.body.message).toBe("Employee not found");
  });

  it("should delete an existing employee", async () => {
    const employeeToDelete = {
      empId: "T400",
      firstName: "Deleting",
      lastName: "Employee",
      email: "deleting@mail.com",
      phoneNumber: "0777777771",
      gender: "Female",
      image: "https://randomuser.me/api/portraits/women/68.jpg",
    };

    const savedEmployeeToDelete = await new Employee(employeeToDelete).save();

    const response = await request(app).post("/delete").send({
      empId: savedEmployeeToDelete.empId,
    });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Employee deleted successfully");

    const deletedEmployee = await Employee.findOne({
      empId: savedEmployeeToDelete.empId,
    });
    expect(deletedEmployee).toBeNull();
  });

  it("should handle employee not found during deletion", async () => {
    const nonExistentEmpId = "T500";

    const response = await request(app).post("/delete").send({
      empId: nonExistentEmpId,
    });

    expect(response.status).toBe(404);
    expect(response.body.message).toBe("Employee not found");
  });

  it("should retrieve an employee by ID", async () => {
    const employeeToRetrieve = {
      empId: "T600",
      firstName: "Retrieved",
      lastName: "Employee",
      email: "retrieved@mail.com",
      phoneNumber: "0777777771",
      gender: "Female",
      image: "https://randomuser.me/api/portraits/women/68.jpg",
    };

    const savedEmployeeToRetrieve = await new Employee(
      employeeToRetrieve
    ).save();

    const response = await request(app).get("/employee").query({
      empId: savedEmployeeToRetrieve.empId,
    });

    expect(response.status).toBe(200);
    expect(response.body.employee.empId).toBe(savedEmployeeToRetrieve.empId);
    expect(response.body.employee.firstName).toBe(
      savedEmployeeToRetrieve.firstName
    );
    expect(response.body.employee.lastName).toBe(
      savedEmployeeToRetrieve.lastName
    );
    expect(response.body.employee.email).toBe(savedEmployeeToRetrieve.email);
    expect(response.body.employee.phoneNumber).toBe(
      savedEmployeeToRetrieve.phoneNumber
    );
    expect(response.body.employee.gender).toBe(savedEmployeeToRetrieve.gender);
    expect(response.body.employee.image).toBe(savedEmployeeToRetrieve.image);
  });

  it("should handle employee not found during retrieval by ID", async () => {
    const nonExistentEmpId = "T700";

    const response = await request(app).get("/employee").query({
      empId: nonExistentEmpId,
    });

    expect(response.status).toBe(404);
    expect(response.body.message).toBe("Employee not found");
  });

  it("should retrieve all employees", async () => {
    const employeesToRetrieve = [
      {
        empId: "T800",
        firstName: "First",
        lastName: "Employee",
        email: "first@mail.com",
        phoneNumber: "0777777772",
        gender: "Female",
        image: "https://randomuser.me/api/portraits/women/58.jpg",
      },
      {
        empId: "T900",
        firstName: "Second",
        lastName: "Employee",
        email: "second@mail.com",
        phoneNumber: "0777777773",
        gender: "Female",
        image: "https://randomuser.me/api/portraits/women/59.jpg",
      },
    ];

    await Employee.insertMany(employeesToRetrieve);

    const response = await request(app).get("/employees");

    expect(response.status).toBe(200);
  });

  it("should delete all test employees", async () => {
    const employeeIdsToDelete = ["T100", "T200", "T600", "T800", "T900"];

    for (const empId of employeeIdsToDelete) {
      const response = await request(app).post("/delete").send({
        empId: empId,
      });

      expect(response.status).toBe(200);
      expect(response.body.message).toBe("Employee deleted successfully");

      const deletedEmployee = await Employee.findOne({
        empId: empId,
      });
      expect(deletedEmployee).toBeNull();
    }
  });
});

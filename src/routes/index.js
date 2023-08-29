const express = require("express");
const router = express.Router();

const {
  createEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployeeById,
  getAllEmployees,
} = require("../controllers/employee.controller");

/**
 * @swagger
 * /:
 *   get:
 *     summary: Check server status
 *     tags: [Server]
 *     responses:
 *       200:
 *         description: Server is up and running
 *         content:
 *           text/plain:
 *             example: server is up and running
 */
router.get("/", (req, res) => {
  res.send("server is up and running");
});

/**
 * @swagger
 * /create:
 *   post:
 *     summary: Create a new employee
 *     tags: [Employees]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               empId:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               phoneNumber:
 *                 type: string
 *               gender:
 *                 type: string
 *                 enum: [Male, Female]
 *               image:
 *                 type: string
 *     responses:
 *       201:
 *         description: Employee created successfully
 *         content:
 *           application/json:
 *             example:
 *               employee:
 *                 empId: 1
 *                 email: first@mail.com
 *                 firstName: First
 *                 lastName: Employee
 *                 phoneNumber: 0771234567
 *                 gender: Male
 *                 image: https://randomuser.me/api/portraits/men/1.jpg
 *               message: Employee created successfully
 *       400:
 *         description: Employee creation failed
 *         content:
 *           application/json:
 *             example:
 *               message: Employee creation failed
 */
router.post("/create", createEmployee);

/**
 * @swagger
 * /update:
 *   put:
 *     summary: Update an existing employee
 *     tags: [Employees]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               empId:
 *                 type: string
 *                 description: The empId of the employee to update
 *                 required: true
 *               email:
 *                 type: string
 *                 format: email
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               phoneNumber:
 *                 type: string
 *               gender:
 *                 type: string
 *                 enum: [Male, Female]
 *               image:
 *                 type: string
 *     responses:
 *       200:
 *         description: Employee updated successfully
 *         content:
 *           application/json:
 *             example:
 *               employee:
 *                 empId: 1
 *                 email: first@mail.com
 *                 firstName: First
 *                 lastName: Employee
 *                 phoneNumber: 0771234567
 *                 gender: Male
 *                 image: https://randomuser.me/api/portraits/men/1.jpg
 *               message: Employee updated successfully
 *       400:
 *         description: Employee update failed
 *         content:
 *           application/json:
 *             example:
 *               message: Employee update failed
 *       404:
 *         description: Employee not found
 *         content:
 *           application/json:
 *             example:
 *               message: Employee not found
 */
router.put("/update", updateEmployee);

/**
 * @swagger
 * /delete:
 *   post:
 *     summary: Delete an employee
 *     tags: [Employees]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               empId:
 *                 type: string
 *                 description: The empId of the employee to delete
 *                 required: true
 *     responses:
 *       200:
 *         description: Employee deleted successfully
 *         content:
 *           application/json:
 *             example:
 *               message: Employee deleted successfully
 *       404:
 *         description: Employee not found
 *         content:
 *           application/json:
 *             example:
 *               message: Employee not found
 *       500:
 *         description: Error deleting employee
 *         content:
 *           application/json:
 *             example:
 *               message: Error deleting employee
 */
router.post("/delete", deleteEmployee);

/**
 * @swagger
 * /employee:
 *   get:
 *     summary: Get an employee by empId
 *     tags: [Employees]
 *     parameters:
 *       - name: empId
 *         in: query
 *         required: true
 *         schema:
 *           type: string
 *         description: The empId of the employee to retrieve
 *     responses:
 *       200:
 *         description: Employee retrieved successfully
 *         content:
 *           application/json:
 *             example:
 *               employee:
 *                 empId: 1
 *                 email: first@mail.com
 *                 firstName: First
 *                 lastName: Employee
 *                 phoneNumber: 0771234567
 *                 gender: Male
 *                 image: https://randomuser.me/api/portraits/men/1.jpg
 *       404:
 *         description: Employee not found
 *         content:
 *           application/json:
 *             example:
 *               message: Employee not found
 *       500:
 *         description: Employee finding failed
 *         content:
 *           application/json:
 *             example:
 *               message: Employee finding failed
 */
router.get("/employee", getEmployeeById);

/**
 * @swagger
 * /employees:
 *   get:
 *     summary: Get all employees
 *     tags: [Employees]
 *     responses:
 *       200:
 *         description: Employees retrieved successfully
 *       500:
 *         description: Employees retrieval failed
 *         content:
 *           application/json:
 *             example:
 *               message: Employees retrieval failed
 */
router.get("/employees", getAllEmployees);

module.exports = router;

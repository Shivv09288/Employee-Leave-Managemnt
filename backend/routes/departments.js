const express = require('express');
const router = express.Router();
const {
  createDepartment,
  getAllDepartments,
  getDepartmentById,
  updateDepartment,
  assignEmployeeToDepartment,
  removeEmployeeFromDepartment,
  deleteDepartment
} = require('../controllers/departmentController');
const { auth } = require('../middleware/auth');

// All routes require authentication
router.use(auth);

// Create department
router.post('/', createDepartment);

// Get all departments
router.get('/', getAllDepartments);

// Get department by ID
router.get('/:id', getDepartmentById);

// Update department
router.put('/:id', updateDepartment);

// Assign employee to department
router.post('/:departmentId/assign-employee', assignEmployeeToDepartment);

// Remove employee from department
router.post('/:departmentId/remove-employee', removeEmployeeFromDepartment);

// Delete department
router.delete('/:id', deleteDepartment);

module.exports = router;

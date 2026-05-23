const Department = require('../models/Department');
const User = require('../models/User');

// Create a department
exports.createDepartment = async (req, res) => {
  try {
    const { name, description, managerId } = req.body;

    // Check if department already exists
    const existingDept = await Department.findOne({ name });
    if (existingDept) {
      return res.status(400).json({ message: 'Department already exists' });
    }

    // Verify manager exists
    if (managerId) {
      const manager = await User.findById(managerId);
      if (!manager) {
        return res.status(404).json({ message: 'Manager not found' });
      }
    }

    const department = new Department({
      name,
      description,
      manager: managerId
    });

    await department.save();
    res.status(201).json(department);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Get all departments
exports.getAllDepartments = async (req, res) => {
  try {
    const departments = await Department.find()
      .populate('manager', 'name email')
      .populate('employees', 'name email role');
    res.json(departments);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get department by ID
exports.getDepartmentById = async (req, res) => {
  try {
    const department = await Department.findById(req.params.id)
      .populate('manager', 'name email')
      .populate('employees', 'name email role leaveBalance');
    
    if (!department) {
      return res.status(404).json({ message: 'Department not found' });
    }

    res.json(department);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Update department
exports.updateDepartment = async (req, res) => {
  try {
    const { name, description, managerId } = req.body;
    const department = await Department.findById(req.params.id);

    if (!department) {
      return res.status(404).json({ message: 'Department not found' });
    }

    if (name) {
      const existingDept = await Department.findOne({ name, _id: { $ne: req.params.id } });
      if (existingDept) {
        return res.status(400).json({ message: 'Department name already exists' });
      }
      department.name = name;
    }

    if (description) department.description = description;

    if (managerId) {
      const manager = await User.findById(managerId);
      if (!manager) {
        return res.status(404).json({ message: 'Manager not found' });
      }
      department.manager = managerId;
    }

    await department.save();
    await department.populate('manager', 'name email');
    res.json(department);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Assign employee to department
exports.assignEmployeeToDepartment = async (req, res) => {
  try {
    const { employeeId } = req.body;
    const { departmentId } = req.params;

    const department = await Department.findById(departmentId);
    if (!department) {
      return res.status(404).json({ message: 'Department not found' });
    }

    const employee = await User.findById(employeeId);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    // Add employee to department
    if (!department.employees.includes(employeeId)) {
      department.employees.push(employeeId);
    }

    // Assign manager and department to employee
    employee.department = departmentId;
    employee.manager = department.manager;

    await department.save();
    await employee.save();

    res.json({ message: 'Employee assigned successfully', department });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Remove employee from department
exports.removeEmployeeFromDepartment = async (req, res) => {
  try {
    const { employeeId } = req.body;
    const { departmentId } = req.params;

    const department = await Department.findById(departmentId);
    if (!department) {
      return res.status(404).json({ message: 'Department not found' });
    }

    department.employees = department.employees.filter(id => id.toString() !== employeeId);
    
    const employee = await User.findById(employeeId);
    if (employee) {
      employee.department = null;
      employee.manager = null;
      await employee.save();
    }

    await department.save();
    res.json({ message: 'Employee removed successfully', department });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete department
exports.deleteDepartment = async (req, res) => {
  try {
    const department = await Department.findByIdAndDelete(req.params.id);
    if (!department) {
      return res.status(404).json({ message: 'Department not found' });
    }

    // Remove department from employees
    await User.updateMany({ department: req.params.id }, { department: null, manager: null });

    res.json({ message: 'Department deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

# 🏢 Employee Leave Management System - Complete Documentation

A full-stack MERN (MongoDB, Express.js, React, Node.js) application for managing employee leave requests with role-based access control for employees and managers.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D14.0.0-brightgreen.svg)
![React](https://img.shields.io/badge/react-18.2.0-blue.svg)

---

## ✨ Features

### Employee Features

- 👤 **User Authentication** - Secure login/register with JWT tokens
- 📊 **Leave Balance Dashboard** - View remaining annual, sick, and casual leaves
- 📝 **Apply for Leave** - Submit leave requests with date range and reason
- 📋 **View Leave History** - Track all submitted requests with status
- ❌ **Cancel Requests** - Cancel pending leave requests

### Manager Features

- 👨‍💼 **Manager Dashboard** - Comprehensive overview of team leave requests
- ⏳ **Pending Approvals** - Review and manage pending leave requests
- ✅ **Approve/Reject Leaves** - Accept or decline with comments
- 📈 **Team Statistics** - View leave trends and team metrics
- 📋 **Leave History** - Complete history of all employee requests

### Department System

- 🏗️ **Department Management** - Organized team structure with assigned managers
- 👥 **Employee Assignment** - Assign employees to departments
- 📊 **Department Statistics** - View team-specific metrics
- 🔗 **Manager-Based Filtering** - Leave requests automatically assigned to department managers

---

## 🚀 Tech Stack

### Frontend

- React 18.2.0
- Redux Toolkit (State Management)
- React Router DOM v6
- Axios
- Modern CSS with Animations

### Backend

- Node.js
- Express.js 4.18.2
- MongoDB Atlas (Cloud Database)
- JWT Authentication
- bcryptjs for Password Hashing

### Deployment

- Vercel (Frontend & Backend)
- MongoDB Atlas (Database)

---

## 📋 Prerequisites

Before running this application, make sure you have:

- **Node.js** (v14.0.0 or higher) - [Download](https://nodejs.org/)
- **MongoDB Atlas Account** (free tier) - [Sign up](https://www.mongodb.com/cloud/atlas)
- **Git** - [Download](https://git-scm.com/)

---

## 🛠️ Installation & Setup

### Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file with the following variables
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/leave_management
# JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
# PORT=5000

# Start the backend server
npm run dev              # Development with nodemon
npm start               # Production mode
npm run seed            # Seed the database with initial data
```

The backend server will run on **http://localhost:5000**

### Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Create .env file with the following variables
# PORT=3001
# REACT_APP_API_URL=http://localhost:5000/api

# Start the frontend development server
npm start
```

The frontend will run on **http://localhost:3001** or **http://localhost:3000**

---

## 🔐 Environment Variables

### Backend (.env)

Create a `.env` file in the `backend` directory:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/leave_management
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
PORT=5000
NODE_ENV=development
```

**Required Variables:**

- `MONGODB_URI` - Your MongoDB Atlas connection string
- `JWT_SECRET` - Secret key for JWT token generation (use a strong random string)
- `PORT` - Backend server port (default: 5000)
- `NODE_ENV` - Environment mode (development/production)

### Frontend (.env)

Create a `.env` file in the `frontend` directory:

```env
PORT=3001
REACT_APP_API_URL=http://localhost:5000/api
BROWSER=none
```

**Variables:**

- `PORT` - Frontend development server port
- `REACT_APP_API_URL` - Backend API endpoint
- `BROWSER` - Set to 'none' to prevent auto-opening browser

---

## 🗄️ MongoDB Atlas Setup

1. **Create Account**: Sign up at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. **Create Cluster**: Create a free M0 cluster
3. **Database Access**: Create a database user with password
4. **Network Access**: Add IP address (0.0.0.0/0 for development)
5. **Get Connection String**:
   - Click "Connect" → "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password
   - Add database name: `/leave_management`

Example:

```
mongodb+srv://myuser:mypassword@cluster0.xxxxx.mongodb.net/leave_management
```

---

## 🎯 Quick Start Guide

### Running Locally

**Option 1: Separate Terminals**

Terminal 1 - Backend:

```bash
cd backend
npm run dev
```

Terminal 2 - Frontend:

```bash
cd frontend
npm start
```

**Option 2: PowerShell**

Backend:

```powershell
Set-Location backend; npm run dev
```

Frontend:

```powershell
Set-Location frontend; npm start
```

### Access the Application

- **Frontend**: http://localhost:3001
- **Backend API**: http://localhost:5000/api
- **API Health Check**: http://localhost:5000/api/test

---

## 👥 Default Test Credentials

### Managers (Can approve/reject leaves)

| Email                     | Password    | Department  |
| ------------------------- | ----------- | ----------- |
| john.manager@company.com  | password123 | Engineering |
| sarah.manager@company.com | password123 | Sales       |
| mike.manager@company.com  | password123 | HR          |

### Employees (Can apply for leave)

**Engineering Team:**

- alice.engineer@company.com / password123
- bob.developer@company.com / password123
- carol.coder@company.com / password123

**Sales Team:**

- david.sales@company.com / password123
- eve.sales@company.com / password123

**HR Team:**

- frank.hr@company.com / password123

---

## 📁 Project Structure

```
employee-leave-management/
├── backend/
│   ├── config/
│   │   └── db.js              # MongoDB connection
│   ├── models/
│   │   ├── User.js            # User schema
│   │   ├── LeaveRequest.js    # Leave request schema
│   │   └── Department.js      # Department schema
│   ├── controllers/
│   │   ├── authController.js  # Auth logic
│   │   ├── leaveController.js # Leave management logic
│   │   ├── dashboardController.js # Dashboard logic
│   │   └── departmentController.js # Department logic
│   ├── routes/
│   │   ├── auth.js            # Authentication routes
│   │   ├── leaves.js          # Leave management routes
│   │   ├── dashboard.js       # Dashboard routes
│   │   └── departments.js     # Department routes
│   ├── middleware/
│   │   └── auth.js            # JWT & role-based auth middleware
│   ├── .env                   # Environment variables
│   ├── server.js              # Server entry point
│   ├── package.json
│   └── seedDatabase.js        # Database seeding script
│
├── frontend/
│   ├── src/
│   │   ├── redux/
│   │   │   ├── store.js       # Redux store
│   │   │   └── slices/
│   │   │       ├── authSlice.js
│   │   │       └── leaveSlice.js
│   │   ├── services/
│   │   │   └── api.js         # Axios instance with interceptors
│   │   ├── components/        # Reusable components
│   │   │   ├── Login.js
│   │   │   ├── Register.js
│   │   │   ├── Dashboard.js
│   │   │   ├── LeaveForm.js
│   │   │   ├── LeaveList.js
│   │   │   ├── ManagerDashboard.js
│   │   │   └── ManagerStats.js
│   │   ├── App.js
│   │   ├── index.js
│   │   └── CSS files
│   └── package.json
│
├── scripts/                   # Utility scripts
│   ├── deleteUser.js
│   ├── test_register.js
│   └── leave_payload.json
│
└── PROJECT.md                 # This documentation
```

---

## 🔄 API Endpoints

### Authentication

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile

### Leave Management

- `POST /api/leaves/apply` - Apply for leave
- `GET /api/leaves` - Get leave requests (filtered by role)
- `PUT /api/leaves/:id/approve` - Approve leave request (Manager)
- `PUT /api/leaves/:id/reject` - Reject leave request (Manager)
- `DELETE /api/leaves/:id` - Cancel leave request
- `GET /api/leaves/:id` - Get specific leave request

### Dashboard

- `GET /api/dashboard/employee` - Employee dashboard stats
- `GET /api/dashboard/manager` - Manager dashboard stats

### Departments

- `GET /api/departments` - Get all departments
- `POST /api/departments` - Create new department (Admin)
- `GET /api/departments/:id` - Get department details
- `PUT /api/departments/:id` - Update department (Admin)
- `POST /api/departments/:id/assign-employee` - Assign employee to department
- `DELETE /api/departments/:id` - Delete department (Admin)

---

## 🚀 Deployment on Vercel

### Step 1: Prepare Repository

```bash
# Push to GitHub
git add .
git commit -m "Ready for Vercel deployment"
git push origin main
```

### Step 2: Deploy Backend

1. Go to https://vercel.com
2. Click "Add New..." → "Project"
3. Select repository
4. Set **Root Directory**: `backend`
5. Add Environment Variables:
   - `MONGODB_URI` - Your MongoDB connection string
   - `JWT_SECRET` - Strong secret key
   - `NODE_ENV=production`
6. Click "Deploy"

### Step 3: Deploy Frontend

1. Before deploying, update `frontend/.env.production`:

   ```env
   REACT_APP_API_URL=https://your-backend.vercel.app/api
   ```

2. Commit and push changes

3. In Vercel, add new project
4. Set **Root Directory**: `frontend`
5. Set **Build Command**: `npm run build`
6. Set **Output Directory**: `build`
7. Add Environment Variables:
   - `REACT_APP_API_URL=https://your-backend.vercel.app/api`
8. Click "Deploy"

### Step 4: Configure CORS

Update `backend/server.js`:

```javascript
const cors = require("cors");

app.use(
  cors({
    origin: ["http://localhost:3001", "https://your-frontend-name.vercel.app"],
    credentials: true,
  }),
);
```

Push changes - Vercel will auto-redeploy.

### Step 5: MongoDB Atlas Configuration

1. Go to [MongoDB Atlas](https://cloud.mongodb.com)
2. Navigate to **Network Access**
3. Click **"Add IP Address"**
4. Select **"Allow Access from Anywhere"** (0.0.0.0/0)
5. Confirm

### Vercel Deployment URLs

- **Backend API**: https://your-backend-name.vercel.app
- **Frontend**: https://your-frontend-name.vercel.app

---

## 🔍 Database Structure

### Users Collection

```javascript
{
  _id: ObjectId,
  email: String (unique),
  password: String (hashed),
  name: String,
  role: String (employee/manager/admin),
  department: ObjectId (ref: Department),
  manager: ObjectId (ref: User),
  leaveBalance: {
    annual: Number,
    sick: Number,
    casual: Number
  },
  createdAt: Date,
  updatedAt: Date
}
```

### LeaveRequests Collection

```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: User),
  managerId: ObjectId (ref: User),
  departmentId: ObjectId (ref: Department),
  startDate: Date,
  endDate: Date,
  reason: String,
  status: String (pending/approved/rejected),
  comments: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Departments Collection

```javascript
{
  _id: ObjectId,
  name: String,
  description: String,
  manager: ObjectId (ref: User),
  employees: [ObjectId] (ref: User),
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🔐 Security Features

- **JWT Authentication** - Secure token-based authentication
- **Password Hashing** - bcryptjs for secure password storage
- **Role-Based Access Control** - Separate permissions for employees/managers/admins
- **CORS Configuration** - Restricted API access
- **Input Validation** - Server-side validation of all inputs
- **Environment Variables** - Secure storage of sensitive data

---

## 🐛 Troubleshooting

### Backend Issues

**Connection Error to MongoDB:**

- Check MongoDB Atlas IP whitelist (0.0.0.0/0)
- Verify connection string in .env file
- Ensure MongoDB credentials are correct

**Port Already in Use:**

```bash
# Change PORT in .env or run on different port
set PORT=5001 && npm start
```

**JWT Token Errors:**

- Ensure JWT_SECRET is set in .env
- Check token expiration settings

### Frontend Issues

**Cannot Connect to Backend API:**

- Verify `REACT_APP_API_URL` in .env
- Check backend is running and accessible
- Verify CORS configuration

**Blank Page on Load:**

- Check browser console for errors
- Verify Redux store is configured
- Check network requests in DevTools

**Redux State Issues:**

- Clear localStorage: Open DevTools → Application → Storage → Clear
- Refresh the page
- Check Redux DevTools for state updates

---

## 📝 Contributing Guidelines

### Reporting Bugs

- Clear title and description
- Steps to reproduce
- Expected vs actual behavior
- Screenshots (if applicable)
- Your environment (OS, Node version, browser)

### Submitting Features

1. Fork the repository
2. Create feature branch: `git checkout -b feature/YourFeature`
3. Make changes with clear, readable code
4. Commit: `git commit -m "Add: Your feature description"`
5. Push to fork: `git push origin feature/YourFeature`
6. Open Pull Request with clear description

### Commit Convention

- `Add:` for new features
- `Fix:` for bug fixes
- `Update:` for improvements
- `Refactor:` for code refactoring
- `Docs:` for documentation

---

## 📞 Support

For issues, questions, or suggestions:

1. Check existing issues on GitHub
2. Create new issue with detailed description
3. Include screenshots/error logs
4. Mention your environment setup

---

## 📄 License

This project is licensed under the MIT License.

---

## 🙏 Acknowledgments

- MERN Stack community
- MongoDB Atlas for database hosting
- Vercel for deployment platform
- React and Node.js communities

---

**Last Updated:** May 2026
**Status:** ✅ Production Ready
**Version:** 1.0.0

🏫 CampusConnect – Backend

CampusConnect is a University Talent Finder App where students can connect for opportunities like academic projects, part-time jobs, hackathon teams, or startup collaborations.

This is the backend (server) part — built using Node.js, Express, and MongoDB.

🚀 Features

✅ Authentication (JWT-based)
✅ Role-based Access (Talent Finder / Talent Seeker / Admin)
✅ Job Posting & Management
✅ Apply for Jobs
✅ View Applicants for Jobs
✅ Analytics (Views, Applications Count)
✅ Recommendation System (Job Matching by Skills)
✅ Password Reset with Token
✅ Secure Routes using Middleware
✅ MongoDB Integration via Mongoose

🧰 Tech Stack
Layer	Technology
Server	Node.js + Express.js
Database	MongoDB + Mongoose
Auth	JWT (JSON Web Tokens)
Password Encryption	bcrypt.js
Environment Config	dotenv
Validation	express-validator
Optional	Multer (for file upload)
⚙️ Setup Instructions
1. Clone the repository
git clone https://github.com/abdullahAzmat-art/AbdullahandSaqlain/
cd campusconnect-backend

2. Install dependencies
npm install

3. Create a .env file in the root folder

Example:

PORT = 6600
MONGO_URI=mongodb://localhost:27017/CampusConnect
JWT_SECRET = sdhfodghdkg
CLIENT_URL=http://localhost:5173/

4. Run the server
npm start


Server runs on 👉 http://localhost:6600

🧩 Folder Structure
backend/
│
├── Controllers/
│   ├── authController.js
│   ├── jobController.js
│   ├── finderController.js
│
├── Models/
│   ├── UserSchema.js
│   ├── JobSchema.js
│
├── Middleware/
│   ├── authMiddleware.js
│
├── Routes/
│   ├── authRoutes.js
│   ├── jobRoutes.js
│   ├── finderRoutes.js
│
├── Utils/
│   ├── sendEmail.js
│
├── server.js
└── .env

🔐 Authentication Flow

User signs up → Token generated via JWT.

Login → Returns token.

Frontend stores token in localStorage.

All protected routes must send header:

Authorization: Bearer <token>


Middleware (protect) validates token and attaches user to req.user.

📦 API Routes
🔑 Auth Routes (/api/auth)
Method	Endpoint	Description
POST	/register	Register new user
POST	/login	Login user
POST	/forgot-password	Send reset link
POST	/reset-password/:token	Reset password
💼 Job Routes (/api/jobs)
Method	Endpoint	Description
POST	/create	Create new job
GET	/	Get all jobs
GET	/my-jobs	Get jobs posted by logged-in user
POST	/apply/:jobId	Apply for job
DELETE	/:id	Delete job (Admin only)
🧠 Finder Routes (/api/finder)
Method	Endpoint	Description
GET	/recommend	Get recommended jobs for current user
GET	/applicants/:id	Get applicants for a specific job
PUT	/update/:id	Edit job
PUT	/mark-filled/:id	Mark job as filled
🧮 Engineering Logic – Recommendation System

The system recommends jobs to the user based on skill or category match:

const user = await User.findById(req.user._id);
const allJobs = await Job.find();

const recommended = allJobs.filter(job => {
  const matchSkill = job.skills.some(skill => user.skills.includes(skill));
  const matchCategory = job.category === user.preferredCategory;
  return matchSkill || matchCategory;
});

🚀 AI Job Application Assistant

An intelligent, end-to-end AI-powered Job Application Assistant that helps users automatically generate a Tailored Resume, Cover Letter, Motivation Letter, and Job Fit Analysis — all based on the job posting and candidate profile.

🧠 Powered by

React, Node.js (Express), Material UI, and Groq/OpenAI API

✨ Features

✅ Upload your resume and input your job details
✅ Automatically compare job requirements with candidate skills
✅ Generate:

Tailored Resume

Cover Letter

Motivation Letter
✅ Get Skill Match Percentage
✅ Modern, responsive UI (Material UI + custom styles)
✅ Real-time AI generation via Groq/OpenAI API

🏗️ Project Structure
AI-Job-Application-Assistant/
├── frontend/        # React app (Netlify)
│   ├── src/
│   ├── package.json
│   └── ...
└── backend/         # Express server (Render)
    ├── index.js
    ├── package.json
    └── ...

💻 Run Locally

Follow these steps to run both the frontend and backend on your local machine.

🧩 1. Clone the Repository
git clone https://github.com/<your-username>/ai-job-application-assistant.git
cd ai-job-application-assistant

⚙️ 2. Setup Backend
cd backend
npm install


Create a .env file inside the backend folder and add your API keys:

PORT=5000
GROQ_API_KEY=your_groq_api_key_here
OPENAI_API_KEY=your_openai_api_key_here  # optional


Then run the backend:

npm run dev


✅ The backend should now be running at:
http://localhost:5000

💅 3. Setup Frontend

Open a new terminal window:

cd frontend
npm install


In frontend/src/config.js (or directly inside your API call), make sure your backend URL is correct:

const backendUrl = "http://localhost:5000/generate";


Then run the React app:

npm start


✅ The frontend should now be running at:
http://localhost:3000

🌐 Deployed Version

🔹 Frontend (Netlify): https://your-netlify-app-url.netlify.app

🔹 Backend (Render): https://your-backend.onrender.com

🧮 Example Request (Backend API)
POST /generate
Content-Type: application/json

{
  "jobDescription": "Frontend Engineer skilled in React, TypeScript, and Node.js",
  "userData": {
    "firstName": "John",
    "lastName": "Doe",
    "skills": "React, Node.js, CSS, GraphQL",
    "summary": "Experienced Frontend Developer with a passion for clean design."
  }
}


Example Response:

{
  "success": true,
  "data": {
    "summary": "...",
    "resume": "...",
    "coverLetter": "...",
    "motivationLetter": "...",
    "skillMatch": 87
  }
}

🧠 How It Works

User enters job details and personal information

Backend sends a structured prompt to Groq API (LLaMA 3.3)

AI compares job requirements and user skills

Generates tailored documents + calculates Skill Match %

Frontend displays results beautifully

🪄 Tech Stack
Layer	Technology
Frontend	React, Material UI, CSS
Backend	Node.js, Express
AI Engine	Groq (LLaMA 3.3), OpenAI
Database (Optional)	Firebase (for user/app tracking)
Deployment	Frontend → Netlify, Backend → Render
🧰 Scripts
Command	Description
npm start	Start React app
npm run build	Build frontend for production
npm run dev	Start backend with nodemon
npm run server	Run backend normally
💡 Future Enhancements

🔹 Save generated results in Firebase

🔹 Multi-language support

🔹 PDF export for all generated documents

🔹 Enhanced AI model fine-tuning

👨‍💻 Author

Farooq Alam
Frontend Engineer | AI Developer
🌐 LinkedIn
 • Portfolio

Would you like me to include screenshots and badges (e.g., Netlify deploy status, Render live status) to make the README look even more professional for your client/demo version?

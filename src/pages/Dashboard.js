// MainPage.jsx
import React, { useState, useMemo } from "react";
import { useAuth } from "../contexts/AuthContext";
import JobForm from "../Components/JobForm";
import CandidateForm from "../Components/CandidateForm";
import ResumeUploader from "../Components/ResumeUploader";
import ResultsPanel from "../Components/ResultPanel";
import "./MainPage.css";
import { uploadToCloudinary } from "../utils/uploadToCloudinary";
import { saveApplicationToFirestore } from "../utils/saveApplicationToFirestore";
import LogoutIcon from '@mui/icons-material/Logout';

export default function MainPage() {
  const { user, signOut } = useAuth();
  const [job, setJob] = useState({
    title: "",
    company: "",
    location: "",
    description: "",
    requiredSkills: "", // comma separated
  });

  const [candidate, setCandidate] = useState({
    firstName: "",
    lastName: "",
    email: user?.email || "",
    phone: "",
    skills: "", // comma separated
    experienceYears: "",
    languages: "",
    address: "",
    country: "",
    summary: "",
    note: "",
    expectedSalary: "",
    noticePeriod: "",
  });

  const [resumeFile, setResumeFile] = useState(null);
  const [generating, setGenerating] = useState(false);
  const [results, setResults] = useState(null); // { matchPercent, summary, resume, coverLetter, motivationLetter }

  // parse skills arrays for quick usage
  const jobSkillsArray = useMemo(() => splitSkills(job.requiredSkills), [job.requiredSkills]);
  const candidateSkillsArray = useMemo(() => splitSkills(candidate.skills), [candidate.skills]);

  function splitSkills(text) {
    if (!text) return [];
    return text
      .split(/[,;\n|]+/)
      .map((s) => s.trim())
      .filter(Boolean)
      .map((s) => s.toLowerCase());
  }

  // simple match algorithm
  function computeSkillMatch(jobSkills, candSkills) {
    if (!jobSkills || jobSkills.length === 0) return 0;
    const cand = candSkills.map((s) => s.toLowerCase());
    let matches = 0;
    for (const j of jobSkills) {
      // exact or partial match
      if (cand.some((c) => c === j || c.includes(j) || j.includes(c))) {
        matches++;
      }
    }
    const pct = Math.round((matches / jobSkills.length) * 100);
    return Math.min(100, pct);
  }

  function getMatchCategory(pct) {
    if (pct >= 85) return "Full match (Top Candidate)";
    if (pct >= 70) return "Excellent match";
    if (pct >= 50) return "Good match";
    if (pct >= 25) return "Fair";
    return "Bad";
  }

  // Placeholder generator — simulates AI output for UI testing.
  // Real implementation will call your backend endpoint that talks to OpenAI.
  function makePlaceholderResults() {
    const matchPercent = computeSkillMatch(jobSkillsArray, candidateSkillsArray);
    const category = getMatchCategory(matchPercent);
    const fullName = `${candidate.firstName} ${candidate.lastName}`.trim() || "Candidate";
    const summaryText = job.description
      ? `${fullName} is a candidate for ${job.title || "this position"}. Brief summary: ${candidate.summary || "No summary provided."}`
      : `${fullName} — ${candidate.summary || "No summary provided."}`;

    const tailoredResume = [
      `${fullName}`,
      candidate.email ? `Email: ${candidate.email}` : "",
      candidate.phone ? `Phone: ${candidate.phone}` : "",
      candidate.skills ? `Skills: ${candidate.skills}` : "",
      candidate.experienceYears ? `Experience: ${candidate.experienceYears} years` : "",
      "",
      "Professional Summary:",
      candidate.summary || "—",
      "",
      "Matched to job:",
      job.title ? `Position: ${job.title} at ${job.company || "Company"}` : "",
      job.requiredSkills ? `Required skills: ${job.requiredSkills}` : "",
    ].filter(Boolean).join("\n");

    const coverLetter = `Dear Hiring Team,

    I am writing to apply for the ${job.title || "position"}${job.company ? ` at ${job.company}` : ""}. My background in ${candidate.skills || "relevant skills"} and ${candidate.experienceYears || "experience"} years of experience makes me a strong fit.

    (Summary)
    ${candidate.summary || "—"}

    Thank you for considering my application.

    Sincerely,
    ${fullName}`;

    const motivationLetter = `Motivation:

    I am particularly motivated to join ${job.company || "this company"} because of the opportunity to work on ${job.title || "this role"} and to apply my skills in ${candidate.skills || "relevant areas"}. I am eager to contribute and grow with the team.`;

    return {
      matchPercent,
      category,
      summary: summaryText,
      resumeText: tailoredResume,
      coverLetter,
      motivationLetter,
    };
  }

  // triggered when user clicks "Create Smart AI Job Application"
  async function handleCreateClick() {
    if (!job.description && !job.title) {
      alert("Please enter at least a job title or description.");
      return;
    }

    setGenerating(true);
    setResults(null);

    try {
      // 1️⃣ Upload resume (if provided)
      let resumeUrl = null;
      if (resumeFile) {
        console.log("Uploading resume to Cloudinary...");
        resumeUrl = await uploadToCloudinary(resumeFile);
        console.log("✅ Resume uploaded:", resumeUrl);
      }

      // 2️⃣ Save basic info to Firestore
      console.log("Saving initial job data to Firestore...");
      const appId = await saveApplicationToFirestore(user.uid, job, candidate, resumeUrl);
      console.log("✅ Application saved with ID:", appId);

      // 3️⃣ Call your backend to generate AI results
      console.log("Calling AI backend...");
      const backendUrl = "http://localhost:5000/generate"; // change later if deployed

      const response = await fetch(backendUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jobDescription: job.description || job.title,
          userData: {
            firstName: candidate.firstName,
            lastName: candidate.lastName,
            email: candidate.email,
            phone: candidate.phone,
            skills: candidate.skills,
            experience: candidate.experience,
            languages: candidate.languages,
            address: candidate.address,
            country: candidate.country,
            summary: candidate.summary,
            note: candidate.note,
            expectedSalary: candidate.expectedSalary,
            noticePeriod: candidate.noticePeriod,
          },
        }),
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || "AI generation failed.");
      }

      const aiResults = {
        summary: result.data.summary || "No summary found.",
        resumeText: result.data.resume || "No resume generated.",
        coverLetter: result.data.coverLetter || "No cover letter generated.",
        motivationLetter: result.data.motivationLetter || "No motivation letter generated.",
        skillMatch: result.data.skillMatch || 0,
        category: result.data.category || "—",
      };

      console.log("✅ AI response received 123123 --- :", aiResults);


      // 4️⃣ Update Firestore with generated results
      await saveApplicationToFirestore(user.uid, job, candidate, resumeUrl, aiResults);

      // 5️⃣ Show in UI
      setResults(aiResults);

      console.log("✅ Application completed successfully.");

    } catch (err) {
      console.error("❌ Error in handleCreateClick:", err);
      alert("Something went wrong while processing your request. Check console for details.");
    } finally {
      setGenerating(false);
    }
  }

  return (
  <div className="app-root">
    <header className="app-header">
      <div className="nav-left">
        <div style={{ display:"flex", alignItems:"center", justifyContent:"center" }} >
          <img src={require('../assets/logo_1.png')} style={{height: '5rem', width: '5rem'}} />
          <h2 className="logo">AI Job Application & Assistant</h2>
        </div>
        <nav className="nav-links">
          <a href="#home">Home</a>
          <a href="#pricing">Pricing</a>
          <a href="#services">Services</a>
          <a href="#about">About</a>
        </nav>
      </div>

      <div className="nav-right">
        <button className="profile-btn">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="Profile"
          />
          <span>Profile</span>
        </button>
        <div style={{marginTop: '1rem'}} >
          <button className="profile-btn" onClick={signOut} >
            <LogoutIcon />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </header>

    {/* 🧩 Main Body */}
    <div className="main-root">
      <div className="main-left">
        <header className="main-header">
          <h1>Create Smart AI Job Application</h1>
          <p className="muted">
            Add job details and your profile/resume — then generate tailored
            documents.
          </p>
        </header>

        <JobForm job={job} setJob={setJob} jobSkillsArray={jobSkillsArray} />

        <CandidateForm candidate={candidate} setCandidate={setCandidate} />

        <ResumeUploader file={resumeFile} setFile={setResumeFile} />

        <div className="actions">
          <div className="match-preview">
            <strong>Skill match (preview): </strong>
            <span className="pill">
              {computeSkillMatch(jobSkillsArray, candidateSkillsArray)}% —{" "}
              {getMatchCategory(
                computeSkillMatch(jobSkillsArray, candidateSkillsArray)
              )}
            </span>
          </div>
          <button
            className="primary"
            onClick={handleCreateClick}
            disabled={generating}
          >
            {generating ? "Generating..." : "Create Smart AI Job Application"}
          </button>
        </div>
      </div>

      <div className="main-right">
        <ResultsPanel
          results={results}
          onDownload={(text, filename) => {
            const blob = new Blob([text], {
              type: "text/plain;charset=utf-8",
            });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = filename;
            a.click();
            URL.revokeObjectURL(url);
          }}
        />
      </div>
    </div>
  </div>
);


}

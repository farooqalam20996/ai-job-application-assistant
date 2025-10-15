// JobForm.jsx
import React from "react";

export default function JobForm({ job, setJob }) {
  return (
    <section className="card">
      <h3>Job details</h3>

      <label className="field">
        <span>Job title</span>
        <input value={job.title} onChange={(e) => setJob((s) => ({ ...s, title: e.target.value }))} placeholder="e.g., Frontend Engineer" />
      </label>

      <label className="field">
        <span>Company (optional)</span>
        <input value={job.company} onChange={(e) => setJob((s) => ({ ...s, company: e.target.value }))} placeholder="Company name" />
      </label>

      <label className="field">
        <span>Location (optional)</span>
        <input value={job.location} onChange={(e) => setJob((s) => ({ ...s, location: e.target.value }))} placeholder="City, Remote, etc." />
      </label>

      <label className="field">
        <span>Job description</span>
        <textarea style={{ width: '100%' }} value={job.description} onChange={(e) => setJob((s) => ({ ...s, description: e.target.value }))} placeholder="Paste the job description here..." rows={6} />
      </label>

      <label className="field">
        <span>Required skills (comma separated)</span>
        <input value={job.requiredSkills} onChange={(e) => setJob((s) => ({ ...s, requiredSkills: e.target.value }))} placeholder="React, TypeScript, Node.js" />
      </label>
    </section>
  );
}

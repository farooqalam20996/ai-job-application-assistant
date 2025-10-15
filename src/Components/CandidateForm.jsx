// CandidateForm.jsx
import React from "react";

export default function CandidateForm({ candidate, setCandidate }) {
  const change = (key) => (e) => setCandidate((s) => ({ ...s, [key]: e.target.value }));

  return (
    <section className="card">
      <h3>Your details</h3>

      <div className="grid-2">
        <label className="field">
          <span>First name</span>
          <input value={candidate.firstName} onChange={change("firstName")} />
        </label>

        <label className="field">
          <span>Last name</span>
          <input value={candidate.lastName} onChange={change("lastName")} />
        </label>
      </div>

      <div className="grid-2">
        <label className="field">
          <span>Email</span>
          <input value={candidate.email} onChange={change("email")} type="email" />
        </label>

        <label className="field">
          <span>Phone</span>
          <input value={candidate.phone} onChange={change("phone")} />
        </label>
      </div>

      <label className="field">
        <span>Skills (comma separated)</span>
        <input value={candidate.skills} onChange={change("skills")} placeholder="React, Node.js, GraphQL" />
      </label>

      <div className="grid-2">
        <label className="field">
          <span>Years of experience</span>
          <input value={candidate.experienceYears} onChange={change("experienceYears")} type="number" />
        </label>

        <label className="field">
          <span>Languages</span>
          <input value={candidate.languages} onChange={change("languages")} placeholder="English, Spanish" />
        </label>
      </div>

      <label className="field">
        <span>Address</span>
        <input value={candidate.address} onChange={change("address")} />
      </label>

      <div className="grid-2">
        <label className="field">
          <span>Country</span>
          <input value={candidate.country} onChange={change("country")} />
        </label>

        <label className="field">
          <span>Notice period</span>
          <input value={candidate.noticePeriod} onChange={change("noticePeriod")} placeholder="e.g., 2 weeks" />
        </label>
      </div>

      <label className="field">
        <span>Expected salary (optional)</span>
        <input value={candidate.expectedSalary} onChange={change("expectedSalary")} />
      </label>

      <label className="field"  >
        <span>Short summary</span>
        <textarea style={{width:"100%"}} value={candidate.summary} onChange={change("summary")} rows={4} placeholder="One-paragraph professional summary" />
      </label>

      <label className="field">
        <span>Notes (optional)</span>
        <textarea style={{width:"100%"}} value={candidate.note} onChange={change("note")} rows={3} placeholder="Anything else to tell the AI" />
      </label>
    </section>
  );
}

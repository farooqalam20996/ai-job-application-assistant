// ResultsPanel.jsx
import React from "react";

function Panel({ title, children, onDownload, filename }) {
  return (
    <div className="result-card">
      <div className="result-header">
        <h4>{title}</h4>
        {onDownload && <button className="mini" onClick={onDownload}>Download</button>}
      </div>
      <pre className="result-body">{children || "—"}</pre>
    </div>
  );
}

export default function ResultsPanel({ results, onDownload, xId }) {
  if (!results) {
    return (
      <div className="results-root">
        <div className="empty">No results yet — fill the forms and click “Create Smart AI Job Application”.</div>
      </div>
    );
  }

  return (
    <div className="results-root">
        <div><em>id: {xId}</em></div>

      <div className="summary-card">
        <div>
          <strong>Skill match:</strong> <span className="big">{results.skillMatch}%</span>
        </div>
        <div><em>{results.category}</em></div>
      </div>

      <Panel title="Summary" onDownload={() => onDownload(results.summary, "summary.txt")}>
        {results.summary}
      </Panel>

      <Panel title="Tailored Resume" onDownload={() => onDownload(results.resumeText, "resume.txt")}>
        {results.resumeText}
      </Panel>

      <Panel title="Cover Letter" onDownload={() => onDownload(results.coverLetter, "cover_letter.txt")}>
        {results.coverLetter}
      </Panel>

      <Panel title="Motivation Letter" onDownload={() => onDownload(results.motivationLetter, "motivation_letter.txt")}>
        {results.motivationLetter}
      </Panel>

      <div style={{ marginTop: 12 }}>
        <button className="secondary" onClick={() => alert("Save functionality - implement to save to Firebase/Server")}>Save to my applications</button>
      </div>
    </div>
  );
}

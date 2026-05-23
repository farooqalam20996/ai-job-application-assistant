// ResumeUploader.jsx
import React, { useRef } from "react";

export default function ResumeUploader({ file, setFile }) {
  const inputRef = useRef();

  function handleFileChange(e) {
    const f = e.target.files?.[0];
    if (f) setFile(f);
  }

  function removeFile() {
    setFile(null);
    if (inputRef.current) inputRef.current.value = "";
  }

  return (
    <section className="card">
      <h3>Resume</h3>
      <p className="muted">Upload your resume (PDF or DOCX). The file will be sent to the server when you generate.</p>

      <div className="file-row">
        <input ref={inputRef} type="file" accept=".pdf,.doc,.docx" onChange={handleFileChange} />
        {file && (
          <div className="file-meta">
            <div><strong>{file.name}</strong></div>
            <div className="muted">{Math.round(file.size / 1024)} KB</div>
            <div style={{ marginTop: 8 }}>
              <button className="mini" onClick={() => removeFile()}>Remove</button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function App() {
  const [pdfUrl, setPdfUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const onDrop = useCallback(async (acceptedFiles, fileRejections) => {
    if (fileRejections.length > 0) {
      toast.error('Unsupported file type. Please upload a PDF.');
      return;
    }

    const file = acceptedFiles[0];
    if (!file) return;

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('pdf', file);
      const res = await fetch('http://localhost:4000/sign', {
        method: 'POST',
        body: formData,
      });
      if (!res.ok) throw new Error('Server error');
      const blob = await res.blob();
      setPdfUrl(URL.createObjectURL(blob));
      toast.success('PDF signed and ready to view!');
    } catch (err) {
      console.error(err);
      toast.error('Failed to sign PDF.');
    } finally {
      setLoading(false);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'application/pdf': [] },
    multiple: false,
  });

  const reset = () => setPdfUrl(null);

  return (
    <div className="container">
      <h1>PDF Upload & Sign</h1>
      {!pdfUrl && (
        <div {...getRootProps({ className: 'dropzone' })}>
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Drop the PDF here...</p>
          ) : (
            <p>Drag & drop a PDF here, or click to select</p>
          )}
          <p className="format">Supported format: PDF (.pdf) files only.</p>
        </div>
      )}

      {loading && <p className="loading">Uploading and signing...</p>}

      {pdfUrl && (
        <div className="viewer">
          <iframe title="signed-pdf" src={pdfUrl} />
          <div className="actions">
            <a href={pdfUrl} download="signed.pdf">Download PDF</a>
            <button onClick={reset}>Re-upload</button>
          </div>
        </div>
      )}
      <ToastContainer position="bottom-right" />
    </div>
  );
}

export default App;

import React, { useState } from "react";

const FileUploader = ({ onUploadSuccess }) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setError("");
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a file first.");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://localhost:8080/api/ocr/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Upload failed");
      const text = await response.text();
      onUploadSuccess(text);
    } catch (err) {
      setError("Failed to upload file. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-800 text-white p-6 rounded-2xl shadow-lg w-full max-w-md mx-auto text-center">
      <h2 className="text-xl font-semibold mb-4">Upload Certificate for OCR</h2>

      <input
        type="file"
        accept="image/*,.pdf"
        onChange={handleFileChange}
        className="block w-full text-sm text-gray-300 
                   file:mr-4 file:py-2 file:px-4 
                   file:rounded-full file:border-0 
                   file:text-sm file:font-semibold 
                   file:bg-pink-500 file:text-white 
                   hover:file:bg-pink-600 cursor-pointer"
      />

      {error && <p className="text-red-400 mt-2">{error}</p>}

      <button
        onClick={handleUpload}
        disabled={loading}
        className="mt-4 px-6 py-2 bg-pink-500 hover:bg-pink-600 
                   text-white font-medium rounded-full 
                   transition duration-200 disabled:opacity-50"
      >
        {loading ? "Processing..." : "Upload & Extract"}
      </button>
    </div>
  );
};

export default FileUploader;

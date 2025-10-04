import React, { useState } from "react";
import FileUploader from "../components/FileUploader";

const UploadPage = () => {
  const [ocrText, setOcrText] = useState("");

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center px-4">
      <h1 className="text-3xl font-bold mb-8">Certificate OCR Verification</h1>

      <FileUploader onUploadSuccess={(text) => setOcrText(text)} />

      {ocrText && (
        <div className="bg-gray-800 mt-8 p-6 rounded-xl w-full max-w-3xl shadow-lg">
          <h2 className="text-xl font-semibold mb-3">Extracted Text:</h2>
          <pre className="text-sm whitespace-pre-wrap text-gray-300 bg-gray-900 p-4 rounded-lg">
            {ocrText}
          </pre>
        </div>
      )}
    </div>
  );
};

export default UploadPage;

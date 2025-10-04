const API_BASE = "http://localhost:8080/api";

export const uploadCertificate = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${API_BASE}/ocr/upload`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) throw new Error("Upload failed");
  return response.text();
};

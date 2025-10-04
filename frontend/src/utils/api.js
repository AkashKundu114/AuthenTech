const API_BASE_URL = 'http://localhost:8080/api';

export const scanPdfForKeywords = async (file, keywords, token) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('keywords', keywords);

    const response = await fetch(`${API_BASE_URL}/ocr/scan-keywords`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
        body: formData,
    });

    if (!response.ok) {
        const errorData = await response.text();
        throw new Error(errorData || 'Failed to scan the document.');
    }

    return response.json();
};
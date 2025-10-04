import React, { useState } from 'react';
import { scanPdfForKeywords } from '../utils/api'; // Adjust path if needed
import { ResultsCard } from './ResultsCard'; // Assuming you have this component

export const KeywordScanner = () => {
    const [file, setFile] = useState(null);
    const [keywords, setKeywords] = useState('');
    const [results, setResults] = useState(null);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file || !keywords) {
            setError('Please provide both a file and keywords.');
            return;
        }
        
        setIsLoading(true);
        setError('');
        setResults(null);
        
        try {
            // Assuming you get the token from your auth context or local storage
            const token = localStorage.getItem('authToken'); 
            const data = await scanPdfForKeywords(file, keywords, token);
            setResults(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Scan PDF for Keywords</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="file-upload" className="block text-sm font-medium text-gray-700 mb-1">
                        PDF Document
                    </label>
                    <input 
                        id="file-upload" 
                        type="file" 
                        accept=".pdf"
                        onChange={handleFileChange}
                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                </div>
                <div className="mb-6">
                    <label htmlFor="keywords" className="block text-sm font-medium text-gray-700 mb-1">
                        Keywords (comma-separated)
                    </label>
                    <textarea 
                        id="keywords"
                        value={keywords}
                        onChange={(e) => setKeywords(e.target.value)}
                        placeholder="e.g., invoice, signature, verified"
                        className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                        rows="3"
                    />
                </div>
                <button 
                    type="submit" 
                    disabled={isLoading}
                    className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
                >
                    {isLoading ? 'Scanning...' : 'Scan Now'}
                </button>
            </form>

            {error && <p className="mt-4 text-red-600">{error}</p>}
            
            {results && (
                <div className="mt-6">
                    <h3 className="text-xl font-semibold mb-2">Scan Results</h3>
                    {/* You can pass this data to your ResultsCard component */}
                    <pre className="bg-gray-100 p-4 rounded-md text-sm">
                        {JSON.stringify(results, null, 2)}
                    </pre>
                </div>
            )}
        </div>
    );
};
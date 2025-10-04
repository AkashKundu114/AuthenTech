import React from 'react';
import { Navbar } from '../components/Navbar'; // Assuming you have a Navbar
import { KeywordScanner } from '../components/KeywordScanner';

const UploadPage = () => {
    return (
        <div>
            <Navbar />
            <main className="container mx-auto mt-8">
                {/* You can have other components here like your main FileUploader */}
                {/* <FileUploader /> */}
                
                <div className="my-12 border-t border-gray-200"></div>

                <KeywordScanner />
            </main>
        </div>
    );
};

export default UploadPage;
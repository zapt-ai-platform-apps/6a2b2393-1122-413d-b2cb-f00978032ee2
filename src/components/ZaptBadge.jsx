import React from 'react';

const ZaptBadge = () => {
    return (
        <div className="text-center py-6">
            <a 
                href="https://www.zapt.ai" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-purple-500 hover:text-purple-700 transition-colors inline-flex items-center gap-1 font-medium"
            >
                <span>Made on ZAPT</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
            </a>
        </div>
    );
};

export default ZaptBadge;
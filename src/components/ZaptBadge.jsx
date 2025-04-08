import React from 'react';

const ZaptBadge = () => {
    return (
        <div className="text-center py-4">
            <a 
                href="https://www.zapt.ai" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-gray-700 transition-colors inline-block"
            >
                Made on ZAPT
            </a>
        </div>
    );
};

export default ZaptBadge;
import React from 'react';

const ProcessedImage = ({ processedImage, isProcessing, backgroundColor = '#ffffff' }) => {
    const handleDownload = () => {
        if (!processedImage) return;
        
        const link = document.createElement('a');
        link.href = processedImage;
        link.download = 'removed-background.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };
    
    return (
        <div className="h-full flex flex-col">
            {isProcessing ? (
                <div className="border-2 border-gray-200 rounded-lg p-8 flex flex-col items-center justify-center h-full bg-gray-50">
                    <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                    <p className="text-gray-600 font-medium">Processing your image...</p>
                    <p className="text-sm text-gray-500 mt-2">This might take a few seconds</p>
                </div>
            ) : processedImage ? (
                <div className="flex flex-col h-full">
                    <div className="flex-grow mb-4 rounded-lg overflow-hidden shadow-md" style={{ backgroundColor }}>
                        <img 
                            src={processedImage} 
                            alt="Processed" 
                            className="w-full h-auto"
                            style={{ objectFit: 'contain' }}
                        />
                    </div>
                    <button 
                        onClick={handleDownload}
                        className="py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-lg font-medium transition-colors cursor-pointer shadow-md hover:shadow-lg"
                    >
                        <div className="flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                            Download Image
                        </div>
                    </button>
                </div>
            ) : (
                <div className="border-2 border-gray-200 rounded-lg p-8 flex flex-col items-center justify-center h-64 bg-gray-50">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-300 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="text-gray-500 font-medium">
                        Processed image will appear here
                    </p>
                    <p className="text-sm text-gray-400 mt-1">
                        Upload an image and remove the background
                    </p>
                </div>
            )}
        </div>
    );
};

export default ProcessedImage;
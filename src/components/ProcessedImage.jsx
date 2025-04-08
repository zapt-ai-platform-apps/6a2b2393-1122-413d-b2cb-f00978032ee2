import React from 'react';

const ProcessedImage = ({ processedImage, isProcessing }) => {
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
                    <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                    <p className="text-gray-600 font-medium">Processing image...</p>
                </div>
            ) : processedImage ? (
                <div className="flex flex-col h-full">
                    <div className="flex-grow mb-4">
                        <img 
                            src={processedImage} 
                            alt="Processed" 
                            className="w-full h-auto rounded-md border border-gray-300 bg-gray-100"
                            style={{ backgroundColor: 'transparent' }}
                        />
                    </div>
                    <button 
                        onClick={handleDownload}
                        className="py-3 px-4 bg-green-600 hover:bg-green-700 text-white rounded-md font-medium transition-colors cursor-pointer"
                    >
                        Download Image
                    </button>
                </div>
            ) : (
                <div className="border-2 border-gray-200 rounded-lg p-8 flex items-center justify-center h-full bg-gray-50">
                    <p className="text-gray-500">
                        Processed image will appear here
                    </p>
                </div>
            )}
        </div>
    );
};

export default ProcessedImage;
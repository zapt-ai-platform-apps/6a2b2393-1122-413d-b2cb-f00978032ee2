import React, { useState } from 'react';
import ImageUploader from './ImageUploader';
import ProcessedImage from './ProcessedImage';
import * as Sentry from '@sentry/browser';

const BackgroundRemover = () => {
    const [originalImage, setOriginalImage] = useState(null);
    const [processedImage, setProcessedImage] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState(null);
    const [backgroundColor, setBackgroundColor] = useState('#ffffff');

    const handleImageUpload = (imageFile) => {
        setOriginalImage(imageFile);
        setProcessedImage(null);
        setError(null);
    };

    const removeBackground = async () => {
        if (!originalImage) {
            setError("Please upload an image first");
            return;
        }

        setIsProcessing(true);
        setError(null);

        try {
            console.log("Sending image to backend for processing...");
            const formData = new FormData();
            formData.append('image', originalImage);

            const response = await fetch('/api/removeBackground', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to process image');
            }

            const data = await response.blob();
            const processedImageUrl = URL.createObjectURL(data);
            setProcessedImage(processedImageUrl);
            console.log("Background removed successfully");
        } catch (error) {
            console.error("Error removing background:", error);
            Sentry.captureException(error, {
                extra: {
                    imageSize: originalImage?.size,
                    imageType: originalImage?.type,
                    fileName: originalImage?.name
                }
            });
            setError(error.message || "Failed to remove background. Please try again.");
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg mb-8 border border-purple-100">
            <div className="grid md:grid-cols-2 gap-8">
                <div>
                    <h2 className="text-2xl font-semibold mb-4 text-purple-700">Upload Image</h2>
                    <ImageUploader onImageUpload={handleImageUpload} />
                    
                    {originalImage && (
                        <div className="mt-6">
                            <div className="rounded-lg overflow-hidden shadow-md">
                                <img 
                                    src={URL.createObjectURL(originalImage)} 
                                    alt="Original" 
                                    className="w-full h-auto"
                                />
                            </div>
                            <button 
                                onClick={removeBackground}
                                disabled={isProcessing}
                                className={`mt-5 w-full py-3 px-4 rounded-lg font-medium transition-colors cursor-pointer
                                    ${isProcessing 
                                        ? 'bg-purple-400 text-white cursor-not-allowed' 
                                        : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-md hover:shadow-lg'}`}
                            >
                                {isProcessing ? (
                                    <div className="flex items-center justify-center">
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                                        Removing Background...
                                    </div>
                                ) : 'Remove Background'}
                            </button>
                        </div>
                    )}
                </div>

                <div>
                    <h2 className="text-2xl font-semibold mb-4 text-pink-600">Result</h2>
                    
                    {processedImage && (
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Background Color
                            </label>
                            <div className="flex items-center space-x-3">
                                <input 
                                    type="color"
                                    value={backgroundColor}
                                    onChange={(e) => setBackgroundColor(e.target.value)}
                                    className="h-10 w-10 border-0 cursor-pointer rounded"
                                />
                                <span className="text-sm text-gray-500">
                                    {backgroundColor}
                                </span>
                            </div>
                        </div>
                    )}
                    
                    <ProcessedImage 
                        processedImage={processedImage} 
                        isProcessing={isProcessing}
                        backgroundColor={backgroundColor}
                    />
                </div>
            </div>

            {error && (
                <div className="mt-6 p-4 bg-red-100 text-red-700 rounded-lg border border-red-200 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {error}
                </div>
            )}
        </div>
    );
};

export default BackgroundRemover;
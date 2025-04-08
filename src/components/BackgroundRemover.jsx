import React, { useState } from 'react';
import ImageUploader from './ImageUploader';
import ProcessedImage from './ProcessedImage';
import * as Sentry from '@sentry/browser';

const BackgroundRemover = () => {
    const [originalImage, setOriginalImage] = useState(null);
    const [processedImage, setProcessedImage] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState(null);

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
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <div className="grid md:grid-cols-2 gap-8">
                <div>
                    <h2 className="text-xl font-semibold mb-4">Upload Image</h2>
                    <ImageUploader onImageUpload={handleImageUpload} />
                    
                    {originalImage && (
                        <div className="mt-4">
                            <img 
                                src={URL.createObjectURL(originalImage)} 
                                alt="Original" 
                                className="w-full h-auto rounded-md border border-gray-300"
                            />
                            <button 
                                onClick={removeBackground}
                                disabled={isProcessing}
                                className={`mt-4 w-full py-3 px-4 rounded-md font-medium transition-colors cursor-pointer
                                    ${isProcessing 
                                        ? 'bg-blue-300 text-white cursor-not-allowed' 
                                        : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
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
                    <h2 className="text-xl font-semibold mb-4">Result</h2>
                    <ProcessedImage 
                        processedImage={processedImage} 
                        isProcessing={isProcessing} 
                    />
                </div>
            </div>

            {error && (
                <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-md">
                    {error}
                </div>
            )}
        </div>
    );
};

export default BackgroundRemover;
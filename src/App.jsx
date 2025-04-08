import React from 'react';
import BackgroundRemover from './components/BackgroundRemover';
import ZaptBadge from './components/ZaptBadge';

export default function App() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 text-gray-800 py-8 px-4 sm:px-6 md:px-8">
            <div className="max-w-4xl mx-auto">
                <header className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">Background Remover</h1>
                    <p className="text-lg text-gray-600">Upload an image, remove the background, and download the result</p>
                </header>
                
                <BackgroundRemover />
                
                <ZaptBadge />
            </div>
        </div>
    );
}
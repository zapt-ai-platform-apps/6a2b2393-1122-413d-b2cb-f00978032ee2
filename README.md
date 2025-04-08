# Background Remover App

A simple web application that allows users to remove backgrounds from images.

## Features

- Upload images via drag-and-drop or file selection
- Remove backgrounds from images with a single click
- Download the processed image with transparent background

## Technology Stack

- Frontend: React, TailwindCSS
- Backend: Vercel Serverless Functions
- APIs: Remove.bg API for background removal

## Setup

1. Clone the repository
2. Run `npm install` to install dependencies
3. Create a `.env` file with the required environment variables
4. Run `npm run dev` to start the development server

## How It Works

1. Upload an image using the drag-and-drop area
2. Click "Remove Background" to process the image
3. Once processing is complete, the result will appear on the right
4. Click "Download Image" to save the processed image

## Notes

- This app uses the Remove.bg API which requires an API key
- The API has usage limits depending on your subscription plan
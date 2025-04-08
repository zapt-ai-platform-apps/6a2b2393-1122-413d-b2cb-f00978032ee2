import FormData from 'form-data';
import Sentry from './_sentry.js';

export default async function handler(req, res) {
  console.log("Background removal API called");
  
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Get the uploaded image
    const formData = req.formData ? await req.formData() : null;
    
    if (!formData) {
      console.error("No form data received");
      return res.status(400).json({ error: 'No image uploaded' });
    }

    const imageFile = formData.get('image');
    
    if (!imageFile) {
      console.error("No image file in form data");
      return res.status(400).json({ error: 'No image found in request' });
    }

    console.log("Image received, size:", imageFile.size, "type:", imageFile.type);

    // Prepare data for remove.bg API
    const apiKey = process.env.REMOVEBG_API_KEY;
    if (!apiKey) {
      throw new Error('REMOVEBG_API_KEY environment variable is not set');
    }

    console.log("Using API key:", apiKey.substring(0, 3) + '...' + apiKey.substring(apiKey.length - 3));

    // Create a buffer from the file
    const buffer = Buffer.from(await imageFile.arrayBuffer());

    // Call remove.bg API
    const form = new FormData();
    form.append('image_file', buffer, {
      filename: 'image.jpg',
      contentType: imageFile.type,
    });

    console.log("Calling remove.bg API...");
    const response = await fetch('https://api.remove.bg/v1.0/removebg', {
      method: 'POST',
      headers: {
        'X-Api-Key': apiKey,
      },
      body: form,
    });

    console.log("Remove.bg API response status:", response.status);

    if (!response.ok) {
      let errorMessage = 'Error processing image';
      try {
        const errorData = await response.json();
        console.error("remove.bg API error:", errorData);
        errorMessage = errorData.errors?.[0]?.title || errorMessage;
      } catch (e) {
        console.error("Error parsing error response:", e);
      }
      throw new Error(errorMessage);
    }

    console.log("remove.bg API call successful");
    const processedImageBuffer = await response.arrayBuffer();

    // Set appropriate headers and send the processed image
    res.setHeader('Content-Type', 'image/png');
    res.setHeader('Content-Disposition', 'attachment; filename="no-bg.png"');
    return res.status(200).send(Buffer.from(processedImageBuffer));
  } catch (error) {
    console.error("Error in removeBackground API:", error);
    Sentry.captureException(error, {
      extra: {
        endpoint: '/api/removeBackground',
        method: req.method,
      }
    });
    return res.status(500).json({ error: error.message || 'Failed to process image' });
  }
}
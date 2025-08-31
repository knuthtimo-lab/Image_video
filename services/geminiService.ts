import { GoogleGenAI, Modality, GenerateContentResponse } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export async function generateAdImage(
  base64ImageData: string,
  mimeType: string,
  prompt: string,
  slogan?: string
): Promise<{ imageUrl: string; text: string }> {
  try {
    let finalPrompt = prompt;
    if (slogan && slogan.trim() !== '') {
        finalPrompt = `${prompt}. Prominently feature the following marketing slogan in the ad, making it look natural and well-integrated: "${slogan}"`;
    }

    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image-preview',
      contents: {
        parts: [
          {
            inlineData: {
              data: base64ImageData,
              mimeType: mimeType,
            },
          },
          {
            text: finalPrompt,
          },
        ],
      },
      config: {
        responseModalities: [Modality.IMAGE, Modality.TEXT],
      },
    });

    let imageUrl = '';
    let text = 'AI-generated result.';

    if (response.candidates && response.candidates.length > 0) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          const base64ImageBytes: string = part.inlineData.data;
          const imageMimeType = part.inlineData.mimeType;
          imageUrl = `data:${imageMimeType};base64,${base64ImageBytes}`;
        } else if (part.text) {
          text = part.text;
        }
      }
    }

    if (!imageUrl) {
      throw new Error("The AI did not return an image. It might have refused the request. Please try a different prompt or image.");
    }
    
    return { imageUrl, text };

  } catch (error) {
    console.error("Error generating ad image with Gemini:", error);
    // Provide a more user-friendly error message
    if (error instanceof Error && error.message.includes('429')) {
        throw new Error("API rate limit exceeded. Please wait a moment and try again.");
    }
    throw new Error("Failed to generate ad image due to an API error.");
  }
}

export async function generateSlogan(
    base64ImageData: string,
    mimeType: string
): Promise<string> {
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: {
                parts: [
                    {
                        inlineData: {
                            data: base64ImageData,
                            mimeType: mimeType,
                        },
                    },
                    {
                        text: 'Analyze the product in this image and generate a short, catchy marketing slogan for it. The slogan should be 5-8 words long. Only return the slogan text, with no extra formatting or quotation marks.',
                    },
                ],
            },
        });
        return response.text.trim().replace(/"/g, ''); // Clean up the response
    } catch (error) {
        console.error("Error generating slogan with Gemini:", error);
        throw new Error("Failed to generate a slogan due to an API error.");
    }
}

export async function editAdImage(
  base64ImageData: string,
  mimeType: string,
  editPrompt: string,
): Promise<{ imageUrl: string; text: string }> {
    try {
        if (!editPrompt || editPrompt.trim() === '') {
            throw new Error("Edit instruction cannot be empty.");
        }
        
        const response: GenerateContentResponse = await ai.models.generateContent({
            model: 'gemini-2.5-flash-image-preview',
            contents: {
                parts: [
                    {
                        inlineData: {
                            data: base64ImageData,
                            mimeType: mimeType,
                        },
                    },
                    {
                        text: editPrompt,
                    },
                ],
            },
            config: {
                responseModalities: [Modality.IMAGE, Modality.TEXT],
            },
        });

        let imageUrl = '';
        let text = 'AI-edited result.';

        if (response.candidates && response.candidates.length > 0) {
            for (const part of response.candidates[0].content.parts) {
                if (part.inlineData) {
                    const base64ImageBytes: string = part.inlineData.data;
                    const imageMimeType = part.inlineData.mimeType;
                    imageUrl = `data:${imageMimeType};base64,${base64ImageBytes}`;
                } else if (part.text) {
                    text = part.text;
                }
            }
        }

        if (!imageUrl) {
            throw new Error("The AI did not return an edited image. It may have refused the request. Please try a different instruction.");
        }
        
        return { imageUrl, text };

    } catch (error) {
        console.error("Error editing ad image with Gemini:", error);
        if (error instanceof Error && error.message.includes('429')) {
            throw new Error("API rate limit exceeded. Please wait a moment and try again.");
        }
        throw new Error("Failed to edit ad image due to an API error.");
    }
}
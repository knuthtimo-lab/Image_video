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

    if (response.promptFeedback?.blockReason) {
      throw new Error(`Request was blocked by the API for safety reasons: ${response.promptFeedback.blockReason}. Please modify your prompt or image.`);
    }

    let imageUrl = '';
    let text = 'AI-generated result.';

    if (response.candidates && response.candidates.length > 0 && response.candidates[0].content.parts) {
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
      throw new Error("The AI did not return an image. This could be due to a content policy violation or if the prompt is too complex. Please try a different prompt or image.");
    }
    
    return { imageUrl, text };

  } catch (error) {
    console.error("Error generating ad image with Gemini:", error);
    if (error instanceof Error) {
        if (error.message.includes('429')) {
            throw new Error("API rate limit exceeded. Please wait a moment and try again.");
        }
        if (error.message.startsWith('Request was blocked') || error.message.startsWith('The AI did not return an image')) {
            throw error;
        }
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

        if (response.promptFeedback?.blockReason) {
            throw new Error(`Request for slogan was blocked by the API for safety reasons: ${response.promptFeedback.blockReason}.`);
        }
        if (!response.text) {
            throw new Error("The AI did not return a slogan. This might be due to a content policy issue.");
        }

        return response.text.trim().replace(/"/g, ''); // Clean up the response
    } catch (error) {
        console.error("Error generating slogan with Gemini:", error);
        if (error instanceof Error) {
           if (error.message.includes('429')) {
               throw new Error("API rate limit exceeded. Please wait a moment and try again.");
           }
           if (error.message.includes('blocked by the API') || error.message.includes('did not return a slogan')) {
               throw error;
           }
       }
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

        if (response.promptFeedback?.blockReason) {
            throw new Error(`Request was blocked by the API for safety reasons: ${response.promptFeedback.blockReason}. Please modify your instruction.`);
        }

        let imageUrl = '';
        let text = 'AI-edited result.';

        if (response.candidates && response.candidates.length > 0 && response.candidates[0].content.parts) {
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
            throw new Error("The AI did not return an edited image. This could be due to a content policy violation or if the instruction is too complex. Please try a different instruction.");
        }
        
        return { imageUrl, text };

    } catch (error) {
        console.error("Error editing ad image with Gemini:", error);
        if (error instanceof Error) {
            if (error.message.includes('429')) {
                throw new Error("API rate limit exceeded. Please wait a moment and try again.");
            }
            if (error.message.startsWith('Request was blocked') || error.message.startsWith('The AI did not return an edited image')) {
                throw error;
            }
        }
        throw new Error("Failed to edit ad image due to an API error.");
    }
}

export async function generateImageFromText(prompt: string): Promise<{ base64Image: string; mimeType: string }> {
  try {
    const response = await ai.models.generateImages({
        model: 'imagen-4.0-generate-001',
        prompt: `A high-quality, photorealistic product image of: ${prompt}. The product should be centered, well-lit, on a clean, neutral background.`,
        config: {
          numberOfImages: 1,
          outputMimeType: 'image/png',
          aspectRatio: '1:1',
        },
    });

    if (!response.generatedImages || response.generatedImages.length === 0) {
      throw new Error("The AI did not return an image. It might have refused the request. Please try a different prompt.");
    }

    const base64ImageBytes: string = response.generatedImages[0].image.imageBytes;
    return { base64Image: base64ImageBytes, mimeType: 'image/png' };

  } catch (error) {
    console.error("Error generating image from text:", error);
    if (error instanceof Error && error.message.includes('429')) {
        throw new Error("API rate limit exceeded. Please wait a moment and try again.");
    }
    throw new Error("Failed to generate image from text due to an API error.");
  }
}
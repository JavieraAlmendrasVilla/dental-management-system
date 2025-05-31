import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY || 'dummy-key',
  dangerouslyAllowBrowser: true
});

export async function generateWebsite(prompt: string) {
  if (!import.meta.env.VITE_OPENAI_API_KEY) {
    throw new Error('OpenAI API key is not configured. Please add VITE_OPENAI_API_KEY to your environment variables.');
  }

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages: [
        {
          role: "system",
          content: `You are an expert web designer and developer specializing in dental websites. 
          Generate modern, professional website content and design suggestions based on the user's requirements.
          Focus on creating content that is:
          1. Professional and trustworthy
          2. Patient-focused
          3. SEO-optimized
          4. Conversion-oriented
          
          Include specific sections for:
          - Hero/Banner content
          - Services description
          - About the practice
          - Team/Staff section
          - Contact information
          - Call-to-action phrases`
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 2000
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error('Error generating website:', error);
    throw error;
  }
}
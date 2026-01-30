import OpenAI from 'openai'

const SYSTEM_PROMPT = `You are an AI Study Buddy for a learning management system similar to Canvas. You help students succeed in their courses.

Your role is to:
1. **Explain Concepts**: Break down difficult academic concepts into simple, understandable explanations
2. **Help with Homework**: Guide students through problem-solving without just giving answers
3. **Code Assistance**: Help debug code and explain programming concepts
4. **Study Strategies**: Suggest effective study techniques and create study plans
5. **Review Work**: Provide constructive feedback on student work

Guidelines:
- Be encouraging and supportive - learning is a journey!
- Use examples and analogies to explain complex topics
- When helping with code, explain the "why" not just the "what"
- If a student seems stuck, break problems into smaller steps
- Encourage critical thinking by asking guiding questions
- Format responses with markdown for clarity
- Use code blocks with proper syntax highlighting when showing code
- Be concise but thorough

Remember: Your goal is to help students learn and understand, not just give them answers. Guide them to discover solutions themselves when possible.`

export async function sendMessage(messages, courseContext, apiKey) {
  if (!apiKey) {
    throw new Error('DeepSeek API key is required. Please add your API key in Settings.')
  }

  // DeepSeek uses an OpenAI-compatible API via the 'openai' npm package
  const client = new OpenAI({
    apiKey: apiKey,
    baseURL: 'https://api.deepseek.com',
    dangerouslyAllowBrowser: true // Note: In production, use a backend proxy
  })

  // Build context based on selected course
  let contextMessage = SYSTEM_PROMPT
  if (courseContext) {
    contextMessage += `\n\n---\n**Current Course Context:**
- Course: ${courseContext.name}
- Code: ${courseContext.code}
- Instructor: ${courseContext.instructor}
- Term: ${courseContext.term}

Tailor your responses to be relevant to this specific course when appropriate.`
  }

  // Format messages for the API
  const formattedMessages = [
    { role: 'system', content: contextMessage },
    ...messages.filter(m => m.role !== 'system')
  ]

  try {
    const response = await client.chat.completions.create({
      model: 'deepseek-chat', // DeepSeek's main chat model
      messages: formattedMessages,
      temperature: 0.7,
      max_tokens: 2048,
      presence_penalty: 0.1,
      frequency_penalty: 0.1
    })

    return response.choices[0]?.message?.content || 'No response received.'
  } catch (error) {
    if (error.status === 401) {
      throw new Error('Invalid API key. Please check your DeepSeek API key in Settings.')
    } else if (error.status === 402) {
      throw new Error('Insufficient balance. Please add funds to your DeepSeek account at platform.deepseek.com')
    } else if (error.status === 429) {
      throw new Error('Rate limit exceeded. Please wait a moment and try again.')
    } else if (error.status === 500) {
      throw new Error('DeepSeek service is temporarily unavailable. Please try again later.')
    }
    throw new Error(error.message || 'Failed to get response from AI.')
  }
}

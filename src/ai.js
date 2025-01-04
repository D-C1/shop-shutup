const SYSTEM_PROMPT = `You are Shop Shutup, a shopping assistant focused on helping users find the perfect products. 
Your role is to:
1. Ask thoughtful questions to understand user needs
2. Consider factors like budget, features, and use cases
3. Be direct and honest about product recommendations
4. Keep responses concise but informative

When users mention a product:
1. Ask about their specific needs and use cases
2. Inquire about their budget range
3. Ask about must-have features
4. Consider their experience level with similar products

Keep the conversation focused and helpful.`;

async function getAIResponse(messages) {
  try {
    const apiKey = await chrome.storage.local.get('openai_key');
    
    if (!apiKey.openai_key) {
      return "Please set your OpenAI API key in the extension settings. Click the extension icon with right-click and select 'Options'.";
    }

    console.log('Sending request to OpenAI...', { messages }); // Debug log

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey.openai_key}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          ...messages
        ],
        temperature: 0.7,
        max_tokens: 150
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('OpenAI API Error:', errorData); // Debug log
      return `API Error: ${errorData.error?.message || 'Unknown error'}`;
    }

    const data = await response.json();
    console.log('OpenAI Response:', data); // Debug log
    return data.choices[0].message.content;
  } catch (error) {
    console.error('AI Error:', error); // Debug log
    return `Error: ${error.message}. Please check your API key and try again.`;
  }
}

export { getAIResponse }; 
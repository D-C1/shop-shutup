# Shop Shutup

A Chrome extension that provides an AI-powered shopping assistant to help users make informed purchase decisions. Get personalized product guidance and smart Amazon search links based on your needs.

## Features
- AI-powered chat interface
- Product requirement analysis
- Budget consideration
- Feature comparison assistance
- Smart Amazon integration:
  - Filtered search links based on requirements
  - Price range buffer for better results
  - Review insights integration
  - Product context awareness
- Intelligent shopping guidance:
  - Use-case based recommendations
  - Price range insights with context
  - Automatic filter application
  - Direct product search links

## Installation
1. Clone the repository
2. Install dependencies: `npm install`
3. Build the extension: `npm run build`
4. Load the extension in Chrome:
   - Go to `chrome://extensions/`
   - Enable "Developer mode"
   - Click "Load unpacked"
   - Select the `dist` folder

## Development
- `npm run dev` - Watch mode for development
- `npm run build` - Production build

## Configuration
1. Get an OpenAI API key from [platform.openai.com](https://platform.openai.com)
2. Right-click the extension icon and select "Options"
3. Enter your API key and save

## How It Works
1. Tell the assistant what you're looking to buy
2. Answer questions about your needs and budget
3. Get personalized recommendations with:
   - Direct Amazon search links
   - Price range guidance
   - Feature recommendations
   - Review insights

## Smart Search Features
- Automatic price range buffer (±20%)
- Rating filters for quality assurance
- Prime eligibility filtering
- Category-specific search parameters

## Version History
- 1.0.1 - Enhanced shopping guidance & Amazon integration
- 1.0.0 - Initial release with basic AI chat functionality 
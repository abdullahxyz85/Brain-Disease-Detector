import React from 'react';
import styled from 'styled-components';

const TestContainer = styled.div`
  max-width: 800px;
  margin: 2rem auto;
  padding: 2rem;
  background: white;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
`;

const TestSection = styled.div`
  margin-bottom: 2rem;
  padding: 1.5rem;
  border: 2px dashed #e0e0e0;
  border-radius: 10px;
  background: #f9f9f9;
`;

const TestTitle = styled.h3`
  color: #4facfe;
  margin-bottom: 1rem;
  font-size: 1.3rem;
`;

const TestList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;

  li {
    padding: 0.5rem 0;
    padding-left: 1.5rem;
    position: relative;
    color: #666;

    &:before {
      content: '✓';
      position: absolute;
      left: 0;
      top: 0.5rem;
      color: #4facfe;
      font-weight: bold;
    }
  }
`;

const CodeBlock = styled.pre`
  background: #f4f4f4;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1rem;
  overflow-x: auto;
  font-size: 0.9rem;
  margin: 1rem 0;
`;

const WarningBox = styled.div`
  background: #fff3cd;
  border: 1px solid #ffeaa7;
  border-radius: 8px;
  padding: 1rem;
  margin: 1rem 0;
  color: #856404;

  strong {
    color: #d63031;
  }
`;

const ChatbotTest = () => {
  return (
    <TestContainer>
      <h1>🧠 BrainBot Chatbot - Setup Verification</h1>
      
      <TestSection>
        <TestTitle>📋 Setup Checklist</TestTitle>
        <TestList>
          <li>Groq SDK installed (groq-sdk package)</li>
          <li>Environment variables configured (.env file)</li>
          <li>BrainChatbot component created</li>
          <li>FloatingChatbot widget implemented</li>
          <li>Routes added to App.js</li>
          <li>Navigation updated with AI Assistant link</li>
          <li>System prompt configured for brain health expertise</li>
        </TestList>
      </TestSection>

      <TestSection>
        <TestTitle>🔑 Environment Setup</TestTitle>
        <p>Make sure your <code>.env</code> file contains:</p>
        <CodeBlock>
{`REACT_APP_GROQ_API_KEY=your_groq_api_key_here`}
        </CodeBlock>
        
        <WarningBox>
          <strong>Important:</strong> Don't forget to restart your development server after adding the API key!
        </WarningBox>
      </TestSection>

      <TestSection>
        <TestTitle>🚀 Available Features</TestTitle>
        <TestList>
          <li>Real-time streaming chat responses</li>
          <li>Multiple AI model selection (Llama 3, Mixtral, Gemma)</li>
          <li>Brain health specialized knowledge</li>
          <li>Responsive design for all devices</li>
          <li>Floating chatbot widget on all pages</li>
          <li>Dedicated chatbot page at /chatbot</li>
          <li>Suggested questions for easy start</li>
          <li>Error handling and loading states</li>
        </TestList>
      </TestSection>

      <TestSection>
        <TestTitle>🧪 Test Questions</TestTitle>
        <p>Try asking BrainBot these questions:</p>
        <TestList>
          <li>"How can I improve my memory?"</li>
          <li>"What are early signs of cognitive decline?"</li>
          <li>"Best brain exercises for seniors?"</li>
          <li>"How does stress affect brain health?"</li>
          <li>"What foods are good for brain health?"</li>
          <li>"How to interpret my cognitive test results?"</li>
        </TestList>
      </TestSection>

      <TestSection>
        <TestTitle>🔧 Usage Examples</TestTitle>
        
        <h4>Basic Component Usage:</h4>
        <CodeBlock>
{`import BrainChatbot from './components/chat/BrainChatbot';

function MyPage() {
  return (
    <div>
      <BrainChatbot />
    </div>
  );
}`}
        </CodeBlock>

        <h4>Floating Widget Usage:</h4>
        <CodeBlock>
{`import FloatingChatbot from './components/chat/FloatingChatbot';

function App() {
  return (
    <div>
      {/* Your app content */}
      <FloatingChatbot />
    </div>
  );
}`}
        </CodeBlock>
      </TestSection>

      <TestSection>
        <TestTitle>🔍 Troubleshooting</TestTitle>
        <TestList>
          <li>If you see "API Key not found", check your .env file</li>
          <li>If models don't work, verify your Groq API key is valid</li>
          <li>If styling looks broken, ensure styled-components is installed</li>
          <li>If animations don't work, check framer-motion installation</li>
          <li>For mobile issues, test responsive design at different screen sizes</li>
        </TestList>
      </TestSection>

      <WarningBox>
        <strong>Security Note:</strong> The current setup uses client-side API calls. 
        For production, consider implementing a backend proxy to secure your API keys.
      </WarningBox>
    </TestContainer>
  );
};

export default ChatbotTest;

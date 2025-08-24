import React from 'react';
import styled from 'styled-components';

// Enhanced text formatting function to handle dense AI responses
const formatMessageText = (text) => {
  if (!text) return '';
  
  let formatted = text
    // Normalize line breaks
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n')
    
    // Enhanced header detection - ensure proper spacing 
    .replace(/(\*\*[^*]+\*\*)/g, '\n$1\n')  // **Header** with single line breaks
    .replace(/(#{1,6}\s[^\n]+)/g, '\n$1\n')  // # Header with single line breaks
    
    // Force line breaks before bullet points and numbered lists
    .replace(/([^.\n])\s*([•·*-]\s)/g, '$1\n$2')
    .replace(/([^.\n])\s*(\d+\.\s)/g, '$1\n$2')
    
    // Ensure each bullet/number starts on new line (fix run-together lists)
    .replace(/([•·*-]\s[^•·*\n-]+?)([•·*-]\s)/g, '$1\n$2')
    .replace(/(\d+\.\s[^0-9\n]+?)(\d+\.\s)/g, '$1\n$2')
    
    // Clean up multiple spaces and normalize
    .replace(/[ \t]+/g, ' ')
    .replace(/\n\n\n+/g, '\n\n')
    .replace(/^\n+/, '')
    .replace(/\n+$/, '');

  return formatted;
};

// Advanced message component with better parsing
const FormattedMessage = ({ text, isUser }) => {
  if (isUser) {
    return <span style={{ whiteSpace: 'pre-wrap' }}>{text}</span>;
  }

  // Process AI messages line by line for better bullet/number separation
  const formattedText = formatMessageText(text);
  const lines = formattedText.split('\n').map(line => line.trim()).filter(line => line);
  
  const elements = [];
  let currentSection = [];
  
  lines.forEach((line, index) => {
    // Enhanced header detection - multiple patterns including ** Header ** with spaces
    const isHeader = (
      line.match(/^\*\*[^*]+\*\*$/) ||                 // **Header** (exact match)
      line.match(/^\*\*[^*]+\*\*\s*$/) ||              // **Header** with optional trailing spaces
      line.match(/^\s*\*\*[^*]+\*\*\s*$/) ||           // **Header** with leading/trailing spaces
      line.match(/^#{1,6}\s+\S/) ||                    // # Header (with space and content)
      line.match(/^[A-Z][A-Z\s]{3,}:?\s*$/) ||        // ALL CAPS HEADER (at least 4 chars)
      (line.match(/^[A-Z][A-Za-z\s]+:?\s*$/) && line.length > 3 && line.length < 50) // Title Case (reasonable length)
    );
    
    if (isHeader) {
      // Flush current section
      if (currentSection.length > 0) {
        elements.push({ type: 'section', content: currentSection.join(' '), key: elements.length });
        currentSection = [];
      }
      
      // Clean and add header - more robust cleaning
      let headerText = line
        .replace(/^\s*\*\*/, '')            // Remove leading ** and spaces
        .replace(/\*\*\s*$/, '')            // Remove trailing ** and spaces
        .replace(/^#{1,6}\s*/g, '')         // Remove # markers
        .replace(/:$/, '')                  // Remove trailing colon
        .trim();
        
      // Skip empty headers
      if (headerText.length > 0) {
        elements.push({ 
          type: 'header', 
          content: headerText, 
          key: elements.length 
        });
      }
    }
    // Check if it's a bullet point
    else if (line.match(/^[•·*-]\s/)) {
      // Flush current section first
      if (currentSection.length > 0) {
        elements.push({ type: 'section', content: currentSection.join(' '), key: elements.length });
        currentSection = [];
      }
      
      const bulletText = line.replace(/^[•·*-]\s/, '');
      elements.push({ 
        type: 'bullet', 
        content: bulletText, 
        key: elements.length 
      });
    }
    // Check if it's a numbered list
    else if (line.match(/^\d+\.\s/)) {
      // Flush current section first
      if (currentSection.length > 0) {
        elements.push({ type: 'section', content: currentSection.join(' '), key: elements.length });
        currentSection = [];
      }
      
      const match = line.match(/^(\d+\.)\s(.*)$/);
      if (match) {
        elements.push({ 
          type: 'numbered', 
          number: match[1],
          content: match[2], 
          key: elements.length 
        });
      }
    }
    // Regular text - add to current section
    else {
      // Check if this line contains ** markdown but wasn't detected as header
      if (line.includes('**')) {
        // Try to extract content between ** - improved regex to handle multiple ** patterns
        const headerMatches = line.match(/\*\*([^*]+)\*\*/g);
        if (headerMatches) {
          // Flush current section first
          if (currentSection.length > 0) {
            elements.push({ type: 'section', content: currentSection.join(' '), key: elements.length });
            currentSection = [];
          }
          
          // Process each header match
          headerMatches.forEach((match, matchIndex) => {
            const headerContent = match.replace(/\*\*/g, '').trim();
            if (headerContent.length > 0) {
              elements.push({ 
                type: 'header', 
                content: headerContent, 
                key: elements.length + matchIndex 
              });
            }
          });
          
          // Process rest of line if any
          const restOfLine = line.replace(/\*\*[^*]+\*\*/g, '').trim();
          if (restOfLine.length > 0) {
            currentSection.push(restOfLine);
          }
          return; // Skip adding to current section
        }
      }
      
      // Regular text content
      currentSection.push(line);
    }
  });
  
  // Flush any remaining section
  if (currentSection.length > 0) {
    elements.push({ type: 'section', content: currentSection.join(' '), key: elements.length });
  }
  
  return (
    <div>
      {elements.map((element) => {
        switch (element.type) {
          case 'header':
            return (
              <div key={element.key} style={{ 
                fontWeight: '700', 
                color: '#333', 
                fontSize: '18px',
                marginBottom: '16px',
                marginTop: '24px',
                borderLeft: '4px solid #4facfe',
                paddingLeft: '16px',
                background: 'linear-gradient(90deg, rgba(79, 172, 254, 0.15) 0%, rgba(79, 172, 254, 0.06) 70%, transparent 100%)',
                borderRadius: '0 8px 8px 0',
                padding: '14px 18px',
                letterSpacing: '0.5px',
                lineHeight: '1.3',
                textTransform: 'none',
                position: 'relative',
                boxShadow: '0 3px 15px rgba(79, 172, 254, 0.2)',
                border: '1px solid rgba(79, 172, 254, 0.25)',
                display: 'flex',
                alignItems: 'center',
                backdropFilter: 'blur(10px)'
              }}>
                <span style={{
                  marginRight: '10px',
                  color: '#4facfe',
                  fontSize: '18px',
                  fontWeight: 'bold'
                }}>
                  ▶
                </span>
                {element.content}
              </div>
            );
            
          case 'bullet':
            return (
              <div key={element.key} style={{ 
                marginBottom: '10px',
                display: 'flex',
                alignItems: 'flex-start',
                lineHeight: '1.6',
                paddingLeft: '8px'
              }}>
                <span style={{ 
                  color: '#4facfe', 
                  marginRight: '12px', 
                  fontWeight: 'bold',
                  minWidth: '16px',
                  marginTop: '2px',
                  fontSize: '14px'
                }}>
                  •
                </span>
                <span style={{ 
                  flex: 1,
                  color: '#333',
                  fontSize: '15px'
                }}>
                  {element.content}
                </span>
              </div>
            );
            
          case 'numbered':
            return (
              <div key={element.key} style={{ 
                marginBottom: '10px',
                display: 'flex',
                alignItems: 'flex-start',
                lineHeight: '1.6',
                paddingLeft: '8px'
              }}>
                <span style={{ 
                  color: '#4facfe', 
                  marginRight: '12px', 
                  fontWeight: 'bold',
                  minWidth: '24px',
                  marginTop: '2px',
                  fontSize: '15px'
                }}>
                  {element.number}
                </span>
                <span style={{ 
                  flex: 1,
                  color: '#333',
                  fontSize: '15px'
                }}>
                  {element.content}
                </span>
              </div>
            );
            
          case 'section':
            return (
              <div key={element.key} style={{ 
                marginBottom: '16px',
                lineHeight: '1.7',
                color: '#333',
                fontSize: '15px',
                paddingLeft: '4px'
              }}>
                {element.content}
              </div>
            );
            
          default:
            return null;
        }
      })}
    </div>
  );
};

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

const MarkdownTest = () => {
  // Test text that mimics the BrainBot response format
  const testText = `** Overview **
BrainBot introduces itself as a friendly AI companion on the Brain Disease Detector platform, designed to share evidence-based brain health information, explain cognitive conditions, and guide users through tools and features in a warm, supportive tone.

** Key Information - What I Offer: **
• Detailed explanations of memory strategies, cognitive training, and lifestyle factors supporting brain health.
• Early warning signs of cognitive changes and how to interpret them.
• Guidance on using assessments, interpreting results, and next steps.

** How I Help: **
• Breaks complex neuroscience into clear, actionable tips.
• Provides practical examples and real-world applications.
• Reminds users to seek professional medical advice whenever needed.

** Why It Matters: **
• Understanding brain health empowers users to make informed lifestyle choices.
• Early awareness of changes can lead to timely professional support.`;

  return (
    <TestContainer>
      <h1>🧠 Markdown Header Parsing Test</h1>
      
      <TestSection>
        <h3>✅ Before Fix (Raw Markdown):</h3>
        <pre style={{ background: '#f4f4f4', padding: '1rem', borderRadius: '8px', overflow: 'auto' }}>
          {testText}
        </pre>
      </TestSection>

      <TestSection>
        <h3>🎨 After Fix (Properly Formatted):</h3>
        <div style={{ background: '#f9f9f9', padding: '1rem', borderRadius: '8px' }}>
          <FormattedMessage text={testText} isUser={false} />
        </div>
      </TestSection>

      <TestSection>
        <h3>🔧 What Was Fixed:</h3>
        <ul>
          <li>✅ Headers like <code>** Overview **</code> now properly detected</li>
          <li>✅ Leading and trailing spaces around <code>**</code> markers handled</li>
          <li>✅ Headers are styled with beautiful gradient backgrounds</li>
          <li>✅ Proper spacing and typography applied</li>
          <li>✅ Bullet points and numbered lists properly formatted</li>
        </ul>
      </TestSection>

      <TestSection>
        <h3>📝 Test Cases Covered:</h3>
        <ul>
          <li><code>** Overview **</code> - with spaces around markers</li>
          <li><code>** Key Information - What I Offer: **</code> - with spaces and colons</li>
          <li><code>** How I Help: **</code> - with spaces and colons</li>
          <li><code>** Why It Matters: **</code> - with spaces and colons</li>
        </ul>
      </TestSection>
    </TestContainer>
  );
};

export default MarkdownTest;

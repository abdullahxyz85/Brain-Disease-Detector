# Synapse Safari

An interactive web application for early detection of cognitive decline through games, quizzes, and speech analysis.

## 🧠 Overview

Synapse Safari is a comprehensive web-based platform designed to help users evaluate cognitive health through engaging activities that test memory, reaction time, problem-solving skills, and language capabilities. The application provides immediate feedback and personalized recommendations based on performance, all while offering an intuitive and modern user experience.

## ✨ Features

### 🎮 Cognitive Games

- **Memory Game**: Test short-term memory by recalling sequences of numbers or images
- **Reaction Time Game**: Measure how quickly users respond to visual stimuli
- **Problem-Solving Game**: Engage in puzzles and logic challenges
- **Spatial Skills Game**: Manipulate and arrange objects correctly
- **Mental Calculation Game**: Challenge arithmetic and numerical processing skills
- **Dual N-Back Game**: Advanced working memory training with visual and auditory stimuli

### 📝 Cognitive Quizzes

- **Temporal Orientation**: Test awareness of time, date, and sequences
- **Semantic Memory**: Challenge knowledge of facts and general information
- **Reasoning & Logic**: Evaluate critical thinking abilities

### 🎤 Speech Analysis

- Record short audio samples describing images or daily activities
- AI-powered analysis of vocabulary richness, repetition, and sentence coherence
- Immediate feedback on speech patterns

### 🤖 AI Assistant

- Full-screen chatbot powered by advanced AI models
- Brain health expertise and personalized guidance
- Interactive Q&A for cognitive wellness advice
- Real-time streaming responses

### 📊 Results Dashboard

- Combined cognitive health score from all activities
- Personalized recommendations for cognitive improvement
- Performance tracking and analytics
- Progress visualization

### 🧬 MRI Analysis (Planned)

- Upload and analyze brain MRI scans
- AI-powered detection of potential cognitive decline indicators
- Secure and private image processing

## 🛠️ Tech Stack

### Frontend

- **React 18** - Modern JavaScript library for building user interfaces
- **React Router** - Declarative routing for React applications
- **Styled Components** - CSS-in-JS styling with dynamic theming
- **Framer Motion** - Production-ready motion library for React
- **React Audio Voice Recorder** - Audio capture and recording functionality
- **Groq SDK** - AI-powered chatbot integration
- **TypeScript Particles** - Interactive particle background animations

### Development Tools

- **React Scripts** - Build toolchain and development server
- **ESLint** - Code linting and formatting
- **Autoprefixer** - CSS vendor prefixing
- **PostCSS** - CSS transformation toolkit

### Deployment

- **Vercel** - Frontend hosting and deployment platform
- **CI/CD** - Automated build and deployment pipeline

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v16.0.0 or higher)
- **npm** or **yarn** package manager
- Modern web browser with JavaScript enabled

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/abdullahxyz85/Brain-Disease-Detector.git
cd Brain-Disease-Detector
```

2. **Install dependencies**

```bash
cd frontend
npm install
```

3. **Set up environment variables**
   Create a `.env` file in the frontend directory:

```bash
REACT_APP_GROQ_API_KEY=your_groq_api_key_here
```

4. **Start the development server**

```bash
npm start
```

The application will be available at `http://localhost:3000`

### Production Build

```bash
npm run build
```

This creates an optimized production build in the `build` folder.

## 📁 Project Structure

```
synapse-safari/
├── frontend/
│   ├── public/
│   │   ├── index.html
│   │   ├── manifest.json
│   │   └── favicon.ico
│   ├── src/
│   │   ├── components/
│   │   │   ├── auth/          # Authentication components
│   │   │   ├── chat/          # AI chatbot components
│   │   │   ├── games/         # Cognitive game components
│   │   │   ├── layout/        # Navigation and layout
│   │   │   ├── results/       # Results dashboard
│   │   │   └── ui/            # Reusable UI components
│   │   ├── contexts/          # React context providers
│   │   ├── pages/             # Main page components
│   │   ├── services/          # API and external services
│   │   ├── App.js
│   │   └── index.js
│   ├── package.json
│   └── .env
├── README.md
└── package.json
```

## 🎯 Key Features Breakdown

### Authentication System

- User registration and login
- Protected routes for personalized experience
- Session management and user profiles

### Cognitive Assessment Suite

- **6 Different Games**: Each targeting specific cognitive domains
- **Real-time Scoring**: Immediate feedback and performance metrics
- **Adaptive Difficulty**: Games adjust based on user performance
- **Progress Tracking**: Historical performance data and trends

### AI-Powered Analysis

- **Groq Integration**: Advanced language model for intelligent responses
- **Speech Processing**: Audio analysis for language pattern detection
- **Personalized Recommendations**: AI-generated cognitive improvement suggestions

### Modern UI/UX

- **Responsive Design**: Optimized for desktop, tablet, and mobile
- **Smooth Animations**: Framer Motion for engaging interactions
- **Accessibility**: WCAG compliant design patterns
- **Dark/Light Themes**: User preference-based theming

## 🌐 Live Demo

Visit the live application: [Synapse Safari](https://your-vercel-url.vercel.app)

## 🔧 Available Scripts

In the frontend directory, you can run:

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run vercel-build` - Builds for Vercel deployment

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## ⚠️ Important Disclaimer

This application is designed for **educational and informational purposes only**. It is **not a diagnostic tool** and should not be used to replace professional medical advice, diagnosis, or treatment.

- Results are for cognitive wellness awareness only
- Always consult qualified healthcare providers for medical concerns
- This tool does not diagnose medical conditions
- Seek professional help if you have cognitive health concerns

## 🙏 Acknowledgments

- **UI Icons**: [Heroicons](https://heroicons.com/)
- **Images**: [Unsplash](https://unsplash.com/)
- **AI Models**: [Groq](https://groq.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Particles**: [TSParticles](https://particles.js.org/)

## 📞 Support

For support, email synapsesafari@example.com or join our Discord community.

## 🔮 Roadmap

- [ ] Advanced MRI scan analysis
- [ ] Mobile application (iOS/Android)
- [ ] Healthcare provider integration
- [ ] Multi-language support
- [ ] Advanced AI models for better accuracy
- [ ] Social features and family sharing
- [ ] Offline mode capabilities

---

**Made with ❤️ for cognitive health awareness**

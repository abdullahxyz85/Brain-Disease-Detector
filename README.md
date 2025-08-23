# Brain Disease Detector

An interactive web application for early detection of cognitive decline through games, quizzes, and speech analysis.

## Overview

Brain Disease Detector is a web-based platform designed to help users evaluate cognitive health through engaging activities that test memory, reaction time, problem-solving skills, and language capabilities. The application provides immediate feedback and personalized recommendations based on performance.

## Features

### 1. Cognitive Games

- **Memory Game**: Test short-term memory by recalling sequences of numbers or images
- **Reaction Time Game**: Measure how quickly users respond to visual stimuli
- **Problem-Solving Game**: Engage in puzzles and logic challenges
- **Spatial Skills Game**: Manipulate and arrange objects correctly

### 2. Cognitive Quizzes

- **Temporal Orientation**: Test awareness of time, date, and sequences
- **Semantic Memory**: Challenge knowledge of facts and general information
- **Reasoning & Logic**: Evaluate critical thinking abilities

### 3. Speech Analysis

- Record short audio samples describing images or daily activities
- AI-powered analysis of vocabulary richness, repetition, and sentence coherence
- Immediate feedback on speech patterns

### 4. Results Dashboard

- Combined cognitive health score from all activities
- Personalized recommendations for cognitive improvement
- Session-based tracking of performance (no data saved between sessions)

## Tech Stack

### Frontend

- React
- React Router for navigation
- Styled Components for styling
- Framer Motion for animations
- React Audio Voice Recorder for speech capture

### Backend

- FastAPI (Python)
- Integration with Speech-to-Text services (simulated in demo)
- Rule-based recommendation engine

## Getting Started

### Prerequisites

- Node.js (v14+)
- Python (v3.8+)
- npm or yarn

### Installation

1. Clone the repository

```
git clone https://github.com/your-username/brain-disease-detector.git
cd brain-disease-detector
```

2. Set up the frontend

```
cd frontend
npm install
npm start
```

3. Set up the backend

```
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

The application will be available at http://localhost:3000 with the API running at http://localhost:8000.

## Important Disclaimer

This application is designed for educational and informational purposes only. It is not a diagnostic tool and should not be used to replace professional medical advice. If you have concerns about cognitive health, please consult a healthcare provider.

## License

[MIT License](LICENSE)

## Acknowledgments

- Icons provided by [Heroicons](https://heroicons.com/)
- Sample images from [Unsplash](https://unsplash.com/)

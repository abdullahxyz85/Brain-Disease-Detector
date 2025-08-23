from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Optional
import json
import random
from datetime import datetime
import os
from dotenv import load_dotenv
from groq import Groq

# Load environment variables from .env file
load_dotenv()

# Initialize Groq client
groq_client = Groq(
    api_key=os.environ.get("GROQ_API_KEY"),
)

# Initialize FastAPI app
app = FastAPI(
    title="Brain Disease Detector API",
    description="API for processing cognitive game results, quizzes, and speech analysis",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, restrict this to your frontend domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Utility function for generating AI responses with appropriate system prompts
async def generate_ai_response(system_prompt, user_prompt):
    try:
        response = groq_client.chat.completions.create(
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_prompt}
            ],
            model="llama-3.3-70b-versatile",
        )
        return response.choices[0].message.content
    except Exception as e:
        print(f"Error generating AI response: {str(e)}")
        return "Unable to generate AI response at this time."

# System prompts for different endpoints
SYSTEM_PROMPTS = {
    "memory_game": """You are an AI neurological expert specializing in memory assessment and brain health. 
    Your role is to analyze memory game performance data and provide insights that might indicate early signs of cognitive decline or brain disorders. 
    Be informative yet sensitive, and provide actionable recommendations based on scientific research.
    Focus on patterns that might correlate with conditions like Alzheimer's, dementia, or mild cognitive impairment.
    Frame your response as a preliminary assessment, not a diagnosis, and always encourage professional medical consultation.
    Keep responses concise (150-200 words), informative, and conversational.""",
    
    "reaction_game": """You are an AI neurological expert specializing in processing speed and reaction time assessment. 
    Your role is to analyze reaction game performance data and provide insights that might indicate early signs of cognitive or neurological issues.
    Be informative yet sensitive, and provide actionable recommendations based on scientific research.
    Focus on patterns that might correlate with conditions affecting motor function, processing speed, or attention like Parkinson's disease, ADHD, or stroke effects.
    Frame your response as a preliminary assessment, not a diagnosis, and always encourage professional medical consultation.
    Keep responses concise (150-200 words), informative, and conversational.""",
    
    "quiz_assessment": """You are an AI neurological expert specializing in cognitive assessment through quiz performance.
    Your role is to analyze quiz results across different cognitive domains and provide insights that might indicate early signs of cognitive or neurological issues.
    Be informative yet sensitive, and provide actionable recommendations based on scientific research.
    Focus on patterns that might correlate with conditions affecting different cognitive domains like memory, reasoning, language, or attention.
    Frame your response as a preliminary assessment, not a diagnosis, and always encourage professional medical consultation.
    Keep responses concise (150-200 words), informative, and conversational.""",
    
    "speech_analysis": """You are an AI neurological expert specializing in speech and language analysis for brain health assessment.
    Your role is to analyze speech patterns, vocabulary usage, coherence, and fluency to identify potential indicators of neurological conditions.
    Be informative yet sensitive, and provide actionable recommendations based on scientific research.
    Focus on patterns that might correlate with conditions like aphasia, dementia, Parkinson's disease, or stroke effects.
    Pay particular attention to word finding difficulties, repetition, grammatical errors, and speech clarity.
    Frame your response as a preliminary assessment, not a diagnosis, and always encourage professional medical consultation.
    Keep responses concise (150-200 words), informative, and conversational.""",
    
    "overall_assessment": """You are an AI neurological expert specializing in comprehensive cognitive assessment across multiple domains.
    Your role is to integrate data from various cognitive tests to provide a holistic view of brain health and potential areas of concern.
    Be informative yet sensitive, and provide actionable recommendations based on scientific research.
    Focus on patterns across different cognitive domains that might indicate specific neurological conditions or brain disorders.
    Highlight both strengths and weaknesses in cognitive performance, and suggest personalized strategies for maintaining or improving brain health.
    Frame your response as a preliminary assessment, not a diagnosis, and always encourage professional medical consultation.
    Keep responses concise (200-250 words), informative, and conversational."""
}

# Models for data validation
class GameResult(BaseModel):
    score: int
    level: str
    rounds: int
    maxSequenceLength: Optional[int] = None
    accuracy: Optional[int] = None

class QuizResult(BaseModel):
    score: int
    category: str
    answeredQuestions: int
    correctAnswers: int
    timeSpent: int

class SpeechAnalysisResult(BaseModel):
    transcription: str
    wordCount: int
    uniqueWordCount: int
    speechDuration: int
    audioQuality: Optional[float] = None

# Routes
@app.get("/")
async def root():
    return {"message": "Welcome to the Brain Disease Detector API"}

# Game related endpoints
@app.post("/api/game/memory")
async def process_memory_game(result: GameResult):
    # Calculate a cognitive score based on game performance
    cognitive_score = min(100, result.score / 10)
    
    # Format the result data for AI analysis
    user_prompt = f"""
    Please analyze these memory game results and provide an assessment with recommendations:
    - Score: {result.score}
    - Level: {result.level}
    - Rounds completed: {result.rounds}
    - Maximum sequence length remembered: {result.maxSequenceLength or 'N/A'}
    - Accuracy: {result.accuracy or 'N/A'}%
    
    Please consider how these results might relate to brain health and cognitive function.
    """
    
    # Get AI assessment
    ai_assessment = await generate_ai_response(SYSTEM_PROMPTS["memory_game"], user_prompt)
    
    # Extract recommendations from AI response (assuming last paragraph contains recommendations)
    ai_parts = ai_assessment.split("\n\n")
    assessment = "\n\n".join(ai_parts[:-1]) if len(ai_parts) > 1 else ai_assessment
    recommendations_text = ai_parts[-1] if len(ai_parts) > 1 else ""
    
    # Extract recommendations as bullet points or create default ones
    recommendations = [line.strip('- ') for line in recommendations_text.split("\n") if line.strip()]
    if not recommendations:
        recommendations = [
            "Continue memory exercises regularly",
            "Try increasing difficulty to challenge your memory further"
        ]
    
    return {
        "cognitive_score": cognitive_score,
        "assessment": ai_assessment,
        "recommendations": recommendations
    }

@app.post("/api/game/reaction")
async def process_reaction_game(result: GameResult):
    # Calculate cognitive score based on reaction game performance
    cognitive_score = min(100, result.score / 5)
    
    # Format the result data for AI analysis
    user_prompt = f"""
    Please analyze these reaction game results and provide an assessment with recommendations:
    - Score: {result.score}
    - Level: {result.level}
    - Rounds completed: {result.rounds}
    - Accuracy: {result.accuracy or 'N/A'}%
    
    Please consider how reaction time might relate to brain health, motor function, and neurological conditions.
    """
    
    # Get AI assessment
    ai_assessment = await generate_ai_response(SYSTEM_PROMPTS["reaction_game"], user_prompt)
    
    # Extract recommendations from AI response (assuming last paragraph contains recommendations)
    ai_parts = ai_assessment.split("\n\n")
    assessment = "\n\n".join(ai_parts[:-1]) if len(ai_parts) > 1 else ai_assessment
    recommendations_text = ai_parts[-1] if len(ai_parts) > 1 else ""
    
    # Extract recommendations as bullet points or create default ones
    recommendations = [line.strip('- ') for line in recommendations_text.split("\n") if line.strip()]
    if not recommendations:
        recommendations = [
            "Practice regularly to maintain quick response times",
            "Try varied reaction challenges to improve overall performance"
        ]
    
    return {
        "cognitive_score": cognitive_score,
        "assessment": ai_assessment,
        "recommendations": recommendations
    }

# Quiz related endpoints
@app.post("/api/quiz/submit")
async def submit_quiz(result: QuizResult):
    # Process quiz results
    accuracy = (result.correctAnswers / result.answeredQuestions) * 100 if result.answeredQuestions > 0 else 0
    
    # Calculate cognitive score based on accuracy and time
    base_score = accuracy
    time_factor = min(1.0, 300 / max(result.timeSpent, 60))  # Reward faster completion up to a point
    cognitive_score = base_score * (0.8 + 0.2 * time_factor)  # Time impacts 20% of score
    
    # Format the result data for AI analysis
    user_prompt = f"""
    Please analyze these quiz results and provide an assessment with recommendations:
    - Category: {result.category} (cognitive domain being tested)
    - Score: {result.score}
    - Questions answered: {result.answeredQuestions}
    - Correct answers: {result.correctAnswers}
    - Accuracy: {accuracy:.1f}%
    - Time spent: {result.timeSpent} seconds
    
    Please consider how performance in this cognitive domain might relate to brain health and specific neurological conditions.
    """
    
    # Get AI assessment
    ai_assessment = await generate_ai_response(SYSTEM_PROMPTS["quiz_assessment"], user_prompt)
    
    # Extract recommendations from AI response (assuming last paragraph contains recommendations)
    ai_parts = ai_assessment.split("\n\n")
    assessment = "\n\n".join(ai_parts[:-1]) if len(ai_parts) > 1 else ai_assessment
    recommendations_text = ai_parts[-1] if len(ai_parts) > 1 else ""
    
    # Extract recommendations as bullet points or create default ones
    recommendations = [line.strip('- ') for line in recommendations_text.split("\n") if line.strip()]
    if not recommendations:
        recommendations = [
            f"Continue practicing {result.category} quizzes",
            "Vary the types of cognitive challenges you engage with"
        ]
    
    return {
        "cognitive_score": cognitive_score,
        "accuracy": accuracy,
        "assessment": ai_assessment,
        "recommendations": recommendations
    }

# Speech analysis endpoint
@app.post("/api/speech/analyze")
async def analyze_speech(audio: UploadFile = File(...), promptId: int = Form(...)):
    # In a real application, you would:
    # 1. Save the audio file temporarily
    # 2. Use a speech-to-text API (Google/Azure)
    # 3. Process the text for linguistic features
    # 4. Return analysis
    
    # For demonstration, we'll simulate the analysis and transcription
    
    # Prompt phrases based on the promptId
    prompt_phrases = {
        1: "Describe your typical day and daily routine",
        2: "Tell me about your favorite hobby or activity",
        3: "Describe a memorable trip or vacation you've taken",
        4: "Explain how to prepare your favorite meal or recipe",
        5: "Share your thoughts on a recent book you've read or movie you've watched"
    }
    
    prompt = prompt_phrases.get(promptId, "General speech sample")
    
    # Simulate transcription
    transcriptions = {
        1: "In the morning I usually wake up around seven and have breakfast. Then I get ready for work and leave by eight thirty. I work until about five, and then come home. In the evening I usually make dinner, maybe watch some TV or read a book, and then go to bed around ten thirty.",
        2: "I enjoy gardening in my free time. It's relaxing to work with plants and see them grow. I mainly focus on growing vegetables like tomatoes and peppers, but I also have some flowers for color.",
        3: "Last year I visited the mountains for a week. The scenery was beautiful with tall trees and clear lakes. We went hiking every day and saw lots of wildlife. The cabin we stayed in was cozy and had a great view.",
        4: "For my favorite pasta dish, you start by boiling water and adding salt. Then cook the pasta. While that's cooking, sauté garlic in olive oil, add tomatoes and basil. When the pasta is done, mix it with the sauce and add cheese on top.",
        5: "I recently watched a documentary about ocean life. It was fascinating to learn about creatures living in the deepest parts of the sea. The photography was amazing, showing animals we rarely get to see. It made me think about how much we still don't know about our planet."
    }
    
    # Use a default transcription if the promptId doesn't match
    transcription = transcriptions.get(promptId, "This is a simulated transcription of the speech sample. In a real application, we would use a speech-to-text service to convert the audio to text and then analyze linguistic patterns.")
    
    # Calculate some basic metrics
    words = transcription.split()
    word_count = len(words)
    unique_word_count = len(set(word.lower() for word in words))
    speech_duration = random.randint(15, 60)  # Simulated duration in seconds
    
    # Format the speech data for AI analysis
    user_prompt = f"""
    Please analyze this speech sample and provide an assessment with feedback on linguistic patterns that might indicate neurological health:
    
    Prompt given: "{prompt}"
    
    Transcription: "{transcription}"
    
    Basic metrics:
    - Word count: {word_count}
    - Unique word count: {unique_word_count}
    - Speech duration: {speech_duration} seconds
    - Lexical density: {(unique_word_count/word_count)*100:.1f}%
    
    Please assess for:
    1. Vocabulary richness and word finding difficulties
    2. Grammatical structure and complexity
    3. Coherence and topic maintenance
    4. Signs of repetition or perseveration
    5. Fluency and natural speech flow
    
    Provide an overall assessment of what these speech patterns might indicate about brain health, with specific feedback points.
    """
    
    # Get AI assessment
    ai_assessment = await generate_ai_response(SYSTEM_PROMPTS["speech_analysis"], user_prompt)
    
    # Extract feedback from AI response
    lines = ai_assessment.split("\n")
    feedback_points = [line.strip('- ') for line in lines if line.strip().startswith('-') or line.strip().startswith('•')]
    
    # If no bullet points found, create some based on the full text
    if not feedback_points:
        sentences = ai_assessment.split('.')
        feedback_points = [s.strip() for s in sentences[1:5] if s.strip()]
    
    # Ensure we have at least some feedback points
    if not feedback_points or len(feedback_points) < 2:
        feedback_points = [
            "Good use of descriptive language",
            "Clear articulation of thoughts and ideas",
            "Consider expanding vocabulary for more precise expression",
            "Speech pattern shows normal cognitive function"
        ]
    
    # Generate scores based on the analysis (in a real app, these would be calculated more scientifically)
    # Here we're generating scores that are mostly positive but with some variation
    vocabulary_score = random.randint(70, 90)
    coherence_score = random.randint(65, 95)
    fluency_score = random.randint(60, 90)
    overall_score = int((vocabulary_score + coherence_score + fluency_score) / 3)
    
    analysis = {
        "transcription": transcription,
        "scores": {
            "vocabulary": vocabulary_score,
            "coherence": coherence_score,
            "fluency": fluency_score,
            "overall": overall_score
        },
        "assessment": ai_assessment,
        "feedback": feedback_points[:4],  # Limit to top 4 feedback points
        "wordCount": word_count,
        "uniqueWords": unique_word_count,
        "speechDuration": f"{speech_duration} seconds"
    }
    
    return analysis

# Combination endpoint for overall assessment
@app.post("/api/assessment/overall")
async def overall_assessment(data: Dict):
    # This would combine results from games, quizzes, and speech analysis
    # to provide an overall cognitive assessment
    
    # Extract scores from the provided data or use simulated scores
    try:
        memory_score = data.get("memory", {}).get("score", random.randint(65, 95))
        reaction_score = data.get("reaction", {}).get("score", random.randint(65, 95))
        quiz_scores = data.get("quizzes", {})
        speech_score = data.get("speech", {}).get("score", random.randint(65, 95))
        
        # Calculate domain scores (use provided scores or generate reasonable ones)
        cognitive_areas = ["Memory", "Processing Speed", "Language", "Executive Function", "Attention"]
        scores = {
            "Memory": memory_score,
            "Processing Speed": reaction_score,
            "Language": speech_score,
            "Executive Function": quiz_scores.get("reasoning", random.randint(65, 95)),
            "Attention": quiz_scores.get("attention", random.randint(65, 95))
        }
    except:
        # Fallback to simulated scores if data structure is unexpected
        cognitive_areas = ["Memory", "Processing Speed", "Language", "Executive Function", "Attention"]
        scores = {area: random.randint(65, 95) for area in cognitive_areas}
    
    overall_score = sum(scores.values()) / len(scores)
    
    strengths = [area for area, score in scores.items() if score > 80]
    areas_for_improvement = [area for area, score in scores.items() if score < 75]
    
    # Format the assessment data for AI analysis
    user_prompt = f"""
    Please provide a comprehensive cognitive assessment based on these domain scores:
    
    Overall Score: {overall_score:.1f}/100
    
    Domain Scores:
    - Memory: {scores["Memory"]}/100
    - Processing Speed: {scores["Processing Speed"]}/100
    - Language: {scores["Language"]}/100
    - Executive Function: {scores["Executive Function"]}/100
    - Attention: {scores["Attention"]}/100
    
    Identified Strengths: {", ".join(strengths)}
    Areas Needing Improvement: {", ".join(areas_for_improvement)}
    
    Please provide an integrated assessment that considers patterns across these cognitive domains, 
    potential implications for brain health, specific recommendations tailored to the results,
    and any concerning patterns that might warrant professional medical consultation.
    """
    
    # Get AI assessment
    ai_assessment = await generate_ai_response(SYSTEM_PROMPTS["overall_assessment"], user_prompt)
    
    # Extract recommendations from AI response (look for bullet points or the last paragraph)
    recommendations = []
    for line in ai_assessment.split("\n"):
        if line.strip().startswith("-") or line.strip().startswith("•"):
            recommendations.append(line.strip("- •").strip())
    
    # If no bullet points found, use default recommendations
    if not recommendations:
        recommendations = [
            "Continue regular cognitive exercises across all domains",
            "Focus on activities that target your areas for improvement",
            "Maintain a balanced lifestyle with adequate sleep and physical activity",
            "Engage in social activities that challenge your thinking"
        ]
        
        if "Memory" in areas_for_improvement:
            recommendations.append("Practice memory games daily to strengthen recall abilities")
        
        if "Processing Speed" in areas_for_improvement:
            recommendations.append("Regular reaction time games can help improve processing speed")
    
    return {
        "timestamp": datetime.now().isoformat(),
        "overall_score": overall_score,
        "domain_scores": scores,
        "strengths": strengths,
        "areas_for_improvement": areas_for_improvement,
        "assessment": ai_assessment,
        "recommendations": recommendations[:5],  # Limit to 5 recommendations
        "disclaimer": "This assessment is for informational purposes only and is not a medical diagnosis."
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

import React, { useState, useEffect, useRef } from "react";
import './App.css';
import { auth } from './Firebase';
import { gradesData } from './data/gradesData';  // Add this import
import { FaPlay, FaReadme, FaArrowLeft, FaSignOutAlt, FaSpinner, FaCloudDownloadAlt, FaEdit, FaMarkdown, FaEnvelopeOpenText, FaHeadphones, FaYoutube, FaPrint } from 'react-icons/fa';
import Homework from "./Homework";

let searchQuery = '';
let invocationType = '';
let searchModel = 'All';
let userID = '';
let dataLimit = 21;
let youtubeContentInput = '';
let generatedDocID = '';
let ttsGeneratedDocID = '';
let imageGenerationPrompt = '';
let imagePromptsGenerationInput = '';
let promptSuggestion = 'NA';
let autoPromptInput = '';
let youtubePromptInput = '';
let youtubeDescriptionPromptInput = '';
let googleSearchPromptInput = '';
let youtubeSelected = false;
let imageGenerationPromptInput = '';
let promptInput = '';
let fullPromptInput = '';
let autoPromptSeparator = '### all the text from below is strictly for reference and prompt purpose to answer the question asked above this line. ######### '
let questionTrimLength = 200;
let appendPrompt = ' ';
let imagePromptInput = '';
let imageSelected = false;
let homeWorkInput = '';
let quizInput = '';
let quizMultipleChoicesInput = '';
let chunk_size = 4000;
let silence_break = 900;
let YouTubePrompt = '';
let intelligentQuestionsPrompt = '';
let quizPrompt = '';
let practicePrompt = '';
let quizMultipleChoicesPrompt = '';
let adminUser = false;
let quiz_Multiple_Choices_Label = '';
let bedtime_stories_content_input = '';
let story_teller_prompt = '';
let explainInput = '';
let explainPrompt = '';
let lyricsInput = '';
let lyricsPrompt = '';

function App({ user }) {  // Add user prop
  const [selectedGrade, setSelectedGrade] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [generatedContent, setGeneratedContent] = useState('');
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [topicExplanation, setTopicExplanation] = useState('');
  const [isGeneratingImages, setIsGeneratingImages] = useState(false);
  const [isGeneratingYouTubeMusic, setIsGeneratingYouTubeMusic] = useState(false);
  const [isExplain, setIsExplain] = useState(false);
 
  const [uid, setUid] = useState(null);
  const [isGeneratingGeminiSearch, setIsGeneratingGeminiSearch] = useState(false);

  const [temperature, setTemperature] = useState(0.7);
  const temperatureRef = useRef(temperature);
  const [top_p, setTop_p] = useState(0.8);
  const top_pRef = useRef(top_p);
  const [modelAnthropic, setModelAnthropic] = useState('claude');
  const [modelGemini, setModelGemini] = useState('gemini');
  const [modelOpenAI, setModelOpenAI] = useState('gpt-4o');
  const [modelGpto1Mini, setModelGpto1Mini] = useState('o1-mini');
  const [modelo1, setModelo1] = useState('o1');
  const [modelLlama, setModelLlama] = useState('llama');
  const [modelMistral, setModelMistral] = useState('mistral');
  const [modelGpt4oMini, setModelGpt4oMini] = useState('gpt-4o-mini');
  const [modelGeminiSearch, setModelGeminiSearch] = useState('gemini-search');
  const [modelGeminiFlash, setModelGeminiFlash] = useState('gemini-flash');
  const [modelGpt4Turbo, setModelGpt4Turbo] = useState('gpt-4-turbo');
  const [modelImageDallE3, setModelImageDallE3] = useState('dall-e-3');
  const [modelPerplexityFast, setModelPerplexityFast] = useState('perplexity-fast');
  const [modelPerplexity, setModelPerplexity] = useState('perplexity');
  const [modelCodestralApi, setModelCodestralApi] = useState('mistral-codestral-api'); // New state
  const [modelClaudeHaiku, setModelClaudeHaiku] = useState('claude-haiku');
  const [modelSambanova, setModelSambanova] = useState('sambanova');
  const [modelGroq, setModelGroq] = useState('groq');
  const [modelNova, setModelNova] = useState('nova');
  const [ishomeWork, setIshomeWork] = useState(false);
  const [isQuiz, setIsQuiz] = useState(false);
  const [currentDocId, setCurrentDocId] = useState(null);
  // Add new states for Quiz-Multiple Choices
  const [isQuizMultipleChoice, setIsQuizMultipleChoice] = useState(false);

  /* Add new state variables for fetched texts */
const [practiceButtonLabel, setPracticeButtonLabel] = useState('');
 const [quizButtonLabel, setQuizButtonLabel] = useState('');
 
  const handleSignOut = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handlehomeWork = async (message) => {
    if (!message.trim()) {
      alert('Please enter a prompt.');
      return;
    }
    setIshomeWork(true);
    setTemperature(0.4);
    setTop_p(0.5);
    // Need to wait for state updates to be applied
    await new Promise(resolve => setTimeout(resolve, 1000));
    // Append the prompt to promptInput
    homeWorkInput = message + intelligentQuestionsPrompt;
    await callAPI(modelGemini, 'homeWork');
    setIshomeWork(false);
  };

  // Add handler function after handlehomeWork
  const handleExplain = async (message) => {
    promptInput = message;
    console.log('promptInput:', promptInput);
    if (!message.trim()) {
      alert('Please enter content to explain.');
      return;
    }
    setIsExplain(true);
    setTemperature(0.7);
    setTop_p(0.8);
    // Need to wait for state updates to be applied
    await new Promise(resolve => setTimeout(resolve, 500));
    // Append the prompt to promptInput
    explainInput = message + explainPrompt;
    await callAPI(modelGemini, 'explain');
    setIsExplain(false);
  };
  // Add handleQuiz function after handlehomeWork
  const handleQuiz = async (message) => {
    promptInput = message;
    console.log('promptInput:', promptInput);
    if (!message.trim()) {
      alert('Please enter a message.');
      return;
    }
    console.log('handleQuiz:', message);
    setTemperature(0.3);
    setTop_p(0.5);
    setIsQuiz(true);
    // Need to wait for state updates to be applied
    await new Promise(resolve => setTimeout(resolve, 1000));
    // Append the prompt to promptInput
    quizInput = message + quizPrompt;
    await callAPI(modelGemini, 'quiz');
    setIsQuiz(false);
  };

  // Add the handler function for multiple choice quiz
  const handleMultipleChoiceQuiz = async (message) => {
    promptInput = message;
    if (!message.trim()) {
      alert('Please enter a message.');
      return;
    }
    setTemperature(0.3);
    setTop_p(0.5);
    setIsQuizMultipleChoice(true);
    // Append the prompt to promptInput
    await new Promise(resolve => setTimeout(resolve, 1000));
    quizMultipleChoicesInput = message + quizMultipleChoicesPrompt;
    await callAPI(modelGemini, 'quiz_with_choices');
    setIsQuizMultipleChoice(false);
  };
  const callAPI = async (selectedModel, invocationType = 'GenAI') => {
    console.log('Calling API with model:', selectedModel + ' URL: ' + process.env.REACT_APP_GENAI_API_URL, ' promptInput: ', promptInput, ' youtubePromptInput:', youtubePromptInput, '  youtubeDescriptionPromptInput : ', youtubeDescriptionPromptInput);
    console.log('youtube Content Input prompt:', youtubeContentInput);
    console.log('imageGenerationPromptInput :', imageGenerationPromptInput);
    console.log('imagePromptsGenerationInput:', imagePromptsGenerationInput);
    try {
      let response;
      let promptText = promptInput;

      // Determine promptText based on invocation type
      switch (invocationType) {
        case 'homeWork':
          promptText = homeWorkInput;
          break;
        case 'quiz':
          promptText = quizInput;
          break;
        case 'google-search':
          promptText = googleSearchPromptInput;
          break;
        case 'quiz_with_choices':
          promptText = quizMultipleChoicesInput;
          break;
        case 'explain':
          promptText = explainInput;
          break;
        case 'lyrics':
          promptText = lyricsInput;
          break;
      }
      console.log('temp:', temperatureRef.current.valueOf(), 'top_p:', top_pRef.current.valueOf());

      // Single API call with the determined promptText
      response = await fetch(process.env.REACT_APP_GENAI_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          prompt: promptText,
          model: selectedModel,
          uid: uid,
          temperature: temperatureRef.current.valueOf(),
          top_p: top_pRef.current.valueOf(),
          invocationType: invocationType
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert(errorData.error + 'Failed to generate content');
        throw new Error(errorData.error || 'Failed to generate content.');
      }

      let data;
      data = await response.json();
      generatedDocID = data[0].results[0].docID;
      console.log('Generated Doc ID:', generatedDocID, '  invocationType:', invocationType);
      if (['homeWork', 'quiz_with_choices', 'quiz'].includes(invocationType)) {
        setCurrentDocId(data[0].results[0].docID);
        console.log('currenDocID:', currentDocId);
      }
      //console.log('Response:', data);
    } catch (error) {
      console.error('Error generating content:', error);
      alert(`Error: ${error.message}`);
    } finally {
      // click refresh button
      searchQuery = '';
      invocationType = '';
      searchModel = 'All';
      youtubeSelected = false;
      imageSelected = false;
      console.log('Fetching data after generating content');
      if (selectedModel === modelGeminiSearch) {
        setIsGeneratingGeminiSearch(false);
      }
      console.log('isGeneratingGeminiSearch:', isGeneratingGeminiSearch);
    }
  };
  const GradeBox = ({ grade }) => (
    <div className="grade-box">
      <h3>{grade}</h3>
      <div className="subjects-container">
        {Object.keys(gradesData[grade]).map(subject => (
          <button
            key={subject}
            className="subject-button"
            onClick={() => {
              setSelectedGrade(grade); // Add this line to set the selected grade
              setSelectedSubject(subject);
            }}
          >
            {subject}
          </button>
        ))}
      </div>
    </div>
  );

  const SubjectContent = ({ grade, subject }) => {
    // Add defensive check
    if (!grade || !subject || !gradesData[grade] || !gradesData[grade][subject]) {
      return <div>Loading...</div>;
    }

    return (

      <div className="subject-content">
        <button
          className="back-button"
          onClick={() => {
            setSelectedGrade(null);  // Add this line to clear selected grade
            setSelectedSubject(null);
            setGeneratedContent('');
            setSelectedTopic(null);
            setTopicExplanation('');
          }}
        >
          Back to Subjects
        </button>
        <h2>{grade} - {subject}</h2>
        <div className="topics-container">
          {gradesData[grade][subject].map((topic, index) => (
            <div key={index} className="topic-item">
              <span>{topic}</span>
              <br />
              <button
                onClick={() => handleExplain(selectedTopic)}
                className="practiceButton"
                style={{ backgroundColor: 'lightyellow', color: 'black', marginLeft: '10px' }}
              >
                {isExplain
                  ? (<FaSpinner className="spinning" />)
                  : ('Explain with Examples')}
              </button>
              <button
                onClick={() => handlehomeWork(topic)}
                className="practiceButton"
              >
                {ishomeWork
                  ? (<FaSpinner className="spinning" />)
                  : (practiceButtonLabel || 'Practice Questions')}
              </button>
              <button
                onClick={() => handleQuiz(topic)}
                className="practiceButton"
                style={{ backgroundColor: 'lightblue', color: 'black', marginLeft: '10px' }}
              >
                {isQuiz
                  ? (<FaSpinner className="spinning" />)
                  : (quizButtonLabel || 'Trivia/Quiz')}
              </button>
              <button
                onClick={() => handleMultipleChoiceQuiz(topic)}
                className="practiceButton"
                style={{ backgroundColor: 'lightgreen', color: 'black', marginLeft: '10px' }}
              >
                {isQuizMultipleChoice
                  ? (<FaSpinner className="spinning" />)
                  : (quiz_Multiple_Choices_Label || 'Quiz-Choices')}
              </button>
              < br />
              < br />

            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="App">
      <div className="header">
        <h1>School Curriculum by Grade</h1>
        <div className="user-controls">
          {user && (
            <div className="user-info">
              <span>Welcome, {user.email}</span>
              <button className="signoutbutton" onClick={handleSignOut}>
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>

      {selectedSubject ? (
        <SubjectContent grade={selectedGrade} subject={selectedSubject} />
      ) : (
        <div className="grades-container">
          {Object.keys(gradesData).map(grade => (
            <GradeBox key={grade} grade={grade} />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;

import React, { useState, useEffect, useRef } from "react";
import './App.css';
import { auth, db } from './Firebase';
import { collection, doc, where, addDoc, getDocs, getDoc, query, orderBy, startAfter, limit, updateDoc } from 'firebase/firestore';
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
let modelQuiz = 'gemini-search';
let modelQuizChoices = 'gpt-4o';
let modelHomeWork = 'gemini';

function App({ user }) {  // Add user prop
  const [selectedGrade, setSelectedGrade] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [generatedContent, setGeneratedContent] = useState('');
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [topicExplanation, setTopicExplanation] = useState('');
  const [isGeneratingImages, setIsGeneratingImages] = useState(false);
  const [isGeneratingYouTubeMusic, setIsGeneratingYouTubeMusic] = useState(false);
  const [isExplain, setIsExplain] = useState(false);

  const [uid, setUid] = useState(user.uid);
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
  const [modelGeminiImage, setModelGeminiImage] = useState('gemini-image');
  const [modelCerebras, setModelCerebras] = useState('llama-c');
  const [ishomeWork, setIshomeWork] = useState(false);
  const [isQuiz, setIsQuiz] = useState(false);
  const [currentDocId, setCurrentDocId] = useState(null);
  // Add new states for Quiz-Multiple Choices
  const [isQuizMultipleChoice, setIsQuizMultipleChoice] = useState(false);
  const [showMainApp, setShowMainApp] = useState(false);
  const [showhomeWorkApp, setShowhomeWorkApp] = useState(false);
  /* Add new state variables for fetched texts */
  const [practiceButtonLabel, setPracticeButtonLabel] = useState('');
  const [quizButtonLabel, setQuizButtonLabel] = useState('');

  useEffect(() => {
    const initializeApp = async () => {
      await fetchTexts();
    };
    initializeApp();
  }, []);

  const handleSignOut = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };


  const fetchTexts = async () => {
    let q;
    try {
      console.log('Fetching Texts from user collection');
      q = query(collection(db, 'genai', 'bTGBBpeYPmPJonItYpUOCYhdIlr1', 'prompts'), where('tag', '>', ''),
        where('fullText', '>', ''), orderBy('modifiedDateTime', 'asc'));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        //        console.log('fetchTexts Data:', data.tag, '    ', data.fullText);
        switch (data.tag) {
          case 'practice-button-label':
            setPracticeButtonLabel(data.fullText);
            break;
          case 'quiz-button-label':
            setQuizButtonLabel(data.fullText);
            break;
          case 'autoPromptSeparator':
            autoPromptSeparator = data.fullText;
            break;
          case 'quiz_with_choices':
            quizMultipleChoicesPrompt = data.fullText;
            break;
          case 'quiz_Multiple_Choices_Label':
            quiz_Multiple_Choices_Label = data.fullText;
            break;
          case 'bedtime_stories':
            story_teller_prompt = data.fullText;
            break;
          case 'quiz':
            quizPrompt = data.fullText;
            break;
          case 'practice_questions':
            intelligentQuestionsPrompt = data.fullText;
            break;
          case 'explain':
            explainPrompt = data.fullText;
            break;
          case 'modelQuiz':
            modelQuiz = data.fullText;
            break;
          case 'modelQuizChoices':
            modelQuizChoices = data.fullText;
            break;
          case 'modelHomeWork':
            modelHomeWork = data.fullText;
            break;
          default:
            break;
        }
      });
    } catch (error) {
      console.error("Error fetching texts: ", error);
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
    console.log('homeWorkInput: ', homeWorkInput);
    await callAPI(modelHomeWork, promptInput, 'homeWork');
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
    console.log('explainInput:', explainInput);
    await callAPI(promptInput, 'explain');
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
    console.log('quizInput:', quizInput);
    await callAPI(modelQuiz, promptInput, 'quiz');
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
    await fetchTexts();
    // Append the prompt to promptInput
    await new Promise(resolve => setTimeout(resolve, 1000));
    quizMultipleChoicesInput = message + quizMultipleChoicesPrompt;
    console.log('quizMultipleChoicesInput:', quizMultipleChoicesInput);
    await callAPI(modelQuizChoices, promptInput, 'quiz_with_choices');
    setIsQuizMultipleChoice(false);
  };
  const callAPI = async (modelName, promptText, invocationType = 'GenAI') => {
    console.log(' modelName ' + modelName + '   ****** Calling API with URL: ' + process.env.REACT_APP_GENAI_API_URL, ' invocationType: ', invocationType, '  promptText:', promptText);
    try {
      let response;
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
        default:
          break;
      }
      console.log('temp:', temperatureRef.current.valueOf(), 'top_p:', top_pRef.current.valueOf());
      console.log('promptText:', promptText);
      console.log('invocationType:', invocationType);
      console.log('modelGemini:', modelGemini);
      console.log('uid:', uid);
      // Single API call with the determined promptText
      response = await fetch(process.env.REACT_APP_GENAI_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          prompt: promptText,
          model: modelName,
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
        setCurrentDocId(generatedDocID);
        console.log('currenDocID:', currentDocId);
        setShowhomeWorkApp(true);
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


    if (showMainApp) {
      return (
        <App user={user} />
      );
    }

    if (showhomeWorkApp) {  // Add this block
      return (
        <Homework
          user={user}
          onBack={() => setShowhomeWorkApp(false)}
          sourceDocumentID={currentDocId}
        />
      );
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
                onClick={() => handlehomeWork(topic, 'homeWork')}
                className="practiceButton"
                style={{ backgroundColor: 'darkBlue', color: 'white', marginLeft: '10px' }}
              >
                {ishomeWork
                  ? (<FaSpinner className="spinning" />)
                  : 'Practice Questions'}
              </button>
              <button
                onClick={() => handleQuiz(topic, 'quiz')}
                className="practiceButton"
                style={{ backgroundColor: 'lightblue', color: 'black', marginLeft: '10px' }}
              >
                {isQuiz
                  ? (<FaSpinner className="spinning" />)
                  : 'Trivia/Quiz'}
              </button>
              <button
                onClick={() => handleMultipleChoiceQuiz(topic, 'quiz_with_choices')}
                className="practiceButton"
                style={{ backgroundColor: 'lightgreen', color: 'black', marginLeft: '10px' }}
              >
                {isQuizMultipleChoice
                  ? (<FaSpinner className="spinning" />)
                  : 'Quiz-Choices'}
              </button>
              < br />
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
      {selectedSubject ? (
        <SubjectContent grade={selectedGrade} subject={selectedSubject} />
      ) : (
        <div className="grades-container">
          <div className="user-info">
            <span>Welcome, {user.email}</span>
            <button className="signoutbutton" onClick={handleSignOut}>
              Sign Out
            </button>
          </div>
          {Object.keys(gradesData).map(grade => (
            <GradeBox key={grade} grade={grade} />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;

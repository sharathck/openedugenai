import React, { useState, useEffect, useRef } from "react";
import './App.css';
import { auth, db } from './Firebase';
import { collection, doc, where, addDoc, getDocs, getDoc, query, orderBy, startAfter, limit, updateDoc } from 'firebase/firestore';
import { schoolGradesData } from './data/schoolGradesData';  // Add this import
import { collegeData } from './data/collegeData';  // Add this import 
import { automationTestingData } from './data/automationTestingData';
import { mastersData } from './data/mastersData';
import { awsCertificationData } from './data/awsCertificationData';
import { azureCertificationData } from "./data/azureCertificationsData";
import { gcpCertificationData } from "./data/gcpCertificationData";
import { FaPlay, FaReadme, FaArrowLeft, FaSignOutAlt, FaSpinner, FaCloudDownloadAlt, FaEdit, FaMarkdown, FaEnvelopeOpenText, FaHeadphones, FaYoutube, FaPrint } from 'react-icons/fa';
import Homework from "./Homework";
import GenAIApp from './GenAIApp';

let searchQuery = '';
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
let modelExplain = 'gpt-4o';
let advanced_features = 'More options';
let sourceData = '';


function App({ user, source, grade, subject }) {  // Add user prop
  const [selectedGrade, setSelectedGrade] = useState(grade);
  const [invocationType, setInvocationType] = useState('');
  const [selectedSubject, setSelectedSubject] = useState(subject);
  const [generatedContent, setGeneratedContent] = useState('');
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [topicExplanation, setTopicExplanation] = useState('');
  const [uid, setUid] = useState(user.uid);
  const [isGeneratingGeminiSearch, setIsGeneratingGeminiSearch] = useState(false);
  const [temperature, setTemperature] = useState(0.7);
  const temperatureRef = useRef(temperature);
  const [top_p, setTop_p] = useState(0.8);
  const top_pRef = useRef(top_p);
  const [ishomeWork, setIshomeWork] = useState([]);
  const [isExplain, setIsExplain] = useState([]);
  const [isQuiz, setIsQuiz] = useState([]);
  const [currentDocId, setCurrentDocId] = useState([]);
  // Add new states for Quiz-Multiple Choices
  const [isQuizMultipleChoice, setIsQuizMultipleChoice] = useState(false);
  const [showMainApp, setShowMainApp] = useState(false);
  const [showhomeWorkApp, setShowhomeWorkApp] = useState(false);
  /* Add new state variables for fetched texts */
  const [practiceButtonLabel, setPracticeButtonLabel] = useState('');
  const [quizButtonLabel, setQuizButtonLabel] = useState('');
  const [showGenAIApp, setShowGenAIApp] = useState(false);
  const [gradesData, setGradesData] = useState(schoolGradesData);
  useEffect(() => {
    const initializeApp = async () => {
      const params = new URLSearchParams(window.location.search);
      sourceData = 'schoolGradesData';
      if (source) {
        sourceData = source;
        console.log('Source from app parameter:', source);
      }
      if (params.get('source')) {
        sourceData = params.get('source');
        console.log('Source from URL parameter:', sourceData);
      }
      if (sourceData === 'schoolGradesData') {
        console.log('Params:', params.get('source'));
        setGradesData(schoolGradesData);
      }
      if (sourceData === 'collegeData') {
        setGradesData(collegeData);
      }
      if (sourceData === 'automationTestingData') {
        setGradesData(automationTestingData);
      }
      if (sourceData === 'mastersData') {
        setGradesData(mastersData);
      }
      if (sourceData === 'awsCertificationData') {
        setGradesData(awsCertificationData);
      }
      if (sourceData === 'azureCertificationData') {
        setGradesData(azureCertificationData);
      }
      if (sourceData === 'gcpCertificationData') {
        setGradesData(gcpCertificationData);
      }
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
          case 'modelExplain':
            modelExplain = data.fullText;
            break;
          case 'advanced_features':
            advanced_features = data.fullText;
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
    setTemperature(0.4);
    setTop_p(0.5);
    // Need to wait for state updates to be applied
    await new Promise(resolve => setTimeout(resolve, 1000));
    // Append the prompt to promptInput
    homeWorkInput = message + intelligentQuestionsPrompt;
    console.log('homeWorkInput: ', homeWorkInput);
    await callAPI(modelHomeWork, promptInput, 'homeWork');
  };

  // Add handler function after handlehomeWork
  const handleExplain = async (message) => {
    promptInput = message;
    console.log('promptInput:', promptInput);
    if (!message.trim()) {
      alert('Please enter content to explain.');
      return;
    }
    setTemperature(0.7);
    setTop_p(0.8);
    // Need to wait for state updates to be applied
    await new Promise(resolve => setTimeout(resolve, 500));
    // Append the prompt to promptInput
    explainInput = message + explainPrompt;
    console.log('explainInput:', explainInput);
    await callAPI(modelExplain, promptInput, 'explain');
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
    // Need to wait for state updates to be applied
    await new Promise(resolve => setTimeout(resolve, 1000));
    // Append the prompt to promptInput
    quizInput = message + quizPrompt;
    console.log('quizInput:', quizInput);
    await callAPI(modelQuiz, promptInput, 'quiz');
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
    await fetchTexts();
    // Append the prompt to promptInput
    await new Promise(resolve => setTimeout(resolve, 1000));
    quizMultipleChoicesInput = message + quizMultipleChoicesPrompt;
    console.log('quizMultipleChoicesInput:', quizMultipleChoicesInput);
    await callAPI(modelQuizChoices, promptInput, 'quiz_with_choices');
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
      setInvocationType(invocationType);
      setCurrentDocId(generatedDocID);
      console.log('currenDocID:', currentDocId);
      setShowhomeWorkApp(true);
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

  if (showGenAIApp) {
    console.log('calling GenAI App showGenAIApp:', showGenAIApp, ' grade ', selectedGrade, 'subject ', selectedSubject);
    console.log('  source ', sourceData);
    return <GenAIApp
      user={user}
      source={sourceData}
      grade={selectedGrade}
      subject={selectedSubject}
    />;
  }

  const SubjectContent = ({ grade, subject }) => {
    // Add defensive check
    if (!grade || !subject || !gradesData[grade] || !gradesData[grade][subject]) {
      return <div>Loading...</div>;
    }
    if (showhomeWorkApp) {  // Add this block
      return (
        <Homework
          user={user}
          onBack={() => setShowhomeWorkApp(false)}
          sourceDocumentID={currentDocId}
          invocationType={invocationType}
          source={sourceData}
          grade={selectedGrade}
          subject={selectedSubject}
        />
      );
    }
    return (
      <div className="subject-content">
        <button className="subject-button"
          onClick={() => {
            setSelectedGrade(null);
            setSelectedSubject(null);
            setGeneratedContent('');
            setSelectedTopic(null);
            setTopicExplanation('');
          }}
        >
          Previous Page
        </button>
        &nbsp;
        <button className="signupbutton" onClick={() => setShowGenAIApp(true)}>
          More options
        </button>
        <h2> <span style={{ color: 'darkBlue' }}>{grade}</span> - <span style={{ color: 'darkGreen' }}>{subject}</span></h2>
        <div className="topics-container">
          {gradesData[grade][subject].map((topic, index) => (
            <div key={index} className="topic-item">
              <span>{topic}</span>
              &nbsp;&nbsp;
              <button
                onClick={async () => {
                  setIsExplain(prev => ({ ...prev, [index]: true }));
                  await handleExplain(grade + ' : ' + subject + ' : ' + topic);
                  setIsExplain(prev => ({ ...prev, [index]: false }));
                }}
                className="button"
                style={{ backgroundColor: '#90EE90', fontSize: '12px', color: 'black', marginLeft: '10px' }}
              >
                {isExplain[index]
                  ? (<FaSpinner className="spinning" />)
                  : 'Explain'}
              </button>
              <button
                onClick={async () => {
                  setIshomeWork(prev => ({ ...prev, [index]: true }));
                  await handlehomeWork(grade + ' : ' + subject + ' : ' + topic, 'homeWork');
                  setIshomeWork(prev => ({ ...prev, [index]: false }));
                }}
                className="button"
                style={{ backgroundColor: 'darkBlue', fontSize: '12px', color: 'white', marginLeft: '10px' }}
              >
                {ishomeWork[index]
                  ? (<FaSpinner className="spinning" />)
                  : 'Practice Questions'}
              </button>
              <button
                onClick={async () => {
                  setIsQuiz(prev => ({ ...prev, [index]: true }));
                  await handleQuiz(grade + ' : ' + subject + ' : ' + topic, 'quiz');
                  setIsQuiz(prev => ({ ...prev, [index]: false }));
                }}
                className="button"
                style={{ backgroundColor: 'lightblue', fontSize: '12px', color: 'black', marginLeft: '10px' }}
              >
                {isQuiz[index]
                  ? (<FaSpinner className="spinning" />)
                  : 'Quiz'}
              </button>
              <br />
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
        <div>
                    <select
            className="data-source-select"
            onChange={(e) => {
              const source = e.target.value;
              switch (source) {
                case 'schoolGradesData':
                  setGradesData(schoolGradesData);
                  sourceData = 'schoolGradesData';
                  break;
                case 'collegeData':
                  setGradesData(collegeData);
                  sourceData = 'collegeData';
                  break;
                case 'automationTestingData':
                  setGradesData(automationTestingData);
                  sourceData = 'automationTestingData';
                  break;
                case 'mastersData':
                  setGradesData(mastersData);
                  sourceData = 'mastersData';
                  break;
                case 'awsCertificationData':
                  setGradesData(awsCertificationData);
                  sourceData = 'awsCertificationData';
                  break;
                case 'azureCertificationData':
                  setGradesData(azureCertificationData);
                  sourceData = 'azureCertificationData';
                  break;
                case 'gcpCertificationData':
                  setGradesData(gcpCertificationData);
                  sourceData = 'gcpCertificationData';
                  break;
                default:
                  setGradesData(schoolGradesData);
                  sourceData = 'schoolGradesData';
              }
            }}
          >
            <option value="">Select Category</option>
            <option value="schoolGradesData">School Grades</option>
            <option value="collegeData">Bachelors</option>
            <option value="mastersData">Masters</option>
            <option value="awsCertificationData">AWS Certifications</option>
            <option value="azureCertificationData">Azure Certifications</option>
            <option value="gcpCertificationData">GCP Certifications</option>
            <option value="automationTestingData">Automation Testing</option>
          </select>
          <button className="signupbutton" onClick={() => setShowGenAIApp(true)}>
          More options
          </button>
          &nbsp;&nbsp;&nbsp;
          <button className="signoutbutton" onClick={handleSignOut}>
             <FaSignOutAlt />
          </button>
          <div className="grades-container">
            {Object.keys(gradesData).map(grade => (
              <GradeBox key={grade} grade={grade} />
            ))}
          </div>
        </div>
      )}
    </div>
  );

}

export default App;

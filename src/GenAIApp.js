import React, { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import * as speechsdk from 'microsoft-cognitiveservices-speech-sdk';
import { FaPlay, FaReadme, FaArrowLeft, FaSignOutAlt, FaSpinner, FaCloudDownloadAlt, FaEdit, FaMarkdown, FaEnvelopeOpenText, FaHeadphones, FaYoutube, FaPrint } from 'react-icons/fa';
import './GenAIApp.css';
import { collection, doc, where, addDoc, getDocs, getDoc, query, orderBy, startAfter, limit, updateDoc } from 'firebase/firestore';
import {
    onAuthStateChanged,
    signOut,
} from 'firebase/auth';
import App from './App';
import { auth, db } from './Firebase';
import VoiceSelect from './VoiceSelect';
import Homework from "./Homework";
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';

const speechKey = process.env.REACT_APP_AZURE_SPEECH_API_KEY;
const serviceRegion = 'eastus';
const isiPhone = /iPhone/i.test(navigator.userAgent);
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
let fullPromptInput = '';
let autoPromptSeparator = '### all the text from below is strictly for reference and prompt purpose to answer the question asked above this line. ######### '
let questionTrimLength = 200;
let imagePromptInput = '';
let homeWorkInput = '';
let quizInput = '';
let quizMultipleChoicesInput = '';
let chunk_size = 4000;
let silence_break = 900;
let intelligentQuestionsPrompt = '';
let quizPrompt = '';
let quizMultipleChoicesPrompt = '';
let adminUser = false;
let quiz_Multiple_Choices_Label = '';
let bedtime_stories_content_input = '';
let explainInput = '';
let explainPrompt = '';
let lyricsInput = '';
let modelQuiz = 'gemini-search';
let modelQuizChoices = 'gpt-4o';
let modelHomeWork = 'gemini';
let modelExplain = 'gpt-4o';

const GenAIApp = ({ user, source, grade, subject }) => {
    // **State Variables**
    const [isGeneratingTTS, setIsGeneratingTTS] = useState(false);
    const [isExplain, setIsExplain] = useState(false);
    const [isLyrics, setIsLyrics] = useState(false);
    const [fetchFromPublic, setFetchFromPublic] = useState(false);
    const [showDedicatedDownloadButton, setShowDedicatedDownloadButton] = useState(false);
    const [showBigQueryModelSearch, setShowBigQueryModelSearch] = useState(false);
    const [showDownloadTextButton, setShowDownloadTextButton] = useState(false);
    const [genOpenAIImage, setGenOpenAIImage] = useState(true);
    const [genaiData, setGenaiData] = useState([]);
    const [isDownloading, setIsDownloading] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [lastVisible, setLastVisible] = useState(null); // State for the last visible document
    const [language, setLanguage] = useState("en");
    const [isLiveAudioPlayingPrompt, setIsLiveAudioPlayingPrompt] = useState(false);
    const [goBack, setGoBack] = useState(false);

    // Authentication state
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [uid, setUid] = useState(null);
    const [promptInput, setPromptInput] = useState('');
    const [voiceName, setVoiceName] = useState('en-US-EvelynMultilingualNeural');
    const [genaiPrompts, setGenaiPrompts] = useState([]);
    const [showEditPopup, setShowEditPopup] = useState(false);
    const [editPromptTag, setEditPromptTag] = useState('');
    const [editPromptFullText, setEditPromptFullText] = useState('');
    const [generatedResponse, setGeneratedResponse] = useState(null);
    const [selectedPrompt, setSelectedPrompt] = useState(null);
    const [selectedPromptFullText, setSelectedPromptFullText] = useState(null);
    const [showMainApp, setShowMainApp] = useState(false);
    const [GenAIParameter, setGenAIParameter] = useState(false);
    const [temperature, setTemperature] = useState(0.7);
    const temperatureRef = useRef(temperature);
    const [top_p, setTop_p] = useState(0.8);
    const top_pRef = useRef(top_p);
    const [autoPromptLimit, setAutoPromptLimit] = useState(1);
    const [autoPrompt, setAutoPrompt] = useState(false);
    const mdParser = new MarkdownIt(/* Markdown-it options */);
    const [ishomeWork, setIshomeWork] = useState(false);
    const [isQuiz, setIsQuiz] = useState(false);
    const [showhomeWorkButton, setShowhomeWorkButton] = useState(true);

    // Add state variable for AI Search
    const [isAISearch, setIsAISearch] = useState(false);
    const [showAISearchButton, setShowAISearchButton] = useState(false); // or set based on configuration
    // Add these state variables near other state declarations
    const [isLiveAudioPlaying, setIsLiveAudioPlaying] = useState({});
    const [isGeneratingDownloadableAudio, setIsGeneratingDownloadableAudio] = useState({});
    // Add new state variable for YouTube audio title button
    const [showhomeWorkApp, setShowhomeWorkApp] = useState(false);
    const [currentDocId, setCurrentDocId] = useState(null);
    const currentDocIdRef = useRef(currentDocId);

    // Add new state variables after other state variables
    const [showGenAIButton, setShowGenAIButton] = useState(false);
    const [showPromptsDropDown, setShowPromptsDropDown] = useState(false);
    const [showVoiceSelect, setShowVoiceSelect] = useState(false);
    const [showEditPromptButton, setShowEditPromptButton] = useState(false);
    const [showPromptsDropDownAfterSearch, setShowPromptsDropDownAfterSearch] = useState(false);
    const [showBackToAppButton, setShowBackToAppButton] = useState(false);
    // Add new states for Quiz-Multiple Choices
    const [isQuizMultipleChoice, setIsQuizMultipleChoice] = useState(false);
    const [showQuizMultipleChoiceButton, setShowQuizMultipleChoiceButton] = useState(true);

    /* Add new state variables for fetched texts */
    const [practiceButtonLabel, setPracticeButtonLabel] = useState('');
    const [noteText, setNoteText] = useState('');
    const [placeholderText, setPlaceholderText] = useState('');
    const [semanticSearchPlaceholder, setSemanticSearchPlaceholder] = useState('');
    const [keywordSearchPlaceholder, setKeywordSearchPlaceholder] = useState('');
    const [practicePageButtonLabel, setPracticePageButtonLabel] = useState('');
    const [quizButtonLabel, setQuizButtonLabel] = useState('');
    const [speechRate, setSpeechRate] = useState('0%');
    const [speechSilence, setSpeechSilence] = useState(200);
    const [youtubeSpeecRate, setYoutubeSpeechRate] = useState('0%');
    const [youtubeSpeechSilence, setYoutubeSpeechSilence] = useState(200);
    const [storyTellingSpeechRate, setStoryTellingSpeechRate] = useState('-25%');
    const [storyTellingSpeechSilence, setStoryTellingSpeechSilence] = useState(1200);

    // Add refs for speech variables
    const speechRateRef = useRef(speechRate);
    const speechSilenceRef = useRef(speechSilence);
    const youtubeSpeecRateRef = useRef(youtubeSpeecRate);
    const youtubeSpeechSilenceRef = useRef(youtubeSpeechSilence);
    const storyTellingSpeechRateRef = useRef(storyTellingSpeechRate);
    const storyTellingSpeechSilenceRef = useRef(storyTellingSpeechSilence);
    const promptInputRef = useRef(promptInput);

    // Update refs when state changes
    useEffect(() => {
        youtubeSpeecRateRef.current = youtubeSpeecRate;
        youtubeSpeechSilenceRef.current = youtubeSpeechSilence;
        storyTellingSpeechRateRef.current = storyTellingSpeechRate;
        storyTellingSpeechSilenceRef.current = storyTellingSpeechSilence;
        speechRateRef.current = speechRate;
        speechSilenceRef.current = speechSilence;
        promptInputRef.current = promptInput;
        currentDocIdRef.current = currentDocId;
    }, [youtubeSpeecRate, youtubeSpeechSilence, storyTellingSpeechRate, storyTellingSpeechSilence, speechRate, speechSilence, promptInput, currentDocId]);

    // Add new show state variables
    const [showPrint, setShowPrint] = useState(false);
    const [modelCerebras, setModelCerebras] = useState('llama-c');

    useEffect(() => {
        temperatureRef.current = temperature;
        top_pRef.current = top_p;
    }, [temperature, top_p,]);

    const embedPrompt = async (docId) => {
        try {
            console.log('Embedding prompt:', docId);
            const response = await fetch(`${process.env.REACT_APP_GENAI_API_URL}embed-prompt`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ doc_id: docId, uid: uid })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to embed prompt.');
            }
            const data = await response.json();
            console.log('Embed Prompt Response:', data);
        } catch (error) {
            console.error('Error embedding prompt:', error);
            alert(`Error: ${error.message}`);
        }
    };

    // Helper function to get URL parameters
    const getUrlParameter = (name) => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        return urlParams.get(name);
    };

    const questionLimit = getUrlParameter('question_limit');
    const telugu = getUrlParameter('telugu');
    const hindi = getUrlParameter('hindi');

    // Helper function to truncate questions based on limit
    const getQuestionSubstring = (question) => {
        const marker = '###';
        // if question is undefined or null, return an empty string
        if (!question) {
            return '';
        }
        // if length of the question is less than the limit, return the question
        if (question.length <= questionTrimLength) {
            return question;
        }
        const markerIndex = question.indexOf(marker);
        if (markerIndex !== -1) {
            return question.substring(0, Math.min(markerIndex, questionTrimLength));
        }
        else {
            return question.substring(0, questionTrimLength);
        }
    };

    // Listen for authentication state changes
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                userID = currentUser.uid;
                console.log('User is signed in:', currentUser.uid);
                const urlParams = new URLSearchParams(window.location.search);
                const genaiParam = urlParams.get('genai');
                if (genaiParam) {
                    setGenAIParameter(true);
                }
                if (process.env.REACT_APP_MAIN_APP === 'GenAI') {
                    setGenAIParameter(true);
                }
                setUid(currentUser.uid);
                setEmail(currentUser.email);
                console.log('User is signed in:', currentUser.uid);

                // Fetch data for the authenticated user
                fetchData(currentUser.uid);
                fetchPrompts(currentUser.uid);
                await checkAdminUsers();
                await fetchGenAIParameters(currentUser.uid);
                await fetchTexts();
                // Set visibility of back button based on admin status
                setShowBackToAppButton(adminUser);
                console.log('INSIDE login grade ', grade, ' subject ', subject);
            }
            else {
                console.log('No user is signed in');
            }
        });
        return () => unsubscribe();
    }, [showEditPopup]);

    const checkAdminUsers = async () => {
        console.log('Fetching genai parameters...');
        const configurationCollection = collection(db, 'public');
        const q = query(configurationCollection, where('setup', '==', 'genaiAdmin'));
        const adminSnapshot = await getDocs(q);
        const adminEmails = [];
        adminSnapshot.docs.forEach(doc => {
            const data = doc.data();
            if (data.emailAddresses && Array.isArray(data.emailAddresses)) {
                adminEmails.push(...data.emailAddresses);
            }
        });
        if (adminEmails.includes(auth.currentUser.email)) {
            console.log('Admin user:', auth.currentUser.email);
            adminUser = true;
        } else {
            console.log('Not an admin user:', auth.currentUser.email);
            adminUser = false;
        }
    }
    const fetchGenAIParameters = async (firebaseUserID) => {
        try {
            if (!firebaseUserID) {
                console.error('No user ID provided');
                return;
            }
            let q = '';
            if (adminUser) {
                console.log('Fetching global genai parameters...');
                const configurationCollection = collection(db, 'public');
                q = query(configurationCollection, where('setup', '==', 'genaiAdmin'));
            }
            else {
                console.log('Fetching user specific genai parameters...');
                const configurationCollection = collection(db, 'genai', firebaseUserID, 'configuration');
                q = query(configurationCollection, where('setup', '==', 'genai'));
            }
            const configurationSnapshot = await getDocs(q);
            configurationSnapshot.forEach(doc => {
                const data = doc.data();
                console.log('Fully Array Data:', data);
                console.log('Data:', data.temperature, data.top_p);
                console.log('showGemini:', data.showGemini);
                console.log('showOpenAI:', data.showOpenAI);
                console.log('showGpt4Turbo:', data.showGpt4Turbo);
                if (data.temperature !== undefined) {
                    setTemperature(data.temperature);
                }
                if (data.top_p !== undefined) {
                    setTop_p(data.top_p);
                }
                if (data.autoPrompt !== undefined) {
                    setAutoPrompt(data.autoPrompt);
                }
                if (data.autoPromptLimit !== undefined) {
                    setAutoPromptLimit(data.autoPromptLimit);
                }
                if (data.dataLimit !== undefined) {
                    dataLimit = data.dataLimit;
                }
                if (data.showhomeWorkButton !== undefined) {
                    setShowhomeWorkButton(data.showhomeWorkButton);
                }
                if (data.voiceName !== undefined) {
                    setVoiceName(data.voiceName);
                }
                if (data.chunk_size !== undefined) {
                    chunk_size = data.chunk_size;
                }
                if (data.silence_break !== undefined) {
                    silence_break = data.silence_break;
                }
                if (data.showAISearchButton !== undefined) {
                    setShowAISearchButton(data.showAISearchButton);
                }
                if (data.showGenAIButton !== undefined) {
                    setShowGenAIButton(data.showGenAIButton);
                }
                if (data.showPromptsDropDown !== undefined) {
                    setShowPromptsDropDown(data.showPromptsDropDown);
                }
                if (data.showVoiceSelect !== undefined) {
                    setShowVoiceSelect(data.showVoiceSelect);
                }
                if (data.showEditPromptButton !== undefined) {
                    setShowEditPromptButton(data.showEditPromptButton);
                }
                if (data.showPromptsDropDownAfterSearch !== undefined) {
                    setShowPromptsDropDownAfterSearch(data.showPromptsDropDownAfterSearch);
                }
                if (data.showBackToAppButton !== undefined) {
                    setShowBackToAppButton(data.showBackToAppButton);
               }
                if (data.showPrint !== undefined) {
                    setShowPrint(data.showPrint);
                }
             if (data.showDedicatedDownloadButton !== undefined) {
                    setShowDedicatedDownloadButton(data.showDedicatedDownloadButton);
                }
                if (data.genOpenAIImage !== undefined) {
                    setGenOpenAIImage(data.genOpenAIImage);
                }
                if (data.speechRate !== undefined) {
                    setSpeechRate(data.speechRate);
                }
                if (data.speechSilence !== undefined) {
                    setSpeechSilence(data.speechSilence);
                }
                if (data.youtubeSpeechRate !== undefined) {
                    setYoutubeSpeechRate(data.youtubeSpeechRate);
                }
                if (data.youtubeSpeechSilence !== undefined) {
                    setYoutubeSpeechSilence(data.youtubeSpeechSilence);
                }
                if (data.storyTellingSpeechRate !== undefined) {
                    setStoryTellingSpeechRate(data.storyTellingSpeechRate);
                }
                if (data.storyTellingSpeechSilence !== undefined) {
                    setStoryTellingSpeechSilence(data.storyTellingSpeechSilence);
                }
                if (data.showDownloadTextButton !== undefined) {
                    setShowDownloadTextButton(data.showDownloadTextButton);
                }
                if (data.showBigQueryModelSearch !== undefined) {
                    setShowBigQueryModelSearch(data.showBigQueryModelSearch);
                }
                if (data.fetchFromPublic !== undefined) {
                    setFetchFromPublic(data.fetchFromPublic);
                }
            });
        } catch (error) {
            console.error("Error fetching genAI parameters: ", error);
            return [];
        }
    };
    // Fetch prompts from Firestore
    const fetchPrompts = async (userID) => {
        try {
            const genaiCollection = collection(db, 'genai', userID, 'prompts');
            const q = query(genaiCollection, limit(1000), orderBy('modifiedDateTime', 'desc'));
            const genaiSnapshot = await getDocs(q);
            const genaiList = genaiSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setGenaiPrompts(genaiList);
        } catch (error) {
            console.error("Error fetching prompts: ", error);
        }
    };

    // Function to fetch data from Firestore
    const fetchData = async (userID) => {
        try {
            const genaiCollection = collection(db, 'genai', userID, 'MyGenAI');
            let q;
            q = query(genaiCollection, orderBy('createdDateTime', 'desc'), limit(dataLimit));
            if (hindi) {
                q = query(genaiCollection, orderBy('createdDateTime', 'desc'), where('language', '==', 'Hindi'), limit(dataLimit));
            }
            if (telugu) {
                q = query(genaiCollection, orderBy('createdDateTime', 'desc'), where('language', '==', 'Telugu'), limit(dataLimit));
            }
            const genaiSnapshot = await getDocs(q);
            const genaiList = genaiSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            const showFullQuestionState = {};
            genaiList.forEach(doc => {
                showFullQuestionState[doc.id] = false;
            });
            setShowFullQuestion(showFullQuestionState);
            setGenaiData(genaiList);
            setLastVisible(genaiSnapshot.docs[genaiSnapshot.docs.length - 1]); // Set last visible document
        } catch (error) {
            console.error("Error fetching data: ", error);
        }
    };

    // Handlers for input changes
    const handleLimitChange = (event) => {
        dataLimit = parseInt(event.target.value);
        bigQueryResults();
    };

    const handleSearchChange = (event) => {
        searchQuery = event.target.value;
        bigQueryResults();
    };

    const handleInvocationChange = (event) => {
        invocationType = event.target.value;
        bigQueryResults();
    };

    const handleVectorSearchChange = (event) => {
        searchQuery = event.target.value;
        vectorSearchResults();
    };

    const [showFullQuestion, setShowFullQuestion] = useState({});

    // Helper function to split messages into chunks
    const splitMessage = (msg, chunkSize = 100) => {
        const chunks = [];
        let currentPos = 0;
        while (currentPos < msg.length) {
            let chunk = msg.substr(currentPos, chunkSize);
            let splitPos = chunkSize;
            
            // If we're not at the end, look for last period
            if (currentPos + chunkSize < msg.length) {
                const lastPeriod = chunk.lastIndexOf('.');
                if (lastPeriod !== -1) {
                    splitPos = lastPeriod + 1; // Include the period
                }
                else {
                    const lastComma = chunk.lastIndexOf(',');
                    if (lastComma !== -1) {
                        splitPos = lastComma + 1; // Include the comma
                    } 
                    else {
                        const lastSpace = chunk.lastIndexOf(' ');
                        if (lastSpace !== -1) {
                            splitPos = lastSpace + 1; // Include the space
                        }
                    }
                }
            }
        
            chunk = chunk.substr(0, splitPos);
            chunks.push(chunk.trim());
            currentPos += splitPos;
        }
        
        return chunks;
    };

    // Function to synthesize speech
    const [isPaused, setIsPaused] = useState(false);
    const synthesizeSpeech = async (articles, language) => {
        // Clean the text by removing URLs and special characters
        const cleanedArticles = articles
            .replace(/https?:\/\/[^\s]+/g, '') // Remove URLs
            .replace(/http?:\/\/[^\s]+/g, '') // Remove URLs
            .replace(/[#:\-*]/g, ' ')
            .replace(/[&]/g, ' and ')
            .replace(/[<>]/g, ' ')
            //       .replace(/["]/g, '&quot;')
            //       .replace(/[']/g, '&apos;')
            .trim(); // Remove leading/trailing spaces

        try {
            try {
                console.log('Synthesizing speech...' + cleanedArticles);
                const speechConfig = speechsdk.SpeechConfig.fromSubscription(speechKey, serviceRegion);
                speechConfig.speechSynthesisVoiceName = voiceName;
                if (language === "Spanish") {
                    speechConfig.speechSynthesisVoiceName = "es-MX-DaliaNeural";
                }
                if (language === "Hindi") {
                    speechConfig.speechSynthesisVoiceName = "hi-IN-SwaraNeural";
                }
                if (language === "Telugu") {
                    speechConfig.speechSynthesisVoiceName = "te-IN-ShrutiNeural";
                }

                const audioConfig = speechsdk.AudioConfig.fromDefaultSpeakerOutput();
                const synthesizer = new speechsdk.SpeechSynthesizer(speechConfig, audioConfig);

                // Store synthesizer reference for pause/resume
                window.currentSynthesizer = synthesizer;

                const chunks = splitMessage(cleanedArticles);
                for (const chunk of chunks) {
                    if (isPaused) {
                        // Wait until unpaused
                        await new Promise(resolve => {
                            const checkPause = setInterval(() => {
                                if (!isPaused) {
                                    clearInterval(checkPause);
                                    resolve();
                                }
                            }, 100);
                        });
                    }

                    await new Promise((resolve, reject) => {
                        if (window.currentSynthesizer) {
                            window.currentSynthesizer.speakTextAsync(chunk, result => {
                                if (result.reason === speechsdk.ResultReason.SynthesizingAudioCompleted) {
                                    console.log(`Speech synthesized to speaker for text: [${chunk}]`);
                                    resolve();
                                } else if (result.reason === speechsdk.ResultReason.Canceled) {
                                    const cancellationDetails = speechsdk.SpeechSynthesisCancellationDetails.fromResult(result);
                                    if (cancellationDetails.reason === speechsdk.CancellationReason.Error) {
                                        console.error(`Error details: ${cancellationDetails.errorDetails}`);
                                    }
                                    reject();
                                }
                            }, error => {
                                console.error(`Error synthesizing speech: ${error}`);
                                reject(error);
                            });
                        }
                    });
                    //forecefully wait 5 seconds
                    // get number by multiplying 50 with chunk length
                    let waitLength = 50 * chunk.length;
                    await new Promise(resolve => setTimeout(resolve, waitLength));
                }

                // Cleanup synthesizer reference
                window.currentSynthesizer = null;

            } catch (error) {
                console.error(`Error synthesizing speech: ${error}`);
            } finally {
                setIsLiveAudioPlaying(false);
            }
        }
        catch (error) {
            console.error(`Error synthesizing speech: ${error}`);
        }
        finally {
            setIsLiveAudioPlaying(false);
        }
    };

    const handlePause = () => {
        setIsPaused(true);
        // Also set state to indicate live TTS streaming is paused
        setIsLiveAudioPlayingPrompt(false);
    };

    const handleResume = () => {
         setIsPaused(false);
    };

    // Function to fetch more data for pagination
    const fetchMoreData = async () => {
        try {
            // get auth user
            const user = auth.currentUser;
            if (!user) {
                console.error("No user is signed in");
                return;
            }
            else {
                console.log('User is signed in:', user.uid);
                const genaiCollection = collection(db, 'genai', user.uid, 'MyGenAI');
                let nextQuery;
                nextQuery = query(genaiCollection, orderBy('createdDateTime', 'desc'), startAfter(lastVisible), limit(dataLimit));
                if (hindi) {
                    nextQuery = query(genaiCollection, orderBy('createdDateTime', 'desc'), where('language', '==', 'Hindi'), startAfter(lastVisible), limit(dataLimit));
                }
                if (telugu) {
                    nextQuery = query(genaiCollection, orderBy('createdDateTime', 'desc'), where('language', '==', 'Telugu'), startAfter(lastVisible), limit(dataLimit));
                }

                const genaiSnapshot = await getDocs(nextQuery);
                const genaiList = genaiSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setGenaiData(prevData => [...prevData, ...genaiList]);
                setLastVisible(genaiSnapshot.docs[genaiSnapshot.docs.length - 1]); // Update last visible document
            }
        } catch (error) {
            console.error("Error fetching more data: ", error);
        }
    };

    const updateConfiguration = async () => {

        try {
            const configurationCollection = collection(db, 'genai', user.uid, 'configuration');
            const q = query(configurationCollection, where('setup', '==', 'genai'));
            const configSnapshot = await getDocs(q);
            if (configSnapshot.empty) {
                console.log('No configuration found, adding new document');
                // addDoc
                await addDoc(configurationCollection, {
                    setup: 'genai',
                    temperature,
                    top_p,
                    dataLimit,
                    autoPrompt,
                    lastUpdated: new Date(),
                    autoPromptLimit,
                    voiceName,
                    chunk_size,
                    silence_break,
                });
                return;
            }
            else {
                configSnapshot.forEach(async (doc) => {
                    await updateDoc(doc.ref, {
                        temperature,
                        top_p,
                        dataLimit,
                        autoPrompt,
                        lastUpdated: new Date(),
                        autoPromptLimit,
                        voiceName,
                        chunk_size,
                        silence_break,
                    }, { merge: true });
                });
            }

        } catch (error) {
            console.error('Error updating configuration:', error);
        }
    };

    const callAPI = async (selectedModel, invocationType = 'GenAI') => {
        console.log('Calling API with model:', selectedModel + ' URL: ' + process.env.REACT_APP_GENAI_API_URL, ' youtubeSelected: ', youtubeSelected, ' youtubePromptInput:', youtubePromptInput, '  youtubeDescriptionPromptInput : ', youtubeDescriptionPromptInput);
        console.log('youtube Content Input prompt:', youtubeContentInput);
        console.log('imageGenerationPromptInput :', imageGenerationPromptInput);
        console.log('imagePromptsGenerationInput:', imagePromptsGenerationInput);
        try {
            let response;
            let promptText = promptInput;

            // Determine promptText based on invocation type
            switch (invocationType) {
                case 'imageGeneration':
                    promptText = imagePromptsGenerationInput;
                    break;
                case 'image_ai_agent':
                    promptText = imageGenerationPromptInput;
                    break;
                case 'image':
                    promptText = promptInput;
                    break;
                case 'youtube':
                    promptText = youtubeContentInput;
                    break;
                case 'youtubeTitle':
                    promptText = youtubePromptInput;
                    break;
                case 'youtubeDescription':
                    promptText = youtubeDescriptionPromptInput;
                    break;
                case 'imagesSearchWords':
                    promptText = imagePromptInput;
                    break;
                case 'bedtime_stories':
                    promptText = bedtime_stories_content_input;
                    break;
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
                default:
                    promptText = promptInput + autoPromptSeparator + fullPromptInput;
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
            setIsAISearch(false);
            console.log('Fetching data after generating content');
            fetchData(userID);
        }
    };

    // Function to call the TTS API
    const callTTSAPI = async (message, apiUrl) => {

        setIsGeneratingTTS(true); // Set generating state to true
        const cleanedArticles = message
            .replace(/https?:\/\/[^\s]+/g, '')
            .replace(/http?:\/\/[^\s]+/g, '')
            .replace(/[#:\-*]/g, ' ')
            .replace(/[&]/g, ' and ')
            .replace('```json', '')
            .replace(/[<>]/g, ' ')
            //       .replace(/["]/g, '&quot;')
            //       .replace(/[']/g, '&apos;')
            .trim();
        console.log('Calling TTS API with message:', cleanedArticles, ' voiceName:', voiceName);
        console.log('speechSilence:', speechSilenceRef.current.valueOf(), 'speechRate:', speechRateRef.current.valueOf());
        console.log('API URL:', apiUrl);
        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    message: cleanedArticles,
                    uid: uid,
                    source: 'ai',
                    voice_name: voiceName,
                    chunk_size: chunk_size,
                    silence_break: speechSilenceRef.current.valueOf(),
                    prosody_rate: speechRateRef.current.valueOf()
                })
            });

            if (!response.ok) {
                throw new Error([`Network response was not ok: ${response.statusText}`]);
            }
            let data;
            // Try to get docID with retry logic
            let retries = 12;
            while (retries > 0) {
                data = await response.json();
                if (data[0]?.docID) {
                    // docID exists
                    break;
                }
                // Wait 2 seconds before retrying
                await new Promise(resolve => setTimeout(resolve, 2000));
                retries--;
                if (retries === 0) {
                    throw new Error('Failed to get document ID after multiple retries');
                }
            }
            ttsGeneratedDocID = data[0].docID;
        } catch (error) {
            console.error('Error calling TTS API:', error);
            alert([`Error: ${error.message}`]);
        } finally {
            setIsGeneratingTTS(false); // Reset generating state
            // Optionally, refresh data
            fetchData(uid);
            updateConfiguration();
        }
    };

    const handleModelChange = (modelValue) => {
        searchModel = modelValue;
        bigQueryResults();
    }

    const vectorSearchResults = async () => {
        setIsLoading(true);
        console.log("Fetching data for Vector search query:", searchQuery);
        console.log("URL:", process.env.REACT_APP_GENAI_API_VECTOR_URL);
        fetch(process.env.REACT_APP_GENAI_API_VECTOR_URL, {
            method: "POST",
            body: JSON.stringify({
                uid: uid,
                q: searchQuery,
                limit: dataLimit,
            })
        })
            .then((res) => res.json())
            .then(async (data) => {
                const docIds = data.document_ids;
                const genaiCollection = collection(db, 'genai', uid, 'MyGenAI');
                const docsQuery = query(genaiCollection, where('__name__', 'in', docIds));
                const docsSnapshot = await getDocs(docsQuery);
                const genaiList = docsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setGenaiData(genaiList);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
                setIsLoading(false);
            });
    }

    const bigQueryResults = () => {
        setIsLoading(true);
        console.log("Fetching data for search query:", searchQuery);
        console.log("search model:", searchModel);
        console.log("limit:", dataLimit);
        console.log("URL:", process.env.REACT_APP_GENAI_API_BIGQUERY_URL);
        fetch(process.env.REACT_APP_GENAI_API_BIGQUERY_URL, {
            method: "POST",
            body: JSON.stringify({
                uid: uid,
                limit: dataLimit,
                q: searchQuery,
                model: searchModel,
                invocationType: invocationType
            })
        })
            .then((res) => res.json())
            .then((data) => {
                // Print data objects received from API
                data.forEach(item => {
                    console.log(item);
                });
                setGenaiData(data);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
                setIsLoading(false);
            });
    }

    if (showhomeWorkApp) {  // Add this block
        return (
            <Homework
                user={user}
                fromApp={'GenAIApp'}
                onBack={() => setShowhomeWorkApp(false)}
                sourceDocumentID={currentDocId}
            />
        );
    }

    const handleDownload = async (mp3UrlText, modelName) => {
        setIsDownloading(true);
        try {
            const mp3FileUrl = mp3UrlText?.match(/\(([^)]+)\)/g)?.map(url => url.slice(1, -1));
            const proxyUrl = `https://genaiapp-892085575649.us-central1.run.app/proxy-download?url=${encodeURIComponent(mp3FileUrl)}`;
            const response = await fetch(proxyUrl);
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            const prefix = modelName === 'azure-tts' ? 'Audio_' : 'Image_';
            const extension = mp3FileUrl[0].substring(mp3FileUrl[0].lastIndexOf('.'));
            link.download = `${prefix}_${new Date().toISOString().slice(0, 19).replace(/[-:]/g, '_').replace('T', '__')}${extension}`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Download failed:', error);
        }
        finally {
            setIsDownloading(false);
        }
    };

    // Update saveReaction function to include docId
    const saveReaction = async (docId, reaction) => {
        try {
            const docRef = doc(db, 'genai', uid, 'MyGenAI', docId);
            await updateDoc(docRef, {
                reaction: reaction,
                updatedAt: new Date()
            });

            // Update local state to reflect the change
            const updatedData = genaiData.map(item => {
                if (item.id === docId) {
                    return { ...item, reaction: reaction };
                }
                return item;
            });
            setGenaiData(updatedData);
        } catch (error) {
            console.error('Error saving reaction:', error);
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
        await callAPI(modelHomeWork, 'homeWork');
        updateConfiguration();
        setIshomeWork(false);
    };

    // Add handleQuiz function after handlehomeWork
    const handleQuiz = async (message) => {
        if (!message.trim()) {
            alert('Please enter a message.');
            return;
        }
        setTemperature(0.3);
        setTop_p(0.5);
        setIsQuiz(true);
        // Need to wait for state updates to be applied
        await new Promise(resolve => setTimeout(resolve, 1000));
        // Append the prompt to promptInput
        quizInput = message + quizPrompt;
        await callAPI(modelQuiz, 'quiz');
        updateConfiguration();
        setIsQuiz(false);
    };


    // Add the handler function for multiple choice quiz
    const handleMultipleChoiceQuiz = async (message) => {
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
        await callAPI(modelQuizChoices, 'quiz_with_choices');
        updateConfiguration();
        setIsQuizMultipleChoice(false);
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
                //  console.log('fetchTexts Data:', data.tag, '    ', data.fullText);
                switch (data.tag) {
                    case 'practice-button-label':
                        setPracticeButtonLabel(data.fullText);
                        break;
                    case 'Note':
                        setNoteText(data.fullText);
                        break;
                    case 'placeholder':
                        setPlaceholderText(data.fullText);
                        break;
                    case 'placeholder-semantic-search':
                        setSemanticSearchPlaceholder(data.fullText);
                        break;
                    case 'placeholder-keyword-search':
                        setKeywordSearchPlaceholder(data.fullText);
                        break;
                    case 'practice-questions-page-button-level':
                        setPracticePageButtonLabel(data.fullText);
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
                    default:
                        break;
                }
            });
        } catch (error) {
            console.error("Error fetching texts: ", error);
        }
    };

    // Add handler function after handlehomeWork
    const handleExplain = async (message) => {
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
        await callAPI(modelExplain, 'explain');
        updateConfiguration();
        setIsExplain(false);
    };

    if (goBack) {
        console.log('  source ', source, grade, subject);
        return <App user={user} source={source} grade={grade} subject={subject} />;
    }

    return (
        <div>
            <button className="subject-button" onClick={() => setGoBack(true)}>
                Previous Page
            </button>
            <div className={`main-content ${showEditPopup ? 'dimmed' : ''}`}>
                <div>
                    <textarea
                        className="promptInput"
                        value={promptInput}
                        onChange={(e) => setPromptInput(e.target.value)}
                        placeholder={placeholderText || 'Enter your topics here...'}
                    />
                </div>
                <div style={{ marginBottom: '20px' }}>
                    <div>
                        {(showhomeWorkButton && !isAISearch &&
                            <>
                                <button
                                    onClick={() => handleExplain(promptInput)}
                                    className="practiceButton"
                                    style={{ backgroundColor: 'lightyellow', color: 'black', marginLeft: '10px' }}
                                >
                                    {isExplain
                                        ? (<FaSpinner className="spinning" />)
                                        : ('Explain')}
                                </button>
                                &nbsp;
                                <button
                                    onClick={() => handlehomeWork(promptInput)}
                                    className="practiceButton"
                                >
                                    {ishomeWork
                                        ? (<FaSpinner className="spinning" />)
                                        : (practiceButtonLabel || 'Practice Questions')}
                                </button>
                                <button
                                    onClick={() => handleQuiz(promptInput)}
                                    className="practiceButton"
                                    style={{ backgroundColor: 'lightblue', color: 'black', marginLeft: '10px' }}
                                >
                                    {isQuiz
                                        ? (<FaSpinner className="spinning" />)
                                        : (quizButtonLabel || 'Trivia/Quiz')}
                                </button>
                                <button
                                    onClick={() => handleMultipleChoiceQuiz(promptInput)}
                                    className="practiceButton"
                                    style={{ backgroundColor: 'lightgreen', color: 'black', marginLeft: '10px' }}
                                >
                                    {isQuizMultipleChoice
                                        ? (<FaSpinner className="spinning" />)
                                        : (quiz_Multiple_Choices_Label || 'Quiz-Choices')}
                                </button>
                            </>
                        )}
                    </div>
                    <br />
                    <div className="info-text" style={{
                        fontSize: '14px',
                        color: '#666',
                    }}>
                        <ReactMarkdown>{noteText}</ReactMarkdown>
                    </div>
                </div>

                <label>
                    Limit:
                    <input
                        className="limitInput"
                        type="number"
                        onBlur={(event) => handleLimitChange(event)}
                        onKeyDown={(event) => (event.key === "Enter" || event.key === "Tab") && handleLimitChange(event)}
                        defaultValue={dataLimit}
                        min={1}
                    />
                </label>
                <input
                    className="searchInput"
                    type="text"
                    onKeyDown={(event) => (event.key === "Enter" || event.key === "Tab") && handleVectorSearchChange(event)}
                    placeholder={semanticSearchPlaceholder || "Semantic or Vector Search"}
                />
                <input
                    className="searchInput"
                    type="text"
                    onKeyDown={(event) => (event.key === "Enter" || event.key === "Tab") && handleSearchChange(event)}
                    placeholder={keywordSearchPlaceholder || "Keyword Search"}
                />
                <select
                    className="searchInput"
                    onChange={(event) => handleInvocationChange(event)}
                    defaultValue=""
                    style={{ marginLeft: '2px', padding: '2px', fontSize: '16px' }}
                >
                    <option value="">Select Invocation Type</option>
                    <option value="homeWork">Practice Questions</option>
                    <option value="quiz">Trivia / Quiz</option>
                    <option value="quiz_with_choices">Multiple Choice Quiz</option>
                    <option value="explain">Explain</option>
                </select>
                <div>
                    {isLoading && <p> Loading Data...</p>}
                    {!isLoading && <div>
                        {genaiData.map((item) => (
                            <div className="outputDetailsFormat" key={item.createdDateTime}>
                                <div className="responseFormat">
                                    <h4 style={{ color: "brown" }}>
                                        <span style={{ color: "#a3780a", fontWeight: "bold" }}> Prompt </span>
                                        @ <span style={{ color: "black", fontSize: "16px" }}>{new Date(item.createdDateTime).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}</span>
                                        &nbsp;
                                        on <span style={{ color: "grey", fontSize: "16px" }}>{new Date(item.createdDateTime).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                                        &nbsp;&nbsp;
                                        {showPrint && (<span style={{ color: "blue", fontSize: "16px" }}>{item.model}</span>
                                        )}
                                        &nbsp; &nbsp;
                                        {showPrint && (<span style={{ color: "black", fontSize: "12px" }}>  #Char(Q): </span>
                                        )}                                     {showPrint && (<span style={{ color: "darkblue", fontSize: "16px" }}> {item.question?.length || 0}
                                        </span>)}
                                    </h4>
                                    <div style={{ fontSize: '16px' }}>
                                        {item.showRawQuestion ? item.question : (showFullQuestion[item.id] ? <ReactMarkdown>{item.question}</ReactMarkdown> : <ReactMarkdown>{getQuestionSubstring(item.question)}</ReactMarkdown>)}
                                    </div>
                                    {showPrint && (<button className="button" onClick={() => {
                                        setShowFullQuestion(prev => ({
                                            ...prev,
                                            [item.id]: !prev[item.id]
                                        }));
                                    }}>            {showFullQuestion[item.id] ? 'Less' : 'More'}
                                    </button>
                                    )}

                                </div>
                                <div style={{ border: "1px solid black" }}>
                                    <div style={{ color: "green", fontWeight: "bold" }}>
                                        {item.model !== 'azure-tts' && (
                                            <>
                                                {(showPrint && (item.invocationType !== 'quiz') && (item.invocationType !== 'homeWork') && (
                                                    <button
                                                        className={isLiveAudioPlaying[item.id] ? 'button_selected' : 'button'}
                                                        onClick={async () => {
                                                            try {
                                                                setIsLiveAudioPlaying(prev => ({ ...prev, [item.id]: true }));
                                                                await synthesizeSpeech(item.answer, item.language || "English");

                                                            } catch (error) {
                                                                console.error('Error playing audio:', error);
                                                            }
                                                        }}
                                                    >
                                                        <label className={isLiveAudioPlaying[item.id] ? 'flashing' : ''}>
                                                            <FaPlay /> Speak
                                                        </label>
                                                    </button>
                                                ))}
                                                <button className="button" onClick={handlePause}>
                                                    Pause
                                                </button>
                                                <button className="button" onClick={handleResume}>
                                                    Resume
                                                </button>
                                            </>
                                        )}
                                    </div>
                                    <br />
                                    {(((['homeWork', 'quiz_with_choices', 'quiz'].includes(item.invocationType))) && item.answer) && (<button
                                        className="button"
                                        onClick={() => {
                                            setCurrentDocId(item.id);
                                            setShowhomeWorkApp(true);
                                        }}
                                        style={{
                                            padding: '3px 3px',
                                            fontSize: '18px',
                                            backgroundColor: '#278cab',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '8px',
                                            cursor: 'pointer',
                                            transition: 'background-color 0.3s'
                                        }}
                                        onMouseOver={(e) => e.target.style.backgroundColor = '#45a049'}
                                        onMouseOut={(e) => e.target.style.backgroundColor = '#278cab'}
                                    >
                                        {practicePageButtonLabel || 'Go to Questions/Quiz Page'}
                                    </button>
                                    )}
                                    {(showPrint || item.invocationType === 'explain') && (
                                        <div style={{ fontSize: '16px' }}>
                                            {
                                                (item.model === 'azure-tts') && (
                                                    <button
                                                        className="button"
                                                        onClick={() => handleDownload(item.answer, item.model)}
                                                        style={{
                                                            padding: '6px 6px',
                                                            fontSize: '20px',
                                                            backgroundColor: '#4CAF50',
                                                            color: 'white',
                                                            border: 'none',
                                                            borderRadius: '8px',
                                                            cursor: 'pointer',
                                                            transition: 'background-color 0.3s'
                                                        }}
                                                        onMouseOver={(e) => e.target.style.backgroundColor = '#45a049'}
                                                        onMouseOut={(e) => e.target.style.backgroundColor = '#4CAF50'}
                                                    >
                                                        {isDownloading ? (
                                                            <FaSpinner className="spinning" />
                                                        ) : (
                                                            <>Download <FaCloudDownloadAlt size={28} /></>
                                                        )}
                                                    </button>
                                                )}
                                            {item.model === 'azure-tts' && <br />}
                                            {item.model === 'azure-tts' && <br />}
                                            {item.model === 'azure-tts' && item.answer?.match(/\(([^)]+)\)/g) && (
                                                <audio controls style={{ marginBottom: '10px' }}>
                                                    <source src={item.answer.match(/\(([^)]+)\)/g)[0].slice(1, -1)} type="audio/mpeg" />
                                                    Your browser does not support the audio element.
                                                </audio>
                                            )}
                                            &nbsp; &nbsp;
                                            {showPrint && (item.voiceName !== undefined && item.voiceName?.length > 2) && (
                                                <span style={{ color: "black", fontSize: "16px" }}> voice : <strong>{item.voiceName}</strong></span>
                                            )}
                                            &nbsp; &nbsp;
                                            {showPrint && (item.invocationType !== undefined && item.invocationType?.length > 2) && (
                                                <span style={{ color: "black", fontSize: "16px" }}> invocationType : <strong>{item.invocationType}</strong></span>
                                            )}
                                            &nbsp; &nbsp;
                                            {(item.model !== 'azure-tts') && (!['homeWork', 'quiz_with_choices', 'quiz'].includes(item.invocationType)) && showDownloadTextButton && (<button
                                                onClick={() => {
                                                    const plainText = (item.answer || '')
                                                        .replace(/[#*~`>-]/g, '')
                                                        .replace(/\r?\n/g, '\r\n');
                                                    const blob = new Blob([plainText], { type: 'text/plain' });
                                                    const link = document.createElement('a');
                                                    link.href = URL.createObjectURL(blob);
                                                    if (plainText.length > 105) {
                                                        link.download = 'description.txt';
                                                    } else {
                                                        link.download = 'title.txt';
                                                    }
                                                    link.click();
                                                }}
                                                style={{
                                                    padding: '3px 3px',
                                                    fontSize: '18px',
                                                    backgroundColor: '#4CAF50',
                                                    color: 'white',
                                                    border: 'none',
                                                    borderRadius: '8px',
                                                    cursor: 'pointer',
                                                    transition: 'background-color 0.3s'
                                                }}
                                                onMouseOver={(e) => e.target.style.backgroundColor = '#45a049'}
                                                onMouseOut={(e) => e.target.style.backgroundColor = '#4CAF50'}
                                            >
                                                Download Text
                                            </button>
                                            )}
                                            {item.showRawAnswer ? item.id : ''}

                                            {item.showRawAnswer ? ((!['homeWork', 'quiz_with_choices', 'quiz'].includes(item.invocationType)) && item.answer) : (
                                                item.answer && (!['homeWork', 'quiz_with_choices', 'quiz'].includes(item.invocationType)) && (
                                                    <MdEditor
                                                        value={item.answer || ''} // Add default empty string
                                                        renderHTML={text => mdParser.render(text || '')} // Add default empty string
                                                        readOnly={true}
                                                        config={{
                                                            view: {
                                                                menu: false,
                                                                md: false,
                                                                html: true
                                                            },
                                                            canView: {
                                                                menu: false,
                                                                md: false,
                                                                html: true,
                                                                fullScreen: false,
                                                                hideMenu: true
                                                            }
                                                        }}
                                                    />
                                                )
                                            )}

                                        </div>

                                    )}
                                    <br />
                                    <br />
                                    {/* Add reaction buttons JSX */}
                                    <div className="reaction-buttons">
                                        <button
                                            className={`reaction-btn ${item.reaction === 'love' ? 'active' : ''}`}
                                            onClick={() => saveReaction(item.id, 'love')}
                                        >
                                            👍👍 Helpful
                                        </button>
                                        <button
                                            className={`reaction-btn ${item.reaction === 'like' ? 'active' : ''}`}
                                            onClick={() => saveReaction(item.id, 'like')}
                                        >
                                            👍 Informative
                                        </button>
                                        <button
                                            className={`reaction-btn ${item.reaction === 'improve' ? 'active' : ''}`}
                                            onClick={() => saveReaction(item.id, 'improve')}
                                        >
                                            🤔 Could be better
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {genaiData.some(item => item.question && item.answer) && (
                            <button
                                className="fetchButton"
                                onClick={fetchMoreData}
                                style={{ marginTop: '20px', padding: '10px 20px', fontSize: '16px' }}
                            >
                                Show more information
                            </button>
                        )}
                    </div>}
                </div>
            </div>
        </div>
    );
};

export default GenAIApp;

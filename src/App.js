import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { initializeApp } from 'firebase/app';
import * as speechsdk from 'microsoft-cognitiveservices-speech-sdk';
import { FaPlay, FaReadme, FaSignOutAlt, FaSpinner, FaCloudDownloadAlt, FaHeadphones } from 'react-icons/fa';
import './App.css';
import { getFirestore, collection, where, getDocs, query, orderBy, startAfter, limit } from 'firebase/firestore';
import {
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth';

const speechKey = process.env.REACT_APP_AZURE_SPEECH_API_KEY;
const serviceRegion = 'eastus';
const voiceName = 'en-US-AvaNeural';

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
let searchQuery = '';
let searchModel = 'All';
let dataLimit = 11;

const App = () => {
  // **State Variables**
  const [genaiData, setGenaiData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [lastVisible, setLastVisible] = useState(null); // State for the last visible document
  const [language, setLanguage] = useState("en");

  // Authentication state
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [uid, setUid] = useState(null);
  const [promptInput, setPromptInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isGeneratingGemini, setIsGeneratingGemini] = useState(false);
  const [isGeneratingAnthropic, setIsGeneratingAnthropic] = useState(false);
  const [isGeneratingo1Mini, setIsGeneratingo1Mini] = useState(false);
  const [isGeneratingImage_Dall_e_3, setIsGeneratingImage_Dall_e_3] = useState(false);
  const [isOpenAI, setIsOpenAI] = useState(false);
  const [isAnthropic, setIsAnthropic] = useState(false);
  const [isGemini, setIsGemini] = useState(true);
  const [isGpto1Mini, setIsGpto1Mini] = useState(false);
  const [isImage_Dall_e_3, setIsImage_Dall_e_3] = useState(false);
  const [isTTS, setIsTTS] = useState(false);
  const [isGeneratingTTS, setIsGeneratingTTS] = useState(false);
  const [iso1, setIso1] = useState(false); // New state for o1
  const [isGeneratingo1, setIsGeneratingo1] = useState(false); // New state for generating o1
 

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
    if (questionLimit) {
      return question.substring(0, parseInt(questionLimit));
    }
    return question;
  };

  // Listen for authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        setUid(currentUser.uid);
        console.log('User is signed in:', currentUser.uid);
        // Fetch data for the authenticated user
        await fetchData(currentUser.uid);
      }
      else {
        console.log('No user is signed in');
      }
    });
    return () => unsubscribe();
  }, []);

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
      setGenaiData(genaiList);
      setLastVisible(genaiSnapshot.docs[genaiSnapshot.docs.length - 1]); // Set last visible document
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  // Update the useEffect that handles the search query
useEffect(() => {
  if (searchQuery.length > 1 && searchModel != "All") 
  {
  setIsLoading(true);
  console.log("Fetching data for search query:", searchQuery);
  console.log("search model:", searchModel);
  console.log("limit:", dataLimit);
  fetch(
    `https://us-central1-reviewtext-ad5c6.cloudfunctions.net/function-11?uid=${uid}&limit=${dataLimit}&q=${searchQuery.replace(/ /g,'-')}&model=${searchModel}`
  )
    .then((res) => res.json())
    .then((data) => {
      console.log("BigQuery Data:", data);
      setGenaiData(data);
      setIsLoading(false);
    })
    .catch((error) => {
      console.error("Invalid JSON format:", error);
      setIsLoading(false);
    });
  }
}, [dataLimit, searchQuery]);

  // Handlers for input changes
  const handleLimitChange = (event) => {
    dataLimit = parseInt(event.target.value);
    bigQueryResults();
  };

  const handleSearchChange = (event) => {
    searchQuery = event.target.value;
    bigQueryResults();
  };

  const [showFullQuestion, setShowFullQuestion] = useState(false);

  const handleShowMore = () => {
    setShowFullQuestion(true);
  };

  // Helper function to split messages into chunks
  const splitMessage = (msg, chunkSize = 4000) => {
    const chunks = [];
    for (let i = 0; i < msg.length; i += chunkSize) {
      chunks.push(msg.substring(i, i + chunkSize));
    }
    return chunks;
  };

  // Function to synthesize speech
  const synthesizeSpeech = async (articles, language) => {
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
    const speechSynthesizer = new speechsdk.SpeechSynthesizer(speechConfig, audioConfig);

    const chunks = splitMessage(articles);
    for (const chunk of chunks) {
      try {
        const result = await speechSynthesizer.speakTextAsync(chunk);
        if (result.reason === speechsdk.ResultReason.SynthesizingAudioCompleted) {
          console.log(`Speech synthesized to speaker for text: [${chunk}]`);
        } else if (result.reason === speechsdk.ResultReason.Canceled) {
          const cancellationDetails = speechsdk.SpeechSynthesisCancellationDetails.fromResult(result);
          if (cancellationDetails.reason === speechsdk.CancellationReason.Error) {
            console.error(`Error details: ${cancellationDetails.errorDetails}`);
          }
        }
      } catch (error) {
        console.error(`Error synthesizing speech: ${error}`);
      }
    }
  };

  // Function to render question with 'More' button
  const renderQuestion = (question) => {
    if (showFullQuestion) {
      return <ReactMarkdown>{question}</ReactMarkdown>;
    } else {
      const truncatedQuestion = getQuestionSubstring(question);
      return (
        <div>
          <ReactMarkdown>{question.substring(0, parseInt(400))}</ReactMarkdown>
          <button onClick={handleShowMore}>More</button>
        </div>
      );
    }
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

  // **Authentication Functions**

  // Sign In with Email and Password
  const handleSignInWithEmail = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const loggedInUser = userCredential.user;
      if (!loggedInUser.emailVerified) {
        await auth.signOut();
        alert('Please verify your email before signing in.');
      }
    } catch (error) {
      if (error.code === 'auth/wrong-password') {
        alert('Wrong password, please try again.');
      } else {
        alert('Error signing in: ' + error.message);
        console.error('Error signing in:', error);
      }
    }
  };

  // Sign Up with Email and Password
  const handleSignUpWithEmail = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await sendEmailVerification(auth.currentUser);
      alert('Verification email sent! Please check your inbox. After verification, please sign in.');
      await auth.signOut();
    } catch (error) {
      alert('Error signing up: ' + error.message);
      console.error('Error signing up:', error);
    }
  };

  // Password Reset
  const handlePasswordReset = async () => {
    if (!email) {
      alert('Please enter your email address.');
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      alert('Password reset email sent, please check your inbox.');
    } catch (error) {
      console.error('Error sending password reset email:', error);
    }
  };

  // Sign In with Google
  const handleSignInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).catch((error) => {
      console.error('Error signing in with Google:', error);
      alert('Error signing in with Google: ' + error.message);
    });
  };

  // Sign Out
  const handleSignOut = () => {
    signOut(auth).catch((error) => {
      console.error('Error signing out:', error);
      alert('Error signing out: ' + error.message);
    });
  };

  // **New Event Handlers for Generate and Refresh**

  // Handler for Generate Button Click
  // **Handler for Generate Button Click**
  const handleGenerate = async () => {
    if (!promptInput.trim()) {
      alert('Please enter a prompt.');
      return;
    }

    // Check if at least one model is selected
    if (!isOpenAI && !isAnthropic && !isGemini && !isGpto1Mini && !iso1 && !isImage_Dall_e_3 && !isTTS) {
      alert('Please select at least one model.');
      return;
    }

    // Generate API calls for each selected model
    if (isAnthropic) {
      setIsGeneratingAnthropic(true); // Set generating state to true
      callAPI('anthropic');
    }

    if (isGemini) {
      setIsGeneratingGemini(true); // Set generating state to true
      callAPI('gemini');
    }

    if (isOpenAI) {
      setIsGenerating(true); // Set generating state to true
      callAPI('openai');
    }

    if (isGpto1Mini) {
      setIsGeneratingo1Mini(true); // Set generating state to true
      callAPI('o1-mini');
    }

    if (iso1) {
      setIsGeneratingo1(true); // Set generating state to true
      callAPI('o1');
    }

    // **Handle DALL·E 3 Selection**
    if (isImage_Dall_e_3) {
      setIsGeneratingImage_Dall_e_3(true); // Set generating state to true
      callAPI('dall-e-3');
    }

    // **Handle TTS Selection**
    if (isTTS) {
      setIsGeneratingTTS(true); // Set generating state to true
      // if promptInput is > 9000 characters, then split it into chunks and call TTS API for each chunk
      //

      if (promptInput.length > 2) {
        /* const chunks = [];
         for (let i = 0; i < promptInput.length; i += 3999) {
           chunks.push(promptInput.substring(i, i + 3999));
         }
         for (const chunk of chunks) {
           callTTSAPI(chunk);
         }*/
        callTTSAPI(promptInput, 'https://tts.happyrock-2dd71657.centralus.azurecontainerapps.io/');
      }
      else {
        callTTSAPI(promptInput, 'https://us-central1-reviewtext-ad5c6.cloudfunctions.net/function-18');
      }
    }
  };

  // Call the function13 api
  const callAPI = async (selectedModel) => {
    console.log('Calling API with model:', selectedModel);

    try {
      const response = await fetch('https://us-central1-reviewtext-ad5c6.cloudfunctions.net/function-13', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ prompt: promptInput, model: selectedModel, uid: uid })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate content.');
      }

      const data = await response.json();
      console.log('Response:', data);
      // print response data.question
      console.log('Selected Model:', selectedModel);
      console.log('Response - Question:', data.question);

      const { model, firestoreStatus } = data.results[0];
      console.log('Model:', model);
      console.log('Firestore Status:', firestoreStatus);

    } catch (error) {
      console.error('Error generating content:', error);
      alert(`Error: ${error.message}`);
    } finally {
      // click refresh button
      searchQuery = '';
      searchModel = 'All';
      console.log('Fetching data after generating content');
      fetchData(uid);
      if (selectedModel === 'openai') {
        setIsGenerating(false);
      }
      if (selectedModel === 'anthropic') {
        setIsGeneratingAnthropic(false);
      }
      if (selectedModel === 'gemini') {
        setIsGeneratingGemini(false);
      }
      if (selectedModel === 'o1-mini') {
        setIsGeneratingo1Mini(false);
      }
      if (selectedModel === 'o1') {
        setIsGeneratingo1(false);
      }
      if (selectedModel === 'dall-e-3') {
        setIsGeneratingImage_Dall_e_3(false);
      }
    }
  };

  // Function to call the TTS API
  const callTTSAPI = async (message, apiUrl) => {
    console.log('Calling TTS API with message:', message);

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: message, uid: uid })
      });

      if (!response.ok) {
        throw new Error([`Network response was not ok: ${response.statusText}`]);
      }
    } catch (error) {
      console.error('Error calling TTS API:', error);
      alert([`Error: ${error.message}`]);
    } finally {
      setIsGeneratingTTS(false); // Reset generating state
      // Optionally, refresh data
      fetchData(uid);
    }
  };
  // Handler for DALL·E 3 Checkbox Change
  const handleDall_e_3Change = (checked) => {
    setIsImage_Dall_e_3(checked);
    // if any other model is checked, uncheck it, and display popup

    if (checked) {
      // Uncheck other models
      if (isOpenAI || isAnthropic || isGemini || isGpto1Mini || iso1 || isTTS) {
        alert('Image generation model, can not be combined with Text Generation model.');
        setIsOpenAI(false);
        setIsOpenAI(false);
        setIsAnthropic(false);
        setIsGemini(false);
        setIsGpto1Mini(false);
        setIso1(false);
        setIsTTS(false);
      }
    }
  };

  const handleTTSChange = (checked) => {
    setIsTTS(checked);

    if (checked) {
      // Optionally, uncheck DALL·E 3 or other models if needed
      // For example, if TTS should not coexist with DALL·E 3:
      if (isOpenAI || isAnthropic || isGemini || isGpto1Mini || iso1 || isImage_Dall_e_3) {
        alert('Audio generation model, can not be combined with other model.');
        setIsOpenAI(false);
        setIsOpenAI(false);
        setIsAnthropic(false);
        setIsGemini(false);
        setIsGpto1Mini(false);
        setIso1(false);
        setIsImage_Dall_e_3(false);
      }
    }
  };

const handleModelChange = (modelValue) => {
  searchModel = modelValue;
  bigQueryResults();
  }
const bigQueryResults = () => {
  setIsLoading(true);
  console.log("Fetching data for search query:", searchQuery);
  console.log("search model:", searchModel);
  console.log("limit:", dataLimit);
  fetch(
    `https://us-central1-reviewtext-ad5c6.cloudfunctions.net/function-11?uid=${uid}&limit=${dataLimit}&q=${searchQuery.replace(/ /g,'-')}&model=${searchModel}`
  )
    .then((res) => res.json())
    .then((data) => {
      console.log("BigQuery Data:", data);
      setGenaiData(data);
      setIsLoading(false);
    })
    .catch((error) => {
      console.error("Invalid JSON format:", error);
      setIsLoading(false);
    });
}

  return (
    <div>
      {!user ? (
        // **Unauthenticated User Interface: Authentication Forms**
        <div style={{ fontSize: '22px', width: '100%', margin: '0 auto' }}>
          <br />
          <p>Sign In</p>
          <input
            className="textinput"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <br />
          <br />
          <input
            type="password"
            className="textinput"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <br />
          <br />
          <button className="signonpagebutton" onClick={handleSignInWithEmail}>
            Sign In
          </button>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <button className="signuppagebutton" onClick={handleSignUpWithEmail}>
            Sign Up
          </button>
          <br />
          <br />
          <button onClick={handlePasswordReset}>Forgot Password?</button>
          <br />
          <br />
          <br />
          <p> OR </p>
          <br />
          <button className="signgooglepagebutton" onClick={handleSignInWithGoogle}>
            Sign In with Google
          </button>
          <br />
        </div>
      ) : (
        // **Authenticated User Interface: Data Display and New Functionalities**
        <div>
          <div>
            <textarea
              value={promptInput}
              onChange={(e) => setPromptInput(e.target.value)}
              placeholder="Enter your prompt here..."
              style={{ width: '95%', padding: '8px', height: '40px', fontSize: '16px' }}
            />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label>
              <input
                type="checkbox"
                value="openai"
                onChange={(e) => setIsOpenAI(e.target.checked)}
                checked={isOpenAI}
              />
              ChatGPT
            </label>
            <label style={{ marginLeft: '8px' }}>
              <input
                type="checkbox"
                value="anthropic"
                onChange={(e) => setIsAnthropic(e.target.checked)}
                checked={isAnthropic}
              />
              Claude
            </label>
            <label style={{ marginLeft: '8px' }}>
              <input
                type="checkbox"
                value="gemini"
                onChange={(e) => setIsGemini(e.target.checked)}
                checked={isGemini}
              />
              Gemini
            </label>
            <label style={{ marginLeft: '8px' }}>
              <input
                type="checkbox"
                value="o1-mini"
                onChange={(e) => setIsGpto1Mini(e.target.checked)}
                checked={isGpto1Mini}
              />
              o1-mini
            </label>
            <label style={{ marginLeft: '8px' }}>
              <input
                type="checkbox"
                value="o1"
                onChange={(e) => setIso1(e.target.checked)}
                checked={iso1}
              />
              o1
            </label>
            <label style={{ marginLeft: '8px' }}>
              <input
                type="checkbox"
                value="dall-e-3"
                onChange={(e) => handleDall_e_3Change(e.target.checked)}
                checked={isImage_Dall_e_3}
              />
              IMAGE
            </label>
                  <label style={{ marginLeft: '8px' }}>
                    <input
                    type="checkbox"
                    value="tts"
                    onChange={(e) => handleTTSChange(e.target.checked)}
                    checked={isTTS}
                    />
                    TTS
                  </label>
                  <button
                    onClick={handleGenerate}
                    className="signonpagebutton"
                    style={{ marginLeft: '20px', padding: '15px 20px', fontSize: '16px' }}
                    disabled={
                    isGenerating ||
                    isGeneratingGemini ||
                    isGeneratingAnthropic ||
                    isGeneratingo1Mini ||
                    isGeneratingo1 ||
                    isGeneratingImage_Dall_e_3 ||
                    isGeneratingTTS
                    }
                  >
                    {isGenerating ||
                    isGeneratingGemini ||
                    isGeneratingAnthropic ||
                    isGeneratingo1Mini ||
                    isGeneratingo1 ||
                    isGeneratingImage_Dall_e_3 || isGeneratingTTS ? (
                    <FaSpinner className="spinning" />
                    ) : (
                    'Generate'
                    )}
                  </button>
                  <button
                    className="signoutbutton"
                    onClick={handleSignOut}
                    style={{ marginLeft: '20px', padding: '10px 20px', fontSize: '16px' }}
                  >
                    <FaSignOutAlt />
                  </button>
                  </div>
                  <label>
                  Limit:
                  <input
                    type="number"
                    onBlur={(event) => handleLimitChange(event)}
                    onKeyDown={(event) => (event.key === "Enter" || event.key === "Tab") && handleLimitChange(event)}
                    defaultValue={dataLimit}
                    style={{ width: "50px", margin: "0 10px" }}
                    min={1}
                  />
                  </label>
                  <input
                  type="text"
                  onBlur={(event) => handleSearchChange(event)}
                  onKeyDown={(event) => (event.key === "Enter" || event.key === "Tab") && handleSearchChange(event)}
                  placeholder="Enter Search Text and Click Enter"
                  style={{ width: '80%', padding: '10px', fontSize: '16px' }}
                  />
                  <select
              value={searchModel}
              onChange={(e) => handleModelChange(e.target.value)}
              style={{ marginLeft: '10px', padding: '10px', fontSize: '16px' }}
            >
              <option value="All">All</option>
              <option value="chatgpt-4o-latest">ChatGPT</option>
              <option value="gemini-1.5-pro-002">Gemini</option>
              <option value="gemini-1.5-pro-exp-0827">gemini-1.5-pro-exp-0827</option>
              <option value="claude-3-5-sonnet-20240620">Claude</option>
              <option value="o1-mini">o1-mini</option>
              <option value="o1-preview">o1</option>
  <option value="azure-tts">TTS</option>
  <option value="dall-e-3">IMAGE</option>
</select>
          {/* **Display Generated Response** 
          {generatedResponse && (
            <div style={{ marginTop: '20px', border: '1px solid #ccc', padding: '20px', borderRadius: '5px' }}>
              <h3>Response is generated, click Refresh button to see results</h3>
            </div>
          )}*/}

          {/* **Existing Data Display** */}
          <div>
            {isLoading && <p> Loading Data...</p>}
            {!isLoading && <div>
              {genaiData.map((item) => (
                <div key={item.createdDateTime}>
                  <h4 style={{ color: "brown" }}>
                    Time: <span style={{ color: "black", fontSize: "16px" }}>{new Date(item.createdDateTime).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}</span>
                    &nbsp;&nbsp;
                    Date: <span style={{ color: "grey", fontSize: "16px" }}>{new Date(item.createdDateTime).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    Model: <span style={{ color: "blue", fontSize: "16px" }}>{item.model}   </span>
                  </h4>
                  <div style={{ border: "1px dotted black", padding: "2px" }}>
                    <div style={{ textAlign: "center", color: "orange", fontWeight: "bold" }}>---Question--</div>
                    <div style={{ fontSize: '16px' }}>
                      {renderQuestion(item.question)}
                    </div>
                  </div>
                  <br />
                  <div style={{ border: "1px solid black", padding: "4px" }}>
                    {item.model !== 'dall-e-3' && item.model !== 'azure-tts' && (
                      <button className="signgooglepagebutton" onClick={() => synthesizeSpeech(item.answer, item.language || "English")}><FaHeadphones /></button>
                    )}
                    <div style={{ textAlign: "center", color: "green", fontWeight: "bold" }}>---Answer--</div>
                    <div style={{ fontSize: '16px' }}>
                      <ReactMarkdown>{item.answer}</ReactMarkdown>
                    </div>
                  </div>
                </div>
              ))}
              <button className="fetchButton" onClick={fetchMoreData} style={{ marginTop: '20px', padding: '10px 20px', fontSize: '16px' }}>
                Show more information
              </button>
            </div>}
          </div>
        </div>
      )
      }
    </div >
  );
};

export default App;

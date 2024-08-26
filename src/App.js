import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import * as speechsdk from 'microsoft-cognitiveservices-speech-sdk';
import { FaPlay, FaReadme } from 'react-icons/fa';
import './App.css';
import { getFirestore, collection, where, getDocs, query, orderBy, startAfter, limit } from 'firebase/firestore';
import { SpeechSynthesisVoice } from 'microsoft-cognitiveservices-speech-sdk';

const speechKey = process.env.REACT_APP_AZURE_SPEECH_API_KEY;
const serviceRegion = 'eastus';
const voiceName = 'en-US-AvaNeural';

const App = () => {
  const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID
  };
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const [genaiData, setGenaiData] = useState([]);
  const [dataLimit, setDataLimit] = useState(11);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [lastVisible, setLastVisible] = useState(null); // State for the last visible document
  const [language, setLanguage] = useState("en");

  const getUrlParameter = (name) => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return urlParams.get(name);
  };

  const questionLimit = getUrlParameter('question_limit');
  const telugu = getUrlParameter('telugu');
  const hindi = getUrlParameter('hindi');

  const getQuestionSubstring = (question) => {
    if (questionLimit) {
      return question.substring(0, parseInt(questionLimit));
    }
    return question;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const genaiCollection = collection(db, 'genai');
        var q;
        q = query(genaiCollection, orderBy('createdDateTime', 'desc'), limit(dataLimit));
        if (hindi) {
          q = query(genaiCollection, orderBy('createdDateTime', 'desc'), where ('language','==', 'Hindi'), limit(dataLimit));
        }
        if (telugu) {
           q = query(genaiCollection, orderBy('createdDateTime', 'desc'), where ('language','==', 'Telugu'), limit(dataLimit));
        }
        const genaiSnapshot = await getDocs(q);
        const genaiList = genaiSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setGenaiData(genaiList);
        setLastVisible(genaiSnapshot.docs[genaiSnapshot.docs.length - 1]); // Set last visible document
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchData();
  }, [dataLimit]);

  useEffect(() => {
    if (searchQuery === "") return;
    setIsLoading(true);
    fetch(`https://us-central1-reviewtext-ad5c6.cloudfunctions.net/function-11?limit=12&q=${searchQuery.replace(/ /g, '-')}`)
      .then((res) => res.json())
      .then((data) => {
        setGenaiData(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Invalid JSON format:", error);
        setIsLoading(false);
      });
  }, [searchQuery]);

  const handleLimitChange = (event) => {
    const newLimit = event.target.value ? parseInt(event.target.value) : 11;
    setDataLimit(newLimit);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const [showFullQuestion, setShowFullQuestion] = useState(false);

  const handleShowMore = () => {
    setShowFullQuestion(true);
  };

  const splitMessage = (msg, chunkSize = 4000) => {
    const chunks = [];
    for (let i = 0; i < msg.length; i += chunkSize) {
      chunks.push(msg.substring(i, i + chunkSize));
    }
    return chunks;
  };

  const synthesizeSpeech = async (articles, language) => {
    const speechConfig = speechsdk.SpeechConfig.fromSubscription(speechKey, serviceRegion);
    speechConfig.speechSynthesisVoiceName = voiceName;
    if (language === "Spanish") {
      speechConfig.speechSynthesisVoiceName = "es-ES-AlvaroNeural";
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

  const fetchMoreData = async () => {
    try {
      const genaiCollection = collection(db, 'genai');

      var nextQuery;
      nextQuery = query(genaiCollection, orderBy('createdDateTime', 'desc'),  startAfter(lastVisible), limit(dataLimit));
      if (hindi) {
        nextQuery = query(genaiCollection, orderBy('createdDateTime', 'desc'), where ('language','==', 'Hindi'), startAfter(lastVisible), limit(dataLimit));
      }
      if (telugu) {
        nextQuery = query(genaiCollection, orderBy('createdDateTime', 'desc'), where ('language','==', 'Telugu'), startAfter(lastVisible), limit(dataLimit));
      }

      const genaiSnapshot = await getDocs(nextQuery);
      const genaiList = genaiSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setGenaiData(prevData => [...prevData, ...genaiList]);
      setLastVisible(genaiSnapshot.docs[genaiSnapshot.docs.length - 1]); // Update last visible document
    } catch (error) {
      console.error("Error fetching more data: ", error);
    }
  };

  return (
    <div>
      <label>
        Limit:
        <input
          type="number"
          value={dataLimit}
          onChange={handleLimitChange}
          style={{ width: "50px", margin: "0 10px" }}
          min={1}
        />
      </label>
      <input id="searchInput" style={{ fontSizex: "24px", height: "10%", width: "60%", boxShadow: "0 0 5px rgba(0, 0, 0, 0.3)" }} type="text" onKeyDown={(event) => event.key === "Enter" && handleSearchChange(event)} placeholder="Search..." />
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
                {renderQuestion(item.question)}
              </div>
              <br />
              <div style={{ border: "1px solid black", padding: "4px" }}>
                <button onClick={() => synthesizeSpeech(item.answer, item.language || "English")}><FaPlay /></button>
                <div style={{ textAlign: "center", color: "green", fontWeight: "bold" }}>---Answer--</div>
                <ReactMarkdown>{item.answer}</ReactMarkdown>
              </div>
            </div>
          ))}
          <button className="fetchButton" onClick={fetchMoreData}>Show more information</button>
        </div>}
      </div>
    </div>
  );
};

export default App;
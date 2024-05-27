import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { query, where, orderBy, onSnapshot, addDoc, doc, updateDoc, limit, and } from 'firebase/firestore';

const App = () => {
  const firebaseConfig = {
    apiKey: "AIzaSyBNeonGTfBV2QhXxkufPueC-gQLCrcsB08",
    authDomain: "reviewtext-ad5c6.firebaseapp.com",
    databaseURL: "https://reviewtext-ad5c6.firebaseio.com",
    projectId: "reviewtext-ad5c6",
    storageBucket: "reviewtext-ad5c6.appspot.com",
    messagingSenderId: "892085575649",
    appId: "1:892085575649:web:b57abe0e1438f10dc6fca0"
  };
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const [genaiData, setGenaiData] = useState([]);
  const [dataLimit, setDataLimit] = useState(12);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const getUrlParameter = (name) => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return urlParams.get(name);
  };

  const questionLimit = getUrlParameter('question_limit');

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
        const q = query(genaiCollection, orderBy('createdDateTime', 'desc'), limit(dataLimit));
        const genaiSnapshot = await getDocs(q);
        const genaiList = genaiSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setGenaiData(genaiList);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchData();
  }, [dataLimit]);

  useEffect(() => {
    console.log(searchQuery);
    const q = searchQuery.replace(/ /g, '-');
    const queryParameter = q ? `&q=${q}` : '';
    if (searchQuery === "") { return; }
    else {
    setIsLoading(true);
    console.log('queryParametr ' + queryParameter);
    console.log(`https://us-central1-reviewtext-ad5c6.cloudfunctions.net/function-11?limit=12${queryParameter}`);
    fetch(`https://us-central1-reviewtext-ad5c6.cloudfunctions.net/function-11?limit=12${queryParameter}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        try {
          //   const parsedData = JSON.parse(data);
          setGenaiData(data);
          setIsLoading(false);
        } catch (error) {
          console.log("Invalid JSON format:", error);
        }
      })
      .catch((err) => console.log(err));
    }
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
                <div style={{ textAlign: "center", color: "green", fontWeight: "bold" }}>---Answer--</div>
                <ReactMarkdown>{item.answer}</ReactMarkdown>
              </div>
            </div>
          ))}
        </div>}
      </div>
    </div>
  );
};
export default App;

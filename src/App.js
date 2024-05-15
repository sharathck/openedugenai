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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const genaiCollection = collection(db, 'genai');
        const genaiSnapshot = await getDocs(genaiCollection);
        const genaiList = genaiSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setGenaiData(genaiList);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {genaiData.map((item) => (
        <div key={item.createdDateTime}>
          <h4 style={{ color: "brown" }}>
            Model: <span style={{ color: "blue", fontSize: "22px" }}>{item.model}   </span>
            Date Time: <span style={{ color: "grey", fontSize: "16px" }}>{item.createdDateTime.toString()}</span>
          </h4>
          <div style={{ border: "1px dotted black", padding: "2px" }}>
            <div style={{ textAlign: "center", color: "orange", fontWeight: "bold" }}>---Question--</div>
            <ReactMarkdown>{item.question}</ReactMarkdown>
          </div>
          <br />
          <div style={{ border: "1px solid black", padding: "4px" }}>
            <div style={{ textAlign: "center", color: "green", fontWeight: "bold" }}>---Answer--</div>
            <ReactMarkdown>{item.answer}</ReactMarkdown>
          </div>
        </div>
      ))}
    </div>
  );
};
export default App;

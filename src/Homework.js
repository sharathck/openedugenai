import React, { useState, useEffect } from "react";
import './Homework.css';
import { collection, getDocs, addDoc, updateDoc, doc, writeBatch, query, where, getDoc } from 'firebase/firestore';
import { auth, db } from './Firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { FaArrowLeft } from 'react-icons/fa';
import App from './App';

const Homework = ({ sourceDocumentID }) => {
    // Add new state variables for labels
    const [copyUrlButtonLabel, setCopyUrlButtonLabel] = useState('Copy URL to Share');
    const [printGridButtonLabel, setPrintGridButtonLabel] = useState('Print');
    const [practiceNote, setPracticeNote] = useState('The student URL copied above does not require App Login. Students can access from any device without signing up.');
    // Convert markdown content to JSON
    const [problems, setProblems] = useState([]);
    const [user, setUser] = useState(null);
    const [showMainApp, setShowMainApp] = useState(false);
    const [showAnswers, setShowAnswers] = useState(false);
    const [pinInput, setPinInput] = useState('');
    const [showPinModal, setShowPinModal] = useState(false);
    const [sourceDocID, setSourceDocID] = useState(sourceDocumentID);
    const [showMainAppButton, setShowMainAppButton] = useState(false);
    const CORRECT_PIN = '463859';

    const initializeHomeworkData = async (firestoreData, userId) => {
        try {
            // Check if data already exists
            const homeworkCollection = collection(db, 'genai', userId, 'homework');
            const q = query(homeworkCollection, where('sourceDocumentID', '==', sourceDocID));
            const snapshot = await getDocs(q);
            
            if (snapshot.docs.length > 2) {
                console.log('Existing homework data found. Skipping initialization');
                return;
            }

            // Clean and parse the JSON data
            let questions = [];
            try {
                if (typeof firestoreData === 'string') {
                    console.log('Raw JSON:', firestoreData);
                    try {
                        // Extract JSON content from markdown format
                        const jsonMatch = firestoreData.match(/```(?:json|JSON)\s*([\s\S]*?)\s*```/);
                        if (jsonMatch && jsonMatch[1]) {
                            questions = JSON.parse(jsonMatch[1].trim());
                        } else {
                            questions = JSON.parse(firestoreData);
                        }
                    } catch (parseError) {
                        console.error("JSON Parse Error:", parseError);
                        console.log("Attempted to parse:", firestoreData);
                        return;
                    }
                } else if (firestoreData.questions) {
                    questions = firestoreData.questions;
                } else if (Array.isArray(firestoreData)) {
                    questions = firestoreData;
                }
            } catch (parseError) {
                console.error("Error parsing questions data:", parseError);
                console.log("Raw data:", firestoreData);
                return;
            }

            // Validate questions array
            if (!Array.isArray(questions) || !questions.length) {
                console.error("No valid questions found in data");
                return;
            }

            // Process questions and add to Firestore
            // ...rest of the existing initialization code...
            const currentDateTime = new Date();
            const batch = writeBatch(db);
            questions.forEach((question) => {
                const docRef = doc(homeworkCollection);
                batch.set(docRef, {
                    question: question.Question || question.question,
                    correctAnswer: question.Answer || question.answer || question.correctAnswer,
                    userAnswer: '',
                    createdDateTime: currentDateTime,
                    modifiedDateTime: currentDateTime,
                    sourceDocumentID: sourceDocID,
                    sourceDocumentIDCreatedDateTime: currentDateTime
                });
            });
            await batch.commit();
            console.log('Personal Homework data initialized successfully');
            const sharedHomeworkCollection = collection(db, 'homework');
            const sharedbatch = writeBatch(db);
            questions.forEach((question) => {
                const docRef = doc(sharedHomeworkCollection);
                sharedbatch.set(docRef, {
                    question: question.Question || question.question,
                    correctAnswer: question.Answer || question.answer || question.correctAnswer,
                    userAnswer: '',
                    createdDateTime: currentDateTime,
                    modifiedDateTime: currentDateTime,
                    sourceDocumentID: sourceDocID,
                    sourceDocumentIDCreatedDateTime: currentDateTime
                });
            });
            await sharedbatch.commit();
            console.log('Shared Homework data initialized successfully');
        } catch (error) {
            console.error("Error initializing homework data:", error);
            console.log("Firestore Data received:", firestoreData);
        }
    };

    const fetchInitialQuestions = async (userId) => {
        try {
            const homeworkCollection = collection(db, 'genai', userId, 'homework');
            const q = query(homeworkCollection, where('sourceDocumentID', '==', sourceDocID));
            const snapshot = await getDocs(q);

            if (!snapshot.empty) {
                const fetchedProblems = snapshot.docs.map(doc => ({
                    id: doc.id,
                    question: doc.data().question,
                    correctAnswer: doc.data().correctAnswer,
                    userAnswer: doc.data().userAnswer || '',
                }));
                setProblems(fetchedProblems);
                return true;
            }
            return false;
        } catch (error) {
            console.error("Error fetching initial questions:", error);
            return false;
        }
    };

    const fetchQuestionsFromFirestore = async (userId) => {
        try {
            const docRef = doc(db, 'genai', user.uid, 'MyGenAI', sourceDocID);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const data = docSnap.data().answer;
                console.log('First fetched data from Firestore:', data);
                return data;
            }
            return null;
        } catch (error) {
            console.error("Error fetching questions from Firestore:", error);
            return null;
        }
    };

    const handleSourceDocIDChange = async (event) => {
        const newSourceDocID = event.target.value;
        setSourceDocID(newSourceDocID);
        if (event.type === 'blur' || event.key === 'Enter') {
            await loadQuestions(newSourceDocID);
        }
    };

    const loadQuestions = async () => {
        if (!user?.uid) return;

        if (!sourceDocID) {
            return;
        }

        // Try to fetch existing questions first
        const existingQuestions = await fetchInitialQuestions(user.uid);

        if (!existingQuestions) {
            // If no existing questions, try to fetch from Firestore
            console.log('No existing questions found. Fetching from Firestore...');
            const firestoreQuestions = await fetchQuestionsFromFirestore(user.uid);
            if (firestoreQuestions) {
                console.log('Inside fetched questions from Firestore:', firestoreQuestions);
                // Initialize homework with Firestore questions
                const cleanContent = firestoreQuestions.replace(/\r/g, '').trim();
                let jsonContent = '';
                if (cleanContent.startsWith('[')) {
                    jsonContent = cleanContent.trim();
                }
                else {
                    // Extract content between ```json and ``` markers
                    const jsonMatch = cleanContent.match(/```(?:json|JSON)\s*([\s\S]*?)\s*```/);
                    // Clean and parse the JSON content
                    jsonContent = jsonMatch[1].trim();
                }
                await initializeHomeworkData(jsonContent, user.uid);
                await fetchInitialQuestions(user.uid);
            }
        }
    };

    // Add function to fetch text labels
    const fetchTexts = async () => {
        try {
            const q = query(
                collection(db, 'public'),
                where('tag', 'in', ['copy-url-to-share', 'print-grid', 'practice-note'])
            );
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                const data = doc.data();
                switch (data.tag) {
                    case 'copy-url-to-share':
                        setCopyUrlButtonLabel(data.fullText);
                        break;
                    case 'print-grid':
                        setPrintGridButtonLabel(data.fullText);
                        break;
                    case 'practice-note':
                        setPracticeNote(data.fullText);
                        break;
                    default:
                        break;
                }
            });
        } catch (error) {
            console.error("Error fetching texts: ", error);
        }
    };

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const homeworkParam = urlParams.get('g');
        if (homeworkParam && homeworkParam.length > 5) {
            setShowMainAppButton(false);
        }
        else {
            setShowMainAppButton(true);
        }
        console.log('Source Document ID:', sourceDocumentID);
        loadQuestions();
        fetchTexts(); // Add this line
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, [user]);

    const handleAnswerChange = async (index, value) => {
        try {
            if (!user) return;

            const problem = problems[index];
            const currentDateTime = new Date();

            // Update local state
            const newProblems = [...problems];
            newProblems[index] = { ...problem, userAnswer: value };
            setProblems(newProblems);

            // Update Firestore
            const docRef = doc(db, 'genai', user.uid, 'homework', problem.id);
            await updateDoc(docRef, {
                userAnswer: value,
                modifiedDateTime: currentDateTime
            });

        } catch (error) {
            console.error("Error updating answer:", error);
        }
    };

    const handlePinSubmit = () => {
        if (pinInput === CORRECT_PIN) {
            setShowAnswers(true);
            setShowPinModal(false);
            setPinInput('');
        } else {
            alert('Incorrect PIN');
            setPinInput('');
        }
    };

    const handleShowAnswers = () => {
        if (!showAnswers) {
            setShowPinModal(true);
        } else {
            setShowAnswers(false);
        }
    };

    if (showMainApp) {
        return <App user={user} />;
    }

    return (
        <div className="homework-container">
            <div className="homework-header">
                {showMainAppButton && (
                    <button className='signoutbutton' onClick={() => setShowMainApp(!showMainApp)}>
                        <FaArrowLeft />
                    </button>
                )}
                <div className="source-doc-container">
                    <button
                        className="button"
                        onClick={() => {
                            const printWindow = window.open('', '', 'height=500,width=800');
                            printWindow.document.write('<html><head><title>Homework</title>');
                            printWindow.document.write('<style>');
                            printWindow.document.write(`
                                body { font-family: Arial, sans-serif; margin: 20px; }
                                .grid { width: 100%; border-collapse: collapse; }
                                .grid th, .grid td { 
                                    border: 1px solid #ccc;
                                    padding: 8px;
                                    text-align: left;
                                }
                                .grid th { background-color: #f2f2f2; }
                            `);
                            printWindow.document.write('</style></head><body>');

                            let tableHtml = '<table class="grid"><tr><th>Question</th>';
                            if (showAnswers) {
                                tableHtml += '<th>Correct Answer</th>';
                            }
                            tableHtml += '<th>Student Answer</th></tr>';

                            problems.forEach(problem => {
                                tableHtml += `<tr><td>${problem.question}</td>`;
                                if (showAnswers) {
                                    tableHtml += `<td>${problem.correctAnswer}</td>`;
                                }
                                tableHtml += `<td>${problem.userAnswer}</td></tr>`;
                            });
                            tableHtml += '</table>';

                            printWindow.document.write(tableHtml);
                            printWindow.document.write('</body></html>');
                            printWindow.document.close();
                            printWindow.print();
                        }}
                    >
                        {printGridButtonLabel}
                    </button>
                    <button
                        className="button"
                        onClick={() => {
                            const baseUrl = window.location.href.split('?')[0];
                            const newUrl = `${baseUrl}?h=${sourceDocID}`;
                            navigator.clipboard.writeText(newUrl)
                                .then(() => {
                                    const notification = document.createElement('div');
                                    notification.textContent = 'URL copied';
                                    notification.style.cssText = 'position: fixed; right: 20px; top: 20px; background: rgba(0,0,0,0.7); color: white; padding: 10px 20px; border-radius: 4px; animation: fadeOut 2s forwards;';
                                    document.body.appendChild(notification);
                                    setTimeout(() => notification.remove(), 2000);
                                })
                                .catch(err => {
                                    console.error('Failed to copy URL:', err);
                                    alert('Failed to copy URL');
                                });
                        }}
                    >
                        {copyUrlButtonLabel}
                    </button>
                </div>
                <button
                    className='show-answers-button'
                    onClick={handleShowAnswers}
                >
                    {showAnswers ? 'Hide Answers' : 'Show Answers'}
                </button>
            </div>
            <div className="info-text" style={{
                fontSize: '12px',
                color: '#666',
                marginTop: '5px',
            }}>
                {practiceNote}
            </div>
            {showPinModal && (
                <div className="pin-modal">
                    <div className="pin-modal-content">
                        <h3>Enter PIN to view answers</h3>
                        <input
                            type="password"
                            value={pinInput}
                            onChange={(e) => setPinInput(e.target.value)}
                            placeholder="Enter PIN"
                        />
                        <button onClick={handlePinSubmit}>Submit</button>
                        <button onClick={() => setShowPinModal(false)}>Cancel</button>
                    </div>
                </div>
            )}

            <div className="homework-grid">
                <div className="grid-header">
                    <div className="question-col">Question</div>
                    {showAnswers && <div className="answer-col">Correct Answer</div>}
                    <div className="user-answer-col">Your Answer</div>
                </div>
                {problems.map((problem, index) => (
                    <div key={index} className="grid-row">
                        <div className="question-col">{problem.question}</div>
                        {showAnswers &&
                            <div className="answer-col correct-answer">{problem.correctAnswer}</div>}
                        <div className="user-answer-col">
                            <input
                                type="text"
                                value={problem.userAnswer}
                                onChange={(e) => handleAnswerChange(index, e.target.value)}
                                placeholder="Enter your answer"
                            />
                        </div>
                    </div>
                ))}
            </div>
            {showAnswers && (
                <input
                    type="text"
                    className="source-doc-input"
                    value={sourceDocID}
                    onChange={(e) => setSourceDocID(e.target.value)}
                    onBlur={handleSourceDocIDChange}
                    onKeyPress={(e) => e.key === 'Enter' && handleSourceDocIDChange(e)}
                    placeholder="Enter Source Document ID"
                />
            )}
            {showAnswers && (
                <button
                    className="fetch-button"
                    onClick={() => loadQuestions(sourceDocID)}
                >
                    Fetch Questions
                </button>
            )}
        </div>
    );
};

export default Homework;
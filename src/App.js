import React, { useState } from 'react';
import './App.css';
import { auth } from './Firebase';
import { gradesData } from './data/gradesData';  // Add this import

function App({ user }) {  // Add user prop
  const [selectedGrade, setSelectedGrade] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [generatedContent, setGeneratedContent] = useState('');
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [topicExplanation, setTopicExplanation] = useState('');

  const handleSignOut = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const generateContent = async (grade, subject, topics) => {
    const prompt = `
      Create a detailed educational curriculum explanation for ${grade} ${subject}. 
      Focus on these key topics:
      ${topics.join(', ')}
      
      Include:
      1. Learning objectives
      2. Key concepts
      3. Practical applications
      4. Learning activities
      5. Assessment methods
      
      Format the response in a clear, structured way suitable for educators and parents.
    `;

    try {
      // Simulate LLM response for now
      // In production, replace with actual API call to OpenAI or other LLM service
      const simulatedResponse = `
${grade} - ${subject} Curriculum

Learning Objectives:
• Master fundamental concepts in ${subject}
• Develop critical thinking and problem-solving skills
• Build foundation for advanced learning

Key Topics:
${topics.map(topic => `
${topic}:
• Fundamental principles and concepts
• Hands-on activities and exercises
• Real-world applications
• Assessment strategies`).join('\n')}

Learning Activities:
• Interactive classroom discussions
• Hands-on experiments and projects
• Group work and peer learning
• Digital learning tools and resources

Assessment Methods:
• Regular quizzes and tests
• Project-based assessments
• Performance tasks
• Continuous evaluation
      `;

      setGeneratedContent(simulatedResponse);
    } catch (error) {
      console.error('Error generating content:', error);
      setGeneratedContent('Error generating content. Please try again.');
    }
  };

  const generateTopicExplanation = async (grade, subject, topic) => {
    const prompt = `
      Provide a detailed explanation for ${topic} in ${grade} ${subject}.
      Include:
      1. Detailed concept explanation
      2. Examples and illustrations
      3. Common misconceptions
      4. Practice exercises
      5. Real-world applications
    `;

    try {
      // Simulate LLM response - replace with actual API call in production
      const explanation = `
Detailed Explanation: ${topic}
========================

Concept Overview:
---------------
• Core principles of ${topic} in ${grade} ${subject}
• Step-by-step breakdown of key ideas
• Fundamental rules and concepts

Examples & Illustrations:
----------------------
1. Example 1: Basic application
2. Example 2: Intermediate concept
3. Example 3: Advanced implementation

Common Misconceptions:
-------------------
• Misconception 1 and clarification
• Misconception 2 and clarification
• How to avoid common errors

Practice Exercises:
----------------
1. Beginner level exercise
2. Intermediate challenge
3. Advanced problem-solving task

Real-world Applications:
---------------------
• Practical use case 1
• Practical use case 2
• Connection to everyday life
      `;

      setTopicExplanation(explanation);
    } catch (error) {
      console.error('Error generating topic explanation:', error);
      setTopicExplanation('Error generating explanation. Please try again.');
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
              generateContent(grade, subject, gradesData[grade][subject]);
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
              <h3>{topic}</h3>
              <button
                className="explain-button"
                onClick={() => {
                  setSelectedTopic(topic);
                  generateTopicExplanation(grade, subject, topic);
                }}
              >
                Explain This Topic
              </button>
              {selectedTopic === topic && (
                <div className="topic-explanation">
                  <pre>{topicExplanation}</pre>
                  <button
                    className="close-button"
                    onClick={() => {
                      setSelectedTopic(null);
                      setTopicExplanation('');
                    }}
                  >
                    Close Explanation
                  </button>
                </div>
              )}
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

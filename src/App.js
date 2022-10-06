import './App.css';
import React, { useState } from 'react';
import { Check, X } from 'react-feather';
import logo from './images/cohlogo.png';

function App() {
  //Properties
  const [showFinalResults, setFinalResults] = useState(false);
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showAnswers, setAnswers] = useState(false);
  const questions = [
    {
      text: "What is the name of Alice's cat?",
      options: [
        { id: 0, text: 'Dinah', isCorrect: true },
        { id: 1, text: 'Cheshire', isCorrect: false },
        { id: 2, text: 'Muffin', isCorrect: false },
        { id: 3, text: 'Bourbon', isCorrect: false },
      ],
    },
    {
      text: 'What color dress and apron did Alice wear?',
      options: [
        { id: 0, text: 'White dress/blue apron', isCorrect: false },
        { id: 1, text: 'Blue dress/white apron', isCorrect: true },
        { id: 2, text: 'Red dress/white apron', isCorrect: false },
        { id: 3, text: 'White dress/red apron', isCorrect: false },
      ],
    },
  ];

  //Helper functions
  const optionClicked = async (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
    }

    setAnswers(true);
    await sleep(2000);

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
      setAnswers(false);
    } else {
      setFinalResults(true);
    }
  };

  const restartClicked = () => {
    setFinalResults(false);
    setScore(0);
    setCurrentQuestion(0);
    setAnswers(false);
  };

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  return (
    <div className="App">
      {/* Header */}
      <header>
        <div class="logo">
          <img src={logo} width="150" alt="Chambers of Hell logo" />
        </div>
        <div class="score">
          <h2>Score: {score}</h2>
        </div>
      </header>

      <div class="content">
        <h1>Alice's Nightmare</h1>
        {showFinalResults ? (
          /* Final Result */
          <div className="final-results">
            <h2>Final Results</h2>
            <h2>
              {score} of {questions.length} correct (
              {(score / questions.length) * 100}%)
            </h2>
            <button onClick={() => restartClicked()}>Restart</button>
          </div>
        ) : (
          /* Questions */
          <div className="questions">
            <h2>
              Question {currentQuestion + 1} of {questions.length}
            </h2>
            <h3 class="question">{questions[currentQuestion].text}</h3>
            <ul>
              {questions[currentQuestion].options.map((option) => {
                return (
                  <>
                    {showAnswers ? (
                      <li
                        class={
                          option.isCorrect ? 'option correct' : 'option wrong'
                        }
                        key={option.id}>
                        <div class="option-label">{option.text}</div>
                        <div class={option.isCorrect ? 'option-result' : ''}>
                          {option.isCorrect ? <Check /> : <X />}
                        </div>
                      </li>
                    ) : (
                      <li
                        class="option"
                        onClick={() => optionClicked(option.isCorrect)}
                        key={option.id}>
                        <div class="option-label">{option.text}</div>
                        <div class="option-empty"></div>
                      </li>
                    )}
                  </>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

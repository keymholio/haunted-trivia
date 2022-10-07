import React, { useState } from 'react';
import { Check, X } from 'react-feather';
import logo from '../images/cohlogo.png';
import { Link } from 'react-router-dom';
import data from '../data/trivia_data.json';
import { useParams } from 'react-router-dom';

function Trivia() {
  //Properties
  const [showFinalResults, setFinalResults] = useState(false);
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showAnswers, setAnswers] = useState(false);

  // determines with trivia they want (in json file)
  let { id } = useParams();

  //Helper functions
  const optionClicked = async (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
    }

    setAnswers(true);
    await sleep(2000);

    if (currentQuestion + 1 < data.trivia[id].questions.length) {
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

      <main>
        <h1>{data.trivia[id].title}</h1>
        {showFinalResults ? (
          /* Final Result */
          <div className="final-results">
            <h2>Your Score</h2>
            <h3>
              {score} of {data.trivia[id].questions.length} correct (
              {(score / data.trivia[id].questions.length) * 100}%)
            </h3>
            <button onClick={() => restartClicked()}>Restart</button>
            <Link to="/" className="return">
              More trivia
            </Link>
          </div>
        ) : (
          /* Questions */
          <div className="questions">
            <h2>
              Question {currentQuestion + 1} of{' '}
              {data.trivia[id].questions.length}
            </h2>
            <h3 class="question">
              {data.trivia[id].questions[currentQuestion].question}
            </h3>
            <ul>
              {data.trivia[id].questions[currentQuestion].answers.map(
                (option) => {
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
                },
              )}
            </ul>
          </div>
        )}
      </main>
    </div>
  );
}

export default Trivia;

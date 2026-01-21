import React, { useState, useEffect, useContext } from "react";
import Axios from "axios";
import { AuthContext } from '../../context/Auth';
import { QuizData } from "./QuizData";
import QuizResult from "./QuitResult";
import "./Quiz.css";

function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [clickedOption, setClickedOption] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const changeQuestion = () => {
    updateScore();
    if (currentQuestion < QuizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setClickedOption(0);
    } else {
      setShowResult(true);
    }
  };
  const updateScore = () => {
    if ((clickedOption === QuizData[currentQuestion].answer1) || (clickedOption === QuizData[currentQuestion].answer2)) {
      setScore(score + 1);
    }
  };
  const resetAll = () => {
    setShowResult(false);
    setCurrentQuestion(0);
    setClickedOption(0);
    setScore(0);
  };

  const { currentUser } = useContext(AuthContext);

  const [postData, setPostData] = useState("");

  const userId = currentUser.uid;

  useEffect(() => {
    getPostData(currentUser.email);
  }, [currentUser]);


  const getPostData = () => {
    Axios
      .get(`https://fun-games-c4f99-default-rtdb.firebaseio.com/aqtest/${userId}.json`)
      .then((response) => {
        setPostData(response.data);
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <div className="row justify-content-start">
        <div className="col-lg-12 mb-4">
          {/* <div className="Quit-1"> */}
          {/* <div className="card"> */}
          <div className="border shadow p-4">
            {showResult ? (
              <QuizResult
                score={score}
                totalScore={QuizData.length}
                tryAgain={resetAll}
              />
            ) : (
              <>
                <div style={{ position: 'relative' }}>
                  <div style={{
                    position: 'absolute',
                    top: '10px',
                    left: '10px',
                    background: 'rgba(255, 255, 255, 0.9)',
                    padding: '5px 15px',
                    borderRadius: '20px',
                    fontWeight: 'bold',
                    color: '#535ac8',
                    boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
                    zIndex: 10
                  }}>
                    {currentQuestion + 1}
                  </div>
                  <div className="text-center my-3">
                    <img
                      src={QuizData[currentQuestion].image}
                      alt={`Question ${currentQuestion + 1}`}
                      style={{ maxWidth: '100%', maxHeight: '400px', borderRadius: '15px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}
                    />
                  </div>
                </div>
                <div className="option-container">
                  <ul className="list-option">
                    {QuizData[currentQuestion].options.map((option, i) => {
                      return (
                        <li className="list-group mb-2">
                          <button
                            // className="option-btn"
                            className={`list-group-item list-group-item-action btn-primary btn ${clickedOption == i + 1 ? "checked" : null
                              }`}
                            key={i}
                            onClick={() => setClickedOption(i + 1)}
                          >
                            {option}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
                <div className="d-flex justify-content-center">
                  <input
                    type="button"
                    value="Next"
                    className="next-button btn-primary text-white btn"
                    onClick={changeQuestion}
                  />
                </div>
              </>
            )}
          </div>
          {/* </div> */}
          {/* </div> */}
        </div>
        <div className="col-lg-12">
          <div className="border p-4 shadow">
            <h4 className="">Score</h4>
            {postData ?
              <table class="table table-striped table-hover table-bordered border-primary">
                <thead>
                  <tr>
                    <th scope="col"><h6>No of Trails</h6></th>
                    <th scope="col"><h6>Total</h6></th>
                    <th scope="col"><h6>Your Score</h6></th>
                    <th scope="col"><h6>Status</h6></th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(postData).map((item, index) => {
                    return (
                      <tr key={item[1]}>
                        <th scope="row"> Trail {index + 1}</th>
                        <td>10</td>
                        <td>{item[1].score}</td>
                        <td>{item[1].status == 1 ? <span className="text-success">Non Autistic</span> : <span className="text-danger">Autistic</span>}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
              : <span className="noTaskAdded p-5">To View Score Play the game</span>}
          </div>
        </div>
      </div>
    </>
  );
}

export default Quiz;

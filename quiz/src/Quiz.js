import React from 'react';
import Answers from './Answers';
import 'bootstrap/dist/css/bootstrap.min.css';
import Jumbotron from 'react-bootstrap/Jumbotron';
import meme from "./good-job-meme.jpg"
import youTriedImg from "./you-tried.jpg"

class Quiz extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      apiQuestions: this.props.apiQuestions,
      currentQuestion: 0,
      score: 0,
      answersCount: 0,
      endGame: false,
     };
  }

  getQuestion = () => {
    console.log(this.state.apiQuestions)
    const {currentQuestion, apiQuestions} = this.state;
    this.setState(() => {
      return {
        question: apiQuestions[currentQuestion].question,
        answers: apiQuestions[currentQuestion].answers,
        answer: apiQuestions[currentQuestion].correct
      }
    })
  }

  componentDidMount() {
    this.getQuestion();
  }

  questionHandler = () => {
    let {userAnswer, answer, score, currentQuestion} = this.state;
    this.setState( {
      currentQuestion: currentQuestion + 1
    })
    console.log(score)

    if(userAnswer === answer) {
      this.setState({
        score: score + 1
      })
    }
  }

  markActive = (answer) => {
    const {currentQuestion, apiQuestions} = this.state;
    this.setState({
      userAnswer: answer
    },
    currentQuestion < apiQuestions.length -1 ?
      this.questionHandler :
        this.finishHandler
        )
  }

  componentDidUpdate(prevProps, prevState) {
    const {currentQuestion, apiQuestions} = this.state;
    if(currentQuestion !== prevState.currentQuestion) {
      this.setState(() => {
        return {
          question: apiQuestions[currentQuestion].question,
          answers: apiQuestions[currentQuestion].answers,
          answer: apiQuestions[currentQuestion].correct
        }
      })
    }
  }
  finishHandler = () => {
    const {currentQuestion, apiQuestions, userAnswer, answer, score} = this.state;
    if(currentQuestion === apiQuestions.length -1) {
      this.setState({
        endGame: true
      })
    }
    if(userAnswer === answer) {
      this.setState({
        score: score + 1
      })
    }
  }

  render() {
    const {
      question, 
      answers, 
      currentQuestion, 
      apiQuestions, 
      userAnswer, 
      endGame, 
      score
    } = this.state;

    if(endGame) {
      return (
        <div className="App">
          <Jumbotron>
            <h2>Your Score: {score} points</h2>
            <h2>Thank you for playing!</h2>
          </Jumbotron>
          {score === 5 ? <img alt="" src={meme}></img> : <img alt="" src={youTriedImg}></img>}
        </div>
      )
    }

    return (
      <div className="App">
        <Jumbotron>
          <h1 className="header">{`Welcome to the `} <span className="salt">{`<salt/> `}</span>{`pop quiz!`}</h1>
          <p>{`Question ${currentQuestion + 1} out of ${apiQuestions.length}`}</p>
        </Jumbotron>
        <h2 className="question">{question}</h2>
        <div className="contain">
          {answers === undefined ? <p>Loading...</p> : answers.map((answer, i) => 
          <Answers key={i} answer={answer} markActive={this.markActive} userAnswer={userAnswer}/>
          )}
          </div>     
      </div>
    );
  }
}

export default Quiz;
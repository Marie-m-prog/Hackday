import React from 'react';
import './App.css';
import Answers from './Answers';
import 'bootstrap/dist/css/bootstrap.min.css';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      apiQuestions: [],
      currentQuestion: 0,
      score: 0,
      answersCount: 0,
      endGame: false,
     };
  }
  async callAPI() {
    await fetch("http://localhost:8080/myApi/questions")
      .then(res => res.text())
      .then(res => this.setState({ apiQuestions: JSON.parse(res) }));
  }
  getQuestion = () => {
    const {currentQuestion} = this.state;
    this.setState(() => {
      return {
        question: this.state.apiQuestions[currentQuestion].question,
        answers: this.state.apiQuestions[currentQuestion].answers,
        answer: this.state.apiQuestions[currentQuestion].correct
      }
    })
  }
  async componentDidMount() {
    await this.callAPI();
    this.getQuestion();
  }

  nextQuestionHandler = () => {
    let {userAnswer, answer, score} = this.state;
    this.setState( {
      currentQuestion: this.state.currentQuestion + 1
    })

    if(userAnswer === answer) {
      this.setState({
        score: score + 1
      })
    }
  }

  checkAnswer = (answer) => {
    this.setState({
      userAnswer: answer
    })
  }

  componentDidUpdate(prevProps, prevState) {
    const {currentQuestion} = this.state;
    if(this.state.currentQuestion !== prevState.currentQuestion) {
      this.setState(() => {
        return {
          question: this.state.apiQuestions[currentQuestion].question,
          answers: this.state.apiQuestions[currentQuestion].answers,
          answer: this.state.apiQuestions[currentQuestion].correct
        }
      })
    }
  }
  finishHandler = () => {
    if(this.state.currentQuestion === this.state.apiQuestions.length -1) {
      this.setState({
        endGame: true
      })
    }
    if(this.state.userAnswer === this.state.answer) {
      this.setState({
        score: this.state.score + 1
      })
    }
  }

  render() {
    const {question, answers, currentQuestion, apiQuestions, userAnswer, endGame, score} = this.state;

    if(endGame) {
      return (
        <Jumbotron>
          <div className="App">
            <h2>Your Score: {score} points</h2>
            <h2>Thank you for playing!</h2>
          </div>
        </Jumbotron>
      )
    }

    const welcome = "Welcome to the big <salt/> quiz!"
    return (
      <div className="App">
        <Jumbotron>
        <h1>{welcome}</h1>
        <p>{`Question ${currentQuestion} out of ${apiQuestions.length}`}</p>
        </Jumbotron>
        <h2>{question}</h2>
        <div className="contain">
          {answers === undefined ? null : answers.map(answer => 
          <p className={`${userAnswer === answer ? 'selected' : null} quizAnswer`} onClick={() => this.checkAnswer(answer)}>{answer}</p>
          )}
          {/* {answers === undefined ? null : answers.map(answer => 
          <Answers answer={answer} checkAnswer={this.checkAnswer} userAnswer={this.state.userAnswer}/>
          )} */}
          </div>
        {currentQuestion < apiQuestions.length -1 &&
        <div>
          <Button size="lg" onClick={this.nextQuestionHandler}>Next Question</Button>
        </div>
        } 
        {currentQuestion === apiQuestions.length -1 && 
        <Button size="lg" onClick={this.finishHandler}>Finish</Button>}
      
      </div>
    );
  }
}

export default App;
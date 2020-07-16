import React from 'react';
import './App.css';
import Question from './Question';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { apiResponse: "" };
  }
  callAPI() {
    fetch("http://localhost:8080/myApi/questions")
        .then(res => res.text())
        .then(res => this.setState({ apiResponse: JSON.parse(res) }));
  }
  componentDidMount() {
      this.callAPI();
  }
  render() {
    const questiontest = [...this.state.apiResponse]
    const questions = questiontest.map(obj => obj.question)
    console.log(questions)
    let template = questions.map(question => {
      return <Question className="App-intro" question={question}/>
    })
    const welcome = "Welcome to the big <salt/> quiz!"
    return (
      <div className="App">
        <div>{welcome}</div>
        {template}
      </div>
    );
  }
}

export default App;
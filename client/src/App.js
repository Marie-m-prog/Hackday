import React from 'react';
import Quiz from './Quiz';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      apiQuestions: null,
     };
  }
  async callAPI() {
    await fetch('/api/questions')
      .then(res => res.text())
      .then(res => this.setState({ apiQuestions: JSON.parse(res) }));
  }

  async componentDidMount() {
    await this.callAPI();
  }

  render() {
    return (
      <div>
        {this.state.apiQuestions ? <Quiz apiQuestions={this.state.apiQuestions}/> : <p>Loading...</p>}
      </div>
    );
  }
}

export default App;
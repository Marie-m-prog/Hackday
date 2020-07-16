import React from 'react';

class Answers extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <p 
      onClick={this.props.checkAnswer(this.props.answer)}
      >{this.props.answer}</p>
    )
  }
}

export default Answers;
import React from 'react';

class Question extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
    <p>{this.props.question}</p>
    )
  }
}

export default Question;
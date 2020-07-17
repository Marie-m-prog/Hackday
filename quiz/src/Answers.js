import React from 'react';

const Answers = props => {
    const {userAnswer, answer, markActive} = props;
    return (
      <p
      className={`${userAnswer === answer ? 'selected' : 'answerCard'} quizAnswer`}
      onClick={() => markActive(answer)}
      >{answer}</p>
    );
}

export default Answers;

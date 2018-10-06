import React from 'react'
import { connect } from 'react-redux'

function User (props) {
  const { name, avatarURL, AnsweredQuestionsCount, createdQuestionsCount, score} = props
  return (
    <div className='User'>
      <img
        src={avatarURL}
        className='avatar'
        alt="user"
      />
      <div>{name}</div>
      <div> AnsweredQuestions: {AnsweredQuestionsCount}</div>
      <div> created Questions: {createdQuestionsCount}</div>
      <div> Score: {score}</div>
    </div>
  )
}

function mapStateToProps ({users}, { id }) {
  const user = users[id]
  const { name, avatarURL, answers, questions } = user
  const AnsweredQuestionsCount = Object.keys(answers).length
  const createdQuestionsCount = questions.length
  const score = AnsweredQuestionsCount + createdQuestionsCount
  return {
    name,
    avatarURL,
    answers,
    questions,
    AnsweredQuestionsCount,
    createdQuestionsCount,
    score
  }
}

export default connect(mapStateToProps)(User)

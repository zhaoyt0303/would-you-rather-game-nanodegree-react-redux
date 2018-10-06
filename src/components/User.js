import React, { Component } from 'react'
import { connect } from 'react-redux'

class User extends Component {
  render() {
    const { user} = this.props
    const { name, avatarURL, answers, questions } = user
    const AnsweredQuestionsCount = Object.keys(answers).length
    const createdQuestionsCount = questions.length
    const score = AnsweredQuestionsCount + createdQuestionsCount
    
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
}

function mapStateToProps ({users}, { id }) {
  const user = users[id]
    
  return {
    user
  }
}

export default connect(mapStateToProps)(User)
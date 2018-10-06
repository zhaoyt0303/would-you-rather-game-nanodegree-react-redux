import React, { Component } from 'react'
import { connect } from 'react-redux'
import {  withRouter } from 'react-router-dom'


class Question extends Component {
  handleClick = (e, id) => {
    e.preventDefault()
    this.props.history.push(`/questions/${id}`);
  }

  render() {
    const { question, authorInfo} = this.props
    const { id, optionOne } = question
    
    return (
      <div className='Question'>
        <div className='question-header'>{authorInfo.name} asks: </div>
        <div className='question-body'>
          <img
            src={authorInfo.avatarURL}
            className='avatar'
          />
          <div>Would you rather</div>
          <div>{optionOne.text}...</div>
          <button className='view-full-button'  onClick={(e) => this.handleClick(e, id)}>View Full</button>
        </div>
      </div>
    )
  }
}

function mapStateToProps ({questions, users, authedUser}, { id }) {
  const question = questions[id]
  const authorInfo = question ? users[question.author]: null
    
  return {
    question,
    authorInfo,
    authedUser
  }
}

export default withRouter(connect(mapStateToProps)(Question))
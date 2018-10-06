import React, { Component } from 'react'
import { handleAddAnswer } from '../actions/questions'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

class QuestionPage extends Component {
  state = {
    selectedAnswer: ''
  }

  handleSaveAnswer(e) {
    e.preventDefault()
    const { dispatch, authedUser, id  } = this.props
    const { selectedAnswer } = this.state

    dispatch(handleAddAnswer({
      qid:id,
      authedUser,
      answer: selectedAnswer,
    }))
  }

  chooseAnswer = (answer) => {
    this.setState(() => ({
      selectedAnswer: answer
    }))
  }

  render() {
    const { selectedAnswer } = this.state;
    const {question, optionOneVotes, optionTwoVotes, totalVotes, percentageOptionOne, percentageOptionTwo, answered, answer, authorName, avatar} = this.props

    if (!question) {
        return <Redirect to="/not-found"/>
      }

    return (
      <div className={answered ? 'tile-item question-detail' : 'tile-item'}>
        {answered ? (
          <div className="tile-header">Asked by {authorName}</div>
          ) : (
          <div className="tile-header">{authorName} asks</div>
        )}

        <div className="tile-body">
          <div className="tile-left">
            <img alt="avatar" className="avatar" src={avatar}/>
          </div>
          {!answered ? (
            <div className="question-body">
              <div className="would-you">Would you rather</div>
              <div className={selectedAnswer === 'optionOne' ? 'option option-selected' : 'option'} onClick={(e) => { this.chooseAnswer('optionOne')}}>{question.optionOne.text}</div>
              <div className={selectedAnswer === 'optionTwo' ? 'option option-selected' : 'option'} onClick={(e) => { this.chooseAnswer('optionTwo')}}>{question.optionTwo.text}</div>
              <button className={ selectedAnswer ? 'btn-default' : 'disabled'} onClick={(e) => {this.handleSaveAnswer(e)}}>Submit</button>
            </div>
          ) : (
            <div className="question-body">
              <div className="would-you">Results: </div>
              <div className={answer === 'optionOne' ? 'option-container selected': 'option-container'}>
                <div className="option-one">{question.optionOne.text}</div>
                <div className="poll-container">
                  <div>{optionOneVotes} out of {totalVotes} votes</div>
                  <div>Percentage votes: {percentageOptionOne}%</div>
                  <div className="your-vote">Your pick</div>
                </div>
              </div>

              <div className={answer === 'optionTwo' ? 'option-container selected': 'option-container'}>
                <div className="option-two">{question.optionOne.text}</div>
                <div className="poll-container">
                  <div>{optionTwoVotes} out of {totalVotes} votes</div>
                  <div>Percentage votes: {percentageOptionTwo}%</div>
                  <div className="your-vote">Your pick</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }
}

function mapStateToProps ({questions, authedUser, users}, props) {
  const { id } = props.match.params
  const question = questions[id]
  const author = question ? users[question.author] : null
  const optionOneVotes = (question && question.optionOne.votes) ? question.optionOne.votes.length : 0
  const optionTwoVotes = (question && question.optionTwo.votes) ? question.optionTwo.votes.length : 0
  const totalVotes = optionOneVotes + optionTwoVotes
  const percentageOptionOne = ((optionOneVotes / totalVotes) * 100).toFixed(1)
  const percentageOptionTwo = ((optionTwoVotes / totalVotes) * 100).toFixed(1)
  const answered = question? (question.optionOne.votes.includes(authedUser) || question.optionTwo.votes.includes(authedUser)) : false
  const answer = (authedUser && users) ? (users[authedUser].answers[id]) : null
  const authorName = author ? author.name : null
  const avatar = author ? author.avatarURL : null
  return {
    question,
    optionOneVotes,
    optionTwoVotes,
    totalVotes,
    percentageOptionOne,
    percentageOptionTwo,
    answered,
    authorName,
    answer,
    avatar,
    authedUser,
    id
  }
}
export default connect(mapStateToProps)(QuestionPage)

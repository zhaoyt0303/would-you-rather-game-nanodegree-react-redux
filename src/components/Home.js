import React, { Component } from 'react'
import { connect } from 'react-redux'
import Question from './Question'
import { handleInitialData } from '../actions/shared'

class Home extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }
  state = {
    showAnswered: false
  }
  
  filterQuestions = (showAnswered) => {
     this.setState(() => ({
      showAnswered: showAnswered
    }))
  }

  render() {
    const { showAnswered } = this.state;
    const { questions, authedUser } = this.props
    const questionsArray = Object.values(questions)
    const filteredQuestions = questionsArray.filter(function(question) {
      const contains = (question.optionOne.votes.includes(authedUser) || question.optionTwo.votes.includes(authedUser));
      return showAnswered ? contains : !contains;
    });
    const sortedQuestions = filteredQuestions.sort((a, b) => b.timestamp - a.timestamp);

    return (
      <div id='home-container'> 
        <div id='btn-group'>
          <button className={!showAnswered ? 'btn-selected' : 'btn-default'} onClick={(e) => this.filterQuestions(false)}> Unanswered Questions </button>
          <button className={showAnswered ? 'btn-selected' : 'btn-default'} onClick={(e) => this.filterQuestions(true)}> Answered Questions </button>
        </div>
        <div id='home-lists'>
          <ul className='home-list'>
            {sortedQuestions.map((question) => (
              <li key={question.id}>
                <Question id={question.id}/>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

function mapStateToProps ({ questions, authedUser }) {
  return {
    questions,
    authedUser
  }
} 

export default connect(mapStateToProps)(Home);
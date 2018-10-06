import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleAddQuestion } from '../actions/questions'
import { Redirect } from 'react-router-dom';

class NewQuestion extends Component {
  state = {
    optionOneText: '',
    optionTwoText: '',
    toHome: false
  }
  
  handleChangeOne = (e) => {
    const text = e.target.value

    this.setState(() => ({
      optionOneText: text
    }))
  }

  handleChangeTwo = (e) => {
    const text = e.target.value

    this.setState(() => ({
      optionTwoText: text
    }))
  }

  handleSubmit = (e) => {
    e.preventDefault()

    const { optionOneText, optionTwoText } = this.state
    const { dispatch  } = this.props
    
    dispatch(handleAddQuestion(optionOneText, optionTwoText))

    this.setState(() => ({
      optionOneText: '',
      optionTwoText: '',
      toHome: true
    }))
  }
  render() {
    const { optionOneText,  optionTwoText, toHome} = this.state
    if (toHome) {
      return <Redirect to='/home' />
    }

    return (
      <div>
        <h3 className='center'>Create New Question</h3>
        <p> Complete the questions: </p>
        <h4> Would you rather</h4>
        <form className='new-questions' onSubmit={this.handleSubmit}>
          <textarea
            placeholder="Enter Option One Text Here"
            value={optionOneText}
            onChange={this.handleChangeOne}
            className='textareaOne'
          />
          <h4> OR </h4>
		  <textarea
            placeholder="Enter Option Two Text Here"
            value={optionTwoText}
            onChange={this.handleChangeTwo}
            className='textareaTwo'
         />
          <button
            className='btn'
            type='submit'
            disabled={optionOneText === '' || optionTwoText ===''}>
              Submit
          </button>
        </form>
      </div>
    )
  }
}

export default connect()(NewQuestion)
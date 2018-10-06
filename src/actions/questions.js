import { _saveQuestion, _saveQuestionAnswer } from '../utils/_DATA.js'

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const ADD_QUESTION = 'ADD_QUESTION'
export const ANSWER_QUESTION = 'ANSWER_QUESTION'

export function receiveQuestions (questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  }
}

function addQuestion (question) {
  return {
    type: ADD_QUESTION,
    question,
  }
}

export function handleAddQuestion (optionOneText, optionTwoText) {
  return (dispatch, getState) => {
    const { authedUser } = getState()

    return _saveQuestion({
      optionOneText,
      optionTwoText,
      author: authedUser
    })
    .then((question) => dispatch(addQuestion(question)))
  }
}

function addAnswer({ qid, authedUser, answer }) {
    return {
        type: ANSWER_QUESTION,
        qid,
        authedUser, 
        answer
    }
}

export function handleAddAnswer(info) {
  return (dispatch) => {
    dispatch(addAnswer(info))
    return _saveQuestionAnswer(info)
      .then(console.log('successful'))
  }
}
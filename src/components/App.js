import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import Login from './Login'
import Home from './Home'
import NewQuestion from './NewQuestion'
import Nav from './Nav'
import LeaderBoard from './LeaderBoard'
import QuestionPage from './QuestionPage'
import NotFound from './NotFound'
import ProtectedRoute from './ProtectedRoute'

class App extends Component {
  componentDidMount() {
    const { dispatch } = this.props
    dispatch(handleInitialData())
  }
  
  render() {
    return (
      <Router>
        <div className="container">
          <Nav />
          <div>
            <Route path='/' exact component={Login} />
            <ProtectedRoute path='/home' component={Home} />
            <ProtectedRoute path='/add' component={NewQuestion} />
            <ProtectedRoute path='/leaderboard' component={LeaderBoard} />
            <ProtectedRoute path='/questions/:id' component={QuestionPage} />
            <Route path="/not-found" component={NotFound} />
          </div>
        </div>
      </Router>
    );
  }
}

export default connect()(App);

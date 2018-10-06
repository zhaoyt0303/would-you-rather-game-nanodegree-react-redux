import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import React, { Component } from 'react'
import { setAuthedUser } from '../actions/authedUser'
import {  withRouter } from 'react-router-dom'


class Nav extends Component {
  handleLogout = (e) => {
    e.preventDefault()
    const { dispatch } = this.props
    dispatch(setAuthedUser(null))
     this.props.history.push(`/`);
  }

  render() {
    const { user } = this.props

    return (
     <nav className='nav'>
      <ul>
        <li>
          <NavLink to='/home' exact activeClassName='active'>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to='/add' activeClassName='active'>
            New Question
          </NavLink>
        </li>
        <li>
          <NavLink to='/leaderboard' exact activeClassName='active'>
            LeaderBoard
          </NavLink>
        </li>
        {user ? (
          <ul>
            <li>
              Hello, {user.name}
            </li>
            <li>
              <button className='logout' onClick={this.handleLogout}> Logout </button>
            </li>
          </ul>
        ) : null}
      </ul>
    </nav>
    )
  }
}

function mapStateToProps ({authedUser, users}) {
  const user = users[authedUser]
  return {
    user
  }
}

export default withRouter(connect(mapStateToProps)(Nav))
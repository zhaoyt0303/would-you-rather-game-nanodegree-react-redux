import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'
import { Redirect } from 'react-router-dom'
import Image from '../utils/loginPhoto.png'

class Login extends Component {
  state = {
    value: '',
    toHome: false,
  }

  handleChange = (e) => {
    const value = e.target.value
     this.setState(() => ({
      value
    }))
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const { value } = this.state
    const { dispatch } = this.props
    dispatch(setAuthedUser(value))
    this.setState(() => ({
      value: '',
      toHome: true
    }))
  }

  render() {
    const { toHome } = this.state
    const { from } = this.props.location.state || { from: { pathname: '/home'}}

    if (toHome === true) {
      return <Redirect to={from} />
    }

    return (
      <div id='login'>
        <div id='login-header'>
          <h3> Welcome to the Would You Rather App!</h3>
          <p> Please sign in to continue</p>
        </div>

        <div id='login-body'>
          <img src={Image} alt="Welcome" height="42" width="42"></img>

          <h3> Sign in </h3>
          <form onSubmit={this.handleSubmit}>
            <label className='user-dropdown-field'>
              <select value={this.state.value} onChange={this.handleChange}>
                <option value='' disabled>Select User</option>
                {this.props.userIDs.map((id) => (
                    <option key={id} value={this.props.users[id].id}>{this.props.users[id].name}</option>
                ))}
              </select>
            </label>
            <input className='user-dropdown-botton' type="submit" value="Sign In" />
          </form>
        </div>
      </div>
    );
  }
}

function mapStateToProps ({users}) {
  const userIDs = Object.keys(users)
  return {
    userIDs,
    users
  }
}

export default connect(mapStateToProps)(Login);

import React from 'react'
import { connect } from 'react-redux'
import User from './User'

function LeaderBoard (props) {
  return (
    <div id='user-list-container'>
      <ul className='home-list'>
        {props.userIds.map((id) => (
          <li key={id}>
            <User id={id}/>
          </li>
        ))}
      </ul>
    </div>
  )
}

function mapStateToProps ({ users }) {
  return {
    userIds: Object.keys(users)
      .sort((a,b) => (Object.keys(users[b].answers).length - Object.keys(users[a].answers).length))
  }
}

export default connect(mapStateToProps)(LeaderBoard);

import React, { Component } from 'react'
import { connect } from 'react-redux'
import User from './User'

class LeaderBoard extends Component {

  render() {
    return (
      <div id='user-list-container'> 
        <ul className='home-list'>
          {this.props.userIds.map((id) => (
            <li key={id}>
              <User id={id}/>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

function mapStateToProps ({ users }) {
  return {
    //I do not know how to sort by anwsered first, then if answered are equal, sort by created
    userIds: Object.keys(users)
      .sort((a,b) => (Object.keys(users[b].answers).length - Object.keys(users[a].answers).length))
  }
} 

export default connect(mapStateToProps)(LeaderBoard);
import React from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

//Found some examples online, but still could not understand that, on line #8, why we put {...rest} there, what is inside it, and what is the different betwen it and {...props}. Thanks!
function ProtectedRoute({ component: Component, ...rest }) {
  return (
    <Route {...rest} render={function(props) {
      return (
        rest.authedUser
        ? <Component {...props} />
        : <Redirect to={{
            pathname: '/',
            state: { from: props.location }
          }} />
      )}
    } />
  );
}

function mapStateToProps( { authedUser }) {
    return {
        authedUser
    }
}

export default withRouter(connect(mapStateToProps)(ProtectedRoute));
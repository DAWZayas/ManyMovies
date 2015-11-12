import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import MovieDetails from '../components/MovieDetails.jsx';

export default class App extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1>Welcome to my App</h1>
        <Link to="/lists">Show Lists</Link>
        <MovieDetails />
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
  // Injected by React Router
  children: PropTypes.node
};

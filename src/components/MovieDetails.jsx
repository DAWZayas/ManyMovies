import React, { Component, PropTypes } from 'react';
import MovieDetailsDescription from './MovieDetailsDescription';
import ListsManager from './ListsManager';
//import Color from 'material-ui/lib/styles/colors';
// import Comment from './Comment';
/*import Table from 'material-ui/lib/table/table';
import TableBody from 'material-ui/lib/table/table-body';
import TableHeader from 'material-ui/lib/table/table-header';
import TableHeaderColumn from 'material-ui/lib/table/table-header-column';
import TableRow from 'material-ui/lib/table/table-row';
import TableRowColumn from 'material-ui/lib/table/table-row-column';
import Dialog from '../../node_modules/material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';*/
import injectTapEventPlugin from "react-tap-event-plugin";
injectTapEventPlugin();

export default class MovieDetails extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    //const historyStyle = (this.state.AddHistory) ? {color: Color.white, backgroundColor: Color.deepPurple500, border: "2px solid #512DA8", margin: "1em" } : {color: Color.deepPurple500, border: "2px solid #512DA8", margin: "1em" };
    //const collectionStyle = (this.state.AddCollection) ? {color: Color.white, backgroundColor: Color.teal500, border: "2px solid #00796B", margin: "1em"} : {color: Color.teal500, border: "2px solid #00796B", margin: "1em"};
    const { movie } = this.props;
    return (
      <div>
        <MovieDetailsDescription movie={movie}/>
        <ListsManager movie={movie}/>
      </div>
    );
  }
}

MovieDetails.propTypes = {
  movie: PropTypes.object
};

MovieDetails.defaultProps = {
};
